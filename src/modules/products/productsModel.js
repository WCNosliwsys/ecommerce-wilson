import {Model,Schema,model } from "mongoose"
//https://mongoosejs.com/docs/schematypes.html
const schema =  new Schema(
  {
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    categorias: {
      tipo: {
        type: String,
        required: true,
      },
      estilo: {
        type: String,
        required: true,
      },
      acabado: {
        type: String,
        required: true,
      },
      grosor: {
        type: String,
        required: true,
      },
      instalacion: {
        type: String,
        required: true,
      },
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "products",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
)

class ProductModel extends Model {}
schema.loadClass(ProductModel);
export default model("products", schema);
