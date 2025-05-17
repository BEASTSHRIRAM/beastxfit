import React from 'react';
import { Utensils, Flame, Apple } from 'lucide-react';

interface CalorieRecommendationProps {
  weight: number;
  goal: 'maintain' | 'gain' | 'lose';
  bmiCategory: string;
}

const CalorieRecommendation: React.FC<CalorieRecommendationProps> = ({ 
  weight, 
  goal,
  bmiCategory 
}) => {
  // Base calculation (very simplified version)
  const baseCaloricNeeds = weight * 24 * 1.4; // Rough estimate
  
  let calorieRecommendation: number;
  let proteinRecommendation: number;
  
  // Adjust based on goal
  switch (goal) {
    case 'gain':
      calorieRecommendation = Math.round(baseCaloricNeeds + 500);
      proteinRecommendation = Math.round(weight * 2.2);
      break;
    case 'lose':
      calorieRecommendation = Math.round(baseCaloricNeeds - 500);
      proteinRecommendation = Math.round(weight * 2);
      break;
    default: // maintain
      calorieRecommendation = Math.round(baseCaloricNeeds);
      proteinRecommendation = Math.round(weight * 1.6);
  }
  
  // Safety check for minimum calories
  const minimumCalories = 1200;
  if (calorieRecommendation < minimumCalories) {
    calorieRecommendation = minimumCalories;
  }
  
  // Get dietary tips based on goal
  const getDietaryTips = () => {
    switch (goal) {
      case 'gain':
        return [
          "Eat calorie-dense foods like nuts, avocados, and healthy oils",
          "Consume protein with each meal to support muscle growth",
          "Add an extra snack between meals",
          "Consider protein shakes or smoothies for easy calories"
        ];
      case 'lose':
        return [
          "Focus on high-volume, low-calorie foods like vegetables",
          "Drink plenty of water before meals to help with satiety",
          "Reduce refined carbohydrates and added sugars",
          "Eat protein with each meal to preserve muscle mass"
        ];
      default: // maintain
        return [
          "Focus on whole foods and balanced macronutrients",
          "Maintain consistent meal timing and portion sizes",
          "Stay hydrated throughout the day",
          "Ensure adequate protein intake for muscle maintenance"
        ];
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Flame className="h-5 w-5 mr-2 text-orange-500" />
        Calorie Recommendation
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="text-lg font-medium text-blue-800 mb-2">Daily Calories</h4>
            <p className="text-3xl font-bold text-blue-600">{calorieRecommendation} kcal</p>
            <p className="text-sm text-gray-600 mt-2">
              {goal === 'gain' && 'Caloric surplus to support weight gain'}
              {goal === 'lose' && 'Caloric deficit to support weight loss'}
              {goal === 'maintain' && 'Maintenance calories to support current weight'}
            </p>
          </div>
          
          <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-100">
            <h4 className="text-lg font-medium text-green-800 mb-2 flex items-center">
              <Utensils className="h-5 w-5 mr-2" />
              Protein Recommendation
            </h4>
            <p className="text-2xl font-bold text-green-600">{proteinRecommendation}g</p>
            <p className="text-sm text-gray-600 mt-2">
              Protein is essential for muscle repair and growth
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <Apple className="h-5 w-5 mr-2 text-green-500" />
            Dietary Tips
          </h4>
          <ul className="space-y-2">
            {getDietaryTips().map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium mr-2 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <strong>Note:</strong> These are general recommendations. Individual needs may vary based on activity level, medical conditions, and other factors. Consider consulting with a nutritionist for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieRecommendation;