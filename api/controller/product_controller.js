const Product = require("../model/product");

class ProductController {
  async getProducts(req, res) {
    const allProducts = Product.getProducts();
    res.setHeader("Content-Type", "application/json");
    const filteredProducts = allProducts.filter((product) => !product.deleted);
    const data = filteredProducts.map(({ deleted, ...rest }) => rest);
    return res.status(200).send(JSON.stringify(data));
  }
  async deleteProduct(req, res) {
    const id = req.params.id;
    res.setHeader("Content-Type", "application/json");
    try {
      Product.deleteProduct(id);
      res.status(200).send({ message: "Produto deletado com sucesso!" });
    } catch (error) {
      res.status(401).send({ message: "Erro ao deletar produto!" });
    }
  }
  async updateProduct(req, res) {
    const id = req.params.id;
    const json = req.body;
    res.setHeader("Content-Type", "application/json");
    try {
      Product.updateProduct(id, json);
      res.status(200).send({ message: "Produto atualizado com sucesso!" });
    } catch (error) {
      res.status(401).send({ message: "Erro ao atualizar produto!" });
    }
  }
  async createProduct(req, res) {
    const json = req.body;
    res.setHeader("Content-Type", "application/json");
    try {
      Product.createProduct(json);
      res.status(200).send({ message: "Produto criado com sucesso!" });
    } catch (error) {
      res.status(401).send({ message: "Erro ao criar produto!" });
    }
  }
}

module.exports = new ProductController();
