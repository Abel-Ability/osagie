import React, { useState } from 'react';
import { trainingProgrammes } from '@/lib/publications-data';
import { GraduationCap, Clock, Monitor, BarChart3, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SectionHeading from '@/components/shared/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const modeColors = { "Online": "bg-blue-500/10 text-blue-600 dark:text-blue-400", "In-Person": "bg-green-500/10 text-green-600 dark:text-green-400", "Hybrid": "bg-purple-500/10 text-purple-600 dark:text-purple-400" };
const levelColors = { "Beginner": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", "Intermediate": "bg-amber-500/10 text-amber-600 dark:text-amber-400", "Advanced": "bg-red-500/10 text-red-600 dark:text-red-400" };

function TrainingCard({ programme, onRegister }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`bg-card border border-border rounded-xl p-6 hover:border-gold/40 hover:shadow-lg transition-all duration-500 flex flex-col ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${modeColors[programme.mode]}`}>
          {programme.mode}
        </span>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${levelColors[programme.level]}`}>
          {programme.level}
        </span>
      </div>
      <h3 className="font-heading font-semibold text-lg mb-2">{programme.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 flex-1">{programme.description}</p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
        <Clock className="w-4 h-4 text-gold" />
        <span>{programme.duration}</span>
      </div>
      <button
        onClick={() => onRegister(programme.title)}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gold text-navy rounded-lg hover:bg-gold/90 transition-all text-sm font-semibold"
      >
        <GraduationCap className="w-4 h-4" /> Register Interest
      </button>
    </div>
  );
}

export default function Training() {
  const [regOpen, setRegOpen] = useState(false);
  const [regProgramme, setRegProgramme] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const openRegistration = (title) => {
    setRegProgramme(title);
    setRegOpen(true);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setRegOpen(false); }, 3000);
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Training Programmes" subtitle="Professional development and capacity building opportunities" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trainingProgrammes.map(p => (
            <TrainingCard key={p.title} programme={p} onRegister={openRegistration} />
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      <Dialog open={regOpen} onOpenChange={setRegOpen}>
        <DialogContent className="max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              {submitted ? "Registration Received!" : "Register Interest"}
            </DialogTitle>
          </DialogHeader>
          {submitted ? (
            <div className="flex flex-col items-center py-8 gap-4">
              <CheckCircle className="w-14 h-14 text-green-500" />
              <p className="text-center text-muted-foreground text-sm">
                Thank you for your interest. You will be contacted with further details when the programme opens.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Full Name *</Label>
                <Input required placeholder="Your name" />
              </div>
              <div>
                <Label>Email *</Label>
                <Input type="email" required placeholder="you@example.com" />
              </div>
              <div>
                <Label>Institution</Label>
                <Input placeholder="University / Organisation" />
              </div>
              <div>
                <Label>Programme of Interest</Label>
                <Input value={regProgramme} readOnly className="bg-muted" />
              </div>
              <div>
                <Label>Experience Level</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Preferred Start Date</Label>
                <Input type="date" />
              </div>
              <Button type="submit" className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold">
                Submit Registration
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}