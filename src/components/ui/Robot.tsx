import { Suspense, lazy, useState, useEffect, useRef } from 'react'
import type { Application } from '@splinetool/runtime'
import { getDeviceCapabilities } from '@/utils/deviceCapabilities'

const Spline = lazy(() => import('@splinetool/react-spline'))

// Static fallback image for low-end devices
const ROBOT_FALLBACK_IMAGE = 'https://i.postimg.cc/bJyzr724/Capture-d-ecran-2026-01-03-114717.webp';

export default function Robot() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [canRender3D, setCanRender3D] = useState<boolean | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<Application | null>(null);

  // Check device capabilities on mount
  useEffect(() => {
    const capabilities = getDeviceCapabilities();
    setCanRender3D(capabilities.canHandle3D);

    // Log for debugging (can be removed in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Robot] Device capabilities:', capabilities);
    }
  }, []);

  // IntersectionObserver to pause 3D when off-screen (performance optimization)
  useEffect(() => {
    if (!containerRef.current || !canRender3D) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [canRender3D]);

  // Pause/resume Spline based on visibility
  useEffect(() => {
    if (!splineAppRef.current) return;

    if (isVisible) {
      splineAppRef.current.play();
    } else {
      splineAppRef.current.stop();
    }
  }, [isVisible]);

  const onLoad = (splineApp: Application) => {
    splineAppRef.current = splineApp;

    // Ensure the robot appears at its final size without zoom animation
    splineApp.setZoom(1);

    // If not visible on load, pause immediately
    if (!isVisible) {
      splineApp.stop();
    }

    // Delay the fade-in by 0.5s after complete loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  };

  // Still determining device capabilities - show nothing (brief moment)
  if (canRender3D === null) {
    return <div ref={containerRef} className="w-full h-full bg-transparent"></div>;
  }

  // Low-end device: Show static image fallback
  if (!canRender3D) {
    return (
      <div ref={containerRef} className="w-full h-full relative">
        <img
          src={ROBOT_FALLBACK_IMAGE}
          alt="Robot BinkoO Digital Lab"
          className="w-full h-full object-contain opacity-100"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  // High-end device: Show 3D Spline
  return (
    <div ref={containerRef} className="w-full h-full">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-transparent">
            {/* Clean, simple loading state - no visible loader */}
            <div className="w-full h-full bg-transparent"></div>
          </div>
        }
      >
        <Spline
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className={`w-full h-full transition-opacity duration-[600ms] ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={onLoad}
        />
      </Suspense>
    </div>
  )
}