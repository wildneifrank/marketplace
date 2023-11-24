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
  find(id) {
    let data = this.data.filter((item) => item["id"] == id);

    if (data.length < 1) {
      data = null;
    } else {
      data = data[0];
    }

    return data;
  }
  all() {
    return this.data;
  }
  delete(id) {
    let data = this.find(id);
    data["deleted"] = true;
    this.save();
  }
  save() {
    writeFile(this.path, this.data);
    this.reload_data();
  }

  reload_data() {
    this.data = JSON.parse(readFile(this.path));
  }
}

function readFile(path) {
  return fs.readFileSync(path, "utf8", (error) => {
    if (error) {
      throw error;
    }
  });
}
function writeFile(path, data) {
  fs.writeFileSync(path, JSON.stringify(data), (error) => {
    if (error) {
      throw error;
    }
  });
}

module.exports = DataAccess;
