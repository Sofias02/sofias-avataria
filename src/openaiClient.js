import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // <- nombre correcto de la variable
  dangerouslyAllowBrowser: true, // necesario para permitir uso desde frontend
});

export default openai;
