const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.status(200).render("index", {});
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
