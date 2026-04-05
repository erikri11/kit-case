export const ORDER_STATUSES = ["Pending", "Completed", "Refunded"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_PAYMENT_METHODS = ["Amex", "ApplePay", "GooglePay", "MasterCard", "Visa"] as const;
export type OrderPaymentMethodType = (typeof ORDER_PAYMENT_METHODS)[number];

export const LOCKED_STATUSES: OrderStatus[] = ["Completed", "Refunded"];