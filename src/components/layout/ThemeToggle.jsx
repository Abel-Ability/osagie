import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ isDark, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-muted"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-gold transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-foreground transition-transform duration-300" />
      )}
    </button>
  );
}