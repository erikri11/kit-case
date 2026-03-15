import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif"
];

export function createUploader(folder: string) {

  const uploadDir = path.resolve(process.cwd(), "uploads", folder);
  fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const id = crypto.randomBytes(16).toString("hex");
      cb(null, `${id}${ext}`);
    },
  });

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      if (!allowedImageTypes.includes(file.mimetype)) {
        return cb(new Error("Only image files are allowed."));
      }
      cb(null, true);
    },
  });
}
