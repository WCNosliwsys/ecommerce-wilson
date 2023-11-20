import { Model, Schema, model } from "mongoose";
import productsModel from "../products/productsModel";

// const itemSchema = new Schema({
//   _id: false,
//   code: {
//     type: Number,
//     required: true,
//   },
//   nombre: {
//     type: String,
//     required: true,
//   },
//   cantidad: {
//     type: Number,
//     required: true,
//   },
//   precio: {
//     type: Number,
//     required: true,
//   },
// });
const orderSchema = new Schema(
  {
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    cliente: {
      codUser: {
        type: Number,
        required: true,
      },
    },
    items: [
      {
        _id: false,
        code: {
          type: Number,
          required: true,
        },
        nombre: {
          type: String,
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
        },
        precio: {
          type: Number,
          required: true,
        },
      }
    ],
    total: {
      type: Number,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "orders",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    // toJSON: {
    //   virtuals: true,
    // },
    // virtuals: {
    //   products: {
    //     ref: productsModel,
    //     localField: "items.code",
    //     foreignField: "code",
    //     justOne: false,
    //     default:[]
    //   },
    // },
  }
);

class OrderModel extends Model { }
orderSchema.loadClass(OrderModel);

export default model("orders", orderSchema);