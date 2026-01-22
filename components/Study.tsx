
import React from 'react';
import { BibleVerse } from '../types';
import { BookOpen, Play, ChevronLeft, Bookmark } from 'lucide-react';

interface StudyProps {
  verse: BibleVerse;
  onStart: () => void;
  onBack: () => void;
}

const Study: React.FC<StudyProps> = ({ verse, onStart, onBack }) => {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="mb-4">
        <button 
          onClick={onBack}
          className="flex items-center space-x-1 text-mainFont/40 hover:text-subFont transition-colors py-3 px-1 active:scale-95 group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-[13px] font-sans font-bold tracking-widest">돌아가기</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center space-x-3 bg-white/10 px-8 py-3 rounded-full border border-mainFont/10 mb-6 shadow-sm">
            <Bookmark size={14} className="text-mainFont/30" strokeWidth={1.5} />
            <span className="text-[12px] font-sans font-black text-mainFont/60 uppercase tracking-[0.25em]">STEP 01. 마음으로 읽기</span>
          </div>
          <h2 className="text-[30px] font-classic font-bold text-mainFont tracking-tight leading-tight">
            {verse.topic}
          </h2>
        </div>

        <div className="relative flex-1 flex flex-col justify-center px-1">
          <div className="relative p-10 sm:p-14 bg-white/25 rounded-[3.5rem] border border-white/40 shadow-2xl backdrop-blur-3xl overflow-hidden min-h-[460px] flex flex-col justify-center items-center">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none text-mainFont">
              <BookOpen size={300} strokeWidth={0.5} />
            </div>
            
            <div className="relative z-10 w-full animate-slide-up text-center space-y-2">
              <p className="text-[1.7rem] sm:text-[1.85rem] font-serif font-bold leading-[1.9] text-mainFont whitespace-pre-line break-keep tracking-tight opacity-95">
                {verse.content}
              </p>
            </div>
            
            <div className="relative z-10 flex items-center justify-center space-x-5 mt-14 opacity-40">
              <div className="h-[0.5px] w-8 bg-mainFont"></div>
              <p className="text-[17px] font-serif font-bold text-mainFont tracking-tight italic">
                {verse.reference}
              </p>
              <div className="h-[0.5px] w-8 bg-mainFont"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pb-8 px-2">
        <button
          onClick={onStart}
          className="w-full group relative overflow-hidden btn-primary py-6 rounded-[2rem] flex items-center justify-center space-x-3 active:scale-[0.97] transition-all duration-500"
        >
          <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <Play size={20} className="fill-cream" strokeWidth={0} />
          <span className="text-[20px] tracking-tight font-black">암송 퀴즈 시작</span>
        </button>
      </div>
    </div>
  );
};

export default Study;
