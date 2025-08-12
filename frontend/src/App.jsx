import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Users</Link> |{" "}
        <Link to="/products">Products</Link> |{" "}
        <Link to="/orders">Orders</Link> |{" "}
        <Link to="/reports">Reports</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}
