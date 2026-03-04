import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import express from "express";
import app from "../../app";

const uploadDir = path.join(process.cwd(), "uploads/avatars");
fs.mkdirSync(uploadDir, { recursive: true });

app.use("/uploads/avatars", express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const id = crypto.randomBytes(16).toString("hex");
    cb(null, `${id}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed (jpeg/png/webp/gif)."));
    }
    cb(null, true);
  },
});

app.post("/uploads/avatar", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const url = `/uploads/avatars/${req.file.filename}`;

  res.status(201).json({
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    url,
    fullUrl: `http://localhost:4000${url}`,
  });
});
