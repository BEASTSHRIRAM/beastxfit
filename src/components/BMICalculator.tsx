import React, { useState } from 'react';
import { Calculator, TrendingUp, TrendingDown, Info } from 'lucide-react';
import BMIChart from './BMIChart';
import CalorieRecommendation from './CalorieRecommendation';
import { calculateBMI, getBMICategory, getHealthTips } from '../utils/fitnessUtils';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [goal, setGoal] = useState<'maintain' | 'gain' | 'lose'>('maintain');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (height === '' || weight === '') {
      setError('Please enter both height and weight');
      return;
    }
    
    if (typeof height === 'number' && typeof weight === 'number') {
      const calculatedBMI = calculateBMI(weight, height);
      setBmi(calculatedBMI);
      setBmiCategory(getBMICategory(calculatedBMI));
      setShowResults(true);
      setError(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300">
        <div className="bg-blue-600 text-white p-4">
          <h2 className="text-xl font-bold flex items-center">
            <Calculator className="h-6 w-6 mr-2" />
            Fitness Calculator
          </h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')}
                  placeholder="Enter your height"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
                  placeholder="Enter your weight"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight Goal
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setGoal('lose')}
                  className={`flex items-center justify-center px-4 py-2 border ${
                    goal === 'lose' 
                      ? 'bg-red-100 border-red-500 text-red-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  } rounded-md focus:outline-none transition-colors duration-200`}
                >
                  <TrendingDown className="h-5 w-5 mr-2" />
                  Lose Weight
                </button>
                
                <button
                  type="button"
                  onClick={() => setGoal('maintain')}
                  className={`flex items-center justify-center px-4 py-2 border ${
                    goal === 'maintain' 
                      ? 'bg-blue-100 border-blue-500 text-blue-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  } rounded-md focus:outline-none transition-colors duration-200`}
                >
                  <Info className="h-5 w-5 mr-2" />
                  Maintain
                </button>
                
                <button
                  type="button"
                  onClick={() => setGoal('gain')}
                  className={`flex items-center justify-center px-4 py-2 border ${
                    goal === 'gain' 
                      ? 'bg-green-100 border-green-500 text-green-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  } rounded-md focus:outline-none transition-colors duration-200`}
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Gain Weight
                </button>
              </div>
            </div>
            
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Calculate
              </button>
            </div>
          </form>
          
          {showResults && bmi !== null && bmiCategory && (
            <div className="mt-8 space-y-6 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Your BMI Results</h3>
                  <p className="text-3xl font-bold text-blue-600">{bmi.toFixed(1)}</p>
                  <p className={`text-lg font-medium ${
                    bmiCategory === 'Normal weight' ? 'text-green-600' :
                    bmiCategory === 'Underweight' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {bmiCategory}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    {getHealthTips(bmiCategory)}
                  </p>
                </div>
                
                <BMIChart bmi={bmi} />
              </div>
              
              <CalorieRecommendation 
                weight={typeof weight === 'number' ? weight : 0} 
                goal={goal} 
                bmiCategory={bmiCategory} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;