'use server';
/**
 * @fileOverview A Genkit flow for generating personalized lifestyle and hydration advice.
 *
 * - lifestyleAndHydrationAdvice - A function that handles generating lifestyle and hydration advice.
 * - LifestyleAndHydrationAdviceInput - The input type for the lifestyleAndHydrationAdvice function.
 * - LifestyleAndHydrationAdviceOutput - The return type for the lifestyleAndHydrationAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LifestyleAndHydrationAdviceInputSchema = z.object({
  name: z.string().describe('User\'s name.'),
  age: z.number().int().positive().describe('User\'s age in years.'),
  gender: z.enum(['Male', 'Female', 'Other']).describe('User\'s gender.'),
  bloodGroup: z.string().describe('User\'s blood group (e.g., A+, O-).'),
  heightCm: z.number().positive().describe('User\'s height in centimeters.'),
  weightKg: z.number().positive().describe('User\'s weight in kilograms.'),
  sleepingTime: z.string().describe('User\'s usual sleeping time (e.g., "1:00 AM").'),
  wakeUpTime: z.string().describe('User\'s usual wake-up time (e.g., "8:30 AM").'),
  activityLevel: z.enum(['Low', 'Moderate', 'High']).describe('User\'s daily activity level.'),
  existingDiseases: z.array(z.string()).describe('List of user\'s existing diseases or medical conditions, or "None" if none.').default([]),
  foodPreference: z.enum(['Vegetarian', 'Non-Vegetarian', 'Vegan']).describe('User\'s food preference.'),
  allergies: z.array(z.string()).describe('List of user\'s food allergies, or "None" if none.').default([]),
  fitnessGoal: z.enum(['Weight Loss', 'Weight Gain', 'Maintain Health', 'Muscle Gain']).describe('User\'s primary fitness goal.')
});
export type LifestyleAndHydrationAdviceInput = z.infer<typeof LifestyleAndHydrationAdviceInputSchema>;

const LifestyleAndHydrationAdviceOutputSchema = z.object({
  hydrationRecommendation: z.string().describe('Personalized daily hydration recommendation.'),
  sleepTips: z.array(z.string()).describe('Practical tips for improving sleep quality.'),
  lifestyleSuggestions: z.array(z.string()).describe('General lifestyle suggestions relevant to the user\'s health profile.')
});
export type LifestyleAndHydrationAdviceOutput = z.infer<typeof LifestyleAndHydrationAdviceOutputSchema>;

const prompt = ai.definePrompt({
  name: 'lifestyleAndHydrationAdvicePrompt',
  input: { schema: LifestyleAndHydrationAdviceInputSchema },
  output: { schema: LifestyleAndHydrationAdviceOutputSchema },
  prompt: `You are an AI Nutritionist and Health Advisor.
Your task is to analyze the user\'s health profile and provide personalized recommendations for daily hydration intake and practical tips for improving sleep quality.
Consider the user\'s age, gender, weight, activity level, existing diseases, and sleep patterns.
Avoid harmful or extreme recommendations. Ensure the response is simple, structured, and practical for daily life.

User Health Profile:
Name: {{{name}}}
Age: {{{age}}}
Gender: {{{gender}}}
Height: {{{heightCm}}} cm
Weight: {{{weightKg}}} kg
Sleeping Time: {{{sleepingTime}}}
Wake-up Time: {{{wakeUpTime}}}
Daily Activity Level: {{{activityLevel}}}
Existing Diseases or Medical Conditions: {{#if existingDiseases}}{{#each existingDiseases}}- {{{this}}}
{{/each}}{{else}}None
{{/if}}Food Preference: {{{foodPreference}}}
Allergies: {{#if allergies}}{{#each allergies}}- {{{this}}}
{{/each}}{{else}}None
{{/if}}Fitness Goal: {{{fitnessGoal}}}

Based on this information, provide:
1. A personalized daily hydration recommendation.
2. Practical tips for improving sleep quality, considering the user\'s current sleep schedule.
3. General lifestyle suggestions relevant to the user\'s health profile.

Output your response in a JSON format matching the schema for hydrationRecommendation (string), sleepTips (array of strings), and lifestyleSuggestions (array of strings).`
});

const lifestyleAndHydrationAdviceFlow = ai.defineFlow(
  {
    name: 'lifestyleAndHydrationAdviceFlow',
    inputSchema: LifestyleAndHydrationAdviceInputSchema,
    outputSchema: LifestyleAndHydrationAdviceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

export async function lifestyleAndHydrationAdvice(input: LifestyleAndHydrationAdviceInput): Promise<LifestyleAndHydrationAdviceOutput> {
  return lifestyleAndHydrationAdviceFlow(input);
}
