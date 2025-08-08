const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const totalUsers = await db("users").count("id as count").first();
  const totalProducts = await db("products").count("id as count").first();
  const totalStock = await db("products").sum("stock as total").first();

  res.json({
    totalUsers: totalUsers.count,
    totalProducts: totalProducts.count,
    totalStock: totalStock.total || 0,
  });
});

module.exports = router;
