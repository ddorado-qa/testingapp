// Página 404 simple
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="mb-4">Página no encontrada.</p>
      <Link to="/" className="text-blue-600 hover:underline">Volver al inicio</Link>
    </div>
  )
}
