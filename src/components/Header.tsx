import React, { useState } from "react";
import { Dumbbell, ShoppingCart, User, Menu, X, ShieldAlert, Moon, Sun, Heart, Award } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  isDark: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({
  currentTab,
  onNavigate,
  cartCount,
  wishlistCount,
  isDark,
  onToggleDarkMode
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "home", label: "Home" },
    { id: "assessment", label: "BMI Assessment" },
    { id: "programs", label: "Workouts" },
    { id: "diets", label: "Macro Diets" },
    { id: "shop", label: "Market Store" },
    { id: "coaches", label: "Consult Coach" },
    { id: "dashboard", label: "My Dashboard" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-bg/95 border-b border-gray-105 dark:border-slate-900 shadow-sm backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-green to-primary-green-light flex items-center justify-center shadow shadow-emerald-500/10">
              <Dumbbell className="w-5 h-5 text-secondary-navy" />
            </div>
            <div>
              <span className="text-lg font-black text-secondary-navy dark:text-white tracking-tight font-display pr-1">FITNESS</span>
              <span className="text-xs bg-primary-green/10 text-primary-green font-bold px-2 py-0.5 rounded-full select-none">COACH</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                id={`nav_tab_desktop_${item.id}`}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  currentTab === item.id
                    ? "bg-primary-green/10 text-primary-green"
                    : "text-gray-600 dark:text-gray-305 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Core CTAs / Shopping indicators */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Wishlist Indicator */}
            {wishlistCount > 0 && (
              <button
                id="btn_desktop_wishlist_summary"
                onClick={() => onNavigate("shop")}
                className="relative p-2 text-gray-400 hover:text-rose-500 transition-colors"
                title={`${wishlistCount} saved products`}
              >
                <Heart className="w-5 h-5 fill-current text-rose-500" />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white dark:border-dark-bg">
                  {wishlistCount}
                </span>
              </button>
            )}

            {/* Cart link */}
            <button
              id="btn_desktop_cart_summary"
              onClick={() => onNavigate("shop")}
              className="relative p-2 text-gray-500 dark:text-gray-250 hover:text-primary-green transition-all cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-green text-secondary-navy text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white dark:border-dark-bg">
                  {cartCount}
                </span>
              )}
            </button>



            {/* Sticky Account CTA */}
            <button
              id="btn_desktop_account_cta"
              onClick={() => onNavigate("dashboard")}
              className="px-4 py-2 bg-gradient-to-r from-secondary-navy to-slate-800 dark:from-primary-green dark:to-primary-green-light dark:text-dark-bg text-white font-bold text-xs rounded-xl shadow hover:opacity-95 flex items-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              Portal Access
            </button>
          </div>

          {/* Mobile controllers bar */}
          <div className="flex lg:hidden items-center gap-3">


            {/* Cart preview */}
            <button
              id="btn_mobile_cart"
              onClick={() => onNavigate("shop")}
              className="relative p-1.5 text-gray-500 dark:text-gray-300"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-green text-secondary-navy text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Burger toggle */}
            <button
              id="btn_mobile_burger_toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-gray-600 dark:text-gray-250"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div id="drawer_mobile_menu" className="lg:hidden px-4 pt-2 pb-4 border-t dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5 text-left animate-fade-in shadow-inner">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              id={`nav_tab_mobile_${item.id}`}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentTab === item.id
                  ? "bg-primary-green/10 text-primary-green"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t">
            <button
              id="btn_mobile_account_direct"
              onClick={() => {
                onNavigate("dashboard");
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-gradient-to-r from-primary-green to-primary-green-light text-secondary-navy text-center font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
            >
              <User className="w-4 h-4" />
              Member Portal Access
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
