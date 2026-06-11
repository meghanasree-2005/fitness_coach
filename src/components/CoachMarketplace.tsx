import React, { useState } from "react";
import { Star, Calendar, Clock, Video, UserCheck, ShieldAlert, CheckCircle, ArrowRight } from "lucide-react";
import { certifiedCoaches } from "../data";

export default function CoachMarketplace() {
  const [selectedCoach, setSelectedCoach] = useState<string>(certifiedCoaches[0].name);
  const [bookingDate, setBookingDate] = useState("2026-06-15");
  const [bookingTime, setBookingTime] = useState("10:00 AM");
  const [sessionType, setSessionType] = useState("video");
  const [notes, setNotes] = useState("");
  const [bookedState, setBookedState] = useState(false);

  const timeslots = ["09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"];

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedState(true);
    setTimeout(() => {
      alert(`Meeting booked successfully with ${selectedCoach} on ${bookingDate} at ${bookingTime}! A Google Meet link has been sent to busalameghana@gmail.com.`);
      setBookedState(false);
      setNotes("");
    }, 1200);
  };

  return (
    <div id="coach_marketplace_root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left">
      
      {/* HEADER BAR */}
      <div>
        <span className="text-xs font-black tracking-widest text-primary-green uppercase">Verified Coaches</span>
        <h1 className="text-3xl font-extrabold text-secondary-navy dark:text-white font-display">
          Personal Trainer & Dietitian Marketplace
        </h1>
        <p className="text-gray-500 text-sm mt-1 leading-relaxed">
          Hire premium, board-certified physical therapists, nutrition consultants, and biomechanics researchers for customized video consultations.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LISTINGS - 7 Columns */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-lg font-bold text-secondary-navy dark:text-white font-display">
            Active Research Coaches
          </h2>

          <div className="space-y-6">
            {certifiedCoaches.map((coach, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 transition-all ${
                  selectedCoach === coach.name 
                    ? "border-primary-green ring-2 ring-primary-green/20" 
                    : "border-gray-150 dark:border-slate-800"
                }`}
              >
                {/* Profile img */}
                <img src={coach.image} alt={coach.name} className="w-24 h-24 rounded-2xl object-cover border shrink-0 bg-gray-50" />
                
                {/* Info block */}
                <div className="space-y-3 flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-extrabold text-base text-gray-950 dark:text-white font-display">{coach.name}</h3>
                      <p className="text-xs text-primary-green font-bold">{coach.role}</p>
                    </div>

                    <button
                      id={`btn_pick_coach_${index}`}
                      onClick={() => setSelectedCoach(coach.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedCoach === coach.name
                          ? "bg-primary-green text-secondary-navy"
                          : "bg-slate-105 hover:bg-gray-150 text-gray-700 dark:bg-slate-800 dark:text-gray-300"
                      }`}
                    >
                      {selectedCoach === coach.name ? "✓ Coach Selected" : "Select Coach"}
                    </button>
                  </div>

                  <p className="text-[11px] font-mono text-gray-400 bg-slate-550 border border-gray-100 dark:border-slate-800 px-2.5 py-1.5 rounded-lg inline-block">
                    🎓 Cert: {coach.cert}
                  </p>

                  <p className="text-gray-500 dark:text-gray-350 text-xs leading-relaxed">
                    Adrian and team provide custom bodyweight calisthenics, progressive overload routines, and macro timing charts suited for high athletic outcomes.
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-amber-500 pt-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-black">{coach.rating}</span>
                    <span className="text-gray-400 text-[10px]">({coach.reviews} clinical study reviews)</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* BOOKING SCHEDULER FORM - 5 Columns */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-secondary-navy dark:text-white font-display flex items-center gap-2">
            <Video className="text-primary-green w-5 h-5" />
            Book Video Session
          </h2>

          <form onSubmit={handleBookSession} className="space-y-4">
            
            {/* selected coach indicator */}
            <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl space-y-1">
              <span className="text-[9px] font-black tracking-widest text-gray-400 block uppercase">Target Specialist</span>
              <p className="font-extrabold text-sm text-secondary-navy dark:text-white">{selectedCoach}</p>
            </div>

            {/* date picker */}
            <div>
              <label className="block text-xs font-bold text-gray-450 uppercase mb-1.5">Consultation Date</label>
              <input
                id="input_coach_book_date"
                type="date"
                required
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-xl text-xs text-secondary-navy dark:text-white"
              />
            </div>

            {/* timeslots grid */}
            <div>
              <label className="block text-xs font-bold text-gray-450 uppercase mb-2">Available timeslot (UTC)</label>
              <div className="grid grid-cols-3 gap-2">
                {timeslots.map((slot) => (
                  <button
                    key={slot}
                    id={`btn_slot_${slot.replace(" ", "_")}`}
                    type="button"
                    onClick={() => setBookingTime(slot)}
                    className={`py-2 text-[10px] font-bold border rounded-lg transition-all ${
                      bookingTime === slot
                        ? "bg-secondary-navy dark:bg-primary-green text-white dark:text-dark-bg border-transparent"
                        : "border-gray-200 text-gray-750 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-850"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* notes */}
            <div>
              <label className="block text-xs font-bold text-gray-450 uppercase mb-1.5">Session Objectives (Goals / Injuries)</label>
              <textarea
                id="input_coach_book_notes"
                rows={3}
                placeholder="List your training background, food allergies, or physical injury limitations..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-xl text-xs text-secondary-navy dark:text-white focus:outline-none"
              />
            </div>

            <button
              id="btn_submit_coachine_appointment"
              type="submit"
              disabled={bookedState}
              className="w-full py-3.5 bg-gradient-to-r from-primary-green to-primary-green-light text-secondary-navy font-black text-xs rounded-xl hover:opacity-95 text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Confirm Consultation Meeting
              <ArrowRight className="w-4 h-4 text-secondary-navy" />
            </button>

          </form>

          <p className="text-[10px] text-gray-400 text-center leading-relaxed">
            *Premium zoom integration has been scheduled securely. Free cancellation within 24 hours of booking.
          </p>
        </div>

      </div>

    </div>
  );
}
