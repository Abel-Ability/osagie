import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "./AudioProvider";

const EQ_BARS = [0, 1, 2, 3, 4];

export default function MuteButton() {
  const { playing, muted, toggleMuted } = useAudio();
  const active = playing && !muted;

  return (
    <div className="fixed bottom-5 left-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex items-center gap-1 rounded-full bg-gold/15 text-gold border border-gold/30 shadow-lg backdrop-blur p-1">
      <span className="px-2 flex items-end gap-[3px] h-5">
        {EQ_BARS.map((_, i) => (
          <span
            key={i}
            className={active ? "eq-bar" : "eq-bar-paused"}
            style={active ? { animationDelay: `${i * 0.13}s` } : undefined}
          />
        ))}
      </span>
      <button
        type="button"
        onClick={toggleMuted}
        aria-label={muted ? "Unmute background music" : "Mute background music"}
        title={muted ? "Unmute background music" : "Mute background music"}
        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gold/25 transition-colors cursor-pointer">
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
}