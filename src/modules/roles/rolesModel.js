import { Model, DataTypes } from "sequelize";

class RoleModel extends Model {
  static associate(models) {
    this.hasMany(models.users, {
      foreignKey: "rol_id",
    });
  }

  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        tableName: "roles",
        modelName: "roles",
      }
    );
  }
}

export default RoleModel;
