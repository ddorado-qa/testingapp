// Servidor básico NodeJS sin frameworks
const http = require('http');
const fs = require('fs');
const path = require('path');
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const readJson = (file) =>
  JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8') || '[]');
const writeJson = (file, data) =>
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));

const server = http.createServer((req, res) => {
  const [_, api, resource] = req.url.split('/');
  const method = req.method;

  if (api !== 'api') {
    res.writeHead(404);
    return res.end('Not found');
  }

  const fileMap = {
    users: 'users.json',
    products: 'products.json',
    logs: 'logs.json',
  };

  const file = fileMap[resource];
  if (!file) {
    res.writeHead(404);
    return res.end('Resource not found');
  }

  let body = '';
  req.on('data', (chunk) => (body += chunk));
  req.on('end', () => {
    let data = readJson(file);

    if (method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(data));
    }

    if (method === 'POST') {
      const item = JSON.parse(body);
      item.id = Date.now();
      data.push(item);
      writeJson(file, data);
      res.writeHead(200);
      return res.end('Created');
    }

    if (method === 'PUT') {
      const updated = JSON.parse(body);
      data = data.map((d) => (d.id === updated.id ? updated : d));
      writeJson(file, data);
      res.writeHead(200);
      return res.end('Updated');
    }

    if (method === 'DELETE') {
      const { id } = JSON.parse(body);
      data = data.filter((d) => d.id !== id);
      writeJson(file, data);
      res.writeHead(200);
      return res.end('Deleted');
    }

    res.writeHead(405);
    res.end('Method not allowed');
  });
});

server.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
