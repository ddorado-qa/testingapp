// Layout con menú lateral y navegación
import { Link, Outlet, useLocation } from 'react-router-dom'
import './Layout.css'

const menu = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/users', label: 'Users' },
  { path: '/products', label: 'Products' },
  { path: '/logs', label: 'Logs' },
  { path: '/settings', label: 'Settings' },
  { path: '/support', label: 'Support' },
  { path: '/rating', label: 'Rating' },
]

export default function Layout() {
  const location = useLocation()
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>QA App</h2>
        <nav>
          <ul>
            {menu.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                  data-qa-id={`nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
