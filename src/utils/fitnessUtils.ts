// Calculate BMI using weight in kg and height in cm
export const calculateBMI = (weight: number, height: number): number => {
  // Convert height from cm to meters
  const heightInMeters = height / 100;
  // BMI formula: weight (kg) / (height (m))^2
  return weight / (heightInMeters * heightInMeters);
};

// Determine BMI category based on the calculated BMI
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal weight';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

// Get health tips based on BMI category
export const getHealthTips = (category: string): string => {
  switch (category) {
    case 'Underweight':
      return 'Consider consulting with a healthcare provider. Focus on nutrient-dense foods and strength training to build healthy weight.';
    case 'Normal weight':
      return 'Maintain your healthy weight with balanced nutrition and regular physical activity.';
    case 'Overweight':
      return 'Consider moderately increasing physical activity and making small dietary adjustments for gradual weight loss.';
    case 'Obese':
      return 'Consider consulting with a healthcare provider. Gradual lifestyle changes can lead to sustainable weight loss.';
    default:
      return 'Maintain a balanced diet and regular physical activity for overall health.';
  }
};

// Calculate Basal Metabolic Rate (BMR) using the Mifflin-St Jeor Equation
export const calculateBMR = (
  weight: number, // in kg
  height: number, // in cm
  age: number,
  gender: 'male' | 'female'
): number => {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

// Activity level multipliers
export const activityLevels = {
  sedentary: 1.2, // little or no exercise
  lightlyActive: 1.375, // light exercise/sports 1-3 days/week
  moderatelyActive: 1.55, // moderate exercise/sports 3-5 days/week
  veryActive: 1.725, // hard exercise/sports 6-7 days/week
  extraActive: 1.9 // very hard exercise/sports & physical job or 2x training
};

// Calculate daily calorie needs
export const calculateDailyCalories = (
  bmr: number,
  activityLevel: keyof typeof activityLevels,
  goal: 'maintain' | 'lose' | 'gain'
): number => {
  const tdee = bmr * activityLevels[activityLevel]; // Total Daily Energy Expenditure
  
  switch (goal) {
    case 'lose':
      return tdee - 500; // 500 calorie deficit
    case 'gain':
      return tdee + 500; // 500 calorie surplus
    default:
      return tdee; // maintenance
  }
};

// Calculate macronutrient splits based on goals
export const calculateMacros = (
  calories: number,
  goal: 'maintain' | 'lose' | 'gain',
  bodyweightKg: number
) => {
  let proteinPercentage: number;
  let fatPercentage: number;
  let carbPercentage: number;
  
  switch (goal) {
    case 'lose':
      proteinPercentage = 0.40; // 40% protein
      fatPercentage = 0.35; // 35% fat
      carbPercentage = 0.25; // 25% carbs
      break;
    case 'gain':
      proteinPercentage = 0.30; // 30% protein
      fatPercentage = 0.25; // 25% fat
      carbPercentage = 0.45; // 45% carbs
      break;
    default: // maintain
      proteinPercentage = 0.30; // 30% protein
      fatPercentage = 0.30; // 30% fat
      carbPercentage = 0.40; // 40% carbs
  }
  
  // 1g protein = 4 calories
  // 1g carbs = 4 calories
  // 1g fat = 9 calories
  const proteinGrams = Math.round((calories * proteinPercentage) / 4);
  const fatGrams = Math.round((calories * fatPercentage) / 9);
  const carbGrams = Math.round((calories * carbPercentage) / 4);
  
  return {
    protein: proteinGrams,
    fat: fatGrams,
    carbs: carbGrams
  };
};