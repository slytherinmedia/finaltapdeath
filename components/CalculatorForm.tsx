
import React from 'react';
import { UserHabits } from '../types';
import { MEDICAL_CONDITION_LIST } from '../constants';

interface Props {
  habits: UserHabits;
  onChange: (updates: Partial<UserHabits>) => void;
  onCalculate: () => void;
}

interface InputGroupProps {
  label: string;
  children: React.ReactNode;
  icon: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, children, icon }) => (
  <div className="mb-6 group">
    <label className="block text-red-500 font-bold mb-2 flex items-center gap-2 group-hover:text-red-400 transition-colors">
      <i className={`fas ${icon} text-red-700`}></i> {label}
    </label>
    {children}
  </div>
);

const CalculatorForm: React.FC<Props> = ({ habits, onChange, onCalculate }) => {
  const toggleCondition = (id: string) => {
    const current = habits.medicalConditions;
    const next = current.includes(id) 
      ? current.filter(c => c !== id) 
      : [...current, id];
    onChange({ medicalConditions: next });
  };

  return (
    <div className="bg-black/70 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-red-900/50 shadow-[0_0_80px_rgba(153,27,27,0.2)] max-w-5xl mx-auto">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-4xl md:text-5xl font-hell text-red-600 mb-4 text-center tracking-tighter fire-glow">The Sinner's Ledger</h2>
        <p className="text-stone-500 text-sm uppercase tracking-[0.4em]">Confess your biological debts</p>
      </div>
      
      {/* Name Input - Primary Focus */}
      <div className="mb-12 max-w-md mx-auto">
        <label className="block text-center text-red-400 font-hell text-sm mb-4">YOUR TRUE NAME</label>
        <input 
          type="text" 
          value={habits.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Who are you?"
          className="w-full bg-stone-900/50 border-b-2 border-red-900 text-3xl font-spooky text-red-500 text-center p-4 focus:border-red-500 outline-none transition-all placeholder:opacity-20"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
        {/* Basic Stats */}
        <InputGroup label="Gender" icon="fa-venus-mars">
          <select 
            value={habits.gender}
            onChange={(e) => onChange({ gender: e.target.value as any })}
            className="w-full input-hell"
          >
            <option value="male">Man</option>
            <option value="female">Woman</option>
            <option value="other">Other Spirit</option>
          </select>
        </InputGroup>

        <InputGroup label="Age" icon="fa-hourglass-start">
          <input 
            type="number" 
            value={habits.age} 
            onChange={(e) => onChange({ age: parseInt(e.target.value) || 0 })}
            className="w-full input-hell"
            placeholder="Years on earth"
          />
        </InputGroup>

        <InputGroup label="Height (cm)" icon="fa-ruler-vertical">
          <input 
            type="number" 
            value={habits.height} 
            onChange={(e) => onChange({ height: parseInt(e.target.value) || 0 })}
            className="w-full input-hell"
          />
        </InputGroup>

        <InputGroup label="Weight (kg)" icon="fa-weight-hanging">
          <input 
            type="number" 
            value={habits.weight} 
            onChange={(e) => onChange({ weight: parseInt(e.target.value) || 0 })}
            className="w-full input-hell"
          />
        </InputGroup>

        <InputGroup label="Smoking" icon="fa-smoking">
          <select 
            value={habits.smoking}
            onChange={(e) => onChange({ smoking: e.target.value as any })}
            className="w-full input-hell"
          >
            <option value="none">No Smoke</option>
            <option value="occasional">Rarely</option>
            <option value="light">Lightly</option>
            <option value="heavy">Often</option>
            <option value="chain">Chain Smoker</option>
          </select>
        </InputGroup>

        <InputGroup label="Drinking" icon="fa-wine-glass">
          <select 
            value={habits.drinking}
            onChange={(e) => onChange({ drinking: e.target.value as any })}
            className="w-full input-hell"
          >
            <option value="none">Pure (None)</option>
            <option value="rare">Rarely</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Everyday</option>
            <option value="binge">The Abyss (Binge)</option>
          </select>
        </InputGroup>

        <InputGroup label="Sleep (Hours)" icon="fa-moon">
          <input 
            type="number" 
            value={habits.sleep} 
            onChange={(e) => onChange({ sleep: parseInt(e.target.value) || 0 })}
            className="w-full input-hell"
          />
        </InputGroup>

        <InputGroup label="Screen Time (Hrs)" icon="fa-mobile-screen-button">
          <input 
            type="number" 
            value={habits.screenTime} 
            onChange={(e) => onChange({ screenTime: parseInt(e.target.value) || 0 })}
            className="w-full input-hell"
          />
        </InputGroup>

        <InputGroup label="Exercise (Mins)" icon="fa-bolt">
          <input 
            type="number" 
            value={habits.exercise} 
            onChange={(e) => onChange({ exercise: parseInt(e.target.value) || 0 })}
            className="w-full input-hell"
          />
        </InputGroup>

        <InputGroup label="Stress Level" icon="fa-brain">
          <select 
            value={habits.stress}
            onChange={(e) => onChange({ stress: e.target.value as any })}
            className="w-full input-hell"
          >
            <option value="calm">Calm & Zen</option>
            <option value="moderate">Normal Life</option>
            <option value="high">Stressed</option>
            <option value="soul-crushing">Soul-Crushing</option>
          </select>
        </InputGroup>

        <InputGroup label="Medical Checkup" icon="fa-stethoscope">
          <select 
            value={habits.medicalCheckup}
            onChange={(e) => onChange({ medicalCheckup: e.target.value as any })}
            className="w-full input-hell"
          >
            <option value="never">Never Go</option>
            <option value="rarely">Only if Dying</option>
            <option value="annually">Once a Year</option>
            <option value="bi-annually">Twice a Year</option>
          </select>
        </InputGroup>

        <InputGroup label="Sugar Demon" icon="fa-cookie-bite">
          <select 
            value={habits.sugar}
            onChange={(e) => onChange({ sugar: e.target.value as any })}
            className="w-full input-hell"
          >
            <option value="none">No Sugar</option>
            <option value="little">A little</option>
            <option value="lot">A lot</option>
            <option value="demon">Sugar Overlord</option>
          </select>
        </InputGroup>
      </div>

      <div className="mt-12 border-t border-red-950 pt-10">
        <label className="block text-red-500 font-bold mb-6 flex items-center gap-2">
          <i className="fas fa-heart-pulse text-red-700"></i> BIOLOGICAL FAULTS (Select all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {MEDICAL_CONDITION_LIST.map((condition) => (
            <div 
              key={condition.id}
              onClick={() => toggleCondition(condition.id)}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                habits.medicalConditions.includes(condition.id) 
                ? 'bg-red-900/30 border-red-600 text-red-400' 
                : 'bg-stone-900/40 border-stone-800 text-stone-500 hover:border-red-900'
              }`}
            >
              <span className="text-sm font-bold">{condition.label}</span>
              {habits.medicalConditions.includes(condition.id) && <i className="fas fa-check-circle"></i>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 border-t border-red-950 pt-10">
        <label className="flex items-center gap-4 cursor-pointer p-5 bg-stone-900/60 rounded-3xl hover:bg-stone-800 transition-all border border-transparent hover:border-red-900">
          <input 
            type="checkbox" 
            checked={habits.yoga}
            onChange={(e) => onChange({ yoga: e.target.checked })}
            className="w-6 h-6 accent-red-600"
          />
          <div className="flex flex-col">
            <span className="text-red-400 font-bold">Yoga/Meditation</span>
            <span className="text-xs text-stone-500">Healing for the spirit</span>
          </div>
        </label>
        
        <label className="flex items-center gap-4 cursor-pointer p-5 bg-stone-900/60 rounded-3xl hover:bg-stone-800 transition-all border border-transparent hover:border-red-900">
          <input 
            type="checkbox" 
            checked={habits.cityLiving}
            onChange={(e) => onChange({ cityLiving: e.target.checked })}
            className="w-6 h-6 accent-red-600"
          />
          <div className="flex flex-col">
            <span className="text-red-400 font-bold">City Dweller</span>
            <span className="text-xs text-stone-500">Living in high pollution</span>
          </div>
        </label>
      </div>

      <button 
        onClick={onCalculate}
        className="w-full mt-12 bg-gradient-to-r from-red-900 to-red-700 hover:from-red-700 hover:to-red-500 text-white font-hell py-6 rounded-3xl text-3xl transition-all hover:scale-[1.01] active:scale-95 shadow-[0_15px_40px_rgba(185,28,28,0.4)] border border-red-500/30"
      >
        REVEAL MY END
      </button>
    </div>
  );
};

export default CalculatorForm;
