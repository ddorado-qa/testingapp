import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: 0, stock: 0 });
  const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

  const fetchProducts = async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data);
  };

  const save = async () => {
    if (!form.name) return;
    await fetch(`${API}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", price: 0, stock: 0 });
    fetchProducts();
  };

  const del = async (id) => {
    await fetch(`${API}/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="mb-4 flex gap-2">
        <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} placeholder="Name" />
        <input type="number" value={form.price} onChange={(e)=>setForm({...form, price: parseFloat(e.target.value)})} placeholder="Price" />
        <input type="number" value={form.stock} onChange={(e)=>setForm({...form, stock: parseInt(e.target.value||0)})} placeholder="Stock" />
        <button onClick={save} className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
      </div>

      <table className="w-full border">
        <thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map(p=>(
            <tr key={p.id}>
              <td className="border px-2 py-1">{p.id}</td>
              <td className="border px-2 py-1">{p.name}</td>
              <td className="border px-2 py-1">{p.price}</td>
              <td className="border px-2 py-1">{p.stock}</td>
              <td className="border px-2 py-1"><button onClick={()=>del(p.id)} className="text-red-600">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
