import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function SectionHeading({ title, subtitle, align = "center" }) {
  const { ref, isVisible } = useScrollReveal();
  const alignClass = align === "left" ? "text-left" : "text-center";
  
  return (
    <div
      ref={ref}
      className={`mb-10 ${alignClass} transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-3">{title}</h2>
      {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
      <div className={`mt-4 h-1 w-16 bg-gold rounded-full ${align === "left" ? "" : "mx-auto"}`} />
    </div>
  );
}