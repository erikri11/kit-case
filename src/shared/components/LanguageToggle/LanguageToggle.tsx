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
    <Tooltip arrow title={t("common:labels.changeLanguageTo", {
      language: t(nextLanguage === "en" 
        ? "common:labels.languages.english" 
        : "common:labels.languages.norwegian")
      })}
    >
      <IconButton onClick={toggleLanguage} aria-label={t("common:labels.changeLanguage")}>
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
