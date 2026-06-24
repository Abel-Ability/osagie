import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Activity, BarChart3, Briefcase, GraduationCap, Globe, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeading from '@/components/shared/SectionHeading';

const iconMap = { Map, Activity, BarChart3, Briefcase, GraduationCap, Globe };

const topServices = [
  { icon: "Map", title: "GIS & Mapping", desc: "Professional cartography and spatial analysis" },
  { icon: "Activity", title: "Geophysical Surveys", desc: "Subsurface investigation and exploration" },
  { icon: "BarChart3", title: "Data Analytics", desc: "Scientific data processing and visualisation" },
  { icon: "Briefcase", title: "Consultancy", desc: "Expert advisory across multiple domains" },
  { icon: "GraduationCap", title: "Training", desc: "Capacity building and skill development" },
  { icon: "Globe", title: "Web Design", desc: "Academic and corporate web solutions" }
];

export default function ServicesOverview() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Services" subtitle="Professional services spanning academia, industry, and technology" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {topServices.map(s => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-gold hover:underline font-medium">
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  const { ref, isVisible } = useScrollReveal();
  const Icon = iconMap[service.icon];
  return (
    <div
      ref={ref}
      className={`group bg-card border border-border rounded-xl p-5 sm:p-6 hover:border-gold/40 hover:shadow-lg transition-all duration-500 text-center ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-12 h-12 mx-auto rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
        <Icon className="w-6 h-6 text-gold" />
      </div>
      <h3 className="font-heading font-semibold text-sm sm:text-base mb-1">{service.title}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground">{service.desc}</p>
    </div>
  );
}