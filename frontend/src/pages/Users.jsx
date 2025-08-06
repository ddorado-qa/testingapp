import { useState } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";

export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "Juan", email: "juan@example.com" },
    { id: 2, name: "Ana", email: "ana@example.com" },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleAdd = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleSave = (user) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? user : u))
      );
    } else {
      setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        data-qa-id="btn-add-user"
      >
        Añadir Usuario
      </button>
      <Table
        headers={["Nombre", "Email", "Acciones"]}
        rows={users.map((u) => [
          u.name,
          u.email,
          <>
            <button
              className="text-blue-500"
              onClick={() => handleEdit(u)}
              data-qa-id={`edit-user-${u.id}`}
            >
              Editar
            </button>
            <button
              className="text-red-500 ml-2"
              onClick={() => handleDelete(u.id)}
              data-qa-id={`delete-user-${u.id}`}
            >
              Eliminar
            </button>
          </>,
        ])}
      />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <UserForm user={editingUser} onSave={handleSave} />
      </Modal>
    </div>
  );
}
