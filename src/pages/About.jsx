import React from 'react';
import { GraduationCap, Award, BookOpen, Users } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import AcademicProfileLinks from '@/components/shared/AcademicProfileLinks';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion } from 'framer-motion';

const qualifications = [
{ degree: "PhD", field: "Geophysics", institution: "Universiti Sains Malaysia", year: "2020" },
{ degree: "MSc", field: "Geophysics", institution: "Gyeongsang National University, South Korea", year: "2012" },
{ degree: "BSc", field: "Physics", institution: "University of Abuja, Nigeria", year: "2003" }];


const associations = [
"Nigeria Institute of Physics (MNIP)",
"Society of Exploration Geophysicists (SEG)",
"Society of Geophysicists and Computational Geoscientists (SGCG)"];


const researchInterests = [
"Seismology", "Seismic Tomography", "Hydrogeophysics", "Groundwater Exploration",
"GIS", "Remote Sensing", "Environmental Geophysics", "Potential Field Methods",
"Scientific Programming", "Educational Technology"];


function RevealDiv({ children, className = "", delay = 0 }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      
      {children}
    </div>);

}

export default function About() {
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

            </p>
            <p className="text-muted-foreground leading-relaxed">I resonate strongly with the words of Dr. John G. Hibben that "Education is the ability to meet life's situations." Since education is not solely about imparting knowledge but is a transformative process, I believe in fostering an inclusive and stimulating learning environment that inspires intellectual curiosity and critical thinking. I am committed to cultivating a deep understanding of the natural world and inspiring a passion for scientific inquiry.

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
              {qualifications.map((q, i) =>
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 rounded-lg bg-muted/50 border border-border/50">
                  <span className="font-heading font-bold text-gold text-lg w-16 shrink-0">{q.degree}</span>
                  <div className="flex-1">
                    <p className="font-medium">{q.field}</p>
                    <p className="text-sm text-muted-foreground">{q.institution}</p>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">{q.year}</span>
                </div>
              )}
            </div>
            <div className="mt-6 p-4 rounded-lg bg-gold/5 border border-gold/20">
              <p className="text-sm text-muted-foreground italic">
                Additional entries for Educational Institutions / Duration / Certificate will be updated as available.
              </p>
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
              {associations.map((a, i) =>
              <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                  <span>{a}</span>
                </li>
              )}
            </ul>
          </div>
        </RevealDiv>

        {/* Research Interests */}
        <RevealDiv className="mb-16" delay={250}>
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-10">
            <h3 className="font-heading text-xl font-semibold mb-6">Research Interests</h3>
            <div className="flex flex-wrap gap-2">
              {researchInterests.map((tag) =>
              <span
                key={tag}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20 transition-colors">
                
                  {tag}
                </span>
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
    </div>);

}