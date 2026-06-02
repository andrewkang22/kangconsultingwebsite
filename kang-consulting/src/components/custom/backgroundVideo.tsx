"use client";
import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  blur?: boolean;
};

export default function BackgroundVideo({ src, poster, className = "", blur = true }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let raf: number | undefined;
    const decelWindow = 5; // seconds over which we decelerate
    const stopThreshold = 0.25; // when remaining <= threshold, pause
    const minRate = 0.05; // don't go to zero to keep smoothness
    const maxRate = 1.0;

    const easeOutCubic = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

    const tick = () => {
      if (!video || !isFinite(video.duration) || video.duration === 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const remaining = Math.max(0, video.duration - video.currentTime);
      if (remaining <= stopThreshold) {
        video.pause();
        return; // stop ticking
      }

      // t = 1 when decel starts, 0 when at the end of the window
      const t = Math.min(1, remaining / decelWindow);
      const rate = minRate + (maxRate - minRate) * easeOutCubic(t);
      video.playbackRate = Math.max(minRate, Math.min(maxRate, rate));

      raf = requestAnimationFrame(tick);
    };

    const handleLoaded = () => {
      // reset playback rate in case of navigations
      video.playbackRate = maxRate;
      // attempt to autoplay; muted and playsInline should allow it
      video.play().catch(() => {/* ignore */});
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    const handlePlay = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("play", handlePlay);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("play", handlePlay);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={`absolute inset-0 -z-20 size-full object-cover ${blur ? "blur-xs md:scale-105" : ""} ${className}`}
      src={src}
      poster={poster}
      autoPlay
      muted
      playsInline
      preload="auto"
      tabIndex={-1}
      aria-label="Decorative Kang Consulting background video"
    />
  );
}
