import express from "express";
import path from "path";
import productRouter from "./features/products/product.route";
import customerRouter from "./features/customers/customer.route";
import taskRouter from "./features/tasks/task.route";
import orderRouter from "./features/orders/order.route";
import paymentRoutes from "./features/customers/customer.payment.route";
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

app.use(`${API_PREFIX}/products`, productRouter);
app.use(`${API_PREFIX}/customers`, customerRouter);
app.use(`${API_PREFIX}/tasks`, taskRouter);
app.use(`${API_PREFIX}/orders`, orderRouter);
app.use(`${API_PREFIX}/payments`, paymentRoutes);
app.use(`${API_PREFIX}/uploads`, uploadRouter);

// centralized error handler (must be last)
app.use(errorHandler);

export default app;
