import React from 'react';

interface HighlighterProps {
  children: React.ReactNode;
  action: 'underline' | 'highlight';
  color: string;
  className?: string;
}

// Helper function to determine if color is light gray
const isLightGrayColor = (color: string): boolean => {
  const lightGrayColors = ['#F3F4F6', '#BEBEBE', '#E5E7EB', '#F5F5F5', '#EEEEEE'];
  return lightGrayColors.some(gray => color.toUpperCase() === gray.toUpperCase());
};

export const Highlighter: React.FC<HighlighterProps> = ({
  children,
  action,
  color,
  className = ''
}) => {
  if (action === 'underline') {
    return (
      <span
        className={`relative inline animate-fadeIn ${className}`}
        style={{
          textDecoration: 'underline',
          textDecorationColor: color,
          textDecorationThickness: '2px',
          textUnderlineOffset: '3px'
        }}
      >
        {children}
      </span>
    );
  }

  const textColor = isLightGrayColor(color) ? '#000000' : '#ffffff';
  
  return (
    <span
      className={`relative inline px-1 rounded animate-fadeIn ${className}`}
      style={{
        backgroundColor: color,
        color: textColor,
        fontWeight: '500'
      }}
    >
      {children}
    </span>
  );
};