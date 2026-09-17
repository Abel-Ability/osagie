import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

const playlist = [
  { src: "/audio/music_time.mp3", title: "Music Time" },
  { src: "/audio/music_ludovico_einaudi.mp3", title: "Ludovico Einaudi" },
  { src: "/audio/music_pearl_harbor.mp3", title: "Pearl Harbor" }
];

const FULL_VOLUME = 0.3;
const LANDING_VOLUME = FULL_VOLUME * 0.5;
const STORAGE_KEY = 'osagie:bg-music';

const EQ_BARS = [
  { bg: "linear-gradient(to top, #f0abfc, #e879f9)", delay: 0 },
  { bg: "linear-gradient(to top, #93c5fd, #3b82f6)", delay: 0.2 },
  { bg: "linear-gradient(to top, #fde68a, #f59e0b)", delay: 0.4 }
];

function Equalizer({ playing }) {
  return (
    <div className="flex items-end gap-[3px] h-5">
      {EQ_BARS.map((bar, i) => (
        <span
          key={i}
          className={playing ? "eq-bar" : "eq-bar-paused"}
          style={{
            background: bar.bg,
            animationDelay: playing ? `${bar.delay}s` : undefined
          }}
        />
      ))}
    </div>
  );
}

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const attemptedRef = useRef(false);
  const { pathname } = useLocation();
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [silent, setSilent] = useState(false);

  const isHome = pathname === '/';
  const routeVolume = isHome ? LANDING_VOLUME : FULL_VOLUME;

  const applyVolume = () => {
    const audio = audioRef.current;
    if (audio) audio.volume = routeVolume;
  };

  const saveConsent = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'on');
    } catch (e) {
      /* ignore */
    }
  };

  const playMuted = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = true;
    applyVolume();
    const p = audio.play();
    if (p && typeof p.then === 'function') {
      p.then(() => {
        setPlaying(true);
        setSilent(true);
      }).catch(() => {
        attemptedRef.current = false;
      });
    }
  };

  const tryPlay = (force = false) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!force && attemptedRef.current) return;
    attemptedRef.current = true;
    audio.muted = false;
    applyVolume();
    const promise = audio.play();
    if (promise && typeof promise.then === 'function') {
      promise.then(() => {
        setPlaying(true);
        setSilent(false);
        saveConsent();
      }).catch(() => {
        playMuted();
      });
    } else {
      setPlaying(true);
      setSilent(false);
    }
  };

  const unmute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    applyVolume();
    const p = audio.play();
    if (p && typeof p.then === 'function') {
      p.then(() => {
        setPlaying(true);
        setSilent(false);
        saveConsent();
      }).catch(() => {});
    } else {
      setPlaying(true);
      setSilent(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !audio.src) {
      audio.src = playlist[0].src;
      audio.load();
    }
    const timer = setTimeout(() => tryPlay(), 250);
    const onVisible = () => {
      if (document.visibilityState === 'visible') tryPlay(true);
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onVisible);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onVisible);
    };
  }, []);

  useEffect(() => {
    const forceStart = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused || audio.muted) tryPlay(true);
    };
    const events = ["pointerdown", "keydown", "touchstart", "click", "wheel"];
    events.forEach((e) => document.addEventListener(e, forceStart));
    document.addEventListener("scroll", forceStart, { capture: true, passive: true });
    window.addEventListener("scroll", forceStart, { passive: true });
    return () => {
      events.forEach((e) => document.removeEventListener(e, forceStart));
      document.removeEventListener("scroll", forceStart, { capture: true });
      window.removeEventListener("scroll", forceStart);
    };
  }, [playing, silent]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !audio.muted) {
      audio.volume = routeVolume;
    }
  }, [routeVolume]);

  const playTrack = (idx) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.src = playlist[idx].src;
    audio.load();
    audio.muted = false;
    applyVolume();
    audio.play().then(() => {
      setPlaying(true);
      setSilent(false);
      saveConsent();
    }).catch(() => {});
    setTrackIdx(idx);
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing && !silent) {
      audio.pause();
      setPlaying(false);
    } else {
      if (!audio.src) {
        audio.src = playlist[trackIdx].src;
        audio.load();
      }
      unmute();
    }
  };

  const next = () => playTrack((trackIdx + 1) % playlist.length);
  const prev = () => playTrack((trackIdx - 1 + playlist.length) % playlist.length);

  return (
    <>
      <audio ref={audioRef} onEnded={next} preload="auto" />
      <div className="fixed bottom-5 left-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex items-center gap-1 rounded-full bg-gold/15 text-gold border border-gold/30 shadow-lg backdrop-blur p-1">
        {silent && (
          <span className="sm:hidden text-[10px] pl-2 pr-1 font-semibold animate-pulse">TAP</span>
        )}
        <span className="px-2"><Equalizer playing={playing} /></span>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing && !silent ? 'Pause background music' : 'Play background music'}
          title={playing && !silent ? 'Pause background music' : 'Play background music'}
          className={`w-9 h-9 rounded-full flex items-center justify-center hover:bg-gold/25 transition-colors cursor-pointer ${silent ? 'animate-pulse' : ''}`}>
          {playing && !silent ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
        <button
          type="button"
          onClick={prev}
          aria-label="Previous track"
          title="Previous track"
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gold/25 transition-colors cursor-pointer">
          <SkipBack className="w-4 h-4" />
        </button>
        <span className="hidden sm:block text-xs px-2 font-medium max-w-[10rem] truncate">{playlist[trackIdx].title}</span>
        <button
          type="button"
          onClick={next}
          aria-label="Next track"
          title="Next track"
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gold/25 transition-colors cursor-pointer">
          <SkipForward className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}