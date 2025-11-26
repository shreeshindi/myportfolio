import { useEffect, useRef } from 'react';

interface GlitchTitleProps {
    headline: string;
}

export default function GlitchTitle({ headline }: GlitchTitleProps) {
    const glitchTimer = useRef<number | null>(null);

    useEffect(() => {
        const el = document.getElementById('glitchTitle');
        if (!el) return;

        const runGlitch = () => {
            el.classList.add('glitch');
            window.setTimeout(() => el.classList.remove('glitch'), 600);
        };
        const schedule = () => {
            glitchTimer.current = window.setTimeout(() => {
                runGlitch();
                schedule();
            }, 3000 + Math.random() * 4000);
        };
        schedule();
        return () => { if (glitchTimer.current) window.clearTimeout(glitchTimer.current); };
    }, []);

    return (
        <h1
            id="glitchTitle"
            className="select-none text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
            onMouseEnter={() => {
                const el = document.getElementById('glitchTitle');
                if (!el) return;
                el.classList.add('glitch');
                setTimeout(() => el.classList.remove('glitch'), 600);
            }}
        >
            {headline}
        </h1>
    );
}
