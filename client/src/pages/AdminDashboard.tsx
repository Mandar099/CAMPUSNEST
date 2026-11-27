import React, { useState, useEffect, useCallback } from 'react';
import { Property, Booking, BookingStatus, SystemStats } from '../types';
import {
  fetchBookings,
  updateBookingStatus,
  updateRoomAvailability,
  fetchStats,
  fetchProperties
} from '../lib/api';
import {
  ShieldCheck,
  Lock,
  RefreshCw,
  X,
  Plus,
  Minus,
  Phone,
  PhoneCall,
  MapPin,
  Search,
  ArrowLeft,
  Zap,
  Building2,
  ClipboardList
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToPublic: () => void;
  onRefreshData?: () => void;
}

const AGENT_STATUSES: BookingStatus[] = [
  'New Lead',
  'Contacted Owner',
  'Tour Scheduled',
  'Confirmed',
  'Cancelled'
];

function getStatusBadgeClass(status: BookingStatus): string {
  switch (status) {
    case 'Confirmed':
      return 'bg-sage-100 text-sage-700 border-sage-600/25';
    case 'Tour Scheduled':
      return 'bg-blue-50 text-blue-800 border-blue-200';
    case 'Contacted Owner':
      return 'bg-amber-50 text-amber-800 border-amber-300';
    case 'New Lead':
      return 'bg-terracotta-50 text-terracotta-700 border-terracotta-200';
    case 'Cancelled':
    default:
      return 'bg-red-50 text-red-800 border-red-200';
  }
}

function getNextWorkflowStep(status: BookingStatus): BookingStatus | null {
  if (status === 'New Lead') return 'Contacted Owner';
  if (status === 'Contacted Owner') return 'Tour Scheduled';
  if (status === 'Tour Scheduled') return 'Confirmed';
  return null;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToPublic,
  onRefreshData
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('admin@campusnest.in');
  const [adminPassword, setAdminPassword] = useState('campus2026');
  const [authError, setAuthError] = useState<string | null>(null);

  // Console Tab State
  const [activeTab, setActiveTab] = useState<'leads' | 'owners'>('leads');

  // Operational Data State
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Filter States
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [propertyFilter, setPropertyFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [statsData, bookingsData, propertiesData] = await Promise.all([
        fetchStats(),
        fetchBookings('campus-admin-secret-2026'),
        fetchProperties()
      ]);
      setStats(statsData);
      setBookings(bookingsData);
      setProperties(propertiesData);
      onRefreshData?.();
    } catch (err: any) {
      setActionNotice(`Error refreshing data: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [onRefreshData]);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (
      (adminEmail === 'admin@campusnest.in' && adminPassword === 'campus2026') ||
      adminPassword === 'campus-admin-secret-2026'
    ) {
      setIsAuthenticated(true);
      setAuthError(null);
      loadDashboardData();
    } else {
      setAuthError('Invalid credentials. Use the pre-filled reviewer email & passcode.');
    }
  };

  const handleStatusChange = async (bookingId: number, newStatus: BookingStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus, 'campus-admin-secret-2026');
      setActionNotice(`Lead #${bookingId} moved to "${newStatus}"`);
      setTimeout(() => setActionNotice(null), 3500);
      loadDashboardData();
    } catch (err: any) {
      setActionNotice(`Failed to update status: ${err.message}`);
    }
  };

  const handleInventoryDelta = async (roomId: number, delta: number) => {
    try {
      await updateRoomAvailability(roomId, delta, undefined, 'campus-admin-secret-2026');
      setActionNotice(`Adjusted room inventory (${delta > 0 ? `+${delta}` : delta} bed)`);
      setTimeout(() => setActionNotice(null), 3000);
      loadDashboardData();
    } catch (err: any) {
      setActionNotice(`Failed to adjust room count: ${err.message}`);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated, loadDashboardData]);

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'All' && b.status !== statusFilter) return false;
    if (propertyFilter !== 'All' && b.property_id.toString() !== propertyFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      return (
        b.full_name.toLowerCase().includes(q) ||
        b.reference_code.toLowerCase().includes(q) ||
        b.property_name.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.phone.includes(q)
      );
    }
    return true;
  });

  // ==========================================
  // VIEW: LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-alabaster flex flex-col justify-center items-center px-4 py-12 architectural-grid">
        <div className="w-full max-w-md bg-white border border-parchment-200 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-obsidian text-white flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6 text-terracotta" aria-hidden="true" />
            </div>
            <h1 className="font-display font-extrabold text-2xl text-obsidian tracking-tight">
              Agent Operations Console
            </h1>
            <p className="font-mono text-xs text-slate-600 mt-1 uppercase tracking-wider">
              Moodbidri Lead Handoff &amp; PG Owner Directory
            </p>
          </div>

          {authError && (
            <div role="alert" className="p-3 mb-6 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs font-mono">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-mono uppercase font-semibold text-slate-700 mb-1">
                Agent Email
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-parchment-300 font-sans text-sm text-obsidian"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-mono uppercase font-semibold text-slate-700 mb-1">
                Passcode
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-parchment-300 font-sans text-sm text-obsidian"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-alabaster border border-parchment-200 font-mono text-xs text-slate-700 space-y-1">
              <div className="font-bold text-obsidian">Reviewer Demo Credentials:</div>
              <div>Email: <code className="text-terracotta-700 font-semibold">admin@campusnest.in</code></div>
              <div>Passcode: <code className="text-terracotta-700 font-semibold">campus2026</code></div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-obsidian hover:bg-slate-800 text-white font-mono text-xs uppercase font-semibold shadow transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-terracotta" aria-hidden="true" />
              <span>Enter Agent Console</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onBackToPublic}
              className="font-mono text-xs text-slate-600 hover:text-obsidian flex items-center justify-center gap-1.5 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Return to Public Directory</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: AUTHENTICATED AGENT CONSOLE
  // ==========================================
  return (
    <div id="main-content" className="min-h-screen bg-alabaster text-obsidian font-sans">

      {/* Console Subheader Bar */}
      <div className="bg-obsidian text-white border-b border-slate-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-display font-bold text-lg text-white">
              Agent Operations Console
            </span>
            <span className="font-mono text-xs bg-slate-800 text-parchment-200 px-2.5 py-1 rounded">
              MOODBIDRI / MITE HUB
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <button
              type="button"
              onClick={loadDashboardData}
              disabled={isLoading}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} aria-hidden="true" />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              onClick={onBackToPublic}
              className="px-3 py-2 rounded-lg bg-terracotta hover:bg-terracotta-600 text-white transition-colors"
            >
              Public Directory
            </button>

            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-parchment-200 hover:text-white transition-colors"
            >
              Lock Console
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">

        {/* Live Action Notification Toast (floating bottom-right so never clipped by sticky header) */}
        {actionNotice && (
          <div role="status" aria-live="polite" className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl bg-obsidian text-white font-mono text-xs flex items-center justify-between gap-4 shadow-2xl border border-slate-700">
            <span className="inline-flex items-center gap-2">
              <Zap className="w-4 h-4 text-terracotta flex-shrink-0" aria-hidden="true" />
              <span>{actionNotice}</span>
            </span>
            <button
              type="button"
              onClick={() => setActionNotice(null)}
              aria-label="Dismiss notification"
              className="p-1 text-parchment-200 hover:text-white flex-shrink-0"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* 1. AGGREGATE OPERATIONAL STATS */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 tabular-nums">
            <div className="p-4 rounded-xl bg-white border border-parchment-200 shadow-sm">
              <span className="font-mono text-[11px] text-slate-600 uppercase block">Moodbidri PGs</span>
              <div className="font-display font-bold text-2xl text-obsidian">{stats.total_properties}</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-parchment-200 shadow-sm">
              <span className="font-mono text-[11px] text-slate-600 uppercase block">Available Beds</span>
              <div className="font-display font-bold text-2xl text-sage-700">{stats.available_beds}</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-parchment-200 shadow-sm">
              <span className="font-mono text-[11px] text-slate-600 uppercase block">Total Leads</span>
              <div className="font-display font-bold text-2xl text-obsidian">{stats.total_bookings}</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-parchment-200 shadow-sm">
              <span className="font-mono text-[11px] text-slate-600 uppercase block">New Leads</span>
              <div className="font-display font-bold text-2xl text-terracotta-700">{stats.new_leads}</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-parchment-200 shadow-sm">
              <span className="font-mono text-[11px] text-slate-600 uppercase block">Owner / Tour Stage</span>
              <div className="font-display font-bold text-2xl text-obsidian">{stats.active_pipeline}</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-parchment-200 shadow-sm">
              <span className="font-mono text-[11px] text-slate-600 uppercase block">Confirmed Stays</span>
              <div className="font-display font-bold text-2xl text-sage-700">{stats.confirmed_bookings}</div>
            </div>
          </div>
        )}

        {/* CONSOLE MODE SWITCHER TABS */}
        <div className="flex flex-wrap items-center gap-2 border-b border-parchment-200 pb-3 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-colors ${
              activeTab === 'leads'
                ? 'bg-obsidian text-white shadow-sm'
                : 'bg-white border border-parchment-200 text-slate-700 hover:border-obsidian'
            }`}
          >
            <ClipboardList className="w-4 h-4 text-terracotta" aria-hidden="true" />
            <span>Student Leads &amp; Owner Handoff ({bookings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('owners')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-colors ${
              activeTab === 'owners'
                ? 'bg-obsidian text-white shadow-sm'
                : 'bg-white border border-parchment-200 text-slate-700 hover:border-obsidian'
            }`}
          >
            <Building2 className="w-4 h-4 text-sage" aria-hidden="true" />
            <span>Owner Directory &amp; Live Bed Inventory ({properties.length})</span>
          </button>
        </div>

        {/* TAB 1: AGENT LEAD PIPELINE & OWNER HANDOFF */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-parchment-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-parchment-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display font-bold text-lg text-obsidian">
                      Incoming Student Leads &amp; Direct Owner Handoff
                    </h2>
                    <p className="font-mono text-xs text-slate-600">
                      Coordinate directly between students and PG owners using click-to-call owner numbers
                    </p>
                  </div>

                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    <input
                      type="search"
                      aria-label="Search leads by name, phone, property, or code"
                      placeholder="Search student, PG, CN-2026…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-parchment-300 bg-alabaster font-mono text-xs text-obsidian placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Status & Property Filters */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <div className="flex items-center gap-2">
                    <label htmlFor="admin-status-filter" className="font-mono text-xs text-slate-600 uppercase">Workflow:</label>
                    <select
                      id="admin-status-filter"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="py-1.5 px-3 rounded-lg border border-parchment-300 bg-alabaster font-mono text-xs text-obsidian cursor-pointer"
                    >
                      <option value="All">All Pipeline Stages</option>
                      {AGENT_STATUSES.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <label htmlFor="admin-property-filter" className="font-mono text-xs text-slate-600 uppercase">PG / Hostel:</label>
                    <select
                      id="admin-property-filter"
                      value={propertyFilter}
                      onChange={(e) => setPropertyFilter(e.target.value)}
                      className="py-1.5 px-3 rounded-lg border border-parchment-300 bg-alabaster font-mono text-xs text-obsidian cursor-pointer"
                    >
                      <option value="All">All 11 Properties</option>
                      {properties.map(p => (
                        <option key={p.id} value={p.id.toString()}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-alabaster border-b border-parchment-200 text-slate-700 uppercase text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Lead Ref &amp; Type</th>
                      <th className="py-3 px-4">Student / Guardian</th>
                      <th className="py-3 px-4">Requested PG &amp; Room</th>
                      <th className="py-3 px-4">PG Owner Direct Contact</th>
                      <th className="py-3 px-4">Pipeline Stage</th>
                      <th className="py-3 px-4 text-right">Agent Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-parchment-200">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-slate-600 font-mono">
                          No leads match the selected workflow filters.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => {
                        const nextStep = getNextWorkflowStep(b.status);
                        return (
                          <tr key={b.id} className="hover:bg-alabaster/60 transition-colors align-top">
                            <td className="py-4 px-4">
                              <div className="font-bold text-terracotta-700 tabular-nums" translate="no">
                                {b.reference_code}
                              </div>
                              <div className="text-[11px] text-slate-700 mt-0.5">{b.tour_type}</div>
                              <div className="text-[11px] text-slate-600 tabular-nums mt-0.5">Move-in: {b.preferred_move_in}</div>
                            </td>

                            <td className="py-4 px-4">
                              <div className="font-bold text-obsidian text-sm font-sans">{b.full_name}</div>
                              <div className="text-[11px] text-slate-600 mb-1">{b.applicant_role}</div>
                              <a
                                href={`tel:+91${b.phone}`}
                                className="inline-flex items-center gap-1 text-obsidian hover:text-terracotta font-semibold underline-offset-2 hover:underline tabular-nums"
                              >
                                <Phone className="w-3 h-3 text-terracotta" aria-hidden="true" />
                                <span>+91 {b.phone}</span>
                              </a>
                              <div className="text-[11px] text-slate-600 mt-0.5 truncate max-w-[180px]">{b.email}</div>
                            </td>

                            <td className="py-4 px-4">
                              <div className="font-bold text-obsidian font-sans text-sm">{b.property_name}</div>
                              <div className="text-slate-700">{b.room_name}</div>
                              {b.property_distance_km !== undefined && (
                                <div className="text-[11px] text-slate-600 tabular-nums mt-0.5">
                                  {b.property_distance_km} km from MITE ({b.property_travel_time})
                                </div>
                              )}
                              {b.notes && (
                                <div className="text-[11px] text-slate-600 italic mt-1 max-w-[220px] break-words">
                                  “{b.notes}”
                                </div>
                              )}
                            </td>

                            {/* DIRECT OWNER CLICK-TO-CALL CELL */}
                            <td className="py-4 px-4">
                              {b.property_phone ? (
                                <div className="space-y-1.5">
                                  <a
                                    href={`tel:${b.property_phone.replace(/\s+/g, '')}`}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sage-50 border border-sage-600/25 text-sage-700 hover:bg-sage hover:text-white font-semibold transition-colors tabular-nums"
                                  >
                                    <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
                                    <span>Call {b.property_phone}</span>
                                  </a>
                                  <div className="text-[11px] text-slate-600 max-w-[190px] break-words">
                                    {b.property_address}
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  <span className="inline-block px-2.5 py-1 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-[11px] font-semibold">
                                    Agent Field Visit Required
                                  </span>
                                  <div className="text-[11px] text-slate-600 max-w-[190px] break-words">
                                    {b.property_address}
                                  </div>
                                </div>
                              )}
                            </td>

                            <td className="py-4 px-4">
                              <span className={`inline-block px-2.5 py-1 rounded-md border text-[11px] font-bold ${getStatusBadgeClass(b.status)}`}>
                                {b.status}
                              </span>
                            </td>

                            <td className="py-4 px-4 text-right">
                              <div className="flex flex-col items-end gap-2">
                                {nextStep && (
                                  <button
                                    type="button"
                                    onClick={() => handleStatusChange(b.id, nextStep)}
                                    className="px-3 py-1.5 rounded-lg bg-obsidian hover:bg-slate-800 text-white text-[11px] font-semibold whitespace-nowrap transition-colors"
                                  >
                                    Advance → {nextStep}
                                  </button>
                                )}

                                <select
                                  aria-label={`Change status for ${b.full_name}`}
                                  value={b.status}
                                  onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                                  className="py-1 px-2 rounded border border-parchment-300 bg-alabaster text-[11px] text-obsidian cursor-pointer"
                                >
                                  {AGENT_STATUSES.map(st => (
                                    <option key={st} value={st}>{st}</option>
                                  ))}
                                </select>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OWNER DIRECTORY & LIVE BED INVENTORY */}
        {activeTab === 'owners' && (
          <div className="space-y-6">
            {/* Quick Owner Contact Directory */}
            <div className="bg-white rounded-2xl border border-parchment-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-parchment-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="font-display font-bold text-lg text-obsidian">
                    Moodbidri PG &amp; Hostel Owner Directory
                  </h2>
                  <p className="font-mono text-xs text-slate-600">
                    Direct owner click-to-call lines paired with real-time room bed counts
                  </p>
                </div>
                <span className="font-mono text-xs text-slate-700 font-semibold tabular-nums">
                  11 Verified Moodbidri Listings
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-alabaster border-b border-parchment-200 text-slate-700 uppercase text-[11px]">
                    <tr>
                      <th className="py-3 px-4">PG / Hostel Name</th>
                      <th className="py-3 px-4">MITE Distance</th>
                      <th className="py-3 px-4">Owner / Desk Phone</th>
                      <th className="py-3 px-4">Open Leads</th>
                      <th className="py-3 px-4">Room Tiers &amp; Bed Adjusters</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-parchment-200">
                    {properties.map((prop) => {
                      const activeLeadCount = bookings.filter(
                        (b) => b.property_id === prop.id && b.status !== 'Cancelled'
                      ).length;

                      return (
                        <tr key={prop.id} className="hover:bg-alabaster/50 transition-colors align-top">
                          <td className="py-4 px-4">
                            <div className="font-sans font-bold text-sm text-obsidian">{prop.name}</div>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-alabaster border border-parchment-200 text-[11px] text-slate-700">
                              {prop.category}
                            </span>
                            <div className="flex items-start gap-1 text-[11px] text-slate-600 mt-1.5 max-w-[260px] break-words">
                              <MapPin className="w-3 h-3 text-terracotta flex-shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{prop.address}</span>
                            </div>
                          </td>

                          <td className="py-4 px-4 tabular-nums">
                            <div className="font-bold text-obsidian">{prop.distance_km} km</div>
                            <div className="text-[11px] text-slate-600">{prop.travel_time}</div>
                          </td>

                          <td className="py-4 px-4">
                            {prop.phone ? (
                              <a
                                href={`tel:${prop.phone.replace(/\s+/g, '')}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sage-50 border border-sage-600/25 text-sage-700 hover:bg-sage hover:text-white font-semibold transition-colors tabular-nums"
                              >
                                <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>{prop.phone}</span>
                              </a>
                            ) : (
                              <span className="inline-block px-2.5 py-1 rounded bg-amber-50 border border-amber-300 text-amber-800 text-[11px] font-semibold">
                                Agent Field Visit Only
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-4 tabular-nums">
                            <span className="inline-flex items-center px-2.5 py-1 rounded bg-alabaster border border-parchment-200 font-bold text-obsidian">
                              {activeLeadCount} active
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <div className="space-y-2 min-w-[260px]">
                              {prop.room_types.map((room) => (
                                <div
                                  key={room.id}
                                  className="flex items-center justify-between gap-3 p-2 rounded-lg bg-alabaster border border-parchment-200 tabular-nums"
                                >
                                  <div>
                                    <div className="font-semibold text-obsidian">{room.name}</div>
                                    <div className="text-[11px] text-slate-600">
                                      ₹{room.monthly_rent_inr.toLocaleString('en-IN')}/mo · {room.status}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => handleInventoryDelta(room.id, -1)}
                                      disabled={room.available_count <= 0}
                                      aria-label={`Decrease available beds for ${room.name} at ${prop.name}`}
                                      className="w-7 h-7 rounded border border-parchment-300 bg-white hover:bg-red-50 hover:border-red-300 text-obsidian flex items-center justify-center transition-colors disabled:opacity-30"
                                    >
                                      <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                                    </button>
                                    <span className="font-bold text-sm text-obsidian w-5 text-center">
                                      {room.available_count}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleInventoryDelta(room.id, 1)}
                                      aria-label={`Increase available beds for ${room.name} at ${prop.name}`}
                                      className="w-7 h-7 rounded border border-parchment-300 bg-white hover:bg-sage-50 hover:border-sage-600 text-obsidian flex items-center justify-center transition-colors"
                                    >
                                      <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
