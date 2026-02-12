
import React, { useEffect, useRef } from 'react';
import { CalculationResult } from '../types';

interface Props {
  result: CalculationResult;
  loading: boolean;
  onReset: () => void;
}

const ResultDisplay: React.FC<Props> = ({ result, loading, onReset }) => {
  const sinChartRef = useRef<HTMLCanvasElement>(null);
  const breakdownChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstances = useRef<{ sin?: any; breakdown?: any }>({});

  useEffect(() => {
    let timeoutId: number;

    const initCharts = () => {
      const ChartJS = (window as any).Chart;
      if (!ChartJS || !sinChartRef.current || !breakdownChartRef.current) return;

      // Force cleanup of any previous instances
      if (chartInstances.current.sin) {
        chartInstances.current.sin.destroy();
        chartInstances.current.sin = null;
      }
      if (chartInstances.current.breakdown) {
        chartInstances.current.breakdown.destroy();
        chartInstances.current.breakdown = null;
      }

      try {
        // Sin vs Virtue Chart
        chartInstances.current.sin = new ChartJS(sinChartRef.current, {
          type: 'bar',
          data: {
            labels: ['Sins', 'Virtues'],
            datasets: [{
              label: 'Impact Score',
              data: [result.chartData.sins, result.chartData.virtues],
              backgroundColor: ['#991b1b', '#166534'],
              borderColor: ['#f87171', '#4ade80'],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 2000, easing: 'easeOutQuart' },
            plugins: { 
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(0,0,0,0.9)',
                titleFont: { family: 'Nosifer', size: 10 },
                bodyFont: { family: 'Roboto', size: 12 },
                padding: 12
              }
            },
            scales: {
              y: { 
                beginAtZero: true,
                grid: { color: 'rgba(255, 255, 255, 0.05)' }, 
                ticks: { color: '#ef4444', font: { weight: 'bold' } } 
              },
              x: { 
                grid: { display: false },
                ticks: { color: '#ef4444', font: { weight: 'bold' } } 
              }
            }
          }
        });

        // Breakdown Chart
        chartInstances.current.breakdown = new ChartJS(breakdownChartRef.current, {
          type: 'pie',
          data: {
            labels: ['Substances', 'Mental', 'Diet', 'Lifestyle', 'Medical'],
            datasets: [{
              data: [
                Math.max(0.1, result.chartData.impactBreakdown.substances),
                Math.max(0.1, result.chartData.impactBreakdown.mental),
                Math.max(0.1, result.chartData.impactBreakdown.diet),
                Math.max(0.1, result.chartData.impactBreakdown.lifestyle),
                Math.max(0.1, result.chartData.impactBreakdown.medical)
              ],
              backgroundColor: ['#7f1d1d', '#4c0519', '#991b1b', '#450a0a', '#b91c1c'],
              borderColor: '#000',
              borderWidth: 2,
              hoverOffset: 30
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: 20 },
            plugins: { 
              legend: { 
                position: 'bottom', 
                labels: { 
                  color: '#fca5a5',
                  padding: 15,
                  font: { size: 11, family: 'Roboto' }
                } 
              } 
            }
          }
        });
      } catch (err) {
        console.error("Failed to initialize charts:", err);
      }
    };

    if (!loading && result) {
      // Small delay ensures the DOM is painted and container dimensions are set
      timeoutId = window.setTimeout(initCharts, 100);
    }

    return () => {
      window.clearTimeout(timeoutId);
      if (chartInstances.current.sin) chartInstances.current.sin.destroy();
      if (chartInstances.current.breakdown) chartInstances.current.breakdown.destroy();
    };
  }, [loading, result]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <div className="w-24 h-24 border-8 border-red-600 border-t-transparent rounded-full animate-spin mb-8 shadow-[0_0_30px_#dc2626]"></div>
        <p className="text-3xl font-hell text-red-500 animate-pulse">Calculating your fate, {result?.userName || 'Sinner'}...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-stone-950/90 border-4 border-red-900 p-6 md:p-12 rounded-[3rem] shadow-[0_0_100px_rgba(153,27,27,0.4)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-hell text-stone-500 mb-2 uppercase tracking-tighter opacity-70">The Final Count For</h2>
          <h3 className="text-5xl md:text-7xl font-spooky text-red-600 fire-glow uppercase break-words px-4">
            {result.userName || 'ANONYMOUS SINNER'}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          <div className="bg-black/60 p-6 md:p-10 rounded-3xl border-2 border-red-950/50 text-center transform hover:scale-105 transition-all group shadow-lg">
            <span className="block text-7xl md:text-9xl font-spooky text-red-500 mb-2 group-hover:fire-glow transition-all">
              {result.remainingYears}
            </span>
            <span className="text-lg md:text-xl uppercase tracking-widest text-red-900 font-bold block mt-2">Years Left</span>
          </div>
          <div className="bg-black/60 p-6 md:p-10 rounded-3xl border-2 border-red-950/50 text-center transform hover:scale-105 transition-all group shadow-lg">
            <span className="block text-7xl md:text-9xl font-spooky text-red-500 mb-2 group-hover:fire-glow transition-all">
              {result.remainingMonths}
            </span>
            <span className="text-lg md:text-xl uppercase tracking-widest text-red-900 font-bold block mt-2">Months Left</span>
          </div>
          <div className="bg-black/60 p-6 md:p-10 rounded-3xl border-2 border-red-950/50 text-center transform hover:scale-105 transition-all group shadow-lg">
            <span className="block text-7xl md:text-9xl font-spooky text-red-500 mb-2 group-hover:fire-glow transition-all">
              {result.remainingDays}
            </span>
            <span className="text-lg md:text-xl uppercase tracking-widest text-red-900 font-bold block mt-2">Days Left</span>
          </div>
        </div>

        <div className="text-center p-8 md:p-12 bg-red-950/30 rounded-[2.5rem] border-2 border-red-600/30 shadow-inner">
          <p className="text-xl md:text-2xl text-red-500 mb-4 font-hell opacity-80">Mark Your Calendar:</p>
          <p className="text-4xl md:text-7xl font-spooky text-white tracking-widest leading-tight">
            {result.endDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="mt-4 w-24 h-1 bg-red-600 mx-auto rounded-full opacity-50"></div>
        </div>
      </div>

      {/* Infernal Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-stone-950/95 border-2 border-red-950/50 p-6 md:p-8 rounded-[2.5rem] h-[450px] flex flex-col shadow-2xl">
          <h3 className="text-2xl font-spooky text-red-600 mb-6 text-center tracking-widest uppercase">The Moral Balance</h3>
          <div className="flex-grow relative">
            <canvas ref={sinChartRef}></canvas>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700 mt-6 text-center italic">Weight of your earthly decisions</p>
        </div>
        <div className="bg-stone-950/95 border-2 border-red-950/50 p-6 md:p-8 rounded-[2.5rem] h-[450px] flex flex-col shadow-2xl">
          <h3 className="text-2xl font-spooky text-red-600 mb-6 text-center tracking-widest uppercase">Biological Drainage</h3>
          <div className="flex-grow relative">
            <canvas ref={breakdownChartRef}></canvas>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700 mt-6 text-center italic">Sectors accelerating your departure</p>
        </div>
      </div>

      <div className="bg-stone-900/90 border-t-8 border-red-600 p-8 md:p-12 rounded-[3rem] shadow-2xl relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-600 text-black font-hell px-6 py-1 rounded-full text-xs">
          STRICTLY CONFIDENTIAL
        </div>
        <h3 className="text-3xl font-spooky text-red-600 mb-8 flex items-center justify-center gap-4 uppercase tracking-wider">
          <i className="fas fa-scroll animate-bounce text-red-800"></i> {result.userName || 'YOU'}'S DARK COUNSEL
        </h3>
        <div className="prose prose-invert max-w-none">
          <div className="text-red-100 leading-relaxed whitespace-pre-line text-lg md:text-2xl italic font-light text-center border-l-4 md:border-l-8 border-red-900 pl-6 md:pl-10 py-4 bg-black/20 rounded-r-3xl shadow-inner">
            {result.advice}
          </div>
        </div>
      </div>

      <button 
        onClick={onReset}
        className="group relative w-full bg-stone-950 text-red-700 font-hell py-8 rounded-[2rem] border-2 border-red-900/50 transition-all overflow-hidden hover:border-red-500 hover:text-red-500 shadow-xl active:scale-95"
      >
        <span className="relative z-10 transition-transform group-hover:scale-110 block">RESUBMIT YOUR SOUL FOR JUDGMENT</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-900/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </button>
    </div>
  );
};

export default ResultDisplay;
