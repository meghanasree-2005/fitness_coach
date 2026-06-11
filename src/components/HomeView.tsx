import React, { useState, useEffect } from "react";
import { Dumbbell, Target, Award, Star, Flame, Calendar, Sparkles, Compass, CheckCircle2, Trophy, Clock, ArrowRight, ArrowDown, X } from "lucide-react";
import { workoutPrograms, transformationStories, certifiedCoaches } from "../data";
import { FitnessGoal, WorkoutProgram } from "../types";

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onSelectProgram: (prog: WorkoutProgram) => void;
  onAssessQuick: (gender: "male" | "female" | "other", age: number, heightCm: number, weightKg: number) => void;
  enrolledProgramIds?: string[];
}

export default function HomeView({ onNavigate, onSelectProgram, onAssessQuick, enrolledProgramIds = [] }: HomeViewProps) {
  // Quick calculator variables
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [age, setAge] = useState<number>(26);
  const [height, setHeight] = useState<number>(178);
  const [weight, setWeight] = useState<number>(75);
  const [calcResult, setCalcResult] = useState<{ bmi: number; category: string; rec: string } | null>(null);

  // Limited time offer countdown
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 48, seconds: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const heightInM = height / 100;
    const bmiVal = parseFloat((weight / (heightInM * heightInM)).toFixed(1));
    let cat = "";
    let recommendation = "";

    if (bmiVal < 18.5) {
      cat = "Underweight Range";
      recommendation = "Focus on muscle synthesis + healthy dietary surplus. I recommend our Alpha Anabolic Gain Plan & Heavy Lifting schedule.";
    } else if (bmiVal < 25) {
      cat = "Normal Healthy Range";
      recommendation = "Outstanding base balance. Focus on athletic body recomposition, muscular conditioning, and heart rate longevity.";
    } else if (bmiVal < 30) {
      cat = "Overweight Range";
      recommendation = "Target lean calorie deficits, protein defense preservation, and structured Zone 2 cardio interval workouts.";
    } else {
      cat = "Obese Range";
      recommendation = "Prioritize functional metabolic circuits, systematic joint protection, and dietary calorie balancing strategies.";
    }

    setCalcResult({
      bmi: bmiVal,
      category: cat,
      rec: recommendation
    });
  };

  const handleProceedToDeepAudit = () => {
    // Pass stats to parent to save & auto navigate
    onAssessQuick(gender, age, height, weight);
    onNavigate("assessment");
  };

  return (
    <div id="home_view_container" className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-navy to-slate-950 -z-10" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#9333EA_1px,transparent_1px)] [background-size:24px_24px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-green/15 text-primary-green-light rounded-full text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Empowered with Gemini Personalization
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display leading-[1.1] tracking-tight">
              Transform Your Body with <span className="bg-gradient-to-r from-primary-green to-primary-green-light text-transparent bg-clip-text">Premium Dynamic</span> Coaching
            </h1>
            
            <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
              Unlock professional grade workout routines, targeted meal mapping, and scientific health assessments. Customized directly to your unique body mass index.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                id="btn_hero_get_started"
                onClick={() => onNavigate("assessment")}
                className="px-8 py-4 bg-gradient-to-r from-primary-green to-primary-green-light text-secondary-navy font-bold rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                Go to Assessment Page
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="#quick_bmi_calculator_anchor"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/15 transition-all text-center flex items-center gap-2"
              >
                Quick BMI Calculate
                <ArrowDown className="w-4 h-4 text-primary-green" />
              </a>
            </div>

            {/* Quick Metrics stats cards */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <p className="text-3xl font-extrabold text-white font-display">12k+</p>
                <p className="text-xs text-gray-400 mt-1">Transformed Athletes</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-primary-green-light font-display">4.9★</p>
                <p className="text-xs text-gray-400 mt-1">Certified Coach Reviews</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white font-display">100%</p>
                <p className="text-xs text-gray-400 mt-1">Anabolic Science Plans</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-green to-accent-orange opacity-20 blur-xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&auto=format&fit=crop&q=80"
                alt="Elite Athlete Trainer Profile"
                className="w-full object-cover aspect-[4/5] object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-6 text-left">
                <div className="flex gap-1 text-primary-green">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-white font-bold text-lg mt-1">&quot;The most organized training I&apos;ve done.&quot;</p>
                <p className="text-gray-300 text-xs mt-0.5">Alex Rivera, Muscle Recomp Champion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC BMI QUICK ASSESSMENT PREVIEW */}
      <section id="quick_bmi_calculator_anchor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
          <div className="grid lg:grid-cols-12">
            
            {/* Form side */}
            <div className="lg:col-span-7 p-8 sm:p-12 text-left space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest text-primary-green uppercase">Instant Diagnostics</span>
                <h2 className="text-3xl font-extrabold text-secondary-navy dark:text-white font-display">
                  Calculate Personal BMI Instantly
                </h2>
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                  Determine your Body Mass Index (BMI). We will immediately configure your ideal training structure, caloric demands and suggested fitness gears.
                </p>
              </div>

              <form onSubmit={handleQuickCalculate} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Gender Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Your Gender</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["male", "female", "other"] as const).map((g) => (
                        <button
                          key={g}
                          id={`btn_quick_gender_${g}`}
                          type="button"
                          onClick={() => setGender(g)}
                          className={`py-2 text-xs font-semibold border rounded-lg capitalize transition-all ${
                            gender === g
                              ? "bg-secondary-navy dark:bg-primary-green text-white dark:text-dark-bg border-transparent"
                              : "border-gray-200 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Age (Years)</label>
                    <input
                      id="input_quick_age"
                      type="number"
                      min="10"
                      max="100"
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value) || 20)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-green text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Height */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase mb-1.5">
                      <span>Height</span>
                      <span className="text-gray-700 dark:text-gray-200 font-bold">{height} cm</span>
                    </div>
                    <input
                      id="input_quick_height"
                      type="range"
                      min="120"
                      max="220"
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value))}
                      className="w-full accent-primary-green"
                    />
                  </div>

                  {/* Weight */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase mb-1.5">
                      <span>Weight</span>
                      <span className="text-gray-700 dark:text-gray-200 font-bold">{weight} kg</span>
                    </div>
                    <input
                      id="input_quick_weight"
                      type="range"
                      min="35"
                      max="160"
                      value={weight}
                      onChange={(e) => setWeight(parseInt(e.target.value))}
                      className="w-full accent-primary-green"
                    />
                  </div>
                </div>

                <button
                  id="btn_quick_calc_submit"
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-primary-green to-primary-green-light text-secondary-navy font-bold rounded-xl hover:opacity-95 text-center cursor-pointer shadow-md text-sm tracking-wide"
                >
                  Analyze My Score & Recommendations
                </button>
              </form>
            </div>

            {/* Results side */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-secondary-navy p-8 sm:p-12 text-white flex flex-col justify-between text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/10 rounded-full blur-2xl -mr-16 -mt-16" />
              
              <div className="space-y-6 relative">
                <span className="py-1 px-3 bg-white/10 rounded-full text-xs font-bold text-primary-green-light tracking-wider uppercase inline-block">
                  AI Assessment Insights
                </span>

                {calcResult ? (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <p className="text-gray-400 text-xs uppercase font-semibold">Your Calculated BMI</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-5xl font-extrabold text-primary-green-light font-display">{calcResult.bmi}</span>
                        <span className="text-sm font-semibold text-gray-300">kg/m²</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">Diagnosis Status</p>
                      <p className="text-base font-bold text-white">{calcResult.category}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">Suggested Strategy</p>
                      <p className="text-xs text-gray-200 leading-relaxed italic">{calcResult.rec}</p>
                    </div>

                    <button
                      id="btn_proceed_to_full_assessment"
                      onClick={handleProceedToDeepAudit}
                      className="inline-flex items-center gap-2 text-xs font-bold text-primary-green-light hover:text-white transition-colors duration-200 group pt-2 cursor-pointer"
                    >
                      Receive Full Diet & Caloric Budget Plan
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 py-8 text-center text-gray-400 border border-dashed border-white/15 rounded-2xl">
                    <Compass className="w-10 h-10 mx-auto text-primary-green opacity-70 animate-spin [animation-duration:8s]" />
                    <p className="text-sm px-4">
                      Drag the sliders on the left and tap &quot;Analyze Score&quot; to unpack your calculated metabolic needs immediately.
                    </p>
                  </div>
                )}
              </div>

              {/* Trust Tagline */}
              <div className="pt-6 border-t border-white/10 mt-6 flex items-center gap-3">
                <Award className="w-5 h-5 text-primary-green-light" />
                <p className="text-[11px] text-gray-300 leading-tight">
                  Formula values approved by NIH and standard WHO dietary protocols of calorie expenditure.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. POPULAR FITNESS GOALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div>
            <span className="text-xs font-bold tracking-widest text-primary-green uppercase">Training Pathways</span>
            <h2 className="text-3xl font-extrabold text-secondary-navy dark:text-white font-display mt-1">
              Select Your Core Health Objective
            </h2>
          </div>
          <button
            id="btn_browse_all_pathways"
            onClick={() => onNavigate("programs")}
            className="text-sm font-semibold text-primary-green hover:text-primary-green-light transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            Show Full Program Catalog
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(FitnessGoal).map((g, index) => {
            let desc = "";
            let image = "";
            switch (g) {
              case FitnessGoal.LOSE_WEIGHT:
                desc = "Strip fat stores safely while building an active, lean heart engine.";
                image = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80";
                break;
              case FitnessGoal.GAIN_WEIGHT:
                desc = "Pack clean structural mass through specific tempo lifts & caloric advice.";
                image = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&auto=format&fit=crop&q=80";
                break;
              case FitnessGoal.BUILD_MUSCLE:
                desc = "Specific hypertrophy exercises targeting myofibril growth & strength.";
                image = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80";
                break;
              case FitnessGoal.IMPROVE_ENDURANCE:
                desc = "Dramatically raise your VO2 max and optimize daily athletic recovery.";
                image = "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&auto=format&fit=crop&q=80";
                break;
              case FitnessGoal.HOME_FITNESS:
                desc = "Zero-equipment calisthenics protocols configured for dynamic home living.";
                image = "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80";
                break;
              case FitnessGoal.YOGA_FLEXIBILITY:
                desc = "Postural reset therapy and high tension dynamic muscle releases.";
                image = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80";
                break;
            }

            return (
              <div
                key={g}
                id={`card_goal_${index}`}
                onClick={() => onNavigate("programs")}
                className="group relative rounded-2xl overflow-hidden aspect-[16/10] shadow-md border border-gray-100 dark:border-slate-800 cursor-pointer text-left transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent z-10" />
                <img src={image} alt={g} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                <div className="absolute bottom-0 inset-x-0 p-5 z-20 space-y-1">
                  <h3 className="font-extrabold text-white text-lg font-display tracking-wide">{g}</h3>
                  <p className="text-gray-300 text-xs font-light line-clamp-2 leading-relaxed">{desc}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary-green-light pt-1 group-hover:underline">
                    View Associated Programs
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CLINICAL WHY CHOOSE US BENEFITS */}
      <section className="bg-slate-900 py-16 text-white text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-primary-green uppercase">Engineered Benefits</span>
            <h2 className="text-3xl font-extrabold text-white font-display">Why Fitness Coach Beats the rest</h2>
            <p className="text-gray-400 text-sm">
              We leverage real-time diagnostic algorithms paired with certified clinical nutritionists to ensure safe, measurable body evolution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary-green/15 text-primary-green-light flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Dynamic Calibration</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                We do not believe in standard cookie-cutter nutrition. As you lose weight, our calorie calculations recalibrate your macro profiles dynamically.
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary-green/15 text-primary-green-light flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Micro-Nutrient Advice</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our templates list granular recipes down to exact water indexes, mineral metrics, and vitamin-dense leafy greens.
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary-green/15 text-primary-green-light flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Gemini Assistant</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Connect with an AI trained on modern clinical studies to receive direct support on protein substitutes, injury safe movements, and soreness relief.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROGRAMS SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div>
            <span className="text-xs font-bold tracking-widest text-primary-green uppercase">Featured Selection</span>
            <h2 className="text-3xl font-extrabold text-secondary-navy dark:text-white font-display">
              Programs Enrolling Right Now
            </h2>
          </div>
          <button
            id="btn_browse_all_programs_mid"
            onClick={() => onNavigate("programs")}
            className="px-4 py-2 border border-gray-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            Show All Workout Catalog
          </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workoutPrograms.slice(0, 3).map((prog) => {
          const isEnrolled = enrolledProgramIds.includes(prog.id);
          return (
            <div
              key={prog.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md border hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                isEnrolled 
                  ? "border-primary-green dark:border-primary-green" 
                  : "border-gray-100 dark:border-slate-800"
              }`}
            >
              <div>
                <div className="relative aspect-video">
                  <img src={prog.image} alt={prog.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-secondary-navy text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {prog.difficulty}
                  </span>
                  {isEnrolled && (
                    <span className="absolute top-3 right-3 bg-primary-green/90 text-secondary-navy text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest animate-pulse">
                      Active Plan
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-primary-green text-secondary-navy text-sm font-extrabold px-3 py-1 rounded-lg">
                    ₹{prog.price}
                  </span>
                </div>

                <div className="p-5 text-left space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary-green" />
                      {prog.durationWeeks} weeks
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {prog.rating} (Verified)
                    </span>
                  </div>

                  <h3 className="font-extrabold text-gray-900 dark:text-white text-base font-display leading-snug line-clamp-1">
                    {prog.name}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-350 text-xs line-clamp-2 leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="flex justify-between items-center text-[11px] pt-3 border-t border-gray-50 dark:border-slate-800 mt-2">
                    <span className="text-gray-400">Led by Coach: <span className="font-semibold text-gray-750 dark:text-gray-250">{prog.coach}</span></span>
                    <span className="text-emerald-500 font-bold">~{prog.totalCaloriesBurned} kcal/hour</span>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-1 text-left">
                {isEnrolled ? (
                  <button
                    id={`btn_enroll_prog_${prog.id}`}
                    onClick={() => onSelectProgram(prog)}
                    className="w-full py-2.5 bg-primary-green/10 text-primary-green hover:bg-primary-green/20 font-bold text-xs rounded-xl text-center border border-primary-green/30 cursor-pointer transition-all"
                  >
                    ✓ Enrolled & Active - View Schedule
                  </button>
                ) : (
                  <button
                    id={`btn_enroll_prog_${prog.id}`}
                    onClick={() => onSelectProgram(prog)}
                    className="w-full py-2.5 bg-gray-50 hover:bg-primary-green/10 dark:bg-slate-800 dark:hover:bg-primary-green/20 text-gray-800 dark:text-gray-250 font-bold text-xs rounded-xl transition-all text-center border border-gray-150 dark:border-slate-750 cursor-pointer"
                  >
                    Inspect Syllabus & Enroll
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      </section>

      {/* 6. REALISTIC BEFORE & AFTER TRANSFORMATION STORIES */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/30 dark:to-slate-950/40 py-16 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto justify-center">
            <span className="text-xs font-bold tracking-widest text-primary-green uppercase">Verified Proof</span>
            <h2 className="text-3xl font-extrabold text-secondary-navy dark:text-white font-display">
              Real Athlete Outcomes
            </h2>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              We never promote unrealistic magic pills. Here is what consistent compliance with customized, macro-timed protocols looks like in 12 to 16 weeks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {transformationStories.map((story, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-md border border-gray-150 dark:border-slate-800/80 space-y-6">
                
                {/* Visual before/after layout */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-center">
                    <span className="text-[10px] font-bold text-rose-500 px-2 py-0.5 bg-rose-50 dark:bg-rose-950/20 rounded-full inline-block">BEFORE</span>
                    <div className="rounded-xl overflow-hidden aspect-square">
                      <img src={story.imageBefore} alt="Before calibration" className="w-full h-full object-cover filter grayscale contrast-125 hover:scale-105 transition-transform" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 text-center">
                    <span className="text-[10px] font-bold text-emerald-500 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/20 rounded-full inline-block">AFTER ({story.timeframe})</span>
                    <div className="rounded-xl overflow-hidden aspect-square border-2 border-primary-green">
                      <img src={story.imageAfter} alt="After calibration" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Testimonial detail */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-extrabold text-lg text-secondary-navy dark:text-white font-display">{story.name}</h3>
                    <span className="text-xs text-primary-green font-bold bg-primary-green/10 px-2 py-0.5 rounded-full">{story.goal}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-gray-100 dark:border-slate-800">
                    <div className="text-xs text-gray-500 dark:text-gray-300 font-medium">{story.metric1}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300 font-medium">{story.metric2}</div>
                  </div>

                  <p className="text-gray-500 dark:text-gray-300 text-xs italic leading-relaxed pt-1 select-none">
                    &quot;{story.quote}&quot;
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. REVENUE-FOCUSED MEMBERSHIP PLANS */}
      <section id="pricing_plans_section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        <div className="space-y-4 max-w-xl">
          <span className="text-xs font-bold tracking-widest text-primary-green uppercase text-left">Subscription Plans</span>
          <h2 className="text-3xl font-extrabold text-secondary-navy dark:text-white font-display">
            Unlock High-Yield Fitness Subscriptions
          </h2>
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Invest in your physical framework. Basic workout sets, pro meal integration tracking, or a 1-on-1 virtual specialist to answer every question.
          </p>

          {/* TIMER BANNER */}
          <div className="bg-gradient-to-r from-accent-orange/10 via-amber-500/10 to-red-500/10 border border-accent-orange/20 rounded-xl p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-accent-orange font-bold">
              <Clock className="w-4 h-4 animate-spin [animation-duration:5s]" />
              <span>FLASH SUMMER DISCOUNT (30% OFF)</span>
            </div>
            <div className="text-gray-700 dark:text-gray-200 font-mono tracking-widest font-extrabold bg-white dark:bg-slate-850 px-2 py-1 rounded border">
              {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Plan 1 */}
          <div className="bg-white dark:bg-slate-900 border border-gray-205 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="space-y-6">
              <span className="text-xs font-bold text-gray-400 bg-gray-50 dark:bg-slate-800 px-3 py-1 rounded-full uppercase inline-block">BASIC</span>
              <div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-extrabold text-secondary-navy dark:text-white font-display">$19</span>
                  <span className="text-sm text-gray-400 font-semibold">/ month</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">Excellent for motivated self-starters</p>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-gray-100 dark:border-slate-800">
                <p className="text-xs text-gray-500 dark:text-gray-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-green" /> Unlimited HD exercise demonstrations</p>
                <p className="text-xs text-gray-500 dark:text-gray-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-green" /> Complete workout program library access</p>
                <p className="text-xs text-gray-500 dark:text-gray-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-green" /> Standard offline-mode BMI analysis</p>
                <p className="text-xs text-gray-400 line-through flex items-center gap-2 text-opacity-40"><X className="w-4 h-4 text-rose-500" /> Customized diet calculation</p>
                <p className="text-xs text-gray-400 line-through flex items-center gap-2 text-opacity-40"><X className="w-4 h-4 text-rose-500" /> 1-on-1 Certified Coach marketplace discounts</p>
              </div>
            </div>

            <div className="pt-8">
              <button
                id="btn_pricing_purchase_basic"
                onClick={() => alert("BASIC program purchased! Log in below to access your dashboard workout metrics.")}
                className="w-full py-3 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-gray-800 dark:text-gray-200 font-bold rounded-xl transition-all text-sm text-center"
              >
                Enroll in Basic Tier
              </button>
            </div>
          </div>

          {/* Plan 2: Best Value */}
          <div className="bg-gradient-to-b from-secondary-navy to-slate-950 text-white rounded-3xl p-8 flex flex-col justify-between relative shadow-xl border-2 border-primary-green scale-105 z-10">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-green to-primary-green-light text-secondary-navy font-black text-[10px] tracking-widest px-4 py-1.5 rounded-full uppercase shadow">
              ★ HEAVILY POPULAR
            </span>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-primary-green bg-primary-green/15 px-3 py-1 rounded-full uppercase inline-block">PRO PACKAGE</span>
                <span className="text-xs text-accent-orange font-bold uppercase tracking-widest">30% Auto Discounted</span>
              </div>
              
              <div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-5xl font-black text-white font-display">$34</span>
                  <span className="text-sm text-gray-400 font-semibold">/ month</span>
                </div>
                <p className="text-gray-300 text-xs mt-1">Perfect for consistent body recomposition</p>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-200 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-green" /> Everything and double calories log metrics</p>
                <p className="text-xs text-gray-200 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-green" /> Personalized Caloric & Macro Plan Generator</p>
                <p className="text-xs text-gray-200 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-green" /> Deep-dive water tracking & weight history logs</p>
                <p className="text-xs text-gray-200 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-green" /> Advanced dynamic supplements recommendation</p>
                <p className="text-xs text-gray-400 line-through flex items-center gap-2 text-opacity-30"><X className="w-4 h-4 text-rose-400" /> Video-chat coach advice and direct messaging</p>
              </div>
            </div>

            <div className="pt-8">
              <button
                id="btn_pricing_purchase_pro"
                onClick={() => alert("PRO subscription has been unlocked successfully! Your personal dashboard features are upgraded.")}
                className="w-full py-3.5 bg-gradient-to-r from-primary-green to-primary-green-light text-secondary-navy font-black rounded-xl hover:opacity-95 shadow-lg shadow-emerald-500/10 cursor-pointer text-sm text-center"
              >
                Start Free 7-Day Pro Trial
              </button>
            </div>
          </div>

          {/* Plan 3 */}
          <div className="bg-white dark:bg-slate-900 border border-gray-205 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="space-y-6">
              <span className="text-xs font-bold text-gray-400 bg-gray-50 dark:bg-slate-800 px-3 py-1 rounded-full uppercase inline-block font-sans">ELITE TRAINED</span>
              <div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-extrabold text-secondary-navy dark:text-white font-display">$89</span>
                  <span className="text-sm text-gray-400 font-semibold">/ month</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">1-on-1 certified mentorship and reviews</p>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-gray-100 dark:border-slate-800">
                <p className="text-xs text-gray-500 dark:text-gray-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-green" /> Complete custom diet planning</p>
                <p className="text-xs text-gray-500 dark:text-gray-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-green" /> Unlimited premium chat trainer queries</p>
                <p className="text-xs text-gray-500 dark:text-gray-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-green" /> Two 30-min Zoom consultations per month</p>
                <p className="text-xs text-gray-500 dark:text-gray-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-green" /> Priority support & customized product packages</p>
                <p className="text-xs text-gray-500 dark:text-gray-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-green" /> Verified trainer review guarantee</p>
              </div>
            </div>

            <div className="pt-8">
              <button
                id="btn_pricing_purchase_premium"
                onClick={() => alert("ELITE subscription activated! Check your inbox to pick your primary personal coach trainer.")}
                className="w-full py-3 bg-secondary-navy hover:bg-slate-800 text-white font-bold rounded-xl transition-all text-sm text-center"
              >
                Access Certified Coach
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 8. ELITE COACH MARKETPLACE SNEAK PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-primary-green uppercase text-left">Elite Specialists</span>
            <h2 className="text-3xl font-extrabold text-secondary-navy dark:text-white font-display">
              Consult Our Certified Coaches
            </h2>
            <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
              Connect directly via dynamic video schedules. Meet our head researchers in metabolism science.
            </p>
          </div>
          <button
            id="btn_go_to_coaches_market"
            onClick={() => onNavigate("coaches")}
            className="px-5 py-2.5 bg-gradient-to-r from-secondary-navy to-slate-800 text-white hover:opacity-90 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
          >
            Open Consultation Marketplace
            <ArrowRight className="w-4 h-4 text-primary-green" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifiedCoaches.map((coach, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 flex items-start gap-4">
              <img src={coach.image} alt={coach.name} className="w-16 h-16 rounded-xl object-cover shrink-0 border" />
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-gray-900 dark:text-white font-display">{coach.name}</h3>
                <p className="text-xs text-primary-green font-semibold">{coach.role}</p>
                <p className="text-[10px] text-gray-400 font-mono">{coach.cert}</p>
                <div className="flex items-center gap-1 text-xs text-amber-500 pt-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="font-bold">{coach.rating}</span>
                  <span className="text-gray-400 text-[10px]">({coach.reviews} feedback reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. NEWSLETTER SUBSCRIPTION FOR WEEKLY SECONDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary-green to-primary-green-light rounded-3xl p-8 sm:p-12 text-secondary-navy text-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-16 -mt-16" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-secondary-navy">
              Get Free Weekly Science-Backed Fitness Tips
            </h2>
            <p className="text-secondary-navy/85 text-sm leading-relaxed">
              No spam. Get calculated meal plans, fat loss recovery guides, workout safety alerts, and exclusive activewear member sales directly in your mailbox.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing! We've sent a Welcome Guide and a 10% coupon code to your inbox.");
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                id="input_home_newsletter_email"
                type="email"
                required
                placeholder="Enter email address..."
                className="flex-1 bg-white border-transparent text-secondary-navy px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-navy text-sm font-medium"
              />
              <button
                id="btn_home_newsletter_submit"
                type="submit"
                className="bg-secondary-navy text-white hover:opacity-90 px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
