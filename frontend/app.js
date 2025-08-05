// Manejador SPA simple + funciones QA
let session = localStorage.getItem("user");
if (!session) {
  session = prompt("Enter username to start session");
  localStorage.setItem("user", session);
  setTimeout(() => {
    alert("Session expired!");
    logout();
  }, 60000);
}

const navigate = (page) => {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(page).classList.remove('hidden');
  if (page === 'users') loadUsers();
  if (page === 'products') loadProducts();
  if (page === 'logs') loadLogs();
  if (page === 'dashboard') drawChart();
};

const logout = () => {
  localStorage.removeItem("user");
  location.reload();
};

const api = (res) => `/api/${res}`;

const loadUsers = async () => {
  const users = await fetch(api('users')).then(r => r.json());
  const container = document.getElementById('users');
  container.innerHTML = `
    <h2>Users</h2>
    <button onclick="addUser()" qa-id="add-user-btn">Add User</button>
    <table qa-id="users-table">
      <tr><th>Name</th><th>Email</th><th>Action</th></tr>
      ${users.map(u => `
        <tr>
          <td><input value="${u.name}" onchange="updateUser(${u.id}, this.value, 'name')" qa-id="user-name-${u.id}" /></td>
          <td><input value="${u.email}" onchange="updateUser(${u.id}, this.value, 'email')" qa-id="user-email-${u.id}" /></td>
          <td><button onclick="deleteUser(${u.id})" qa-id="delete-user-${u.id}">❌</button></td>
        </tr>
      `).join('')}
    </table>`;
};

const addUser = async () => {
  const name = prompt("Name:");
  const email = prompt("Email:");
  await fetch(api('users'), {
    method: 'POST',
    body: JSON.stringify({ name, email }),
  });
  loadUsers();
};

const updateUser = async (id, value, field) => {
  const users = await fetch(api('users')).then(r => r.json());
  const user = users.find(u => u.id === id);
  user[field] = value;
  await fetch(api('users'), {
    method: 'PUT',
    body: JSON.stringify(user),
  });
};

const deleteUser = async (id) => {
  await fetch(api('users'), {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
  loadUsers();
};

// Productos similar a users
const loadProducts = async () => {
  const products = await fetch(api('products')).then(r => r.json());
  const container = document.getElementById('products');
  container.innerHTML = `
    <h2>Products</h2>
    <button onclick="addProduct()" qa-id="add-product-btn">Add Product</button>
    <table qa-id="products-table">
      <tr><th>Name</th><th>Price</th><th>Action</th></tr>
      ${products.map(p => `
        <tr draggable="true" ondragstart="drag(event, ${p.id})">
          <td><input value="${p.name}" onchange="updateProduct(${p.id}, this.value, 'name')" qa-id="product-name-${p.id}" /></td>
          <td><input value="${p.price}" onchange="updateProduct(${p.id}, this.value, 'price')" qa-id="product-price-${p.id}" /></td>
          <td><button onclick="deleteProduct(${p.id})" qa-id="delete-product-${p.id}">❌</button></td>
        </tr>
      `).join('')}
    </table>`;
};

const addProduct = async () => {
  const name = prompt("Product name:");
  const price = prompt("Price:");
  await fetch(api('products'), {
    method: 'POST',
    body: JSON.stringify({ name, price }),
  });
  loadProducts();
};

const updateProduct = async (id, value, field) => {
  const products = await fetch(api('products')).then(r => r.json());
  const product = products.find(p => p.id === id);
  product[field] = value;
  await fetch(api('products'), {
    method: 'PUT',
    body: JSON.stringify(product),
  });
};

const deleteProduct = async (id) => {
  await fetch(api('products'), {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
  loadProducts();
};

const loadLogs = async () => {
  const logs = await fetch(api('logs')).then(r => r.json());
  const container = document.getElementById('logs');
  container.innerHTML = `
    <h2>Logs</h2>
    <button onclick="exportLogsCSV()" qa-id="export-logs-btn">Export CSV</button>
    <table qa-id="logs-table">
      <tr><th>Action</th><th>Date</th></tr>
      ${logs.map(l => `<tr><td>${l.action}</td><td>${l.date}</td></tr>`).join('')}
    </table>`;
};

const exportLogsCSV = async () => {
  const logs = await fetch(api('logs')).then(r => r.json());
  const csv = logs.map(l => `${l.action},${l.date}`).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'logs.csv';
  a.click();
};

const drawChart = async () => {
  const ctx = document.getElementById('chart').getContext('2d');
  const data = await fetch(api('products')).then(r => r.json());

  if (window.chartInstance) window.chartInstance.destroy();

  window.chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(p => p.name),
      datasets: [{
        label: 'Prices',
        data: data.map(p => +p.price),
      }],
    },
  });
};
