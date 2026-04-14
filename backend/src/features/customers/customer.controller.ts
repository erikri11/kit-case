import type { Request, Response } from "express";
import { validateCreate, validateUpdate } from "./customer.validate";
import { createCustomer, deleteCustomer, getCustomer, listCustomers, updateCustomer } from "./customer.service";

export function getAll(_req: Request, res: Response) {
  res.json(listCustomers());
}

export function getById(req: Request, res: Response) {
  const customer = getCustomer(req.params.id as string);
  if (!customer) return res.status(404).json({ error: "Not found" });
  res.json(customer);
}

export function create(req: Request, res: Response) {
  const err = validateCreate(req.body);
  if (err) return res.status(400).json({ error: err });

  const customer = createCustomer(req.body);
  res.status(201).json(customer);
}

export function update(req: Request, res: Response) {
  const err = validateUpdate(req.body, false);
  if (err) return res.status(400).json({ error: err });

  const updated = updateCustomer(req.params.id as string, req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });

  res.json(updated);
}

export function remove(req: Request, res: Response) {
  const ok = deleteCustomer(req.params.id as string);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
}
