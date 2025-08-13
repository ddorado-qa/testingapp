// Componente React principal del shell que usa iframes para cargar cada MFE por URL

import React, { useState } from "react";

const routes = {
  login: "http://localhost:5174",
  dashboard: "http://localhost:5175",
  shell: null, // Shell mismo o alguna página base si quieres
};

export default function App() {
  const [route, setRoute] = useState("login");

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <header style={{ padding: 16, backgroundColor: "#282c34", color: "white" }}>
        <h1>Micro Frontends Shell</h1>
        <nav>
          <button onClick={() => setRoute("login")} style={{ marginRight: 8 }}>
            Login
          </button>
          <button onClick={() => setRoute("dashboard")} style={{ marginRight: 8 }}>
            Dashboard
          </button>
          {/* Puedes añadir más botones para otros MFEs */}
        </nav>
      </header>

      <main style={{ padding: 16, height: "80vh", border: "1px solid #ccc" }}>
        {route === "shell" && <p>Bienvenido al shell principal</p>}
        {route !== "shell" && routes[route] && (
          <iframe
            src={routes[route]}
            style={{ width: "100%", height: "100%", border: "none" }}
            title={route}
          />
        )}
        {!routes[route] && route !== "shell" && <p>Página no encontrada</p>}
      </main>
    </div>
  );
}
