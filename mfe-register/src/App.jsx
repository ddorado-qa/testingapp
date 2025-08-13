// Componente React para registro usuario, post a /api/register
import React, { useState } from 'react';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${backendUrl}/api/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        setMessage('Usuario creado con éxito!');
        setUsername('');
        setPassword('');
      } else {
        const data = await res.json();
        setMessage(data.message || 'Error en el registro');
      }
    } catch (error) {
      setMessage('Error de conexión con backend');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Registrar usuario</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Usuario:</label><br />
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
