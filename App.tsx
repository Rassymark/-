
import React, { useState, useEffect, useCallback } from 'react';
import { MenuType, DailyContent } from './types';
import IntroOverlay from './components/IntroOverlay';
import NatureExperience from './components/NatureExperience';
import EyeExercise from './components/EyeExercise';
import { fetchDailyHealingContent } from './services/geminiService';

const App: React.FC = () => {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuType>(MenuType.HOME);
  const [dailyData, setDailyData] = useState<DailyContent | null>(null);
  const [loading, setLoading] = useState(true);

  const getKSTDate = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const kstOffset = 9 * 60 * 60000;
    const kstDate = new Date(utc + kstOffset);
    return kstDate.toISOString().split('T')[0];
  };

  const loadDailyContent = useCallback(async () => {
    setLoading(true);
    const dateStr = getKSTDate();
    const data = await fetchDailyHealingContent(dateStr);
    if (data) setDailyData(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadDailyContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isIntroComplete) {
    return <IntroOverlay onComplete={() => setIsIntroComplete(true)} />;
  }

  const renderContent = () => {
    switch (activeMenu) {
      case MenuType.HOME:
        return (
          <div className="fade-in space-y-12">
            <header className="text-center py-10">
              <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                {getKSTDate()} 오늘의 힐링
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4 leading-tight">
                디지털 숲에서<br/>잠시 쉬어가세요
              </h1>
              <p className="text-stone-500 max-w-lg mx-auto leading-relaxed">
                당신의 디지털 피로를 씻어내고, <br/>
                새로운 AI 시대를 더 따뜻하게 맞이할 수 있도록 돕습니다.
              </p>
            </header>

            <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <i className="fas fa-heart text-xl"></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-stone-800">오늘의 따스한 행동</h2>
                  <p className="text-sm text-stone-500">마음을 데우는 작은 실천</p>
                </div>
              </div>
              <p className="text-xl text-stone-700 font-light leading-relaxed italic">
                {loading ? '추천 행동을 불러오는 중...' : dailyData?.warmAction || '주변 사람들에게 따뜻한 안부 인사를 건네보세요.'}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <button 
                 onClick={() => setActiveMenu(MenuType.NATURE)}
                 className="p-8 bg-emerald-600 text-white rounded-3xl hover:bg-emerald-700 transition-all text-left group shadow-lg shadow-emerald-200"
               >
                 <i className="fas fa-leaf text-3xl mb-4 group-hover:rotate-12 transition-transform"></i>
                 <h3 className="text-2xl font-bold mb-2">자연 경험하기</h3>
                 <p className="text-emerald-100 text-sm">시각과 청각으로 즐기는 휴식</p>
               </button>
               <button 
                 onClick={() => setActiveMenu(MenuType.EYE_EXERCISE)}
                 className="p-8 bg-sky-600 text-white rounded-3xl hover:bg-sky-700 transition-all text-left group shadow-lg shadow-sky-200"
               >
                 <i className="fas fa-eye text-3xl mb-4 group-hover:scale-110 transition-transform"></i>
                 <h3 className="text-2xl font-bold mb-2">눈 운동하기</h3>
                 <p className="text-sky-100 text-sm">스마트폰에 지친 눈을 위해</p>
               </button>
            </div>
          </div>
        );

      case MenuType.NATURE:
        return <NatureExperience />;
      
      case MenuType.EYE_EXERCISE:
        return <EyeExercise />;

      case MenuType.WARM_ACTION:
        return (
          <div className="fade-in max-w-2xl mx-auto py-10 text-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mx-auto mb-8">
              <i className="fas fa-sun text-4xl"></i>
            </div>
            <h2 className="text-3xl font-bold mb-6">따스한 행동 추천</h2>
            <div className="bg-white p-12 rounded-3xl border border-stone-200 shadow-sm mb-10">
              <p className="text-2xl leading-relaxed text-stone-800">
                "{dailyData?.warmAction}"
              </p>
            </div>
            <button 
              onClick={() => setActiveMenu(MenuType.HOME)}
              className="px-8 py-3 bg-stone-800 text-white rounded-full hover:bg-stone-900 transition-colors"
            >
              메인으로 돌아가기
            </button>
          </div>
        );

      case MenuType.AI_TUTORIAL:
        return (
          <div className="fade-in space-y-8 max-w-3xl mx-auto">
             <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-stone-800 mb-2">쉬운 AI 사용법 익히기</h2>
                <p className="text-stone-500">디지털 세상과 더 가까워지는 시간</p>
             </div>

             <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
                {loading ? (
                  <div className="flex flex-col items-center py-12">
                    <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-stone-500">오늘의 AI 팁을 가져오는 중입니다...</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start gap-4 mb-8">
                       <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                         <i className="fas fa-lightbulb text-2xl"></i>
                       </div>
                       <div>
                         <h3 className="text-2xl font-bold text-stone-800 mb-2">{dailyData?.aiTip.title}</h3>
                         <p className="text-stone-600 leading-relaxed">{dailyData?.aiTip.description}</p>
                       </div>
                    </div>
                    
                    <div className="space-y-4">
                       {dailyData?.aiTip.steps.map((step, idx) => (
                         <div key={idx} className="flex gap-4 p-5 bg-stone-50 rounded-2xl border border-stone-100 group hover:border-emerald-200 transition-colors">
                            <span className="w-8 h-8 bg-white border border-stone-200 rounded-full flex items-center justify-center text-sm font-bold text-emerald-600 shrink-0 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                              {idx + 1}
                            </span>
                            <p className="text-stone-700 pt-1">{step}</p>
                         </div>
                       ))}
                    </div>
                  </>
                )}
             </div>

             <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
               <h4 className="font-bold text-indigo-900 mb-3"><i className="fas fa-question-circle mr-2"></i>더 궁금한 점이 있으신가요?</h4>
               <p className="text-indigo-800 text-sm mb-4">자녀분이나 손주분에게 "이것 좀 알려줘"라고 말하는 대신, 이 화면을 보여주며 함께 시도해보세요. 배움은 언제나 멋진 일입니다.</p>
               <button className="text-indigo-600 font-bold hover:underline">다른 팁 더 보기 →</button>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24 md:pb-12">
      {/* Sidebar / Desktop Nav */}
      <nav className="fixed top-0 left-0 w-full md:w-64 md:h-full bg-white border-b md:border-b-0 md:border-r border-stone-200 z-40 hidden md:block">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-12 cursor-pointer" onClick={() => setActiveMenu(MenuType.HOME)}>
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-spa text-white text-xs"></i>
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-800">디지털 안식처</span>
          </div>
          
          <ul className="space-y-4">
            <li>
              <button 
                onClick={() => setActiveMenu(MenuType.HOME)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === MenuType.HOME ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-stone-500 hover:bg-stone-50'}`}
              >
                <i className="fas fa-home"></i> 홈
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveMenu(MenuType.NATURE)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === MenuType.NATURE ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-stone-500 hover:bg-stone-50'}`}
              >
                <i className="fas fa-leaf"></i> 자연 경험
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveMenu(MenuType.WARM_ACTION)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === MenuType.WARM_ACTION ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-stone-500 hover:bg-stone-50'}`}
              >
                <i className="fas fa-sun"></i> 따스한 행동
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveMenu(MenuType.EYE_EXERCISE)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === MenuType.EYE_EXERCISE ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-stone-500 hover:bg-stone-50'}`}
              >
                <i className="fas fa-eye"></i> 눈 운동
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveMenu(MenuType.AI_TUTORIAL)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === MenuType.AI_TUTORIAL ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-stone-500 hover:bg-stone-50'}`}
              >
                <i className="fas fa-graduation-cap"></i> AI 사용법
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 p-3 flex justify-around md:hidden z-40">
        <button onClick={() => setActiveMenu(MenuType.HOME)} className={`flex flex-col items-center gap-1 p-2 ${activeMenu === MenuType.HOME ? 'text-emerald-600' : 'text-stone-400'}`}>
          <i className="fas fa-home text-lg"></i>
          <span className="text-[10px]">홈</span>
        </button>
        <button onClick={() => setActiveMenu(MenuType.NATURE)} className={`flex flex-col items-center gap-1 p-2 ${activeMenu === MenuType.NATURE ? 'text-emerald-600' : 'text-stone-400'}`}>
          <i className="fas fa-leaf text-lg"></i>
          <span className="text-[10px]">자연</span>
        </button>
        <button onClick={() => setActiveMenu(MenuType.EYE_EXERCISE)} className={`flex flex-col items-center gap-1 p-2 ${activeMenu === MenuType.EYE_EXERCISE ? 'text-emerald-600' : 'text-stone-400'}`}>
          <i className="fas fa-eye text-lg"></i>
          <span className="text-[10px]">눈운동</span>
        </button>
        <button onClick={() => setActiveMenu(MenuType.AI_TUTORIAL)} className={`flex flex-col items-center gap-1 p-2 ${activeMenu === MenuType.AI_TUTORIAL ? 'text-emerald-600' : 'text-stone-400'}`}>
          <i className="fas fa-graduation-cap text-lg"></i>
          <span className="text-[10px]">AI 교육</span>
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="md:ml-64 p-6 md:p-12 max-w-6xl mx-auto min-h-screen">
        <div className="max-w-4xl mx-auto pt-16 md:pt-0">
          {renderContent()}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="md:ml-64 p-8 text-center text-stone-400 text-sm border-t border-stone-100">
        <p>© 2024 디지털 안식처. 대한민국 시간 기준으로 매일 새로운 콘텐츠가 업데이트됩니다.</p>
      </footer>
    </div>
  );
};

export default App;
