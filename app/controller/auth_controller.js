class AuthController {
  async user(req, res) {
    res.render("pages/user/index");
  }
  async admin(req, res) {
    res.render("pages/admin/index");
  }
}

module.exports = new AuthController();
