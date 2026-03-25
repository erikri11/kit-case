import { createChipRenderer } from "@shared/renderers/createChipRenderer";
import type { CustomerPayment, PaymentStatus } from "@features/customers/models/customer.payment.model";
import { PAYMENT_STATUS_CONFIG } from "@features/customers/models/paymentStatusConfig";

export const PaymentStatusChipRenderer =
  createChipRenderer<CustomerPayment, PaymentStatus>(PAYMENT_STATUS_CONFIG);

export default PaymentStatusChipRenderer;
