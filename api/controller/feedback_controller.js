const Feedback = require("../model/feedback");

class FeedbackController {
  async getFeedbacks(req, res) {
    const data = Feedback.getFeedbacks();
    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(JSON.stringify(data));
  }
}

module.exports = new FeedbackController();
