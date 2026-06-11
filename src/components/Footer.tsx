import React from "react";
import { Dumbbell, Github, Twitter, Youtube, Award, ShieldCheck } from "lucide-react";

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-navy dark:bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Colon 1 - Branding */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary-green flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-secondary-navy" />
            </div>
            <span className="text-lg font-black tracking-wider font-display pr-1">FITNESS COACH</span>
          </div>
          
          <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
            Your Premium Health & Wellness E-Commerce Ecosystem. Unifying clinical-grade BMI diagnostics, personalized metabolic menu plans, physical equipment checkouts, and 1-on-1 certified trainer consultations.
          </p>

          <div className="flex gap-3 text-gray-400 pt-2">
            <a href="#" className="p-2 bg-slate-900 hover:bg-primary-green hover:text-secondary-navy rounded-lg transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-slate-900 hover:bg-primary-green hover:text-secondary-navy rounded-lg transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-slate-900 hover:bg-primary-green hover:text-secondary-navy rounded-lg transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Colon 2 */}
        <div className="md:col-span-2 space-y-3 col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-primary-green">Syllabus Programs</h4>
          <ul className="space-y-2 text-xs text-gray-400 font-medium">
            <li><button onClick={() => onNavigate("programs")} className="hover:text-white transition-colors">Fat Shredding Blueprint</button></li>
            <li><button onClick={() => onNavigate("programs")} className="hover:text-white transition-colors">Hypertrophy Catalyst</button></li>
            <li><button onClick={() => onNavigate("programs")} className="hover:text-white transition-colors">Zero-Equipment Home Workout</button></li>
            <li><button onClick={() => onNavigate("programs")} className="hover:text-white transition-colors">Power Ashtanga Vinyasa</button></li>
          </ul>
        </div>

        {/* Colon 3 */}
        <div className="md:col-span-2 space-y-3 col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-primary-green">E-Commerce Access</h4>
          <ul className="space-y-2 text-xs text-gray-400 font-medium">
            <li><button onClick={() => onNavigate("shop")} className="hover:text-white transition-colors">Resistance Bands</button></li>
            <li><button onClick={() => onNavigate("shop")} className="hover:text-white transition-colors">Adjustable Dumbbells</button></li>
            <li><button onClick={() => onNavigate("shop")} className="hover:text-white transition-colors">Eco Posture Mats</button></li>
            <li><button onClick={() => onNavigate("shop")} className="hover:text-white transition-colors"> Cyclone Shaker Cups </button></li>
          </ul>
        </div>

        {/* Colon 4 */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-primary-green">Contact & Support</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Support Line: **support@fitnesscoach.app**<br />
            Business Hours: Mon - Fri: 08:00 AM - 05:00 PM UTC
          </p>

          <div className="flex items-center gap-1.5 p-3.5 bg-slate-900 border border-white/5 rounded-xl text-[10px] text-gray-300">
            <ShieldCheck className="w-5 h-5 text-success-emerald shrink-0" />
            <span>This e-commerce flow uses PCI-Compliant mock payment APIs. Safely input transactions.</span>
          </div>
        </div>

      </div>

      {/* FOOTER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <p>&copy; {currentYear} Fitness Coach Marketplace Ecosystem. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Legal Term Conditions</a>
          <a href="#" className="hover:underline">HIPAA Data Protection Policy</a>
          <a href="#" className="hover:underline">Cookie preferences</a>
        </div>
      </div>

    </footer>
  );
}
