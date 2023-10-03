const db = require("../database/db");

const getData = (_, res) => {
  const q = "SELECT * FROM teste";

  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
};

module.exports = getData;
