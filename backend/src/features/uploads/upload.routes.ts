import { Router } from "express";
import { createUploader } from "./createUploader";
import { buildUploadResponse } from "./buildUploadResponse";

const router = Router();

const avatarUpload = createUploader("avatars");
const productUpload = createUploader("products");

router.post("/avatar", avatarUpload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.status(201).json(buildUploadResponse(req.file, "avatars"));
});

router.post("/product", productUpload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.status(201).json(buildUploadResponse(req.file, "products"));
});

export default router;
