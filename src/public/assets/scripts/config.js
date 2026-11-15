// Deployment settings of the landing page. Change them here, not in script.js.
// apiBaseUrl: origin of rumbo-api, without a trailing slash. Its CORS_ALLOWED_ORIGINS must include this page.
// productVideoUrl: public URL of the product video; while it is empty the page says the video is in preparation.
window.RUMBO_CONFIG = Object.freeze({
  apiBaseUrl: 'http://localhost:8080',
  productVideoUrl: '',
  requestTimeoutMs: 15000
});
