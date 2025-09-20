'use server';
/**
 * @fileOverview Suggest a therapy based on the patient profile and medical history.
 *
 * - suggestTherapyBasedOnProfile - A function that handles the therapy suggestion process.
 * - SuggestTherapyBasedOnProfileInput - The input type for the suggestTherapyBasedOnProfile function.
 * - SuggestTherapyBasedOnProfileOutput - The return type for the suggestTherapyBasedOnProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTherapyBasedOnProfileInputSchema = z.object({
  profile: z
    .string()
    .describe('The patient profile, including medical history, symptoms, and current therapies.'),
});
export type SuggestTherapyBasedOnProfileInput = z.infer<
  typeof SuggestTherapyBasedOnProfileInputSchema
>;

const SuggestTherapyBasedOnProfileOutputSchema = z.object({
  therapySuggestion: z.string().describe('The suggested therapy for the patient.'),
  reason: z
    .string()
    .describe('The reason for suggesting the therapy based on the patient profile.'),
});
export type SuggestTherapyBasedOnProfileOutput = z.infer<
  typeof SuggestTherapyBasedOnProfileOutputSchema
>;

export async function suggestTherapyBasedOnProfile(
  input: SuggestTherapyBasedOnProfileInput
): Promise<SuggestTherapyBasedOnProfileOutput> {
  return suggestTherapyBasedOnProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTherapyBasedOnProfilePrompt',
  input: {schema: SuggestTherapyBasedOnProfileInputSchema},
  output: {schema: SuggestTherapyBasedOnProfileOutputSchema},
  prompt: `You are an AI assistant designed to suggest therapies based on patient profiles and medical histories.

  Given the following patient profile, suggest a suitable therapy and explain the reasoning behind your suggestion.

  Patient Profile: {{{profile}}}

  Therapy Suggestion (name of the therapy):
  Reason (why is this therapy most suitable for this patient?):
  `,
});

const suggestTherapyBasedOnProfileFlow = ai.defineFlow(
  {
    name: 'suggestTherapyBasedOnProfileFlow',
    inputSchema: SuggestTherapyBasedOnProfileInputSchema,
    outputSchema: SuggestTherapyBasedOnProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
