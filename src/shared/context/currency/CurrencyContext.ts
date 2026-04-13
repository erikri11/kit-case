import { createContext } from "react";
import type { Currency } from "@features/products/models/product.constants";

export interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  toggleCurrency: () => void;
}

export const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);
