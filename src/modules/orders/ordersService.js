import { OrderInterface } from "./ordersInterface";
import { getNextCode } from "../sequences/nextSequence";
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

  async create(body) {
    const orderCode = await getNextCode('orderCode');
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
