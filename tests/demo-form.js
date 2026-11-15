// Run with Node.js and set CHROMIUM_PATH to the Chrome or Edge executable.
// This checks browser validation only. It does not call a registration service.
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

function checkForm() {
  const requireCondition = (condition, name) => {
    if (!condition) throw new Error(name);
  };
  try {
    const form = document.querySelector('.contact-form');
    const fields = form.elements;
    const notice = document.getElementById('formNotice');
    document.getElementById('request-type-onboarding').click();
    requireCondition(fields.request_type.value === 'onboarding', 'clinic onboarding selected');
    requireCondition(!form.querySelector('[data-request-label="onboarding"]').hidden, 'onboarding submit label shown');
    document.getElementById('request-type-demo').click();
    requireCondition(fields.request_type.value === 'demo', 'demo mode selected');
    let submissions = 0;
    let wasPrevented = false;
    form.addEventListener('submit', (event) => {
      submissions++;
      wasPrevented = event.defaultPrevented;
      event.preventDefault();
    });

    form.requestSubmit();
    requireCondition(submissions === 0, 'empty form does not submit');

    fields.contact_name.value = 'Test user';
    fields.contact_email.value = 'invalid';
    fields.organization_name.value = 'Test clinic';
    fields.contact_role.value = 'Coordinator';
    fields.privacy_accepted.checked = true;
    fields.site_count.value = '1';
    requireCondition(fields.contact_email.validity.typeMismatch, 'invalid email rejected');
    form.requestSubmit();
    requireCondition(submissions === 0, 'invalid email prevents submission');

    fields.contact_email.value = 'test@example.com';
    fields.site_count.value = '';
    form.requestSubmit();
    requireCondition(submissions === 0, 'site count is required');
    fields.site_count.value = '1';
    fields.privacy_accepted.checked = false;
    form.requestSubmit();
    requireCondition(submissions === 0, 'consent is required');

    fields.privacy_accepted.checked = true;
    form.requestSubmit();
    requireCondition(submissions === 1 && wasPrevented, 'valid form reaches the local handler');
    requireCondition(!notice.hidden, 'form explains that no request was sent');
    document.body.dataset.qaResult = 'PASS';
  } catch (error) {
    document.body.dataset.qaResult = error.message;
  }
}

const browser = process.env.CHROMIUM_PATH;
assert.ok(browser, 'Set CHROMIUM_PATH to the Chrome or Edge executable.');
const publicDir = path.resolve(__dirname, '../src/public');
const tempRoot = fs.realpathSync(os.tmpdir());
const testDir = fs.mkdtempSync(path.join(tempRoot, 'rumbo-form-'));
assert.equal(path.dirname(fs.realpathSync(testDir)), tempRoot);

try {
  const file = path.join(testDir, 'form.html');
  const html = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8')
    .replace('<head>', '<head><base href="' + pathToFileURL(publicDir + path.sep).href + '">')
    .replace(/^\s*<link[^>]+https:\/\/fonts\.[^>]+\n/gm, '')
    .replace('</body>', '<script>addEventListener("load", ' + checkForm.toString() + ');</script></body>');
  fs.writeFileSync(file, html);
  const result = execFileSync(browser, [
    '--headless', '--disable-gpu', '--disable-background-networking',
    '--user-data-dir=' + path.join(testDir, 'profile'), '--dump-dom', pathToFileURL(file).href
  ], { encoding: 'utf8', timeout: 25000, stdio: ['ignore', 'pipe', 'ignore'] });
  assert.equal(result.match(/data-qa-result="([^"]+)"/)?.[1], 'PASS', 'Demo form validation');
  console.log('PASS: request modes, required fields, invalid email, site count, consent and local submit handler.');
} finally {
  fs.rmSync(testDir, { recursive: true, force: true, maxRetries: 4, retryDelay: 150 });
}
