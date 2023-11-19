import { Router } from "express";
import { OrderService } from "./ordersService";
import { OrderController } from "./ordersController";
import ordersModel from "./ordersModel";
import { isAuthenticated } from "../../middlewares/authenticationMiddleware";
import Validation from "./ordersValidation";

class OrderRouter {
  constructor() {
    this.router = Router();
    this.model =ordersModel;
    this.service = new OrderService(this.model);
    this.controller = new OrderController(this.service);
  }

  init() {
    // this.router.use(isAuthenticated);
    return this.router
      .get("/", (req, res) => this.controller.getAllOrders(req, res))
      .post("/", (req, res) => this.controller.createOrder(req, res))
      .get("/:code", Validation.getById(), (req, res) =>
        this.controller.getOrderById(req, res)
      )
      .patch("/:code", (req, res) => this.controller.updateOrder(req, res))
      .delete("/:code", (req, res) => this.controller.deleteOrder(req, res));
  }
}

export default new OrderRouter();
