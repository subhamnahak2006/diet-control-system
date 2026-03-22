"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2, ChevronRight, Heart } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  age: z.coerce.number().int().positive().max(120),
  gender: z.enum(['Male', 'Female', 'Other']),
  bloodGroup: z.string().min(1, "Blood group is required"),
  heightCm: z.coerce.number().positive(),
  weightKg: z.coerce.number().positive(),
  sleepingTime: z.string().min(1, "Required"),
  wakeUpTime: z.string().min(1, "Required"),
  dailyActivityLevel: z.enum(['Low', 'Moderate', 'High']),
  existingDiseases: z.string().default("None"),
  foodPreference: z.enum(['Vegetarian', 'Non-Vegetarian', 'Vegan']),
  allergies: z.string().default("None"),
  fitnessGoal: z.enum(['Weight Loss', 'Weight Gain', 'Maintain Health', 'Muscle Gain']),
});

export type HealthProfileData = z.infer<typeof formSchema>;

interface HealthProfileFormProps {
  onSubmit: (data: HealthProfileData) => void;
  isLoading: boolean;
}

export function HealthProfileForm({ onSubmit, isLoading }: HealthProfileFormProps) {
  const form = useForm<HealthProfileData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 30,
      gender: 'Male',
      bloodGroup: "",
      heightCm: 170,
      weightKg: 70,
      sleepingTime: "11:00 PM",
      wakeUpTime: "7:00 AM",
      existingDiseases: "None",
      allergies: "None",
      dailyActivityLevel: 'Moderate',
      foodPreference: 'Vegetarian',
      fitnessGoal: 'Maintain Health',
    },
  });

  return (
    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Heart className="text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold text-primary">Your Health Profile</CardTitle>
        <CardDescription>Fill in your details to get a personalized nutrition plan</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bloodGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Group</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. O+" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="heightCm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weightKg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sleepingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sleeping Time</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="e.g. 11:00 PM" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="wakeUpTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wake-up Time</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="e.g. 7:00 AM" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="dailyActivityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Level</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Low">Low (Sedentary)</SelectItem>
                        <SelectItem value="Moderate">Moderate (Active)</SelectItem>
                        <SelectItem value="High">High (Very Active)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fitnessGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Goal</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                        <SelectItem value="Weight Gain">Weight Gain</SelectItem>
                        <SelectItem value="Maintain Health">Maintain Health</SelectItem>
                        <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="foodPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Preference</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                        <SelectItem value="Vegan">Vegan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="existingDiseases"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Existing Conditions / Diseases</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g. Diabetes, High Blood Pressure, or 'None'" 
                        className="resize-none"
                        {...field} 
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergies</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Peanuts, Gluten, or 'None'" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Your Plan...
                </>
              ) : (
                <>
                  Get Personalized Plan
                  <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
