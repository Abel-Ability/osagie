import React, { useState, useMemo } from 'react';
import { galleryImages } from '@/lib/publications-data';
import { X, ChevronLeft, ChevronRight, Download, Maximize2 } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const categories = ["All", "Africa", "Nigeria", "Malaysia", "Libya", "FCT/Abuja", "Seismology", "Geology", "Drainage", "Other"];

function GalleryCard({ img, onClick }) {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`group relative rounded-xl overflow-hidden cursor-pointer bg-muted transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
      }>
      
      <div className="aspect-square">
        <img
          src={img.src}
          alt={img.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy" />
        
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="text-white font-semibold text-sm">{img.title}</p>
        <div className="flex gap-2 mt-1">
          <span className="text-xs px-2 py-0.5 rounded-full bg-gold/80 text-navy">{img.category}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white">{img.subcategory}</span>
        </div>
      </div>
    </div>);

}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return galleryImages;
    return galleryImages.filter((img) =>
    img.category === activeCategory ||
    img.subcategory === activeCategory ||
    img.category.includes(activeCategory) ||
    img.subcategory.includes(activeCategory)
    );
  }, [activeCategory]);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () => setLightboxIdx((i) => i > 0 ? i - 1 : filtered.length - 1);
  const nextImage = () => setLightboxIdx((i) => i < filtered.length - 1 ? i + 1 : 0);

  const currentImage = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Map Gallery" subtitle="A curated collection of maps produced using ArcGIS, QGIS, and other spatial analysis platforms" />

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-8">
          <p className="text-sm text-muted-foreground mb-4">Welcome to my GIS and Cartography Gallery — a curated collection of maps produced using ArcGIS, QGIS, Generic Mapping Tools (GMTand other spatial analysis platforms. These maps represent research outputs, teaching resources, and professional GIS consultancy work spanning multiple countries and disciplines.

          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) =>
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat ?
              'bg-gold text-navy' :
              'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'}`
              }>
              
                {cat}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img, idx) =>
          <GalleryCard key={img.id} img={img} onClick={() => openLightbox(idx)} />
          )}
        </div>

        {filtered.length === 0 &&
        <p className="text-center text-muted-foreground py-16">No images found for this category.</p>
        }
      </div>

      {/* Lightbox */}
      {currentImage &&
      <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <a
            href={currentImage.src}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Open full size">
            
              <Maximize2 className="w-5 h-5" />
            </a>
            <button onClick={closeLightbox} className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Close lightbox">
              <X className="w-5 h-5" />
            </button>
          </div>
          <button
          onClick={(e) => {e.stopPropagation();prevImage();}}
          className="absolute left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Previous image">
          
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] px-4" onClick={(e) => e.stopPropagation()}>
            <img
            src={currentImage.src}
            alt={currentImage.title}
            className="max-w-full max-h-[75vh] object-contain mx-auto rounded-lg"
            referrerPolicy="no-referrer" />
          
            <div className="text-center mt-4">
              <h3 className="text-white font-heading text-lg font-semibold">{currentImage.title}</h3>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold/80 text-navy">{currentImage.category}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 text-white">{currentImage.subcategory}</span>
              </div>
            </div>
          </div>
          <button
          onClick={(e) => {e.stopPropagation();nextImage();}}
          className="absolute right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Next image">
          
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      }
    </div>);

}