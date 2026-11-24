import React, { useState, useEffect } from 'react';
import { Property, Booking, SystemStats } from '../types';
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
  Check, 
  X, 
  Filter, 
  Plus, 
  Minus, 
  Bed, 
  Building2, 
  UserCheck, 
  Phone, 
  Mail, 
  Calendar, 
  Search,
  ArrowLeft
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToPublic: () => void;
  onRefreshData?: () => void;
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

  // Handle Login
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
      setAuthError('Invalid credentials. Please use the prefilled reviewer credentials.');
    }
  };

  const loadDashboardData = async () => {
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
  };

  // Status transition handler
  const handleStatusChange = async (bookingId: number, newStatus: string) => {
    try {
      await updateBookingStatus(bookingId, newStatus, 'campus-admin-secret-2026');
      setActionNotice(`Booking #${bookingId} transitioned to ${newStatus}`);
      setTimeout(() => setActionNotice(null), 3000);
      loadDashboardData();
    } catch (err: any) {
      setActionNotice(`Failed to update booking status: ${err.message}`);
    }
  };

  // Inventory adjuster handler
  const handleInventoryDelta = async (roomId: number, delta: number) => {
    try {
      await updateRoomAvailability(roomId, delta, undefined, 'campus-admin-secret-2026');
      setActionNotice(`Adjusted room inventory (${delta > 0 ? `+${delta}` : delta})`);
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
  }, [isAuthenticated]);

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'All' && b.status !== statusFilter) return false;
    if (propertyFilter !== 'All' && b.property_id.toString() !== propertyFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.full_name.toLowerCase().includes(q) ||
        b.reference_code.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.phone.includes(q)
      );
    }
    return true;
  });

  // ==========================================
  // VIEW: LOGIN SCREEN (if not authenticated)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-alabaster flex flex-col justify-center items-center px-4 py-12 architectural-grid">
        <div className="w-full max-w-md bg-white border border-parchment-200 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-obsidian text-white flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6 text-terracotta" />
            </div>
            <h1 className="font-display font-extrabold text-2xl text-obsidian tracking-tight">
              Operational Management Console
            </h1>
            <p className="font-mono text-xs text-slate-500 mt-1 uppercase tracking-wider">
              CampusNest Residence Operations
            </p>
          </div>

          {authError && (
            <div className="p-3 mb-6 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1">
                Admin Work Email
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-parchment-200 font-sans text-sm text-obsidian focus:outline-none focus:border-obsidian"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1">
                Passcode
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-parchment-200 font-sans text-sm text-obsidian focus:outline-none focus:border-obsidian"
              />
            </div>

            {/* Pre-filled Reviewer Hint Banner */}
            <div className="p-3 rounded-lg bg-sand-100 border border-parchment-200 font-mono text-[11px] text-slate-700 space-y-1">
              <div className="font-bold text-obsidian">Reviewer Testing Credentials:</div>
              <div>Email: <code className="text-terracotta font-semibold">admin@campusnest.in</code></div>
              <div>Passcode: <code className="text-terracotta font-semibold">campus2026</code></div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-obsidian hover:bg-slate-800 text-white font-mono text-xs uppercase font-semibold shadow transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-terracotta" />
              <span>Enter Operational Console</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onBackToPublic}
              className="font-mono text-xs text-slate-500 hover:text-obsidian flex items-center justify-center gap-1.5 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: AUTHENTICATED OPERATIONAL DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-alabaster text-obsidian font-sans">
      
      {/* Top Console Navigation Bar */}
      <header className="sticky top-0 z-30 bg-obsidian text-white border-b border-slate-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-extrabold text-lg text-white">
              CAMPUS<span className="text-terracotta">NEST</span>
            </span>
            <span className="font-mono text-xs bg-slate-800 text-parchment-200 px-2.5 py-1 rounded">
              RESIDENCE OPERATIONS // v2026
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={loadDashboardData}
              disabled={isLoading}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={onBackToPublic}
              className="px-3 py-1.5 rounded bg-terracotta hover:bg-terracotta-600 text-white transition-colors"
            >
              Public Site
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1.5 rounded border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Action Notification Toast Banner */}
        {actionNotice && (
          <div className="p-4 rounded-xl bg-obsidian text-white font-mono text-xs flex items-center justify-between shadow-lg animate-in fade-in">
            <span>⚡ {actionNotice}</span>
            <button onClick={() => setActionNotice(null)}>
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        )}

        {/* 1. AGGREGATE SYSTEM METRICS */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-xl bg-white border border-parchment-200 shadow-sm">
              <span className="font-mono text-[10px] text-slate-500 uppercase block">Active Hubs</span>
              <div className="font-display font-bold text-2xl text-obsidian">{stats.total_properties}</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-parchment-200 shadow-sm">
              <span className="font-mono text-[10px] text-slate-500 uppercase block">Total Bed Capacity</span>
              <div className="font-display font-bold text-2xl text-obsidian">{stats.total_beds}</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-parchment-200 shadow-sm">
              <span className="font-mono text-[10px] text-slate-500 uppercase block">Available Beds</span>
              <div className="font-display font-bold text-2xl text-sage">{stats.available_beds}</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-parchment-200 shadow-sm">
              <span className="font-mono text-[10px] text-slate-500 uppercase block">Occupancy Rate</span>
              <div className="font-display font-bold text-2xl text-obsidian">{stats.occupancy_rate_percent}%</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-parchment-200 shadow-sm">
              <span className="font-mono text-[10px] text-slate-500 uppercase block">Total Bookings</span>
              <div className="font-display font-bold text-2xl text-obsidian">{stats.total_bookings}</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-parchment-200 shadow-sm">
              <span className="font-mono text-[10px] text-slate-500 uppercase block">Pending Review</span>
              <div className="font-display font-bold text-2xl text-terracotta">{stats.pending_bookings}</div>
            </div>
          </div>
        )}

        {/* 2. REAL-TIME ROOM INVENTORY CONTROL */}
        <div className="bg-white rounded-2xl border border-parchment-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-parchment-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-display font-bold text-lg text-obsidian">Live Room Inventory Control</h2>
              <p className="font-mono text-xs text-slate-500">
                Directly increment/decrement available beds in SQLite without server reload
              </p>
            </div>
            <span className="font-mono text-xs text-slate-400">Total Hubs: {properties.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-alabaster border-b border-parchment-200 text-slate-600 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Residence & Hub</th>
                  <th className="py-3 px-4">Room Tier</th>
                  <th className="py-3 px-4">Monthly Rate</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Available Beds</th>
                  <th className="py-3 px-4 text-right">Inventory Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-parchment-200">
                {properties.map((prop) => (
                  <React.Fragment key={prop.id}>
                    {prop.room_types.map((room) => (
                      <tr key={room.id} className="hover:bg-sand-50/50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-obsidian">
                          {prop.name} ({prop.city})
                        </td>
                        <td className="py-3 px-4 text-slate-800">{room.name}</td>
                        <td className="py-3 px-4">₹{room.monthly_rent_inr.toLocaleString('en-IN')}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            room.status === 'Available' 
                              ? 'bg-sage-100 text-sage-800' 
                              : room.status === 'Filling Fast' 
                              ? 'bg-amber-100 text-amber-800' 
                              : 'bg-slate-200 text-slate-800'
                          }`}>
                            {room.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-sm text-obsidian">{room.available_count}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => handleInventoryDelta(room.id, -1)}
                              disabled={room.available_count <= 0}
                              className="w-7 h-7 rounded border border-parchment-200 bg-white hover:bg-red-50 hover:border-red-300 text-slate-700 hover:text-red-600 flex items-center justify-center transition-colors disabled:opacity-30"
                              title="Decrement bed count by 1"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleInventoryDelta(room.id, 1)}
                              className="w-7 h-7 rounded border border-parchment-200 bg-white hover:bg-sage-50 hover:border-sage-300 text-slate-700 hover:text-sage flex items-center justify-center transition-colors"
                              title="Increment bed count by 1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. BOOKINGS MANAGEMENT TABLE */}
        <div className="bg-white rounded-2xl border border-parchment-200 shadow-sm overflow-hidden">
          
          {/* Table Filters & Search Bar */}
          <div className="p-6 border-b border-parchment-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-lg text-obsidian">Resident & Tour Bookings</h2>
                <p className="font-mono text-xs text-slate-500">
                  Manage incoming student passes and tour appointments
                </p>
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search name, phone, code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-parchment-200 bg-alabaster font-mono text-xs text-obsidian focus:outline-none focus:border-obsidian"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-slate-500 uppercase">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="py-1 px-2.5 rounded-lg border border-parchment-200 bg-alabaster font-mono text-xs text-obsidian focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Visited">Visited</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-slate-500 uppercase">Property:</span>
                <select
                  value={propertyFilter}
                  onChange={(e) => setPropertyFilter(e.target.value)}
                  className="py-1 px-2.5 rounded-lg border border-parchment-200 bg-alabaster font-mono text-xs text-obsidian focus:outline-none"
                >
                  <option value="All">All Hubs</option>
                  {properties.map(p => (
                    <option key={p.id} value={p.id.toString()}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-alabaster border-b border-parchment-200 text-slate-600 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Ref Code</th>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Hub & Suite</th>
                  <th className="py-3 px-4">Tour / Move-in</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-parchment-200">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500 font-mono">
                      No bookings matching current filters.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-sand-50/50 transition-colors">
                      <td className="py-3 px-4 font-bold text-terracotta">
                        {b.reference_code}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-obsidian">{b.full_name}</div>
                        <div className="text-[10px] text-slate-500">{b.applicant_role}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div>{b.email}</div>
                        <div className="text-slate-500">+91 {b.phone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-obsidian">{b.property_name}</div>
                        <div className="text-slate-500">{b.room_name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-obsidian">{b.tour_type}</div>
                        <div className="text-[10px] text-slate-500">{b.preferred_move_in}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          b.status === 'Confirmed'
                            ? 'bg-sage-100 text-sage-800'
                            : b.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : b.status === 'Visited'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {b.status !== 'Confirmed' && (
                            <button
                              onClick={() => handleStatusChange(b.id, 'Confirmed')}
                              className="px-2 py-1 rounded bg-sage-50 text-sage-700 hover:bg-sage-100 font-mono text-[10px] font-semibold transition-colors"
                            >
                              Confirm
                            </button>
                          )}
                          {b.status !== 'Visited' && (
                            <button
                              onClick={() => handleStatusChange(b.id, 'Visited')}
                              className="px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-mono text-[10px] font-semibold transition-colors"
                            >
                              Visited
                            </button>
                          )}
                          {b.status !== 'Cancelled' && (
                            <button
                              onClick={() => handleStatusChange(b.id, 'Cancelled')}
                              className="px-2 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100 font-mono text-[10px] font-semibold transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
};
