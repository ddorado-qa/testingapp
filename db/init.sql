-- Inicialización de la BBDD (se ejecuta la 1ª vez)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0
);

-- Datos de ejemplo
INSERT INTO users (name, email, role) VALUES
  ('Alice', 'alice@example.com', 'admin'),
  ('Bob', 'bob@example.com', 'user')
ON CONFLICT DO NOTHING;

INSERT INTO products (name, price, stock) VALUES
  ('Widget A', 9.99, 10),
  ('Widget B', 19.99, 5)
ON CONFLICT DO NOTHING;
