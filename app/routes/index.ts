import { Router } from "express";
import packageRoute from "./package";

const router = Router();

router.use("/package", packageRoute);

export default router;
