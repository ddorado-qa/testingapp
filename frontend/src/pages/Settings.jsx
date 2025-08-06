// Página Settings básica con opciones ficticias
import React from 'react'

export default function Settings() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Configuración</h1>
      <p>Aquí puedes configurar opciones de la aplicación.</p>
      <ul className="list-disc ml-6 mt-2">
        <li>Notificaciones: Activadas</li>
        <li>Modo oscuro: Desactivado</li>
        <li>Idioma: Español</li>
      </ul>
    </div>
  )
}
