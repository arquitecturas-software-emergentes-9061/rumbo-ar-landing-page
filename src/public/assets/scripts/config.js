// Deployment settings of the landing page. Change them here, not in main.js.
// apiBaseUrl: origin of rumbo-api, without a trailing slash. Its CORS_ALLOWED_ORIGINS must include this page.
//   Served from localhost (or opened as a file) the page uses the local API; published, it uses the one on Render.
// productVideoUrl: public URL of the product video; while it is empty the page says the video is in preparation.
// requestTimeoutMs: the free Render instance sleeps when idle and its first answer can take about a minute.
(() => {
  const local = location.protocol === 'file:' || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  window.RUMBO_CONFIG = Object.freeze({
    apiBaseUrl: local ? 'http://localhost:8080' : 'https://rumbo-api-demo.onrender.com',
    productVideoUrl: '',
    requestTimeoutMs: 70000
  });
})();
