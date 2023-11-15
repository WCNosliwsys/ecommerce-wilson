import {Model,Schema,model } from "mongoose"
const schema =  new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    rol_code: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "users",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
)
class UserModel extends Model {}

schema.loadClass(UserModel);

export default model("users", schema);
