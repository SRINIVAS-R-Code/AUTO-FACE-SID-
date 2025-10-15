
'use server';

/**
 * @fileOverview A wellness monitoring AI flow that provides health suggestions.
 * 
 * - provideHealthSuggestions: A function that generates personalized health advice.
 * - ProvideHealthSuggestionsInput: The input type for the provideHealthSuggestions function.
 * - ProvideHealthSuggestionsOutput: The return type for the provideHealthSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProvideHealthSuggestionsInputSchema = z.object({
  stressLevel: z.number().describe("The user's self-reported stress level from 1 to 10."),
  ergonomicsSetup: z.string().describe("A description of the user's workspace ergonomics."),
  sleepQuality: z.enum(['good', 'average', 'poor']).describe("The user's self-reported sleep quality."),
  activityLevel: z.enum(['sedentary', 'moderate', 'active']).describe("The user's self-reported physical activity level."),
});

export type ProvideHealthSuggestionsInput = z.infer<typeof ProvideHealthSuggestionsInputSchema>;

const ProvideHealthSuggestionsOutputSchema = z.object({
  stressReductionSuggestion: z.string().describe("A specific, actionable suggestion for reducing stress."),
  ergonomicsAdjustmentSuggestion: z.string().describe("A specific, actionable suggestion for improving workstation ergonomics."),
  healthyHabitSuggestion: z.string().describe("A specific, actionable suggestion for a healthy habit to adopt."),
});

export type ProvideHealthSuggestionsOutput = z.infer<typeof ProvideHealthSuggestionsOutputSchema>;

export async function provideHealthSuggestions(input: ProvideHealthSuggestionsInput): Promise<ProvideHealthSuggestionsOutput> {
  return provideHealthSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideHealthSuggestionsPrompt',
  input: { schema: ProvideHealthSuggestionsInputSchema },
  output: { schema: ProvideHealthSuggestionsOutputSchema },
  prompt: `You are an AI-powered health and wellness assistant. Analyze the employee's wellness data and provide one concise, friendly, and actionable suggestion for each of the following categories: Stress Reduction, Ergonomic Adjustments, and Healthy Habits.

  Wellness Data:
  - Stress Level (1-10): {{{stressLevel}}}
  - Ergonomics Setup: "{{{ergonomicsSetup}}}"
  - Sleep Quality: {{{sleepQuality}}}
  - Activity Level: {{{activityLevel}}}
  
  Generate a single suggestion for each category.`,
});

const provideHealthSuggestionsFlow = ai.defineFlow(
  {
    name: 'provideHealthSuggestionsFlow',
    inputSchema: ProvideHealthSuggestionsInputSchema,
    outputSchema: ProvideHealthSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate health suggestions.');
    }
    return output;
  }
);
