import type { Request, Response, NextFunction  } from 'express';

const ALLOWED_ORIGINS = new Set([
  "http://localhost:5173",
]);

export function corsLite(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin;

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Vary', 'Origin');
  }

  res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups");

  // Allowed HTTP methods
  res.header(
    'Access-Control-Allow-Methods', 
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );

  // Allowed request headers
  res.header(
    'Access-Control-Allow-Headers', 
    'Content-Type, Authorization'
  );

  if (req.method === 'OPTIONS') return res.sendStatus(204);
  
  next();
}
