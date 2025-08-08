import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', stock: '' });

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editingId) {
      await fetch(`/api/products/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) }),
      });
    } else {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) }),
      });
    }
    setForm({ name: '', price: '', stock: '' });
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, price: p.price, stock: p.stock });
  };

  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="mb-4 space-x-2">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-1" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border p-1" />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" className="border p-1" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-2 py-1">
          {editingId ? 'Update' : 'Add'}
        </button>
      </div>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Stock</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border px-2 py-1">{p.id}</td>
              <td className="border px-2 py-1">{p.name}</td>
              <td className="border px-2 py-1">{p.price}</td>
              <td className="border px-2 py-1">{p.stock}</td>
              <td className="border px-2 py-1 space-x-2">
                <button onClick={() => handleEdit(p)} className="text-blue-500">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
