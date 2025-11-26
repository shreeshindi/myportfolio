import { useEffect, useRef, useState } from 'react';

export function useMousePosition(isCoarse: boolean) {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorInnerRef = useRef<HTMLDivElement>(null);
    const [cursorVariant, setCursorVariant] = useState<'emoji' | 'dot' | 'ring' | 'blob'>('emoji');
    const [cursorEmoji, setCursorEmoji] = useState<string>('🚀');

    const EMOJIS = ['✨', '⚡', '💥', '🔥', '💫', '🫶', '🚀', '🎯', '🌈', '🧩', '🫡'];

    useEffect(() => {
        if (isCoarse) return;

        // Randomize cursor
        const variants: Array<'emoji' | 'dot' | 'ring' | 'blob'> = ['emoji', 'dot', 'ring', 'blob'];
        setCursorVariant(variants[Math.floor(Math.random() * variants.length)]);
        setCursorEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);

        const cur = cursorRef.current;
        if (!cur) return;

        let targetX = 0, targetY = 0;
        let x = 0, y = 0;
        let raf = 0;

        const onMove = (e: MouseEvent) => {
            targetX = e.clientX;
            targetY = e.clientY;
            // We'll handle spawning emojis in the component or another hook if needed, 
            // but for now let's just track position.
            // If we want to spawn emojis here we'd need a callback.
        };

        const loop = () => {
            x += (targetX - x) * 0.18;
            y += (targetY - y) * 0.18;
            cur.style.transform = `translate(${x}px, ${y}px)`;
            raf = requestAnimationFrame(loop);
        };
        loop();

        const onDown = () => cur.classList.add('cursor-click');
        const onUp = () => cur.classList.remove('cursor-click');

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
        };
    }, [isCoarse]);

    // Hot cursor
    useEffect(() => {
        if (isCoarse) return;
        const onOver = (e: MouseEvent) => {
            const t = e.target as HTMLElement | null;
            if (!t) return;
            const isInteractive = t.closest('a, button, [data-cursor="link"]');
            const inner = cursorInnerRef.current;
            if (!inner) return;
            if (isInteractive) inner.classList.add('cursor-hot');
            else inner.classList.remove('cursor-hot');
        };
        window.addEventListener('mousemove', onOver);
        return () => window.removeEventListener('mousemove', onOver);
    }, [isCoarse]);

    return { cursorRef, cursorInnerRef, cursorVariant, cursorEmoji };
}
