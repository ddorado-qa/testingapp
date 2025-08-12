import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Reports() {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState("");

  const fetchReports = async () => {
    const res = await fetch(`/api/reports${month ? `?month=${month}` : ""}`);
    setData(await res.json());
  };

  useEffect(() => { fetchReports(); }, [month]);

  const chartData = {
    labels: data.map(d => d.month),
    datasets: [{ label: "Sales", data: data.map(d => d.sales), backgroundColor: "rgba(75,192,192,0.6)" }]
  };

  return (
    <div>
      <h2>Reports</h2>
      <select value={month} onChange={e => setMonth(e.target.value)}>
        <option value="">All months</option>
        <option>January</option>
        <option>February</option>
        <option>March</option>
        <option>April</option>
      </select>
      <button onClick={fetchReports}>Refresh</button>
      <Bar data={chartData} />
    </div>
  );
}
