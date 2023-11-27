const Authentication = require("../services/auth");

class AuthController {
  async authenticate(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const token = Authentication.login(email, password);
    if (token) {
      const data = {
        token,
      };
      res.status(200);
      res.send(JSON.stringify(data));
      return res.end();
    }
    res.status(401);
    return res.end();
  }
}

module.exports = new AuthController();
