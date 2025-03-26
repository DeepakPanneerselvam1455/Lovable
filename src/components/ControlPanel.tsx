
import React from 'react';
import { Check, HelpCircle, Undo, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ControlPanelProps {
  onSolve: () => void;
  onHint: () => void;
  onReset: () => void;
  onNewGame: () => void;
  onChangeDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  currentDifficulty: 'easy' | 'medium' | 'hard';
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onSolve,
  onHint,
  onReset,
  onNewGame,
  onChangeDifficulty,
  currentDifficulty
}) => {
  return (
    <div className="mt-8 animate-slide-in" style={{ animationDelay: '0.2s' }}>
      <div className="max-w-md mx-auto">
        {/* Main control buttons */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <button 
            className="control-button flex flex-col items-center justify-center gap-1 p-3 bg-white hover:bg-blue-50 border border-border rounded-lg transition-all duration-200"
            onClick={onSolve}
          >
            <Check className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Solve</span>
          </button>
          
          <button 
            className="control-button flex flex-col items-center justify-center gap-1 p-3 bg-white hover:bg-blue-50 border border-border rounded-lg transition-all duration-200"
            onClick={onHint}
          >
            <HelpCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Hint</span>
          </button>
          
          <button 
            className="control-button flex flex-col items-center justify-center gap-1 p-3 bg-white hover:bg-blue-50 border border-border rounded-lg transition-all duration-200"
            onClick={onReset}
          >
            <Undo className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Reset</span>
          </button>
          
          <button 
            className="control-button flex flex-col items-center justify-center gap-1 p-3 bg-white hover:bg-blue-50 border border-border rounded-lg transition-all duration-200"
            onClick={onNewGame}
          >
            <RefreshCw className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">New</span>
          </button>
        </div>
        
        {/* Difficulty selector */}
        <div className="flex flex-col items-center">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Difficulty</h3>
          <div className="flex gap-2">
            {['easy', 'medium', 'hard'].map((difficulty) => (
              <button
                key={difficulty}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  currentDifficulty === difficulty
                    ? "bg-primary text-white"
                    : "bg-white text-muted-foreground hover:bg-blue-50"
                )}
                onClick={() => onChangeDifficulty(difficulty as 'easy' | 'medium' | 'hard')}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
