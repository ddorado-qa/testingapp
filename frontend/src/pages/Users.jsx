import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const fetchUsers = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
    const data = await res.json();
    setUsers(data);
  };

  const addUser = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    setNewUser({ name: "", email: "" });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
      method: "DELETE",
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <input
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <button onClick={addUser}>Add</button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email}){" "}
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
