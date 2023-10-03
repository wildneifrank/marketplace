const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "containers-us-west-69.railway.app",
  port: "5792",
  user: "root",
  password: "hO910hRRy5X1Z3lxFbzC",
  database: "railway",
});

module.exports = db;
