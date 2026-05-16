'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { recommendResources } from '@/ai/flows/resource-recommendation';
import { Loader2, Wand2, BookOpenCheck } from 'lucide-react';

const formSchema = z.object({
  courses: z.string().min(1, 'Please list at least one course.'),
  academicPerformance: z.string().min(10, 'Please describe your performance in a bit more detail.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ResourceRecommendationPage() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courses: '',
      academicPerformance: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setRecommendations([]);
    try {
      const result = await recommendResources({
        courses: values.courses.split(',').map(course => course.trim()),
        academicPerformance: values.academicPerformance,
      });
      setRecommendations(result.resources);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem generating recommendations. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-start p-4 md:p-8 min-h-screen animate-fade-in-up">
      <div className="w-full max-w-4xl space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Wand2 className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="font-headline text-2xl">AI Resource Recommender</CardTitle>
                <CardDescription>
                  Get personalized learning resources based on your courses and performance.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="courses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Enrolled Courses</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Data Structures, Algorithms, Web Development"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="academicPerformance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Academic Performance</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., I'm doing well in Web Dev, but struggling with recursive concepts in Algorithms."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {(loading || recommendations.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Recommended Resources</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-lg bg-muted animate-pulse"></div>
                        <div className="space-y-2 w-full">
                           <div className="h-4 w-3/4 rounded bg-muted animate-pulse"></div>
                           <div className="h-4 w-1/2 rounded bg-muted animate-pulse"></div>
                        </div>
                      </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 rounded-md bg-accent">
                      <BookOpenCheck className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
