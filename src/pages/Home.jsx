import React, { useEffect } from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { DepartmentCards } from '../components/home/DepartmentCards';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { NewArrivals } from '../components/home/NewArrivals';
import { PromoBanner } from '../components/home/PromoBanner';
import { WhyShopWithUs } from '../components/home/WhyShopWithUs';
import { StoreLocation } from '../components/home/StoreLocation';

export function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* 1. Hero Showcase */}
      <HeroBanner />

      {/* 2. 5 Department Showcases (Kids, Boys, Girls, Men, Women) */}
      <DepartmentCards />

      {/* 3. Featured Highlights */}
      <FeaturedSection />

      {/* 4. Promotional Banner */}
      <PromoBanner />

      {/* 5. New Arrivals Rack */}
      <NewArrivals />

      {/* 6. Why Shop With Us Trust Badges */}
      <WhyShopWithUs />

      {/* 7. Store Location & Interactive Google Maps */}
      <StoreLocation />
    </div>
  );
}
