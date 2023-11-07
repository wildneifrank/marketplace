const fs = require("fs");

class DataAccess {
  /**
   * @param data
   * @param path
   */

  constructor(type) {
    this.path = `./database/${type}.json`;
    this.data = JSON.parse(readFile(this.path));
  }
  all() {
    return this.data;
  }
}

function readFile(path) {
  return fs.readFileSync(path, "utf8", (error) => {
    if (error) {
      throw error;
    }
  });
}

module.exports = DataAccess;
