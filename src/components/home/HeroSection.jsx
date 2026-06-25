import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Image, Briefcase, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const titles = [
  "Lecturer",
  "Geophysicist",
  "GIS Specialist",
  "Researcher",
  "Consultant",
  "Software Developer",
  "Trainer"
];

function TypewriterText() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIdx];
    const timeout = deleting ? 40 : 80;

    if (!deleting && charIdx === current.length) {
      setTimeout(() => setDeleting(true), 2000);
      return;
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setTitleIdx((titleIdx + 1) % titles.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIdx(prev => deleting ? prev - 1 : prev + 1);
    }, timeout);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, titleIdx]);

  return (
    <span className="text-gold">
      {titles[titleIdx].substring(0, charIdx)}
      <span className="typewriter-cursor">&nbsp;</span>
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <motion.div
          className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-gold/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-2xl" />
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-gold/30 shadow-2xl">
                <img
                  src="https://drive.google.com/thumbnail?id=1kug-_NjMsxNGt4kJJ-pXaTWaukdgDWor&sz=w400"
                  alt="Dr. Abel U. Osagie"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-6 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-sm text-gold">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              University of Abuja, Nigeria
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Dr. Abel U. Osagie
            </h1>
            <div className="text-xl sm:text-2xl font-medium h-10">
              <TypewriterText />
            </div>
            <p className="text-muted-foreground leading-relaxed text-base">
              Welcome to my personal academic and professional website. I am passionate about advancing knowledge through teaching, research, innovation, and professional consultancy. My work spans Geophysics, Geographic Information Systems (GIS), Remote Sensing, Data Analytics, Educational Technology, Scientific Programming, and Digital Solutions Development. This platform provides access to my publications, research projects, maps, software solutions, training opportunities, and professional services. I welcome collaborations, consultancy engagements, research partnerships, and capacity-building opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link to="/publications" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all text-sm">
                <BookOpen className="w-4 h-4" /> View Publications
              </Link>
              <Link to="/gallery" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg hover:border-gold hover:text-gold transition-all text-sm">
                <Image className="w-4 h-4" /> Explore Gallery
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg hover:border-gold hover:text-gold transition-all text-sm">
                <Briefcase className="w-4 h-4" /> View Services
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg hover:border-gold hover:text-gold transition-all text-sm">
                <Mail className="w-4 h-4" /> Contact Me
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}