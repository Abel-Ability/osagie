import React from 'react';
import { ExternalLink } from 'lucide-react';

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/abel-o-0a743063/" },
  { name: "ResearchGate", url: "https://www.researchgate.net/profile/Abel-Osagie" },
  { name: "Google Scholar", url: "https://scholar.google.com/citations?user=ia0zhwMAAAAJ&hl=en&authuser=1" },
  { name: "ORCID", url: "https://orcid.org/0000-0002-8441-5793" },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          {/* Connect */}
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
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://drive.google.com/thumbnail?id=1rovoohmsc10VxMnig2NbrDv5_aaH9ukJ&sz=w120"
              alt="CBS Logo"
              style={{ height: '38.4px' }} className="w-auto opacity-80"
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