import { Request, Response } from "express";
import BaseRouter from "./base";
import packageService from "../services/package";

class PackageRouter extends BaseRouter {
  constructor() {
    super();
    this.setupRoute();
  }

  setupRoute(): void {
    this.router.get("/:pkgName", this.getPackageGraph);
  }

  async getPackageGraph(req: Request, res: Response): Promise<void> {
    const { pkgName } = req.params;

    const graph = await packageService.getGraph(pkgName);

    res.json(graph);
  }
}

export default new PackageRouter().router;
