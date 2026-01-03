/**
 * Device Capabilities Detection Utility
 * 
 * Conservative detection to identify low/medium-end devices that should
 * receive simplified experiences (static images instead of 3D, reduced animations).
 * 
 * IMPORTANT: We err on the side of caution - if uncertain, assume device is low-end.
 */

export interface DeviceCapabilities {
    isLowEnd: boolean;
    isHighEnd: boolean;
    prefersReducedMotion: boolean;
    canHandle3D: boolean;
    reason: string;
}

/**
 * Detects device capabilities using available browser APIs.
 * 
 * Classification logic (conservative):
 * - HIGH-END: Desktop with good specs, or mobile with 8+ cores and 8GB+ RAM
 * - LOW-END: Everything else (mobile by default, low RAM, few cores, reduced motion)
 * 
 * We intentionally classify "medium" devices as low-end to ensure smooth experience.
 */
export function detectDeviceCapabilities(): DeviceCapabilities {
    // Check for reduced motion preference (accessibility)
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // If user prefers reduced motion, respect that immediately
    if (prefersReducedMotion) {
        return {
            isLowEnd: true,
            isHighEnd: false,
            prefersReducedMotion: true,
            canHandle3D: false,
            reason: 'User prefers reduced motion'
        };
    }

    // Check hardware concurrency (CPU cores)
    // Most low-end phones have 4 or fewer cores
    // Mid-range: 6-8 cores, High-end: 8+ cores
    const cores = navigator.hardwareConcurrency || 2;

    // Check device memory (in GB) - only available in some browsers
    // Low-end: 2-3GB, Mid-range: 4-6GB, High-end: 8GB+
    const memory = (navigator as any).deviceMemory || 2; // Default to low if unknown

    // Check if mobile device (touch + small screen = likely mobile)
    const isMobile =
        typeof window !== 'undefined' && (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            window.innerWidth < 1024
        );

    // Check for iOS (often well-optimized but we'll be conservative on older models)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Check for Android
    const isAndroid = /Android/.test(navigator.userAgent);

    // Conservative classification
    let isLowEnd = false;
    let isHighEnd = false;
    let reason = '';

    // DESKTOP = ALWAYS 3D (no detection, user has other plans for desktop)
    if (!isMobile) {
        isHighEnd = true;
        reason = `Desktop device - always capable`;
    }
    // Modern iOS devices (iPhone 12+) are generally capable
    // But we'll only trust iOS if it has enough cores
    else if (isIOS && cores >= 6) {
        isHighEnd = true;
        reason = `iOS device: ${cores} cores`;
    }
    // High-end Android: 8+ cores AND 6+ GB RAM
    else if (isAndroid && cores >= 8 && memory >= 6) {
        isHighEnd = true;
        reason = `High-end Android: ${cores} cores, ${memory}GB RAM`;
    }
    // All other MOBILE devices are considered low-end (conservative approach)
    else {
        isLowEnd = true;
        reason = `Mobile device: ${cores} cores, ${memory}GB RAM`;
    }

    return {
        isLowEnd,
        isHighEnd,
        prefersReducedMotion,
        canHandle3D: isHighEnd && !prefersReducedMotion,
        reason
    };
}

/**
 * Simple check for 3D capability - use this for quick decisions
 */
export function canHandle3D(): boolean {
    return detectDeviceCapabilities().canHandle3D;
}

/**
 * Hook-friendly version that can be used in React components
 */
export function getDeviceCapabilities(): DeviceCapabilities {
    if (typeof window === 'undefined') {
        // SSR fallback - assume low-end to be safe
        return {
            isLowEnd: true,
            isHighEnd: false,
            prefersReducedMotion: false,
            canHandle3D: false,
            reason: 'Server-side rendering'
        };
    }
    return detectDeviceCapabilities();
}
