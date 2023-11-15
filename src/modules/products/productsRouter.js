import { Router } from "express";
import { ProductService } from "./productsService";
import { ProductController } from "./productsController";
import productsModel from "./productsModel";
import { isAuthenticated } from "../../middlewares/authenticationMiddleware";
import Validation from "./productsValidation";

class ProductRouter {
  constructor() {
    this.router = Router();
    this.model =productsModel;
    this.service = new ProductService(this.model);
    this.controller = new ProductController(this.service);
  }

  init() {
    // this.router.use(isAuthenticated);
    return this.router
      .get("/", (req, res) => this.controller.getAllProducts(req, res))
      .post("/", (req, res) => this.controller.createProduct(req, res))
      .get("/:code", Validation.getById(), (req, res) =>
        this.controller.getProductById(req, res)
      )
      .patch("/:code", (req, res) => this.controller.updateProduct(req, res))
      .delete("/:code", (req, res) => this.controller.deleteProduct(req, res));
  }
}

export default new ProductRouter();
