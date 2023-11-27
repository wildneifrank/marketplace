const DataAccess = require("../services/data_access.js");
const bcrypt = require("bcrypt");

class Admin {
  static getAdmin() {
    const db = new DataAccess("admin");
    const admin = db.all();
    return admin;
  }
  static updateAdmin(id, json) {
    const db = new DataAccess("admin");
    if (json.password) {
      json.password = cryptography(json.password);
    }
    try {
      db.update(id, json);
    } catch (error) {
      throw new Error(error);
    }
  }
}

function cryptography(password) {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
}

module.exports = Admin;
