import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is missing. Chat fallback mode enabled.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. Live Chat Assistant Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Missing 'message' in request body." });
      return;
    }

    const ai = getAi();
    if (!ai) {
      // Fallback response with simulated fitness expert logic
      const fallbackMsg = getSimulatedFitnessResponse(message);
      res.json({ text: fallbackMsg, fallback: true });
      return;
    }

    // Format chat history for Gemini API
    // The gemini-3.5-flash model requires contents/chats structure or direct generation.
    // For simplicity, we can feed the chat history in the prompt context to ensure maximum reliability of replies.
    const formattedHistory = (history || [])
      .map((h: { sender: string; text: string }) => `${h.sender === "user" ? "User" : "Coach"}: ${h.text}`)
      .join("\n");

    const prompt = `You are a professional certified Fitness & Diet Coach.
Answer the user's health, exercise, diet, or lifestyle question with helpful, encouraging, and accurate advice.
Keep the advice actionable, structured, and easy to read.

=== Chat History ===
${formattedHistory}

=== Current User Question ===
${message}

Please reply in markdown:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an encouraging, certified, highly professional virtual fitness and nutrition trainer who provides scientific, safe, and positive fitness and meal guidance. Use list formatting, bullet points, and highlight terms.",
      },
    });

    res.json({ text: response.text || "I'm sorry, I couldn't process your request." });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Helper for smart simulation fallback
function getSimulatedFitnessResponse(userMsg: string): string {
  const msg = userMsg.toLowerCase();
  
  if (msg.includes("bmi") || msg.includes("body mass index")) {
    return `### 📊 Understanding Your BMI\n\nBMI (Body Mass Index) is a useful general screening tool to determine if your weight is in a healthy range relative to your height:\n\n* **Underweight:** BMI below 18.5\n* **Normal weight:** BMI 18.5 to 24.9\n* **Overweight:** BMI 25 to 29.9\n* **Obese:** BMI 30 or above\n\n**Actionable Advice:**\n1. Use our calculator to determine your precise BMI.\n2. Combine BMI measurements with measurements like **waist-to-hip ratio** and **daily physical activity levels** for a more comprehensive health overview.`;
  }
  
  if (msg.includes("weight loss") || msg.includes("lose weight") || msg.includes("deficit") || msg.includes("fat")) {
    return `### 🔥 Expert Guide to Safe & Sustainable Fat Loss\n\nTo lose weight effectively, prioritize a sustainable routine rather than extreme diets:\n\n* **Caloric Deficit:** Aim for a modest 300-500 kcal deficit daily.\n* **High-Protein Intake:** Eat 1.6g to 2.0g of protein per kg of body weight to retain skeletal muscle.\n* **Strength Training:** Aim for at least 3-4 sessions per week of resistance exercises.\n* **Consistent Sleep:** Sleep 7-8 hours per night to regulate hormones like leptin and ghrelin.\n\n*Try enrolling in our **Weight Loss Diet** or our custom **Fat Burning Workout** under the Programs catalog!*`;
  }

  if (msg.includes("muscle") || msg.includes("gain") || msg.includes("bulking") || msg.includes("strength")) {
    return `### 💪 Bulking and Hypertrophy Strategy\n\nTo build strength and size safely:\n\n* **Caloric Surplus:** Aim for a small surplus (~200 to 400 kcal above maintenance).\n* **Progressive Overload:** Increase weights or volume incrementally week-by-week.\n* **Protein-Rich Meals:** Incorporate eggs, lean meats, beans, tofu, and Greek yogurt.\n* **Active Recovery:** Stretch or do mobility workouts like yoga between heavy lifts.\n\n*Check out our **Gym Workout** and **High Protein Diet** pages for specialized programs!*`;
  }

  if (msg.includes("hello") || msg.includes("hi ") || msg.includes("hey")) {
    return `### 👋 Hello! I'm your Fitness & Nutrition Assistant!\n\nWelcome to **Fitness Coach**! I am here to help you design workouts, build a personalized meal plan, explain your BMI outputs, or answer any daily training and nutrition question you have!\n\nHow can I help you today? You can ask me things like:\n\n* *"How do I design a home workout plan without dumbbells?"*\n* *"What are the best vegetarian sources of plant protein?"*\n* *"What is a good macronutrient ratio for active adults?"*`;
  }

  return `### 🥗 Fitness Coach Assistant Response\n\nThank you for asking! For a premium experience, enable the Gemini API Key or consult our specialized pages. Here are general health recommendations:\n\n* **Consistency Over Intensity:** 30 minutes of daily moderate activity is significantly better than one intense session per week.\n* **Hydration First:** Drink at least 3-4 liters of water daily to maintain energy and metabolic performance.\n* **Whole Foods:** Fill 50% of your plate with colorful vegetables, 25% with lean protein, and 25% with complex whole carbohydrates.\n\nLet me know if you would like specific nutrition guidelines, dynamic calorie targets, or targeted exercise guides!`;
}

// 2. Vite and Static Asset Pipeline Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app._router.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is booted and running securely at http://localhost:${PORT}`);
  });
}

startServer();
