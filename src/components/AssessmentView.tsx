import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, HeartPulse, Scale, Activity, Flame, ShoppingBag, PlusCircle, CheckCircle, Apple, AlertCircle } from "lucide-react";
import { workoutPrograms, dietPlans, shopProducts } from "../data";
import { FitnessGoal, WorkoutProgram, DietPlan, ShopProduct, UserHealthStats } from "../types";

interface AssessmentViewProps {
  initialStats: UserHealthStats | null;
  onAddToCart: (p: ShopProduct) => void;
  onSelectProgram: (prog: WorkoutProgram) => void;
  onSelectDiet: (diet: DietPlan) => void;
}

export default function AssessmentView({ initialStats, onAddToCart, onSelectProgram, onSelectDiet }: AssessmentViewProps) {
  // Local state for health assessment
  const [stats, setStats] = useState<UserHealthStats>({
    gender: "male",
    age: 25,
    heightCm: 175,
    weightKg: 72,
    activityLevel: "moderate",
    fitnessGoal: FitnessGoal.LOSE_WEIGHT,
    targetWeightKg: 68
  });

  const [hasCalculated, setHasCalculated] = useState(false);
  const [report, setReport] = useState<{
    bmi: number;
    category: string;
    bmiColor: string;
    bmr: number;
    dailyCal: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    idealMin: number;
    idealMax: number;
    bodyFatEst: number;
  } | null>(null);

  // Suggested item recommendations
  const [recommendedWorkouts, setRecommendedWorkouts] = useState<WorkoutProgram[]>([]);
  const [recommendedDiets, setRecommendedDiets] = useState<DietPlan[]>([]);
  const [recommendedSupps, setRecommendedSupps] = useState<ShopProduct[]>([]);

  // Sync if home quick assessment initiated
  useEffect(() => {
    if (initialStats) {
      setStats(initialStats);
      calculateReport(initialStats);
    }
  }, [initialStats]);

  const calculateReport = (currentStats: UserHealthStats) => {
    const { heightCm, weightKg, age, gender, activityLevel, fitnessGoal } = currentStats;
    const hM = heightCm / 100;
    const bmiVal = parseFloat((weightKg / (hM * hM)).toFixed(1));

    // Category
    let cat = "";
    let bmiColorClasses = "";
    if (bmiVal < 18.5) {
      cat = "Underweight Range";
      bmiColorClasses = "text-amber-500 bg-amber-50 dark:bg-amber-950/25";
    } else if (bmiVal < 25) {
      cat = "Optimal Healthy Weight";
      bmiColorClasses = "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/25";
    } else if (bmiVal < 30) {
      cat = "Overweight Range";
      bmiColorClasses = "text-amber-500 bg-amber-50 dark:bg-amber-950/25";
    } else {
      cat = "Class I Obesity";
      bmiColorClasses = "text-rose-500 bg-rose-50 dark:bg-rose-950/25";
    }

    // BMR (Mifflin-St Jeor Equation)
    let bmrVal = 0;
    if (gender === "male") {
      bmrVal = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmrVal = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
    bmrVal = Math.round(bmrVal);

    // Activity multiplier
    let mult = 1.2;
    if (activityLevel === "light") mult = 1.375;
    if (activityLevel === "moderate") mult = 1.55;
    if (activityLevel === "active") mult = 1.725;
    if (activityLevel === "very_active") mult = 1.9;

    const tdee = bmrVal * mult;
    let targetCal = Math.round(tdee);

    // Goal adjust calories
    if (fitnessGoal === FitnessGoal.LOSE_WEIGHT) {
      targetCal = Math.round(tdee - 450); // deficit
    } else if (fitnessGoal === FitnessGoal.GAIN_WEIGHT || fitnessGoal === FitnessGoal.BUILD_MUSCLE) {
      targetCal = Math.round(tdee + 350); // surplus
    }

    // Macronutrient formulas based on physical activity goals
    let proteinMultiplier = 1.8; // grams per kg
    if (fitnessGoal === FitnessGoal.BUILD_MUSCLE) proteinMultiplier = 2.2;
    if (fitnessGoal === FitnessGoal.LOSE_WEIGHT) proteinMultiplier = 2.0;

    const proteinG = Math.round(weightKg * proteinMultiplier);
    const fatG = Math.round((targetCal * 0.25) / 9);
    const carbsG = Math.round((targetCal - (proteinG * 4 + fatG * 9)) / 4);

    // Ideal limits
    const idealMin = Math.round(18.5 * hM * hM);
    const idealMax = Math.round(24.9 * hM * hM);

    // Simple Navy bodyfat estimation wrapper
    let bodyFatEst = 14;
    if (gender === "male") {
      bodyFatEst = Math.round((86.01 * Math.log10(34) - 70.041 * Math.log10(heightCm) + 36.76) || 15);
    } else {
      bodyFatEst = Math.round((163.205 * Math.log10(34) - 97.684 * Math.log10(heightCm) - 78.387) || 24);
    }
    if (bodyFatEst < 4) bodyFatEst = 8;

    setReport({
      bmi: bmiVal,
      category: cat,
      bmiColor: bmiColorClasses,
      bmr: bmrVal,
      dailyCal: targetCal,
      proteinG,
      carbsG,
      fatG,
      idealMin,
      idealMax,
      bodyFatEst
    });

    // Auto calculate personalized recommendations catalog matchers!
    matchRecommendations(fitnessGoal, bmiVal);
    setHasCalculated(true);
  };

  const matchRecommendations = (goal: FitnessGoal, bmi: number) => {
    // 1. Match program with associated goal
    const matchedPrograms = workoutPrograms.filter(p => p.goal === goal);
    setRecommendedWorkouts(matchedPrograms.length > 0 ? matchedPrograms : workoutPrograms.slice(0, 2));

    // 2. Match diet plans
    let matchedDiets: DietPlan[] = [];
    if (goal === FitnessGoal.LOSE_WEIGHT) {
      matchedDiets = dietPlans.filter(d => d.category === "Weight Loss" || d.category === "Vegetarian" || d.category === "Keto");
    } else if (goal === FitnessGoal.BUILD_MUSCLE || goal === FitnessGoal.GAIN_WEIGHT) {
      matchedDiets = dietPlans.filter(d => d.category === "High Protein" || d.category === "Muscle Gain");
    } else {
      matchedDiets = [dietPlans[0]];
    }
    setRecommendedDiets(matchedDiets.length > 0 ? matchedDiets : [dietPlans[0]]);

    // 3. Match Store products based on goals
    let matchedProducts: ShopProduct[] = [];
    if (goal === FitnessGoal.LOSE_WEIGHT) {
      matchedProducts = shopProducts.filter(p => p.id === "prod_tracker" || p.id === "prod_bands");
    } else if (goal === FitnessGoal.BUILD_MUSCLE || goal === FitnessGoal.GAIN_WEIGHT) {
      matchedProducts = shopProducts.filter(p => p.id === "prod_dumbbells" || p.id === "prod_shaker");
    } else {
      matchedProducts = shopProducts.filter(p => p.id === "prod_yoga_mat" || p.id === "prod_bands");
    }
    setRecommendedSupps(matchedProducts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateReport(stats);
  };

  return (
    <div id="assessment_view_root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* HEADER ROW */}
      <div className="text-left max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-primary-green/15 to-emerald-500/10 text-primary-green-light rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <HeartPulse className="w-3.5 h-3.5 text-primary-green" />
          Clinical-Grade Metric Synthesis
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary-navy dark:text-white font-display">
          Advanced Health Analysis & Product Guide
        </h1>
        <p className="text-gray-500 dark:text-gray-300 text-sm mt-2 leading-relaxed">
          Provide your precise body metrics. Our algorithm will instantaneously synthesize your ideal weight categories, basal metabolic rate, macro targets, and unlock customized product suggestions instantly.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUT PANEL - 5 columns */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl shadow-md p-6 sm:p-8 text-left space-y-6">
          <h2 className="text-xl font-bold text-secondary-navy dark:text-white font-display flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary-green" />
            Vitals Input Terminal
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Assign Biological Sex</label>
              <div className="grid grid-cols-3 gap-2">
                {(["male", "female", "other"] as const).map((g) => (
                  <button
                    key={g}
                    id={`btn_form_gender_${g}`}
                    type="button"
                    onClick={() => setStats({ ...stats, gender: g })}
                    className={`py-2 text-xs font-semibold border rounded-xl capitalize transition-all ${
                      stats.gender === g
                        ? "bg-secondary-navy dark:bg-primary-green text-white dark:text-dark-bg border-transparent"
                        : "border-gray-200 text-gray-650 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Age & Height */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Age (Years)</label>
                <input
                  id="input_stat_age"
                  type="number"
                  min="13"
                  max="100"
                  required
                  value={stats.age}
                  onChange={(e) => setStats({ ...stats, age: parseInt(e.target.value) || 25 })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-primary-green text-gray-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Height (cm)</label>
                <input
                  id="input_stat_height"
                  type="number"
                  min="100"
                  max="250"
                  required
                  value={stats.heightCm}
                  onChange={(e) => setStats({ ...stats, heightCm: parseInt(e.target.value) || 170 })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-primary-green text-gray-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Current Weight & Target Weight */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Current Weight (kg)</label>
                <input
                  id="input_stat_weight"
                  type="number"
                  min="30"
                  max="220"
                  required
                  value={stats.weightKg}
                  onChange={(e) => setStats({ ...stats, weightKg: parseInt(e.target.value) || 70 })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-primary-green text-gray-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Target Weight (kg)</label>
                <input
                  id="input_stat_target_weight"
                  type="number"
                  min="30"
                  max="220"
                  required
                  value={stats.targetWeightKg}
                  onChange={(e) => setStats({ ...stats, targetWeightKg: parseInt(e.target.value) || 68 })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-primary-green text-gray-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Current Physical Activity</label>
              <select
                id="select_stat_activity"
                value={stats.activityLevel}
                onChange={(e) => setStats({ ...stats, activityLevel: e.target.value as any })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-primary-green text-gray-900 dark:text-white focus:outline-none"
              >
                <option value="sedentary">Sedentary (Office, minimal daily walks)</option>
                <option value="light">Lightly Active (Walking/sprinting 1-2x week)</option>
                <option value="moderate">Moderately Active (Vigorous sport 3-4x week)</option>
                <option value="active">Very Active (Resistance training 5-6x week)</option>
                <option value="very_active">Elite Athlete (Two sessions daily, heavy labor)</option>
              </select>
            </div>

            {/* Primary Exercise Goal */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Core Objective Setting</label>
              <select
                id="select_stat_goal"
                value={stats.fitnessGoal}
                onChange={(e) => setStats({ ...stats, fitnessGoal: e.target.value as FitnessGoal })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-primary-green text-gray-900 dark:text-white focus:outline-none"
              >
                {Object.values(FitnessGoal).map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <button
              id="btn_assessment_calculate"
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-primary-green to-primary-green-light text-secondary-navy font-black rounded-xl hover:opacity-95 shadow-md flex items-center justify-center gap-1.5 text-sm cursor-pointer"
            >
              Analyze Metrics & Output Plan
              <Sparkles className="w-4 h-4 text-secondary-navy" />
            </button>
          </form>
        </div>

        {/* RESULTS REPORT PANEL - 7 columns */}
        <div className="lg:col-span-7 text-left space-y-6">
          {hasCalculated && report ? (
            <div className="space-y-6 animate-fade-in">
              
              {/* PRIMARY DIAGNOSTICS CARD */}
              <div className="bg-gradient-to-br from-slate-900 to-secondary-navy text-white rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-lg border border-slate-800/80">
                <div className="absolute top-0 right-0 w-44 h-44 bg-primary-green/5 rounded-full blur-2xl -mr-20 -mt-20" />
                
                <h3 className="text-lg font-bold font-display tracking-wide text-primary-green-light flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary-green-light" />
                  Your Athletic Diagnostic report
                </h3>

                {/* Score row grids */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* BMI */}
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-left ">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase">BMI SCORE</span>
                    <p className="text-2xl font-extrabold text-white mt-1">{report.bmi}</p>
                    <span className="text-[9px] text-primary-green-light font-bold truncate block mt-0.5">{report.category}</span>
                  </div>

                  {/* Daily Calorie Needs */}
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-left">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase">CALORIC CAP</span>
                    <p className="text-2xl font-extrabold text-primary-green-light mt-1">{report.dailyCal}</p>
                    <span className="text-[9px] text-gray-400 block mt-0.5">kcal / daily target</span>
                  </div>

                  {/* BMR */}
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-left">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase">BMR LIMIT</span>
                    <p className="text-2xl font-extrabold text-white mt-1">{report.bmr}</p>
                    <span className="text-[9px] text-gray-400 block mt-0.5">resting base burn</span>
                  </div>

                  {/* Body Fat Estimation */}
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-left">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase">EST. BODY FAT</span>
                    <p className="text-2xl font-extrabold text-white mt-1">~{report.bodyFatEst}%</p>
                    <span className="text-[9px] text-gray-400 block mt-0.5">US Navy standard</span>
                  </div>
                </div>

                {/* Perfect Weight Scale Progress line */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                  <div className="flex justify-between text-xs text-gray-300 font-medium">
                    <span>Healthy ideal minimum: <span className="text-white font-bold">{report.idealMin}kg</span></span>
                    <span>Healthy ideal maximum: <span className="text-white font-bold">{report.idealMax}kg</span></span>
                  </div>
                  <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="absolute inset-y-0 bg-gradient-to-r from-teal-400 to-primary-green rounded-full"
                      style={{ 
                        width: `${Math.min(100, Math.max(10, ((stats.weightKg - report.idealMin) / (report.idealMax - report.idealMin)) * 100))}%` 
                      }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 text-center leading-tight">
                    Current input: <strong className="text-white">{stats.weightKg}kg</strong>. Keep dynamic metrics aligned using macro compliance.
                  </p>
                </div>

                {/* Macromolecules Pie block */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block">Daily Macronutrient Targets</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-teal-500/10 border border-teal-500/20 p-3.5 rounded-xl text-center">
                      <p className="text-xs text-teal-400 font-bold">PROTEIN</p>
                      <p className="text-xl font-extrabold text-white mt-1">{report.proteinG}g</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{report.proteinG * 4} kcal</p>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl text-center">
                      <p className="text-xs text-amber-400 font-bold">CARBS</p>
                      <p className="text-xl font-extrabold text-white mt-1">{report.carbsG}g</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{report.carbsG * 4} kcal</p>
                    </div>
                    <div className="bg-pink-500/10 border border-pink-500/20 p-3.5 rounded-xl text-center">
                      <p className="text-xs text-pink-400 font-bold">DIETARY FAT</p>
                      <p className="text-xl font-extrabold text-white mt-1">{report.fatG}g</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{report.fatG * 9} kcal</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* AUTOMATIC DOME RECOMMENDATIONS SECTIONS */}
              <div className="space-y-6">
                
                {/* 1. MATCHED WORKOUT */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-base text-secondary-navy dark:text-white font-display tracking-tight flex items-center gap-1.5">
                      <Flame className="text-red-500 w-5 h-5 animate-bounce" />
                      1. Recommended Workout Blueprint
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 bg-red-50 dark:bg-red-950/20 text-red-500 font-extrabold rounded-full uppercase">Goal Calibrated</span>
                  </div>

                  {recommendedWorkouts.map((prog) => (
                    <div 
                      key={prog.id}
                      className="bg-white dark:bg-slate-900 border border-emerald-500/20 hover:border-emerald-500 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="flex gap-4 items-center">
                        <img src={prog.image} alt={prog.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                        <div>
                          <h4 className="font-bold text-sm text-gray-900 dark:text-white">{prog.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-450 line-clamp-1">{prog.description}</p>
                          <div className="flex gap-3 text-[10px] text-gray-400 font-medium mt-1">
                            <span>Difficulty: <strong className="text-secondary-navy dark:text-gray-250">{prog.difficulty}</strong></span>
                            <span>•</span>
                            <span>Duration: <strong className="text-secondary-navy dark:text-gray-250">{prog.durationWeeks} Weeks</strong></span>
                          </div>
                        </div>
                      </div>

                      <button
                        id={`btn_rec_link_prog_${prog.id}`}
                        onClick={() => onSelectProgram(prog)}
                        className="px-4 py-2 bg-secondary-navy dark:bg-slate-800 hover:bg-opacity-95 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
                      >
                        Start Program
                      </button>
                    </div>
                  ))}
                </div>

                {/* 2. MATCHED DIET */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-base text-secondary-navy dark:text-white font-display tracking-tight flex items-center gap-1.5">
                      <Apple className="text-primary-green w-5 h-5" />
                      2. Recommended Nutritional Regimen
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 font-extrabold rounded-full uppercase">Macro Balanced</span>
                  </div>

                  {recommendedDiets.map((diet) => (
                    <div 
                      key={diet.id}
                      className="bg-white dark:bg-slate-900 border border-emerald-500/20 hover:border-emerald-500 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="flex gap-4 items-center">
                        <img src={diet.image} alt={diet.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                        <div>
                          <h4 className="font-bold text-sm text-gray-900 dark:text-white">{diet.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-450 line-clamp-1">{diet.goalDescription}</p>
                          <div className="flex gap-3 text-[10px] text-gray-400 font-medium mt-1">
                            <span>Calories: <strong className="text-primary-green font-bold">{diet.dailyCalories} kcal/day</strong></span>
                            <span>•</span>
                            <span>Protein: <strong className="text-secondary-navy dark:text-gray-250">{diet.proteinTotal}g</strong></span>
                          </div>
                        </div>
                      </div>

                      <button
                        id={`btn_rec_link_diet_${diet.id}`}
                        onClick={() => onSelectDiet(diet)}
                        className="px-4 py-2 bg-secondary-navy dark:bg-slate-800 hover:bg-opacity-95 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
                      >
                        Inspect Meal Blueprint
                      </button>
                    </div>
                  ))}
                </div>

                {/* 3. MATCHED PRODUCTS */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-base text-secondary-navy dark:text-white font-display tracking-tight flex items-center gap-1.5">
                      <ShoppingBag className="text-accent-orange w-5 h-5" />
                      3. E-Commerce Companion Gears & Hardware
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 bg-amber-50 dark:bg-amber-950/20 text-amber-600 font-extrabold rounded-full uppercase">BMI Suggested</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {recommendedSupps.map((prod) => (
                      <div 
                        key={prod.id}
                        className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-xl p-4.5 space-y-3 shadow-sm flex flex-col justify-between"
                      >
                        <div className="flex gap-3 items-start">
                          <img src={prod.image} alt={prod.name} className="w-14 h-14 rounded-lg object-cover shrink-0 border" />
                          <div className="space-y-0.5">
                            <h4 className="font-bold text-xs text-gray-900 dark:text-white line-clamp-2">{prod.name}</h4>
                            <p className="text-[11px] font-bold text-primary-green">₹{prod.price}</p>
                          </div>
                        </div>

                        <button
                          id={`btn_rec_add_cart_${prod.id}`}
                          onClick={() => {
                            onAddToCart(prod);
                            alert(`Added "${prod.name}" to cart! Visit upper Shop cart block to inspect checkout.`);
                          }}
                          className="w-full py-1.5 bg-gradient-to-r from-primary-green to-primary-green-light hover:opacity-90 text-secondary-navy font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          Add to Store Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="h-full min-h-[400px] bg-slate-50 dark:bg-slate-900/30 rounded-2xl border-2 border-dashed border-gray-250 dark:border-slate-800 flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-primary-green flex items-center justify-center border border-emerald-100">
                <Scale className="w-8 h-8 animate-pulse text-primary-green" />
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h3 className="font-extrabold text-lg text-secondary-navy dark:text-white font-display">Awaiting Calibration Metrics</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Enter your physical properties in the Vitals Panel on the left. The compiler will immediately design a calculated fitness path suited specifically for your targets.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
