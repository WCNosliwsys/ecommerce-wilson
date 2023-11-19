import {Model,Schema,model } from "mongoose"
const schema =  new Schema(
  {
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      default:"user"
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
    toJSON: {
      virtuals: true,
    },
    virtuals: {
      role: {
        options: {
          ref: "roles",
          localField: "rol",
          foreignField: "code",
          justOne: true,
        },
      },
    },
  }
)
class UserModel extends Model {}

schema.loadClass(UserModel);

export default model("users", schema);
