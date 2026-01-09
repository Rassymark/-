
import React, { useState, useEffect } from 'react';

interface IntroOverlayProps {
  onComplete: () => void;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-900 text-stone-100 overflow-hidden">
      {/* Background Ambience Simulation */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000" 
          alt="Nature background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 text-center px-6">
        <h1 className="text-3xl md:text-5xl font-light mb-8 pulse-soft">잠시 눈을 감고 숲의 숨결을 느껴보세요</h1>
        <p className="text-xl md:text-2xl font-extralight text-stone-300 mb-12">
          디지털의 소음을 뒤로하고, 자연과 연결되는 10초의 시간
        </p>
        
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <svg className="absolute w-full h-full -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-stone-700"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 * (1 - timeLeft / 10)}
              className="text-emerald-500 transition-all duration-1000 ease-linear"
            />
          </svg>
          <span className="text-3xl font-bold">{timeLeft}</span>
        </div>
        
        <p className="mt-8 text-stone-400 italic">"당신의 휴식은 가치가 있습니다"</p>
      </div>
    </div>
  );
};

export default IntroOverlay;
