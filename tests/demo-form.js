// Run with Node.js and set CHROMIUM_PATH to the Chrome or Edge executable.
// Checks browser validation, the request sent to rumbo-api (fetch is stubbed, no API is called),
// the failure and success notices, broken images (PR-10) and the video in preparation (PR-14).
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

async function checkForm() {
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
    fields.site_count.value = '2-3';
    fields.privacy_accepted.checked = false;
    form.requestSubmit();
    requireCondition(submissions === 0, 'consent is required');
    fields.privacy_accepted.checked = true;

    const calls = [];
    const answers = [];
    window.fetch = (url, options) => {
      calls.push({ url, options });
      return answers.shift()();
    };
    const button = form.querySelector('.btn-submit');
    const receipt = document.getElementById('formReceipt');
    const settle = () => new Promise(resolve => setTimeout(resolve, 50));

    // PR-4: the API is down; nothing is lost and the button comes back.
    answers.push(() => Promise.reject(new TypeError('Failed to fetch')));
    form.requestSubmit();
    requireCondition(submissions === 1 && wasPrevented, 'valid form reaches the handler');
    requireCondition(button.disabled, 'button is disabled while sending');
    await settle();
    requireCondition(notice.dataset.state === 'error' && !notice.hidden, 'network failure is reported');
    requireCondition(fields.contact_email.value === 'test@example.com', 'data stays after a failure');
    requireCondition(!button.disabled, 'button is enabled again after a failure');

    answers.push(() => Promise.resolve(new Response('{}', { status: 503 })));
    form.requestSubmit();
    await settle();
    requireCondition(notice.dataset.i18n === 'form_notice_failed', 'server error is reported');
    requireCondition(receipt.hidden, 'no receipt without a stored request');

    answers.push(() => Promise.resolve(new Response(JSON.stringify({ id: 'req-123', type: 'DEMO' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } })));
    form.requestSubmit();
    await settle();
    const sent = JSON.parse(calls[2].options.body);
    requireCondition(calls[2].url.endsWith('/api/v1/onboarding-requests'), 'request goes to the API');
    requireCondition(sent.type === 'DEMO' && sent.sitesRange === 'TWO_TO_THREE' && sent.privacyConsent === true,
      'payload uses the API codes');
    requireCondition(sent.fullName === 'Test user' && sent.message === null, 'texts are trimmed and optional');
    requireCondition(notice.dataset.state === 'success', 'confirmation is shown');
    requireCondition(!receipt.hidden && receipt.textContent.includes('req-123'), 'confirmation shows the id');
    requireCondition(fields.contact_email.value === '' && fields.request_type.value === 'demo', 'form is cleared');

    // PR-10: a broken photo is hidden and its avatar shows the fallback; the page keeps working.
    const teamPhoto = document.querySelector('.team-photo');
    teamPhoto.loading = 'eager';
    teamPhoto.src = 'assets/images/missing-photo.png';
    await settle();
    requireCondition(teamPhoto.parentElement.classList.contains('image-unavailable'), 'broken photo is marked');
    requireCondition(getComputedStyle(teamPhoto).display === 'none', 'broken photo is really hidden');

    // PR-14: no video yet, so the section says it is in preparation instead of a play button that does nothing.
    const video = document.getElementById('productVideo');
    requireCondition(video.dataset.state === 'pending', 'video is in preparation');
    requireCondition(getComputedStyle(video.querySelector('.video-play-btn')).display === 'none', 'no play button');
    requireCondition(video.querySelector('[data-video-pending]').getBoundingClientRect().height > 0,
      'preparation message is visible');
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
    '--headless', '--disable-gpu', '--disable-background-networking', '--virtual-time-budget=10000',
    '--user-data-dir=' + path.join(testDir, 'profile'), '--dump-dom', pathToFileURL(file).href
  ], { encoding: 'utf8', timeout: 25000, stdio: ['ignore', 'pipe', 'ignore'] });
  assert.equal(result.match(/data-qa-result="([^"]+)"/)?.[1], 'PASS', 'Demo form validation');
  console.log('PASS: validation, API request, failure and success notices, broken photo and video state.');
} finally {
  fs.rmSync(testDir, { recursive: true, force: true, maxRetries: 4, retryDelay: 150 });
}
