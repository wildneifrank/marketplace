const DataAccess = require("../services/data_access.js");

class Feedback {
  static getFeedbacks() {
    const db = new DataAccess("feedback");
    const feedbacks = db.all();
    return feedbacks;
  }
}

module.exports = Feedback;
