package com.beastxfit.service;

import org.springframework.stereotype.Service;
import com.beastxfit.model.User;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;

@Service
public class FitnessService {

    public double calculateBMI(User user) {
        double heightInMeters = user.getHeight() / 100;
        double bmi = user.getWeight() / (heightInMeters * heightInMeters);
        return Math.round(bmi * 100.0) / 100.0;
    }

    public Map<String, Object> getFitnessReport(User user) {
        Map<String, Object> report = new HashMap<>();
        double bmi = calculateBMI(user);
        user.setBmi(bmi);
        
        String category;
        List<String> recommendations = new ArrayList<>();
        List<String> gymTips = new ArrayList<>();
        List<String> dietPlan = new ArrayList<>();
        List<String> workoutPlan = new ArrayList<>();

        // Calculate daily calorie needs (Basic BMR using Harris-Benedict equation)
        double bmr;
        if (user.getGender().equalsIgnoreCase("male")) {
            bmr = 88.362 + (13.397 * user.getWeight()) + (4.799 * user.getHeight()) - (5.677 * user.getAge());
        } else {
            bmr = 447.593 + (9.247 * user.getWeight()) + (3.098 * user.getHeight()) - (4.330 * user.getAge());
        }
        
        // Multiply BMR by activity factor (assuming moderate activity)
        double maintenanceCalories = bmr * 1.55;

        // Determine BMI category and provide specific recommendations
        if (bmi < 18.5) {
            category = "Underweight";
            recommendations.addAll(getWeightGainTips());
            gymTips.addAll(getMuscleGainGymTips());
            dietPlan.addAll(getCalorieSurplusDiet(maintenanceCalories));
            workoutPlan.addAll(getMuscleGainWorkout());
        } else if (bmi >= 18.5 && bmi < 25) {
            category = "Normal weight";
            recommendations.addAll(getMaintainWeightTips());
            gymTips.addAll(getGeneralFitnessTips());
            dietPlan.addAll(getMaintenanceDiet(maintenanceCalories));
            workoutPlan.addAll(getBroSplitWorkout());
        } else {
            category = bmi < 30 ? "Overweight" : "Obese";
            recommendations.addAll(getWeightLossTips());
            gymTips.addAll(getFatLossGymTips());
            dietPlan.addAll(getCalorieDeficitDiet(maintenanceCalories));
            workoutPlan.addAll(getFatLossWorkout());
        }

        report.put("bmi", bmi);
        report.put("category", category);
        report.put("recommendations", recommendations);
        report.put("gymTips", gymTips);
        report.put("dietPlan", dietPlan);
        report.put("workoutPlan", workoutPlan);
        report.put("maintenanceCalories", Math.round(maintenanceCalories));

        return report;
    }

    private List<String> getCalorieSurplusDiet(double maintenanceCalories) {
        double surplusCalories = maintenanceCalories + 500;
        List<String> diet = new ArrayList<>();
        diet.add(String.format("Target Daily Calories: %.0f calories (500 calorie surplus)", surplusCalories));
        diet.add("Meal 1 (Breakfast): Oatmeal with banana, protein shake, and peanut butter");
        diet.add("Snack 1: Greek yogurt with granola and honey");
        diet.add("Meal 2 (Lunch): Chicken breast with brown rice and avocado");
        diet.add("Snack 2: Mixed nuts and dried fruits");
        diet.add("Meal 3 (Dinner): Salmon with sweet potato and olive oil");
        diet.add("Pre-bed: Casein protein shake or cottage cheese");
        diet.add("Protein: 2g per kg of body weight");
        diet.add("Carbs: 55-60% of total calories");
        diet.add("Fats: 25-30% of total calories");
        return diet;
    }

    private List<String> getCalorieDeficitDiet(double maintenanceCalories) {
        double deficitCalories = maintenanceCalories - 500;
        List<String> diet = new ArrayList<>();
        diet.add(String.format("Target Daily Calories: %.0f calories (500 calorie deficit)", deficitCalories));
        diet.add("Meal 1 (Breakfast): Egg whites with spinach and whole grain toast");
        diet.add("Snack 1: Apple with protein shake");
        diet.add("Meal 2 (Lunch): Grilled chicken salad with light dressing");
        diet.add("Snack 2: Carrot sticks with hummus");
        diet.add("Meal 3 (Dinner): Lean fish with steamed vegetables");
        diet.add("Evening: Green tea or herbal tea");
        diet.add("Protein: 2.2g per kg of body weight");
        diet.add("Carbs: 40-45% of total calories");
        diet.add("Fats: 20-25% of total calories");
        return diet;
    }

    private List<String> getMaintenanceDiet(double maintenanceCalories) {
        List<String> diet = new ArrayList<>();
        diet.add(String.format("Target Daily Calories: %.0f calories (maintenance)", maintenanceCalories));
        diet.add("Meal 1 (Breakfast): Whole eggs with whole grain toast and fruits");
        diet.add("Snack 1: Protein smoothie with mixed berries");
        diet.add("Meal 2 (Lunch): Turkey sandwich with avocado");
        diet.add("Snack 2: Greek yogurt with nuts");
        diet.add("Meal 3 (Dinner): Lean meat with quinoa and vegetables");
        diet.add("Protein: 1.8g per kg of body weight");
        diet.add("Carbs: 45-55% of total calories");
        diet.add("Fats: 25-30% of total calories");
        return diet;
    }

