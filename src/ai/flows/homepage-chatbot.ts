'use server';

/**
 * @fileOverview A homepage chatbot to answer frequently asked questions.
 *
 * - homepageChatbot - A function that answers common questions from website visitors.
 * - HomepageChatbotInput - The input type for the homepageChatbot function.
 * - HomepageChatbotOutput - The return type for the homepageChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HomepageChatbotInputSchema = z.object({
  question: z.string().describe('The question from the visitor.'),
});
export type HomepageChatbotInput = z.infer<typeof HomepageChatbotInputSchema>;

const HomepageChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the visitor question.'),
});
export type HomepageChatbotOutput = z.infer<typeof HomepageChatbotOutputSchema>;

export async function homepageChatbot(input: HomepageChatbotInput): Promise<HomepageChatbotOutput> {
  return homepageChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'homepageChatbotPrompt',
  input: {schema: HomepageChatbotInputSchema},
  output: {schema: HomepageChatbotOutputSchema},
  prompt: `You are a friendly and helpful virtual receptionist for AyurSutra, a holistic wellness clinic specializing in Ayurvedic treatments.

  Your goal is to answer visitor questions and guide them to book an appointment.

  Here is some information about AyurSutra:
  - **Services Offered:** We offer several Ayurvedic therapies including Panchakarma (detoxification), Abhyanga (oil massage), and Shirodhara (stress relief). We also provide diet and lifestyle counseling.
  - **Doctors:** We have two main practitioners: Dr. Evelyn Reed (specializes in Ayurvedic Medicine) and Dr. Samuel Green (specializes in Panchakarma Therapy).
  - **Fees:** A standard consultation starts at $75. Therapy costs vary. For example, Abhyanga is $120 per session, and a full Panchakarma program can range from $1,500 to $3,000. It's best to book a consultation for exact pricing.
  - **Booking:** Visitors can book an appointment by clicking the "Book Appointment" or "Schedule Your Therapy" buttons on the website, or by navigating to the /book-appointment page.
  - **Locations:** We have clinics in "Harmony City" and "Serenity Valley".

  When answering, be conversational and concise. If you don't know an answer, politely state that you don't have that information and suggest they contact the clinic directly through the contact page. Always encourage users to book an appointment to get personalized advice.

  Question: {{{question}}}

  Answer: `,
});

const homepageChatbotFlow = ai.defineFlow(
  {
    name: 'homepageChatbotFlow',
    inputSchema: HomepageChatbotInputSchema,
    outputSchema: HomepageChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
