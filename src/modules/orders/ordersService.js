import { OrderInterface } from "./ordersInterface";
import SequenceModel from '../sequences/sequenceModel';
export class OrderService extends OrderInterface {
  constructor(orderModel) {
    super();
    this.orderModel = orderModel;
  }

  async getAll() {
    return await this.orderModel.find();
  }

  async getById(code) {
    return await this.orderModel.findOne({ code });
  }

  async getNextCode() {
    const sequenceName = 'orderCode'; // Puedes usar un nombre descriptivo para la secuencia
    const sequence = await SequenceModel.findOneAndUpdate(
      { name: sequenceName },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    return sequence.value;
  }

  async create(body) {
    const orderCode = await this.getNextCode();
    const orderData = { ...body, code: orderCode };
    return await this.orderModel.create(orderData);
  }

  async update(id, body) {
    const order = await this.getById(id);
    if (order) {
      const test = await order.updateOne(body);
    }
    return order;
  }

  async delete(id) {
    const order = await this.getById(id);
    if (order) {
      await order.deleteOne();
    }
    return order;
  }
}
