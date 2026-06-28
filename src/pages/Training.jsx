import React from 'react';
import { trainingProgrammes } from '@/lib/publications-data';
import { Clock } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function TrainingCard({ programme }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`bg-card border border-border rounded-xl p-6 hover:border-gold/40 hover:shadow-lg transition-all duration-500 flex flex-col ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h3 className="font-heading font-semibold text-lg mb-2">{programme.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 flex-1">{programme.description}</p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
        <Clock className="w-4 h-4 text-gold" />
        <span>{programme.duration}</span>
      </div>
    </div>
  );
}

export default function Training() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Training Programmes" subtitle="Professional development and capacity building opportunities" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trainingProgrammes.map(p => (
            <TrainingCard key={p.title} programme={p} />
          ))}
        </div>
      </div>
    </div>
  );
}