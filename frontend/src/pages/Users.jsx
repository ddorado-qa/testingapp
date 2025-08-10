import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "user" });
  const API = '/api'//import.meta.env.VITE_API_URL || "http://localhost:3001/api";

  const fetchUsers = async () => {
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setUsers(data);
  };

  const save = async () => {
    if (!form.name || !form.email) return;
    await fetch(`${API}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", email: "", role: "user" });
    fetchUsers();
  };

  const del = async (id) => {
    await fetch(`${API}/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <div className="mb-4 flex gap-2">
        <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} placeholder="Name" />
        <input value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} placeholder="Email" />
        <select value={form.role} onChange={(e)=>setForm({...form, role: e.target.value})}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button onClick={save} className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
      </div>

      <table className="w-full border">
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map(u=>(
            <tr key={u.id}>
              <td className="border px-2 py-1">{u.id}</td>
              <td className="border px-2 py-1">{u.name}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">{u.role}</td>
              <td className="border px-2 py-1">
                <button onClick={()=>del(u.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
