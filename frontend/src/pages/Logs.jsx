// Página Logs con tabla y filtro simple de búsqueda
import React, { useState } from 'react'

const logsMock = [
  { id: 1, fecha: '2025-08-01', mensaje: 'Usuario Maria inició sesión' },
  { id: 2, fecha: '2025-08-02', mensaje: 'Error en módulo Productos' },
  { id: 3, fecha: '2025-08-03', mensaje: 'Usuario Juan cerró sesión' },
  { id: 4, fecha: '2025-08-04', mensaje: 'Actualización de producto 23' },
]

export default function Logs() {
  const [filtro, setFiltro] = useState('')

  const logsFiltrados = logsMock.filter((log) =>
    log.mensaje.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Logs</h1>
      <input
        type="text"
        placeholder="Buscar en logs..."
        className="border p-2 mb-4 w-full max-w-sm"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-2 text-left">ID</th>
            <th className="border border-gray-300 p-2 text-left">Fecha</th>
            <th className="border border-gray-300 p-2 text-left">Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {logsFiltrados.map((log) => (
            <tr key={log.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{log.id}</td>
              <td className="border border-gray-300 p-2">{log.fecha}</td>
              <td className="border border-gray-300 p-2">{log.mensaje}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
