import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../db/connection.js';
import { validateBody } from '../middleware/validate.js';
import { adminAuth } from '../middleware/adminAuth.js';

export const propertiesRouter = Router();

// Schema for updating room availability
const updateRoomAvailabilitySchema = z.object({
  delta: z.number().int().min(-50).max(50).optional(),
  available_count: z.number().int().min(0).max(500).optional(),
}).refine(data => data.delta !== undefined || data.available_count !== undefined, {
  message: 'Either delta or available_count must be provided',
});

// Helper to format property row
function formatProperty(prop: any, rooms: any[]) {
  return {
    id: Number(prop.id),
    slug: prop.slug,
    name: prop.name,
    category: prop.category,
    city: prop.city,
    neighborhood: prop.neighborhood,
    distance_km: Number(prop.distance_km),
    travel_time: prop.travel_time,
    distance_to_campus: prop.distance_to_campus,
    address: prop.address,
    phone: prop.phone ?? null,
    tagline: prop.tagline,
    description: prop.description,
    starting_rent_inr: Number(prop.starting_rent_inr),
    total_beds: Number(prop.total_beds),
    available_beds: Number(prop.available_beds),
    accent_theme: prop.accent_theme,
    amenities: typeof prop.amenities_json === 'string' ? JSON.parse(prop.amenities_json) : prop.amenities_json,
    highlights: typeof prop.highlights_json === 'string' ? JSON.parse(prop.highlights_json) : prop.highlights_json,
    room_types: rooms.map(room => ({
      id: Number(room.id),
      property_id: Number(room.property_id),
      name: room.name,
      area_sqft: Number(room.area_sqft),
      monthly_rent_inr: Number(room.monthly_rent_inr),
      deposit_inr: Number(room.deposit_inr),
      available_count: Number(room.available_count),
      status: room.status,
      features: typeof room.features_json === 'string' ? JSON.parse(room.features_json) : room.features_json,
      floorplan_variant: room.floorplan_variant
    }))
  };
}

// GET /api/properties - Get all properties ordered by distance from MITE
propertiesRouter.get('/', (req: Request, res: Response) => {
  try {
    const rawProperties = db.prepare('SELECT * FROM properties ORDER BY distance_km ASC, id ASC').all() as any[];
    const rawRooms = db.prepare('SELECT * FROM room_types ORDER BY monthly_rent_inr ASC').all() as any[];

    const properties = rawProperties.map(prop => {
      const propRooms = rawRooms.filter(r => Number(r.property_id) === Number(prop.id));
      return formatProperty(prop, propRooms);
    });

    res.json({ properties });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve properties', message: error.message });
  }
});

// GET /api/properties/:slug - Get single property with room types
propertiesRouter.get('/:slug', (req: Request, res: Response): void => {
  try {
    const prop = db.prepare('SELECT * FROM properties WHERE slug = ?').get(req.params.slug) as any;
    if (!prop) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }

    const rooms = db.prepare('SELECT * FROM room_types WHERE property_id = ? ORDER BY monthly_rent_inr ASC').all(prop.id) as any[];
    res.json({ property: formatProperty(prop, rooms) });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve property', message: error.message });
  }
});

// PATCH /api/properties/rooms/:id/availability - Update room bed availability (Admin protected)
propertiesRouter.patch('/rooms/:id/availability', adminAuth, validateBody(updateRoomAvailabilitySchema), (req: Request, res: Response): void => {
  try {
    const roomId = Number(req.params.id);
    const room = db.prepare('SELECT * FROM room_types WHERE id = ?').get(roomId) as any;

    if (!room) {
      res.status(404).json({ error: 'Room type not found' });
      return;
    }

    let newCount = Number(room.available_count);
    if (req.body.delta !== undefined) {
      newCount = Math.max(0, newCount + req.body.delta);
    } else if (req.body.available_count !== undefined) {
      newCount = Math.max(0, req.body.available_count);
    }

    // Determine status badge
    let newStatus = 'Available';
    if (newCount === 0) {
      newStatus = 'Waitlist';
    } else if (newCount <= 3) {
      newStatus = 'Filling Fast';
    }

    db.exec('BEGIN TRANSACTION;');
    try {
      db.prepare('UPDATE room_types SET available_count = ?, status = ? WHERE id = ?').run(newCount, newStatus, roomId);

      // Recalculate property's available_beds
      const sumRow = db.prepare('SELECT SUM(available_count) as total FROM room_types WHERE property_id = ?').get(room.property_id) as any;
      const propAvailableBeds = Number(sumRow?.total ?? 0);

      db.prepare('UPDATE properties SET available_beds = ? WHERE id = ?').run(propAvailableBeds, room.property_id);
      db.exec('COMMIT;');

      res.json({
        success: true,
        room: {
          id: roomId,
          property_id: Number(room.property_id),
          name: room.name,
          available_count: newCount,
          status: newStatus
        },
        property_available_beds: propAvailableBeds
      });
    } catch (txErr) {
      db.exec('ROLLBACK;');
      throw txErr;
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update room availability', message: error.message });
  }
});
