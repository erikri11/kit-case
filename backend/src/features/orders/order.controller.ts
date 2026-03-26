import type { Request, Response } from "express";
import {createOrder, deleteOrder, getOrder, listOrders, updateOrder} from "./order.service";
import { validateCreate, validateUpdate } from "./order.validate";

export function getAll(_req: Request, res: Response) {
  res.json(listOrders());
}

export function getById(req: Request, res: Response) {
  const order = getOrder(req.params.id as string);
  if (!order) return res.status(404).json({ error: "Not found" });

  res.json(order);
};

export function create(req: Request, res: Response) {
  const err = validateCreate(req.body);
  if (err) return res.status(400).json({ error: err });
  
  const order = createOrder(req.body);
  if (!order)return res.status(400).json({ error: "Could not create order" });
  
  res.status(201).json(order);
};

export function update(req: Request, res: Response) {
  const err = validateUpdate(req.body, false);
  if (err)return res.status(400).json({ error: err });
  
  const updated = updateOrder(req.params.id as string, req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });
  
  res.json(updated);
}

export function remove(req: Request, res: Response) {
  const ok = deleteOrder(req.params.id as string);
  if (!ok) return res.status(404).json({ error: "Not found" });

  res.status(204).send();
};
