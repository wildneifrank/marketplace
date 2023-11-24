const express = require("express");
const app = express();
const PORT = 3001;
const bodyParser = require("body-parser");
const path = require("path");
const staticPath = path.join(__dirname, "/public");
const routes = require("./routes/routes");

app.use(express.static(staticPath));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
