import React, { useState } from "react";
import { PlusCircle, Flame, Droplet, User, Award, CheckSquare, Dumbbell, Sparkles, Scale, Trash2 } from "lucide-react";
import { FitnessLog } from "../types";
import { workoutPrograms } from "../data";

interface DashboardProps {
  enrolledProgramIds?: string[];
  onNavigate?: (tab: string) => void;
}

export default function DashboardView({ enrolledProgramIds = [], onNavigate }: DashboardProps) {
  const [logs, setLogs] = useState<FitnessLog[]>([
    { date: "2026-06-09", weightKg: 74.5, workoutsCompleted: 1, caloriesBurned: 450, waterIntakeCups: 8 },
    { date: "2026-06-10", weightKg: 74.2, workoutsCompleted: 0, caloriesBurned: 180, waterIntakeCups: 6 },
    { date: "2026-06-11", weightKg: 73.9, workoutsCompleted: 1, caloriesBurned: 520, waterIntakeCups: 9 }
  ]);

  // Logging states
  const [logDate, setLogDate] = useState("2026-06-12");
  const [logWeight, setLogWeight] = useState(73.5);
  const [logWorkouts, setLogWorkouts] = useState(1);
  const [logCalories, setLogCalories] = useState(480);
  const [logWater, setLogWater] = useState(8);

  const [waterCupsLogged, setWaterCupsLogged] = useState(8);

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: FitnessLog = {
      date: logDate,
      weightKg: logWeight,
      workoutsCompleted: logWorkouts,
      caloriesBurned: logCalories,
      waterIntakeCups: logWater
    };
    setLogs([newLog, ...logs]);
    alert("Metrics added successfully to local state storage!");
  };

  const handleDeleteLog = (idx: number) => {
    setLogs(logs.filter((_, i) => i !== idx));
  };

  // Metrics summary
  const totalWaterCups = logs.reduce((s, l) => s + l.waterIntakeCups, 0);
  const totalWorkouts = logs.reduce((s, l) => s + l.workoutsCompleted, 0);
  const totalCalories = logs.reduce((s, l) => s + l.caloriesBurned, 0);
  const averageWeight = logs.length > 0 ? (logs.reduce((s, l) => s + l.weightKg, 0) / logs.length).toFixed(1) : "0";

  // Filter active enrolled programs
  const activePrograms = workoutPrograms.filter((p) => enrolledProgramIds.includes(p.id));

  return (
    <div id="dashboard_view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left">
      
      {/* HEADER WIDGETS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-gray-150 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary-navy dark:text-white font-display">
            Athletic Performance Dashboard
          </h1>
          <p className="text-xs text-gray-400">
            Log your daily metrics, calibrate food limits, and track body fat reduction.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-green/10 text-primary-green font-bold text-xs rounded-full self-start md:self-auto whitespace-nowrap">
          <Award className="w-4 h-4 shrink-0" />
          Active Premium Member
        </span>
      </div>

      {/* BENCHMARKS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider">Average Weight</span>
            <Scale className="w-4 h-4 text-primary-green shrink-0" />
          </div>
          <p className="text-2xl font-black text-secondary-navy dark:text-white font-display">
            {averageWeight} <span className="text-xs font-medium text-gray-400">kg</span>
          </p>
          <p className="text-[10px] text-gray-400">calculated over logged history</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-rose-400">
            <span className="text-[11px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Calories Burned</span>
            <Flame className="w-4 h-4 text-rose-500 animate-pulse shrink-0" />
          </div>
          <p className="text-2xl font-black text-secondary-navy dark:text-white font-display">
            {totalCalories} <span className="text-xs font-medium text-gray-400">kcal</span>
          </p>
          <p className="text-[10px] text-gray-400">Total metabolic output</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-blue-400">
            <span className="text-[11px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Hydration Volume</span>
            <Droplet className="w-4 h-4 text-blue-500 shrink-0" />
          </div>
          <p className="text-2xl font-black text-secondary-navy dark:text-white font-display">
            {totalWaterCups} <span className="text-xs font-medium text-gray-400">cups</span>
          </p>
          <p className="text-[10px] text-gray-400">~ {(totalWaterCups * 0.25).toFixed(1)} Liters total</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-teal-400">
            <span className="text-[11px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Workouts Logged</span>
            <Dumbbell className="w-4 h-4 text-teal-500 shrink-0" />
          </div>
          <p className="text-2xl font-black text-secondary-navy dark:text-white font-display">
            {totalWorkouts} <span className="text-xs font-medium text-gray-400">completed</span>
          </p>
          <p className="text-[10px] text-gray-400">compliance state: Pro</p>
        </div>
      </div>

      {/* ACTIVE TRAINING BLUEPRINTS SECTION */}
      <div className="bg-gradient-to-br from-emerald-500/[0.02] to-primary-green/[0.05] border border-emerald-500/10 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="font-extrabold text-lg text-gray-900 dark:text-white font-display flex items-center gap-2">
              <Award className="text-primary-green w-5 h-5 animate-pulse" />
              Active Training Blueprints
            </h3>
            <p className="text-xs text-gray-400">Track and view workout curriculums with certified professional coaches</p>
          </div>
          {onNavigate && (
            <button
              id="btn_dash_browse_more_progs"
              onClick={() => onNavigate("programs")}
              className="px-4 py-2 bg-primary-green text-secondary-navy font-black text-xs rounded-xl shadow-sm hover:shadow hover:bg-primary-green-light transition-all cursor-pointer"
            >
              Browse Gym Catalog
            </button>
          )}
        </div>

        {activePrograms.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {activePrograms.map((prog) => (
              <div key={prog.id} className="bg-white dark:bg-slate-900/80 border border-gray-150 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                    <img src={prog.image} className="w-16 h-16 rounded-xl object-cover shadow shrink-0" alt={prog.name} />
                    <div className="space-y-1 w-full min-w-0">
                      <span className="text-[9px] bg-primary-green/10 text-primary-green px-2 py-0.5 rounded font-black uppercase tracking-wider inline-block">
                        ★ Coach {prog.coach}
                      </span>
                      <h4 className="font-extrabold text-sm text-gray-900 dark:text-white font-display truncate">{prog.name}</h4>
                      <p className="text-[11px] text-gray-400 line-clamp-1">{prog.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] mt-4 border-t border-b border-gray-50 dark:border-slate-850 py-2">
                    <div className="min-w-0">
                      <p className="text-gray-400 font-bold uppercase text-[8px] truncate">Duration</p>
                      <p className="font-extrabold text-gray-800 dark:text-gray-200 mt-0.5 truncate">{prog.durationWeeks} wk</p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-400 font-bold uppercase text-[8px] truncate">Burn Output</p>
                      <p className="font-extrabold text-emerald-500 mt-0.5 truncate">~{prog.totalCaloriesBurned} kcal</p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-400 font-bold uppercase text-[8px] truncate">Weekly Reps</p>
                      <p className="font-extrabold text-gray-800 dark:text-gray-200 mt-0.5 truncate">{prog.exercises.length} Ex</p>
                    </div>
                  </div>

                  {/* Active Syllabus days preview */}
                  <div className="mt-3 space-y-1.5 text-left">
                    <p className="text-[9px] text-gray-400 font-extrabold uppercase tracking-wider">Active Exercise Schedule</p>
                    <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                      {prog.schedule.slice(0, 3).map((day, dIdx) => (
                        <span key={dIdx} className="text-[10px] px-2 py-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 rounded font-medium whitespace-nowrap">
                          {day}
                        </span>
                      ))}
                      {prog.schedule.length > 3 && (
                        <span className="text-[10px] px-2 py-1 bg-gray-50 dark:bg-slate-800 text-gray-450 rounded font-medium whitespace-nowrap">
                          +{prog.schedule.length - 3} more days
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-50 dark:border-slate-850 mt-1">
                  <button
                    id={`btn_dash_active_syllabus_${prog.id}`}
                    onClick={() => {
                      alert(`Lead Plan exercises led by Coach ${prog.coach}:\n\n` + prog.exercises.map(ex => `• ${ex.name} - ${ex.sets} sets x ${ex.reps}`).join("\n"));
                    }}
                    className="flex-1 py-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 text-[11px] font-bold rounded-lg cursor-pointer transition-colors"
                  >
                    View Class Syllabus
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6 text-center space-y-3">
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              You are not enrolled in any professional athletic plans yet. Activate a training routine from our catalog to configure personalized biometrics guidelines.
            </p>
            {onNavigate && (
              <button
                id="btn_dash_navigate_catalog"
                onClick={() => onNavigate("programs")}
                className="inline-block px-5 py-2 hover:bg-primary-green/10 text-primary-green border border-primary-green/20 hover:border-primary-green/45 text-xs font-bold rounded-xl cursor-pointer transition-all"
              >
                Go to Workout Catalog
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LOG FORM - 5 Columns */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850 p-6 rounded-2xl space-y-5">
          <h3 className="font-bold text-base text-gray-900 dark:text-white font-display flex items-center gap-2">
            <PlusCircle className="text-primary-green w-5 h-5" />
            Append Fitness entry
          </h3>

          <form onSubmit={handleCreateLog} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-gray-450 uppercase mb-1">Date</label>
              <input
                id="input_log_date"
                type="date"
                required
                value={logDate}
                onChange={(e) => setLogDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border p-2 rounded-xl text-xs text-gray-950 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-450 uppercase mb-1">Weight (kg)</label>
                <input
                  id="input_log_weight"
                  type="number"
                  step="0.1"
                  required
                  value={logWeight}
                  onChange={(e) => setLogWeight(parseFloat(e.target.value) || 70)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border p-2 rounded-xl text-xs text-secondary-navy dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-450 uppercase mb-1">Workouts Logged</label>
                <input
                  id="input_log_workout_qty"
                  type="number"
                  min="0"
                  max="5"
                  required
                  value={logWorkouts}
                  onChange={(e) => setLogWorkouts(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border p-2 rounded-xl text-xs text-secondary-navy dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-450 uppercase mb-1">Calories Burned</label>
                <input
                  id="input_log_calories"
                  type="number"
                  required
                  value={logCalories}
                  onChange={(e) => setLogCalories(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border p-2 rounded-xl text-xs text-secondary-navy dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-450 uppercase mb-1">Water Cups</label>
                <input
                  id="input_log_water"
                  type="number"
                  required
                  value={logWater}
                  onChange={(e) => setLogWater(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border p-2 rounded-xl text-xs text-secondary-navy dark:text-white"
                />
              </div>
            </div>

            <button
              id="submit_fitness_log"
              type="submit"
              className="w-full py-3 bg-secondary-navy dark:bg-primary-green dark:text-dark-bg font-bold rounded-xl text-xs text-white"
            >
              Add Entry to Analytics
            </button>
          </form>

          {/* DYNAMIC WATER INTAKE BAR */}
          <div className="pt-4 border-t border-gray-100 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-500">💧 Live Water Quick Log</span>
              <span className="text-blue-500 font-bold">{waterCupsLogged} / 12 cups</span>
            </div>
            
            <input
              id="slider_quick_water"
              type="range"
              min="0"
              max="16"
              value={waterCupsLogged}
              onChange={(e) => setWaterCupsLogged(parseInt(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            
            <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-400 gap-1">
              <span className="truncate" title="0 (Dry)">0 (Dry)</span>
              <span className="truncate" title="8 (Target)">8 (Target)</span>
              <span className="truncate" title="16 (Hydrated)">16 (Hydrated)</span>
            </div>
          </div>

        </div>

        {/* LOG HISTORY TABLE - 7 Columns */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850 p-6 rounded-2xl space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-gray-900 dark:text-white font-display">
              📅 Historic Entry Logs
            </h3>
            <span className="text-[10px] text-gray-400">Sorted by newest</span>
          </div>

          <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[550px] text-xs text-left">
              <thead>
                <tr className="border-b text-gray-400">
                  <th className="pb-2.5">Date</th>
                  <th className="pb-2.5">Weight</th>
                  <th className="pb-2.5">Workouts</th>
                  <th className="pb-2.5">Calories Output</th>
                  <th className="pb-2.5">Water Cups</th>
                  <th className="pb-2.5 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-slate-800/60">
                {logs.map((log, idx) => (
                  <tr key={idx} className="text-gray-700 dark:text-gray-250">
                    <td className="py-3.5 font-medium">{log.date}</td>
                    <td className="py-3.5 font-mono">{log.weightKg} kg</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${log.workoutsCompleted > 0 ? "bg-teal-50 text-teal-600 dark:bg-teal-950/20" : "bg-gray-100 text-gray-400"}`}>
                        {log.workoutsCompleted} done
                      </span>
                    </td>
                    <td className="py-3.5 text-rose-500 font-semibold font-mono">{log.caloriesBurned} kcal</td>
                    <td className="py-3.5 text-blue-500 font-semibold font-mono">{log.waterIntakeCups} cups</td>
                    <td className="py-3.5 text-right">
                      <button
                        id={`btn_del_log_item_${idx}`}
                        onClick={() => handleDeleteLog(idx)}
                        className="p-1 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-rose-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
