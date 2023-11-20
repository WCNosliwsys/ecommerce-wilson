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
  async getAllByUser(codUser) {
    return await this.orderModel.find({ 'cliente.codUser': codUser });
  }

  async getById(code) {
    return await this.orderModel.findOne({ code });
  }

  async create(body) {
    console.log("wilbody", body)
    const orderCode = await getNextCode('orderCode');
    const productUpdates = [];
  
    // Verifica el stock y actualiza la lista de productos
    for (const item of body.items) {
      const product = await this.productModel.findOne({ code: item.code });
  
      if (!product || product.stock < item.cantidad) {
        // No hay suficiente stock para el producto
        throw new Error(`No hay suficiente stock para el producto con código ${item.code}`);
      }
  
      // Actualiza el stock del producto
      product.stock -= item.cantidad;
      productUpdates.push(product.save());
    }
  
    // Espera a que todas las actualizaciones de stock se completen
    await Promise.all(productUpdates);
  
    // Obtén los precios de los productos
    const products = await this.productModel.find({ code: { $in: body.items.map(item => item.code) } });
    console.log("wilproducts",products)
    // Mapea los precios de los productos al cuerpo de la orden
    const itemsWithPrices = body.items.map(item => {
      const product = products.find(product => product.code === item.code);
      return {
        ...item,
        precio: product ? product.precio : 0, // Asumiendo un valor predeterminado si no se encuentra el producto
        nombre: product ? product.nombre : "", // Asumiendo un valor predeterminado si no se encuentra el producto
      };
    });
    console.log("wilpricing",itemsWithPrices)
    const total = itemsWithPrices.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const fecha = Date.now();
  
    const orderData = {
      ...body,
      code: orderCode,
      items: itemsWithPrices,
      total,
      fecha,
    };
    console.log("ordenLista", orderData)
    // Crea la orden en la base de datos
    const order = await this.orderModel.create(orderData);
  
    return order;
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
