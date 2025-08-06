// Barra de navegación superior con links
import { Link, useLocation } from 'react-router-dom'

const routes = [
  { path: '/', label: 'Dashboard' },
  { path: '/users', label: 'Users' },
  { path: '/products', label: 'Products' },
  { path: '/logs', label: 'Logs' },
  { path: '/settings', label: 'Settings' },
  { path: '/support', label: 'Support' },
  { path: '/rating', label: 'Rating' }
]

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-4 py-2 flex gap-4 items-center">
      {routes.map(route => (
        <Link
          key={route.path}
          to={route.path}
          className={`px-3 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800 ${
            location.pathname === route.path ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-100'
          }`}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
