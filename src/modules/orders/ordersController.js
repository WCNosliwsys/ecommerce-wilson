export class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  async getAllOrders(req, res) {
    try{

      return res.json(await this.orderService.getAll());
    }
    catch(e){
      console.log("wilerror",e)
    }
  }
  async getAllOrdersByUser(req, res) {
    try {
      const userID = req.current_user.code;
      return res.json(await this.orderService.getAllByUser(userID));
    } catch (e) {
      return res.status(e.code).json({ message: e.message });
    }
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
    try {
      const order = await this.orderService.create(req.body);
      return res.status(201).json(order);
    } catch (e) {
      return res.status(400).json({ message: "No se pudo completar la transacción. Verifica los detalles de la orden e intenta nuevamente." });
    }
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
