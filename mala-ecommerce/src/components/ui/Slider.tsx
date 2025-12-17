"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  className?: string;
}

export function Slider({ min, max, value, onChange, step = 1, className }: SliderProps) {
  const [, setIsDragging] = useState<"min" | "max" | null>(null);

  const getPercentage = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max]
  );

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), value[1] - step);
    onChange([newMin, value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), value[0] + step);
    onChange([value[0], newMax]);
  };

  return (
    <div className={cn("relative h-2 w-full", className)}>
      {/* Track background */}
      <div className="absolute inset-0 rounded-full bg-muted" />
      
      {/* Active track */}
      <div
        className="absolute top-0 h-full rounded-full bg-primary"
        style={{
          left: `${getPercentage(value[0])}%`,
          width: `${getPercentage(value[1]) - getPercentage(value[0])}%`,
        }}
      />
      
      {/* Min thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleMinChange}
        onMouseDown={() => setIsDragging("min")}
        onMouseUp={() => setIsDragging(null)}
        onTouchStart={() => setIsDragging("min")}
        onTouchEnd={() => setIsDragging(null)}
        className="pointer-events-none absolute inset-0 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
      />
      
      {/* Max thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={handleMaxChange}
        onMouseDown={() => setIsDragging("max")}
        onMouseUp={() => setIsDragging(null)}
        onTouchStart={() => setIsDragging("max")}
        onTouchEnd={() => setIsDragging(null)}
        className="pointer-events-none absolute inset-0 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
      />
    </div>
  );
}
