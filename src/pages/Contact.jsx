import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, Globe, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SectionHeading from '@/components/shared/SectionHeading';
import AcademicProfileLinks from '@/components/shared/AcademicProfileLinks';
import { submitFormSpark } from '@/lib/formspark';
import { trainingProgrammes } from '@/lib/publications-data';

const CONTACT_FORM_ID = 'r8P1mA59S';

const serviceOptions = [
  "GIS & Mapping", "Geophysical Surveys", "Data Analytics", "Consultancy",
  "Training & Capacity Building", "Conference Management", "Project Management",
  "Web Design", "Software Development", "Other"
];
const currencyOptions = ["NGN (Naira)", "USDT", "BTC", "ETH", "DOGE"];

export default function Contact() {
  const location = useLocation();
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState(location.state?.service || '');
  const [selectedTraining, setSelectedTraining] = useState('');
  const [wantService, setWantService] = useState(!!location.state?.service);
  const [wantTraining, setWantTraining] = useState(false);
  const [expectedDate, setExpectedDate] = useState('');
  const [expectedStartDate, setExpectedStartDate] = useState('');
  const [serviceCurrency, setServiceCurrency] = useState('');
  const [serviceAmount, setServiceAmount] = useState('');
  const [trainingCurrency, setTrainingCurrency] = useState('');
  const [trainingAmount, setTrainingAmount] = useState('');

  useEffect(() => {
    if (location.state?.service) {
      setSelectedService(location.state.service);
      setWantService(true);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);

    try {
      const entries = Object.fromEntries(new FormData(formRef.current));
      await submitFormSpark(CONTACT_FORM_ID, {
        name: entries.name || '',
        email: entries.email || '',
        phone: entries.phone || '',
        service: entries.service || '',
        training: entries.training || '',
        expected_date: entries.expected_date || '',
        expected_start_date: entries.expected_start_date || '',
        service_currency: entries.service_currency || '',
        service_amount: entries.service_amount || '',
        training_currency: entries.training_currency || '',
        training_amount: entries.training_amount || '',
        message: entries.message || '',
      });
      setSubmitted(true);
    } catch {
      setError('Failed to send. Please try again or email me directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Register Interest" subtitle="I welcome collaborations, research partnerships, and professional engagements" />

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center py-16 gap-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h3 className="font-heading text-xl font-semibold">Message Sent!</h3>
                <p className="text-center text-muted-foreground max-w-sm">
                  Thank you for reaching out. I will respond within 24–48 hours.
                </p>
                <Button onClick={() => { setSubmitted(false); formRef.current?.reset(); setSelectedService(''); setSelectedTraining(''); setWantService(false); setWantTraining(false); setExpectedDate(''); setExpectedStartDate(''); setServiceCurrency(''); setServiceAmount(''); setTrainingCurrency(''); setTrainingAmount(''); }} variant="outline" className="mt-4">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name">Full Name *</Label>
                    <Input id="contact-name" name="name" required placeholder="Your name" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input id="contact-email" name="email" type="email" required placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input id="contact-phone" name="phone" type="tel" placeholder="+234..." />
                </div>
                <div className="space-y-3 border border-border rounded-lg p-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={wantService} onCheckedChange={setWantService} />
                    <span className="text-sm font-medium">Service Required</span>
                  </label>
                  {wantService && (
                    <div className="space-y-3 pl-6">
                      <input type="hidden" name="service" value={selectedService} />
                      <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
                        <SelectContent>
                          {serviceOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <div>
                        <Label htmlFor="expected-date">Expected Date</Label>
                        <Input id="expected-date" name="expected_date" type="date" value={expectedDate} onChange={e => setExpectedDate(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Amount Offering</Label>
                        <div className="flex gap-2">
                          <input type="hidden" name="service_currency" value={serviceCurrency} />
                          <Select value={serviceCurrency} onValueChange={setServiceCurrency}>
                            <SelectTrigger className="w-44"><SelectValue placeholder="Currency" /></SelectTrigger>
                            <SelectContent>
                              {currencyOptions.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <Input name="service_amount" type="text" placeholder="Amount" value={serviceAmount} onChange={e => setServiceAmount(e.target.value)} className="flex-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-3 border border-border rounded-lg p-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={wantTraining} onCheckedChange={setWantTraining} />
                    <span className="text-sm font-medium">Training Programme</span>
                  </label>
                  {wantTraining && (
                    <div className="space-y-3 pl-6">
                      <input type="hidden" name="training" value={selectedTraining} />
                      <Select value={selectedTraining} onValueChange={setSelectedTraining}>
                        <SelectTrigger><SelectValue placeholder="Select a training programme" /></SelectTrigger>
                        <SelectContent>
                          {trainingProgrammes.map(p => <SelectItem key={p.title} value={p.title}>{p.title}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <div>
                        <Label htmlFor="expected-start-date">Expected Start Date</Label>
                        <Input id="expected-start-date" name="expected_start_date" type="date" value={expectedStartDate} onChange={e => setExpectedStartDate(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Amount Offering</Label>
                        <div className="flex gap-2">
                          <input type="hidden" name="training_currency" value={trainingCurrency} />
                          <Select value={trainingCurrency} onValueChange={setTrainingCurrency}>
                            <SelectTrigger className="w-44"><SelectValue placeholder="Currency" /></SelectTrigger>
                            <SelectContent>
                              {currencyOptions.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <Input name="training_amount" type="text" placeholder="Amount" value={trainingAmount} onChange={e => setTrainingAmount(e.target.value)} className="flex-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="contact-message">Message *</Label>
                  <Textarea id="contact-message" name="message" required rows={5} placeholder="Tell me about your project, research needs, or inquiry..." />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" disabled={sending} className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold">
                  {sending ? "Sending..." : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
                </Button>
              </form>
            )}
          </div>

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

          </div>
        </div>
      </div>
    </div>
  );
}
