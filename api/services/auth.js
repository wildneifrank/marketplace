const User = require("../model/restaurant");
const DataAccessor = require("./data_access");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "By$dwQ;m9[kU72.Pa^u!Ep42:FYPS*Rk$NaYf}oBNLm0_Qs]";

class Authenticate {
  static login(email, password) {
    const user = User.findRestaurant(email)[0];

    const hashDecrypt = bcrypt.compare(password, user.password);

    if (user && hashDecrypt) {
      const token = generate_jwt(user);
      return token;
    }

    return false;
  }

  static validate_token(user_session_token) {
    const db = new DataAccessor("token");

    const register = db.where(
      "session_token",
      user_session_token.toString()
    )[0];
    try {
      var decoded = jwt.verify(register.session_token, secretKey);
      const user = User.findRestaurant(decoded.email)[0];

      return user;
    } catch (error) {
      return false;
    }
  }

  static logout(user_session_token) {
    const db = new DataAccessor("token");
    const register = db.where("session_token", user_session_token)[0];
    db.delete_session(register.id);

    const valid = Authenticate.validate_token(user_session_token);

    return !valid;
  }
}

function generate_jwt(user) {
  const db = new DataAccessor("token");
  const payload = {
    sub: user.id,
    email: user.email,
  };

  const jwtToken = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  db.token({ session_token: jwtToken });
  return jwtToken;
}

module.exports = Authenticate;
