import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { softwareTools, tutorialVideos } from '@/lib/publications-data';
import { ExternalLink, Sparkles, Code2, Play, Monitor } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function ToolCard({ tool, onRequestService }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`bg-card border border-border rounded-xl p-6 hover:border-gold/40 hover:shadow-lg transition-all duration-500 flex flex-col ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-full h-32 rounded-lg bg-gradient-to-br from-navy/5 to-gold/5 dark:from-navy/20 dark:to-gold/10 flex items-center justify-center mb-5 border border-border/50">
        <div className="text-center">
          <Code2 className="w-8 h-8 text-gold mx-auto mb-2" />
          <span className="text-xs font-mono text-muted-foreground">Google Apps Script</span>
        </div>
      </div>
      <h3 className="font-heading font-semibold text-lg mb-2">{tool.name}</h3>
      <p className="text-sm text-muted-foreground mb-4 flex-1">{tool.description}</p>
      <ul className="space-y-1.5 mb-5">
        {tool.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
            {f}
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mt-auto">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors text-sm font-medium"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Live Demo
        </a>
        <button
          onClick={() => onRequestService(tool.name)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gold text-navy rounded-lg hover:bg-gold/90 transition-colors text-sm font-medium"
        >
          <Sparkles className="w-3.5 h-3.5" /> Request Service
        </button>
      </div>
    </div>
  );
}

function VideoCard({ video }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`bg-card border border-border rounded-xl p-5 hover:border-gold/40 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-full h-24 rounded-lg bg-gradient-to-br from-red-500/10 to-red-500/5 flex items-center justify-center mb-4 border border-border/50">
        <Play className="w-8 h-8 text-red-500" />
      </div>
      <h4 className="font-semibold text-sm mb-3">{video.title}</h4>
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-gold hover:underline"
      >
        <Play className="w-3.5 h-3.5" /> Watch Now
      </a>
    </div>
  );
}

export default function Software() {
  const { openHireMe } = useOutletContext();

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Software Solutions" subtitle="Custom tools built to support academic administration, student engagement, and educational assessment" />

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-10">
          <div className="flex items-start gap-3">
            <Monitor className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              The following tools were developed using Google Apps Script to support academic administration, student engagement, educational assessment, and capacity-building workflows.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {softwareTools.map(tool => (
            <ToolCard key={tool.name} tool={tool} onRequestService={(name) => openHireMe("Software Development")} />
          ))}
        </div>

        {/* Tutorial Videos */}
        <SectionHeading title="Tutorial Videos" subtitle="Step-by-step video guides for educational tools and software" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tutorialVideos.map(video => (
            <VideoCard key={video.title} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}