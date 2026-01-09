
import React, { useState, useEffect } from 'react';

const EyeExercise: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { title: '상하 좌우 보기', desc: '눈동자를 위, 아래, 왼쪽, 오른쪽으로 천천히 움직이세요.' },
    { title: '원 그리기', desc: '눈동자로 시계 방향, 반시계 방향으로 큰 원을 그리세요.' },
    { title: '먼 곳 바라보기', desc: '창 밖이나 방 끝의 가장 먼 지점을 10초간 응시하세요.' },
    { title: '눈 감고 휴식', desc: '양손을 비벼 따뜻하게 한 뒤 눈 위에 올리고 휴식하세요.' },
  ];

  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    let interval: any;
    if (activeStep === 0) {
      let count = 0;
      interval = setInterval(() => {
        const moves = [{x:50,y:20}, {x:50,y:80}, {x:20,y:50}, {x:80,y:50}];
        setPos(moves[count % 4]);
        count++;
      }, 2000);
    } else if (activeStep === 1) {
      let angle = 0;
      interval = setInterval(() => {
        setPos({
          x: 50 + 30 * Math.cos(angle),
          y: 50 + 30 * Math.sin(angle)
        });
        angle += 0.1;
      }, 50);
    } else {
      setPos({ x: 50, y: 50 });
    }
    return () => clearInterval(interval);
  }, [activeStep]);

  return (
    <div className="fade-in max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-stone-800 mb-2">눈 운동하기</h2>
        <p className="text-stone-500">피로한 눈 근육을 이완시켜주세요.</p>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-sm border border-stone-200 mb-8 relative h-80 overflow-hidden">
        {activeStep < 2 ? (
          <div 
            className="absolute w-8 h-8 bg-emerald-500 rounded-full shadow-lg transition-all duration-1000 ease-in-out flex items-center justify-center"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-stone-400">
             <i className={`fas ${activeStep === 2 ? 'fa-eye' : 'fa-eye-slash'} text-6xl opacity-20`}></i>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`p-3 rounded-xl text-sm font-medium transition-colors ${activeStep === i ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
        <h4 className="font-bold text-stone-800 mb-2">{steps[activeStep].title}</h4>
        <p className="text-stone-600">{steps[activeStep].desc}</p>
      </div>
    </div>
  );
};

export default EyeExercise;
