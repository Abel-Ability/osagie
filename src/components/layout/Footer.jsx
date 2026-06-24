import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Publications", path: "/publications" },
  { label: "Gallery", path: "/gallery" },
  { label: "Software", path: "/software" },
  { label: "Services", path: "/services" },
  { label: "Training", path: "/training" },
  { label: "Payment", path: "/payment" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" }
];

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/abel-o-0a743063/" },
  { name: "ResearchGate", url: "https://www.researchgate.net/profile/Abel-Osagie" },
  { name: "Google Scholar", url: "https://scholar.google.com/citations?user=ia0zhwMAAAAJ&hl=en&authuser=1" },
  { name: "ORCID", url: "https://orcid.org/0000-0002-8441-5793" },
  { name: "WhatsApp", url: "https://wa.me/2348122100528" }
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast({ title: "Subscribed!", description: "Thank you for subscribing to the newsletter." });
      setEmail('');
    }
  };

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold">
              Dr. Abel U. <span className="text-gold">Osagie</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Lecturer, Geophysicist, GIS Specialist, Researcher, Consultant, Trainer & Software Developer.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider text-gold">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Academic */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider text-gold">Connect</h4>
            <ul className="space-y-2">
              {socialLinks.map(link => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-gold transition-colors inline-flex items-center gap-1.5"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider text-gold">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with latest publications, research news, and training opportunities.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="text-sm"
              />
              <Button type="submit" size="sm" className="bg-gold text-navy hover:bg-gold/90 shrink-0">
                <Mail className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://drive.google.com/thumbnail?id=1rovoohmsc10VxMnig2NbrDv5_aaH9ukJ&sz=w120"
              alt="CBS Logo"
              className="h-8 w-auto opacity-80"
              referrerPolicy="no-referrer"
            />
            <p className="text-xs text-muted-foreground">
              © 2026 Capacity Building and Support (CBS). All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}