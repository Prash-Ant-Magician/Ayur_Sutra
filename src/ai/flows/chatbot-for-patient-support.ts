'use server';

/**
 * @fileOverview A chatbot for patient support.
 *
 * - chatbotForPatientSupport - A function that answers common questions from patients.
 * - ChatbotForPatientSupportInput - The input type for the chatbotForPatientSupport function.
 * - ChatbotForPatientSupportOutput - The return type for the chatbotForPatientSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotForPatientSupportInputSchema = z.object({
  question: z.string().describe('The question from the patient.'),
});
export type ChatbotForPatientSupportInput = z.infer<typeof ChatbotForPatientSupportInputSchema>;

const ChatbotForPatientSupportOutputSchema = z.object({
  answer: z.string().describe('The answer to the patient question.'),
});
export type ChatbotForPatientSupportOutput = z.infer<typeof ChatbotForPatientSupportOutputSchema>;

export async function chatbotForPatientSupport(input: ChatbotForPatientSupportInput): Promise<ChatbotForPatientSupportOutput> {
  return chatbotForPatientSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotForPatientSupportPrompt',
  input: {schema: ChatbotForPatientSupportInputSchema},
  output: {schema: ChatbotForPatientSupportOutputSchema},
  prompt: `You are a helpful chatbot for the AyurSutra application.

  You are able to answer common questions about the application and treatment.

  Question: {{{question}}}

  Answer: `,
});

const chatbotForPatientSupportFlow = ai.defineFlow(
  {
    name: 'chatbotForPatientSupportFlow',
    inputSchema: ChatbotForPatientSupportInputSchema,
    outputSchema: ChatbotForPatientSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
