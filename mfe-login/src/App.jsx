// App.jsx sencillo para mfe-login que renderiza formulario de login

import React, { useState } from "react";

export default function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes conectar con backend o simular login
    if (user === "admin" && password === "admin") {
      setMessage("Login exitoso");
    } else {
      setMessage("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario: </label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Contraseña: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: 10 }}>
          Entrar
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
