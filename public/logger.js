// Logger persistente
window.logEvent = function(action, detail) {
  const payload = {
    action,
    detail,
    user: JSON.parse(localStorage.getItem("user") || '{}').username || 'anon'
  };
  fetch('/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(() => console.log('[QA LOG]', payload));
};
