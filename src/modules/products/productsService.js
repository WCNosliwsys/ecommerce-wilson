import { ProductInterface } from "./productsInterface";

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

  async create(body) {
    return await this.productModel.create(body);
  }

  async update(id, body) {
    const product = await this.getById(id);
    if (product) {
      const test= await product.updateOne(body);
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
