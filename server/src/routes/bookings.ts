import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../db/connection.js';
import { validateBody } from '../middleware/validate.js';
import { adminAuth } from '../middleware/adminAuth.js';

export const bookingsRouter = Router();

// Zod Schema for Booking / Agent Callback Creation
export const createBookingSchema = z.object({
  property_id: z.number().int().positive({ message: 'Valid property selection is required' }),
  room_type_id: z.number().int().positive({ message: 'Valid room tier selection is required' }),
  full_name: z.string().trim().min(2, { message: 'Full name must be at least 2 characters' }).max(80),
  email: z.string().trim().email({ message: 'Valid email address is required' }),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, { message: 'Valid 10-digit Indian phone number required (e.g. 9845123456)' }),
  applicant_role: z.enum(['Student', 'Guardian', 'Other'], {
    errorMap: () => ({ message: 'Applicant role must be Student, Guardian, or Other' })
  }),
  tour_type: z.enum(['On-Site', 'Virtual', 'Agent Callback'], {
    errorMap: () => ({ message: 'Request type must be On-Site, Virtual, or Agent Callback' })
  }),
  preferred_move_in: z.string().min(1, { message: 'Preferred move-in date is required' }),
  notes: z.string().max(500).optional()
});

// Zod Schema for Updating Agent Lead Workflow Status
export const updateBookingStatusSchema = z.object({
  status: z.enum(['New Lead', 'Contacted Owner', 'Tour Scheduled', 'Confirmed', 'Cancelled'], {
    errorMap: () => ({
      message: 'Status must be New Lead, Contacted Owner, Tour Scheduled, Confirmed, or Cancelled'
    })
  })
});

// Helper to generate reference code CN-2026-XXXX
function generateReferenceCode(): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CN-2026-${rand}`;
}

// POST /api/bookings - Create new agent-mediated booking or callback pass
bookingsRouter.post('/', validateBody(createBookingSchema), (req: Request, res: Response): void => {
  try {
    const {
      property_id,
      room_type_id,
      full_name,
      email,
      phone,
      applicant_role,
      tour_type,
      preferred_move_in,
      notes
    } = req.body;

    // Verify property exists
    const property = db
      .prepare('SELECT id, name, city, category, distance_km, travel_time, address, phone FROM properties WHERE id = ?')
      .get(property_id) as any;
    if (!property) {
      res.status(404).json({ error: 'Selected property does not exist' });
      return;
    }

    // Verify room type exists and belongs to property
    const roomType = db
      .prepare('SELECT id, name, available_count, monthly_rent_inr FROM room_types WHERE id = ? AND property_id = ?')
      .get(room_type_id, property_id) as any;
    if (!roomType) {
      res.status(404).json({ error: 'Selected room tier does not exist for this property' });
      return;
    }

    // Generate unique reference code
    let referenceCode = generateReferenceCode();
    let collisionCheck = db.prepare('SELECT id FROM bookings WHERE reference_code = ?').get(referenceCode);
    while (collisionCheck) {
      referenceCode = generateReferenceCode();
      collisionCheck = db.prepare('SELECT id FROM bookings WHERE reference_code = ?').get(referenceCode);
    }

    const createdAt = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const insertStmt = db.prepare(`
      INSERT INTO bookings (
        reference_code, property_id, room_type_id, full_name, email, phone,
        applicant_role, tour_type, preferred_move_in, notes, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New Lead', ?)
    `);

    const result = insertStmt.run(
      referenceCode,
      property_id,
      room_type_id,
      full_name,
      email,
      phone,
      applicant_role,
      tour_type,
      preferred_move_in,
      notes || '',
      createdAt
    );

    const bookingId = Number(result.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: 'Agent-mediated reservation pass generated successfully',
      booking: {
        id: bookingId,
        reference_code: referenceCode,
        property_id,
        property_name: property.name,
        property_city: property.city,
        property_category: property.category,
        property_distance_km: Number(property.distance_km),
        property_travel_time: property.travel_time,
        property_address: property.address,
        property_phone: property.phone ?? null,
        room_type_id,
        room_name: roomType.name,
        monthly_rent_inr: Number(roomType.monthly_rent_inr),
        full_name,
        email,
        phone,
        applicant_role,
        tour_type,
        preferred_move_in,
        notes: notes || '',
        status: 'New Lead',
        created_at: createdAt
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create booking', message: error.message });
  }
});

// GET /api/bookings - List bookings with owner contact details for Agent Operations
bookingsRouter.get('/', adminAuth, (req: Request, res: Response) => {
  try {
    const { status, property_id } = req.query;

    let query = `
      SELECT 
        b.id,
        b.reference_code,
        b.property_id,
        p.name AS property_name,
        p.city AS property_city,
        p.category AS property_category,
        p.distance_km AS property_distance_km,
        p.travel_time AS property_travel_time,
        p.address AS property_address,
        p.phone AS property_phone,
        b.room_type_id,
        r.name AS room_name,
        r.monthly_rent_inr,
        b.full_name,
        b.email,
        b.phone,
        b.applicant_role,
        b.tour_type,
        b.preferred_move_in,
        b.notes,
        b.status,
        b.created_at
      FROM bookings b
      LEFT JOIN properties p ON b.property_id = p.id
      LEFT JOIN room_types r ON b.room_type_id = r.id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (status && typeof status === 'string') {
      query += ' AND b.status = ?';
      params.push(status);
    }

    if (property_id) {
      query += ' AND b.property_id = ?';
      params.push(Number(property_id));
    }

    query += ' ORDER BY b.id DESC';

    const rawBookings = db.prepare(query).all(...params) as any[];

    const bookings = rawBookings.map(b => ({
      id: Number(b.id),
      reference_code: b.reference_code,
      property_id: Number(b.property_id),
      property_name: b.property_name,
      property_city: b.property_city,
      property_category: b.property_category,
      property_distance_km: Number(b.property_distance_km ?? 0),
      property_travel_time: b.property_travel_time,
      property_address: b.property_address,
      property_phone: b.property_phone ?? null,
      room_type_id: Number(b.room_type_id),
      room_name: b.room_name,
      monthly_rent_inr: Number(b.monthly_rent_inr),
      full_name: b.full_name,
      email: b.email,
      phone: b.phone,
      applicant_role: b.applicant_role,
      tour_type: b.tour_type,
      preferred_move_in: b.preferred_move_in,
      notes: b.notes,
      status: b.status,
      created_at: b.created_at
    }));

    res.json({ bookings });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve bookings', message: error.message });
  }
});

// PATCH /api/bookings/:id/status - Update agent lead status
bookingsRouter.patch('/:id/status', adminAuth, validateBody(updateBookingStatusSchema), (req: Request, res: Response): void => {
  try {
    const bookingId = Number(req.params.id);
    const { status } = req.body;

    const existing = db.prepare('SELECT id FROM bookings WHERE id = ?').get(bookingId);
    if (!existing) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, bookingId);

    res.json({
      success: true,
      booking_id: bookingId,
      status
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update booking status', message: error.message });
  }
});
