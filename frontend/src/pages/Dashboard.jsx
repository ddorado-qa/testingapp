import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalStock: 0 });
  const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

  useEffect(() => {
    fetch(`${API}/stats`).then(r=>r.json()).then(setStats).catch(()=>{});
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <div>Total Users: {stats.totalUsers}</div>
      <div>Total Products: {stats.totalProducts}</div>
      <div>Total Stock: {stats.totalStock}</div>
    </div>
  );
}
