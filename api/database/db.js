const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "containers-us-west-69.railway.app",
  port: "5792",
  user: "root",
  password: "hO910hRRy5X1Z3lxFbzC",
  database: "railway",
});

db.connect(function (err) {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conexão bem-sucedida ao banco de dados");
  }
});

module.exports = db;
