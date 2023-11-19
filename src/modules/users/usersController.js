export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async getAllUsers(req, res) {
    return res.json(await this.userService.getAll());
  }

  async getUserById(req, res) {
    try {
      const userID = req.params.email;
      const user = await this.userService.getById(userID);
      return res.json(user);
    } catch (e) {
      return res.status(e.code).json({ message: e.message });
    }
  }

  async createUser(req, res) {
    const user = await this.userService.create(req.body);
    return res.status(201).json(user);
  }

  async updateUser(req, res) {
    try {
      const userID = req.params.email;
      const user = await this.userService.update(userID, req.body);
      return res.json(user);
    } catch (e) {
      return res.status(e.code).json({ message: e.message });
    }
  }
  async updatePerfil(req, res) {
    console.log("Actualizando perfil")
    try {
      const userID = req.current_user;
      const user = await this.userService.update(userID, req.body);
      return res.json(user);
    } catch (e) {
      return res.status(e.code).json({ message: e.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const userID = req.params.email;
      await this.userService.delete(userID);
      return res.status(204).send("");
    } catch (e) {
      return res.status(e.code).json({ message: e.message });
    }
  }
}

/**
 * export { UserController }
 * import { UserController } from './userController.js'
 * -------------------------
 * export default UserController
 * import UserC from './userController.js'
 *
 * const userController = new UserC();
 * -------------------------
 * export default new UserController
 * import UserController from './userController.js'
 *
 * UserController.createUser();
 */
