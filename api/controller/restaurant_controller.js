const Restaurant = require("../model/restaurant");

class RestaurantController {
  async getRestaurants(req, res) {
    const data = Restaurant.getRestaurants();
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
}

module.exports = new RestaurantController();
