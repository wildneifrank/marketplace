const fetch = require("node-fetch");

const url = "http://localhost:8800/";

class ProductController {
  async getProducts(req, res) {
    fetch(url + "products")
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
        res.send("Produtos não encontrados");
      });
  }
  async deletedProduct(req, res) {
    const id = req.params.id;
    fetch(url + `products/${id}`, {
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
        res.send("Erro ao deletar produto.");
      });
  }
  async updatedProduct(req, res) {
    const id = req.params.id;
    const json = req.body;
    try {
      const response = await fetch(url + `products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      res.status(200).send(data);
    } catch (error) {
      console.error("Erro durante a requisição:", error);
      res.status(500).send("Erro ao atualizar produto.");
    }
  }
  async getRestaurantProducts(req, res) {
    const id = req.params.id;
    try {
      const response = await fetch(url + `products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      const filteredData = data.filter(
        (product) => product.restaurant_id == id
      );

      res.status(200).send(filteredData);
    } catch (error) {
      console.error("Erro durante a requisição:", error);
      res.status(500).send("Erro ao atualizar produto.");
    }
  }
  async getBestProducts(req, res) {
    try {
      const response = await fetch(url + "products");
      if (!response.ok) {
        throw new Error("Erro na solicitação");
      }
      const data = await response.json();
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
      }
      const filteredProducts = data.filter((product) => product.status);
      const products = filteredProducts.slice(0, 6);
      res.status(200).send(products);
    } catch (error) {
      console.error("Erro:", error);
      res.send("Produtos não encontrados");
    }
  }
}

module.exports = new ProductController();
