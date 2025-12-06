/**
 * Lenis Smooth Scrolling Integration (Optimized for Performance)
 * 
 * This script initializes Lenis for smooth scrolling with adaptive settings
 * based on device capabilities, specifically targeting low-power devices.
 */
import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm';

const initLenis = () => {
    try {
        // Performance Detection
        // Logical core count is a rough proxy for device performance.
        // < 4 cores usually indicates older or budget mobile devices.
        const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Configuration
        // Low Power: Shorter duration and snappier easing to prevent "floaty" lag.
        // High Power: Longer duration for luxurious smooth feel.
        const config = {
            duration: isLowPower ? 0.9 : 1.2,
            easing: isLowPower
                ? (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Standard exponential ease out
                : (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Same easing, difference is mainly duration
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: !prefersReducedMotion, // Disable smooth scroll if user prefers reduced motion
            mouseMultiplier: 1,
            smoothTouch: false, // Keep disabled on touch devices to use native scroll (most performant)
            touchMultiplier: 2,
        };

        if (isLowPower) {
            console.log('Lenis: Low-power mode active (Duration: 0.9s)');
        } else {
            console.log('Lenis: High-performance mode active (Duration: 1.2s)');
        }

        const lenis = new Lenis(config);

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        console.log('Lenis smooth scrolling initialized successfully.');

        // Handling anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                lenis.scrollTo(this.getAttribute('href'));
            });
        });

    } catch (error) {
        console.error('Failed to initialize Lenis:', error);
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLenis);
} else {
    initLenis();
}
