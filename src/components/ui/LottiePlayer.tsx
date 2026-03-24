import React, { useEffect, useRef, useState } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const start = () => setIsVisible(true);
            const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number }).requestIdleCallback;
            if (idle) {
              idle(start, { timeout: 500 });
            } else {
              setTimeout(start, 200);
            }
            observer.disconnect();
          }
        });
      },
      { rootMargin: '0px', threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const loadScript = () => {
      if (!document.querySelector('script[src*="dotlottie-wc"]')) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.5/dist/dotlottie-wc.js';
        script.type = 'module';
        script.async = true;
        // @ts-ignore
        script.defer = true;
        script.onload = () => setScriptLoaded(true);
        document.head.appendChild(script);
      } else {
        setScriptLoaded(true);
      }
    };

    // Defer even further to prevent blocking initial paints
    const idleCallback = (window as any).requestIdleCallback;
    if (idleCallback) {
      idleCallback(() => loadScript(), { timeout: 1000 });
    } else {
      setTimeout(loadScript, 500);
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} className={`flex items-center justify-center ${className}`}>
      {isVisible && scriptLoaded ? (
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
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100/50 animate-pulse rounded-lg" style={{ minHeight: '200px' }}>
          <div className="text-gray-400 text-sm">Chargement...</div>
        </div>
      )}
    </div>
  );
};
