const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.status(200).render("index", {});
});

module.exports = routes;
