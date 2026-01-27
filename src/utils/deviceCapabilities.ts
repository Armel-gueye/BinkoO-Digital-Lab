export interface DeviceCapabilities {
    isLowEnd: boolean;
    isHighEnd: boolean;
    prefersReducedMotion: boolean;
    canHandle3D: boolean;
}

export function detectDeviceCapabilities(): DeviceCapabilities {
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        return {
            isLowEnd: true,
            isHighEnd: false,
            prefersReducedMotion: true,
            canHandle3D: false
        };
    }

    const cores = navigator.hardwareConcurrency || 2;

    const memory = (navigator as any).deviceMemory || 2;

    const isMobileOS =
        typeof navigator !== 'undefined' && (
            /Android/i.test(navigator.userAgent) ||
            /iPhone|iPad|iPod/i.test(navigator.userAgent)
        );

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    const isAndroid = /Android/.test(navigator.userAgent);

    let isLowEnd = false;
    let isHighEnd = false;

    if (!isMobileOS) {
        isHighEnd = true;
    }
    else if (isIOS && cores >= 4) {
        isHighEnd = true;
    }
    else if (isAndroid && cores >= 8 && memory >= 6) {
        isHighEnd = true;
    }
    else {
        isLowEnd = true;
    }

    return {
        isLowEnd,
        isHighEnd,
        prefersReducedMotion,
        canHandle3D: isHighEnd && !prefersReducedMotion
    };
}

export function canHandle3D(): boolean {
    return detectDeviceCapabilities().canHandle3D;
}

export function getDeviceCapabilities(): DeviceCapabilities {
    if (typeof window === 'undefined') {
        return {
            isLowEnd: true,
            isHighEnd: false,
            prefersReducedMotion: false,
            canHandle3D: false
        };
    }
    return detectDeviceCapabilities();
}
