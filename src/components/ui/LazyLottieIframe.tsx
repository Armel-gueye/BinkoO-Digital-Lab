import React, { useEffect, useRef, useState } from 'react';

interface LazyLottieIframeProps {
  src: string;
  style?: React.CSSProperties;
  className?: string;
  title?: string;
  threshold?: number;
}

/**
 * LazyLottieIframe - Composant optimisé pour charger les Lotties via iframe uniquement lorsqu'ils sont visibles
 * Utilise IntersectionObserver pour détecter la visibilité
 */
export const LazyLottieIframe: React.FC<LazyLottieIframeProps> = ({ 
  src, 
  style = { width: '100%', height: '100%' }, 
  className = '',
  title = 'Lottie Animation',
  threshold = 0.1 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer pour lazy loading
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { 
        threshold,
        rootMargin: '100px' // Commence à charger 100px avant d'être visible
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={style}
    >
      {isVisible ? (
        <iframe
          src={src}
          style={{ width: '100%', height: '100%', border: 'none', ...style }}
          title={title}
          loading="lazy"
        />
      ) : (
        // Placeholder pendant le chargement
        <div 
          className="w-full h-full flex items-center justify-center bg-gray-100/50 animate-pulse rounded-lg"
          style={{ minHeight: '200px' }}
        >
          <div className="text-gray-400 text-sm">Chargement...</div>
        </div>
      )}
    </div>
  );
};

export default LazyLottieIframe;
