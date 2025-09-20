'use server';
/**
 * @fileOverview Personalized pre- and post-procedure precautions flow.
 *
 * - personalizedPrecautionGeneration - A function that generates personalized precautions.
 * - PersonalizedPrecautionInput - The input type for the personalizedPrecautionGeneration function.
 * - PersonalizedPrecautionOutput - The return type for the personalizedPrecautionGeneration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedPrecautionInputSchema = z.object({
  medicalHistory: z
    .string()
    .describe('The patient medical history, including past illnesses and surgeries.'),
  symptoms: z.string().describe('The current symptoms experienced by the patient.'),
  currentTherapies: z
    .string()
    .describe('The current therapies and medications the patient is undergoing.'),
  procedureDetails: z
    .string()
    .describe('Detailed information about the medical procedure.'),
});
export type PersonalizedPrecautionInput = z.infer<
  typeof PersonalizedPrecautionInputSchema
>;

const PersonalizedPrecautionOutputSchema = z.object({
  preProcedurePrecautions: z
    .string()
    .describe('A list of precautions to take before the procedure.'),
  postProcedurePrecautions: z
    .string()
    .describe('A list of precautions to take after the procedure.'),
});
export type PersonalizedPrecautionOutput = z.infer<
  typeof PersonalizedPrecautionOutputSchema
>;

export async function personalizedPrecautionGeneration(
  input: PersonalizedPrecautionInput
): Promise<PersonalizedPrecautionOutput> {
  return personalizedPrecautionGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedPrecautionPrompt',
  input: {schema: PersonalizedPrecautionInputSchema},
  output: {schema: PersonalizedPrecautionOutputSchema},
  prompt: `You are a healthcare assistant specializing in creating pre- and post-procedure precautions for patients.

  Based on the patient's medical history, symptoms, current therapies, and the details of the procedure, provide personalized precautions.

  Medical History: {{{medicalHistory}}}
  Symptoms: {{{symptoms}}}
  Current Therapies: {{{currentTherapies}}}
  Procedure Details: {{{procedureDetails}}}

  Provide clear and concise instructions for both pre- and post-procedure care.
  Consider potential interactions between the patient's current therapies and the procedure.
`,
});

const personalizedPrecautionGenerationFlow = ai.defineFlow(
  {
    name: 'personalizedPrecautionGenerationFlow',
    inputSchema: PersonalizedPrecautionInputSchema,
    outputSchema: PersonalizedPrecautionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
