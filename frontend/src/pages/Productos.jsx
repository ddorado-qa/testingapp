// Página Productos con CRUD simple sin backend, usando estado local
import React, { useState } from 'react'

const productosIniciales = [
  { id: 1, nombre: 'Producto A', precio: 10.5 },
  { id: 2, nombre: 'Producto B', precio: 20.0 },
]

export default function Productos() {
  const [productos, setProductos] = useState(productosIniciales)
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevoPrecio, setNuevoPrecio] = useState('')

  function agregarProducto() {
    if (!nuevoNombre.trim() || !nuevoPrecio) return
    const idNuevo = productos.length ? productos[productos.length - 1].id + 1 : 1
    setProductos([...productos, { id: idNuevo, nombre: nuevoNombre, precio: parseFloat(nuevoPrecio) }])
    setNuevoNombre('')
    setNuevoPrecio('')
  }

  function eliminarProducto(id) {
    setProductos(productos.filter(p => p.id !== id))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Productos</h1>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 flex-grow"
          value={nuevoNombre}
          onChange={e => setNuevoNombre(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Precio"
          className="border p-2 w-24"
          value={nuevoPrecio}
          onChange={e => setNuevoPrecio(e.target.value)}
        />
        <button
          onClick={agregarProducto}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-2 text-left">ID</th>
            <th className="border border-gray-300 p-2 text-left">Nombre</th>
            <th className="border border-gray-300 p-2 text-left">Precio</th>
            <th className="border border-gray-300 p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{p.id}</td>
              <td className="border border-gray-300 p-2">{p.nombre}</td>
              <td className="border border-gray-300 p-2">${p.precio.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => eliminarProducto(p.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
