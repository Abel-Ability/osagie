import React, { useRef, useState } from 'react';
import { Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

const playlist = [
  { src: "/audio/music_time.mp3", title: "Music Time" },
  { src: "/audio/music_ludovico_einaudi.mp3", title: "Ludovico Einaudi" },
  { src: "/audio/music_pearl_harbor.mp3", title: "Pearl Harbor" }
];

function Equalizer({ playing }) {
  return (
    <div className="flex items-end gap-[3px] h-5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={playing ? "eq-bar" : "eq-bar-paused"}
          style={playing ? { animationDelay: `${i * 0.2}s` } : undefined}
        />
      ))}
    </div>
  );
}

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  const playTrack = (idx) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = playlist[idx].src;
    audio.load();
    audio.volume = 0.2;
    audio.play().catch(() => {});
    setTrackIdx(idx);
    setPlaying(true);
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.2;
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  const next = () => playTrack((trackIdx + 1) % playlist.length);
  const prev = () => playTrack((trackIdx - 1 + playlist.length) % playlist.length);

  return (
    <>
      <audio ref={audioRef} onEnded={next} preload="none" />
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1 rounded-full bg-gold/15 text-gold border border-gold/30 shadow-lg backdrop-blur p-1">
        <span className="px-2"><Equalizer playing={playing} /></span>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause background music' : 'Play background music'}
          title={playing ? 'Pause background music' : 'Play background music'}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gold/25 transition-colors cursor-pointer">
          {playing ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
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