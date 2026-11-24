import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../db/connection.js';
import { validateBody } from '../middleware/validate.js';

export const communityRouter = Router();

const newsletterSchema = z.object({
  email: z.string().trim().email({ message: 'Valid email address is required' })
});

// GET /api/events - Retrieve campus community events schedule
communityRouter.get('/events', (req: Request, res: Response) => {
  try {
    const rawEvents = db.prepare('SELECT * FROM events ORDER BY id ASC').all() as any[];
    const events = rawEvents.map(e => ({
      id: Number(e.id),
      title: e.title,
      category: e.category,
      property_name: e.property_name,
      event_date: e.event_date,
      spots_remaining: Number(e.spots_remaining)
    }));

    res.json({ events });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve events', message: error.message });
  }
});

// POST /api/newsletter - Register email for admission alerts
communityRouter.post('/newsletter', validateBody(newsletterSchema), (req: Request, res: Response): void => {
  try {
    const { email } = req.body;

    db.prepare('INSERT OR IGNORE INTO subscribers (email) VALUES (?)').run(email.toLowerCase());

    res.status(201).json({
      success: true,
      message: 'Subscribed to CampusNest admission alerts successfully',
      email
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to subscribe', message: error.message });
  }
});

// GET /api/stats - Aggregate operational statistics
communityRouter.get('/stats', (req: Request, res: Response) => {
  try {
    const propStats = db.prepare(`
      SELECT 
        COUNT(*) as total_properties,
        SUM(total_beds) as total_beds,
        SUM(available_beds) as available_beds
      FROM properties
    `).get() as any;

    const bookingStats = db.prepare(`
      SELECT 
        COUNT(*) as total_bookings,
        SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending_bookings,
        SUM(CASE WHEN status = 'Confirmed' THEN 1 ELSE 0 END) as confirmed_bookings
      FROM bookings
    `).get() as any;

    const totalProperties = Number(propStats?.total_properties ?? 0);
    const totalBeds = Number(propStats?.total_beds ?? 0);
    const availableBeds = Number(propStats?.available_beds ?? 0);
    const occupiedBeds = Math.max(0, totalBeds - availableBeds);
    const occupancyRate = totalBeds > 0 ? Number(((occupiedBeds / totalBeds) * 100).toFixed(1)) : 0;

    res.json({
      total_properties: totalProperties,
      total_beds: totalBeds,
      available_beds: availableBeds,
      occupied_beds: occupiedBeds,
      occupancy_rate_percent: occupancyRate,
      total_bookings: Number(bookingStats?.total_bookings ?? 0),
      pending_bookings: Number(bookingStats?.pending_bookings ?? 0),
      confirmed_bookings: Number(bookingStats?.confirmed_bookings ?? 0)
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve stats', message: error.message });
  }
});
