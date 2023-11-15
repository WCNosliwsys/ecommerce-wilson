import { Model, DataTypes } from "sequelize";

class UserModel extends Model {
  static associate(models) {
    this.belongsTo(models.roles, {
      foreignKey: "rol_id",
      targetKey: "id",
    });
  }

  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
        },
        last_name: {
          type: DataTypes.STRING,
        },
        username: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        rol_id: {
          type: DataTypes.INTEGER,
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        tableName: "users",
        modelName: "users",
      }
    );
  }
}

export default UserModel;
