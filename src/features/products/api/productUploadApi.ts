import { API_BASE, API_PREFIX } from "@shared/config/api";
import type { UploadResponse } from "../models/uploadResponse";

export async function productUploadApi(file: File): Promise<UploadResponse> {

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE}${API_PREFIX}/uploads/product`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `Upload failed with status: ${response.status}`);
  }

  return response.json();
};
