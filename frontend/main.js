import Chart from "chart.js/auto";
import { translations } from "./i18n.js";

const title = document.getElementById("title");
const langSelect = document.getElementById("lang-select");
const logMsg = document.getElementById("log-msg");
const sendBtn = document.getElementById("send-log");
const chartCanvas = document.getElementById("chart");

// Simular usuario y rol en localStorage
if (!localStorage.getItem("user")) {
  localStorage.setItem("user", JSON.stringify({ name: "tester", role: "admin" }));
}

let lang = "es";

function applyTranslation() {
  const t = translations[lang];
  title.innerText = t.title;
  sendBtn.innerText = t.send;
  logMsg.placeholder = t.log;
}

langSelect.value = lang;
langSelect.addEventListener("change", (e) => {
  lang = e.target.value;
  applyTranslation();
});

sendBtn.addEventListener("click", async () => {
  const msg = logMsg.value;
  if (!msg) return;

  const user = JSON.parse(localStorage.getItem("user"));
  await fetch("http://localhost:3000/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg, level: "info", user: user.name }),
  });
  logMsg.value = "";
  loadLogs();
});

let chart;

async function loadLogs() {
  const res = await fetch("http://localhost:3000/api/logs");
  const logs = await res.json();

  const grouped = logs.reduce((acc, log) => {
    const label = log.user || "anon";
    acc[label] = acc[label] ? acc[label] + 1 : 1;
    return acc;
  }, {});

  const labels = Object.keys(grouped);
  const data = Object.values(grouped);

  if (chart) chart.destroy();
  chart = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels,
      datasets: [{ label: "Logs por usuario", data }],
    },
  });
}

applyTranslation();
loadLogs();
