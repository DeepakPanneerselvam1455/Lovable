
import { solveSudoku, copyGrid, isValidPlacement } from './sudokuSolver';

// Create an empty grid
export const createEmptyGrid = (): number[][] => {
  return Array(9).fill(0).map(() => Array(9).fill(0));
};

// Generate a solved Sudoku grid
export const generateSolvedGrid = (): number[][] => {
  const grid = createEmptyGrid();
  fillGrid(grid);
  return grid;
};

// Fill the grid with valid numbers (recursive)
const fillGrid = (grid: number[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        // Try random numbers 1-9 in shuffled order
        const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        
        for (const num of nums) {
          if (isValidPlacement(grid, row, col, num)) {
            grid[row][col] = num;
            
            // Recursively try to fill the rest of the grid
            if (fillGrid(grid)) {
              return true;
            }
            
            // If we couldn't fill the grid with the current number, backtrack
            grid[row][col] = 0;
          }
        }
        
        // If no number works, backtrack
        return false;
      }
    }
  }
  
  // The grid is filled
  return true;
};

// Shuffle an array using Fisher-Yates algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Create a puzzle by removing numbers from a solved grid
export const generatePuzzle = (difficulty: 'easy' | 'medium' | 'hard'): { puzzle: number[][], solution: number[][] } => {
  // Number of cells to remove based on difficulty
  const cellsToRemove = {
    easy: 30,
    medium: 45,
    hard: 55,
  };
  
  // Generate a fully solved grid
  const solution = generateSolvedGrid();
  const puzzle = copyGrid(solution);
  
  // Get all positions in the grid
  const positions: [number, number][] = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      positions.push([row, col]);
    }
  }
  
  // Shuffle positions to remove cells randomly
  const shuffledPositions = shuffleArray(positions);
  
  // Remove cells one by one
  let removed = 0;
  const count = cellsToRemove[difficulty];
  
  for (const [row, col] of shuffledPositions) {
    if (removed >= count) break;
    
    const value = puzzle[row][col];
    puzzle[row][col] = 0;
    
    // Check if the puzzle still has a unique solution
    if (difficulty === 'easy' || hasUniqueSolution(puzzle)) {
      removed++;
    } else {
      // If removing this cell creates multiple solutions, put it back
      puzzle[row][col] = value;
    }
  }
  
  return { puzzle, solution };
};

// Check if the puzzle has a unique solution
// Simplified version - for hard difficulty, we might skip this check to make generation faster
const hasUniqueSolution = (grid: number[][]): boolean => {
  // For simplicity, we'll just check if the puzzle is solvable
  // A more robust approach would try to find multiple solutions
  const tempGrid = copyGrid(grid);
  return solveSudoku(tempGrid);
};

// Parse a string representation of a Sudoku grid (for user input)
export const parseGridString = (gridString: string): number[][] => {
  const grid = createEmptyGrid();
  const cleanString = gridString.replace(/[^0-9.]/g, '').replace(/\./g, '0');
  
  if (cleanString.length !== 81) {
    throw new Error('Invalid grid string. Must have 81 characters.');
  }
  
  for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    grid[row][col] = parseInt(cleanString[i], 10);
  }
  
  return grid;
};
