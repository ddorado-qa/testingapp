const logBtn = document.querySelector('[qa-id="log-btn"]');
const output = document.querySelector('[qa-id="log-output"]');

logBtn.addEventListener('click', async () => {
  await fetch('http://localhost:3000/api/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Log desde frontend QA' })
  });
  loadLogs();
});

async function loadLogs() {
  const res = await fetch('http://localhost:3000/api/logs');
  const data = await res.json();
  output.textContent = JSON.stringify(data, null, 2);
}

loadLogs();
