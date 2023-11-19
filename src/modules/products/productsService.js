import { ProductInterface } from "./productsInterface";
import SequenceModel from '../sequences/sequenceModel';
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

  async getNextCode() {
    const sequenceName = 'productCode'; // Puedes usar un nombre descriptivo para la secuencia
    const sequence = await SequenceModel.findOneAndUpdate(
      { name: sequenceName },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    return sequence.value;
  }

  async create(body) {
    const productCode = await this.getNextCode();
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
