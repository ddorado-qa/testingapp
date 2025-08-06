// Página de navegación principal con layout
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import Users from './Users'
import Products from './Products'
import Logs from './Logs'
import Settings from './Settings'
import Support from './Support'
import Rating from './Rating'
import Login from './Login'
import NotFound from './NotFound'
import Layout from '../components/Layout'

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />
        <Route path="/rating" element={<Rating />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
)

export default AppRoutes
