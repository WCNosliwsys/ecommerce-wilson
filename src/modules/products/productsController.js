export class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  async getAllProducts(req, res) {
    return res.json(await this.productService.getAll());
  }

  async getProductById(req, res) {
    const productID = req.params.code;
    const product = await this.productService.getById(productID);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.json(product);
  }
  async retrieveByCodes(req, res) {
    const { cod_products } = req.body;
    const products = await this.productService.retrieveByCodes(cod_products);
    return res.json(products);
  }

  async createProduct(req, res) {
    const product = await this.productService.create(req.body);
    return res.status(201).json(product);
  }

  async updateProduct(req, res) {
    const productID = req.params.code;
    const product = await this.productService.update(productID, req.body);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.json(product);
  }

  async deleteProduct(req, res) {
    const productID = req.params.code;
    const deleted = await this.productService.delete(productID);
    if (!deleted) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(204).send("");
  }
}
