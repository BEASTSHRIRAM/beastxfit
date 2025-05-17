let selectedGender = null;
let selectedGoal = null;

document.querySelectorAll("#genderBtns .goal-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedGender = btn.dataset.gender;
    document.querySelectorAll("#genderBtns .goal-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

document.querySelectorAll("#goalBtns .goal-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedGoal = btn.dataset.goal;
    document.querySelectorAll("#goalBtns .goal-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

document.getElementById("calcForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);

  if (!selectedGender || !selectedGoal) {
    alert("Please select gender and fitness goal.");
    return;
  }

  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  document.getElementById("bmiValue").textContent = bmi.toFixed(1);

  let category = "";
  let markerLeft = 0;
  if (bmi < 18.5) {
    category = "Underweight";
    markerLeft = 10;
  } else if (bmi < 24.9) {
    category = "Normal";
    markerLeft = 50;
  } else if (bmi < 29.9) {
    category = "Overweight";
    markerLeft = 75;
  } else {
    category = "Obese";
    markerLeft = 90;
  }

  document.getElementById("bmiCategory").textContent = category;
  document.getElementById("bmiMarker").style.left = `${markerLeft}%`;

  // BMR calculation using Mifflin-St Jeor Equation
  let bmr;
  if (selectedGender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Adjust for activity level (lightly active)
  let calories = bmr * 1.4;

  // Adjust based on goal
  if (selectedGoal === "lose") {
    calories -= 400;
  } else if (selectedGoal === "gain") {
    calories += 400;
  }

  document.getElementById("calorieValue").textContent = Math.round(calories);

  const tipsList = document.getElementById("tipsList");
  tipsList.innerHTML = "";
  const tips = {
    lose: ["Eat high-protein meals", "Avoid sugary drinks", "Do cardio regularly"],
    maintain: ["Eat balanced meals", "Stay hydrated", "Exercise 3-5 times/week"],
    gain: ["Eat more calories than you burn", "Lift heavy weights", "Eat every 3-4 hours"]
  };
  tips[selectedGoal].forEach(tip => {
    const li = document.createElement("li");
    li.textContent = tip;
    tipsList.appendChild(li);
  });

  document.getElementById("resultsSection").classList.remove("hidden");
});
