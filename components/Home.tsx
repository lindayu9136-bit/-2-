
import React, { useState } from 'react';
import { BIBLE_VERSES } from '../constants';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface HomeProps {
  onSelect: (id: string) => void;
  onBack: () => void;
}

const Home: React.FC<HomeProps> = ({ onSelect, onBack }) => {
  const [pressingId, setPressingId] = useState<string | null>(null);

  // 클릭 로직 분리: 홈 '도전하기'와 동일한 215ms 지연 및 시각적 피드백 적용
  const handleTopicClick = (id: string) => {
    if (pressingId) return;
    setPressingId(id);
    
    setTimeout(() => {
      onSelect(id);
    }, 215);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-x-hidden">
      {/* Header Area */}
      <div className="pt-2 pb-8 flex flex-col items-center relative w-full">
        <div className="absolute left-0 top-0">
          <button 
            onClick={onBack}
            className="flex items-center space-x-1 text-mainFont/40 hover:text-subFont transition-colors py-3 px-1 active:scale-95 group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[13px] font-sans font-bold tracking-widest">돌아가기</span>
          </button>
        </div>
        
        <div className="pt-14 flex flex-col items-center pointer-events-none w-full">
          <h2 className="text-[23px] font-classic font-bold text-mainFont/95 uppercase tracking-[0.08em] leading-none text-center">
            <span className="text-mainFont/25 mr-2">[</span>
            암송 주제 선택하기
            <span className="text-mainFont/25 ml-2">]</span>
          </h2>
        </div>
      </div>
      
      {/* List Area */}
      <div className="mt-2 flex-1 w-full">
        <div className="flex flex-col space-y-4 w-full">
          {BIBLE_VERSES.map((verse, index) => (
            <button
              key={verse.id}
              onClick={() => handleTopicClick(verse.id)}
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                transitionDuration: '220ms',
                animationDelay: `${index * 80}ms` 
              }}
              className={`w-full group glass-card hover:bg-white/20 transition-all p-6 rounded-[2.2rem] flex items-center justify-between text-left relative overflow-hidden list-item-shadow border-white/10 ${
                pressingId === verse.id ? 'translate-y-[1px] scale-[0.985] brightness-[0.96] shadow-inner' : ''
              }`}
            >
              <div className="flex items-center space-x-6 relative z-10 flex-1">
                <span className="text-[20px] font-classic font-black text-mainFont/45 tabular-nums tracking-tight transition-colors">
                  0{index + 1}
                </span>
                <div className="flex flex-col overflow-hidden">
                  <h3 className="text-[22px] font-classic font-bold text-mainFont tracking-tight transition-colors sharp-text truncate">
                    {verse.topic}
                  </h3>
                  <p className="text-[13px] text-mainFont/40 font-sans font-bold tracking-wider uppercase mt-0.5">
                    {verse.reference}
                  </p>
                </div>
              </div>
              <div className="bg-white/15 p-3 rounded-full flex-shrink-0 group-hover:bg-subFont/10 transition-all duration-300 relative z-10 border border-white/20">
                <ChevronRight size={18} className="text-mainFont/30 group-hover:text-subFont/80 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <footer className="mt-16 pb-10 text-center opacity-40 w-full">
        <p className="text-[10px] font-sans text-mainFont uppercase tracking-[0.4em] font-black">
          Faith & Promise • On-Sesang Ministry
        </p>
      </footer>
    </div>
  );
};

export default Home;
