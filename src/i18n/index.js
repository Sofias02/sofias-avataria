// Archivo: src/i18n/index.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './en.json';
import translationES from './es.json';
import translationFR from './fr.json';
import translationDE from './de.json';
import translationPT from './pt.json';
import translationIT from './it.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    resources: {
      en: {
        translation: {
          chooseAvatar: "Choose your AI Avatar",
          subscribe: "Subscribe",
          chatWith: "Chat with",
          send: "Send",
          inputPlaceholder: "Type your message or attach a file..."
        }
      },
      es: {
        translation: {
          chooseAvatar: "Elige tu Avatar IA",
          subscribe: "Suscríbete",
          chatWith: "Chat con",
          send: "Enviar",
          inputPlaceholder: "Escribe tu mensaje o adjunta un archivo..."
        }
      },
      fr: {
        translation: {
          chooseAvatar: "Choisissez votre avatar IA",
          subscribe: "S'abonner",
          chatWith: "Discuter avec",
          send: "Envoyer",
          inputPlaceholder: "Tapez votre message ou joignez un fichier..."
        }
      },
      de: {
        translation: {
          chooseAvatar: "Wähle deinen KI-Avatar",
          subscribe: "Abonnieren",
          chatWith: "Chatte mit",
          send: "Senden",
          inputPlaceholder: "Schreibe deine Nachricht oder füge eine Datei hinzu..."
        }
      },
      pt: {
        translation: {
          chooseAvatar: "Escolha seu Avatar IA",
          subscribe: "Assine",
          chatWith: "Conversar com",
          send: "Enviar",
          inputPlaceholder: "Digite sua mensagem ou anexe um arquivo..."
        }
      },
      it: {
        translation: {
          chooseAvatar: "Scegli il tuo Avatar IA",
          subscribe: "Iscriviti",
          chatWith: "Chatta con",
          send: "Invia",
          inputPlaceholder: "Scrivi il tuo messaggio o allega un file..."
        }
      }
    },
    interpolation: { escapeValue: false }
  });

export default i18n;
