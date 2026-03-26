let customerCounter = 6;

export function generateCustomerNumber(): string {
  return `CUST-${String(customerCounter++).padStart(4, "0")}`;
}
