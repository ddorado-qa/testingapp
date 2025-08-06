import React, { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState({});
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts);
  }, []);

  const saveEdit = (id) => {
    fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing[id])
    }).then(() => {
      setEditing(p => {
        const { [id]: _, ...rest } = p;
        return rest;
      });
      return fetch('/api/products').then(r => r.json()).then(setProducts);
    });
  };

  const deleteProduct = (id) => {
    fetch(`/api/products/${id}`, { method: 'DELETE' })
      .then(() => setProducts(p => p.filter(prod => prod.id !== id)));
  };

  const addProduct = () => {
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    }).then(() => {
      setNewProduct({ name: '', price: '' });
      return fetch('/api/products').then(r => r.json()).then(setProducts);
    });
  };

  const exportCSV = () => {
    const csv = ['id,name,price', ...products.map(p => `${p.id},${p.name},${p.price}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'products.csv';
    a.click();
  };

  return (
    <div>
      <h2>Products</h2>
      <button qa-id="btn-export-csv" onClick={exportCSV}>Export CSV</button>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Price</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>
                <input
                  qa-id={`edit-name-${prod.id}`}
                  value={editing[prod.id]?.name ?? prod.name}
                  onChange={e => setEditing({ ...editing, [prod.id]: { ...prod, name: e.target.value } })}
                />
              </td>
              <td>
                <input
                  qa-id={`edit-price-${prod.id}`}
                  value={editing[prod.id]?.price ?? prod.price}
                  onChange={e => setEditing({ ...editing, [prod.id]: { ...prod, price: e.target.value } })}
                />
              </td>
              <td>
                <button qa-id={`btn-save-${prod.id}`} onClick={() => saveEdit(prod.id)}>Save</button>
                <button qa-id={`btn-delete-${prod.id}`} onClick={() => deleteProduct(prod.id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>New</td>
            <td><input qa-id="new-name" value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} /></td>
            <td><input qa-id="new-price" value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} /></td>
            <td><button qa-id="btn-add-product" onClick={addProduct}>Add Product</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
