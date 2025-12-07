/**
 * Lenis Smooth Scrolling Integration (Optimized for Performance)
 * 
 * This script initializes Lenis for smooth scrolling with adaptive settings
 * based on device capabilities, specifically targeting low-power devices.
 * It also implements a "Disable Hover on Scroll" technique to reduce repaint costs.
 */
import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm';

const initLenis = () => {
    try {
        // --------------------------------------------------------
        // Performance Detection
        // --------------------------------------------------------
        // Logical core count is a rough proxy for device performance.
        // < 4 cores usually indicates older or budget mobile devices.
        const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // --------------------------------------------------------
        // Configuration
        // --------------------------------------------------------
        const config = {
            duration: isLowPower ? 0.9 : 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: !prefersReducedMotion,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        };

        if (isLowPower) {
            console.log('Lenis: Low-power mode active (Duration: 0.9s)');
        } else {
            console.log('Lenis: High-performance mode active (Duration: 1.2s)');
        }

        const lenis = new Lenis(config);

        // --------------------------------------------------------
        // Optimization: Disable Hover on Scroll
        // --------------------------------------------------------
        // Inject CSS to disable pointer events during scroll
        const style = document.createElement('style');
        style.innerHTML = `
      .is-scrolling { pointer-events: none !important; }
      .is-scrolling * { pointer-events: none !important; }
    `;
        document.head.appendChild(style);

        let isScrollingTimer;

        // Listen for scroll events from Lenis
        lenis.on('scroll', () => {
            // Add class to body
            if (!document.body.classList.contains('is-scrolling')) {
                document.body.classList.add('is-scrolling');
            }

            // Clear existing timer
            if (isScrollingTimer) clearTimeout(isScrollingTimer);

            // Remove class after scroll stops (debounce)
            isScrollingTimer = setTimeout(() => {
                document.body.classList.remove('is-scrolling');
            }, 150); // 150ms after last scroll event
        });

        // --------------------------------------------------------
        // Core Loop
        // --------------------------------------------------------
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        console.log('Lenis smooth scrolling initialized successfully.');

        // --------------------------------------------------------
        // Anchor Links Handling
        // --------------------------------------------------------
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
