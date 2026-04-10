import { Router } from "express";
import { create, getAll, getById, remove, update, updateStatus } from "./product.controller";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.patch("/:id/status", updateStatus);
router.delete("/:id", remove);

export default router;
