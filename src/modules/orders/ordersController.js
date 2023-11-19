export class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  async getAllOrders(req, res) {
    return res.json(await this.orderService.getAll());
  }

  async getOrderById(req, res) {
    const orderID = req.params.code;
    const order = await this.orderService.getById(orderID);
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    return res.json(order);
  }

  async createOrder(req, res) {
    const order = await this.orderService.create(req.body);
    return res.status(201).json(order);
  }

  async updateOrder(req, res) {
    const orderID = req.params.code;
    const order = await this.orderService.update(orderID, req.body);
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    return res.json(order);
  }

  async deleteOrder(req, res) {
    const orderID = req.params.code;
    const deleted = await this.orderService.delete(orderID);
    if (!deleted) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    return res.status(204).send("");
  }
}
