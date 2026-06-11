import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Dumbbell, Sparkles, User, RefreshCw, ChevronUp, Bot, Mic, MicOff, Volume2, VolumeX } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "### 👋 Welcome to Fitness Coach AI!\n\nI am your qualified 24/7 Virtual Strength Coach & Nutritionist. I can assist you with:\n\n* **Custom workouts** based on your equipment\n* **Custom meal plans** & snack recommendations\n* Explain your **BMI findings** and recovery strategies\n* Answer nutrition safety questions.\n\n*How can I help you accelerate your progress today?*",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Voice Assistant States
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState<any | null>(null);
  const [voices, setVoices] = useState<any[]>([]);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "How do I lose weight safely?",
    "Suggest a simple high-protein snack.",
    "BMR vs BMI: What is the difference?",
    "Show me a quick 10-minute home workout."
  ];

  // Load and subscribe to speechSynthesis voices local on user's device
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        // Preference for standard high-quality English speaking voices
        const defaultVoice = availableVoices.find(v => v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Natural"))) || 
                             availableVoices.find(v => v.lang.startsWith("en")) || 
                             availableVoices[0];
        setSelectedVoice(defaultVoice || null);
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Clean and speak bot message dynamically
  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;

    // Direct termination of any current playback
    window.speechSynthesis.cancel();

    // Humanistic scrub of markdown symbols so physical text sounds highly professional
    const cleanSpeech = text
      .replace(/###\s+/g, "")
      .replace(/##\s+/g, "")
      .replace(/#\s+/g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/-\s+/g, "")
      .replace(/^\d+\.\s+/g, "")
      .replace(/\((.*?)\)/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = 1.05; // Energized coach speed rate
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const startSpeechRecognition = () => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setRecognitionError("Speech recognition is not supported in this browser. Please use Chrome, Safari or Edge.");
      return;
    }

    if (isListening) {
      // Toggle off if active
      setIsListening(false);
      return;
    }

    // Cancel existing speaker audio on start
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setRecognitionError(null);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript && transcript.trim()) {
        handleSendMessage(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "not-allowed") {
        setRecognitionError("Microphone access denied. Please allow microphone permissions.");
      } else if (event.error === "no-speech") {
        setRecognitionError("No speech detected. Speak clearly into your mic.");
      } else {
        setRecognitionError(`Assistant ear error: ${event.error}`);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Terminate any ongoing speech immediately before sending user query
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const userMsg: Message = {
      id: `msg_${Date.now()}_u`,
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    // Build chat history context
    const recentHistory = messages.slice(-8).map(m => ({
      sender: m.sender,
      text: m.text
    }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: recentHistory
        })
      });

      if (!response.ok) {
        throw new Error("Failed to reach server");
      }

      const data = await response.json();
      const responseText = data.text || "I was unable to formulate a plan. Please try again.";
      
      const botMsg: Message = {
        id: `msg_${Date.now()}_b`,
        sender: "bot",
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
      speakText(responseText);
    } catch (err) {
      // Offline fallback safety guidance based on prompt keywords
      const simulatedText = getClientFallbackResponse(textToSend);
      const botMsg: Message = {
        id: `msg_${Date.now()}_b`,
        sender: "bot",
        text: simulatedText + "\n\n*(Active offline diagnostic helper mode)*",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      speakText(simulatedText);
    } finally {
      setIsLoading(false);
    }
  };

  const parseMarkdown = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let content = line;
      
      if (content.startsWith("### ")) {
        return <h4 key={idx} className="text-base font-bold text-gray-900 dark:text-white mt-3 mb-1 font-display">{content.replace("### ", "")}</h4>;
      }
      if (content.startsWith("## ")) {
        return <h3 key={idx} className="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2 font-display">{content.replace("## ", "")}</h3>;
      }
      if (content.startsWith("# ")) {
        return <h2 key={idx} className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2 font-display">{content.replace("# ", "")}</h2>;
      }
      
      const isListItem = content.startsWith("* ") || content.startsWith("- ");
      if (isListItem) {
        const cleanText = content.replace(/^[*-\s]+/, "");
        return (
          <li key={idx} className="ml-4 list-disc text-sm text-gray-700 dark:text-gray-300 my-1 leading-relaxed">
            {formatBold(cleanText)}
          </li>
        );
      }

      const isNumList = /^\d+\.\s/.test(content);
      if (isNumList) {
        const cleanText = content.replace(/^\d+\.\s/, "");
        return (
          <li key={idx} className="ml-4 list-decimal text-sm text-gray-700 dark:text-gray-300 my-1 leading-relaxed">
            {formatBold(cleanText)}
          </li>
        );
      }

      return (
        <p key={idx} className="text-sm text-gray-700 dark:text-gray-300 my-1 leading-relaxed">
          {formatBold(content)}
        </p>
      );
    });
  };

  const formatBold = (text: string) => {
    const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-semibold text-primary-green dark:text-primary-green-light">{part}</strong>;
      }
      return part;
    });
  };

  const getClientFallbackResponse = (userMsg: string): string => {
    const msg = userMsg.toLowerCase();
    if (msg.includes("bmi") || msg.includes("body mass index")) {
      return `### 📊 Advanced Guide: Understanding BMI Metrics\n\nBMI is a great simple baseline, but you should also track:\n\n* **Waist Circumference:** Correlates directly with visceral adiposity.\n* **Athletic Muscle Density:** Lift heavy weights twice weekly to maintain structural integrity.\n\n*Check out our **Assessment Tool** on the main navigation to get a deep-dive recommendation!*`;
    }
    if (msg.includes("protein") || msg.includes("egg") || msg.includes("chicken") || msg.includes("diet") || msg.includes("veg")) {
      return `### 🥗 Plant & Animal Protein Guideline\n\nAim to consume proteins uniformly across all your meals:\n\n* **For active adults:** 1.6g to 2.2g of protein per kg of bodyweight.\n* **Top animal seeds:** Chicken breast, eggs, wild salmon, and lean turkey.\n* **Top plant seeds:** Organic tempeh, edamame, and red split lentils.`;
    }
    return `### 👍 Custom Plan Initiated!\n\nI recommend continuing to log your physical metrics and daily food on our health dashboard. \n\n* **Tip of the Day:** Drink 350ml of clean water immediately upon waking to trigger quick hydration metabolic markers!`;
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        id="btn_open_chat"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-primary-green to-primary-green-light text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        aria-label="Open Fitness Coach Assistant"
      >
        <MessageSquare className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-semibold text-sm whitespace-nowrap">
          Trainer Chat AI
        </span>
      </button>

      {/* Chat Sidebar/Drawer Panel */}
      {isOpen && (
        <div id="panel_ai_chat" className="fixed inset-y-0 right-0 z-[60] w-full max-w-md bg-white dark:bg-dark-bg shadow-2xl flex flex-col border-l border-gray-100 dark:border-gray-800 transition-transform duration-300 ease-out transform translate-x-0">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-secondary-navy to-gray-900 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center ring-2 ring-primary-green-light">
                <Sparkles className="w-5 h-5 text-secondary-navy" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide font-display">FITNESS COACH AI</h3>
                <div className="flex items-center gap-1.5 text-xs text-primary-green-light">
                  <span className="w-2 h-2 rounded-full bg-success-emerald animate-ping" />
                  <span>Licensed Coach Bot</span>
                </div>
              </div>
            </div>
            <button
              id="btn_close_chat"
              onClick={() => {
                setIsOpen(false);
                if (typeof window !== "undefined" && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }}
              className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Voice Settings Sub-HUD */}
          <div className="bg-slate-100 dark:bg-slate-850 px-4 py-2.5 flex items-center justify-between border-b border-gray-200 dark:border-gray-805 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const val = !voiceEnabled;
                  setVoiceEnabled(val);
                  if (!val && typeof window !== "undefined" && window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                }}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md border font-semibold transition-all ${
                  voiceEnabled
                    ? "bg-primary-green/10 text-primary-green border-primary-green/20"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-400 border-transparent dark:text-gray-500"
                }`}
                title={voiceEnabled ? "Mute Voice Assistant" : "Enable Voice Assistant"}
              >
                {voiceEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Voice On</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Voice Off</span>
                  </>
                )}
              </button>

              {voiceEnabled && voices.length > 0 && (
                <select
                  value={selectedVoice?.name || ""}
                  onChange={(e) => {
                    const voice = voices.find((v) => v.name === e.target.value);
                    if (voice) setSelectedVoice(voice);
                  }}
                  className="bg-transparent text-gray-700 dark:text-gray-300 text-[11px] font-medium border-0 focus:ring-0 max-w-[130px] truncate"
                >
                  {voices
                    .filter((v) => v.lang.startsWith("en") || v.lang.startsWith("en-") || v.lang === "default")
                    .map((v) => (
                      <option key={v.name} value={v.name} className="dark:bg-slate-900 dark:text-white text-xs">
                        {v.name.replace(/Microsoft|Google|Apple/g, "").replace("Desktop", "").trim()}
                      </option>
                    ))}
                </select>
              )}
            </div>

            <button
              id="voice_speak_status"
              type="button"
              onClick={() => {
                if (isSpeaking && typeof window !== "undefined" && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                } else if (messages.length > 0) {
                  const lastBot = [...messages].reverse().find((m) => m.sender === "bot");
                  if (lastBot) speakText(lastBot.text);
                }
              }}
              className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${
                isSpeaking 
                  ? "text-accent-orange bg-accent-orange/10 border border-accent-orange/20" 
                  : "text-primary-green bg-primary-green/10 border border-primary-green/20"
              }`}
            >
              {isSpeaking ? "■ Mute Audio" : "▶ Read out"}
            </button>
          </div>

          {/* Real-time Voice Oscilloscope Wave HUD */}
          {(isListening || isSpeaking) && (
            <div className="bg-slate-950 px-4 py-3 border-b border-primary-green/20 flex flex-col items-center justify-center space-y-2 animate-fade-in shrink-0">
              <div className="flex items-center gap-1.5 justify-center h-8">
                <span className={`w-1 bg-gradient-to-t from-primary-green to-primary-green-light rounded-full transition-all duration-300 ${isListening ? "animate-pulse h-6" : isSpeaking ? "animate-bounce h-5" : "h-2"}`} />
                <span className={`w-1 bg-gradient-to-t from-accent-orange to-primary-green rounded-full transition-all duration-300 ${isListening ? "animate-pulse h-4 [animation-delay:0.1s]" : isSpeaking ? "animate-bounce h-7 [animation-delay:0.1s]" : "h-2"}`} />
                <span className={`w-1 bg-gradient-to-t from-primary-green to-accent-orange rounded-full transition-all duration-300 ${isListening ? "animate-pulse h-7 [animation-delay:0.2s]" : isSpeaking ? "animate-bounce h-4 [animation-delay:0.2s]" : "h-2"}`} />
                <span className={`w-1 bg-gradient-to-t from-primary-green-light to-primary-green rounded-full transition-all duration-300 ${isListening ? "animate-pulse h-5 [animation-delay:0.3s]" : isSpeaking ? "animate-bounce h-6 [animation-delay:0.3s]" : "h-2"}`} />
                <span className={`w-1 bg-gradient-to-t from-accent-orange to-primary-green-light rounded-full transition-all duration-300 ${isListening ? "animate-pulse h-3 [animation-delay:0.4s]" : isSpeaking ? "animate-bounce h-8 [animation-delay:0.4s]" : "h-2"}`} />
              </div>
              <p className="text-[10px] font-mono tracking-wider uppercase text-primary-green-light font-black flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-orange animate-ping" />
                {isListening ? "Coach Adrian is listening..." : "Coach Adrian is speaking..."}
              </p>
            </div>
          )}

          {/* Quick Context Tip */}
          <div className="bg-emerald-50 dark:bg-emerald-950/20 px-4 py-1.5 border-b border-emerald-105 dark:border-emerald-900/10 text-[10px] text-emerald-800 dark:text-emerald-300 flex items-center justify-between shrink-0">
            <span>Ask questions with voice, dictation, and spoken sound.</span>
            <Sparkles className="w-3 h-3 text-primary-green" />
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender !== "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary-navy dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary-green-light" />
                  </div>
                )}
                
                <div className={`max-w-[80%] rounded-2xl p-3.5 text-sm shadow-sm ${
                  m.sender === "user" 
                    ? "bg-primary-green text-white rounded-br-none" 
                    : "bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-gray-750"
                }`}>
                  {m.sender === "user" ? (
                    <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                  ) : (
                    <div className="space-y-1.5">{parseMarkdown(m.text)}</div>
                  )}
                  <div className={`text-[10px] mt-1.5 ${m.sender === "user" ? "text-white/70" : "text-gray-400"}`}>
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {m.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-primary-green/20 text-primary-green flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3.5 justify-start">
                <div className="w-8 h-8 rounded-full bg-secondary-navy flex items-center justify-center shrink-0 animate-spin">
                  <RefreshCw className="w-4 h-4 text-primary-green-light" />
                </div>
                <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 text-gray-500 rounded-2xl rounded-bl-none p-3 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-green animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-primary-green animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-primary-green animate-bounce [animation-delay:0.4s]" />
                  <span>Coach Adrian is formulating plans...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900 shrink-0">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Quick Coaching Topics</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="text-xs bg-gray-100 hover:bg-primary-green/10 dark:bg-slate-800 dark:hover:bg-primary-green/20 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full text-left transition-colors font-medium border border-gray-205 dark:border-gray-700 cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex gap-2"
            >
              {/* Specialized Voice Assistant microphone button */}
              <button
                id="btn_mic_input"
                type="button"
                onClick={startSpeechRecognition}
                className={`p-3 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer border ${
                  isListening
                    ? "bg-accent-orange border-accent-orange text-white animate-pulse shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-gray-600 dark:text-gray-300 border-gray-205 dark:border-gray-700"
                }`}
                title="Speak to Coach Adrian"
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 text-white" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>

              <input
                id="input_chat_text"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask diet or training advice..."}
                className="flex-1 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 focus:outline-none focus:ring-2 focus:ring-primary-green text-gray-900 dark:text-white"
                disabled={isLoading}
              />
              <button
                id="btn_send_chat"
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="p-3 bg-secondary-navy dark:bg-primary-green hover:opacity-90 disabled:opacity-50 text-white rounded-xl transition-all font-semibold flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
            
            {recognitionError && (
              <p className="text-[10.5px] text-center text-accent-orange font-semibold mt-1.5 animate-fadeIn">
                ⚠️ {recognitionError}
              </p>
            )}

            <p className="text-[10px] text-center text-gray-400 mt-2">
              Ensure physical exercise form is verified with professionals.
            </p>
          </div>

        </div>
      )}
    </>
  );
}

