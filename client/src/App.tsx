import React, { useState, useEffect, useCallback } from 'react';
import { Property, CommunityEvent } from './types';
import { fetchProperties, fetchEvents } from './lib/api';
import { FALLBACK_PROPERTIES, FALLBACK_EVENTS } from './data/fallbackProperties';
import { initSmoothScroll, destroySmoothScroll } from './lib/motion';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { BookingDrawer } from './components/BookingDrawer';
import { Home } from './pages/Home';
import { AdminDashboard } from './pages/AdminDashboard';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');
  const [properties, setProperties] = useState<Property[]>(FALLBACK_PROPERTIES);
  const [events, setEvents] = useState<CommunityEvent[]>(FALLBACK_EVENTS);

  // Booking Drawer State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPropertyId, setBookingPropertyId] = useState<number | undefined>(undefined);
  const [bookingRoomId, setBookingRoomId] = useState<number | undefined>(undefined);
  const [bookingMode, setBookingMode] = useState<'booking' | 'callback'>('booking');

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
    }
  }, []);

  useEffect(() => {
    loadData();

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

    initSmoothScroll();

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

  const handleOpenBooking = (
    propId?: number,
    roomId?: number,
    mode: 'booking' | 'callback' = 'booking'
  ) => {
    setBookingPropertyId(propId);
    setBookingRoomId(roomId);
    setBookingMode(mode);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-alabaster text-obsidian font-sans">
      <Preloader />

      <Navbar
        totalAvailableBeds={totalAvailableBeds}
        totalProperties={properties.length || 11}
        onOpenBooking={(propId, roomId) => handleOpenBooking(propId, roomId, 'booking')}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

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

      <BookingDrawer
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        properties={properties}
        initialPropertyId={bookingPropertyId}
        initialRoomId={bookingRoomId}
        initialMode={bookingMode}
        onBookingSuccess={() => {
          loadData();
        }}
      />
    </div>
  );
};

export default App;
