const Authentication = require("../services/auth");

class AuthController {
  async authenticate(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    Authentication.login(email, password).then((token) => {
      if (token) {
        res.status(200).cookie("token", token, { httpOnly: true });
        res.json({ message: "Login bem-sucedido" });
        return res.end();
      }
      res.status(401);
      return res.end();
    });
  }
  async validateTokenAuth(req, res) {
    // const session_token = req.cookies["session_token"]
    const session_token = req.body.token;
    const user = Authentication.validate_token(session_token);

    if (user) {
      const { deleted, status, password, ...data } = user;
      res.status(200);
      res.send(JSON.stringify(data));
      return res.end();
    }

    res.status(401);
    return res.end();
  }
}

module.exports = new AuthController();
