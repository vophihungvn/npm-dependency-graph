import { Router } from "express";

class BaseRouter {
  public router: any;

  constructor() {
    this.router = Router();
  }
}

export default BaseRouter;
