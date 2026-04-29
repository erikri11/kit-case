import type { Request, Response } from "express";
import { validateCreate, validateUpdate } from "./customer.validate";
import { createCustomer, deleteCustomer, getCustomer, listCustomers, updateCustomer } from "./customer.service";
import { io } from "../../server";
import { EVENTS } from "../../shared/models/events.constants";

export function getAll(_req: Request, res: Response) {
  res.json(listCustomers());
}

export function getById(req: Request, res: Response) {
  const customer = getCustomer(req.params.id as string);
  if (!customer) return res.status(404).json({ error: "Could not find customer" });

  res.json(customer);
}

export function create(req: Request, res: Response) {
  const err = validateCreate(req.body);
  if (err) return res.status(400).json({ error: err });

  const customer = createCustomer(req.body);
  if (!customer) return res.status(400).json({ error: "Could not create customer" });

  res.status(201).json(customer);
  io.emit(EVENTS.CUSTOMER.CREATED, customer);
}

export function update(req: Request, res: Response) {
  const err = validateUpdate(req.body, false);
  if (err) return res.status(400).json({ error: err });

  const updated = updateCustomer(req.params.id as string, req.body);
  if (!updated) return res.status(404).json({ error: "Could not update customer" });

  res.json(updated);
  io.emit(EVENTS.CUSTOMER.UPDATED, updated);
}

export function remove(req: Request, res: Response) {
  const id = req.params.id as string;
  
  const ok = deleteCustomer(id);
  if (!ok) return res.status(404).json({ error: "Could not delete customer" });

  res.status(204).send();
  io.emit(EVENTS.CUSTOMER.DELETED, id);
}
