const fetch = require("node-fetch");

const url = "http://localhost:8800/";

class AuthController {
  async user(req, res) {
    res.render("pages/user/index");
  }
  async admin(req, res) {
    res.render("pages/admin/index");
  }
  async notFound(req, res) {
    res.render("pages/404/index");
  }
  async getProducts(req, res) {
    fetch(url + "products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação");
        }
        return response.json();
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        console.error("Erro:", error);
        res.send("Produtos não encontrados");
      });
  }
  async auth(req, res) {
    const json = req.body;
    try {
      const response = await fetch(url + `auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      res.status(200).send(data);
    } catch (error) {
      console.error("Erro durante a requisição:", error);
      res.status(500).send("Erro ao criar restaurante.");
    }
  }
}

module.exports = new AuthController();
