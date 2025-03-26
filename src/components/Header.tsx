
import React from 'react';
import { Grid3X3 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 animate-fade-in">
      <div className="container flex flex-col items-center justify-center max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <Grid3X3 className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-semibold tracking-tight">Sudoku Solver</h1>
        </div>
        <p className="text-muted-foreground text-center max-w-lg">
          A beautiful and elegant way to solve any Sudoku puzzle
        </p>
      </div>
    </header>
  );
};

export default Header;
