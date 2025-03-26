
import React from 'react';
import { cn } from '@/lib/utils';
import { Eraser } from 'lucide-react';

interface NumberPadProps {
  onNumberClick: (number: number) => void;
  onEraseClick: () => void;
  selectedCell: [number, number] | null;
  originalGrid: number[][];
}

const NumberPad: React.FC<NumberPadProps> = ({ 
  onNumberClick, 
  onEraseClick, 
  selectedCell,
  originalGrid 
}) => {
  // Check if a cell is editable
  const isCellEditable = () => {
    if (!selectedCell) return false;
    const [row, col] = selectedCell;
    return originalGrid[row][col] === 0;
  };

  // Generate number buttons
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="mt-6 animate-slide-in" style={{ animationDelay: '0.1s' }}>
      <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
        {numbers.map((num) => (
          <button
            key={num}
            className={cn(
              "number-button aspect-square flex items-center justify-center text-xl font-medium",
              "bg-white hover:bg-blue-50 border border-border rounded-md",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-all duration-200"
            )}
            onClick={() => onNumberClick(num)}
            disabled={!isCellEditable()}
          >
            {num}
          </button>
        ))}
        <button
          className={cn(
            "number-button aspect-square flex items-center justify-center",
            "bg-white hover:bg-blue-50 border border-border rounded-md",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-all duration-200"
          )}
          onClick={onEraseClick}
          disabled={!isCellEditable()}
        >
          <Eraser className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default NumberPad;
