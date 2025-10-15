// AI-Powered Attendance System
// Generate accurate and helpful answers to employee questions about company policies, benefits, or other HR-related topics.

'use server';

/**
 * @fileOverview AI assistant flow for answering employee questions.
 *
 * - aiAssistantAnswerQuestions - A function that answers employee questions about company policies, benefits, and HR-related topics.
 * - AIAssistantAnswerQuestionsInput - The input type for the aiAssistantAnswerQuestions function.
 * - AIAssistantAnswerQuestionsOutput - The output type for the aiAssistantAnswerQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIAssistantAnswerQuestionsInputSchema = z.object({
  question: z.string().describe('The question from the employee.'),
});

export type AIAssistantAnswerQuestionsInput = z.infer<typeof AIAssistantAnswerQuestionsInputSchema>;

const AIAssistantAnswerQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the employee question.'),
});

export type AIAssistantAnswerQuestionsOutput = z.infer<typeof AIAssistantAnswerQuestionsOutputSchema>;

export async function aiAssistantAnswerQuestions(
  input: AIAssistantAnswerQuestionsInput
): Promise<AIAssistantAnswerQuestionsOutput> {
  return aiAssistantAnswerQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiAssistantAnswerQuestionsPrompt',
  input: {schema: AIAssistantAnswerQuestionsInputSchema},
  output: {schema: AIAssistantAnswerQuestionsOutputSchema},
  prompt: `You are an AI assistant that answers questions about company policies, benefits, and HR-related topics.

  Question: {{{question}}}

  Answer:`,
});

const aiAssistantAnswerQuestionsFlow = ai.defineFlow(
  {
    name: 'aiAssistantAnswerQuestionsFlow',
    inputSchema: AIAssistantAnswerQuestionsInputSchema,
    outputSchema: AIAssistantAnswerQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
