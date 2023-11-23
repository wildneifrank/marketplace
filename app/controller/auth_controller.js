const fetch = require("node-fetch");

const url = "http://localhost:8800/";

class AuthController {
  async user(req, res) {
    res.render("pages/user/index");
  }
  async admin(req, res) {
    res.render("pages/admin/index");
  }
  async getRestaurants(req, res) {
    fetch(url + "restaurants")
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
        res.send("Restaurante não encontrado");
      });
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
  async getFeedbacks(req, res) {
    fetch(url + "feedbacks")
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
        res.send("Feedbacks não encontrados");
      });
  }
}

module.exports = new AuthController();
