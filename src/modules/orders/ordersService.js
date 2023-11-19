import { OrderInterface } from "./ordersInterface";
import { getNextCode } from "../sequences/nextSequence";
export class OrderService extends OrderInterface {
  constructor(orderModel, productModel) {
    super();
    this.orderModel = orderModel;
    this.productModel = productModel;
  }

  async getAll() {
    return await this.orderModel.find();
  }

  async getById(code) {
    return await this.orderModel.findOne({ code });
  }

  async create(body) {
    const orderCode = await getNextCode('orderCode');
    const itemsWithPrices = await Promise.all(body.items.map(async (item) => {
      const product = await this.productModel.findOne({ code: item.code });
      return {
        ...item,
        precio: product.precio,
      };
    }));

    const total = itemsWithPrices.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const fecha = Date.now();
    const orderData = {
      ...body,
      code: orderCode,
      items: itemsWithPrices,
      total,
      fecha
    };

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
