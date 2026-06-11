import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AssessmentView from "./components/AssessmentView";
import CatalogView from "./components/CatalogView";
import ShopView from "./components/ShopView";
import CoachMarketplace from "./components/CoachMarketplace";
import DashboardView from "./components/DashboardView";
import AiChatbot from "./components/AiChatbot";
import { CheckCircle2, Loader2, Sparkles, Trophy } from "lucide-react";

import { WorkoutProgram, DietPlan, ShopProduct, UserHealthStats, FitnessGoal } from "./types";

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<string>("home");

  // Default to Dark Mode only
  const [isDark, setIsDark] = useState<boolean>(true);

  // E-Commerce cart
  const [cart, setCart] = useState<{ product: ShopProduct; quantity: number }[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // User health stats passed down from quick assessment
  const [userStats, setUserStats] = useState<UserHealthStats | null>(null);

  // Detail Modal views
  const [selectedProgramDetail, setSelectedProgramDetail] = useState<WorkoutProgram | null>(null);
  const [selectedDietDetail, setSelectedDietDetail] = useState<DietPlan | null>(null);

  // Persistent responsive workout program enrollments
  const [enrolledProgramIds, setEnrolledProgramIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("enrolled_program_ids");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isEnrolling, setIsEnrolling] = useState<boolean>(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState<boolean>(false);

  // Sync enrolled program IDs to localStorage
  useEffect(() => {
    localStorage.setItem("enrolled_program_ids", JSON.stringify(enrolledProgramIds));
  }, [enrolledProgramIds]);

  // Sync dark theme with document DOM
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleToggleDarkMode = () => {
    setIsDark(!isDark);
  };

  // E-commerce handlers
  const handleAddToCart = (product: ShopProduct) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleQuickAssessFromHome = (
    gender: "male" | "female" | "other",
    age: number,
    heightCm: number,
    weightKg: number
  ) => {
    setUserStats({
      gender,
      age,
      heightCm,
      weightKg,
      activityLevel: "moderate",
      fitnessGoal: FitnessGoal.LOSE_WEIGHT,
      targetWeightKg: weightKg - 4
    });
  };

  return (
    <div id="full_app_canvas" className="min-h-screen flex flex-col justify-between text-gray-900 bg-light-bg dark:text-gray-100 dark:bg-dark-bg transition-colors duration-300">
      
      {/* GLOBAL HEADER */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        cartCount={cart.reduce((s, c) => s + c.quantity, 0)}
        wishlistCount={wishlist.length}
        isDark={isDark}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* RENDER ACTIVE TAB */}
      <main className="flex-grow select-none">
        {currentTab === "home" && (
          <HomeView
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onSelectProgram={(p) => {
              setSelectedProgramDetail(p);
              setIsEnrolling(false);
              setEnrollmentSuccess(false);
            }}
            onAssessQuick={handleQuickAssessFromHome}
            enrolledProgramIds={enrolledProgramIds}
          />
        )}

        {currentTab === "assessment" && (
          <AssessmentView
            initialStats={userStats}
            onAddToCart={handleAddToCart}
            onSelectProgram={(p) => {
              setSelectedProgramDetail(p);
              setIsEnrolling(false);
              setEnrollmentSuccess(false);
            }}
            onSelectDiet={(d) => setSelectedDietDetail(d)}
          />
        )}

        {currentTab === "programs" && (
          <CatalogView
            onSelectProgram={(p) => {
              setSelectedProgramDetail(p);
              setIsEnrolling(false);
              setEnrollmentSuccess(false);
            }}
            onSelectDiet={(d) => setSelectedDietDetail(d)}
            tabOverride="programs"
            enrolledProgramIds={enrolledProgramIds}
          />
        )}

        {currentTab === "diets" && (
          <CatalogView
            onSelectProgram={(p) => {
              setSelectedProgramDetail(p);
              setIsEnrolling(false);
              setEnrollmentSuccess(false);
            }}
            onSelectDiet={(d) => setSelectedDietDetail(d)}
            tabOverride="diets"
            enrolledProgramIds={enrolledProgramIds}
          />
        )}

        {currentTab === "shop" && (
          <ShopView
            cart={cart}
            wishlist={wishlist}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateCartQty={handleUpdateCartQty}
            onToggleWishlist={handleToggleWishlist}
            onClearCart={handleClearCart}
          />
        )}

        {currentTab === "coaches" && <CoachMarketplace />}

        {currentTab === "dashboard" && (
          <DashboardView 
            enrolledProgramIds={enrolledProgramIds}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </main>

      {/* FLOAT CHAT FOR TRAINING ASSISTANCE */}
      <AiChatbot />

      {/* GLOBAL FOOTER */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* PROGRAM SYLLABUS DETAIL MODAL OVERLAY */}
      {selectedProgramDetail && (
        <div className="fixed inset-0 bg-slate-950/75 p-4 flex items-center justify-center z-[100] animate-fade-in text-left">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-gray-150 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-start border-b pb-4 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-black tracking-widest text-primary-green uppercase bg-primary-green/10 px-2.5 py-1 rounded">
                  {selectedProgramDetail.goal}
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-display text-gray-900 dark:text-white mt-1.5 leading-snug">
                  {selectedProgramDetail.name}
                </h3>
              </div>
              <button
                id="btn_close_program_modal"
                disabled={isEnrolling}
                onClick={() => setSelectedProgramDetail(null)}
                className="text-gray-400 hover:text-gray-950 dark:hover:text-white p-2 text-sm bg-slate-100 hover:bg-gray-200 dark:bg-slate-850 dark:hover:bg-slate-800 rounded-full disabled:opacity-50"
              >
                ✕
              </button>
            </div>

            {isEnrolling ? (
              <div className="py-16 text-center space-y-4 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary-green animate-spin" />
                <div className="space-y-1">
                  <p className="text-sm font-extrabold text-gray-900 dark:text-white">Connecting Securely to Training Stack...</p>
                  <p className="text-[11px] text-gray-400">Syncing coaches schedule and biometrics parameters</p>
                </div>
              </div>
            ) : enrollmentSuccess ? (
              <div className="py-6 text-center space-y-6 flex flex-col items-center justify-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-primary-green/10 flex items-center justify-center border border-primary-green/20 text-primary-green relative">
                  <Trophy className="w-8 h-8" />
                  <div className="absolute inset-0 rounded-full border-4 border-primary-green border-t-transparent animate-spin opacity-40"></div>
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="text-xl font-extrabold font-display text-gray-900 dark:text-white flex items-center gap-1.5 justify-center">
                    <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                    Enrollment Activated!
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                    You have successfully activated the <strong className="text-primary-green">{selectedProgramDetail.name}</strong> training blueprint under <strong>{selectedProgramDetail.coach}</strong>.
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-850 p-4 border border-gray-150 dark:border-slate-800 rounded-2xl w-full max-w-sm space-y-1 text-center">
                  <p className="text-[11px] font-bold text-gray-700 dark:text-white">🚀 Biometrics Configured Successfully</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    We've linked this coach syllabus directly to your client profile. Access daily metabolic checks on your dashboard anytime.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center pt-2">
                  <button
                    id="btn_enroll_go_dash"
                    onClick={() => {
                      setSelectedProgramDetail(null);
                      setCurrentTab("dashboard");
                    }}
                    className="flex-1 px-5 py-3 bg-gradient-to-r from-primary-green to-primary-green-light text-secondary-navy font-black text-xs rounded-xl shadow-md cursor-pointer text-center"
                  >
                    Go to Dashboard & Track
                  </button>
                  <button
                    id="btn_enroll_done_close"
                    onClick={() => setSelectedProgramDetail(null)}
                    className="px-5 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-gray-700 dark:text-gray-200 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Back to Workouts
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Profile split */}
                <div className="grid md:grid-cols-2 gap-6 pb-2">
                  <div className="space-y-4">
                    <img src={selectedProgramDetail.image} alt={selectedProgramDetail.name} className="w-full aspect-[4/3] rounded-2xl object-cover shadow" />
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl border border-gray-100 dark:border-slate-800">
                        <p className="text-[9px] text-gray-400 font-bold uppercase">Duration</p>
                        <p className="font-extrabold text-sm mt-0.5 text-gray-900 dark:text-white">{selectedProgramDetail.durationWeeks} weeks</p>
                      </div>
                      <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl border border-gray-100 dark:border-slate-800">
                        <p className="text-[9px] text-gray-400 font-bold uppercase">RATING</p>
                        <p className="font-extrabold text-sm mt-0.5 text-amber-500 font-bold">★ {selectedProgramDetail.rating}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bio details and syllabus */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Personal Fitness Coach</p>
                      <p className="text-sm font-extrabold text-gray-905 dark:text-gray-250 font-display">{selectedProgramDetail.coach}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed italic pr-2">&quot;{selectedProgramDetail.coachingBio}&quot;</p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-850 border border-emerald-500/10 rounded-2xl">
                      <p className="text-xs font-bold text-gray-800 dark:text-white uppercase mb-2">Detailed Exercise syllabus</p>
                      <div className="space-y-2">
                        {selectedProgramDetail.exercises.map((ex) => (
                          <div key={ex.id} className="text-xs space-y-0.5 border-b pb-2 last:border-b-0 last:pb-0 dark:border-slate-800">
                            <p className="font-extrabold text-gray-900 dark:text-white">{ex.name}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed italic">{ex.description}</p>
                            <p className="text-[10px] text-primary-green font-bold uppercase">{ex.sets} sets x {ex.reps}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weekly Schedule list */}
                <div className="space-y-3 pt-3 border-t dark:border-slate-800">
                  <h4 className="text-xs font-black uppercase text-gray-450 tracking-wider">Metabolic Active Schedule</h4>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs">
                    {selectedProgramDetail.schedule.map((day, idx) => (
                      <div key={idx} className="p-2 bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100/40 dark:border-emerald-900/10 text-emerald-800 dark:text-emerald-300 rounded-lg font-medium">
                        {day}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Buy Row */}
                {enrolledProgramIds.includes(selectedProgramDetail.id) ? (
                  <div className="pt-4 border-t dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black">Plan Status</p>
                      <span className="text-xs bg-primary-green/15 text-primary-green px-2.5 py-1 rounded-lg font-black inline-block mt-1">✓ Enrolled & Active</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        id="btn_modal_go_dashboard"
                        onClick={() => {
                          setSelectedProgramDetail(null);
                          setCurrentTab("dashboard");
                        }}
                        className="px-5 py-3 bg-secondary-navy text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-750 font-black text-xs rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                      >
                        Go to Dashboard
                      </button>
                      <button
                        id="btn_modal_unenroll"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to pause or withdraw from "${selectedProgramDetail.name}"?`)) {
                            setEnrolledProgramIds(enrolledProgramIds.filter(id => id !== selectedProgramDetail.id));
                          }
                        }}
                        className="px-3 py-3 text-red-500 hover:text-red-600 hover:bg-red-500/10 font-bold text-xs rounded-xl transition-all cursor-pointer"
                        title="Pause Blueprint"
                      >
                        Un-enroll
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black">Tuition Package Price</p>
                      <p className="text-2xl font-black text-secondary-navy dark:text-primary-green">₹{selectedProgramDetail.price}</p>
                    </div>

                    <button
                      id="btn_modal_enroll_confirm"
                      onClick={() => {
                        setIsEnrolling(true);
                        setTimeout(() => {
                          setIsEnrolling(false);
                          setEnrollmentSuccess(true);
                          setEnrolledProgramIds(prev => {
                            if (!prev.includes(selectedProgramDetail.id)) {
                              return [...prev, selectedProgramDetail.id];
                            }
                            return prev;
                          });
                        }, 1200);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-primary-green to-primary-green-light text-secondary-navy font-black text-xs rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      Confirm Program Enrollment
                    </button>
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      )}

      {/* DIET RECIPE SCHEMA DETAIL MODAL */}
      {selectedDietDetail && (
        <div className="fixed inset-0 bg-slate-950/75 p-4 flex items-center justify-center z-[100] animate-fade-in text-left">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-gray-150 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-start border-b pb-4 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-black tracking-widest text-primary-green uppercase bg-primary-green/10 px-2.5 py-1 rounded">
                  {selectedDietDetail.category} Class System
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-display text-gray-900 dark:text-white mt-1.5 leading-snug">
                  {selectedDietDetail.name}
                </h3>
              </div>
              <button
                id="btn_close_diet_modal"
                onClick={() => setSelectedDietDetail(null)}
                className="text-gray-400 hover:text-gray-950 dark:hover:text-white p-2 text-sm bg-slate-100 hover:bg-gray-200 dark:bg-slate-850 dark:hover:bg-slate-800 rounded-full"
              >
                ✕
              </button>
            </div>

            {/* Macros details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <img src={selectedDietDetail.image} alt={selectedDietDetail.name} className="w-full aspect-[4/3] rounded-2xl object-cover shadow" />
                
                {/* Macromolecules list layout */}
                <div className="grid grid-cols-4 gap-2 text-center p-3.5 bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-2xl">
                  <div>
                    <p className="text-[8px] font-semibold text-gray-400 uppercase">CALORIES</p>
                    <p className="text-xs font-black text-primary-green mt-0.5">{selectedDietDetail.dailyCalories}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-semibold text-gray-400 uppercase">PROTEIN</p>
                    <p className="text-xs font-black text-gray-900 dark:text-white mt-0.5">{selectedDietDetail.proteinTotal}g</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-semibold text-gray-400 uppercase">CARBS</p>
                    <p className="text-xs font-black text-gray-900 dark:text-white mt-0.5">{selectedDietDetail.carbsTotal}g</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-semibold text-gray-400 uppercase">FAT</p>
                    <p className="text-xs font-black text-gray-900 dark:text-white mt-0.5">{selectedDietDetail.fatTotal}g</p>
                  </div>
                </div>
              </div>

              {/* Bio summary list */}
              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase">Meal Strategy Description</p>
                <p className="text-xs text-gray-500 dark:text-gray-350 leading-relaxed">
                  {selectedDietDetail.goalDescription}
                </p>

                <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-4 border border-emerald-100/30 rounded-2xl space-y-2">
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">💡 Metabolic Hydration Note</p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-relaxed">
                    Prioritize drinking 3.5 liters of clean water daily when under ketogenic or high protein schedules to safe-guard kidneys and support vascular cell delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Granular Recipes catalog */}
            <div className="space-y-4 pt-4 border-t dark:border-slate-800">
              <h4 className="text-xs font-black uppercase text-gray-450 tracking-wider">Dynamic Meal breakdowns</h4>
              <div className="space-y-4">
                {selectedDietDetail.meals.map((meal) => (
                  <div key={meal.id} className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-secondary-navy dark:text-white font-display uppercase tracking-wide">{meal.type}: {meal.name}</span>
                      <span className="text-primary-green font-bold font-mono">{meal.calories} kcal</span>
                    </div>

                    {/* ingredients split */}
                    <div className="text-[11px] text-gray-500 dark:text-gray-350 space-y-1">
                      <p className="font-bold text-gray-400">Ingredients list:</p>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {meal.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                      </ul>
                    </div>

                    <div className="text-[11px] text-gray-500 dark:text-gray-350 space-y-1 pt-1.5 border-t border-gray-150 dark:border-slate-850/60">
                      <p className="font-bold text-gray-400">Preparation Instructions:</p>
                      <ol className="list-decimal pl-4 space-y-1">
                        {meal.recipeInstructions.map((rec, i) => <li key={i}>{rec}</li>)}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
