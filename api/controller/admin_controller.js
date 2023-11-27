const Admin = require("../model/admin");

class AdminController {
  async getAdmin(req, res) {
    const adminData = Admin.getAdmin();

    const data = adminData.map(({ password, ...rest }) => rest)[0];

    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(JSON.stringify(data));
  }
  async updateAdmin(req, res) {
    const id = req.params.id;
    const json = req.body;
    res.setHeader("Content-Type", "application/json");
    try {
      Admin.updateAdmin(id, json);
      res
        .status(200)
        .send({ message: "Administrador atualizado com sucesso!" });
    } catch (error) {
      res.status(401).send({ message: "Erro ao atualizar administrador!" });
    }
  }
}

module.exports = new AdminController();
