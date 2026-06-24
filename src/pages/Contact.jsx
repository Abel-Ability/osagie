import React, { useState } from 'react';
import { Mail, Phone, Globe, Send, CheckCircle, ExternalLink, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SectionHeading from '@/components/shared/SectionHeading';
import AcademicProfileLinks from '@/components/shared/AcademicProfileLinks';

const howOptions = ["Google Search", "Social Media", "Colleague/Friend", "Academic Publication", "Conference", "Other"];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSubmitted(true); }, 1200);
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Get in Touch" subtitle="I welcome collaborations, research partnerships, and professional engagements" />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center py-16 gap-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h3 className="font-heading text-xl font-semibold">Message Sent!</h3>
                <p className="text-center text-muted-foreground max-w-sm">
                  Thank you for reaching out. I will respond within 24–48 hours.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-4">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name">Full Name *</Label>
                    <Input id="contact-name" required placeholder="Your name" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input id="contact-email" type="email" required placeholder="you@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input id="contact-phone" type="tel" placeholder="+234..." />
                  </div>
                  <div>
                    <Label htmlFor="contact-subject">Subject *</Label>
                    <Input id="contact-subject" required placeholder="Subject of your message" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="contact-message">Message *</Label>
                  <Textarea id="contact-message" required rows={5} placeholder="Write your message here..." />
                </div>
                <div>
                  <Label>How did you find me?</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select an option (optional)" /></SelectTrigger>
                    <SelectContent>
                      {howOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" disabled={sending} className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold">
                  {sending ? "Sending..." : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
                </Button>
              </form>
            )}
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-heading text-lg font-semibold mb-5">Contact Information</h3>
              <div className="space-y-4">
                <a href="mailto:abel.osagie@uniabuja.edu.ng" className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground group-hover:text-gold transition-colors">abel.osagie@uniabuja.edu.ng</p>
                  </div>
                </a>
                <a href="https://wa.me/2348122100528" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">WhatsApp</p>
                    <p className="text-sm text-muted-foreground group-hover:text-gold transition-colors">+234 8122 100 528</p>
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Institution</p>
                    <p className="text-sm text-muted-foreground">University of Abuja, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-heading text-lg font-semibold mb-4">Academic Profiles</h3>
              <AcademicProfileLinks compact />
            </div>

            {/* Map */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium">University of Abuja, FCT, Nigeria</span>
              </div>
              <iframe
                title="University of Abuja Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d7.0!3d8.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0ba41c4000f7%3A0x5b4b4b4b4b4b4b4b!2sUniversity%20of%20Abuja!5e0!3m2!1sen!2sng!4v1700000000000"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}