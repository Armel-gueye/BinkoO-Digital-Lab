'use client'

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TubelightButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export function TubelightButton({ text, className, onClick }: TubelightButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-colors',
        'text-primary-foreground bg-primary',
        className
      )}
    >
      <span className="flex items-center relative z-10">
        {text}
        <ArrowRight className="ml-2 h-5 w-5" />
      </span>
      <div className="absolute inset-0 rounded-full bg-primary/5 transition-transform duration-300 transform scale-100 group-hover:scale-110 -z-10" />

      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
          <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
          <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
      </div>
    </button>
  );
}
