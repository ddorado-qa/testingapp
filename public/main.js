// JS central: logs, auth, i18n
function logAndAlert(msg) {
  alert(msg);
  sendLog({ type: 'alert', message: msg });
}

function sendLog(log) {
  fetch('/api/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(log)
  });
}

// I18N
const lang = localStorage.getItem('lang') || 'es';
fetch(`/i18n/${lang}.json`)
  .then(res => res.json())
  .then(dict => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
  });
