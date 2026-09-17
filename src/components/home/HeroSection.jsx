import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Image, Briefcase, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import StarfieldWarp from '@/components/home/StarfieldWarp';

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
  const shootingStars = useMemo(() => {
    let seed = 13;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const dirs = ["shoot-right", "shoot-bl-tr", "shoot-br-tl", "shoot-up"];
    return Array.from({ length: 4 }, (_, i) => {
      const dir = dirs[i % dirs.length];
      let top;
      let left;
      if (dir === "shoot-right") {
        top = 10 + rand() * 70;
        left = -8 + rand() * 50;
      } else if (dir === "shoot-up") {
        top = 80 + rand() * 20;
        left = rand() * 100;
      } else if (dir === "shoot-bl-tr") {
        top = 70 + rand() * 30;
        left = rand() * 45;
      } else {
        top = 70 + rand() * 30;
        left = 55 + rand() * 45;
      }
      return {
        dir,
        top: `${top}%`,
        left: `${left}%`,
        delay: `${2 + rand() * 6}s`,
        duration: `${4.5 + rand() * 4}s`
      };
    });
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated galactic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card sm:bg-fixed">
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(168,85,247,0.18), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 70%, rgba(59,130,246,0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 70% 20%, rgba(236,72,153,0.15), transparent 60%)'
          }}
        />
        <StarfieldWarp />
        {shootingStars.map((ss, i) => (
          <span
            key={`shooting-${i}`}
            className="galaxy-shooting-star"
            style={{
              top: ss.top,
              left: ss.left,
              animation: `${ss.dir} ${ss.duration} ease-in ${ss.delay} infinite`
            }}
          />
        ))}
        <motion.div
          className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hidden sm:block absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-20">
        <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-2xl" />
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gold/30 shadow-2xl">
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
            className="space-y-5 max-w-3xl"
          >
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Dr. Abel U. OSAGIE
            </h1>
            <div className="text-lg sm:text-xl md:text-2xl font-medium h-8 sm:h-10">
              <TypewriterText />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-xs sm:text-sm text-gold">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              University of Abuja, Nigeria
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Welcome to my personal academic and professional website. I am passionate about advancing knowledge through teaching, research, innovation, and professional consultancy. My work spans Geophysics, Geographic Information Systems (GIS), Remote Sensing, Data Analytics, Educational Technology, Scientific Programming, and Digital Solutions Development. This platform provides access to my publications, research projects, maps, software solutions, training opportunities, and professional services. I welcome collaborations, consultancy engagements, research partnerships, and capacity-building opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full">
              <Link to="/publications" className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all text-sm">
                <BookOpen className="w-4 h-4" /> View Publications
              </Link>
              <Link to="/gallery" className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 border border-border rounded-lg hover:border-gold hover:text-gold transition-all text-sm">
                <Image className="w-4 h-4" /> Explore Gallery
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 border border-border rounded-lg hover:border-gold hover:text-gold transition-all text-sm">
                <Briefcase className="w-4 h-4" /> View Services
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 border border-border rounded-lg hover:border-gold hover:text-gold transition-all text-sm">
                <Mail className="w-4 h-4" /> Contact Me
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}