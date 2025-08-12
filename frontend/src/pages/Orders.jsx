import React, { useState, useEffect } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ customer: "", product: "", quantity: 1, status: "Pending" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    setOrders(await res.json());
  };

  const saveOrder = async () => {
    if (editingId) {
      await fetch(`/api/orders/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    } else {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    }
    setForm({ customer: "", product: "", quantity: 1, status: "Pending" });
    setEditingId(null);
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    await fetch(`/api/orders/${id}`, { method: "DELETE" });
    fetchOrders();
  };

  return (
    <div>
      <h2>Orders</h2>
      <div>
        <input placeholder="Customer" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} />
        <input placeholder="Product" value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} />
        <input type="number" placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>
        <button onClick={saveOrder}>{editingId ? "Update" : "Add"} Order</button>
      </div>
      <table border="1" cellPadding="5">
        <thead>
          <tr><th>Customer</th><th>Product</th><th>Quantity</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.customer}</td>
              <td>{o.product}</td>
              <td>{o.quantity}</td>
              <td>{o.status}</td>
              <td>
                <button onClick={() => { setForm(o); setEditingId(o.id); }}>Edit</button>
                <button onClick={() => deleteOrder(o.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
