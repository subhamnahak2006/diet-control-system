export function calculateBMI(weightKg: number, heightCm: number): { value: number; classification: string } {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let classification = '';

  if (bmi < 18.5) classification = 'Underweight';
  else if (bmi < 25) classification = 'Normal';
  else if (bmi < 30) classification = 'Overweight';
  else classification = 'Obese';

  return { value: parseFloat(bmi.toFixed(1)), classification };
}

export function estimateDailyCalories(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'Male' | 'Female' | 'Other',
  activityLevel: 'Low' | 'Moderate' | 'High'
): number {
  // Mifflin-St Jeor Equation
  let bmr: number;
  if (gender === 'Male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  const multipliers = {
    Low: 1.2,
    Moderate: 1.55,
    High: 1.9,
  };

  return Math.round(bmr * multipliers[activityLevel]);
}
