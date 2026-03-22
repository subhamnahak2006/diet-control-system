"use client";

import React from 'react';
import { PersonalizedDietPlanOutput } from '@/ai/flows/personalized-diet-plan-flow';
import { LifestyleAndHydrationAdviceOutput } from '@/ai/flows/lifestyle-and-hydration-advice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Apple, Droplets, Moon, Activity, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface ReportDisplayProps {
  dietPlan: PersonalizedDietPlanOutput;
  advice: LifestyleAndHydrationAdviceOutput;
  metrics: {
    bmi: number;
    bmiClass: string;
    calories: number;
  };
}

export function ReportDisplay({ dietPlan, advice, metrics }: ReportDisplayProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary text-primary-foreground border-none overflow-hidden relative">
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <Activity size={120} />
          </div>
          <CardHeader>
            <CardTitle className="text-lg font-medium opacity-90">BMI Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{metrics.bmi}</div>
            <p className="mt-1 text-sm opacity-80">{metrics.bmiClass}</p>
          </CardContent>
        </Card>

        <Card className="bg-accent text-accent-foreground border-none overflow-hidden relative">
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <Sparkles size={120} />
          </div>
          <CardHeader>
            <CardTitle className="text-lg font-medium opacity-90">Daily Calorie Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{metrics.calories}</div>
            <p className="mt-1 text-sm opacity-80">kcal / day</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/10">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Droplets className="text-primary" size={20} />
              Hydration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">{advice.hydrationRecommendation}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-lg">
          <CardHeader className="bg-primary/5 rounded-t-lg">
            <div className="flex items-center gap-2 mb-2">
              <Apple className="text-primary" />
              <CardTitle>Daily Meal Plan</CardTitle>
            </div>
            <CardDescription>Customized nutrition for your fitness goals</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {[
              { label: 'Breakfast', content: dietPlan.recommendedDietPlan.breakfast },
              { label: 'Mid-Morning Snack', content: dietPlan.recommendedDietPlan.midMorningSnack },
              { label: 'Lunch', content: dietPlan.recommendedDietPlan.lunch },
              { label: 'Evening Snack', content: dietPlan.recommendedDietPlan.eveningSnack },
              { label: 'Dinner', content: dietPlan.recommendedDietPlan.dinner },
            ].map((meal, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-primary">{meal.label}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-md border border-transparent group-hover:border-primary/20 transition-all">
                  {meal.content}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-amber-50 dark:bg-amber-950/20">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertCircle size={20} />
                <CardTitle className="text-lg">Foods to Avoid</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {dietPlan.foodsToAvoid}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Moon size={20} />
                <CardTitle className="text-lg">Sleep & Recovery</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              {advice.sleepTips.map((tip, idx) => (
                <div key={idx} className="flex gap-2 items-start text-sm text-muted-foreground">
                  <CheckCircle2 size={16} className="mt-0.5 text-blue-500 shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-emerald-50 dark:bg-emerald-950/20">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Activity size={20} />
                <CardTitle className="text-lg">Lifestyle Suggestions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              {advice.lifestyleSuggestions.map((suggestion, idx) => (
                <div key={idx} className="flex gap-2 items-start text-sm text-muted-foreground">
                  <CheckCircle2 size={16} className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="pt-6">
          <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
            <Sparkles size={18} />
            AI Health Summary
          </h3>
          <p className="text-sm text-muted-foreground italic leading-relaxed">
            {dietPlan.healthSummary}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
