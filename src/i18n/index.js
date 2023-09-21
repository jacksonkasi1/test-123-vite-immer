import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ** import json language
import enTranslation from './lang/en.json';
import esTranslation from './lang/es.json';
import taTranslation from './lang/ta.json';


i18n.use(initReactI18next).init({
    resources: {
        en: { translation: enTranslation },
        es: { translation: esTranslation },
        ta: { translation: taTranslation },
    },
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
