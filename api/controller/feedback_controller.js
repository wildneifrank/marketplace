const Feedback = require("../model/feedback");

class FeedbackController {
  async getFeedbacks(req, res) {
    const data = Feedback.getFeedbacks();
    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(JSON.stringify(data));
  }
  async deleteProduct(req, res) {
    const id = req.params.id;
    res.setHeader("Content-Type", "application/json");
    try {
      Feedback.deleteFeedback(id);
      res.status(200).send({ message: "Feedback deletado com sucesso!" });
    } catch (error) {
      res.status(401).send({ message: "Erro ao deletar feedback!" });
    }
  }
}

module.exports = new FeedbackController();
