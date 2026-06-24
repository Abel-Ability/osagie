import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, CheckCircle } from 'lucide-react';

const serviceOptions = [
  "GIS & Mapping",
  "Geophysical Surveys",
  "Data Analytics",
  "Consultancy",
  "Training & Capacity Building",
  "Conference Management",
  "Project Management",
  "Web Design",
  "Software Development",
  "Other"
];

export default function HireMeModal({ open, onOpenChange, prefillService = "" }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); onOpenChange(false); }, 3000);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">
            {submitted ? "Request Sent!" : "Request a Quote"}
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center py-8 gap-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <p className="text-center text-muted-foreground">
              Thank you for your interest. I will review your request and respond within 24–48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hire-name">Full Name *</Label>
                <Input id="hire-name" required placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="hire-email">Email *</Label>
                <Input id="hire-email" type="email" required placeholder="you@example.com" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hire-phone">Phone</Label>
                <Input id="hire-phone" type="tel" placeholder="+234..." />
              </div>
              <div>
                <Label htmlFor="hire-org">Organisation</Label>
                <Input id="hire-org" placeholder="Company / University" />
              </div>
            </div>
            <div>
              <Label>Service Required *</Label>
              <Select defaultValue={prefillService} required>
                <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
                <SelectContent>
                  {serviceOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="hire-desc">Project Description *</Label>
              <Textarea id="hire-desc" required rows={4} placeholder="Describe your project requirements..." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hire-budget">Budget Range</Label>
                <Input id="hire-budget" placeholder="e.g. $500 - $2000" />
              </div>
              <div>
                <Label htmlFor="hire-date">Preferred Start Date</Label>
                <Input id="hire-date" type="date" />
              </div>
            </div>
            <Button type="submit" disabled={sending} className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold">
              {sending ? "Sending..." : <><Send className="w-4 h-4 mr-2" /> Submit Request</>}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}