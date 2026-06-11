import React, { useState } from "react";
import { Search, Star, Clock, Trophy, ChevronRight, Play, Dumbbell, Flame, CheckCircle, Sparkles } from "lucide-react";
import { workoutPrograms, dietPlans } from "../data";
import { WorkoutProgram, DietPlan, Exercise, FitnessGoal } from "../types";

interface CatalogViewProps {
  onSelectProgram: (prog: WorkoutProgram) => void;
  onSelectDiet: (diet: DietPlan) => void;
  tabOverride: "programs" | "diets";
  enrolledProgramIds?: string[];
}

export default function CatalogView({ onSelectProgram, onSelectDiet, tabOverride, enrolledProgramIds = [] }: CatalogViewProps) {
  const [subTab, setSubTab] = useState<"workouts" | "diets">(tabOverride === "diets" ? "diets" : "workouts");

  // Search and filter states (Workouts)
  const [workoutSearch, setWorkoutSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [goalFilter, setGoalFilter] = useState("all");

  // Search and filter states (Diets)
  const [dietSearch, setDietSearch] = useState("");
  const [dietCategoryFilter, setDietCategoryFilter] = useState("all");

  const normalizedWorkoutGoal = (val: string) => {
    if (val === "all") return true;
    return val;
  };

  const filteredWorkouts = workoutPrograms.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(workoutSearch.toLowerCase()) || 
                          p.coach.toLowerCase().includes(workoutSearch.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || p.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    const matchesGoal = goalFilter === "all" || p.goal.toLowerCase() === goalFilter.toLowerCase();
    return matchesSearch && matchesDifficulty && matchesGoal;
  });

  const filteredDiets = dietPlans.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(dietSearch.toLowerCase()) || 
                          d.category.toLowerCase().includes(dietSearch.toLowerCase());
    const matchesCategory = dietCategoryFilter === "all" || d.category.toLowerCase() === dietCategoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div id="catalog_view_root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-left">
      
      {/* PERSISTENT SUB-TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-secondary-navy dark:text-white font-display">
            Science-Backed Regimen Library
          </h1>
          <p className="text-gray-500 text-xs mt-1">
            Carefully structured regimens led by credentialed performance scientists and clinical dietitians.
          </p>
        </div>

        <div className="flex bg-gray-105 dark:bg-slate-900 border rounded-xl p-1 shrink-0 self-start sm:self-auto">
          <button
            id="btn_tab_workouts"
            onClick={() => setSubTab("workouts")}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              subTab === "workouts"
                ? "bg-secondary-navy dark:bg-primary-green text-white dark:text-dark-bg font-extrabold shadow"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
            }`}
          >
            🏋️ Workout Blueprints
          </button>
          <button
            id="btn_tab_diets"
            onClick={() => setSubTab("diets")}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              subTab === "diets"
                ? "bg-secondary-navy dark:bg-primary-green text-white dark:text-dark-bg font-extrabold shadow"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
            }`}
          >
            🥗 Macro Meal Plans
          </button>
        </div>
      </div>

      {/* WORKOUTS SECTION */}
      {subTab === "workouts" ? (
        <div className="space-y-6">
          {/* Filters Row */}
          <div className="grid sm:grid-cols-4 gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-150 dark:border-slate-800 shadow-sm">
            {/* Search */}
            <div className="relative sm:col-span-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                id="input_search_workouts"
                type="text"
                placeholder="Search workout by name or coach..."
                value={workoutSearch}
                onChange={(e) => setWorkoutSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
            </div>

            {/* Difficulty Filter */}
            <div>
              <select
                id="select_filter_difficulty"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-950 dark:text-white font-semibold focus:outline-none"
              >
                <option value="all">Levels: All Difficulties</option>
                <option value="beginner">Beginner (Slow Form)</option>
                <option value="intermediate">Intermediate (Power Lift)</option>
                <option value="advanced">Advanced (High Volume)</option>
              </select>
            </div>

            {/* Goal Filter */}
            <div>
              <select
                id="select_filter_goal"
                value={goalFilter}
                onChange={(e) => setGoalFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-950 dark:text-white font-semibold focus:outline-none"
              >
                <option value="all">Goals: All Pathways</option>
                <option value="Lose Weight">Lose Weight Range</option>
                <option value="Gain Weight">Gain Weight Range</option>
                <option value="Build Muscle">Build Muscle</option>
                <option value="Improve Endurance">Endurance</option>
                <option value="Home Fitness">Home Workout</option>
                <option value="Yoga & Flexibility">Yoga & Flexibility</option>
              </select>
            </div>
          </div>

          {/* Grid list */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.length > 0 ? (
              filteredWorkouts.map((prog) => {
                const isEnrolled = enrolledProgramIds.includes(prog.id);
                return (
                  <div
                    key={prog.id}
                    className={`bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between border ${
                      isEnrolled 
                        ? "border-primary-green dark:border-primary-green font-medium" 
                        : "border-gray-150 dark:border-slate-800"
                    }`}
                  >
                    <div>
                      <div className="relative aspect-video bg-gray-200">
                        <img src={prog.image} alt={prog.name} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-secondary-navy text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded">
                          {prog.difficulty}
                        </span>
                        {isEnrolled && (
                          <span className="absolute top-3 right-3 bg-primary-green/90 text-secondary-navy text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest animate-pulse">
                            Active Plan
                          </span>
                        )}
                        <span className="absolute bottom-3 right-3 bg-gradient-to-r from-primary-green to-primary-green-light text-secondary-navy font-bold text-xs px-2.5 py-1 rounded shadow">
                          ₹{prog.price}
                        </span>
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-primary-green" />
                            {prog.durationWeeks} weeks
                          </span>
                          <span className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            {prog.rating} Verified
                          </span>
                        </div>

                        <h3 className="font-extrabold text-gray-900 dark:text-white font-display text-sm leading-snug">
                          {prog.name}
                        </h3>

                        <p className="text-gray-500 dark:text-gray-350 text-xs line-clamp-2 leading-relaxed">
                          {prog.description}
                        </p>

                        <div className="pt-3 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center text-[10px] text-gray-400 font-medium">
                          <span>Coach: <strong className="text-gray-700 dark:text-gray-300 font-semibold">{prog.coach}</strong></span>
                          <span className="text-emerald-500 font-bold">~{prog.totalCaloriesBurned} kcal/hr</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      {isEnrolled ? (
                        <button
                          id={`btn_inspect_program_${prog.id}`}
                          onClick={() => onSelectProgram(prog)}
                          className="w-full py-2.5 bg-primary-green/10 text-primary-green hover:bg-primary-green/20 font-bold text-xs rounded-xl text-center border border-primary-green/30 cursor-pointer transition-all"
                        >
                          ✓ Active Plan - Open Schedule
                        </button>
                      ) : (
                        <button
                          id={`btn_inspect_program_${prog.id}`}
                          onClick={() => onSelectProgram(prog)}
                          className="w-full py-2.5 bg-secondary-navy hover:bg-slate-800 text-white font-bold text-xs rounded-xl text-center cursor-pointer transition-all"
                        >
                          Start Program / View schedule
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="sm:col-span-3 text-center py-16 text-gray-400">
                <p className="text-sm">No workout blueprints matched your criteria.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* DIETS SECTION */
        <div className="space-y-6">
          {/* Filters Row */}
          <div className="grid sm:grid-cols-3 gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-150 dark:border-slate-800 shadow-sm">
            {/* Search */}
            <div className="relative sm:col-span-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                id="input_search_diets"
                type="text"
                placeholder="Search diet by name or category..."
                value={dietSearch}
                onChange={(e) => setDietSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                id="select_filter_diet_category"
                value={dietCategoryFilter}
                onChange={(e) => setDietCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-950 dark:text-white font-semibold focus:outline-none animate-fade-in"
              >
                <option value="all">All Dietary Classes</option>
                <option value="weight loss">Weight Loss Diet</option>
                <option value="muscle gain">Muscle Gain Diet</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan Athlete</option>
                <option value="keto">Ketogenic Low-Carb</option>
                <option value="high protein">Anabolic High Protein</option>
              </select>
            </div>
          </div>

          {/* Grid List */}
          <div className="grid sm:grid-cols-2 gap-6">
            {filteredDiets.length > 0 ? (
              filteredDiets.map((diet) => (
                <div
                  key={diet.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-150 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="grid sm:grid-cols-5 items-stretch h-full">
                    {/* Image thumb */}
                    <div className="sm:col-span-2 relative min-h-[140px] bg-slate-100">
                      <img src={diet.image} alt={diet.name} className="absolute inset-0 w-full h-full object-cover" />
                      <span className="absolute top-2.5 left-2.5 bg-primary-green text-secondary-navy text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                        {diet.category}
                      </span>
                    </div>

                    {/* Content Detail */}
                    <div className="sm:col-span-3 p-5 flex flex-col justify-between text-left space-y-3">
                      <div className="space-y-1">
                        <h3 className="font-extrabold text-sm text-gray-900 dark:text-white font-display line-clamp-1">
                          {diet.name}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-350 text-xs line-clamp-2 leading-relaxed">
                          {diet.goalDescription}
                        </p>
                      </div>

                      {/* Macros block layout */}
                      <div className="grid grid-cols-4 gap-1.5 p-2 bg-slate-50 dark:bg-slate-850 rounded-xl text-center border dark:border-slate-800">
                        <div>
                          <p className="text-[8px] font-bold text-gray-400">ENERGY</p>
                          <p className="text-xs font-semibold text-primary-green">{diet.dailyCalories}</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-bold text-gray-400">PRO</p>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white">{diet.proteinTotal}g</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-bold text-gray-400">CARB</p>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white">{diet.carbsTotal}g</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-bold text-gray-400">FAT</p>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white">{diet.fatTotal}g</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center">
                        <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-current" />
                          {diet.rating}
                        </span>
                        
                        <button
                          id={`btn_inspect_diet_plan_${diet.id}`}
                          onClick={() => onSelectDiet(diet)}
                          className="px-3.5 py-1.5 bg-secondary-navy dark:bg-slate-800 text-white font-bold text-[10px] rounded-lg cursor-pointer hover:opacity-90 transition-colors"
                        >
                          View Meals ({diet.meals.length})
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="sm:col-span-2 text-center py-16 text-gray-400">
                <p className="text-sm">No diet blueprints matched your criteria.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
