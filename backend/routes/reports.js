const express = require("express");
const router = express.Router();

// Genera datos mockeados para reportes
router.get("/", (req, res) => {
  const { month } = req.query;
  const data = [
    { month: "January", sales: 1200 },
    { month: "February", sales: 800 },
    { month: "March", sales: 1500 },
    { month: "April", sales: 900 }
  ];
  const filtered = month ? data.filter(d => d.month === month) : data;
  res.json(filtered);
});

module.exports = router;
