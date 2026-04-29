import type { Request, Response } from "express";
import { validateCreate, validateUpdate } from "./task.validate";
import {createTask, deleteTask, getTask, listTasks, updateTask} from "./task.service";
import { io } from "../../server";
import { EVENTS } from "../../shared/models/events.constants";

export function getAll(_req: Request, res: Response) {
  res.json(listTasks());
};

export function getById(req: Request, res: Response) {
  const task = getTask(req.params.id as string);
  if (!task) return res.status(404).json({ error: "Could not find task" });
  
  res.json(task);
};

export function create(req: Request, res: Response) {
  const err = validateCreate(req.body);
  if (err) return res.status(400).json({ error: err });

  const task = createTask(req.body);
  if (!task) return res.status(400).json({ error: "Could not create task" });

  res.status(201).json(task);
  io.emit(EVENTS.TASK.CREATED, task);
};

export function update(req: Request, res: Response) {
  const err = validateUpdate(req.body, false);
  if (err) return res.status(400).json({ error: err });

  const updated = updateTask(req.params.id as string, req.body);
  if (!updated) return res.status(404).json({ error: "Could not update task" });

  res.json(updated);
  io.emit(EVENTS.TASK.UPDATED, updated);
};

export function remove(req: Request, res: Response) {
  const id = req.params.id as string;
  
  const ok = deleteTask(id);
  if (!ok) return res.status(404).json({ error: "Could not delete task" });

  res.status(204).send();
  io.emit(EVENTS.TASK.DELETED, id);
};
