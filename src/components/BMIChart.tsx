import React from 'react';

interface BMIChartProps {
  bmi: number;
}

const BMIChart: React.FC<BMIChartProps> = ({ bmi }) => {
  // Define BMI categories and their color ranges
  const categories = [
    { name: 'Underweight', min: 0, max: 18.5, color: 'bg-yellow-500' },
    { name: 'Normal', min: 18.5, max: 25, color: 'bg-green-500' },
    { name: 'Overweight', min: 25, max: 30, color: 'bg-orange-500' },
    { name: 'Obese', min: 30, max: 40, color: 'bg-red-500' }
  ];

  // Calculate position on the chart (0-100%)
  const calculatePosition = () => {
    const minBMI = 10;
    const maxBMI = 40;
    const clampedBMI = Math.max(minBMI, Math.min(maxBMI, bmi));
    return ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 100;
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-3">BMI Scale</h3>
      
      <div className="relative pt-5 pb-8">
        {/* BMI Scale */}
        <div className="flex h-8 rounded-md overflow-hidden">
          {categories.map((category, index) => (
            <div 
              key={index}
              className={`${category.color} flex-grow relative`}
              style={{ 
                flexGrow: category.max - category.min
              }}
            >
              <span className="absolute top-full text-xs font-medium mt-1 left-0 transform -translate-x-1/2">
                {category.min}
              </span>
              {index === categories.length - 1 && (
                <span className="absolute top-full text-xs font-medium mt-1 right-0 transform translate-x-1/2">
                  {category.max}
                </span>
              )}
            </div>
          ))}
        </div>
        
        {/* Category Labels */}
        <div className="flex mt-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="flex-grow text-center text-xs"
              style={{ 
                flexGrow: category.max - category.min
              }}
            >
              {category.name}
            </div>
          ))}
        </div>
        
        {/* BMI Indicator */}
        <div 
          className="absolute top-0 w-0.5 h-12 bg-black"
          style={{ 
            left: `${calculatePosition()}%`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="w-4 h-4 rounded-full bg-blue-600 absolute -top-2 left-1/2 transform -translate-x-1/2 border-2 border-white shadow-md"></div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-blue-600 text-white text-xs font-bold rounded px-2 py-0.5">
            {bmi.toFixed(1)}
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mt-6">
        BMI is a screening tool, but it does not diagnose body fatness or health. 
        The BMI scale is the same for all adults regardless of age, sex, or frame size.
      </p>
    </div>
  );
};

export default BMIChart;