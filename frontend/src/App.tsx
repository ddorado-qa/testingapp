// @ts-nocheck
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Rating from "./pages/Rating";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      alert("Sesión expirada por inactividad");
      window.location.href = "/";
    }, 1000 * 60 * 10); // 10 minutos

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
