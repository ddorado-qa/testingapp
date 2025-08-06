// Rutas principales con layout y navegación centralizada
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Products from './pages/Products'
import Logs from './pages/Logs'
import Settings from './pages/Settings'
import Support from './pages/Support'
import Rating from './pages/Rating'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="flex-grow overflow-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />
            <Route path="/rating" element={<Rating />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
