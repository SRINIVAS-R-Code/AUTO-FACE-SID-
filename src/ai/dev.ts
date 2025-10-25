import {config} from 'dotenv';
config();

import './flows/ai-assistant-flow';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {defineFlow} from '@genkit-ai/flow';

genkit({
  plugins: [googleAI({apiKey: process.env.GEMINI_API_KEY})],
  model: 'googleai/gemini-2.5-flash',
});

// This is a dummy flow that is used to start the Genkit development server.
defineFlow(
  {
    name: 'dev',
    inputSchema: undefined,
    outputSchema: undefined,
  },
  async () => {
    console.log('started');
  }
);
// startFlows(); // Commented out as it's not available in current version
