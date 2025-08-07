import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function Dashboard() {
  const [data, setData] = useState({
    labels: ['Productos', 'Usuarios', 'Logs'],
    datasets: [
      {
        label: 'Conteo',
        data: [5, 3, 12],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b']
      }
    ]
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="w-full max-w-2xl bg-white rounded shadow p-4">
        <Bar data={data} />
      </div>
    </div>
  );
}
