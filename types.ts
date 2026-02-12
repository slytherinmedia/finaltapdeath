
export interface UserHabits {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // cm
  weight: number; // kg
  smoking: 'none' | 'occasional' | 'light' | 'heavy' | 'chain';
  drinking: 'none' | 'rare' | 'weekly' | 'daily' | 'binge';
  sleep: number; // hours
  water: number; // glasses
  stress: 'calm' | 'moderate' | 'high' | 'soul-crushing';
  depression: 'happy' | 'stable' | 'melancholy' | 'abyss';
  screenTime: number; // hours per day
  exercise: number; // minutes per day
  yoga: boolean;
  junkFood: 'rarely' | 'often' | 'daily';
  sugar: 'none' | 'little' | 'lot' | 'demon';
  processedMeat: 'none' | 'sometimes' | 'daily';
  cityLiving: boolean;
  socialLife: 'good' | 'lonely' | 'hermit';
  medicalCheckup: 'never' | 'rarely' | 'annually' | 'bi-annually';
  medicalConditions: string[];
}

export interface CalculationResult {
  userName: string;
  remainingYears: number;
  remainingMonths: number;
  remainingDays: number;
  endDate: Date;
  advice: string;
  chartData: {
    sins: number;
    virtues: number;
    impactBreakdown: {
      substances: number;
      mental: number;
      diet: number;
      lifestyle: number;
      medical: number;
    }
  }
}

export interface Quote {
  text: string;
  author: string;
}
