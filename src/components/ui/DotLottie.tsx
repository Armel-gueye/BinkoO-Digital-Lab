import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          autoplay?: boolean;
          loop?: boolean;
          style?: React.CSSProperties;
        },
        HTMLElement
      >;
    }
  }
}

interface DotLottieProps {
  src: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}

export const DotLottie: React.FC<DotLottieProps> = ({ 
  src, 
  className = '',
  width = '100%',
  height = '100%'
}) => {
  return (
    <dotlottie-wc
      src={src}
      autoplay
      loop
      className={className}
      style={{ width, height }}
    />
  );
};