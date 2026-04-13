import { IconButton, Tooltip } from "@mui/material";
import useCurrency from "@shared/context/currency/useCurrency";

export function CurrencyToggle() {
  const { currency, toggleCurrency } = useCurrency();
  const nextCurrency = currency === "NOK" ? "USD" : "NOK";

  return (
    <Tooltip arrow title={`Change currency to ${nextCurrency}`}>
      <IconButton onClick={toggleCurrency} aria-label="Change currency">
        <img
          src={currency === "NOK" ? "/flags/us.svg" : "/flags/no.svg"}
          alt="Currency"
          width={24}
          height={24}
        />
      </IconButton>
    </Tooltip>
  );
}

export default CurrencyToggle;
