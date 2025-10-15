'use server';
/**
 * @fileOverview An AI agent that provides personalized health suggestions based on wellness data.
 *
 * - provideHealthSuggestions - A function that generates health suggestions.
 * - ProvideHealthSuggestionsInput - The input type for the provideHealthSuggestions function.
 * - ProvideHealthSuggestionsOutput - The return type for the provideHealthSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideHealthSuggestionsInputSchema = z.object({
  stressLevel: z
    .number()
    .describe("Employee's self-reported stress level (1-10, 1 being minimal stress, 10 being maximal stress)."),
  ergonomicsSetup: z
    .string()
    .describe("Description of the employee's current ergonomics setup at their workstation."),
  sleepQuality: z.string().describe("Employee's self-reported sleep quality (e.g., 'good', 'poor', 'average')."),
  activityLevel: z
    .string()
    .describe("Employee's daily activity level (e.g., 'sedentary', 'moderate', 'active')."),
});
export type ProvideHealthSuggestionsInput = z.infer<typeof ProvideHealthSuggestionsInputSchema>;

const ProvideHealthSuggestionsOutputSchema = z.object({
  stressReductionSuggestion: z.string().describe('AI-driven suggestion for stress reduction techniques.'),
  ergonomicsAdjustmentSuggestion: z
    .string()
    .describe('AI-driven suggestion for ergonomic adjustments to improve workstation setup.'),
  healthyHabitSuggestion: z.string().describe('AI-driven suggestion for a healthy habit to incorporate into daily routine.'),
});
export type ProvideHealthSuggestionsOutput = z.infer<typeof ProvideHealthSuggestionsOutputSchema>;

export async function provideHealthSuggestions(
  input: ProvideHealthSuggestionsInput
): Promise<ProvideHealthSuggestionsOutput> {
  return provideHealthSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideHealthSuggestionsPrompt',
  input: {schema: ProvideHealthSuggestionsInputSchema},
  output: {schema: ProvideHealthSuggestionsOutputSchema},
  prompt: `You are an AI-powered health and wellness assistant. Analyze the employee's wellness data and provide personalized suggestions to improve their overall well-being and productivity.

Stress Level (1-10): {{stressLevel}}
Ergonomics Setup: {{ergonomicsSetup}}
Sleep Quality: {{sleepQuality}}
Activity Level: {{activityLevel}}

Provide specific and actionable suggestions for:
- Stress Reduction Techniques:
- Ergonomic Adjustments:
- Healthy Habits:`,
});

const provideHealthSuggestionsFlow = ai.defineFlow(
  {
    name: 'provideHealthSuggestionsFlow',
    inputSchema: ProvideHealthSuggestionsInputSchema,
    outputSchema: ProvideHealthSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
