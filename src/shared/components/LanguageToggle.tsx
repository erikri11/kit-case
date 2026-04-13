import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@mui/material';
import i18n from '@shared/i18n/i18n';

export function LanguageToggle() {
  const { t } = useTranslation("common");
  const { i18n: i18nInstance } = useTranslation();
  const currentLanguage = i18nInstance.language?.startsWith("nb") ? "nb" : "en";
  const nextLanguage = currentLanguage === "en" ? "nb" : "en";

  const toggleLanguage = () => {
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <Tooltip arrow title={t("Change language to") + " " + t(nextLanguage === "en" ? "English" : "Norwegian")}>
      <IconButton onClick={toggleLanguage} aria-label="Change language">
        <img
          src={nextLanguage === "en" ? "/flags/gb.svg" : "/flags/no.svg"}
          alt="Language"
          width={24}
          height={24}
        />
      </IconButton>
    </Tooltip>
  );
}

export default LanguageToggle;
