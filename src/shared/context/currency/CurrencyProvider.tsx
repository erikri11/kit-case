import {useCallback, useMemo, useState, type ReactNode} from "react";
import type { Currency } from "@features/products/models/product.constants";
import { CurrencyContext } from "./CurrencyContext";

interface CurrencyProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "app_currency";

function getInitialCurrency(): Currency {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved === "NOK" || saved === "USD") {
    return saved;
  }

  return "NOK";
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrencyState] = useState<Currency>(getInitialCurrency);

  const setCurrency = useCallback((nextCurrency: Currency) => {
    setCurrencyState(nextCurrency);
    localStorage.setItem(STORAGE_KEY, nextCurrency);
  }, []);

  const toggleCurrency = useCallback(() => {
    setCurrencyState((prev) => {
      const nextCurrency = prev === "NOK" ? "USD" : "NOK";
      localStorage.setItem(STORAGE_KEY, nextCurrency);
      return nextCurrency;
    });
  }, []);

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      toggleCurrency
    }),
    [currency, setCurrency, toggleCurrency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export default CurrencyProvider;
