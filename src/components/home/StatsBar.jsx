import React from 'react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { GraduationCap, BookOpen, Code2, Globe } from 'lucide-react';

function StatItem({ icon: Icon, value, suffix, label }) {
  const { count, ref } = useAnimatedCounter(value);
  return (
    <div ref={ref} className="flex flex-col items-center text-center px-3 py-5">
      <Icon className="w-6 h-6 text-gold mb-1.5" />
      <div className="font-heading text-2xl sm:text-3xl font-bold">
        {count}<span className="text-gold">{suffix}</span>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-card border-y border-border">
      <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          <StatItem icon={GraduationCap} value={20} suffix="+" label="Years Teaching" />
          <StatItem icon={BookOpen} value={40} suffix="+" label="Publications" />
          <StatItem icon={Code2} value={30} suffix="+" label="Software Tools" />
          <StatItem icon={Globe} value={8} suffix="+" label="Countries Served" />
        </div>
      </div>
    </section>
  );
}