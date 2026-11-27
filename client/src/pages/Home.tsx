import React, { useState, useMemo } from 'react';
import { Property, CommunityEvent } from '../types';
import { Hero } from '../components/Hero';
import { LocationsGrid } from '../components/LocationsGrid';
import { AmenitiesBento } from '../components/AmenitiesBento';
import { RoomCarousel } from '../components/RoomCarousel';
import { CommunitySection } from '../components/CommunitySection';
import { Footer } from '../components/Footer';

interface HomeProps {
  properties: Property[];
  events: CommunityEvent[];
  onOpenBooking: (propertyId?: number, roomId?: number, mode?: 'booking' | 'callback') => void;
}

export const Home: React.FC<HomeProps> = ({
  properties,
  events,
  onOpenBooking
}) => {
  // Hero & Directory Shared Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(10);
  const [maxBudget, setMaxBudget] = useState<number>(12000);

  // Selected property for RoomCarousel
  const [selectedPropertyId, setSelectedPropertyId] = useState<number>(properties[0]?.id || 1);

  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Category filter
      if (selectedCategory !== 'All') {
        const cat = prop.category.toLowerCase();
        if (selectedCategory === 'Boys' && !cat.includes('boys')) return false;
        if (selectedCategory === 'Ladies' && !(cat.includes('ladies') || cat.includes('girls'))) return false;
        if (selectedCategory === 'On-Campus' && !cat.includes('on-campus')) return false;
        if (selectedCategory === 'Lodge' && !(cat.includes('lodge') || cat === 'pg')) return false;
      }

      // Distance from MITE check
      if (prop.distance_km > maxDistanceKm) {
        return false;
      }

      // Budget check: at least one room option within budget
      const hasRoomWithinBudget = prop.room_types.some(r => r.monthly_rent_inr <= maxBudget);
      if (!hasRoomWithinBudget) {
        return false;
      }

      return true;
    });
  }, [properties, selectedCategory, maxDistanceKm, maxBudget]);

  const handleHeroSearch = () => {
    const el = document.getElementById('locations');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setMaxDistanceKm(10);
    setMaxBudget(12000);
  };

  const handleSelectPropertyFromGrid = (property: Property) => {
    setSelectedPropertyId(property.id);
    const el = document.getElementById('rooms');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main id="main-content" className="w-full">
      {/* 1. Hero with Interactive Moodbidri/MITE Availability Bar */}
      <Hero
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        maxDistanceKm={maxDistanceKm}
        onDistanceChange={setMaxDistanceKm}
        maxBudget={maxBudget}
        onBudgetChange={setMaxBudget}
        matchingCount={filteredProperties.length}
        onSearch={handleHeroSearch}
        onOpenBooking={onOpenBooking}
      />

      {/* 2. Real MITE & Moodbidri PG Directory */}
      <LocationsGrid
        properties={filteredProperties}
        allPropertiesCount={properties.length}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onResetFilters={handleResetFilters}
        onSelectProperty={handleSelectPropertyFromGrid}
        onOpenBooking={(propId, roomId, mode) => onOpenBooking(propId, roomId, mode)}
      />

      {/* 3. Agent Verification & Co-Living Pillars */}
      <AmenitiesBento />

      {/* 4. Room Configurations & 2D CAD Floor Plans */}
      <RoomCarousel
        properties={properties}
        selectedPropertyId={selectedPropertyId}
        onSelectPropertyId={setSelectedPropertyId}
        onOpenBooking={(propId, roomId, mode) => onOpenBooking(propId, roomId, mode)}
      />

      {/* 5. Community Meetups & Agent Orientation */}
      <CommunitySection
        events={events}
        onOpenBooking={onOpenBooking}
      />

      {/* 6. Footer & Moodbidri Agent Desk */}
      <Footer />
    </main>
  );
};
