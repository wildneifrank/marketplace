const DataAccess = require("../services/data_access.js");

class Feedback {
  static getFeedbacks() {
    const db = new DataAccess("feedback");
    const feedbacks = db.all();
    return feedbacks;
  }
  static deleteFeedback(id) {
    const db = new DataAccess("feedback");
    try {
      db.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
  static createFeedback(json) {
    const db = new DataAccess("feedback");
    try {
      db.create(json);
    } catch (error) {
      throw new Error(error);
    }
  }
  static getRestaurantsFeedbacks(id) {
    const data = this.getFeedbacks();
    const feedbacks = data.filter((item) => item.restaurant_id == id);
    return feedbacks;
  }
}

module.exports = Feedback;
