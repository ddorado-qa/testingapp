import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalStock: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/stats`);
      const data = await res.json();
      setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Products: {stats.totalProducts}</p>
      <p>Total Stock: {stats.totalStock}</p>
    </div>
  );
}
