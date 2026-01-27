import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          autoplay?: boolean;
          loop?: boolean;
        },
        HTMLElement
      >;
    }
  }
}

interface LottieIconProps {
  className?: string;
}

export const LottieIcon: React.FC<LottieIconProps> = ({ className = '' }) => {
  return (
    <dotlottie-wc
      src="https://lottie.host/d1e57743-94b1-417e-bd16-629fd0065004/NDCqBiuHx2.lottie"
      autoplay
      loop
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
};