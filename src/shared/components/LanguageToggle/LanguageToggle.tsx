import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@mui/material';

export function LanguageToggle() {
  const { t, i18n: i18nInstance } = useTranslation("common");
  
  const currentLanguage = i18nInstance.language?.startsWith("nb") ? "nb" : "en";
  const nextLanguage = currentLanguage === "en" ? "nb" : "en";

  const toggleLanguage = () => {
    i18nInstance.changeLanguage(nextLanguage);
  };

  return (
    <Tooltip arrow title={t("labels.changeLanguageTo", {
      language: t(nextLanguage === "en" 
        ? "labels.languages.english" 
        : "labels.languages.norwegian")
      })}
    >
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
