// Página Dashboard simple con resumen y mensajes
import React from 'react'

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Resumen rápido del estado del sistema.</p>
      <ul className="list-disc ml-6 mt-2">
        <li>Usuarios totales: 124</li>
        <li>Logs recientes: 58</li>
        <li>Productos activos: 32</li>
      </ul>
    </div>
  )
}
