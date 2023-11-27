const Restaurant = require("../model/restaurant");

class RestaurantController {
  async getRestaurants(req, res) {
    const allRestaurants = Restaurant.getRestaurants();

    const filteredRestaurants = allRestaurants.filter(
      (restaurant) => !restaurant.deleted
    );
    const data = filteredRestaurants.map(
      ({ password, deleted, ...rest }) => rest
    );

    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(JSON.stringify(data));
  }
  async deleteRestaurant(req, res) {
    const id = req.params.id;
    res.setHeader("Content-Type", "application/json");
    try {
      Restaurant.deleteRestaurant(id);
      res.status(200).send({ message: "Restaurante deletado com sucesso!" });
    } catch (error) {
      res.status(401).send({ message: "Erro ao deletar restaurante!" });
    }
  }
  async updateRestaurant(req, res) {
    const id = req.params.id;
    const json = req.body;
    res.setHeader("Content-Type", "application/json");
    try {
      Restaurant.updateRestaurant(id, json);
      res.status(200).send({ message: "Restaurante atualizado com sucesso!" });
    } catch (error) {
      res.status(401).send({ message: "Erro ao atualizar restaurante!" });
    }
  }
  async createRestaurant(req, res) {
    const json = req.body;
    const emailExists = Restaurant.findRestaurant(json.email);
    res.setHeader("Content-Type", "application/json");
    try {
      if (emailExists) {
        throw new Error();
      }
      Restaurant.createRestaurant(json);
      res.status(200).send({ message: "Restaurante criado com sucesso!" });
    } catch (error) {
      if (!emailExists) {
        res.status(401).send({ message: "Erro ao criar restaurante!" });
      }

      res.status(401).send({ message: "Email já existente!" });
    }
  }
}

module.exports = new RestaurantController();
