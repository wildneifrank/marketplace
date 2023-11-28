const fetch = require("node-fetch");

const url = "http://localhost:8800/";

class AuthController {
  async user(req, res) {
    const token = req.cookies.token;
    const role = req.cookies.role;
    const json = {
      token,
    };
    if (!(role === "user")) {
      res.status(404).render("pages/404/index");
    }
    try {
      const response = await fetch(url + `validateToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      res.status(200).render("pages/user/index", {
        name: data.name,
        image: data.image,
        id: data.id,
      });
    } catch (error) {
      res.status(404).render("pages/404/index");
    }
  }
  async admin(req, res) {
    const token = req.cookies.token;
    const role = req.cookies.role;
    const json = {
      token,
    };
    if (!(role === "admin")) {
      res.status(404).render("pages/404/index");
    }
    try {
      const response = await fetch(url + `validateToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      res.status(200).render("pages/admin/index", {
        name: data.name,
        image: data.image,
      });
    } catch (error) {
      res.status(404).render("pages/404/index");
    }
  }
  async sessionValidate(req, res) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).send({ message: "Acesso negado!" });
    }
    const json = {
      token,
    };

    try {
      const response = await fetch(url + `validateToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      data["role"] = req.cookies.role;
      res.status(200).send(JSON.stringify(data));
    } catch (error) {
      res.status(404).send({ message: "Acesso negado!" });
    }
  }
  async notFound(req, res) {
    res.render("pages/404/index");
  }
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
  async auth(req, res) {
    const json = req.body;
    try {
      const response = await fetch(url + `auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      res
        .status(200)
        .cookie("token", data.token, { httpOnly: true })
        .cookie("role", data.role, { httpOnly: true })
        .send({ role: data.role });
    } catch (error) {
      res.status(500).send("Erro ao realizar o login.");
    }
  }

  async logout(req, res) {
    try {
      const token = req.cookies.token;

      if (!token) {
        throw new Error("Token não encontrado");
      }

      const json = { token };

      const response = await fetch(url + `logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      res
        .status(200)
        .clearCookie("token")
        .clearCookie("role")
        .send({ message: "Logout feito com sucesso!" });
    } catch (error) {
      console.error("Erro durante o logout:", error);
      res.status(500).send({ message: "Erro durante o logout." });
    }
  }
}
module.exports = new AuthController();
