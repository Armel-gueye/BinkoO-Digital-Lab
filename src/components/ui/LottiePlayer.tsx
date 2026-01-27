import React, { useEffect, useRef } from 'react';

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

interface LottiePlayerProps {
  src: string;
  className?: string;
}

export const LottiePlayer: React.FC<LottiePlayerProps> = ({ src, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.querySelector('script[src*="dotlottie-wc"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.5/dist/dotlottie-wc.js';
      script.type = 'module';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div ref={containerRef} className={`flex items-center justify-center ${className}`}>
      <dotlottie-wc
        src={src}
        autoplay
        loop
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      />
    </div>
  );
};