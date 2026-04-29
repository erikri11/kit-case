import { makeRequest } from "@shared/services/makeRequest";
import type { PaymentStatus } from "../models/constants/customer.payment.constants";


export const paymentApi = {
  updateStatus: (payload: { invoiceId: string; status: PaymentStatus }) =>
    makeRequest(`/payments/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
};
