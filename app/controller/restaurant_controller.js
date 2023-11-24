const fetch = require("node-fetch");

const url = "http://localhost:8800/";

class RestaurantController {
  async restaurant(req, res) {
    res.render("pages/restaurant/index");
  }
  async search(req, res) {
    res.render("pages/search/index");
  }
  async template(req, res) {
    const id = req.params.id;
    fetch(url + "restaurants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação");
        }
        return response.json();
      })
      .then((data) => {
        const restaurant = data.find((item) => item.id == id);
        res.render("pages/restaurant/index", {
          name: restaurant.name,
          email: restaurant.email,
          address: restaurant.address,
          number: restaurant.number,
          aboutUs: restaurant.aboutUs,
          image: restaurant.image,
        });
      })
      .catch((error) => {
        console.error("Erro:", error);
        res.send("Restaurante não encontrado");
      });
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
}

module.exports = new RestaurantController();
