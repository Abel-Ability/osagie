import React, { useState, useRef } from 'react';
import { services } from '@/lib/publications-data';
import { Map, Activity, BarChart3, Briefcase, GraduationCap, Users, FolderKanban, Globe, ChevronDown, ChevronUp, Send } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useServiceRequest } from '@/context/ServiceRequestContext';

const GAS_URL_QTI = "https://script.google.com/macros/s/AKfycbwkos6iraGXj2xJ2wNH9YVcvhMpEtVO9h9L4wBLpg89qBuw0yXzlkGVdoN2QAriJVCk/exec?embed=true";

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
  const [qtiModalOpen, setQtiModalOpen] = useState(false);
  const iframeRef = useRef(null);
  const { open: openServiceModal } = useServiceRequest();

  function openQtiModal() {
    setQtiModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeQtiModal() {
    setQtiModalOpen(false);
    document.body.style.overflow = "";
    if (iframeRef.current) {
      iframeRef.current.src = "about:blank";
    }
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Free Services */}
        <SectionHeading title="Free Services" subtitle="Tools available to everyone at no cost" />
        <div
          onClick={openQtiModal}
          className="bg-card border border-border rounded-xl p-6 hover:border-gold/40 hover:shadow-lg transition-all duration-500 cursor-pointer mb-20"
        >
          <h3 className="font-heading text-xl font-semibold mb-2">Convert Texts to QTI</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Converts plain text questions into QTI (Question & Test Interoperability) format for Learning Management Systems.
          </p>
          <ul className="flex flex-wrap gap-2">
            {["Supports multiple question types", "LMS-compatible export", "Batch processing", "Automatic formatting", "Error validation"].map((f, i) => (
              <li key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Professional Services */}
        <SectionHeading title="Professional Services" subtitle="Comprehensive solutions spanning research, technology, training, and consultancy" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map(s => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <button
            onClick={openServiceModal}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-navy font-bold rounded-lg hover:bg-gold/90 transition-all hover:shadow-lg hover:shadow-gold/20"
          >
            <Send className="w-4 h-4" /> Request a Service
          </button>
        </div>
      </div>

      {/* QTI Modal */}
      {qtiModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeQtiModal} />
          <div className="relative bg-card w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[85vh] max-md:h-[95vh]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-navy">
              <h3 className="font-heading font-bold text-base md:text-lg text-gold">
                Convert Texts to QTI
              </h3>
              <button onClick={closeQtiModal} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <iframe
              ref={iframeRef}
              src={GAS_URL_QTI}
              className="flex-1 w-full border-0"
              title="Convert Texts to QTI Form"
            />
          </div>
        </div>
      )}

    </div>
  );
}