import { IconButton, Tooltip } from "@mui/material";
import useCurrency from "@shared/context/currency/useCurrency";
import { useTranslation } from "react-i18next";

export function CurrencyToggle() {
  const { t } = useTranslation("common");
  const { currency, toggleCurrency } = useCurrency();

  const nextCurrency = currency === "NOK" ? "USD" : "NOK";

  return (
    <Tooltip arrow title={t("common:labels.changeCurrencyTo", {
      currency: t(nextCurrency === "NOK" 
        ? "common:labels.currencies.NOK" 
        : "common:labels.currencies.USD"
      )
    })}
    >
      <IconButton onClick={toggleCurrency} aria-label={t("common:labels.changeCurrency")}>
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
