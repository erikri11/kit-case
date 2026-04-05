import { Router } from "express";
import { updateStatus } from "./customer.payment.controller";

const router = Router();

router.patch("/status", updateStatus);

export default router;