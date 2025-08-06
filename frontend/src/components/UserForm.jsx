import { useState, useEffect } from "react";

export default function UserForm({ user, onSave }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    onSave({ ...user, name, email });
  };

  return (
    <form onSubmit={handleSubmit} data-qa-id="form-user">
      <div className="mb-4">
        <label className="block mb-1">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 w-full rounded"
          data-qa-id="input-name"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 w-full rounded"
          data-qa-id="input-email"
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        data-qa-id="btn-save-user"
      >
        Guardar
      </button>
    </form>
  );
}
