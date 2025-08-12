const express = require("express");
const router = express.Router();
const db = require("../lib/db"); // db.pool es un Pool de pg

// Crear tabla si no existe
(async () => {
  try {
    await db.pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer TEXT,
        product TEXT,
        quantity INTEGER,
        status TEXT
      )
    `);
    console.log("✅ Tabla 'orders' lista");
  } catch (err) {
    console.error("❌ Error creando tabla orders:", err);
  }
})();

// Listar pedidos
router.get("/", async (req, res) => {
  try {
    const result = await db.pool.query("SELECT * FROM orders");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error obteniendo pedidos:", err);
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
});

// Crear pedido
router.post("/", async (req, res) => {
  const { customer, product, quantity, status } = req.body;
  try {
    const result = await db.pool.query(
      "INSERT INTO orders (customer, product, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [customer, product, quantity, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error creando pedido:", err);
    res.status(500).json({ error: "Error al crear pedido" });
  }
});

// Editar pedido
router.put("/:id", async (req, res) => {
  const { customer, product, quantity, status } = req.body;
  try {
    await db.pool.query(
      "UPDATE orders SET customer=$1, product=$2, quantity=$3, status=$4 WHERE id=$5",
      [customer, product, quantity, status, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error actualizando pedido:", err);
    res.status(500).json({ error: "Error al actualizar pedido" });
  }
});

// Eliminar pedido
router.delete("/:id", async (req, res) => {
  try {
    await db.pool.query("DELETE FROM orders WHERE id=$1", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error eliminando pedido:", err);
    res.status(500).json({ error: "Error al eliminar pedido" });
  }
});

module.exports = router;
