import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@mui/material';
import i18n from '@shared/i18n/i18n';

export function LanguageToggle() {
  const { i18n: i18nInstance } = useTranslation();
  const currentLang = i18nInstance.language?.startsWith('nb') ? 'nb' : 'en';

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === 'en' ? 'nb' : 'en');
  };

  return (
    <Tooltip title={currentLang === 'en' ? 'Norsk' : 'English'}>
      <IconButton onClick={toggleLanguage} aria-label="Change language">
        <img
          src={currentLang === 'en' ? 'src/assets/flags/no.svg' : 'src/assets/flags/gb.svg'}
          alt="Language"
          width={24}
          height={24}
        />
      </IconButton>
    </Tooltip>
  );
}

export default LanguageToggle;
