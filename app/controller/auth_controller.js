const fetch = require("node-fetch");

const url = "http://localhost:8800/";

class AuthController {
  async user(req, res) {
    res.render("pages/user/index");
  }
  async admin(req, res) {
    fetch(url + "restaurants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        res.render("pages/admin/index", {
          users: data,
        });
      })
      .catch((error) => {
        console.error("Erro:", error);
        res.send("Restaurante não encontrado");
      });
  }
}

module.exports = new AuthController();
