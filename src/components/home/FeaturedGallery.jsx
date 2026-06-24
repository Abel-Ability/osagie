import React from 'react';
import { Link } from 'react-router-dom';
import { galleryImages } from '@/lib/publications-data';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeading from '@/components/shared/SectionHeading';

export default function FeaturedGallery() {
  const featured = galleryImages.slice(0, 4);

  return (
    <section className="py-20 px-4 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Featured Maps" subtitle="Curated GIS and cartography outputs from research and consultancy" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map(img => (
            <GalleryThumb key={img.id} img={img} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/gallery" className="inline-flex items-center gap-2 text-gold hover:underline font-medium">
            Explore Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function GalleryThumb({ img }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`group relative rounded-xl overflow-hidden aspect-square bg-muted transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <img
        src={img.src}
        alt={img.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
        <div>
          <p className="text-white text-sm font-semibold">{img.title}</p>
          <span className="text-xs text-gold">{img.category}</span>
        </div>
      </div>
    </div>
  );
}