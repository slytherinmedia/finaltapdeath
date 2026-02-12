
import React, { useState, useEffect } from 'react';
import { LIFE_QUOTES } from '../constants';

const QuotesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LIFE_QUOTES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const quote = LIFE_QUOTES[currentIndex];

  return (
    <div className="bg-stone-900/40 p-10 border-y border-red-900/30 min-h-[250px] flex items-center justify-center text-center">
      <div key={currentIndex} className="max-w-3xl animate-in fade-in zoom-in duration-1000">
        <i className="fas fa-quote-left text-red-900 text-4xl mb-4 block"></i>
        <p className="text-2xl md:text-3xl font-light text-stone-300 italic mb-6 leading-relaxed">
          "{quote.text}"
        </p>
        <p className="text-red-700 font-spooky text-xl tracking-wider">— {quote.author} —</p>
        <div className="flex justify-center gap-1 mt-8">
          {Array.from({ length: 5 }).map((_, i) => {
             const displayIndex = (currentIndex + i - 2 + LIFE_QUOTES.length) % LIFE_QUOTES.length;
             return (
               <div 
                 key={i}
                 className={`w-2 h-2 rounded-full transition-all duration-300 ${i === 2 ? 'bg-red-600 scale-125' : 'bg-stone-800'}`}
               />
             );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuotesCarousel;
