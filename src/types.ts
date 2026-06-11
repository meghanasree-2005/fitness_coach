/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum FitnessGoal {
  LOSE_WEIGHT = "Lose Weight",
  GAIN_WEIGHT = "Gain Weight",
  BUILD_MUSCLE = "Build Muscle",
  IMPROVE_ENDURANCE = "Improve Endurance",
  HOME_FITNESS = "Home Fitness",
  YOGA_FLEXIBILITY = "Yoga & Flexibility"
}

export enum DifficultyLevel {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced"
}

export interface Exercise {
  id: string;
  name: string;
  reps: string;
  sets: number;
  durationSeconds: number;
  description: string;
  image: string;
}

export interface WorkoutProgram {
  id: string;
  name: string;
  durationWeeks: number;
  difficulty: DifficultyLevel;
  rating: number;
  price: number;
  goal: FitnessGoal;
  description: string;
  image: string;
  coach: string;
  coachingBio: string;
  totalCaloriesBurned: number;
  exercises: Exercise[];
  schedule: string[]; // e.g. ["Day 1: Upper Chest", "Day 2: Cardio Spark", ...]
}

export interface Meal {
  id: string;
  name: string;
  type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  ingredients: string[];
  recipeInstructions: string[];
}

export interface DietPlan {
  id: string;
  name: string;
  category: "Weight Loss" | "Muscle Gain" | "Vegetarian" | "Vegan" | "Keto" | "High Protein";
  goalDescription: string;
  dailyCalories: number;
  proteinTotal: number;
  carbsTotal: number;
  fatTotal: number;
  meals: Meal[];
  image: string;
  rating: number;
  price: number;
}

export interface UserHealthStats {
  age: number;
  gender: "male" | "female" | "other";
  heightCm: number;
  weightKg: number;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active";
  fitnessGoal: FitnessGoal;
  targetWeightKg: number;
}

export interface HealthAssessmentResult {
  bmi: number;
  bmiCategory: string;
  bmr: number;
  dailyCalorieNeeds: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  idealWeightRange: string;
  bodyFatEstimate: number;
}

export interface ShopProduct {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  category: "Hardware" | "Wearables" | "Accessories" | "Beverages";
  reviewsCount: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: "Fitness Tips" | "Nutrition" | "Weight Loss" | "Muscle Building" | "Mental Wellness" | "Lifestyle";
  readTime: string;
  author: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
}

export interface FitnessLog {
  date: string; // YYYY-MM-DD
  weightKg: number;
  workoutsCompleted: number;
  caloriesBurned: number;
  waterIntakeCups: number;
}
