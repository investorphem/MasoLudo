"use client";
import React from 'react';

// Premium Ludo Colors
const COLORS = {
  green: "bg-emerald-500",
  red: "bg-rose-500",
  yellow: "bg-amber-400",
  blue: "bg-sky-500",
  path: "bg-slate-800",
  safe: "bg-slate-700",
};

export default function LudoBoard() {
  // A standard Ludo board is a 15x15 grid. 
  // 0-5 and 9-14 are the home bases. 
  // The middle cross (rows 6, 7, 8 and cols 6, 7, 8) is the path.
  
  const renderSquare = (row: number, col: number) => {
    // 1. Home Bases (Top-Left, Top-Right, Bottom-Left, Bottom-Right)
    if (row < 6 && col < 6) return <div className={`${COLORS.red} opacity-20 m-0.5 rounded-sm`} />;
    if (row < 6 && col > 8) return <div className={`${COLORS.green} opacity-20 m-0.5 rounded-sm`} />;
    if (row > 8 && col < 6) return <div className={`${COLORS.blue} opacity-20 m-0.5 rounded-sm`} />;
    if (row > 8 && col > 8) return <div className={`${COLORS.yellow} opacity-20 m-0.5 rounded-sm`} />;

    // 2. The Center (Finish Zone)
    if (row >= 6 && row <= 8 && col >= 6 && col <= 8) {
      if (row === 7 && col === 7) return <div className="bg-white opacity-10 m-0.5 rounded-full" />;
      return <div className="bg-slate-900 m-0.5" />;
    }

    // 3. The Paths
    let color = COLORS.path;
    
    // Highlight winning paths
    if (row === 7 && col > 0 && col < 6) color = COLORS.red;
    if (row === 7 && col > 8 && col < 14) color = COLORS.green;
    if (col === 7 && row > 0 && row < 6) color = COLORS.blue; // (Adjusted for typical board layout)
    if (col === 7 && row > 8 && row < 14) color = COLORS.yellow;

    return <div className={`${color} m-[1px] rounded-sm shadow-inner opacity-60`} />;
  };

  return (
    <div className="w-full max-w-md mx-auto aspect-square bg-slate-950 p-2 rounded-3xl border-4 border-slate-900 shadow-2xl relative">
      {/* 15x15 Grid Layout */}
      <div className="grid grid-cols-15 grid-rows-15 h-full w-full">
        {Array.from({ length: 15 }).map((_, row) =>
          Array.from({ length: 15 }).map((_, col) => (
            <React.Fragment key={`${row}-${col}`}>
              {renderSquare(row, col)}
            </React.Fragment>
          ))
        )}
      </div>

      {/* Overlays: Home Base Tokens */}
      {/* Top Left (Red) */}
      <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] grid grid-cols-2 p-4">
        <Token color="bg-rose-500" />
        <Token color="bg-rose-500" />
        <Token color="bg-rose-500" />
        <Token color="bg-rose-500" />
      </div>

      {/* Bottom Right (Yellow) */}
      <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] grid grid-cols-2 p-4">
        <Token color="bg-amber-400" />
        <Token color="bg-amber-400" />
        <Token color="bg-amber-400" />
        <Token color="bg-amber-400" />
      </div>

      {/* Dice Area (Center) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-800 rounded-2xl border-2 border-slate-700 shadow-lg flex items-center justify-center">
        <span className="text-2xl font-black text-white">5</span>
      </div>
    </div>
  );
}

function Token({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className={`${color} w-6 h-6 rounded-full border-2 border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.3)] animate-pulse`} />
    </div>
  );
}
