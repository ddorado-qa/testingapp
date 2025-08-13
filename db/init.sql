CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL -- in production hash this!
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product VARCHAR(100),
  quantity INTEGER,
  status VARCHAR(50)
);

-- Insert demo user
INSERT INTO users (username, password) VALUES ('testuser', 'password123');
INSERT INTO orders (user_id, product, quantity, status) VALUES
  (1, 'Product A', 3, 'pending'),
  (1, 'Product B', 1, 'shipped');
