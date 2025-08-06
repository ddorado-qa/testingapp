// Página de productos con CRUD simple
import React, { useState } from 'react';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

const initialProducts = [
  { id: 1, name: 'Producto A', price: 25, stock: 10 },
  { id: 2, name: 'Producto B', price: 45, stock: 20 },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', stock: '' });

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', price: '', stock: '' });
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (editing) {
      setProducts(p =>
        p.map(prod => (prod.id === editing.id ? { ...editing, ...form } : prod))
      );
    } else {
      const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
      setProducts(p => [...p, { ...form, id: newId }]);
    }
    setModalOpen(false);
  };

  const handleDelete = id => {
    setProducts(p => p.filter(prod => prod.id !== id));
  };

  const handleEdit = product => {
    setEditing(product);
    setForm({ name: product.name, price: product.price, stock: product.stock });
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestión de Productos</h2>
      <button
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
        onClick={openNew}
        qa-id="btn-add-product"
      >
        <PlusCircle className="mr-2" /> Nuevo Producto
      </button>

      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Nombre</th>
            <th className="py-2 px-4 border-b text-left">Precio</th>
            <th className="py-2 px-4 border-b text-left">Stock</th>
            <th className="py-2 px-4 border-b text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b" qa-id={`product-name-${prod.id}`}>{prod.name}</td>
              <td className="py-2 px-4 border-b" qa-id={`product-price-${prod.id}`}>${prod.price}</td>
              <td className="py-2 px-4 border-b" qa-id={`product-stock-${prod.id}`}>{prod.stock}</td>
              <td className="py-2 px-4 border-b space-x-2">
                <button
                  onClick={() => handleEdit(prod)}
                  className="text-yellow-600 hover:text-yellow-800"
                  qa-id={`btn-edit-${prod.id}`}
                >
                  <Edit />
                </button>
                <button
                  onClick={() => handleDelete(prod.id)}
                  className="text-red-600 hover:text-red-800"
                  qa-id={`btn-delete-${prod.id}`}
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editing ? 'Editar Producto' : 'Nuevo Producto'}
            </h3>
            <input
              type="text"
              placeholder="Nombre"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              qa-id="input-name"
            />
            <input
              type="number"
              placeholder="Precio"
              value={form.price}
              onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })}
              className="w-full mb-2 p-2 border rounded"
              qa-id="input-price"
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: parseInt(e.target.value) })}
              className="w-full mb-4 p-2 border rounded"
              qa-id="input-stock"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
                qa-id="btn-cancel"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                qa-id="btn-save"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
