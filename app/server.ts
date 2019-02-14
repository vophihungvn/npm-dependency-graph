// lib/app.ts
import * as express from "express";
import * as bodyParser from "body-parser";
import api from "./routes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use("/api", api);
  }
}

export default new App().app;
