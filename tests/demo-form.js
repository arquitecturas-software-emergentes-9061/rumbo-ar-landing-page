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
    const clinicLink = document.querySelector('footer a[data-i18n="footer_onboarding"]');
    const notice = document.getElementById('formNotice');
    const clickWithoutNavigation = (link) => {
      // The fixture's base URL points at the assets, not at the fixture itself.
      link.addEventListener('click', (event) => event.preventDefault(), { once: true });
      link.click();
    };
    clickWithoutNavigation(clinicLink);
    requireCondition(fields.request_type.value === 'onboarding', 'footer starts clinic onboarding');
    requireCondition(!form.querySelector('[data-request-label="onboarding"]').hidden, 'onboarding submit label shown');
    clickWithoutNavigation(document.querySelector('.final-cta a[href="#contacto"]'));
    requireCondition(fields.request_type.value === 'demo', 'demo link selects demo mode');
    let submissions = 0;
    let wasPrevented = false;
    form.addEventListener('submit', (event) => {
      submissions++;
      wasPrevented = event.defaultPrevented;
      event.preventDefault();
    });

    form.requestSubmit();
    requireCondition(submissions === 0, 'empty form does not submit');

    fields.namedItem('name').value = '   ';
    fields.email.value = 'test@example.com';
    fields.clinic.value = 'Test clinic';
    fields.role.value = 'Coordinator';
    fields.privacyConsent.checked = true;
    requireCondition(fields.namedItem('name').validity.patternMismatch, 'whitespace is invalid');

    fields.namedItem('name').value = 'Test user';
    fields.email.value = 'invalid';
    requireCondition(fields.email.validity.typeMismatch, 'invalid email rejected');
    form.requestSubmit();
    requireCondition(submissions === 0, 'invalid email prevents submission');

    fields.email.value = 'test@example.com';
    fields.privacyConsent.checked = false;
    form.requestSubmit();
    requireCondition(submissions === 0, 'consent is required');

    fields.privacyConsent.checked = true;
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
  console.log('PASS: required fields, whitespace, invalid email, consent and local submit handler.');
} finally {
  fs.rmSync(testDir, { recursive: true, force: true, maxRetries: 4, retryDelay: 150 });
}
