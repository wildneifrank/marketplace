class RestaurantController {
  async restaurant(req, res) {
    res.render("pages/restaurant/index");
  }
  async search(req, res) {
    res.render("pages/search/index");
  }
}

module.exports = new RestaurantController();
