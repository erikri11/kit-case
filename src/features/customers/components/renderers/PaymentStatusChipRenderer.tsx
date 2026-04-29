import { createChipRenderer } from "@shared/renderers/createChipRenderer";
import type { CustomerPayment } from "@features/customers/models/model/customer.payment.model";
import { CUSTOMER_PAYMENT_STATUS_CONFIG } from "@features/customers/models/constants/customerPaymentStatusConfig.constants";
import type { PaymentStatus } from "@features/customers/models/constants/customer.payment.constants";

export const PaymentStatusChipRenderer =
  createChipRenderer<CustomerPayment, PaymentStatus>(CUSTOMER_PAYMENT_STATUS_CONFIG);

export default PaymentStatusChipRenderer;
