import { useState, useEffect } from 'react';

export function useMotionPermission(isCoarse: boolean) {
    const [motionAllowed, setMotionAllowed] = useState<boolean>(false);

    const isIOS = () => {
        if (typeof navigator === 'undefined') return false;
        return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.userAgent.includes('Mac') && typeof document !== 'undefined' && 'ontouchend' in document);
    };

    useEffect(() => {
        if (!isCoarse) return;
        // Check if permission is needed (iOS 13+)
        // If requestPermission is not present, we assume allowed (Android/older iOS)
        const needPerm = typeof (DeviceOrientationEvent as any)?.requestPermission === 'function';
        if (!needPerm) {
            setMotionAllowed(true);
        }
    }, [isCoarse]);

    const requestIOSMotion = async () => {
        try {
            const req = (DeviceOrientationEvent as any)?.requestPermission;
            if (typeof req === 'function') {
                const perm = await req();
                if (perm === 'granted') setMotionAllowed(true);
            }
        } catch {
            setMotionAllowed(false);
        }
    };

    return { motionAllowed, requestIOSMotion, isIOS: isIOS() };
}
