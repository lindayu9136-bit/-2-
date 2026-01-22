
import React, { useState, useMemo, useEffect } from 'react';
import { Step } from './types';
import { BIBLE_VERSES } from './constants';
import Intro from './components/Intro';
import Home from './components/Home';
import Study from './components/Study';
import Quiz from './components/Quiz';
import Success from './components/Success';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.INTRO);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Ensure scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentStep]);

  const selectedVerse = useMemo(() => 
    BIBLE_VERSES.find(v => v.id === selectedTopicId) || null
  , [selectedTopicId]);

  const handleStart = () => {
    setCurrentStep(Step.TOPICS);
  };

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
    setCurrentStep(Step.STUDY);
  };

  const startQuiz = () => {
    setCurrentStep(Step.QUIZ);
  };

  const finishQuiz = () => {
    setCurrentStep(Step.SUCCESS);
  };

  const resetToHome = () => {
    setSelectedTopicId(null);
    setCurrentStep(Step.INTRO);
  };

  const backToTopics = () => {
    setSelectedTopicId(null);
    setCurrentStep(Step.TOPICS);
  };

  const retryQuiz = () => {
    setCurrentStep(Step.STUDY);
  };

  return (
    <div className="min-h-screen bg-themeBg w-full overflow-x-hidden flex flex-col items-center relative">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#432d4c 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      
      {/* Safe Area Container: Max width restricted to 430px for mobile focus */}
      <div className="w-full max-w-[430px] flex-1 flex flex-col px-5 pt-[calc(env(safe-area-inset-top)+20px)] pb-[calc(env(safe-area-inset-bottom)+20px)] z-10 mx-auto">
        <main className="flex-1 flex flex-col w-full">
          {currentStep === Step.INTRO && (
            <Intro onStart={handleStart} />
          )}
          {currentStep === Step.TOPICS && (
            <Home onSelect={handleSelectTopic} onBack={resetToHome} />
          )}
          {currentStep === Step.STUDY && selectedVerse && (
            <Study 
              verse={selectedVerse} 
              onStart={startQuiz} 
              onBack={backToTopics} 
            />
          )}
          {currentStep === Step.QUIZ && selectedVerse && (
            <Quiz verse={selectedVerse} onComplete={finishQuiz} />
          )}
          {currentStep === Step.SUCCESS && (
            <Success onRetry={retryQuiz} onHome={resetToHome} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
