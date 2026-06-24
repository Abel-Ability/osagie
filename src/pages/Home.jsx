import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import FeaturedPublications from '@/components/home/FeaturedPublications';
import FeaturedGallery from '@/components/home/FeaturedGallery';
import ServicesOverview from '@/components/home/ServicesOverview';
import FeaturedSoftware from '@/components/home/FeaturedSoftware';
import CTABanner from '@/components/home/CTABanner';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsBar />
      <FeaturedPublications />
      <FeaturedGallery />
      <ServicesOverview />
      <FeaturedSoftware />
      <CTABanner />
    </div>
  );
}