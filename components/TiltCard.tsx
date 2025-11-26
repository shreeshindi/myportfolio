import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';

type Theme = {
    name: string;
    bgClass: string;
    tintClass: string;
    buttonClass: string;
    buttonHoverClass: string;
};

interface TiltCardProps {
    selectedImage: string;
    theme: Theme;
    isCoarse: boolean;
    motionAllowed: boolean;
}

export default function TiltCard({ selectedImage, theme, isCoarse, motionAllowed }: TiltCardProps) {
    const tiltRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);

    // Desktop Tilt
    useEffect(() => {
        if (isCoarse) return;
        const tiltEl = tiltRef.current;
        if (!tiltEl) return;

        const onMove = (e: MouseEvent) => {
            const rect = tiltEl.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / rect.width;
            const dy = (e.clientY - cy) / rect.height;
            const rotateX = (dy * -10).toFixed(2);
            const rotateY = (dx * 12).toFixed(2);
            tiltEl.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        };
        const onLeave = () => {
            tiltEl.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseleave', onLeave);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseleave', onLeave);
        };
    }, [isCoarse]);

    // Mobile Tilt (Device Orientation)
    useEffect(() => {
        if (!isCoarse || !motionAllowed) return;
        const tiltEl = tiltRef.current;
        if (!tiltEl) return;

        let ticking = false;
        const update = (beta: number, gamma: number) => {
            const rotateX = Math.max(-10, Math.min(10, -(beta / 90) * 10));
            const rotateY = Math.max(-12, Math.min(12, (gamma / 60) * 12));
            tiltEl.style.transform =
                `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.02)`;
            ticking = false;
        };

        const handler = (e: DeviceOrientationEvent) => {
            if (!ticking) {
                const beta = e.beta ?? 0;
                const gamma = e.gamma ?? 0;
                window.requestAnimationFrame(() => update(beta, gamma));
                ticking = true;
            }
        };

        window.addEventListener('deviceorientation', handler, true);
        return () => window.removeEventListener('deviceorientation', handler, true);
    }, [isCoarse, motionAllowed]);

    // Mobile Fallback (Touch)
    useEffect(() => {
        if (!isCoarse || motionAllowed) return;
        const tiltEl = tiltRef.current;
        if (!tiltEl) return;

        const onTouchMove = (e: TouchEvent) => {
            const t = e.touches[0];
            if (!t) return;
            const rect = tiltEl.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (t.clientX - cx) / rect.width;
            const dy = (t.clientY - cy) / rect.height;
            const rotateX = (dy * -10);
            const rotateY = (dx * 12);
            tiltEl.style.transform =
                `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.02)`;
        };
        const onTouchEnd = () => {
            tiltEl.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
        };

        tiltEl.addEventListener('touchmove', onTouchMove, { passive: true });
        tiltEl.addEventListener('touchend', onTouchEnd, { passive: true });
        tiltEl.addEventListener('touchcancel', onTouchEnd, { passive: true });

        return () => {
            tiltEl.removeEventListener('touchmove', onTouchMove as any);
            tiltEl.removeEventListener('touchend', onTouchEnd as any);
            tiltEl.removeEventListener('touchcancel', onTouchEnd as any);
        };
    }, [isCoarse, motionAllowed]);

    // Magnetic Button
    useEffect(() => {
        const anchor = btnRef.current;
        if (!anchor) return;
        const onMove = (e: MouseEvent) => {
            const rect = anchor.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            anchor.style.transform = `translate(${dx * 0.08}px, ${dy * 0.08}px) scale(1.02)`;
        };
        const onLeave = () => { anchor.style.transform = 'translate(0,0) scale(1)'; };
        anchor.addEventListener('mousemove', onMove);
        anchor.addEventListener('mouseleave', onLeave);
        return () => {
            anchor.removeEventListener('mousemove', onMove);
            anchor.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return (
        <div
            ref={tiltRef}
            className="mt-8 w-full max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl shadow-2xl transition-transform duration-200 will-change-transform"
        >
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-white/10">
                {selectedImage && (
                    <Image
                        src={selectedImage}
                        alt="Dev visual"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 768px"
                        priority
                    />
                )}

                {/* corner badges */}
                <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[10px] sm:text-xs">
                    random: true
                </div>
                <div className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-black/50 px-3 py-1 text-[10px] sm:text-xs">
                    theme: {theme.name}
                </div>
            </div>

            <p className="mt-5 text-center text-base sm:text-lg md:text-lg text-white/90">
                I build backends that are fast, secure, and low-drama. If you need clean APIs, solid auth, and smooth
                deployments — we’ll get along.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                    ref={btnRef}
                    href="/image/shreenidhi.pdf"
                    target="_blank"
                    download
                    data-cursor="link"
                    className={`rounded-xl px-5 py-3 ${theme.buttonClass} ${theme.buttonHoverClass} transition-all duration-200 active:scale-[0.98]`}
                >
                    Download Resume
                </a>

                <Link
                    href="/pro/professional"
                    data-cursor="link"
                    className="rounded-xl border border-white/25 bg-white/10 px-5 py-3 backdrop-blur hover:bg-white/20 transition-all"
                >
                    See Work
                </Link>
            </div>
        </div>
    );
}
