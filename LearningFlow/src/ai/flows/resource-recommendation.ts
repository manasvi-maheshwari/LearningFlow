'use server';

/**
 * @fileOverview Provides personalized learning resource recommendations based on a student's courses and performance.
 *
 * - recommendResources - A function that generates resource recommendations.
 * - ResourceRecommendationInput - The input type for the recommendResources function.
 * - ResourceRecommendationOutput - The return type for the recommendResources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResourceRecommendationInputSchema = z.object({
  courses: z
    .array(z.string())
    .describe('List of enrolled courses for the student.'),
  academicPerformance: z
    .string()
    .describe('Description of the student\'s academic performance.'),
});
export type ResourceRecommendationInput = z.infer<
  typeof ResourceRecommendationInputSchema
>;

const ResourceRecommendationOutputSchema = z.object({
  resources: z
    .array(z.string())
    .describe(
      'A list of recommended learning resources (articles, videos, tutorials).'
    ),
});
export type ResourceRecommendationOutput = z.infer<
  typeof ResourceRecommendationOutputSchema
>;

export async function recommendResources(
  input: ResourceRecommendationInput
): Promise<ResourceRecommendationOutput> {
  return recommendResourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resourceRecommendationPrompt',
  input: {schema: ResourceRecommendationInputSchema},
  output: {schema: ResourceRecommendationOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized learning resource recommendations to students.

  Based on the student's enrolled courses and academic performance, recommend relevant learning resources such as articles, videos, and tutorials.
  Courses: {{courses}}
  Academic Performance: {{academicPerformance}}

  Provide a list of resources that will help the student improve their understanding of the subject matter.
  Resources:`, // Ensure this line ends with 'Resources:' to guide the LLM.
});

const recommendResourcesFlow = ai.defineFlow(
  {
    name: 'recommendResourcesFlow',
    inputSchema: ResourceRecommendationInputSchema,
    outputSchema: ResourceRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
