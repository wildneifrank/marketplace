const routes = require("express").Router();
const RestaurantController = require("../controller/restaurant_controller.js");
const ProductController = require("../controller/product_controller.js");
const FeedbackController = require("../controller/feedback_controller.js");
const AdminController = require("../controller/admin_controller.js");
const SigninAccess = require("../services/signin_access.js");
const checkToken = require("../controller/check_token.js");

const AuthController = require("../controller/auth_controller.js");
const Authentication = require("../services/auth.js");

routes.post("/signin", SigninAccess);

// Feedbacks
routes.get("/feedbacks", FeedbackController.getFeedbacks);
routes.delete("/feedbacks/:id", FeedbackController.deleteFeedback);
routes.post("/feedbacks", FeedbackController.createFeedback);

// Produtos
routes.get("/products", ProductController.getProducts);
routes.delete("/products/:id", ProductController.deleteProduct);
routes.put("/products/:id", ProductController.updateProduct);
routes.post("/products", ProductController.createProduct);

// Restaurante
routes.get("/restaurants", RestaurantController.getRestaurants);
routes.delete("/restaurants/:id", RestaurantController.deleteRestaurant);
routes.put("/restaurants/:id", RestaurantController.updateRestaurant);
routes.post("/restaurants", RestaurantController.createRestaurant);

// Admin
routes.get("/admin", AdminController.getAdmin);
routes.put("/admin/:id", AdminController.updateAdmin);

// Auth
routes.post("/auth", AuthController.authenticate);
routes.post("/validateToken", AuthController.validateTokenAuth);
// Middleware p/ Autenticação
function authenticate(req, res, next) {
  const token = req.cookies["token"];

  if (!token) {
    res.status(401);
    return res.end();
  }

  const user = Authentication.validate_token(token);

  if (!user) {
    res.status(401);
    return res.end();
  }

  res.locals.user = user;
  next();
}

module.exports = routes;
