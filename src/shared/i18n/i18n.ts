import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enCommon from '@shared/i18n/locales/en/common.json';
import nbCommon from '@shared/i18n/locales/nb/common.json';
import enError from '@shared/i18n/locales/en/error.json';
import nbError from '@shared/i18n/locales/nb/error.json';
import enMenu from '@shared/i18n/locales/en/menu.json';
import nbMenu from '@shared/i18n/locales/nb/menu.json';
import enOverview from '@shared/i18n/locales/en/overview.json';
import nbOverview from '@shared/i18n/locales/nb/overview.json';
import enTasks from '@shared/i18n/locales/en/tasks.json';
import nbTasks from '@shared/i18n/locales/nb/tasks.json';
import enOrders from '@shared/i18n/locales/en/orders.json';
import nbOrders from '@shared/i18n/locales/nb/orders.json';
import enProducts from '@shared/i18n/locales/en/products.json';
import nbProducts from '@shared/i18n/locales/nb/products.json';
import enCustomers from '@shared/i18n/locales/en/customers.json';
import nbCustomers from '@shared/i18n/locales/nb/customers.json';

// ...existing code...

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: false,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        common: enCommon,
        error: enError,
        menu: enMenu,
        tasks: enTasks,
        orders: enOrders,
        products: enProducts,
        customers: enCustomers,
        overview: enOverview
      },
      nb: {
        common: nbCommon,
        error: nbError,
        menu: nbMenu,
        tasks: nbTasks,
        orders: nbOrders,
        products: nbProducts,
        customers: nbCustomers,
        overview: nbOverview
      }
    },
    defaultNS: "common",
    ns: ["common", "error", "menu", "overview", "tasks", "orders", "products", "customers"]
  });

export default i18n;
