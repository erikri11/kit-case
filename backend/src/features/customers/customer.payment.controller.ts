import type { Request, Response } from "express";
import { updatePaymentStatusByInvoice } from "./customer.payment.service";
import type { PaymentStatus } from "./customer.payment.model";

export function updateStatus(req: Request, res: Response) {
  const { invoiceId, status } = req.body as {
    invoiceId?: string;
    status?: PaymentStatus;
  };

  if (!invoiceId || !status) {
    return res.status(400).json({ error: "Missing invoiceId or status" });
  }

  const updated = updatePaymentStatusByInvoice(invoiceId, status);

  if (!updated) {
    return res.status(404).json({ error: "Payment not found" });
  }

  res.json(updated);
}
