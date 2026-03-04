import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const message =
    typeof err?.message === "string" 
      ? err.message 
      : "Server error";

  res.status(400).json({ error: message });
}
