import type { Request, Response, NextFunction,  } from 'express';

export function corsLite(req: Request, res: Response, next: NextFunction) {
  const allowedOrigin = req.headers.origin as string | undefined;

  if (allowedOrigin && (allowedOrigin === 'http://localhost:5173' )) {
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Vary', 'Origin');
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
}
