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
  onOpenBooking: (propertyId?: number, roomId?: number) => void;
}

export const Home: React.FC<HomeProps> = ({
  properties,
  events,
  onOpenBooking
}) => {
  // Hero Availability Filter State
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [maxBudget, setMaxBudget] = useState<number>(20000);

  // Selected property for RoomCarousel
  const [selectedPropertyId, setSelectedPropertyId] = useState<number>(properties[0]?.id || 1);

  // Filter properties based on hero filter
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // City check
      if (selectedCity !== 'All' && !prop.city.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }

      // Budget check: has at least one room within budget
      const hasRoomWithinBudget = prop.room_types.some(r => r.monthly_rent_inr <= maxBudget);
      if (!hasRoomWithinBudget) {
        return false;
      }

      // Tier check: if specified, has a room matching tier
      if (selectedTier !== 'All') {
        const matchesTier = prop.room_types.some(r => 
          r.name.toLowerCase().includes(selectedTier.toLowerCase()) || 
          r.floorplan_variant.toLowerCase().includes(selectedTier.toLowerCase())
        );
        if (!matchesTier) return false;
      }

      return true;
    });
  }, [properties, selectedCity, selectedTier, maxBudget]);

  const handleHeroSearch = () => {
    const el = document.getElementById('locations');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPropertyFromGrid = (property: Property) => {
    setSelectedPropertyId(property.id);
    const el = document.getElementById('rooms');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="w-full">
      {/* 1. Kinetic Hero with Interactive Availability Filter */}
      <Hero
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        selectedTier={selectedTier}
        onTierChange={setSelectedTier}
        maxBudget={maxBudget}
        onBudgetChange={setMaxBudget}
        onSearch={handleHeroSearch}
        onOpenBooking={() => onOpenBooking()}
      />

      {/* 2. Campus Residences Grid */}
      <LocationsGrid
        properties={filteredProperties.length > 0 ? filteredProperties : properties}
        onSelectProperty={handleSelectPropertyFromGrid}
        onOpenBooking={(propId) => onOpenBooking(propId)}
      />

      {/* 3. All-Inclusive Living Bento Grid */}
      <AmenitiesBento />

      {/* 4. Room Suites Carousel & CAD Blueprints */}
      <RoomCarousel
        properties={properties}
        selectedPropertyId={selectedPropertyId}
        onSelectPropertyId={setSelectedPropertyId}
        onOpenBooking={(propId, roomId) => onOpenBooking(propId, roomId)}
      />

      {/* 5. Campus Community Rhythm & Events Feed */}
      <CommunitySection
        events={events}
        onOpenBooking={() => onOpenBooking()}
      />

      {/* 6. Footer, FAQ & Admissions Newsletter */}
      <Footer />
    </main>
  );
};
