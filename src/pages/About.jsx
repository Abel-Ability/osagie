import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, Users, ChevronDown } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import AcademicProfileLinks from '@/components/shared/AcademicProfileLinks';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const qualifications = [
  { degree: "PhD", field: "Geophysics", institution: "Universiti Sains Malaysia", year: "2020" },
  { degree: "MSc", field: "Geophysics", institution: "Gyeongsang National University, South Korea", year: "2012" },
  { degree: "BSc", field: "Physics", institution: "University of Abuja, Nigeria", year: "2003" }
];

const associations = [
  "Nigeria Institute of Physics (MNIP)",
  "Society of Exploration Geophysicists (SEG)",
  "Society of Geophysicists and Computational Geoscientists (SGCG)"
];

const researchInterests = [
  { name: "Seismology", description: "Studying earthquakes and seismic wave propagation to better understand earth structure and reduce seismic hazard." },
  { name: "Seismic Tomography", description: "Imaging the Earth's interior by inverting seismic travel times and waveforms for velocity structure." },
  { name: "Hydrogeophysics", description: "Applying geophysical methods to characterize aquifers and map subsurface water resources." },
  { name: "Groundwater Exploration", description: "Locating and assessing groundwater reserves using non-invasive surface geophysical techniques." },
  { name: "GIS", description: "Integrating spatial data and mapping tools for resource assessment, hazard analysis, and decision support." },
  { name: "Remote Sensing", description: "Using satellite and aerial imagery to observe land cover, environmental change, and natural resources." },
  { name: "Environmental Geophysics", description: "Detecting contamination and monitoring subsurface environmental conditions with geophysical surveys." },
  { name: "Potential Field Methods", description: "Interpreting gravity and magnetic data to map geological structures and mineral deposits." },
  { name: "Scientific Programming", description: "Developing computational tools and scripts to model physical processes and process geophysical data." },
  { name: "Educational Technology", description: "Improving STEM teaching and learning through digital platforms, simulations, and e-learning tools." }
];

function RevealDiv({ children, className = "", delay = 0 }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function About() {
  const [openInterest, setOpenInterest] = useState(null);
  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="About Me" subtitle="Academic background, research interests, and professional journey" />

        {/* Biography */}
        <RevealDiv className="mb-16">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 space-y-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-heading text-xl font-semibold">Biography</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Born in Benin City, Nigeria, where I spent childhood and teenage life. I also lived briefly in other parts of Nigeria. I benefited from a supporting family and from an environment of diverse culture and ideologies which provided opportunities for personal growth. My aim is to develop this approach to life and share it with others by my own positive example. I hope to inspire a creative and positive way of dealing with the various challenges that are part of our lives. The motto which sums up my approach to life is: <em>"A good life is one inspired by love and guided by knowledge"</em>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I resonate strongly with the words of Dr. John G. Hibben that "Education is the ability to meet life's situations." Since education is a transformative process, I believe in fostering an inclusive and stimulating learning environment that inspires intellectual curiosity and critical thinking. I am committed to cultivating a deep understanding of the natural world and inspiring a passion for scientific inquiry.
            </p>
          </div>
        </RevealDiv>

        {/* Academic Qualifications */}
        <RevealDiv className="mb-16" delay={100}>
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-heading text-xl font-semibold">Academic Qualifications</h3>
            </div>
            <div className="space-y-4">
              {qualifications.map((q, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 rounded-lg bg-muted/50 border border-border/50">
                  <span className="font-heading font-bold text-gold text-lg w-16 shrink-0">{q.degree}</span>
                  <div className="flex-1">
                    <p className="font-medium">{q.field}</p>
                    <p className="text-sm text-muted-foreground">{q.institution}</p>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">{q.year}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealDiv>

        {/* Teaching Experience */}
        <RevealDiv className="mb-16" delay={150}>
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-heading text-xl font-semibold">Teaching Experience</h3>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <span className="font-heading text-4xl font-bold text-gold">20+</span>
              <span className="text-lg font-medium">Years of University-Level Teaching</span>
            </div>
            <p className="text-muted-foreground">
              Extensive experience teaching undergraduate and postgraduate courses in Physics and Geophysics, with a focus on practical applications, field methods, and computational techniques.
            </p>
          </div>
        </RevealDiv>

        {/* Professional Associations */}
        <RevealDiv className="mb-16" delay={200}>
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-heading text-xl font-semibold">Professional Associations</h3>
            </div>
            <ul className="space-y-3">
              {associations.map((a, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </RevealDiv>

        {/* Research Interests */}
        <RevealDiv className="mb-16" delay={250}>
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-10">
            <h3 className="font-heading text-xl font-semibold mb-6">Research Interests</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {researchInterests.map((interest) => {
                const isOpen = openInterest === interest.name;
                return (
                  <button
                    type="button"
                    key={interest.name}
                    onClick={() => setOpenInterest(isOpen ? null : interest.name)}
                    aria-expanded={isOpen}
                    className="text-left p-4 rounded-xl border border-border/50 bg-muted/50 transition-colors hover:bg-gold/10 cursor-pointer">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-medium text-gold">{interest.name}</span>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </span>
                    {isOpen && (
                      <span className="block text-sm text-muted-foreground leading-relaxed mt-2">{interest.description}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </RevealDiv>

        {/* Academic Profiles */}
        <RevealDiv delay={300}>
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-10">
            <h3 className="font-heading text-xl font-semibold mb-6">Academic Profiles</h3>
            <AcademicProfileLinks />
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}