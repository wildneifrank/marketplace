const routes = require("express").Router();
const getData = require("../controller/test");

routes.get("/", getData);

module.exports = routes;
