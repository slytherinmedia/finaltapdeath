
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

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const handleHabitChange = useCallback((updates: Partial<UserHabits>) => {
    setHabits(prev => ({ ...prev, ...updates }));
  }, []);

  const handleCalculate = async () => {
    setLoading(true);
    setView('result');
    
    // Core calculation logic
    const calc = calculateRemainingLife(habits);
    
    // Get advice from Gemini
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
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-red-900/30 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <i className="fas fa-fire text-red-600 text-2xl animate-pulse"></i>
            <h1 className="text-2xl md:text-3xl font-hell text-red-600 fire-glow cursor-default">FINAL TAP</h1>
          </div>
          <div className="text-red-900 font-spooky text-lg hidden md:block tracking-widest">
            SINCE THE BEGINNING OF TIME
          </div>
        </div>
      </header>

      {/* Moved Quotes Section to the top as requested */}
      <section className="w-full bg-black/40 border-b border-red-900/20 backdrop-blur-sm">
        <div className="py-4 text-center uppercase text-[10px] tracking-[1em] text-red-900 font-bold opacity-50">
          Echos of Mortality
        </div>
        <QuotesCarousel />
      </section>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-10 flex-grow relative z-10">
        {view === 'calculator' && (
          <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
            <i className="fas fa-skull text-red-800 text-7xl mb-6 flicker"></i>
            <h2 className="text-6xl font-spooky text-red-500 mb-4 uppercase">How much time is left?</h2>
            <p className="text-stone-400 text-xl max-w-2xl mx-auto italic">
              "Tell me your sins, and I will show you your end."
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

      {/* Footer */}
      <footer className="bg-black/90 p-12 border-t border-red-900/50 text-center relative z-10">
        <div className="flex justify-center gap-8 mb-8 text-red-900 text-2xl">
          <i className="fab fa-facebook-f hover:text-red-600 transition-colors cursor-pointer"></i>
          <i className="fab fa-instagram hover:text-red-600 transition-colors cursor-pointer"></i>
          <i className="fab fa-twitter hover:text-red-600 transition-colors cursor-pointer"></i>
          <i className="fas fa-envelope hover:text-red-600 transition-colors cursor-pointer"></i>
        </div>
        <p className="text-red-700 font-hell text-sm mb-2 opacity-60">OWNED BY THE UNDERWORLD</p>
        <p className="text-stone-600 text-xs max-w-xl mx-auto uppercase tracking-tighter">
          THIS IS A GAME. WE ARE NOT DOCTORS. IF YOU FEEL SICK, SEE A HUMAN DOCTOR BEFORE THE DEVIL SEES YOU.
        </p>
      </footer>
    </div>
  );
};

export default App;
