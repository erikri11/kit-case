import type { Request, Response } from "express";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "./product.service";
import { validateCreate, validateUpdate } from "./product.validate";

export function getAll(_req: Request, res: Response) {
  res.json(listProducts());
}

export function getById(req: Request, res: Response) {
  const product = getProduct(req.params.id as string);
  if (!product) return res.status(404).json({ error: "Not found" });

  res.json(product);
}

export function create(req: Request, res: Response) {
  const err = validateCreate(req.body);
  if (err) return res.status(400).json({ error: err });

  const product = createProduct(req.body);
  res.status(201).json(product);
}

export function update(req: Request, res: Response) {
  const err = validateUpdate(req.body, false);
  if (err) return res.status(400).json({ error: err });

  const updated = updateProduct(req.params.id as string, req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });

  res.json(updated);
}

export function remove(req: Request, res: Response) {
  const ok = deleteProduct(req.params.id as string);
  if (!ok) return res.status(404).json({ error: "Not found" });

  res.status(204).send();
}
