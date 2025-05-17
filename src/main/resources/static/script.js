document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('fitnessForm');
    const resultsSection = document.getElementById('results');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const maintenanceCalories = document.getElementById('maintenanceCalories');
    const recommendationsList = document.getElementById('recommendationsList');
    const dietPlanList = document.getElementById('dietPlanList');
    const workoutPlanList = document.getElementById('workoutPlanList');
    const gymTipsList = document.getElementById('gymTipsList');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            age: parseInt(document.getElementById('age').value),
            height: parseFloat(document.getElementById('height').value),
            weight: parseFloat(document.getElementById('weight').value),
            gender: document.getElementById('gender').value
        };

        try {
            const response = await fetch('/api/fitness/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error calculating your fitness report. Please try again.');
        }
    });

    function displayResults(data) {
        // Display BMI and category
        bmiValue.textContent = data.bmi.toFixed(1);
        bmiCategory.textContent = data.category;
        maintenanceCalories.textContent = data.maintenanceCalories;

        // Display recommendations
        recommendationsList.innerHTML = '';
        data.recommendations.forEach(recommendation => {
            const li = document.createElement('li');
            li.textContent = recommendation;
            recommendationsList.appendChild(li);
        });

        // Display diet plan
        dietPlanList.innerHTML = '';
        data.dietPlan.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            dietPlanList.appendChild(li);
        });

        // Display workout plan
        workoutPlanList.innerHTML = '';
        data.workoutPlan.forEach(item => {
            const p = document.createElement('p');
            p.textContent = item;
            // Add special styling for workout day headers
            if (item.includes(':')) {
                p.classList.add('workout-day');
            } else if (item.startsWith('-') || item.startsWith('•')) {
                p.classList.add('workout-exercise');
            }
            workoutPlanList.appendChild(p);
        });

        // Display gym tips
        gymTipsList.innerHTML = '';
        data.gymTips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            gymTipsList.appendChild(li);
        });

        // Show results section
        resultsSection.style.display = 'block';
        
        // Smooth scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}); 