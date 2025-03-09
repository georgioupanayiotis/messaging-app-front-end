import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Default language
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes variables
    },
    resources: {
      en: { translation: require("./locales/en.json") },
      fr: { translation: require("./locales/fr.json") },
    }
  });

export default i18n;
