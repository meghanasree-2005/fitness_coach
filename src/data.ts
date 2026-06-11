import { WorkoutProgram, DietPlan, ShopProduct, BlogArticle, FitnessGoal, DifficultyLevel } from "./types";

export const certifiedCoaches = [
  {
    name: "Dr. Adrian Thorne",
    role: "Exercise Scientist & Head Coach",
    cert: "Ph.D. Kinesiology, CSCS",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=300&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 1420
  },
  {
    name: "Sarah Jenkins",
    role: "Lead Performance Dietitian",
    cert: "MS Clinical Nutrition, RD",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=300&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: 980
  },
  {
    name: "Marcus Aurelius Diaz",
    role: "Elite Strength & Flexibility Expert",
    cert: "ISSA Master Trainer, 500-hr RYT",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 1250
  }
];

export const workoutPrograms: WorkoutProgram[] = [
  {
    id: "prog_shred_sculpt",
    name: "Peak Shred & Fat Loss Blueprint",
    durationWeeks: 6,
    difficulty: DifficultyLevel.INTERMEDIATE,
    rating: 4.9,
    price: 49.99,
    goal: FitnessGoal.LOSE_WEIGHT,
    description: "A target fat burning system combining High-Intensity Resistance Training (HIRT) with metabolic conditioning to preserve lean muscle while maximizing daily lipolysis.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
    coach: "Dr. Adrian Thorne",
    coachingBio: "Adrian has trained over 500 athletes and specializes in cellular-level body recomposition.",
    totalCaloriesBurned: 520,
    schedule: [
      "Day 1: Upper Body Strength Hypertrophy",
      "Day 2: Lower Body Quad & Calf Focus",
      "Day 3: HIRT Cardio Burn & Abs Core",
      "Day 4: Active Recovery & Gentle Stretching",
      "Day 5: Full Body Push-Pull Circuit",
      "Day 6: HIIT Aerobic Cardio Engine",
      "Day 7: Full Day Reset Rest Session"
    ],
    exercises: [
      {
        id: "ex_1",
        name: "Dumbbell Goblet Squats",
        reps: "12 reps",
        sets: 4,
        durationSeconds: 45,
        description: "Hold dumbbell firm against chest. Deep squat below parallel with neutral back, pushing floor away on ascent.",
        image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&auto=format&fit=crop&q=80"
      },
      {
        id: "ex_2",
        name: "Incline Dumbbell Chest Press",
        reps: "10 reps",
        sets: 4,
        durationSeconds: 50,
        description: "Engage scapula, press vertically from 30-degree incline, control the eccentric contraction smoothly.",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80"
      },
      {
        id: "ex_3",
        name: "Romanian Deadlifts (RDLs)",
        reps: "12 reps",
        sets: 3,
        durationSeconds: 40,
        description: "Hinge at hips, stretch hamstrings to peak limit, pull through glutes keeping bar close to your shins.",
        image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=300&auto=format&fit=crop&q=80"
      },
      {
        id: "ex_4",
        name: "Mountain Climbers Interval",
        reps: "Constant Pace",
        sets: 3,
        durationSeconds: 60,
        description: "Keep plank rigid. Alternate knees to chest fast to push heart rate into peak fat oxidation.",
        image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=300&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "prog_peak_mass",
    name: "Hypertrophy Catalyst & Mass Builder",
    durationWeeks: 8,
    difficulty: DifficultyLevel.ADVANCED,
    rating: 4.8,
    price: 59.99,
    goal: FitnessGoal.BUILD_MUSCLE,
    description: "An elite program optimized for structural muscle gain. Uses specific tempo structures and progressive resistance metrics to force skeletal muscle synthesis.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80",
    coach: "Dr. Adrian Thorne",
    coachingBio: "Adrian holds a Ph.D. in muscle biomechanics and custom tailors anabolic power lifts.",
    totalCaloriesBurned: 450,
    schedule: [
      "Day 1: Heavy Chest & Triceps Power Lift",
      "Day 2: Back & Biceps Width Hypertrophy",
      "Day 3: Quad & Hamstrings Steel Foundation",
      "Day 4: Active Recovery / Hydration Focus",
      "Day 5: Deltoids & Calves Conditioning",
      "Day 6: Weak Point Direct Hypertrophy Session",
      "Day 7: Full Regeneration Rest"
    ],
    exercises: [
      {
        id: "ex_5",
        name: "Conventional Barbell Deadlifts",
        reps: "6 reps",
        sets: 4,
        durationSeconds: 60,
        description: "Drive heels into floor, engage lats, pull bar straight up lock out hips with strict control.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&auto=format&fit=crop&q=80"
      },
      {
        id: "ex_6",
        name: "Weighted Chest Dips",
        reps: "8 reps",
        sets: 3,
        durationSeconds: 45,
        description: "Leaning forward to activate pectoral fibres. Keep elbows tucked in to save shoulder capsules.",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80"
      },
      {
        id: "ex_7",
        name: "Pull-ups (Slow eccentric)",
        reps: "Max possible",
        sets: 4,
        durationSeconds: 50,
        description: "Explosive pull to chest over bar. Take a full 4 seconds back down to stimulate deep micro tears.",
        image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=300&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "prog_home_flow",
    name: "Minimalist No-Equipment Home Success",
    durationWeeks: 4,
    difficulty: DifficultyLevel.BEGINNER,
    rating: 4.7,
    price: 29.99,
    goal: FitnessGoal.HOME_FITNESS,
    description: "Get in peak condition inside your living room. No equipment needed—uses creative bodyweight leverage, high volumes, and cardiovascular conditioning.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80",
    coach: "Marcus Aurelius Diaz",
    coachingBio: "Marcus is an expert in bodyweight calisthenics, bringing 12 years of gym-free coaching history.",
    totalCaloriesBurned: 380,
    schedule: [
      "Day 1: Push Muscle Bodyweight Focus",
      "Day 2: Lower Body Isometric Steel",
      "Day 3: Cardiovascular Endurance Blast",
      "Day 4: Rest / Dynamic Stretching Flow",
      "Day 5: Pull Calisthenics Core Strength",
      "Day 6: Metabolic Burn & Agility Play",
      "Day 7: Full Regeneration & Rest"
    ],
    exercises: [
      {
        id: "ex_8",
        name: "Strict Push-ups (Tempo)",
        reps: "15 reps",
        sets: 4,
        durationSeconds: 45,
        description: "Keep hands directly beneath chest line, back flat, hollow body posture throughout.",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&auto=format&fit=crop&q=80"
      },
      {
        id: "ex_9",
        name: "Bodyweight Bulgarian Split Squats",
        reps: "15 reps per leg",
        sets: 3,
        durationSeconds: 50,
        description: "Elevate rear foot on sofa or chair. Drive front knee outward slightly, tracking over toes.",
        image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&auto=format&fit=crop&q=80"
      },
      {
        id: "ex_10",
        name: "L-Sit Tucks on Chair",
        reps: "Hold 15-25s",
        sets: 3,
        durationSeconds: 30,
        description: "Depress shoulder girdle downward, raise knees and shins dynamically parallel to floor.",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "prog_power_yoga",
    name: "Power Yoga & Deep Mobility Flow",
    durationWeeks: 4,
    difficulty: DifficultyLevel.BEGINNER,
    rating: 4.9,
    price: 34.99,
    goal: FitnessGoal.YOGA_FLEXIBILITY,
    description: "Align your body, fix posture dysfunctions, and cultivate athletic flexibility using traditional poses with high-intensity power holds.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80",
    coach: "Marcus Aurelius Diaz",
    coachingBio: "Marcus is certified in Ashtanga Yoga under direct lineage instruction.",
    totalCaloriesBurned: 310,
    schedule: [
      "Day 1: Dynamic Spine Decompression",
      "Day 2: Hip Opener & Quad Recovery",
      "Day 3: Power Core Hold Series",
      "Day 4: Deep Tissue Relaxation Rest",
      "Day 5: Balance & Joint Stabilization",
      "Day 6: Athletic Power Vinyasa Flow",
      "Day 7: Full Regeneration Rest"
    ],
    exercises: [
      {
        id: "ex_11",
        name: "Crow Pose (Bakasana)",
        reps: "3 attempts",
        sets: 3,
        durationSeconds: 30,
        description: "Place palms down. Pivot knees onto triceps close to armpits, slowly hinge weight forward and lift feet.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&auto=format&fit=crop&q=80"
      },
      {
        id: "ex_12",
        name: "Three-Legged downward dog",
        reps: "5 deep breaths",
        sets: 3,
        durationSeconds: 40,
        description: "Keep shoulders square. Extend one leg straight back and up towards ceiling, stretching opposite hamstring.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "prog_heavy_stamina",
    name: "Infinite Stamina & Hybrid Conditioning",
    durationWeeks: 6,
    difficulty: DifficultyLevel.INTERMEDIATE,
    rating: 4.8,
    price: 44.99,
    goal: FitnessGoal.IMPROVE_ENDURANCE,
    description: "Improve VO2 max, reduce resting heart rate, and build a highly resilient cardiorespiratory engine.",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80",
    coach: "Sarah Jenkins",
    coachingBio: "Sarah trains marathoners and focuses on efficient energy system transitions.",
    totalCaloriesBurned: 600,
    schedule: [
      "Day 1: Aerobic Base Builder (Continuous Run)",
      "Day 2: Lactate Threshold Tempo Intervals",
      "Day 3: Functional Strength & Lung Capacity",
      "Day 4: Low-Intensity Pool Swim or Pedal Recovery",
      "Day 5: VO2 Max Boosters & Sprint Repeats",
      "Day 6: High Volume Metabolic Kettlebell Complex",
      "Day 7: Mind-Body Reset Rest"
    ],
    exercises: [
      {
        id: "ex_13",
        name: "Tempo Kettlebell Swings",
        reps: "30 reps",
        sets: 4,
        durationSeconds: 60,
        description: "Hinge at the hips. Keep hips snapping forward explosively, squeeze glutes at the peak of swing.",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=300&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "prog_lean_gain",
    name: "Lean Athletic Gains Masterclass",
    durationWeeks: 8,
    difficulty: DifficultyLevel.INTERMEDIATE,
    rating: 4.9,
    price: 52.99,
    goal: FitnessGoal.GAIN_WEIGHT,
    description: "Targeted sports conditioning program for people who want to gain pure dense weight without excess body lipid storage.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80",
    coach: "Dr. Adrian Thorne",
    coachingBio: "Adrian has personal athletic accomplishments in strongman and natural bodybuilding.",
    totalCaloriesBurned: 480,
    schedule: [
      "Day 1: Compound Squat & Leg Build",
      "Day 2: Flat Bench & Weighted Push Focus",
      "Day 3: Heavy Rows & Vertical Pull Hypertrophy",
      "Day 4: Rest / Recovery Stretch Flow",
      "Day 5: Over-the-Head Press Power Delts",
      "Day 6: Posterior Chain Power (Snatch/Pull)",
      "Day 7: Full Regeneration Rest"
    ],
    exercises: [
      {
        id: "ex_14",
        name: "Barbell Back Squats",
        reps: "8 reps",
        sets: 4,
        durationSeconds: 55,
        description: "Load bar carefully across upper trap muscles, step back, descend with knees bracing outward.",
        image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&auto=format&fit=crop&q=80"
      }
    ]
  }
];

export const dietPlans: DietPlan[] = [
  {
    id: "diet_shred",
    name: "Strict Metabolic Cut Plan",
    category: "Weight Loss",
    goalDescription: "Designed for intensive fat loss, prioritizing low glycemic carbohydrates, dietary fiber, and extreme lean proteins to block hunger signals.",
    dailyCalories: 1750,
    proteinTotal: 160,
    carbsTotal: 120,
    fatTotal: 50,
    rating: 4.9,
    price: 39.99,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
    meals: [
      {
        id: "m_1",
        name: "Mashed Egg Whites & Avocado Toast",
        type: "Breakfast",
        calories: 350,
        protein: 30,
        carbs: 25,
        fat: 12,
        ingredients: ["200g Liquid Egg Whites", "1 slice Whole Grain Artisan Sourdough", "50g Ripe Hass Avocado", "Pink Himalayan salt", "Chili flakes"],
        recipeInstructions: ["Toast your slice of artisan sourdough.", "Scramble egg whites in a non-stick pan over medium heat with low-calorie organic oil spray.", "Mash avocado directly onto toast, top with cooked fluffy egg whites and seasonings."]
      },
      {
        id: "m_2",
        name: "Citrus Grilled Chicken Breast & Broccoli Bowl",
        type: "Lunch",
        calories: 520,
        protein: 55,
        carbs: 40,
        fat: 10,
        ingredients: ["180g Lean Organic Chicken Breast", "150g Steamed Fresh Broccoli Florets", "100g Cooked Brown Basmati Rice", "Fresh lemon squeeze", "Garlic herb rub"],
        recipeInstructions: ["Season chicken breast with garlic herb rub.", "Grill 6-8 minutes on each side until internal temperature reads 165°F.", "Serve with cooked basmati brown rice and fresh steamed broccoli drizzled with lemon juice."]
      },
      {
        id: "m_3",
        name: "Garlic Salmon Fillet & Steamed Asparagus",
        type: "Dinner",
        calories: 550,
        protein: 45,
        carbs: 15,
        fat: 25,
        ingredients: ["150g Atlantean Salmon Fillet", "100g Steamed Asparagus Spears", "80g Baby Spinach salad", "1 tsp Premium Virgin Olive Oil"],
        recipeInstructions: ["Preheat oven to 400°F.", "Place salmon in foil, rub with olive oil, minced garlic, and rosemary.", "Bake for 12-15 minutes.", "Sauté baby spinach with garlic oil and serve with steamed asparagus."]
      },
      {
        id: "m_4",
        name: "High Protein Creamy Greek Yogurt Bowl",
        type: "Snack",
        calories: 330,
        protein: 30,
        carbs: 40,
        fat: 3,
        ingredients: ["220g Non-Fat Authentic Greek Yogurt", "50g Fresh Blueberries", "15g Whey Protein Isolate (Vanilla)", "10g Ground Flax Seeds"],
        recipeInstructions: ["Whisk Greek yogurt with whey isolate until perfectly smooth.", "Fold in clean fresh blueberries and sprinkle ground flax seeds over the top."]
      }
    ]
  },
  {
    id: "diet_high_pro",
    name: "Alpha Anabolic Clean Gain Diet",
    category: "High Protein",
    goalDescription: "Optimized for raw hypertrophy athletes. Keeps nitrogen levels high with a heavy influx of bioactive proteins and premium carbohydrates for ATP storage.",
    dailyCalories: 2900,
    proteinTotal: 210,
    carbsTotal: 340,
    fatTotal: 75,
    rating: 4.8,
    price: 44.99,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    meals: [
      {
        id: "m_5",
        name: "Power Oats with Banana & Peanut Butter",
        type: "Breakfast",
        calories: 750,
        protein: 45,
        carbs: 95,
        fat: 22,
        ingredients: ["100g Rolled Oats", "35g Whey Protein Concentrate", "1 Large Ripe Banana (sliced)", "25g All-Natural Organic Creamy Peanut Butter"],
        recipeInstructions: ["Cook rolled oats in 250ml of water or skim milk.", "Stir in whey protein powder enthusiastically once off heat to prevent clumping.", "Top with sliced ripe banana and peanut butter."]
      },
      {
        id: "m_6",
        name: "Premium Lean Beef Strip & Jasmine Rice",
        type: "Lunch",
        calories: 850,
        protein: 60,
        carbs: 100,
        fat: 20,
        ingredients: ["200g Lean Beef Flank Sirloin", "150g Fluffy Cooked Jasmine Rice", "100g Mixed Bell Peppers", "1 tbsp Sesame Seed Oil"],
        recipeInstructions: ["Sauté sliced bell peppers in sesame oil over hot cast iron skillet.", "Add seasoned flank steak strips, stir-fry to medium rare.", "Serve instantly over hot jasmin rice."]
      },
      {
        id: "m_7",
        name: "Oven-Roasted Turkey Tenderloin & Sweet Potato",
        type: "Dinner",
        calories: 820,
        protein: 65,
        carbs: 90,
        fat: 18,
        ingredients: ["200g Turkey Breast Tenderloin", "250g Baked Sweet Potato (with skins)", "120g Roasted Zucchini slices", "10g Raw Grass-Fed Salted Butter"],
        recipeInstructions: ["Bake turkey tenderloin with poultry herbs at 375°F for 25 minutes.", "Roast sweet potato in foil, split middle and spread with grass-fed real butter."]
      },
      {
        id: "m_8",
        name: "Anabolic Casein & Almond Shake",
        type: "Snack",
        calories: 480,
        protein: 40,
        carbs: 55,
        fat: 15,
        ingredients: ["35g Micellar Casein Powder (Chocolate)", "350ml Unsweetened Vanilla Almond Milk", "20g Raw Almonds", "10g Dry Rolled Oats (blended)"],
        recipeInstructions: ["Combine casein, almond milk, and raw oats in high-speed blender.", "Pulse until smooth. Consume alongside raw almonds for slow-release amino profiles."]
      }
    ]
  },
  {
    id: "diet_keto",
    name: "Ketogenic Fat Adaptation Diet",
    category: "Keto",
    goalDescription: "Force your metabolism into burning ketones rather than glucose. Features 70% fats, 25% protein, and strictly under 50g net carbs daily.",
    dailyCalories: 2100,
    proteinTotal: 130,
    carbsTotal: 30,
    fatTotal: 160,
    rating: 4.7,
    price: 34.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
    meals: [
      {
        id: "m_9",
        name: "Triple Egg & Sharp Cheddar Cheese Scramble",
        type: "Breakfast",
        calories: 550,
        protein: 35,
        carbs: 4,
        fat: 45,
        ingredients: ["3 Large Pasture-Raised Whole Eggs", "40g Sharp Premium Cheddar", "15g Pure Salted Irish Butter", "2 strips Organic Thick Crispy Bacon"],
        recipeInstructions: ["Whisk eggs. Melts butter in pan, scramble slowly over low heat for custody textures.", "Fold in grated cheddar cheese.", "Serve with crispy pan-fried bacon strips."]
      },
      {
        id: "m_10",
        name: "Loaded Avocado Tuna Salad Boat",
        type: "Lunch",
        calories: 580,
        protein: 38,
        carbs: 10,
        fat: 45,
        ingredients: ["1 Whole Ripe Avocado", "150g Canned Solid Albacore Tuna", "30g Pure Avocado Oil Mayonnaise", "Chopped fresh dill & celery"],
        recipeInstructions: ["Drain tuna, mash in bowl with mayonnaise, chopped dill, and celery.", "Slice avocado in half, remove pit, scoop tuna salad into the hollow centers."]
      }
    ]
  },
  {
    id: "diet_vegan",
    name: "High-Performance Vegan Athlete System",
    category: "Vegan",
    goalDescription: "Entirely plant-based nutrition strategy. Concentrated on pea/rice isolates, lentils, edamame, and whole food micro-nutrients to build elite stamina.",
    dailyCalories: 2200,
    proteinTotal: 140,
    carbsTotal: 270,
    fatTotal: 62,
    rating: 4.8,
    price: 29.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
    meals: [
      {
        id: "m_11",
        name: "Crispy Tempeh & Quinoa Energy Bowl",
        type: "Lunch",
        calories: 680,
        protein: 42,
        carbs: 85,
        fat: 18,
        ingredients: ["150g Organic Tempeh strips", "120g Dry Cooked Tricolor Quinoa", "80g Black Beans", "100g Steamed Kale", "20g Creamy Tahini Dressing"],
        recipeInstructions: ["Pan-sear tempeh strips in a neutral oil until golden brown on all edges.", "Assemble quinoa, beans, and wilted steamed kale in a wide ceramic bowl.", "Drizzle with rich sesame tahini dressing."]
      }
    ]
  }
];

export const shopProducts: ShopProduct[] = [
  {
    id: "prod_bands",
    name: "IronLock Heavy-Duty Resistance Bands",
    price: 24.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&auto=format&fit=crop&q=80",
    description: "Anti-snap premium 100% natural latex resistance bands. Includes 5 colored levels (10lbs to 50lbs), comfortable foam handles, durable ankle straps, and solid door anchor.",
    category: "Accessories",
    reviewsCount: 342
  },
  {
    id: "prod_kettlebell",
    name: "ApexGrip Solid Cast Iron Kettlebell (35lbs / 16kg)",
    price: 54.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=400&auto=format&fit=crop&q=80",
    description: "Solid high-grade cast iron sandblasted kettlebell. Features an extra-wide textured handle for double-handed grip control during swings and high-intensity snatch exercises.",
    category: "Hardware",
    reviewsCount: 142
  },
  {
    id: "prod_pullup_bar",
    name: "AeroPull Doorway Heavy-Duty Pull-Up Bar",
    price: 29.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&auto=format&fit=crop&q=80",
    description: "Doorway chin-up bar with dense foam cushion grips. Adjustable length with a secure locking mechanism. Supports up to 300 lbs safely without screws.",
    category: "Hardware",
    reviewsCount: 204
  },
  {
    id: "prod_massage_gun",
    name: "PulseWave Deep Tissue Athletic Massage Gun",
    price: 139.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1610389051254-648dc1800fb7?w=400&auto=format&fit=crop&q=80",
    description: "Professional percussion athletic recovery tool. Features 6 variable speed gears, 4 customized therapeutic massage heads, and extra-quiet brush motor.",
    category: "Hardware",
    reviewsCount: 312
  },
  {
    id: "prod_weight_bench",
    name: "IronFlex 6-Position Foldable Weight Bench",
    price: 159.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?w=400&auto=format&fit=crop&q=80",
    description: "Multi-purpose utility weight bench with incline, flat, and decline positions. Built of dense commercial steel frame with comfortable high-density leather padding.",
    category: "Hardware",
    reviewsCount: 165
  },
  {
    id: "prod_barbell_set",
    name: "IronLock 100lbs Olympic Barbell & Plates Set",
    price: 249.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400&auto=format&fit=crop&q=80",
    description: "Complete Olympic barbell and plate collection. Includes a solid 5ft structural bar, safety spring collars, and high-density rubber-coated iron weights.",
    category: "Hardware",
    reviewsCount: 88
  },
  {
    id: "prod_ab_roller",
    name: "CoreSculpt Kinetic Spring Ab Roller Wheel",
    price: 19.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1616803689943-5601631c7bbf?w=400&auto=format&fit=crop&q=80",
    description: "Ultra-wide design with dynamic carbon steel spring interior to generate kinetic resistance and help stabilize your extensions.",
    category: "Hardware",
    reviewsCount: 154
  },
  {
    id: "prod_yoga_mat",
    name: "ZenAlign Pro Eco Yoga Mat (6mm)",
    price: 39.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&auto=format&fit=crop&q=80",
    description: "Non-slip eco-friendly TPE yoga mat with laser-engraved posture alignment lines. Dual-sided premium textured traction offers ultimate joint cushioning.",
    category: "Accessories",
    reviewsCount: 189
  },
  {
    id: "prod_dumbbells",
    name: "Pro-Iron Adjustable Dumbbell Set (40lbs)",
    price: 89.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=400&auto=format&fit=crop&q=80",
    description: "Premium heavy-duty cast iron weights with secure star-spin locks. Easily adjustable plates from 5lbs up to 40lbs total for steady progression tracking.",
    category: "Hardware",
    reviewsCount: 512
  },
  {
    id: "prod_shaker",
    name: "Cyclone Hydration Protein Shaker (24oz)",
    price: 14.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=400&auto=format&fit=crop&q=80",
    description: "Leak-proof tritan material shaker cup with a lockable flip cap, robust surgical steel mixing ball, and double storage powder pills container base.",
    category: "Beverages",
    reviewsCount: 228
  },
  {
    id: "prod_tracker",
    name: "AeroPulse GPS Fitness Tracker & HR Band",
    price: 119.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&auto=format&fit=crop&q=80",
    description: "Premium sweatproof design with continuous cardiovascular reading, blood oxygen reading, 12 built-in athletic modes, dynamic smart sleep tracker, and 10-day battery.",
    category: "Wearables",
    reviewsCount: 94
  }
];

export const blogArticles: BlogArticle[] = [
  {
    id: "post_1",
    title: "10 Principles of High-Performance Nutrient Timing",
    category: "Nutrition",
    readTime: "6 min read",
    author: "Sarah Jenkins, RD",
    date: "June 05, 2026",
    summary: "Learn what real nutrition science says about eating before, during, and after strenuous strength workouts to accelerate glycogen replenishment and myofibril repair.",
    content: "Bodybuilders and endurance runners alike debate the 'anabolic window'. This article breaks down scientific truths: 1) Insulin sensitivity is peak immediately after working out. 2) Carbohydrates should match the volume of physical output. 3) Whey is fast-absorbing, while Casein is perfect for overnight cell rebuild. Ensure you balance proteins with complex carbs instead of simple sugars.",
    tags: ["Nutrient Timing", "Protein", "Soreness Recovery", "Meal Prep"]
  },
  {
    id: "post_2",
    title: "Vascular Adaptation and the Power of Zone 2 Cardio",
    category: "Fitness Tips",
    readTime: "8 min read",
    author: "Dr. Adrian Thorne",
    date: "May 28, 2026",
    summary: "Why sprinting to complete exhaustion might be hurting your recovery. Discover the science of mitochondrial density and aerobic endurance base building.",
    content: "Zone 2 Cardio is defined as exercising at a heart rate where you can hold a conversation but still feel moderate sweat (approx 60-70% of max HR). Doing this for 30-40 minutes 3 times a week stimulates mitochondrial growth, allowing your body to metabolize fat significantly more easily while recovering faster between high-intensity lifting sets.",
    tags: ["Zone 2", "Cardio Engine", "VO2 Max", "Heart Rate"]
  },
  {
    id: "post_3",
    title: "The Ultimate Guide to Caloric Balance and BMI",
    category: "Weight Loss",
    readTime: "5 min read",
    author: "Sarah Jenkins, RD",
    date: "May 12, 2026",
    summary: "Decode how your basal metabolic rate (BMR) translates to raw daily calories and how to use your BMI as a baseline target for structural body recomposition.",
    content: "Your Basal Metabolic Rate is what your body burns simply existing in a resting state. Combined with your Daily Energy Expenditure (TDEE), this defines your exact maintenance calories. By calculating your BMI, you understand if your current weight category suggests a minor lipid reduction or an athletic mass phase. This guide demonstrates how to establish those variables easily.",
    tags: ["BMI Analysis", "BMR Calculator", "Caloric Deficit", "Healthy Lifestyle"]
  }
];

export const transformationStories = [
  {
    name: "Alex Rivera",
    goal: "Body Recomposition",
    metric1: "Weight: 92kg → 78kg",
    metric2: "Body Fat: 28% → 12%",
    timeframe: "16 Weeks",
    quote: "Fitness Coach changed my approach completely. The BMI calculator suggested I focus on protein synthesis rather than pure starvation. I built muscle while losing 14 kilograms!",
    imageBefore: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&auto=format&fit=crop&q=80",
    imageAfter: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=300&auto=format&fit=crop&q=80"
  },
  {
    name: "Emily Chen",
    goal: "Muscle Strength Build",
    metric1: "Weight: 49kg → 56kg",
    metric2: "Squat Max: 40kg → 85kg",
    timeframe: "12 Weeks",
    quote: "The personalized workout routines were highly focused on lifting form. The home programs saved me during busy student semesters. Highly recommended for busy individuals!",
    imageBefore: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=300&auto=format&fit=crop&q=80",
    imageAfter: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&auto=format&fit=crop&q=80"
  }
];
