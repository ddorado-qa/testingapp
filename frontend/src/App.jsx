// App principal con Router, Navegación y Layout base
import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Usuarios from './pages/Usuarios.jsx'
import Logs from './pages/Logs.jsx'
import Productos from './pages/Productos.jsx'
import Settings from './pages/Settings.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <header className="bg-blue-700 text-white p-4">
          <nav className="container mx-auto flex space-x-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "underline font-bold" : "hover:underline"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "underline font-bold" : "hover:underline"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/usuarios"
              className={({ isActive }) =>
                isActive ? "underline font-bold" : "hover:underline"
              }
            >
              Usuarios
            </NavLink>
            <NavLink
              to="/logs"
              className={({ isActive }) =>
                isActive ? "underline font-bold" : "hover:underline"
              }
            >
              Logs
            </NavLink>
            <NavLink
              to="/productos"
              className={({ isActive }) =>
                isActive ? "underline font-bold" : "hover:underline"
              }
            >
              Productos
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "underline font-bold" : "hover:underline"
              }
            >
              Settings
            </NavLink>
          </nav>
        </header>

        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="bg-gray-100 text-center p-4 text-sm text-gray-600">
          QA App © 2025 - Módulos & Flows
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
