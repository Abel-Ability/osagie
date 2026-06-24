import React from 'react';
import { Link } from 'react-router-dom';
import { publications } from '@/lib/publications-data';
import { Download, ArrowRight, BookOpen } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeading from '@/components/shared/SectionHeading';

export default function FeaturedPublications() {
  const latest = [...publications].sort((a, b) => b.year - a.year).slice(0, 3);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Latest Publications" subtitle="Recent peer-reviewed research contributions" />
        <div className="grid md:grid-cols-3 gap-6">
          {latest.map(pub => (
            <PubCard key={pub.id} pub={pub} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/publications" className="inline-flex items-center gap-2 text-gold hover:underline font-medium">
            View All Publications <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PubCard({ pub }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`bg-card border border-border rounded-xl p-6 hover:border-gold/40 hover:shadow-lg transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <BookOpen className="w-5 h-5 text-gold shrink-0 mt-0.5" />
        <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold font-medium">{pub.tag}</span>
      </div>
      <h3 className="font-heading font-semibold text-sm leading-snug mb-2 line-clamp-3">{pub.title}</h3>
      <p className="text-xs text-muted-foreground mb-1">{pub.authors}</p>
      <p className="text-xs text-muted-foreground italic mb-3">
        {pub.journal}{pub.volume ? `, ${pub.volume}` : ''}{pub.pages ? `, pp. ${pub.pages}` : ''} ({pub.year})
      </p>
      {pub.doi && (
        <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-xs text-gold hover:underline block mb-3">
          DOI: {pub.doi}
        </a>
      )}
      <a
        href={pub.download}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-gold/10 text-gold rounded-md hover:bg-gold/20 transition-colors"
      >
        <Download className="w-3.5 h-3.5" /> Download PDF
      </a>
    </div>
  );
}