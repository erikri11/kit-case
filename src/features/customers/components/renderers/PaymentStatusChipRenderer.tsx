import { createChipRenderer } from "@shared/renderers/createChipRenderer";
import type { CustomerPayment } from "@features/customers/models/customer.payment.model";
import { PAYMENT_STATUS_CONFIG } from "@features/customers/models/paymentStatusConfig";
import type { PaymentStatus } from "@features/customers/models/payment.constants";

export const PaymentStatusChipRenderer =
  createChipRenderer<CustomerPayment, PaymentStatus>(PAYMENT_STATUS_CONFIG);

export default PaymentStatusChipRenderer;
