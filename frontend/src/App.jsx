import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/">Dashboard</Link>
        <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
