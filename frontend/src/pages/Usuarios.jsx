// Página Usuarios con tabla básica sin conexión a backend (mock)
import React from 'react'

const usuariosMock = [
  { id: 1, nombre: 'Maria', email: 'maria@example.com' },
  { id: 2, nombre: 'Juan', email: 'juan@example.com' },
  { id: 3, nombre: 'Ana', email: 'ana@example.com' },
]

export default function Usuarios() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Usuarios</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-2 text-left">ID</th>
            <th className="border border-gray-300 p-2 text-left">Nombre</th>
            <th className="border border-gray-300 p-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {usuariosMock.map((u) => (
            <tr key={u.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{u.id}</td>
              <td className="border border-gray-300 p-2">{u.nombre}</td>
              <td className="border border-gray-300 p-2">{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
