
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { isValidPlacement } from '@/utils/sudokuSolver';

interface SudokuGridProps {
  grid: number[][];
  originalGrid: number[][];
  onCellChange: (row: number, col: number, value: number) => void;
  hintCell: [number, number] | null;
  invalidCells: Array<[number, number]>;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ 
  grid, 
  originalGrid,
  onCellChange,
  hintCell,
  invalidCells 
}) => {
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Handle keyboard input
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedCell) return;
    
    const [row, col] = selectedCell;
    
    // Only allow editing non-original cells
    if (originalGrid[row][col] !== 0) return;
    
    if (e.key >= '1' && e.key <= '9') {
      onCellChange(row, col, parseInt(e.key, 10));
    } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
      onCellChange(row, col, 0);
    } else if (e.key === 'ArrowUp' && row > 0) {
      setSelectedCell([row - 1, col]);
    } else if (e.key === 'ArrowDown' && row < 8) {
      setSelectedCell([row + 1, col]);
    } else if (e.key === 'ArrowLeft' && col > 0) {
      setSelectedCell([row, col - 1]);
    } else if (e.key === 'ArrowRight' && col < 8) {
      setSelectedCell([row, col + 1]);
    }
  }, [selectedCell, onCellChange, originalGrid]);

  // Setup keyboard listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Check if a cell is invalid
  const isCellInvalid = (row: number, col: number) => {
    return invalidCells.some(([r, c]) => r === row && c === col);
  };

  // Check if a cell is part of the hint
  const isCellHint = (row: number, col: number) => {
    return hintCell && hintCell[0] === row && hintCell[1] === col;
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
  };

  // Generate the cells for the grid
  const renderCells = () => {
    const cells = [];
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = grid[row][col];
        const isOriginal = originalGrid[row][col] !== 0;
        const isSelected = selectedCell && selectedCell[0] === row && selectedCell[1] === col;
        const isInvalid = isCellInvalid(row, col);
        const isHint = isCellHint(row, col);
        
        // Determine borders for the 3x3 subgrids
        const isBorderRight = col === 2 || col === 5;
        const isBorderBottom = row === 2 || row === 5;
        
        cells.push(
          <div
            key={`${row}-${col}`}
            className={cn(
              "sudoku-cell bg-white",
              isBorderRight && "border-right",
              isBorderBottom && "border-bottom",
              isSelected && "bg-blue-50 ring-2 ring-primary",
              value !== 0 && "filled",
              isOriginal && "original",
              isInvalid && "invalid",
              isHint && "hint"
            )}
            tabIndex={0}
            onClick={() => handleCellClick(row, col)}
          >
            {value !== 0 ? value : ""}
          </div>
        );
      }
    }
    
    return cells;
  };

  return (
    <div 
      ref={gridRef}
      className="sudoku-grid w-full max-w-md mx-auto border border-border bg-white animate-scale-in"
    >
      {renderCells()}
    </div>
  );
};

export default SudokuGrid;
