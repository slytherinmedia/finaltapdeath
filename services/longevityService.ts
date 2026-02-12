
import { UserHabits } from '../types';

export const calculateRemainingLife = (habits: UserHabits) => {
  // Base life expectancy
  let expectancy = habits.gender === 'female' ? 83 : 79;
  if (habits.gender === 'other') expectancy = 81;

  let sins = 0;
  let virtues = 0;
  
  const breakdown = {
    substances: 0,
    mental: 0,
    diet: 0,
    lifestyle: 0,
    medical: 0
  };

  // BMI impact
  const heightInMeters = habits.height / 100;
  const bmi = habits.weight / (heightInMeters * heightInMeters);
  if (bmi > 30) { expectancy -= 5; sins += 5; breakdown.lifestyle += 5; }
  else if (bmi > 25) { expectancy -= 2; sins += 2; breakdown.lifestyle += 2; }
  else if (bmi < 18.5) { expectancy -= 2; sins += 2; breakdown.lifestyle += 2; }

  // Smoking
  const smokeMap = { none: 0, occasional: -2, light: -5, heavy: -12, chain: -20 };
  const sImpact = smokeMap[habits.smoking];
  expectancy += sImpact;
  if (sImpact < 0) { sins += Math.abs(sImpact); breakdown.substances += Math.abs(sImpact); }

  // Drinking
  const drinkMap = { none: 1, rare: 0, weekly: -2, daily: -6, binge: -15 };
  const dImpact = drinkMap[habits.drinking];
  expectancy += dImpact;
  if (dImpact < 0) { sins += Math.abs(dImpact); breakdown.substances += Math.abs(dImpact); }
  else { virtues += dImpact; }

  // Sleep
  if (habits.sleep < 6) { expectancy -= 6; sins += 6; breakdown.lifestyle += 6; }
  else if (habits.sleep >= 7 && habits.sleep <= 9) { virtues += 2; }

  // Water
  if (habits.water < 4) { expectancy -= 3; sins += 3; breakdown.lifestyle += 3; }
  else if (habits.water >= 8) { expectancy += 2; virtues += 2; }

  // Stress & Depression
  const stressMap = { calm: 2, moderate: 0, high: -6, 'soul-crushing': -12 };
  const stImpact = stressMap[habits.stress];
  expectancy += stImpact;
  if (stImpact < 0) { sins += Math.abs(stImpact); breakdown.mental += Math.abs(stImpact); }
  else virtues += stImpact;

  const depressionMap = { happy: 3, stable: 0, melancholy: -5, abyss: -12 };
  const depImpact = depressionMap[habits.depression];
  expectancy += depImpact;
  if (depImpact < 0) { sins += Math.abs(depImpact); breakdown.mental += Math.abs(depImpact); }
  else virtues += depImpact;

  // Medical Checkups
  const checkupMap = { never: -5, rarely: -2, annually: 3, 'bi-annually': 5 };
  const cImpact = checkupMap[habits.medicalCheckup];
  expectancy += cImpact;
  if (cImpact < 0) { sins += Math.abs(cImpact); breakdown.medical += Math.abs(cImpact); }
  else virtues += cImpact;

  // Medical Conditions
  habits.medicalConditions.forEach(condition => {
    let penalty = 0;
    switch (condition) {
      case 'hypertension': penalty = 5; break;
      case 'diabetes': penalty = 8; break;
      case 'heart_disease': penalty = 10; break;
      case 'asthma': penalty = 2; break;
      case 'cholesterol': penalty = 3; break;
      case 'kidney': penalty = 8; break;
      case 'cancer': penalty = 10; break;
      case 'autoimmune': penalty = 4; break;
      case 'thyroid': penalty = 2; break;
    }
    expectancy -= penalty;
    sins += penalty;
    breakdown.medical += penalty;
  });

  // Screen Time
  if (habits.screenTime > 10) { expectancy -= 5; sins += 5; breakdown.lifestyle += 5; }
  else if (habits.screenTime <= 2) virtues += 2;

  // Exercise & Yoga
  if (habits.exercise >= 30) { expectancy += 5; virtues += 5; }
  if (habits.yoga) { expectancy += 3; virtues += 3; }

  // Diet
  if (habits.junkFood === 'daily') { expectancy -= 8; sins += 8; breakdown.diet += 8; }
  const sugarMap = { none: 3, little: 0, lot: -5, demon: -12 };
  const sugImpact = sugarMap[habits.sugar];
  expectancy += sugImpact;
  if (sugImpact < 0) { sins += Math.abs(sugImpact); breakdown.diet += Math.abs(sugImpact); }
  else virtues += sugImpact;

  // Calculate remaining
  const remainingYearsTotal = Math.max(0, expectancy - habits.age);
  
  // Refined Y/M/D calculation logic
  const totalDays = Math.floor(remainingYearsTotal * 365.25);
  const years = Math.floor(totalDays / 365.25);
  const remainingDaysAfterYears = totalDays % 365.25;
  const months = Math.floor(remainingDaysAfterYears / 30.44);
  const days = Math.floor(remainingDaysAfterYears % 30.44);

  const today = new Date();
  const endDate = new Date(today.getFullYear() + years, today.getMonth() + months, today.getDate() + days);

  return {
    years,
    months,
    days,
    endDate,
    rawRemainingYears: remainingYearsTotal,
    chartData: {
      sins,
      virtues,
      impactBreakdown: breakdown
    }
  };
};
