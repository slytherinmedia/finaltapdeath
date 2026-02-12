
import React, { useState, useCallback, useEffect } from 'react';
import CalculatorForm from './components/CalculatorForm';
import ResultDisplay from './components/ResultDisplay';
import QuotesCarousel from './components/QuotesCarousel';
import { INITIAL_HABITS } from './constants';
import { UserHabits, CalculationResult } from './types';
import { calculateRemainingLife } from './services/longevityService';
import { getDevilishAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [habits, setHabits] = useState<UserHabits>(INITIAL_HABITS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'calculator' | 'result'>('calculator');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const handleHabitChange = useCallback((updates: Partial<UserHabits>) => {
    setHabits(prev => ({ ...prev, ...updates }));
  }, []);

  const handleCalculate = async () => {
    setLoading(true);
    setView('result');
    const calc = calculateRemainingLife(habits);
    const advice = await getDevilishAdvice(habits, calc.rawRemainingYears);
    setResult({
      userName: habits.name,
      remainingYears: calc.years,
      remainingMonths: calc.months,
      remainingDays: calc.days,
      endDate: calc.endDate,
      advice,
      chartData: calc.chartData
    });
    setLoading(false);
  };

  const handleReset = () => {
    setResult(null);
    setView('calculator');
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-red-900 selection:text-white">
      <header className="sticky top-0 z-50 bg-black/85 backdrop-blur-xl border-b border-red-900/30 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <i className="fas fa-fire text-red-600 text-2xl animate-pulse"></i>
            <h1 className="text-2xl md:text-3xl font-hell text-red-600 fire-glow cursor-default select-none">FINAL TAP</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-[10px] text-green-500 font-bold uppercase tracking-widest bg-green-950/30 px-3 py-1 rounded-full border border-green-900 shadow-sm shadow-green-900/50">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Secure Tunnel Active
            </div>
            <div className="text-red-900 font-spooky text-lg hidden md:block tracking-widest opacity-80">
              SINCE THE BEGINNING OF TIME
            </div>
          </div>
        </div>
      </header>

      <section className="w-full bg-black/40 border-b border-red-900/10 backdrop-blur-sm">
        <div className="py-4 text-center uppercase text-[10px] tracking-[1em] text-red-900 font-bold opacity-40 select-none">
          Ancient Echoes of Mortality
        </div>
        <QuotesCarousel />
      </section>

      <main className="container mx-auto px-4 py-8 md:py-16 flex-grow relative z-10">
        {view === 'calculator' && (
          <div className="text-center mb-16 animate-in fade-in slide-in-from-top-6 duration-1000">
            <div className="relative inline-block mb-8">
               <i className="fas fa-skull text-red-900/80 text-8xl flicker"></i>
               <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-600 rounded-full blur-md animate-pulse"></div>
            </div>
            <h2 className="text-5xl md:text-7xl font-spooky text-red-600 mb-6 uppercase tracking-wider">How much time is left?</h2>
            <p className="text-stone-500 text-lg md:text-2xl max-w-2xl mx-auto italic px-6 font-light leading-relaxed">
              "Your biological ledger is open. Confess your habits and see the date of your final departure."
            </p>
          </div>
        )}

        {view === 'calculator' ? (
          <div className="reveal-animation">
            <CalculatorForm 
              habits={habits} 
              onChange={handleHabitChange} 
              onCalculate={handleCalculate} 
            />
          </div>
        ) : (
          <ResultDisplay 
            result={result!} 
            loading={loading} 
            onReset={handleReset} 
          />
        )}
      </main>

      <footer className="bg-stone-950 p-12 md:p-20 border-t border-red-950 text-center relative z-10 overflow-hidden">
        {/* Decorative elements for footer */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-900/0 via-red-900/50 to-red-900/0"></div>
        
        <div className="flex justify-center gap-10 mb-12 text-stone-700 text-2xl">
          <i className="fab fa-facebook-f hover:text-red-800 transition-all cursor-pointer hover:scale-125"></i>
          <i className="fab fa-instagram hover:text-red-800 transition-all cursor-pointer hover:scale-125"></i>
          <i className="fab fa-twitter hover:text-red-800 transition-all cursor-pointer hover:scale-125"></i>
          <i className="fas fa-ghost hover:text-red-800 transition-all cursor-pointer hover:scale-125"></i>
        </div>
        
        <div className="space-y-4">
          <p className="text-red-800 font-hell text-sm opacity-50 uppercase tracking-[0.3em]">Official Portal of the Abyss</p>
          <p className="text-stone-500 text-[10px] md:text-xs max-w-2xl mx-auto uppercase tracking-widest leading-loose px-4">
            DISCLAIMER: THIS APPLICATION USES BIOMETRIC PROJECTION AND AI-DRIVEN LONGEVITY MODELS. 
            IT IS NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE. DO NOT MAKE MEDICAL DECISIONS BASED ON THIS CALCULATOR.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] text-stone-800 uppercase tracking-widest">
            © {new Date().getFullYear()} Final Tap Industries • Encrypted By The Underworld
          </div>
          <div className="flex gap-6 text-[10px] text-stone-700 font-bold uppercase tracking-tighter">
            <span className="hover:text-red-900 cursor-pointer">Terms of Service</span>
            <span className="hover:text-red-900 cursor-pointer">Soul Privacy Policy</span>
            <span className="hover:text-red-900 cursor-pointer">Keeper's Ledger</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
