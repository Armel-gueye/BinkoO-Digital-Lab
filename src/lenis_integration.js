/**
 * Lenis Smooth Scrolling Integration
 * 
 * This script initializes Lenis for smooth scrolling.
 * It uses a CDN import to avoid adding dependencies to package.json.
 */
import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm';

const initLenis = () => {
    try {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            direction: 'vertical', // vertical or horizontal
            gestureDirection: 'vertical', // vertical or horizontal
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        console.log('Lenis smooth scrolling initialized successfully.');

        // Handling anchor links if necessary (Lenis usually handles this, but good to ensure)
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
