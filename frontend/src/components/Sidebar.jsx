import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">QA App</h1>
      <nav className="flex flex-col gap-2">
        <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded">Dashboard</Link>
        <Link to="/products" className="hover:bg-gray-700 px-3 py-2 rounded">Productos</Link>
        <Link to="/users" className="hover:bg-gray-700 px-3 py-2 rounded">Usuarios</Link>
        <Link to="/logs" className="hover:bg-gray-700 px-3 py-2 rounded">Logs</Link>
        <Link to="/support" className="hover:bg-gray-700 px-3 py-2 rounded">Soporte</Link>
      </nav>
    </div>
  );
}
