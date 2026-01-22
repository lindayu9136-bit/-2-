
import React, { useState, useEffect } from 'react';

interface IntroProps {
  onStart: () => void;
}

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('homeIntroPlayed');
    
    if (!hasPlayed) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShouldAnimate(true);
          sessionStorage.setItem('homeIntroPlayed', 'true');
        });
      });
    }
  }, []);

  // 클릭 로직 분리: 주제 선택 카드와 동일한 215ms 지연 및 눌림 피드백 적용
  const handleChallengeClick = () => {
    if (isPressing) return;
    setIsPressing(true);
    
    setTimeout(() => {
      onStart();
    }, 215);
  };

  return (
    <div className={`flex flex-col min-h-full w-full ${shouldAnimate ? 'animate-fade-in' : ''} items-center py-10`}>
      <div className="flex flex-col items-center w-full mt-6">
        {/* 1. Church Logo & Name */}
        <div className={`flex flex-col items-center transform scale-[0.85] origin-top mb-14 ${shouldAnimate ? 'animate-slide-up' : ''}`}>
          <div className="relative w-16 h-24 flex flex-col items-center">
            <div className="absolute inset-x-0 top-0 h-[98%] border-t-[1.5px] border-x-[1.5px] border-mainFont/20 rounded-t-full"></div>
            <div className="absolute inset-x-2 top-2 h-[88%] border-t-[0.8px] border-x-[0.8px] border-mainFont/10 rounded-t-full"></div>
            <div className="relative mt-[1.8rem] flex flex-col items-center justify-center">
              <div className="w-[1.2px] h-14 bg-mainFont/40 rounded-full"></div>
              <div className="absolute top-[30%] w-9 h-[1.2px] bg-mainFont/40 rounded-full"></div>
            </div>
            <div className="absolute bottom-0 w-12 h-[1px] bg-mainFont/30"></div>
          </div>
          <div className="flex flex-col items-center mt-6">
            <span className="text-[18px] font-classic font-black text-mainFont tracking-[0.15em] uppercase sharp-text">
              온세상교회
            </span>
          </div>
        </div>
        
        {/* 2. Main Title & Slogan */}
        <div className="flex flex-col items-center space-y-12 text-center w-full">
          <h1 className="text-[2.95rem] font-classic font-black text-mainFont tracking-tighter leading-[1.38] flex flex-col items-center title-vivid">
            <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">약속의 말씀</span>
            <span className="text-subFont drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">내 마음에 쏙쏙</span>
          </h1>
          
          <div className="relative inline-flex flex-col items-center px-4 slogan-vivid space-y-4">
            <p className="text-[16px] font-serif font-bold text-mainFont/60 tracking-tight leading-relaxed break-keep">
              "그리스도인의 말씀이 너희 속에 풍성히 거하여"
            </p>
            <span className="text-[16px] font-serif font-bold text-mainFont/60 tracking-tight">
              - 골로새서 3:16 -
            </span>
          </div>
        </div>

        {/* 3. Single Action Card (도전하기) - 미세 눌림 및 음영 반응 통일 */}
        <div className="mt-20 flex justify-center w-full">
          <button
            id="ctaChallenge"
            onClick={handleChallengeClick}
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              transitionDuration: '220ms' 
            }}
            className={`group glass-card hover:bg-white/20 transition-all px-12 py-4 rounded-[1.8rem] flex items-center justify-center text-center relative overflow-hidden list-item-shadow border-white/10 ${
              isPressing ? 'translate-y-[1px] scale-[0.985] brightness-[0.96] shadow-inner' : ''
            }`}
          >
            <div className="relative z-10">
              <h3 className="text-[20px] font-classic font-bold text-mainFont tracking-tight sharp-text">
                도전하기
              </h3>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
