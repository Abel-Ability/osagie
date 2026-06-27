import React, { useState, useRef } from 'react';
import { Copy, CheckCircle, CreditCard, Building2, Bitcoin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import SectionHeading from '@/components/shared/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const cryptoPayments = [
  { coin: "USDT", network: "TRC20 (Tron)", address: "TDt3878oad85DEAMQWMS3n3U6gQ2netYgq", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  { coin: "Bitcoin (BTC)", network: "Bitcoin Network", address: "13AukfzT8EehBjvp9sLED2nskK3Qq7u1JR", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  { coin: "Ethereum (ETH)", network: "ERC20", address: "0xf40c67b93d15238e45a302809c4bbd9f8020503b", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { coin: "DOGE", network: "BEP20", address: "0xf40c67b93d15238e45a302809c4bbd9f8020503b", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" }
];

const serviceOptions = [
  "GIS & Mapping", "Geophysical Surveys", "Data Analytics", "Consultancy",
  "Training & Capacity Building", "Conference Management", "Project Management",
  "Web Design", "Software Development", "GIS Fundamentals Training",
  "Remote Sensing Training", "Python for Geoscientists Training", "Other"
];

function CryptoCard({ crypto }) {
  const { toast } = useToast();
  const { ref, isVisible } = useScrollReveal();

  const copyAddress = () => {
    navigator.clipboard.writeText(crypto.address);
    toast({ title: "Address Copied!", description: `${crypto.coin} wallet address copied to clipboard.` });
  };

  const truncated = crypto.address.length > 20
    ? `${crypto.address.slice(0, 10)}...${crypto.address.slice(-8)}`
    : crypto.address;

  return (
    <div
      ref={ref}
      className={`bg-card border border-border rounded-xl p-5 hover:border-gold/40 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${crypto.color}`}>
          <Bitcoin className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm">{crypto.coin}</h4>
          <span className="text-xs text-muted-foreground">{crypto.network}</span>
        </div>
      </div>
      <div className="bg-muted rounded-lg p-3 flex items-center gap-2 mb-3">
        <code className="text-xs font-mono flex-1 break-all">{truncated}</code>
        <button onClick={copyAddress} className="p-1.5 rounded-md hover:bg-background transition-colors shrink-0" aria-label="Copy address">
          <Copy className="w-4 h-4 text-gold" />
        </button>
      </div>
      <div className="w-full h-32 rounded-lg bg-muted/50 border border-border flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-foreground/5 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
            <span className="text-xs text-muted-foreground">QR Code</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Payment() {
  const formRef = useRef(null);
  const [confirmSubmitted, setConfirmSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const handleConfirmSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);

    try {
      const formData = new FormData(formRef.current);
      formData.append('access_key', WEB3FORMS_KEY);
      formData.append('subject', 'New Payment Confirmation Submission');

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setConfirmSubmitted(true);
      } else {
        setError(data.message || 'Failed to send confirmation. Please try again.');
      }
    } catch {
      setError('Failed to send confirmation. Please try again or email me directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Payment Options" subtitle="Convenient payment methods for services and training programmes" />

        {/* Bank Transfer */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-gold" />
            </div>
            <h3 className="font-heading text-xl font-semibold">Bank Transfer</h3>
          </div>
          <div className="bg-muted/50 rounded-lg p-5 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Bank Name</span>
              <span className="font-medium text-sm">Opay</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Account Name</span>
              <span className="font-medium text-sm">Abel U. Osagie</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Account Number</span>
              <span className="font-mono font-medium text-sm">8122100528</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic">
            For international wire transfers, please contact via email for IBAN/SWIFT details.
          </p>
        </div>

        {/* Cryptocurrency */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <Bitcoin className="w-5 h-5 text-gold" />
            </div>
            <h3 className="font-heading text-xl font-semibold">Cryptocurrency Payments</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {cryptoPayments.map(c => <CryptoCard key={c.coin} crypto={c} />)}
          </div>
        </div>

        {/* Payment Confirmation Form */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-gold" />
            </div>
            <h3 className="font-heading text-xl font-semibold">Payment Confirmation</h3>
          </div>

          {confirmSubmitted ? (
            <div className="flex flex-col items-center py-10 gap-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <p className="text-center text-muted-foreground max-w-md">
                Thank you. Your payment confirmation has been received and will be verified within 24 hours. You will receive a confirmation email shortly.
              </p>
              <Button onClick={() => { setConfirmSubmitted(false); formRef.current?.reset(); setError(''); setSelectedService(''); setSelectedCurrency(''); }} variant="outline" className="mt-4">Submit Another</Button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleConfirmSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input name="name" required placeholder="Your full name" />
                </div>
                <div>
                  <Label>Email Address *</Label>
                  <Input name="email" type="email" required placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <Label>Service/Training Paid For *</Label>
                <Select value={selectedService} onValueChange={setSelectedService} required>
                  <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <input type="hidden" name="service" value={selectedService} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Amount Paid *</Label>
                  <Input name="amount" required placeholder="e.g. 50000" />
                </div>
                <div>
                  <Label>Currency *</Label>
                  <Select value={selectedCurrency} onValueChange={setSelectedCurrency} required>
                    <SelectTrigger><SelectValue placeholder="Select currency" /></SelectTrigger>
                    <SelectContent>
                      {["NGN", "USD", "BTC", "USDT", "ETH", "DOGE"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="currency" value={selectedCurrency} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Transaction Reference / Hash *</Label>
                  <Input name="reference" required placeholder="Reference or hash" />
                </div>
                <div>
                  <Label>Date of Payment *</Label>
                  <Input name="payment_date" type="date" required />
                </div>
              </div>
              <div>
                <Label>Additional Notes</Label>
                <Textarea name="notes" placeholder="Any additional information..." rows={3} />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" disabled={sending} className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold">
                {sending ? "Submitting..." : "Submit Confirmation"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}