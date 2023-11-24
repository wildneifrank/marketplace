const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const adminkey = "kofrfemfekf";
const restkey = "ffirejrfremfrmr";

const app = express();
const PORT = 8800;

app.use(express.json());
app.use(cors())
app.use(routes);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
