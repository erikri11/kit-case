import { BASE_URL } from "../../config/api";

export function buildUploadResponse(
  file: Express.Multer.File,
  folder: string
) {
  const url = `/uploads/${folder}/${file.filename}`;

  return {
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    url,
    fullUrl: `${BASE_URL}${url}`,
  };
}
