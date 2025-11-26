import { useEffect } from 'react';

const EMOJIS = ['✨', '⚡', '💥', '🔥', '💫', '🫶', '🚀', '🎯', '🌈', '🧩', '🫡'];

interface ParticleBackgroundProps {
    isCoarse: boolean;
}

export default function ParticleBackground({ isCoarse }: ParticleBackgroundProps) {
    // Spawn emoji function
    const spawnEmoji = (
        x: number, y: number,
        opacity = 0.9, desktopLight = false, idle = false
    ) => {
        const span = document.createElement('span');
        span.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        span.style.position = 'fixed';
        span.style.left = x + 'px';
        span.style.top = y + 'px';
        span.style.pointerEvents = 'none';
        span.style.zIndex = '50';
        span.style.fontSize = (idle ? 12 : 12 + Math.floor(Math.random() * 16)) + 'px';
        span.style.opacity = String(opacity);
        span.style.transform = `translate(-50%, -50%) scale(${idle ? 0.9 : 0.8 + Math.random() * 0.6})`;
        const driftX = (Math.random() - 0.5) * (idle ? 60 : 160);
        const driftY = idle ? -(40 + Math.random() * 40) : -80 - Math.random() * 80;
        const rotate = (Math.random() - 0.5) * (idle ? 30 : 90);

        document.body.appendChild(span);
        const duration = desktopLight ? 500 + Math.random() * 600 : 900 + Math.random() * 900;

        if ((span as any).animate) {
            (span as any)
                .animate(
                    [
                        { transform: span.style.transform, opacity: opacity },
                        { transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) rotate(${rotate}deg)`, opacity: 0 },
                    ],
                    { duration, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' }
                )
                .finished.finally(() => span.remove());
        } else {
            setTimeout(() => span.remove(), duration);
        }
    };

    // Desktop cursor trail
    useEffect(() => {
        if (isCoarse) return;

        const onMove = (e: MouseEvent) => {
            spawnEmoji(e.clientX, e.clientY, 0.9, true);
        };

        window.addEventListener('mousemove', onMove);
        return () => {
            window.removeEventListener('mousemove', onMove);
        };
    }, [isCoarse]);


    // Mobile particles + tap confetti
    useEffect(() => {
        if (!isCoarse) return;
        let alive = true;

        const spawnIdle = () => {
            if (!alive) return;
            const x = Math.random() * window.innerWidth;
            const y = window.innerHeight - 20 - Math.random() * 80;
            spawnEmoji(x, y, 0.6, false, true);
            window.setTimeout(spawnIdle, 600 + Math.random() * 1000);
        };
        spawnIdle();

        const onTouch = (e: TouchEvent) => {
            const touches = Array.from(e.touches);
            touches.forEach((t) => {
                for (let i = 0; i < 10; i++) spawnEmoji(t.clientX, t.clientY, 1, false);
            });
        };
        window.addEventListener('touchstart', onTouch, { passive: true });

        return () => {
            alive = false;
            window.removeEventListener('touchstart', onTouch);
        };
    }, [isCoarse]);

    return null; // This component doesn't render anything itself, just effects
}
