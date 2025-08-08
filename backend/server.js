const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/stats", require("./routes/stats"));

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
