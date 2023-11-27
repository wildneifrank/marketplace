const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8800;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(routes);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
