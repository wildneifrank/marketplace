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
        if (!restaurant.status) {
          throw new Error();
        }
        res.render("pages/restaurant/index", {
          name: restaurant.name,
          email: restaurant.email,
          address: restaurant.address,
          number: restaurant.number,
          aboutUs: restaurant.aboutUs,
          image: restaurant.image,
          id: restaurant.id,
        });
      })
      .catch((error) => {
        res.render("pages/404/index");
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
  async deletedRestaurant(req, res) {
    const id = req.params.id;
    fetch(url + `restaurants/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
        res.send("Erro ao deletar restaurante.");
      });
  }
  async updatedRestaurant(req, res) {
    const id = req.params.id;
    const json = req.body;
    try {
      const response = await fetch(url + `restaurants/${id}`, {
        method: "PUT",
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
      res.status(500).send("Erro ao atualizar restaurante.");
    }
  }
  async createRestaurant(req, res) {
    const json = req.body;
    try {
      const response = await fetch(url + `restaurants`, {
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
  async getBestRestaurants(req, res) {
    try {
      const response = await fetch(url + "restaurants");
      if (!response.ok) {
        throw new Error("Erro na solicitação");
      }
      const data = await response.json();
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
      }
      const filteredRestaurants = data.filter(
        (restaurant) => restaurant.status
      );
      const restaurants = filteredRestaurants.slice(0, 6);
      res.status(200).send(restaurants);
    } catch (error) {
      console.error("Erro:", error);
      res.send("Restaurante não encontrado");
    }
  }
}

module.exports = new RestaurantController();
