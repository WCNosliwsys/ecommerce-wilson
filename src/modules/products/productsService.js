import { ProductInterface } from "./productsInterface";
import { getNextCode } from "../sequences/nextSequence";
export class ProductService extends ProductInterface {
  constructor(productModel) {
    super();
    this.productModel = productModel;
  }

  async getAll() {
    return await this.productModel.find();
  }

  async getById(code) {
    return await this.productModel.findOne({ code });
  }
  async retrieveByCodes(cod_products) {
    console.log(cod_products)
    return await this.productModel.find({ code: { $in: cod_products } });
  }

  async create(body) {
    const productCode = await getNextCode('productCode');
    const productData = { ...body, code: productCode };
    return await this.productModel.create(productData);
  }

  async update(id, body) {
    const product = await this.getById(id);
    if (product) {
      const test = await product.updateOne(body);
    }
    return product;
  }

  async delete(id) {
    const product = await this.getById(id);
    if (product) {
      await product.deleteOne();
    }
    return product;
  }
}
