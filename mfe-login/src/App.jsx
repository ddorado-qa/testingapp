// MFE Login con botón para alternar entre login y registro
// Registro POST /api/register, Login POST /api/login

import React, { useState } from "react";

export default function App() {
  const [mode, setMode] = useState("login"); // 'login' o 'register'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  const handleLogin = async () => {
    setMessage("");
    try {
      const res = await fetch(`${backendUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Error en login");
      } else {
        setMessage(`Login exitoso. Usuario: ${data.username}`);
        // Aquí puedes hacer redirect o guardar sesión
      }
    } catch (e) {
      setMessage("Error conectando al backend");
    }
  };

  const handleRegister = async () => {
    setMessage("");
    try {
      const res = await fetch(`${backendUrl}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Error en registro");
      } else {
        setMessage("Usuario creado correctamente. Ya puedes iniciar sesión.");
        setMode("login");
        setUsername("");
        setPassword("");
      }
    } catch (e) {
      setMessage("Error conectando al backend");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>{mode === "login" ? "Login" : "Registro"}</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      {mode === "login" ? (
        <>
          <button onClick={handleLogin} style={{ width: "100%", padding: 10, marginBottom: 10 }}>
            Iniciar sesión
          </button>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                setMessage("");
                setMode("register");
              }}
              style={{ background: "none", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}
            >
              ¿No tienes cuenta? Regístrate
            </button>
          </div>
        </>
      ) : (
        <>
          <button onClick={handleRegister} style={{ width: "100%", padding: 10, marginBottom: 10 }}>
            Registrarse
          </button>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                setMessage("");
                setMode("login");
              }}
              style={{ background: "none", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </div>
        </>
      )}
      {message && <p style={{ color: "red", marginTop: 10 }}>{message}</p>}
    </div>
  );
}
