import express from "express";
import path from "path";
import productsRouter from "./features/products/product.route";
import customersRouter from "./features/customers/customer.route";
import tasksRouter from "./features/tasks/task.route";
import uploadRouter from "./features/uploads/upload.routes";
import { corsLite } from "./middlewares/corsLite";
import { errorHandler } from "./middlewares/errorHandler";
import { API_PREFIX } from "./config/api";

const app = express();

const uploadsDir = path.resolve(process.cwd(), "uploads");

// serve uploaded images
app.use("/uploads", express.static(uploadsDir));

app.use(corsLite);
app.use(express.json());

app.use(`${API_PREFIX}/products`, productsRouter);
app.use(`${API_PREFIX}/customers`, customersRouter);
app.use(`${API_PREFIX}/tasks`, tasksRouter);
app.use(`${API_PREFIX}/uploads`, uploadRouter);

// centralized error handler (must be last)
app.use(errorHandler);

export default app;