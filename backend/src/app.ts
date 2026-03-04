import express from "express";
import path from "path";
import customersRouter from "./features/customers/customer.routes";
import uploadRouter from "./features/uploads/upload.routes";
import { corsLite } from "./features/middlewares/corsLite";
import { errorHandler } from "./features/middlewares/errorHandler";
import { API_PREFIX } from "./config/api";

const app = express();

const uploadDir = path.join(process.cwd(), "uploads/avatars");

// serve uploaded images
app.use("/uploads/avatars", express.static(uploadDir));

app.use(corsLite);
app.use(express.json());

app.use(`${API_PREFIX}/customers`, customersRouter);
app.use(`${API_PREFIX}`, uploadRouter);

// centralized error handler (must be last)
app.use(errorHandler);

export default app;