class HomeController {
  async index(req, res) {
    res.render("pages/home/index");
  }
  async login(req, res) {
    res.render("pages/login/index");
  }
  async register(req, res) {
    res.render("pages/register/index");
  }
}

module.exports = new HomeController();
