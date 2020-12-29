import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
//import detector from "i18next-browser-languagedetector";
//import LanguageDetector from 'i18next-browser-languagedetector';


import translationEN from './en.json';
import translationHE from './he.json';

const resources = {
  en: {
    translation: translationEN
  },
  he: {
    translation: translationHE
  }
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;