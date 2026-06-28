import React, { useState } from 'react';
import { services } from '@/lib/publications-data';
import { Map, Activity, BarChart3, Briefcase, GraduationCap, Users, FolderKanban, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const iconMap = { Map, Activity, BarChart3, Briefcase, GraduationCap, Users, FolderKanban, Globe };

function ServiceCard({ service }) {
  const { ref, isVisible } = useScrollReveal();
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[service.icon];

  return (
    <div
      ref={ref}
      className={`bg-card border border-border rounded-xl p-6 hover:border-gold/40 hover:shadow-lg transition-all duration-500 flex flex-col ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-gold" />
      </div>
      <h3 className="font-heading text-xl font-semibold mb-2">{service.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 flex-1">{service.description}</p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="inline-flex items-center gap-1 text-sm text-gold hover:underline mb-4"
      >
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {expanded ? 'Hide Details' : 'Learn More'}
      </button>

      {expanded && (
        <ul className="space-y-2 mb-4 pl-1">
          {service.subservices.map((s, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Services() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Professional Services" subtitle="Comprehensive solutions spanning research, technology, training, and consultancy" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map(s => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </div>
  );
}