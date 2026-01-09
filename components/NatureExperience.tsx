
import React from 'react';

const NatureExperience: React.FC = () => {
  const scenes = [
    { title: '고요한 숲', img: 'https://images.unsplash.com/photo-1448375232540-44af20df23f5?w=800' },
    { title: '잔잔한 파도', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800' },
    { title: '풀잎의 아침', img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800' },
    { title: '산들바람', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800' },
  ];

  return (
    <div className="space-y-8 fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-stone-800 mb-2">자연 경험하기</h2>
        <p className="text-stone-500">디지털 픽셀 대신 대자연의 질감을 느껴보세요.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenes.map((scene, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer">
            <img 
              src={scene.img} 
              alt={scene.title}
              className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <h3 className="text-white text-xl font-medium">{scene.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 text-center">
        <i className="fas fa-wind text-emerald-500 text-4xl mb-4"></i>
        <h3 className="text-xl font-semibold mb-2">명상 가이드</h3>
        <p className="text-stone-600 leading-relaxed">
          화면의 이미지를 하나 선택하고 30초 동안 가만히 응시해 보세요. <br/>
          호흡은 천천히, 들이마시고 내쉬는 숨에만 집중합니다.
        </p>
      </div>
    </div>
  );
};

export default NatureExperience;
