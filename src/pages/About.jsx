import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, Users } from 'lucide-react';
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
  {
    name: "Seismology",
    description:
      "Studying earthquakes and seismic wave propagation to better understand Earth's internal structure and dynamics. This involves analyzing earthquake records, monitoring fault activity, and estimating seismic hazards to support earthquake-resistant design and disaster preparedness. It also offers insight into how stress accumulates and is released within the crust."
  },
  {
    name: "Seismic Tomography",
    description:
      "Imaging the Earth's interior by inverting seismic travel times and waveforms for velocity structure. These models reveal sub-surface features such as subduction zones, mantle plumes, and crustal heterogeneities. The resulting images help constrain geological models and improve the interpretation of tectonic processes over broad regions."
  },
  {
    name: "Hydrogeophysics",
    description:
      "Applying geophysical methods to characterize aquifers and map subsurface water resources. Electrical resistivity, electromagnetic, and seismic techniques are integrated to estimate aquifer geometry, porosity, and water quality. This non-invasive approach reduces drilling costs and supports sustainable groundwater management."
  },
  {
    name: "Groundwater Exploration",
    description:
      "Locating and assessing groundwater reserves using non-invasive surface geophysical techniques. Combining geological knowledge with geophysical surveys and hydrogeological data helps identify promising borehole sites. This is especially valuable in semi-arid regions where reliable water supply is critical for communities and agriculture."
  },
  {
    name: "GIS",
    description:
      "Integrating spatial data and mapping tools for resource assessment, hazard analysis, and decision support. GIS enables layered analysis of geological, environmental, and demographic information to reveal patterns and relationships. It provides a powerful platform for visualizing complex spatial problems and guiding policy and planning decisions."
  },
  {
    name: "Remote Sensing",
    description:
      "Using satellite and aerial imagery to observe land cover, environmental change, and natural resources. Multispectral and radar datasets are analyzed to detect deforestation, urbanization, flooding, and mineral alteration zones. This provides broad, repeatable coverage that complements ground-based observations at regional scales."
  },
  {
    name: "Environmental Geophysics",
    description:
      "Detecting contamination and monitoring subsurface environmental conditions with geophysical surveys. Geophysical signatures help locate contaminant plumes, assess landfill integrity, and track groundwater quality over time. This supports environmental regulation, remediation planning, and the protection of sensitive ecosystems."
  },
  {
    name: "Potential Field Methods",
    description:
      "Interpreting gravity and magnetic data to map geological structures and mineral deposits. Because these methods respond to density and magnetic susceptibility contrasts, they are ideal for regional reconnaissance in basement terrains. They are widely used in mineral and oil exploration as well as in crustal-scale tectonic studies."
  },
  {
    name: "Scientific Programming",
    description:
      "Developing computational tools and scripts to model physical processes and process geophysical data. Programming in Python and related languages enables automation, efficient data handling, and reproducible research workflows. It bridges the gap between theoretical geophysics and practical, quantitative analysis."
  },
  {
    name: "Educational Technology",
    description:
      "Improving STEM teaching and learning through digital platforms, simulations, and e-learning tools. Interactive visualizations and virtual laboratories make abstract geophysical concepts more accessible and engaging. This work also explores how technology can widen access to quality education regardless of location."
  }
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
            <div className="flex flex-wrap gap-2 mb-6">
              {researchInterests.map((interest) => {
                const isOpen = openInterest === interest.name;
                return (
                  <button
                    type="button"
                    key={interest.name}
                    onClick={() => setOpenInterest(isOpen ? null : interest.name)}
                    aria-expanded={isOpen}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${isOpen
                      ? 'bg-gold text-card border border-gold'
                      : 'bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20'}`}>
                    {interest.name}
                  </button>
                );
              })}
            </div>
            <div aria-live="polite">
              {openInterest
                ? (() => {
                    const active = researchInterests.find((i) => i.name === openInterest);
                    return (
                      <div className="p-4 rounded-xl border border-border/50 bg-muted/50">
                        <span className="block font-heading text-sm font-semibold text-gold uppercase tracking-wide mb-2">{active.name}</span>
                        <span className="block text-sm text-muted-foreground leading-relaxed">{active.description}</span>
                      </div>
                    );
                  })()
                : (
                  <p className="text-sm text-muted-foreground">Click on an interest above to view its description.</p>
                )}
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