    private List<String> getBroSplitWorkout() {
        List<String> workout = new ArrayList<>();
        workout.add("Monday - Chest:");
        workout.add("- Bench Press: 4 sets of 8-12 reps");
        workout.add("- Incline Dumbbell Press: 3 sets of 10-12 reps");
        workout.add("- Cable Flyes: 3 sets of 12-15 reps");
        workout.add("\nTuesday - Back:");
        workout.add("- Deadlifts: 4 sets of 6-8 reps");
        workout.add("- Pull-ups: 3 sets to failure");
        workout.add("- Barbell Rows: 3 sets of 10-12 reps");
        workout.add("\nWednesday - Shoulders:");
        workout.add("- Military Press: 4 sets of 8-12 reps");
        workout.add("- Lateral Raises: 3 sets of 12-15 reps");
        workout.add("- Face Pulls: 3 sets of 15-20 reps");
        workout.add("\nThursday - Arms:");
        workout.add("- Barbell Curls: 4 sets of 10-12 reps");
        workout.add("- Skull Crushers: 4 sets of 10-12 reps");
        workout.add("- Hammer Curls: 3 sets of 12-15 reps");
        workout.add("\nFriday - Legs:");
        workout.add("- Squats: 4 sets of 8-12 reps");
        workout.add("- Romanian Deadlifts: 3 sets of 10-12 reps");
        workout.add("- Leg Press: 3 sets of 12-15 reps");
        return workout;
    }

    private List<String> getMuscleGainWorkout() {
        List<String> workout = new ArrayList<>();
        workout.add("Full Body Workout A (Monday/Thursday):");
        workout.add("- Squats: 5 sets of 5 reps");
        workout.add("- Bench Press: 5 sets of 5 reps");
        workout.add("- Barbell Rows: 5 sets of 5 reps");
        workout.add("- Dips: 3 sets to failure");
        workout.add("\nFull Body Workout B (Tuesday/Friday):");
        workout.add("- Deadlifts: 5 sets of 5 reps");
        workout.add("- Military Press: 5 sets of 5 reps");
        workout.add("- Pull-ups: 3 sets to failure");
        workout.add("- Lunges: 3 sets of 12 reps per leg");
        workout.add("\nNotes:");
        workout.add("- Focus on progressive overload");
        workout.add("- Rest 2-3 minutes between sets");
        workout.add("- Eat in a caloric surplus");
        return workout;
    }

    private List<String> getFatLossWorkout() {
        List<String> workout = new ArrayList<>();
        workout.add("Circuit Training (3 rounds, 40 seconds work, 20 seconds rest):");
        workout.add("1. Burpees");
        workout.add("2. Mountain Climbers");
        workout.add("3. Jump Squats");
        workout.add("4. Push-ups");
        workout.add("5. High Knees");
        workout.add("\nHIIT Cardio (4 sets):");
        workout.add("- 30 seconds sprint");
        workout.add("- 30 seconds walk");
        workout.add("\nStrength Training:");
        workout.add("- Compound movements with moderate weights");
        workout.add("- Higher reps (15-20) with shorter rest periods");
        workout.add("\nSchedule:");
        workout.add("- Monday/Wednesday/Friday: Circuit Training + Strength");
        workout.add("- Tuesday/Thursday: HIIT Cardio");
        workout.add("- Weekend: Active recovery (walking, swimming)");
        return workout;
    }

    private List<String> getWeightGainTips() {
        List<String> tips = new ArrayList<>();
        tips.add("Increase your caloric intake by 300-500 calories per day");
        tips.add("Eat protein-rich foods with every meal");
        tips.add("Include healthy fats in your diet (nuts, avocados, olive oil)");
        tips.add("Consume complex carbohydrates for energy");
        tips.add("Eat frequent meals throughout the day");
        return tips;
    }

    private List<String> getWeightLossTips() {
        List<String> tips = new ArrayList<>();
        tips.add("Create a caloric deficit of 500 calories per day");
        tips.add("Increase protein intake to preserve muscle mass");
        tips.add("Eat more fiber-rich foods to feel fuller");
        tips.add("Drink plenty of water before meals");
        tips.add("Avoid processed foods and sugary drinks");
        return tips;
    }

    private List<String> getMaintainWeightTips() {
        List<String> tips = new ArrayList<>();
        tips.add("Maintain a balanced diet with proper portions");
        tips.add("Stay hydrated throughout the day");
        tips.add("Eat a variety of nutrient-rich foods");
        tips.add("Monitor your weight regularly");
        tips.add("Practice mindful eating");
        return tips;
    }

    private List<String> getMuscleGainGymTips() {
        List<String> tips = new ArrayList<>();
        tips.add("Focus on compound exercises (squats, deadlifts, bench press)");
        tips.add("Gradually increase weights in your exercises");
        tips.add("Aim for 8-12 reps per set for muscle growth");
        tips.add("Rest 1-2 minutes between sets");
        tips.add("Get adequate rest between workouts (48 hours for muscle groups)");
        return tips;
    }

    private List<String> getFatLossGymTips() {
        List<String> tips = new ArrayList<>();
        tips.add("Combine strength training with cardio");
        tips.add("Perform high-intensity interval training (HIIT)");
        tips.add("Include circuit training in your routine");
        tips.add("Keep rest periods short between exercises");
        tips.add("Focus on full-body workouts");
        return tips;
    }

    private List<String> getGeneralFitnessTips() {
        List<String> tips = new ArrayList<>();
        tips.add("Mix cardio and strength training");
        tips.add("Stay consistent with your workout routine");
        tips.add("Focus on proper form in exercises");
        tips.add("Get 7-8 hours of sleep per night");
        tips.add("Stay motivated by setting achievable goals");
        return tips;
    }
}