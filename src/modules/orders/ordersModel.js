import { Model, Schema, model } from "mongoose";

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
        code: {
          type: Number,
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
      },
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
  }
);

class OrderModel extends Model {}
orderSchema.loadClass(OrderModel);

export default model("orders", orderSchema);