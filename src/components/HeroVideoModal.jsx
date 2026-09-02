import React, { useEffect, useRef } from "react";
import "./HeroVideoModal.css";

export default function HeroVideoModal({ src, isOpen, onClose, title = "Our Story" }) {
  const videoRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      if (video) video.pause();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="hero-video-modal" role="presentation" onClick={onClose}>
      <div
        className="hero-video-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="hero-video-modal__close"
          onClick={onClose}
          aria-label="Close video"
        >
          ×
        </button>
        <video
          ref={videoRef}
          className="hero-video-modal__video"
          src={src}
          controls
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
}
