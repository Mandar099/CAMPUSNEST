import React, { useState, useEffect, useCallback } from 'react';
import { Property, CommunityEvent } from './types';
import { fetchProperties, fetchEvents } from './lib/api';
import { initSmoothScroll, destroySmoothScroll } from './lib/motion';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { BookingDrawer } from './components/BookingDrawer';
import { Home } from './pages/Home';
import { AdminDashboard } from './pages/AdminDashboard';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');
  const [properties, setProperties] = useState<Property[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Booking Drawer State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPropertyId, setBookingPropertyId] = useState<number | undefined>(undefined);
  const [bookingRoomId, setBookingRoomId] = useState<number | undefined>(undefined);

  // Total Available Beds calculated live across properties
  const totalAvailableBeds = properties.reduce((acc, p) => acc + p.available_beds, 0);

  const loadData = useCallback(async () => {
    try {
      const [propsData, eventsData] = await Promise.all([
        fetchProperties(),
        fetchEvents()
      ]);
      setProperties(propsData);
      setEvents(eventsData);
    } catch (err) {
      console.error('[CampusNest] Failed to load initial data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Check URL route for /admin or #admin
    const checkRoute = () => {
      if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('home');
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);

    // Initialize smooth scrolling
    const lenis = initSmoothScroll();

    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
      destroySmoothScroll();
    };
  }, [loadData]);

  const handleNavigate = (view: 'home' | 'admin') => {
    setCurrentView(view);
    if (view === 'admin') {
      window.history.pushState(null, '', '#admin');
    } else {
      window.history.pushState(null, '', '#');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (propId?: number, roomId?: number) => {
    setBookingPropertyId(propId);
    setBookingRoomId(roomId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-alabaster text-obsidian font-sans">
      
      {/* 1. Entrance Preloader */}
      <Preloader />

      {/* 2. Sticky Glassmorphic Header */}
      <Navbar
        totalAvailableBeds={totalAvailableBeds}
        onOpenBooking={() => handleOpenBooking()}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* 3. Main Views */}
      {currentView === 'home' ? (
        <Home
          properties={properties}
          events={events}
          onOpenBooking={handleOpenBooking}
        />
      ) : (
        <AdminDashboard
          onBackToPublic={() => handleNavigate('home')}
          onRefreshData={loadData}
        />
      )}

      {/* 4. Multi-Step Slide-Over Booking Drawer */}
      <BookingDrawer
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        properties={properties}
        initialPropertyId={bookingPropertyId}
        initialRoomId={bookingRoomId}
        onBookingSuccess={() => {
          loadData();
        }}
      />

    </div>
  );
};

export default App;
