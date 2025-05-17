import { ReactNode } from "react";

interface OrbitBackgroundProps {
  size?: number;
  rings?: number;
  color?: string;
  strokeWidth?: number;
  gap?: number;
  children?: ReactNode;
  className?: string;
}

export function OrbitBackground({
  size = 200,
  rings = 4,
  color = "#383838",
  strokeWidth = 2,
  gap = 28,
  children,
  className = "",
}: OrbitBackgroundProps) {
  const center = size / 2;
  const innerRadius = 67.5;

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="pointer-events-none absolute inset-1/4 z-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,transparent_20,#53B1FD_120%,transparent_100%)] blur-[2.5rem]" />
      <svg
        width={size}
        height={size}
        className="pointer-events-none absolute top-0 left-0 z-0"
      >
        {[...Array(rings)].map((_, i) => {
          const opacity = 1 - i * 0.15;

          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={innerRadius + gap * i}
              stroke={typeof color === "string" ? color : "#383838"}
              strokeWidth={strokeWidth}
              fill="none"
              style={{ opacity }}
            />
          );
        })}
      </svg>
      <div
        className="absolute top-0 left-0 z-10 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {children}
      </div>
    </div>
  );
}

export default OrbitBackground;
