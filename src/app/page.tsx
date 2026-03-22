"use client";

import React, { useState } from 'react';
import { HealthProfileForm, HealthProfileData } from '@/components/HealthProfileForm';
import { ReportDisplay } from '@/components/ReportDisplay';
import { personalizedDietPlan, PersonalizedDietPlanOutput } from '@/ai/flows/personalized-diet-plan-flow';
import { lifestyleAndHydrationAdvice, LifestyleAndHydrationAdviceOutput } from '@/ai/flows/lifestyle-and-hydration-advice';
import { calculateBMI, estimateDailyCalories } from '@/app/lib/health-utils';
import { Brain, Heart, Leaf, ShieldCheck, Activity } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    dietPlan: PersonalizedDietPlanOutput;
    advice: LifestyleAndHydrationAdviceOutput;
    metrics: { bmi: number; bmiClass: string; calories: number };
  } | null>(null);

  const handleSubmit = async (data: HealthProfileData) => {
    setIsLoading(true);
    try {
      // Parallel requests for better performance
      const [dietPlanResult, adviceResult] = await Promise.all([
        personalizedDietPlan({
          ...data,
          existingDiseases: data.existingDiseases || "None",
          allergies: data.allergies || "None",
        }),
        lifestyleAndHydrationAdvice({
          ...data,
          // Adapt inputs for the lifestyle advice schema which expects arrays
          existingDiseases: data.existingDiseases ? [data.existingDiseases] : ["None"],
          allergies: data.allergies ? [data.allergies] : ["None"],
          activityLevel: data.dailyActivityLevel,
        })
      ]);

      const bmiData = calculateBMI(data.weightKg, data.heightCm);
      const calorieEst = estimateDailyCalories(
        data.weightKg,
        data.heightCm,
        data.age,
        data.gender,
        data.dailyActivityLevel
      );

      setResults({
        dietPlan: dietPlanResult,
        advice: adviceResult,
        metrics: {
          bmi: bmiData.value,
          bmiClass: bmiData.classification,
          calories: calorieEst,
        },
      });
      
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Brain className="text-primary-foreground" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">NutriMind AI</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">How it works</a>
            <a href="#" className="hover:text-primary transition-colors">Safety</a>
            <a href="#" className="hover:text-primary transition-colors">About</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        {!results && (
          <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold tracking-tight text-primary sm:text-6xl">
              Eat Smarter with <span className="text-accent">AI Precision</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Unlock a personalized nutrition plan tailored to your body, goals, and lifestyle. Powered by advanced health intelligence.
            </p>
            <div className="flex flex-wrap justify-center gap-8 pt-6">
              <div className="flex items-center gap-2 text-sm font-medium text-primary/70">
                <ShieldCheck size={18} className="text-accent" />
                Science-Backed
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary/70">
                <Leaf size={18} className="text-accent" />
                Personalized
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary/70">
                <Heart size={18} className="text-accent" />
                Goal-Oriented
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-12">
          {/* Form Section */}
          <div className={`${results ? 'max-w-4xl mx-auto w-full' : 'max-w-2xl mx-auto w-full'}`}>
            <HealthProfileForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {/* Results Section */}
          {results && (
            <section id="results-section" className="scroll-mt-24 py-12 border-t mt-12">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-primary mb-2">Your Nutrition Insights</h2>
                <p className="text-muted-foreground">Generated based on your unique health profile</p>
              </div>
              <ReportDisplay 
                dietPlan={results.dietPlan} 
                advice={results.advice} 
                metrics={results.metrics} 
              />
              <div className="mt-12 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
                <p>
                  Note: This tool provides AI-generated suggestions. Please consult with a healthcare professional or registered dietitian before making significant changes to your diet or fitness routine, especially if you have pre-existing medical conditions.
                </p>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-white/30 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Brain className="text-primary" size={20} />
            <span className="font-bold text-primary">NutriMind AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NutriMind AI. Wellness redefined through intelligence.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
              <Activity size={16} />
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
              <Heart size={16} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
