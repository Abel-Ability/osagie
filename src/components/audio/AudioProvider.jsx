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
  const [isLoading, setIsLoading] = useState(false);

  volumeRef.current = pathname === "/" ? LANDING_PAGE_VOLUME : OTHER_PAGE_VOLUME;

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audio.volume = volumeRef.current;
      audio.preload = "auto";
      audio.src = TRACKS[0];
      
      audio.addEventListener("canplaythrough", () => {
        console.log("Audio can play through:", audio.src);
      });
      
      audio.addEventListener("ended", () => {
        trackIndexRef.current = (trackIndexRef.current + 1) % TRACKS.length;
        audio.src = TRACKS[trackIndexRef.current];
        audio.load();
        audio.play().catch((e) => {
          console.warn("Audio auto-play failed on track end:", e);
        });
      });
      
      audio.addEventListener("error", (e) => {
        console.error("Audio error:", e, audio.src);
      });
      
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const playAudio = useCallback(async (audio) => {
    try {
      if (audio.readyState < 3) {
        console.log("Audio not ready, waiting...");
        await new Promise((resolve, reject) => {
          audio.addEventListener("canplay", resolve, { once: true });
          audio.addEventListener("error", reject, { once: true });
          audio.load();
        });
      }
      await audio.play();
      setPlaying(true);
      console.log("Audio playing:", audio.src);
    } catch (e) {
      console.warn("Audio play failed:", e);
      throw e;
    }
  }, []);

  const start = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const audio = ensureAudio();
      trackIndexRef.current = 0;
      audio.src = TRACKS[0];
      audio.volume = volumeRef.current;
      await playAudio(audio);
    } catch (e) {
      console.warn("Start audio failed:", e);
    } finally {
      setIsLoading(false);
    }
  }, [ensureAudio, playAudio, isLoading]);

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
    let mounted = true;
    
    const handleInteraction = async () => {
      if (!mounted) return;
      await start();
    };
    
    const startOnInteraction = () => {
      handleInteraction();
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
      document.removeEventListener("pointerdown", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    };
    
    document.addEventListener("click", startOnInteraction);
    document.addEventListener("touchstart", startOnInteraction);
    document.addEventListener("pointerdown", startOnInteraction);
    document.addEventListener("keydown", startOnInteraction);
    
    return () => {
      mounted = false;
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
      document.removeEventListener("pointerdown", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    };
  }, [start]);

  useEffect(() => {
    const initAudio = () => {
      ensureAudio();
    };
    initAudio();
  }, [ensureAudio]);

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

export { AudioContext };