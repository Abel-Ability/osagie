import React, { useState, useRef } from 'react';
import { softwareTools, tutorialVideos } from '@/lib/publications-data';
import { Play, Monitor, X } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const GAS_URLS = {
  "Course Participation (UG)": "https://script.google.com/macros/s/AKfycbyhBfexsuADeD9p3l4EH9A2r4GQsG-0u1Zj6cnTb9wYkXl-va4lliGo-SvZKM_YjI3t3w/exec?embed=true",
  "Course Participation (PG)": "https://script.google.com/macros/s/AKfycbwqdPCES14oSLRDd-XqleLpQ8r-NQQr2JksOYOzuQo0V1mFUcVMxLIeE0C5D0Y6kuCW/exec?embed=true",
  "Course Participation (GDS)": "https://script.google.com/macros/s/AKfycbzyZE6InQRV6yDKnW1s70qjoNR6RiY3I13oqca1Q9qXqSTqZEgcWxDJ7jdN_rV-SRvt/exec?embed=true",
  "Assignment Submission (UG)": "https://script.google.com/macros/s/AKfycbyNhquGrT-HyWlcYsLcTIXFcg-5bdXndu9ALotO06fvVx2BTz1oAXzcM4Rs-DFhbW72Qg/exec?embed=true",
  "Assignment Submission (PG)": "https://script.google.com/macros/s/AKfycbx52mXfYz6SMVqnGqWBeyooC_fuPShLO-BPD4dJsCjKnpQ94bj-x-4P9LWcyuzHwgsflw/exec?embed=true",
  "FYP Submission System": "https://script.google.com/macros/s/AKfycbz1i45u4lPgEdOOI_hZPMKzYQ63Lqs2Vyx4fP1-9h3_YMEkGJOlQXRrvY3gsxtrDPhP/exec?embed=true",
  "Pre-Workshop Assessment (Canvas)": "https://script.google.com/macros/s/AKfycbwhacsOtW7nu1M9HZ0sthQfjRlmSvgR6ZwfVrPAUmKuknhixnkSMpHYWocNQWEpExix/exec?embed=true",
  "Post-Workshop Assessment (Canvas)": "https://script.google.com/macros/s/AKfycbyCU7N9Pqd5NvMDopiQeTBApWzUoV11fxm7N0w83LLXXy1HDMezgDyLkXu9u3Oip5zR/exec?embed=true",
};

const FEATURED_TOOLS = [
  "FYP Submission System",
  "Course Participation (UG)",
  "Course Participation (PG)",
  "Course Participation (GDS)",
  "Assignment Submission (UG)",
  "Assignment Submission (PG)",
];

function driveEmbedUrl(url) {
  const match = url.match(/\/file\/d\/([^/]+)/);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
}

function FeaturedToolCard({ tool, onSelect }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      onClick={() => onSelect(tool)}
      className={`bg-card border border-border rounded-xl p-6 hover:border-gold/40 hover:shadow-lg transition-all duration-500 cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h3 className="font-heading font-semibold text-xl mb-2">{tool.name}</h3>
      <p className="text-sm text-muted-foreground">{tool.description}</p>
    </div>
  );
}

function VideoCard({ video, onSelect }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      onClick={() => onSelect(video)}
      className={`bg-card border border-border rounded-xl p-5 hover:border-gold/40 transition-all duration-500 cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-full h-24 rounded-lg bg-gradient-to-br from-red-500/10 to-red-500/5 flex items-center justify-center mb-4 border border-border/50">
        <Play className="w-8 h-8 text-red-500" />
      </div>
      <h4 className="font-semibold text-sm">{video.title}</h4>
    </div>
  );
}

export default function Software() {
  const [activeTool, setActiveTool] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const toolIframeRef = useRef(null);
  const videoIframeRef = useRef(null);

  const featuredTools = softwareTools.filter(t => FEATURED_TOOLS.includes(t.name));

  function openToolModal(tool) {
    setActiveTool(tool);
    document.body.style.overflow = "hidden";
  }

  function closeToolModal() {
    setActiveTool(null);
    document.body.style.overflow = "";
    if (toolIframeRef.current) {
      toolIframeRef.current.src = "about:blank";
    }
  }

  function openVideoModal(video) {
    setActiveVideo(video);
    document.body.style.overflow = "hidden";
  }

  function closeVideoModal() {
    setActiveVideo(null);
    document.body.style.overflow = "";
    if (videoIframeRef.current) {
      videoIframeRef.current.src = "about:blank";
    }
  }

  const embedUrl = activeTool ? GAS_URLS[activeTool.name] : "";

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Software Solutions" subtitle="Custom tools built to support academic administration, student engagement, and educational assessment" />

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-10">
          <div className="flex items-start gap-3">
            <Monitor className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              The following tools were developed to support academic administration, student engagement, educational assessment, and capacity-building workflows. Click any tool to open it.
            </p>
          </div>
        </div>

        {/* Student tools */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-bold mb-6">Student Tools (University of Abuja)</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map(tool => (
              <FeaturedToolCard key={tool.name} tool={tool} onSelect={openToolModal} />
            ))}
          </div>
        </div>

        {/* Tutorial Videos */}
        <SectionHeading title="Tutorial Videos" subtitle="Step-by-step video guides for educational tools and software" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tutorialVideos.map(video => (
            <VideoCard key={video.title} video={video} onSelect={openVideoModal} />
          ))}
        </div>
      </div>

      {/* Tool Modal */}
      {activeTool && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeToolModal} />
          <div className="relative bg-card w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[85vh] max-md:h-[95vh]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-navy">
              <h3 className="font-heading font-bold text-base md:text-lg text-gold">
                {activeTool.name}
              </h3>
              <button onClick={closeToolModal} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <iframe
              ref={toolIframeRef}
              src={embedUrl}
              className="flex-1 w-full border-0"
              title={`${activeTool.name} Form`}
            />
          </div>
        </div>
      )}

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeVideoModal} />
          <div className="relative bg-card w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[85vh] max-md:h-[95vh]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-navy">
              <h3 className="font-heading font-bold text-base md:text-lg text-gold">
                {activeVideo.title}
              </h3>
              <button onClick={closeVideoModal} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <iframe
              ref={videoIframeRef}
              src={driveEmbedUrl(activeVideo.url)}
              className="flex-1 w-full border-0"
              title={activeVideo.title}
            />
          </div>
        </div>
      )}
    </div>
  );
}
