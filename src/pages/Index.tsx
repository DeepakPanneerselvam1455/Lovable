
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SudokuGrid from '@/components/SudokuGrid';
import NumberPad from '@/components/NumberPad';
import ControlPanel from '@/components/ControlPanel';
import { copyGrid, solveSudoku, getHint, isValidPlacement, isValidGrid } from '@/utils/sudokuSolver';
import { generatePuzzle, createEmptyGrid } from '@/utils/sudokuGenerator';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const Index = () => {
  // Game state
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid());
  const [originalGrid, setOriginalGrid] = useState<number[][]>(createEmptyGrid());
  const [solution, setSolution] = useState<number[][]>(createEmptyGrid());
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [hintCell, setHintCell] = useState<[number, number] | null>(null);
  const [invalidCells, setInvalidCells] = useState<Array<[number, number]>>([]);
  
  // Initialize a new game on component mount
  useEffect(() => {
    startNewGame(difficulty);
  }, []);
  
  // Clear hint cell after a delay
  useEffect(() => {
    if (hintCell) {
      const timer = setTimeout(() => {
        setHintCell(null);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [hintCell]);
  
  // Handle cell value change
  const handleCellChange = (row: number, col: number, value: number) => {
    // If it's an original cell, don't allow changes
    if (originalGrid[row][col] !== 0) return;
    
    // Create a new grid with the updated value
    const newGrid = copyGrid(grid);
    newGrid[row][col] = value;
    
    // Check if the placement is valid
    if (value !== 0 && !isValidPlacement(grid, row, col, value)) {
      // Mark the cell as invalid
      setInvalidCells(prev => [...prev, [row, col]]);
    } else {
      // Remove the cell from invalid cells if it was invalid before
      setInvalidCells(prev => prev.filter(([r, c]) => !(r === row && c === col)));
    }
    
    setGrid(newGrid);
    
    // Check if the puzzle is solved
    if (value !== 0 && isPuzzleSolved(newGrid)) {
      toast.success('Congratulations! You solved the puzzle!', {
        duration: 3000,
      });
    }
  };
  
  // Check if the puzzle is solved
  const isPuzzleSolved = (currentGrid: number[][]) => {
    // Check if the grid is full (no zeros)
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (currentGrid[row][col] === 0) return false;
      }
    }
    
    // Check if the grid is valid
    return isValidGrid(currentGrid);
  };
  
  // Handle number pad button click
  const handleNumberClick = (num: number) => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      handleCellChange(row, col, num);
    }
  };
  
  // Handle erase button click
  const handleEraseClick = () => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      handleCellChange(row, col, 0);
    }
  };
  
  // Solve the puzzle
  const handleSolve = () => {
    const solutionGrid = copyGrid(grid);
    
    if (solveSudoku(solutionGrid)) {
      setGrid(solutionGrid);
      toast.success('Puzzle solved!', {
        duration: 3000,
      });
    } else {
      toast.error('This puzzle cannot be solved. Check for errors.', {
        duration: 3000,
      });
    }
  };
  
  // Get a hint
  const handleHint = () => {
    // If the puzzle is already solved, return
    if (isPuzzleSolved(grid)) {
      toast('The puzzle is already solved!', {
        duration: 3000,
      });
      return;
    }
    
    // Create a temporary solution grid if needed
    let solGrid = solution;
    if (solGrid.some(row => row.some(cell => cell === 0))) {
      solGrid = copyGrid(grid);
      if (!solveSudoku(solGrid)) {
        toast.error('Cannot provide a hint. The current puzzle has no solution.', {
          duration: 3000,
        });
        return;
      }
      setSolution(solGrid);
    }
    
    // Get a hint cell and value
    const hint = getHint(grid, solGrid);
    if (hint) {
      const [row, col, value] = hint;
      
      // Update the grid with the hint
      const newGrid = copyGrid(grid);
      newGrid[row][col] = value;
      setGrid(newGrid);
      
      // Set the hint cell to highlight it
      setHintCell([row, col]);
      
      // Remove from invalid cells if it was there
      setInvalidCells(prev => prev.filter(([r, c]) => !(r === row && c === col)));
      
      // Check if the puzzle is solved with this hint
      if (isPuzzleSolved(newGrid)) {
        toast.success('Congratulations! The puzzle is solved!', {
          duration: 3000,
        });
      }
    } else {
      toast('No more hints needed. The puzzle is complete!', {
        duration: 3000,
      });
    }
  };
  
  // Reset the puzzle to its original state
  const handleReset = () => {
    setGrid(copyGrid(originalGrid));
    setInvalidCells([]);
    setHintCell(null);
    toast('Puzzle reset to the initial state', {
      duration: 2000,
    });
  };
  
  // Start a new game
  const handleNewGame = () => {
    startNewGame(difficulty);
    toast(`New ${difficulty} puzzle generated`, {
      duration: 2000,
    });
  };
  
  // Generate a new puzzle with the given difficulty
  const startNewGame = (diff: 'easy' | 'medium' | 'hard') => {
    const { puzzle, solution } = generatePuzzle(diff);
    setGrid(copyGrid(puzzle));
    setOriginalGrid(copyGrid(puzzle));
    setSolution(solution);
    setInvalidCells([]);
    setHintCell(null);
    setSelectedCell(null);
  };
  
  // Change the difficulty
  const handleChangeDifficulty = (diff: 'easy' | 'medium' | 'hard') => {
    if (diff !== difficulty) {
      setDifficulty(diff);
      startNewGame(diff);
      toast(`Difficulty changed to ${diff}`, {
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Toaster position="top-center" closeButton />
      
      <Header />
      
      <main className="flex-1 container max-w-3xl mx-auto p-4 pb-16">
        <div className="w-full max-w-md mx-auto">
          <SudokuGrid 
            grid={grid} 
            originalGrid={originalGrid}
            onCellChange={handleCellChange}
            hintCell={hintCell}
            invalidCells={invalidCells}
          />
          
          <NumberPad 
            onNumberClick={handleNumberClick}
            onEraseClick={handleEraseClick}
            selectedCell={selectedCell}
            originalGrid={originalGrid}
          />
          
          <ControlPanel 
            onSolve={handleSolve}
            onHint={handleHint}
            onReset={handleReset}
            onNewGame={handleNewGame}
            onChangeDifficulty={handleChangeDifficulty}
            currentDifficulty={difficulty}
          />
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>A beautiful Sudoku solver created with love</p>
      </footer>
    </div>
  );
};

export default Index;
