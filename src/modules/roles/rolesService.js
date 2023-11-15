import { RoleInterface } from "./rolesInterface";

export class RoleService extends RoleInterface {
  constructor(roleModel) {
    super();
    this.roleModel = roleModel;
  }

  async getAll() {
    return await this.roleModel.find();
  }

  async getById(code) {
    return await this.roleModel.findOne({ code });
  }

  async create(body) {
    return await this.roleModel.create(body);
  }

  async update(id, body) {
    const role = await this.getById(id);
    if (role) {
      await role.updateOne(body);
    }
    return role;
  }

  async delete(id) {
    const role = await this.getById(id);
    if (role) {
      await role.deleteOne();
    }
    return role;
  }
}
