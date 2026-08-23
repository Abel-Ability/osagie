import React from 'react';
import SectionHeading from '@/components/shared/SectionHeading';
import { Shield, Copyright, AlertTriangle, Ban } from 'lucide-react';

export default function Terms() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading 
          title="Terms of Service" 
          subtitle="Legal terms governing the use of this website and its content" 
        />

        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-8">
          {/* Copyright Notice */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Copyright className="w-5 h-5 text-gold" />
              <h2 className="text-lg font-heading font-semibold">Copyright Notice</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              © 2026 Dr. Abel U. Osagie. All rights reserved. This website and its original content, 
              including but not limited to text, graphics, logos, images, maps, software, and design elements, 
              are protected by international copyright laws.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-gold" />
              <h2 className="text-lg font-heading font-semibold">Intellectual Property</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All intellectual property rights in this website and its content are owned by Dr. Abel U. Osagie 
              and Capacity Building and Support (CBS). This includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Academic publications and research outputs</li>
              <li>GIS maps, cartographic materials, and spatial analyses</li>
              <li>Software tools and applications</li>
              <li>Training materials and educational content</li>
              <li>Website design, layout, and visual elements</li>
              <li>Photographs, images, and multimedia content</li>
            </ul>
          </section>

          {/* Prohibited Activities */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Ban className="w-5 h-5 text-gold" />
              <h2 className="text-lg font-heading font-semibold">Prohibited Activities</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Without prior written consent from Dr. Abel U. Osagie, you may NOT:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Copy, reproduce, or duplicate any content from this website</li>
              <li>Scrape, extract, or systematically download website content</li>
              <li>Use automated tools (bots, crawlers) to access or copy content</li>
              <li>Modify, adapt, or create derivative works from any content</li>
              <li>Redistribute, publish, or publicly display any content</li>
              <li>Remove or alter any copyright notices or watermarks</li>
              <li>Frame or embed this website's content on other sites</li>
              <li>Use this website's content for commercial purposes without authorization</li>
            </ul>
          </section>

          {/* Authorized Use */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-gold" />
              <h2 className="text-lg font-heading font-semibold">Authorized Use</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              You may view and interact with this website for personal, non-commercial purposes. 
              Academic citation of published works is permitted provided proper attribution is given 
              and a link to the original source is included. For any other use, please contact 
              Dr. Abel U. Osagie for permission.
            </p>
          </section>

          {/* Enforcement */}
          <section>
            <h2 className="text-lg font-heading font-semibold mb-4">Enforcement</h2>
            <p className="text-muted-foreground leading-relaxed">
              Unauthorized use of this website's content may constitute copyright infringement and will be 
              pursued through legal action, including but not limited to DMCA takedown notices, 
              cease and desist letters, and litigation. We actively monitor for unauthorized copying 
              and reproduction of our content.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-lg font-heading font-semibold mb-4">Request Permission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To request permission to use any content from this website, please contact:<br />
              <strong>Dr. Abel U. Osagie</strong><br />
              Email: <a href="mailto:abel.osagie@uniabuja.edu.ng" className="text-gold hover:underline">abel.osagie@uniabuja.edu.ng</a>
            </p>
          </section>

          <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
            Last updated: August 2026
          </p>
        </div>
      </div>
    </div>
  );
}
