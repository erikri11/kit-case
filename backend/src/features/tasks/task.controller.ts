import type { Request, Response } from "express";
import { validateCreate, validateUpdate } from "./task.validate";
import {createTask, deleteTask, getTask, listTasks, updateTask} from "./task.service";

export function getAll(_req: Request, res: Response) {
  res.json(listTasks());
};

export function getById(req: Request, res: Response) {
  const task = getTask(req.params.id as string);
  if (!task) return res.status(404).json({ error: "Not found" });

  res.json(task);
};

export function create(req: Request, res: Response) {
  const err = validateCreate(req.body);
  if (err) return res.status(400).json({ error: err });

  const task = createTask(req.body);
  res.status(201).json(task);
};

export function update(req: Request, res: Response) {
  const err = validateUpdate(req.body, false);
  if (err) return res.status(400).json({ error: err });

  const updated = updateTask(req.params.id as string, req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });

  res.json(updated);
};

export function remove(req: Request, res: Response) {
  const ok = deleteTask(req.params.id as string);
  if (!ok) return res.status(404).json({ error: "Not found" });

  res.status(204).send();
};
