import { createChipRenderer } from "@shared/renderers/createChipRenderer";
import type { CustomerPayment } from "@features/customers/models/customer.payment.model";
import { CUSTOMER_PAYMENT_STATUS_CONFIG } from "@features/customers/models/customerPaymentStatusConfig";
import type { PaymentStatus } from "@features/customers/models/customer.payment.constants";

export const PaymentStatusChipRenderer =
  createChipRenderer<CustomerPayment, PaymentStatus>(CUSTOMER_PAYMENT_STATUS_CONFIG);

export default PaymentStatusChipRenderer;
