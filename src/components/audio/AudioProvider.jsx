import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

const TRACKS = ["/audio/music_time.mp3", "/audio/music_ludovico_einaudi.mp3", "/audio/music_pearl_harbor.mp3"];

const LANDING_PAGE_VOLUME = 1;
const OTHER_PAGE_VOLUME = 0.7;

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const trackIndexRef = useRef(0);
  const volumeRef = useRef(LANDING_PAGE_VOLUME);
  const { pathname } = useLocation();
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  volumeRef.current = pathname === "/" ? LANDING_PAGE_VOLUME : OTHER_PAGE_VOLUME;

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.loop = false;
      audio.volume = volumeRef.current;
      audio.preload = "auto";
      audio.src = TRACKS[0];
      audio.addEventListener("ended", () => {
        trackIndexRef.current = (trackIndexRef.current + 1) % TRACKS.length;
        audio.src = TRACKS[trackIndexRef.current];
        audio.play().catch(() => {});
      });
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const start = useCallback(() => {
    const audio = ensureAudio();
    trackIndexRef.current = 0;
    audio.src = TRACKS[0];
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => {});
  }, [ensureAudio]);

  const toggleMuted = useCallback(() => {
    const audio = ensureAudio();
    setMuted((prev) => {
      audio.muted = !prev;
      return !prev;
    });
  }, [ensureAudio]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumeRef.current;
    }
  }, [pathname]);

  useEffect(() => {
    const startOnInteraction = () => {
      start();
      document.removeEventListener("pointerdown", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    };
    document.addEventListener("pointerdown", startOnInteraction);
    document.addEventListener("touchstart", startOnInteraction);
    document.addEventListener("keydown", startOnInteraction);
    return () => {
      document.removeEventListener("pointerdown", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    };
  }, [start]);

  return (
    <AudioContext.Provider value={{ muted, playing, toggleMuted, start }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}