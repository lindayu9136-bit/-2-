
import React from 'react';
import { Sparkles, RotateCcw, Home, Quote } from 'lucide-react';

interface SuccessProps {
  onRetry: () => void;
  onHome: () => void;
}

const Success: React.FC<SuccessProps> = ({ onRetry, onHome }) => {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center relative px-6 overflow-hidden animate-fade-in">
      {/* Radiant Background Effects - Muted version */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(62,56,65,0.05)_0%,transparent_70%)]"></div>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full blur-[80px] animate-float"
            style={{
              width: `${Math.random() * 180 + 120}px`,
              height: `${Math.random() * 180 + 120}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 7}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mb-12 animate-success-burst">
        <div className="absolute inset-0 bg-subFont/5 blur-[80px] rounded-full scale-125"></div>
        <div className="relative bg-white/10 p-12 rounded-[4rem] border border-subFont/10 shadow-sm backdrop-blur-2xl">
          <Sparkles size={64} className="text-pointFont/50" strokeWidth={1} />
        </div>
        <div className="absolute -bottom-4 -right-4 bg-subFont/90 text-cream p-3.5 rounded-2xl shadow-lg border border-white/20">
          <Quote size={18} fill="currentColor" strokeWidth={0} />
        </div>
      </div>

      <div className="space-y-8 mb-16 relative z-10">
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-[1.8rem] font-classic font-black text-mainFont tracking-tight leading-relaxed break-keep px-4">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <span className="animate-emoji-pop inline-block text-[2rem] opacity-70">🎺</span>
              <span>참 잘하셨습니다</span>
              <span className="animate-emoji-pop inline-block text-[2rem] opacity-70" style={{ animationDelay: '0.3s' }}>🕊️</span>
            </div>
            <span className="text-[1.3rem] text-subFont/70 font-bold">
              말씀이 마음속에 새겨졌어요
            </span>
          </h2>
          <div className="h-[1px] w-16 bg-subFont/10 mx-auto"></div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-[18px] font-serif font-bold text-mainFont/50 leading-[1.6] px-6 italic whitespace-pre-line opacity-80">
            주의 말씀은 내 발에 등이요
            내 길에 빛이니이다
          </p>
        </div>
      </div>

      <div className="w-full space-y-3.5 animate-slide-up relative z-10" style={{ animationDelay: '0.5s' }}>
        <button
          onClick={onRetry}
          className="w-full relative group overflow-hidden btn-primary py-5.5 rounded-[1.6rem] flex items-center justify-center space-x-2.5 active:scale-[0.98] transition-all duration-300"
        >
          <RotateCcw size={18} className="opacity-70 group-hover:rotate-[-45deg] transition-transform" />
          <span className="text-[17px] tracking-tight font-bold">다시 한번 암송하기</span>
        </button>
        
        <button
          onClick={onHome}
          className="w-full glass-panel border border-subFont/5 text-subFont/70 font-bold py-5.5 rounded-[1.6rem] flex items-center justify-center space-x-2 hover:bg-white/20 active:scale-[0.98] transition-all duration-300"
        >
          <Home size={16} className="opacity-50" />
          <span className="text-[16px] tracking-tight">처음으로 돌아가기</span>
        </button>
      </div>
    </div>
  );
};

export default Success;
