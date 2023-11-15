import { Router } from "express";

class HealthCheckRouter {
  constructor() {
    this.router = Router();
  }

  init() {
    return this.router.get("/", (req, res) => {
      return res.status(200).send();
    });
  }
}

export default new HealthCheckRouter();
