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
  async deletedFeedback(req, res) {
    const id = req.params.id;
    fetch(url + `feedbacks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
        res.send("Erro ao deletar feedback.");
      });
  }
  async getRestaurantsFeedbacks(req, res) {
    const id = req.params.id;
    fetch(url + `feedbacks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
        res.send("Erro ao pegar os feedback.");
      });
  }
  async createFeedback(req, res) {
    const json = req.body;
    fetch(url + `feedbacks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
        res.send("Erro ao criar feedback.");
      });
  }
}

module.exports = new FeedbackController();
