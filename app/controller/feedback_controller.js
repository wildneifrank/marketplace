const fetch = require("node-fetch");

const url = "http://localhost:8800/";

class FeedbackController {
  async getFeedbacks(req, res) {
    fetch(url + "feedbacks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação");
        }
        return response.json();
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        console.error("Erro:", error);
        res.send("Feedbacks não encontrados");
      });
  }
}

module.exports = new FeedbackController();
