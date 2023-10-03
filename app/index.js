const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
