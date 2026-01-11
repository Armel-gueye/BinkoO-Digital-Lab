"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PulsatingButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    pulseColor?: string;
    duration?: string;
}

export function PulsatingButton({
    className,
    children,
    pulseColor = "#dc2626",
    duration = "1.5s",
    ...props
}: PulsatingButtonProps) {
    return (
        <button
            className={cn(
                "relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-red-600 rounded-full cursor-pointer",
                "hover:bg-red-700 transition-colors duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                className
            )}
            style={
                {
                    "--pulse-color": pulseColor,
                    "--duration": duration,
                } as React.CSSProperties
            }
            {...props}
        >
            <div className="relative z-10">{children}</div>
            <div
                className="absolute rounded-full animate-pulse-ring-1"
                style={{ backgroundColor: pulseColor, inset: '-4px', zIndex: -1 }}
            />
            <div
                className="absolute rounded-full animate-pulse-ring-2"
                style={{ backgroundColor: pulseColor, inset: '-8px', zIndex: -2 }}
            />
            <div
                className="absolute rounded-full animate-pulse-ring-3"
                style={{ backgroundColor: pulseColor, inset: '-12px', zIndex: -3 }}
            />
        </button>
    );
}
