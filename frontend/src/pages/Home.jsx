// Página Home con gráfico de ejemplo usando react-chartjs-2 y Chart.js
import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const data = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'Usuarios nuevos',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      borderColor: 'rgb(37, 99, 235)', // azul
      backgroundColor: 'rgba(37, 99, 235, 0.5)',
      tension: 0.3,
    }
  ]
}

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: {
      display: true,
      text: 'Crecimiento de Usuarios por Mes',
    },
  },
}

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bienvenido a QA App</h1>
      <Line options={options} data={data} />
    </div>
  )
}
