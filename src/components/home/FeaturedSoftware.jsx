import React from 'react';
import { Link } from 'react-router-dom';
import { softwareTools } from '@/lib/publications-data';
import { ExternalLink, ArrowRight, Code2 } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeading from '@/components/shared/SectionHeading';

export default function FeaturedSoftware() {
  const featured = softwareTools.slice(0, 3);

  return (
    <section className="py-20 px-4 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Software Solutions" subtitle="Custom-built tools for academic administration and education" />
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map(tool => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/software" className="inline-flex items-center gap-2 text-gold hover:underline font-medium">
            View All Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`bg-card border border-border rounded-xl p-6 hover:border-gold/40 hover:shadow-lg transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
        <Code2 className="w-6 h-6 text-gold" />
      </div>
      <h3 className="font-heading font-semibold mb-2">{tool.name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-gold hover:underline"
      >
        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
      </a>
    </div>
  );
}