import { Router } from "express";
import { RoleService } from "./rolesService";
import { RoleController } from "./rolesController";
import rolesModel from "./rolesModel";
import { isAuthenticated } from "../../middlewares/authenticationMiddleware";
import Validation from "./rolesValidation";

class RoleRouter {
  constructor() {
    this.router = Router();
    this.model =rolesModel;
    this.service = new RoleService(this.model);
    this.controller = new RoleController(this.service);
  }

  init() {
    // this.router.use(isAuthenticated);
    return this.router
      .get("/", (req, res) => this.controller.getAllRoles(req, res))
      .post("/", (req, res) => this.controller.createRole(req, res))
      .get("/:code", Validation.getById(), (req, res) =>
        this.controller.getRoleById(req, res)
      )
      .patch("/:code", (req, res) => this.controller.updateRole(req, res))
      .delete("/:code", (req, res) => this.controller.deleteRole(req, res));
  }
}

export default new RoleRouter();
