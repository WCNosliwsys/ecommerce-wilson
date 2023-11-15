import { RoleInterface } from "./rolesInterface";

export class RoleService extends RoleInterface {
  constructor(roleModel) {
    super();
    this.roleModel = roleModel;
  }

  async getAll() {
    return await this.roleModel.findAll();
  }

  async getById(id) {
    return await this.roleModel.findOne({ where: id });
  }

  async create(body) {
    return await this.roleModel.create(body);
  }

  async update(id, body) {
    const role = await this.getById(id);
    if (role) {
      await role.update(body);
    }
    return role;
  }

  async delete(id) {
    const role = await this.getById(id);
    if (role) {
      await role.destroy();
    }
    return role;
  }
}
