import {Model,Schema,model } from "mongoose"
const schema =  new Schema(
  {
    name: {
      // Administrador
      type: String,
      required: true,
    },
    code: {
      // ADMIN
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "roles",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
)

class RoleModel extends Model {}
schema.loadClass(RoleModel);
export default model("roles", schema);
