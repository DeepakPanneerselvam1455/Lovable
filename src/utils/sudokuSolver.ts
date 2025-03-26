
/**
 * Sudoku solver utility functions
 */

// Check if a number is valid at a specific position
export const isValidPlacement = (grid: number[][], row: number, col: number, num: number): boolean => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }

  // Check column
  for (let y = 0; y < 9; y++) {
    if (grid[y][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (grid[boxRow + y][boxCol + x] === num) return false;
    }
  }

  return true;
};

// Find an empty cell in the grid
export const findEmptyCell = (grid: number[][]): [number, number] | null => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null; // No empty cells found
};

// Solve the Sudoku puzzle using backtracking
export const solveSudoku = (grid: number[][]): boolean => {
  const emptyCell = findEmptyCell(grid);
  
  // If no empty cell is found, the puzzle is solved
  if (!emptyCell) return true;
  
  const [row, col] = emptyCell;
  
  // Try numbers 1-9
  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(grid, row, col, num)) {
      grid[row][col] = num;
      
      // Recursively try to solve the rest of the puzzle
      if (solveSudoku(grid)) {
        return true;
      }
      
      // If placing this number didn't lead to a solution, undo and try the next number
      grid[row][col] = 0;
    }
  }
  
  // No solution found with current configuration
  return false;
};

// Get a hint (fills one empty cell)
export const getHint = (grid: number[][], solution: number[][]): [number, number, number] | null => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return [row, col, solution[row][col]];
      }
    }
  }
  return null; // No empty cells found
};

// Create a deep copy of a grid
export const copyGrid = (grid: number[][]): number[][] => {
  return grid.map(row => [...row]);
};

// Check if the current state of the grid is valid
export const isValidGrid = (grid: number[][]): boolean => {
  // Check rows
  for (let row = 0; row < 9; row++) {
    const seen = new Set();
    for (let col = 0; col < 9; col++) {
      const value = grid[row][col];
      if (value !== 0) {
        if (seen.has(value)) return false;
        seen.add(value);
      }
    }
  }

  // Check columns
  for (let col = 0; col < 9; col++) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
      const value = grid[row][col];
      if (value !== 0) {
        if (seen.has(value)) return false;
        seen.add(value);
      }
    }
  }

  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Set();
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const r = boxRow * 3 + row;
          const c = boxCol * 3 + col;
          const value = grid[r][c];
          if (value !== 0) {
            if (seen.has(value)) return false;
            seen.add(value);
          }
        }
      }
    }
  }

  return true;
};
