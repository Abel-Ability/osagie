import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function CTABanner() {
  const { openHireMe } = useOutletContext();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className={`py-20 px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-navy to-navy/80 dark:from-gold/10 dark:to-gold/5 rounded-2xl p-10 sm:p-14 border border-gold/20">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white dark:text-foreground mb-4">
          Ready to collaborate?
        </h2>
        <p className="text-white/80 dark:text-muted-foreground mb-8 max-w-lg mx-auto">
          Whether you need research support, GIS services, training, or software solutions — let's work together to achieve your goals.
        </p>
        <button
          onClick={() => openHireMe()}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-navy font-bold rounded-lg hover:bg-gold/90 transition-all hover:shadow-lg hover:shadow-gold/20"
        >
          <Sparkles className="w-5 h-5" /> Hire Me
        </button>
      </div>
    </section>
  );
}