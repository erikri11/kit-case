import type { Request, Response } from "express";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct, updateProductStatus } from "./product.service";
import { validateCreate, validateStatusUpdate, validateUpdate } from "./product.validate";
import { io } from "../../server";
import { EVENTS } from "../../shared/models/events.constants";

export function getAll(_req: Request, res: Response) {
  res.json(listProducts());
};

export function getById(req: Request, res: Response) {
  const product = getProduct(req.params.id as string);
  if (!product) return res.status(404).json({ error: "Could not find product" });

  res.json(product);
};

export function create(req: Request, res: Response) {
  const err = validateCreate(req.body);
  if (err) return res.status(400).json({ error: err });

  const product = createProduct(req.body);
  if (!product) return res.status(400).json({ error: "Could not create product" });

  res.status(201).json(product);
  io.emit(EVENTS.PRODUCT.CREATED, product);
};

export function update(req: Request, res: Response) {
  const err = validateUpdate(req.body, false);
  if (err) return res.status(400).json({ error: err });

  const updated = updateProduct(req.params.id as string, req.body);
  if (!updated) return res.status(404).json({ error: "Could not update product" });

  res.json(updated);
  io.emit(EVENTS.PRODUCT.UPDATED, updated);
};

export function updateStatus(req: Request, res: Response) {
  const err = validateStatusUpdate(req.body);
  if (err) return res.status(400).json({ error: err });

  try {
    const updated = updateProductStatus(
      req.params.id as string,
      req.body.status
    );

    if (!updated) return res.status(404).json({ error: "Could not update product status" });

    res.json(updated);
    io.emit(EVENTS.PRODUCT.UPDATED, updated);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid status update";

    return res.status(400).json({ error: message });
  }
};

export function remove(req: Request, res: Response) {
  const id = req.params.id as string;
  
  const ok = deleteProduct(id);
  if (!ok) return res.status(404).json({ error: "Could not delete product" });

  res.status(204).send();
  io.emit(EVENTS.PRODUCT.DELETED, id);
};
