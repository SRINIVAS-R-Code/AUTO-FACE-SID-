
'use server';

/**
 * @fileOverview A multi-tool AI assistant flow.
 * This file defines the tools and the main flow for an AI assistant that can
 * answer HR-related questions or provide wellness suggestions.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the tool for answering HR questions
const hrQuestionsTool = ai.defineTool(
  {
    name: 'hrQuestionAnswering',
    description:
      'Use to answer questions about company policies, benefits, or other HR-related topics.',
    inputSchema: z.object({
      question: z.string().describe('The question from the employee.'),
    }),
    outputSchema: z.string(),
  },
  async ({ question }) => {
    const prompt = `You are an AI assistant that answers questions about company policies, benefits, and HR-related topics.
      Question: ${question}
      Answer:`;
    
    const { text } = await ai.generate({ prompt });
    return text;
  }
);

// Define the tool for providing wellness suggestions
const wellnessTool = ai.defineTool(
  {
    name: 'wellnessAdvisor',
    description: 'Use to provide personalized health and wellness suggestions.',
    inputSchema: z.object({
      stressLevel: z
        .number()
        .describe("Employee's self-reported stress level (1-10). Ask the user if not provided."),
      ergonomicsSetup: z
        .string()
        .describe("Description of the employee's workstation. Ask the user if not provided."),
      sleepQuality: z
        .string()
        .describe("Employee's self-reported sleep quality. Ask the user if not provided."),
      activityLevel: z
        .string()
        .describe("Employee's daily activity level. Ask the user if not provided."),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
     const prompt = `You are an AI-powered health and wellness assistant. Analyze the employee's wellness data and provide personalized suggestions to improve their overall well-being and productivity.

      Stress Level (1-10): ${input.stressLevel}
      Ergonomics Setup: ${input.ergonomicsSetup}
      Sleep Quality: ${input.sleepQuality}
      Activity Level: ${input.activityLevel}

      Provide a concise, friendly response summarizing specific and actionable suggestions for Stress Reduction, Ergonomic Adjustments, and Healthy Habits.`;
    
    const { text } = await ai.generate({ prompt });
    return text;
  }
);


// Define the main assistant flow that uses the tools
export const assistantFlow = ai.defineFlow(
  {
    name: 'assistantFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const { text } = await ai.generate({
      prompt,
      model: 'googleai/gemini-2.5-flash',
      tools: [hrQuestionsTool, wellnessTool],
    });
    return text;
  }
);
