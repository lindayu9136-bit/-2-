
import React, { useState, useEffect, useMemo } from 'react';
import { BibleVerse } from '../types';
import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

interface QuizProps {
  verse: BibleVerse;
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ verse, onComplete }) => {
  const words = useMemo(() => verse.content.split(/\s+/), [verse]);
  
  const [blankIndices, setBlankIndices] = useState<number[]>([]);
  const [solvedIndices, setSolvedIndices] = useState<number[]>([]);
  const [currentBlankPointer, setCurrentBlankPointer] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');
  const [lastSelectedOption, setLastSelectedOption] = useState<string | null>(null);
  const [isAllSolved, setIsAllSolved] = useState(false);

  useEffect(() => {
    const numBlanks = Math.max(2, Math.ceil(words.length * 0.25));
    const availableIndices = Array.from({ length: words.length }, (_, i) => i)
      .filter(i => words[i].length >= 2);

    const pool = availableIndices.length > 0 ? availableIndices : Array.from({ length: words.length }, (_, i) => i);
    
    const tempIndices: number[] = [];
    const poolCopy = [...pool];
    while (tempIndices.length < numBlanks && poolCopy.length > 0) {
      const randomIdx = Math.floor(Math.random() * poolCopy.length);
      tempIndices.push(poolCopy.splice(randomIdx, 1)[0]);
    }
    
    setBlankIndices(tempIndices.sort((a, b) => a - b));
    setSolvedIndices([]);
    setCurrentBlankPointer(0);
    setFeedback('none');
    setIsAllSolved(false);
  }, [words]);

  useEffect(() => {
    if (blankIndices.length === 0 || currentBlankPointer >= blankIndices.length) return;

    const correctWord = words[blankIndices[currentBlankPointer]].replace(/[.,?!]/g, "");
    const biblicalDistractors = [
      '하나님', '예수님', '그리스도', '믿음', '소망', '사랑', '생명', '진리', '은혜', '평강', 
      '구원', '능력', '영광', '성령', '말씀', '약속', '기쁨', '인도', '지혜', '축복'
    ];
    
    const combinedPool = Array.from(new Set([...words.map(w => w.replace(/[.,?!]/g, "")).filter(w => w !== correctWord && w.length >= 2), ...biblicalDistractors]))
      .filter(w => w !== correctWord);

    const finalOptions = [...combinedPool.sort(() => Math.random() - 0.5).slice(0, 3), correctWord].sort(() => Math.random() - 0.5);
    setOptions(finalOptions);
  }, [currentBlankPointer, blankIndices, words]);

  const handleOptionClick = (option: string) => {
    if (feedback !== 'none' || isAllSolved) return;
    setLastSelectedOption(option);
    const correctWord = words[blankIndices[currentBlankPointer]].replace(/[.,?!]/g, "");
    
    if (option === correctWord) {
      setFeedback('correct');
      setTimeout(() => {
        const newSolvedIndices = [...solvedIndices, blankIndices[currentBlankPointer]];
        setSolvedIndices(newSolvedIndices);
        
        if (currentBlankPointer + 1 >= blankIndices.length) {
          setIsAllSolved(true);
          setFeedback('none');
          setTimeout(() => {
            onComplete();
          }, 5000);
        } else {
          setCurrentBlankPointer(prev => prev + 1);
          setFeedback('none');
          setLastSelectedOption(null);
        }
      }, 300);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback('none');
        setLastSelectedOption(null);
      }, 600);
    }
  };

  const progress = (currentBlankPointer / blankIndices.length) * 100;

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="mb-10">
        <div className="flex justify-between items-end mb-4 px-1">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 opacity-50">
              <HelpCircle size={14} className="text-subFont" />
              <span className="text-[11px] font-sans font-bold text-subFont uppercase tracking-[0.2em]">Step 02. 암송 퀴즈</span>
            </div>
            <h3 className="text-[22px] font-classic font-bold text-mainFont tracking-tight">{verse.topic}</h3>
          </div>
          <div className="flex flex-col items-end opacity-40">
             <span className="text-[13px] font-sans font-bold text-subFont italic tabular-nums">
               {isAllSolved ? blankIndices.length : currentBlankPointer} / {blankIndices.length}
             </span>
          </div>
        </div>
        {/* 프로그레스 바 - 차분한 서브 폰트 컬러 베이스 */}
        <div className="h-[2px] w-full bg-subFont/5 rounded-full overflow-hidden">
          <div className="h-full bg-subFont/40 transition-all duration-500 ease-out" style={{ width: `${isAllSolved ? 100 : progress}%` }} />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className={`w-full p-8 sm:p-12 bg-white/12 rounded-[2.8rem] border transition-all duration-500 shadow-lg backdrop-blur-xl relative min-h-[320px] flex flex-col justify-center items-center ${
          feedback === 'correct' ? 'border-pointFont/20 bg-pointFont/5' : feedback === 'wrong' ? 'border-brickRed/20 bg-brickRed/5' : isAllSolved ? 'border-subFont/10 bg-white/20' : 'border-subFont/5'
        }`}>
          <div className="text-[1.4rem] sm:text-[1.5rem] font-serif font-bold leading-[1.8] text-mainFont text-center whitespace-pre-wrap break-keep flex flex-wrap justify-center items-center content-center gap-x-2 gap-y-5 opacity-90">
            {words.map((word, idx) => {
              const isBlank = blankIndices.includes(idx);
              const isSolved = solvedIndices.includes(idx);
              const isCurrent = blankIndices[currentBlankPointer] === idx;

              if (isBlank && !isSolved) {
                return (
                  <span key={idx} className={`inline-block border-b-2 min-w-[4.5rem] h-8 transition-all duration-300 relative ${
                    isCurrent ? 'border-subFont/40' : 'border-subFont/10'
                  }`}>
                  </span>
                );
              }
              return (
                <span key={idx} className={`transition-all duration-300 ${isSolved ? 'text-pointFont font-bold' : 'text-mainFont'}`}>
                  {word}
                </span>
              );
            })}
          </div>
          
          {/* 성공 시 로딩바 - 여기서 포인터 컬러(그린)를 사용하여 정체성 표현 (사용량 제한) */}
          {isAllSolved && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-subFont/5 rounded-full overflow-hidden animate-fade-in">
               <div className="h-full bg-pointFont/60 animate-loading-bar" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 space-y-6 pb-6">
        <div className="h-5 flex items-center justify-center">
          {feedback === 'correct' && (
            <div className="flex items-center text-pointFont animate-fade-in">
              <CheckCircle2 size={15} className="mr-1.5" />
              <span className="text-[13px] font-classic font-bold tracking-widest uppercase">참 잘했어요</span>
            </div>
          )}
          {feedback === 'wrong' && (
            <div className="flex items-center text-brickRed animate-shake">
              <AlertCircle size={15} className="mr-1.5" />
              <span className="text-[13px] font-classic font-bold tracking-widest uppercase">다시 생각해볼까요?</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {options.map((option, idx) => {
            const isSelected = lastSelectedOption === option;
            const isCorrect = isSelected && feedback === 'correct';
            const isWrong = isSelected && feedback === 'wrong';

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                disabled={feedback !== 'none' || isAllSolved}
                className={`
                  relative py-4.5 px-4 rounded-[1.4rem] font-classic text-[17px] font-bold transition-all duration-300 border
                  ${(feedback === 'none' && !isAllSolved)
                    ? 'bg-white/10 border-subFont/5 hover:border-subFont/20 active:scale-[0.97] text-mainFont/80' 
                    : 'border-transparent text-mainFont/5 opacity-40'
                  }
                  ${isCorrect ? 'btn-primary !border-transparent !opacity-100 scale-[1.03] z-10' : ''}
                  ${isWrong ? 'bg-brickRed/30 border-brickRed/40 !text-white !opacity-100' : ''}
                `}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
