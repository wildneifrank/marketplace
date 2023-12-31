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

  create(json) {
    let new_id = this.data.length + 1;
    json.id = new_id;
    json["deleted"] = false;
    this.data.push(json);
    this.save();
  }

  token(json) {
    let new_id = this.data.length + 1;
    json.id = new_id;
    this.data.push(json);
    this.save();
  }

  delete_session(id) {
    let record = this.find(id);
    const existing_ids = this.data.map(({ id }) => id);
    let index = existing_ids.indexOf(record["id"]);

    this.data.splice(index, 1);
    this.save();
  }

  where(key, value) {
    let record = this.data.filter(
      (item) => item[key].toLowerCase() == value.toLowerCase()
    );

    return record;
  }

  delete(id) {
    let data = this.find(id);
    data["deleted"] = true;
    this.save();
  }

  update(id, json) {
    if (this.data.length < id) {
      throw new Error();
    }
    this.data[id - 1] = { ...this.data[id - 1], ...json };
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
