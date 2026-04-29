"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo({
  src,
  tapToPlayLabel,
  soundOnLabel,
  muteLabel,
  poster,
  objectPosition = "center 35%",
}: {
  src: string;
  tapToPlayLabel: string;
  soundOnLabel: string;
  muteLabel: string;
  poster?: string;
  objectPosition?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const mimeType = src.toLowerCase().endsWith(".mov") ? "video/quicktime" : "video/mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // Mobile browsers may delay autoplay until interaction or reject unsupported media.
      }
    };

    const handleReady = () => {
      void tryPlay();
    };

    video.addEventListener("loadedmetadata", handleReady);
    video.addEventListener("canplay", handleReady);
    document.addEventListener("visibilitychange", handleReady);

    void tryPlay();

    return () => {
      video.removeEventListener("loadedmetadata", handleReady);
      video.removeEventListener("canplay", handleReady);
      document.removeEventListener("visibilitychange", handleReady);
    };
  }, []);

  const handleTapToPlay = async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (isSoundOn) {
      video.muted = true;
      setIsSoundOn(false);
      return;
    }

    try {
      video.muted = false;
      video.volume = 1;
      await video.play();
      setIsSoundOn(true);
    } catch {
      video.muted = true;
      await video.play().catch(() => undefined);
      setIsSoundOn(false);
    }
  };

  return (
    <div className="absolute inset-0">
      {hasFailed && poster ? (
        <img
          src={poster}
          alt=""
          className="hero-video h-full w-full object-cover"
          style={{ objectPosition }}
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          poster={poster}
          className="hero-video h-full w-full object-cover"
          style={{ objectPosition }}
          onError={() => setHasFailed(true)}
        >
          <source src={src} type={mimeType} />
        </video>
      )}

      <button
        type="button"
        onClick={handleTapToPlay}
        title={isSoundOn ? muteLabel : soundOnLabel}
        className="absolute bottom-5 right-5 z-20 inline-flex items-center rounded-full border border-white/35 bg-black/20 px-4 py-2 text-[0.65rem] uppercase tracking-[0.24em] text-white backdrop-blur-md transition hover:bg-black/30 sm:bottom-6 sm:right-6"
      >
        {isSoundOn ? muteLabel : tapToPlayLabel}
      </button>
    </div>
  );
}
