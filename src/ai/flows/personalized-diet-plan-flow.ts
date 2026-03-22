'use server';
/**
 * @fileOverview A Genkit flow for generating personalized diet recommendations based on user health profiles.
 *
 * - personalizedDietPlan - A function that handles the personalized diet plan generation process.
 * - PersonalizedDietPlanInput - The input type for the personalizedDietPlan function.
 * - PersonalizedDietPlanOutput - The return type for the personalizedDietPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedDietPlanInputSchema = z.object({
  name: z.string().describe('The name of the user.'),
  age: z.number().int().positive().describe('The age of the user in years.'),
  gender: z.enum(['Male', 'Female', 'Other']).describe('The gender of the user.'),
  bloodGroup: z.string().describe('The blood group of the user (e.g., A+, B+, O-).'),
  heightCm: z.number().positive().describe('The height of the user in centimeters.'),
  weightKg: z.number().positive().describe('The weight of the user in kilograms.'),
  sleepingTime: z.string().describe('The time the user usually goes to sleep (e.g., 1:00 AM).'),
  wakeUpTime: z.string().describe('The time the user usually wakes up (e.g., 8:30 AM).'),
  dailyActivityLevel: z.enum(['Low', 'Moderate', 'High']).describe('The user\'s daily activity level.'),
  existingDiseases: z.string().describe('Any existing diseases or medical conditions (e.g., None, Diabetes, High Blood Pressure).'),
  foodPreference: z.enum(['Vegetarian', 'Non-Vegetarian', 'Vegan']).describe('The user\'s food preference.'),
  allergies: z.string().describe('Any known allergies (e.g., None, Peanuts, Gluten).'),
  fitnessGoal: z.enum(['Weight Loss', 'Weight Gain', 'Maintain Health', 'Muscle Gain']).describe('The user\'s fitness goal.'),
});
export type PersonalizedDietPlanInput = z.infer<typeof PersonalizedDietPlanInputSchema>;

const DietPlanSchema = z.object({
  breakfast: z.string().describe('Recommended breakfast meal.'),
  midMorningSnack: z.string().describe('Recommended mid-morning snack.'),
  lunch: z.string().describe('Recommended lunch meal.'),
  eveningSnack: z.string().describe('Recommended evening snack.'),
  dinner: z.string().describe('Recommended dinner meal.'),
});

const PersonalizedDietPlanOutputSchema = z.object({
  healthSummary: z.string().describe('A summary of the user\'s health status.'),
  bmiResult: z.string().describe('The calculated BMI and its classification (Underweight / Normal / Overweight / Obese).'),
  dailyCalorieRequirement: z.string().describe('The estimated daily calorie requirement.'),
  recommendedDietPlan: DietPlanSchema.describe('A detailed daily diet plan.'),
  hydrationRecommendation: z.string().describe('Recommendations for daily hydration intake.'),
  foodsToAvoid: z.string().describe('A list of foods to avoid based on the user\'s profile.'),
  lifestyleSuggestions: z.string().describe('Suggestions for lifestyle improvements.'),
  healthTips: z.string().describe('General health tips.'),
});
export type PersonalizedDietPlanOutput = z.infer<typeof PersonalizedDietPlanOutputSchema>;

export async function personalizedDietPlan(input: PersonalizedDietPlanInput): Promise<PersonalizedDietPlanOutput> {
  return personalizedDietPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedDietPlanPrompt',
  input: {schema: PersonalizedDietPlanInputSchema},
  output: {schema: PersonalizedDietPlanOutputSchema},
  prompt: `Act as an AI Nutritionist and Health Advisor.

Your task is to analyze the user's health profile and generate a personalized diet recommendation plan.
Use the user's basic health information to provide safe, practical, and realistic dietary suggestions.

User Information:
- Name: {{{name}}}
- Age: {{{age}}}
- Gender: {{{gender}}}
- Blood Group: {{{bloodGroup}}}
- Height: {{{heightCm}}} cm
- Weight: {{{weightKg}}} kg
- Sleeping Time: {{{sleepingTime}}}
- Wake-up Time: {{{wakeUpTime}}}
- Daily Activity Level: {{{dailyActivityLevel}}}
- Existing Diseases or Medical Conditions: {{{existingDiseases}}}
- Food Preference: {{{foodPreference}}}
- Allergies: {{{allergies}}}
- Fitness Goal: {{{fitnessGoal}}}

Instructions:
1. Calculate BMI using height and weight.
2. Classify health status (Underweight / Normal / Overweight / Obese).
3. Estimate daily calorie requirement based on age, gender, height, weight, and activity level, and fitness goal.
4. Suggest a complete daily diet plan including:
   - Breakfast
   - Mid-morning snack
   - Lunch
   - Evening snack
   - Dinner
5. Provide hydration recommendation.
6. Suggest sleep improvement tips if needed, based on sleeping and wake-up times.
7. Consider existing diseases while suggesting food (e.g., diabetes, BP, thyroid).
8. Avoid harmful or extreme diet recommendations.
9. Ensure the response is simple, structured, and practical for daily life.`,
});

const personalizedDietPlanFlow = ai.defineFlow(
  {
    name: 'personalizedDietPlanFlow',
    inputSchema: PersonalizedDietPlanInputSchema,
    outputSchema: PersonalizedDietPlanOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
