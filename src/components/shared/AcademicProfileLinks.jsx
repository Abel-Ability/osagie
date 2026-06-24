import React from 'react';
import { ExternalLink } from 'lucide-react';
import { academicProfiles } from '@/lib/publications-data';

export default function AcademicProfileLinks({ compact = false }) {
  return (
    <div className={`flex flex-wrap ${compact ? 'gap-2' : 'gap-3'}`}>
      {academicProfiles.map(p => (
        <a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 border border-border rounded-lg hover:border-gold hover:text-gold transition-all duration-200 ${
            compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
          } text-muted-foreground hover:bg-gold/5`}
        >
          {p.name}
          <ExternalLink className="w-3 h-3" />
        </a>
      ))}
    </div>
  );
}