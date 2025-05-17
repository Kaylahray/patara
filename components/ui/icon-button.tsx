import React from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function IconButton({ children, className, ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        "bg-secondary rounded-[12px] flex w-10 h-10 justify-center items-center aspect-square cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
