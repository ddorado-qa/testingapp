// Componente raíz para MFE Login con verificación de conexión backend
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [backendStatus, setBackendStatus] = useState('Comprobando conexión...');

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.text())
      .then(data => setBackendStatus(`✅ Backend responde: ${data}`))
      .catch(err => setBackendStatus(`❌ Error al conectar: ${err.message}`));
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>MFE Login</h1>
      <p>Formulario de autenticación listo 🚀</p>
      <p>{backendStatus}</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
