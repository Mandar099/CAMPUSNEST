import { db, initDatabase } from './connection.js';

interface RealPropertySeed {
  slug: string;
  name: string;
  category: string;
  city: string;
  neighborhood: string;
  distance_km: number;
  travel_time: string;
  address: string;
  phone: string | null;
  tagline: string;
  description: string;
  accent_theme: 'emerald' | 'ocean' | 'terracotta' | 'obsidian';
  amenities: string[];
  highlights: string[];
  rooms: Array<{
    name: string;
    area_sqft: number;
    monthly_rent_inr: number;
    deposit_inr: number;
    available_count: number;
    features: string[];
    floorplan_variant: string;
  }>;
}

const REAL_MITE_DIRECTORY: RealPropertySeed[] = [
  {
    slug: 'mite-boys-hostel',
    name: "MITE Boy's Hostel",
    category: 'On-Campus Hostel (Boys)',
    city: 'Moodbidri',
    neighborhood: 'Badagumijaru · MITE Campus',
    distance_km: 0.35,
    travel_time: '1 min',
    address: '3X27+RVF, Badagumijaru, Karnataka 574225',
    phone: '082582 62695',
    tagline: 'Inside MITE Academic Grounds — 1 Min Walk to Classrooms',
    description:
      'Official on-campus boys residence inside Badagumijaru campus with round-the-clock warden supervision, high-speed campus fiber, and mess dining hall.',
    accent_theme: 'emerald',
    amenities: ['Campus Fiber Wi-Fi', 'On-Campus Mess', '24/7 Security Gate', 'Generator Backup', 'Reading Hall'],
    highlights: ['350m walk to MITE main block', 'Warden-supervised discipline', 'Zero commute time'],
    rooms: [
      {
        name: 'Twin Sharing Academic Room',
        area_sqft: 210,
        monthly_rent_inr: 6800,
        deposit_inr: 15000,
        available_count: 6,
        features: ['Study Desks & Chairs', 'Attached Bath', 'Campus Wi-Fi', '4-Meal Mess Included'],
        floorplan_variant: 'twin_pod'
      },
      {
        name: 'Triple Engineering Pod',
        area_sqft: 260,
        monthly_rent_inr: 5600,
        deposit_inr: 12000,
        available_count: 8,
        features: ['3 Study Stations', 'Individual Lockers', 'Common Balcony', 'Mess Included'],
        floorplan_variant: 'triple_loft'
      }
    ]
  },
  {
    slug: 'mite-girls-hostel',
    name: "MITE Girl's Hostel",
    category: 'On-Campus Hostel (Girls)',
    city: 'Moodbidri',
    neighborhood: 'Badagumijaru · MITE Campus',
    distance_km: 0.35,
    travel_time: '2 mins',
    address: '3X28+X5F, Badagumijaru, Karnataka 574225',
    phone: '082582 62695',
    tagline: 'Secure On-Campus Girls Residence with 24/7 Warden & Medical Support',
    description:
      'Protected on-campus girls hostel within MITE Badagumijaru premises featuring biometric entry, dedicated lady wardens, study lounges, and full dining facility.',
    accent_theme: 'terracotta',
    amenities: ['Biometric Entry', 'Lady Warden 24/7', 'Campus Fiber Wi-Fi', 'Hygienic Mess', 'Hot Water Solar'],
    highlights: ['2 min walk inside MITE campus', 'CCTV monitored perimeter', 'Parent visitor lounge'],
    rooms: [
      {
        name: 'Twin En-Suite Room',
        area_sqft: 215,
        monthly_rent_inr: 7000,
        deposit_inr: 15000,
        available_count: 5,
        features: ['Attached Washroom', 'Ergonomic Study Tables', '24/7 Solar Hot Water', 'Mess Included'],
        floorplan_variant: 'twin_pod'
      },
      {
        name: 'Triple Comfort Suite',
        area_sqft: 270,
        monthly_rent_inr: 5800,
        deposit_inr: 12000,
        available_count: 7,
        features: ['3 Wardrobes', 'Study Lamps', 'High-Speed Wi-Fi', '4-Meal Mess Included'],
        floorplan_variant: 'triple_loft'
      }
    ]
  },
  {
    slug: 'daya-pg-for-boys',
    name: 'DAYA PG (FOR BOYS)',
    category: 'Boys PG',
    city: 'Moodbidri',
    neighborhood: 'Todaru · MITE Highway Corridor',
    distance_km: 1.4,
    travel_time: '3 mins',
    address: 'Todaru, Karnataka 574225',
    phone: '099013 25685',
    tagline: 'Nearest Off-Campus Boys PG in Todaru — 3 Mins from MITE',
    description:
      'Popular off-campus boys PG located in peaceful Todaru just 1.4 km from MITE gates. Combines home-style coastal meals with flexible hostel freedom.',
    accent_theme: 'obsidian',
    amenities: ['Homestyle Meals', 'Two-Wheeler Parking', 'Wi-Fi Broadband', 'Power Backup', 'Laundry Space'],
    highlights: ['Closest private boys PG to MITE (1.4 km)', '3 min ride on NH-169', 'Quiet study atmosphere'],
    rooms: [
      {
        name: 'Single Private Room',
        area_sqft: 165,
        monthly_rent_inr: 8200,
        deposit_inr: 15000,
        available_count: 2,
        features: ['Single Bed & Mattress', 'Private Study Desk', 'Attached Bathroom', '3 Meals Daily'],
        floorplan_variant: 'solo_studio'
      },
      {
        name: 'Twin Sharing Boys Room',
        area_sqft: 220,
        monthly_rent_inr: 6200,
        deposit_inr: 10000,
        available_count: 5,
        features: ['2 Single Cots', 'Study Table', 'Cupboard Storage', '3 Meals Daily'],
        floorplan_variant: 'twin_pod'
      }
    ]
  },
  {
    slug: 'shama-ladies-pg',
    name: 'Shama ladies PG',
    category: 'Ladies PG',
    city: 'Moodbidri',
    neighborhood: 'Rathnakaravarni Nagara · Near Ballal Hotel',
    distance_km: 3.7,
    travel_time: '8 mins',
    address: 'Near Ballal Hotel, Rathnakaravarni Nagara, Moodbidri, Karnataka 574227',
    phone: '094489 09575',
    tagline: 'Trusted Ladies PG in Rathnakaravarni Nagara with Home-Cooked Food',
    description:
      'Well-maintained ladies accommodation near Ballal Hotel in central Moodbidri, offering safe gated access, easy bus-route connectivity to MITE, and fresh meals.',
    accent_theme: 'terracotta',
    amenities: ['CCTV Security', 'Home-Cooked Food', 'Drinking Water RO', 'Wi-Fi Access', 'Bus Stop 2 Min'],
    highlights: ['Near Ballal Hotel landmark', 'Frequent college buses to MITE', 'Lady caretaker on site'],
    rooms: [
      {
        name: 'Twin Sharing Ladies Room',
        area_sqft: 210,
        monthly_rent_inr: 6500,
        deposit_inr: 10000,
        available_count: 4,
        features: ['Attached Bath', 'Wardrobes', 'Study Desk', 'Home Food Included'],
        floorplan_variant: 'twin_pod'
      },
      {
        name: 'Triple Sharing Ladies Room',
        area_sqft: 260,
        monthly_rent_inr: 5500,
        deposit_inr: 8000,
        available_count: 5,
        features: ['Spacious Ventilation', '3 Study Spots', 'Wi-Fi', 'Home Food Included'],
        floorplan_variant: 'triple_loft'
      }
    ]
  },
  {
    slug: 'new-royal-pg',
    name: 'New royal pg',
    category: 'Boys PG',
    city: 'Moodbidri',
    neighborhood: 'Masthikate Road · Moodbidri',
    distance_km: 3.9,
    travel_time: '8 mins',
    address: 'Masthikate road, Moodbidri, Karnataka 574227',
    phone: '073381 75375',
    tagline: 'Modern Boys PG on Masthikate Road with Direct MITE Transit Access',
    description:
      'Conveniently situated on Masthikate Road with quick access to gyms, cafes, and MITE college buses. Clean tiled rooms with dedicated high-speed Wi-Fi.',
    accent_theme: 'ocean',
    amenities: ['High-Speed Wi-Fi', 'Bike Parking', 'Hot Water Geyser', 'Daily Housekeeping', 'RO Water'],
    highlights: ['Prime Masthikate Road access', '8 mins commute to MITE', 'Flexible meal plans'],
    rooms: [
      {
        name: 'Executive Single Pod',
        area_sqft: 170,
        monthly_rent_inr: 8500,
        deposit_inr: 15000,
        available_count: 2,
        features: ['Private Room', 'Study Desk', 'Attached Bath', 'Wi-Fi & Cleaning'],
        floorplan_variant: 'solo_studio'
      },
      {
        name: 'Twin Sharing Standard',
        area_sqft: 225,
        monthly_rent_inr: 6000,
        deposit_inr: 10000,
        available_count: 6,
        features: ['Twin Beds', 'Separate Lockers', 'Balcony Access', 'Wi-Fi & Cleaning'],
        floorplan_variant: 'twin_pod'
      }
    ]
  },
  {
    slug: 'masthikatte-boys-hostel',
    name: "Masthikatte Boy's Hostel",
    category: 'Boys Hostel',
    city: 'Moodbidri',
    neighborhood: 'Nelligudde Rd · Masthikatte',
    distance_km: 3.9,
    travel_time: '8 mins',
    address: '3X5R+726, Nelligudde Rd, near Nishmitha Travels Maintenance Unit, Moodbidri, Karnataka 574227',
    phone: null,
    tagline: 'Verified Agent-Managed Boys Hostel off Nelligudde Road',
    description:
      'Quiet residential boys hostel near Nishmitha Travels on Nelligudde Road. Verified directly by CampusNest field agents for clean rooms and reliable student stays.',
    accent_theme: 'emerald',
    amenities: ['Agent Verified', 'Two-Wheeler Parking', 'Study Tables', 'Filtered Water', '24/7 Electricity'],
    highlights: ['Book & tour exclusively via CampusNest Agent', 'Quiet off-road lane', '8 mins from MITE'],
    rooms: [
      {
        name: 'Twin Hostel Room',
        area_sqft: 215,
        monthly_rent_inr: 5800,
        deposit_inr: 10000,
        available_count: 4,
        features: ['Twin Beds', 'Study Table', 'Attached Washroom', 'Agent Negotiated Rate'],
        floorplan_variant: 'twin_pod'
      },
      {
        name: 'Triple Student Dorm',
        area_sqft: 270,
        monthly_rent_inr: 4900,
        deposit_inr: 8000,
        available_count: 6,
        features: ['3 Cots', 'Lockers', 'Ceiling Fans', 'Wi-Fi Ready'],
        floorplan_variant: 'triple_loft'
      }
    ]
  },
  {
    slug: 'rb-lodge-and-pg',
    name: 'R.B LODGE AND PG',
    category: 'Lodge & PG',
    city: 'Moodbidri',
    neighborhood: 'Moodbidri Town Center',
    distance_km: 4.4,
    travel_time: '10 mins',
    address: '3X9V+8C6, Moodbidri, Karnataka 574227',
    phone: '098805 99424',
    tagline: 'Private Room Flexibility & Long-Stay Student PG in Town Center',
    description:
      'Ideal for MITE students or visiting parents seeking lodge-grade maintenance with monthly PG affordability right inside Moodbidri town.',
    accent_theme: 'obsidian',
    amenities: ['Private Rooms Available', '24/7 Reception', 'Hot Water', 'Parking Space', 'Town Connectivity'],
    highlights: ['Great for solo rooms & short-notice stays', '10 min drive to MITE', 'Close to pharmacies & eateries'],
    rooms: [
      {
        name: 'Solo Lodge-Grade PG Room',
        area_sqft: 195,
        monthly_rent_inr: 9200,
        deposit_inr: 15000,
        available_count: 3,
        features: ['Private Ensuite', 'TV & Study Table', 'Daily Room Care', 'No Curfew Restrictions'],
        floorplan_variant: 'solo_studio'
      },
      {
        name: 'Double Sharing PG Suite',
        area_sqft: 240,
        monthly_rent_inr: 6800,
        deposit_inr: 12000,
        available_count: 4,
        features: ['2 Beds', 'Attached Bath', 'Balcony Option', 'Wi-Fi Included'],
        floorplan_variant: 'balcony_loft'
      }
    ]
  },
  {
    slug: 'shalimar-boys-hostel',
    name: 'Shalimar Boys Hostel',
    category: 'Boys Hostel',
    city: 'Moodbidri',
    neighborhood: 'Moodabidri Central',
    distance_km: 4.5,
    travel_time: '10 mins',
    address: '6, Moodabidri, Moodbidri, Karnataka 574227',
    phone: '096111 59622',
    tagline: 'Established Moodbidri Boys Hostel with Spacious Rooms',
    description:
      'Long-standing student hostel in central Moodbidri known among MITE seniors for spacious corridors, reliable water supply, and easy access to town bus stops.',
    accent_theme: 'ocean',
    amenities: ['Senior Student Community', 'Bike Parking', 'Broadband Wi-Fi', '24/7 Water', 'Common Study Area'],
    highlights: ['10 mins from MITE via town shuttle', 'Budget-friendly deposits', 'Walkable to central market'],
    rooms: [
      {
        name: 'Twin Sharing Hostel Room',
        area_sqft: 220,
        monthly_rent_inr: 5700,
        deposit_inr: 10000,
        available_count: 5,
        features: ['2 Cots', 'Individual Tables', 'Shared Attached Bath', 'Wi-Fi Access'],
        floorplan_variant: 'twin_pod'
      },
      {
        name: 'Quad Student Room',
        area_sqft: 320,
        monthly_rent_inr: 4800,
        deposit_inr: 8000,
        available_count: 4,
        features: ['4 Study Spaces', 'Wall Storage', 'Cross-Ventilation', 'Wi-Fi Access'],
        floorplan_variant: 'quad_suite'
      }
    ]
  },
  {
    slug: 'shri-brahmi-pg',
    name: 'Shri Brahmi PG',
    category: 'PG',
    city: 'Moodbidri',
    neighborhood: 'Prabhu Complex · Behind Bus Stand Road',
    distance_km: 4.7,
    travel_time: '11 mins',
    address: '2nd floor, Prabhu Complex, behind Bus Stand Road, Moodbidri, Karnataka 574227',
    phone: '096863 72192',
    tagline: 'Steps from Moodbidri Main Bus Stand — Easy MITE Commute',
    description:
      'Located on the 2nd floor of Prabhu Complex right behind Bus Stand Road, giving students immediate access to express buses, stationery stores, and clinics.',
    accent_theme: 'terracotta',
    amenities: ['Bus Stand 1 Min Walk', 'CCTV Corridor', 'Clean Dining Area', 'Wi-Fi Broadband', 'Power Backup'],
    highlights: ['Behind Bus Stand Road', '11 mins to MITE campus', 'Commercial complex security'],
    rooms: [
      {
        name: 'Twin Sharing PG Unit',
        area_sqft: 200,
        monthly_rent_inr: 6300,
        deposit_inr: 10000,
        available_count: 3,
        features: ['2 Beds', 'Study Desk', 'Attached Washroom', 'Meals Option Available'],
        floorplan_variant: 'twin_pod'
      },
      {
        name: 'Triple Sharing PG Unit',
        area_sqft: 255,
        monthly_rent_inr: 5300,
        deposit_inr: 8000,
        available_count: 4,
        features: ['3 Cots', 'Lockers', 'Bright Windows', 'Wi-Fi Included'],
        floorplan_variant: 'triple_loft'
      }
    ]
  },
  {
    slug: 'samrudhi-ladies-pg-pure-veg',
    name: 'Samrudhi ladies pg (pure veg)',
    category: 'Ladies PG',
    city: 'Moodbidri',
    neighborhood: 'Ponnechari Road · Opp. Nature Ice Cream',
    distance_km: 5.2,
    travel_time: '12 mins',
    address: 'Ponnechari Road, opposite to Nature Ice Cream, Moodbidri, Karnataka 574227',
    phone: null,
    tagline: 'Pure Vegetarian Ladies PG on Ponnechari Road — Agent Verified',
    description:
      'Dedicated pure-vegetarian ladies PG opposite Nature Ice Cream on Ponnechari Road. Quiet, clean, and family-run—tours and room holds coordinated through CampusNest Agents.',
    accent_theme: 'emerald',
    amenities: ['100% Pure Veg Kitchen', 'Lady Warden', 'Safe Residential Street', 'RO Drinking Water', 'Wi-Fi'],
    highlights: ['Pure Vegetarian kitchen & utensils', 'Book tour via CampusNest Agent', 'Opposite Nature Ice Cream'],
    rooms: [
      {
        name: 'Twin Veg Ladies Room',
        area_sqft: 215,
        monthly_rent_inr: 6800,
        deposit_inr: 12000,
        available_count: 3,
        features: ['Pure Veg Home Meals', 'Attached Bath', 'Study Desk', 'Gated Entry'],
        floorplan_variant: 'twin_pod'
      },
      {
        name: 'Triple Veg Ladies Room',
        area_sqft: 270,
        monthly_rent_inr: 5600,
        deposit_inr: 10000,
        available_count: 4,
        features: ['Pure Veg Home Meals', '3 Wardrobes', 'Solar Hot Water', 'Agent Verified'],
        floorplan_variant: 'triple_loft'
      }
    ]
  },
  {
    slug: 'veena-pg-paying-guest',
    name: 'Veena PG (Paying Guest)',
    category: 'PG',
    city: 'Moodbidri',
    neighborhood: 'Hanumanth Nagar · Range Forest Office Rd',
    distance_km: 5.3,
    travel_time: '13 mins',
    address: '9-58 B, Range Forest Office Road, Hanumanth Nagar, Veena, Moodbidri, Karnataka 574227',
    phone: null,
    tagline: 'Serene Residential Paying Guest Stay in Hanumanth Nagar',
    description:
      'Peaceful family-style PG nestled on Range Forest Office Road in Hanumanth Nagar. Ideal for students preferring quiet neighborhood living, verified and scheduled by CampusNest Agents.',
    accent_theme: 'terracotta',
    amenities: ['Quiet Tree-Lined Zone', 'Homestyle Food', 'Study-Friendly Environment', 'Filtered Water', 'Wi-Fi'],
    highlights: ['Contact & book exclusively via CampusNest Agent', 'Calm Hanumanth Nagar locality', '13 mins to MITE'],
    rooms: [
      {
        name: 'Single Study Room',
        area_sqft: 175,
        monthly_rent_inr: 7800,
        deposit_inr: 12000,
        available_count: 2,
        features: ['Private Room', 'Quiet Window', 'Study Table', 'Home Meals'],
        floorplan_variant: 'solo_studio'
      },
      {
        name: 'Twin Sharing Residential Room',
        area_sqft: 225,
        monthly_rent_inr: 5900,
        deposit_inr: 10000,
        available_count: 4,
        features: ['Twin Beds', 'Cupboards', 'Attached Bath', 'Home Meals'],
        floorplan_variant: 'twin_pod'
      }
    ]
  }
];

export function seedDatabase() {
  initDatabase();

  const countRow = db.prepare('SELECT COUNT(*) as count FROM properties').get() as { count: number | bigint } | undefined;
  const count = Number(countRow?.count ?? 0);

  // Also verify if the first record matches MITE Boy's Hostel (ensures replacement if old prototype rows somehow persisted)
  const firstProp = db.prepare('SELECT slug FROM properties ORDER BY id ASC LIMIT 1').get() as { slug?: string } | undefined;
  if (count === REAL_MITE_DIRECTORY.length && firstProp?.slug === 'mite-boys-hostel') {
    return;
  }

  db.exec('BEGIN TRANSACTION;');

  try {
    if (count > 0) {
      db.exec('PRAGMA foreign_keys = OFF;');
      db.exec('DELETE FROM bookings;');
      db.exec('DELETE FROM room_types;');
      db.exec('DELETE FROM properties;');
      db.exec('DELETE FROM events;');
      db.exec("DELETE FROM sqlite_sequence WHERE name IN ('properties','room_types','bookings','events');");
      db.exec('PRAGMA foreign_keys = ON;');
    }

    const insertProperty = db.prepare(`
      INSERT INTO properties (
        slug, name, category, city, neighborhood, distance_km, travel_time,
        distance_to_campus, address, phone, tagline, description,
        starting_rent_inr, total_beds, available_beds, accent_theme,
        amenities_json, highlights_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertRoomType = db.prepare(`
      INSERT INTO room_types (
        property_id, name, area_sqft, monthly_rent_inr, deposit_inr,
        available_count, status, features_json, floorplan_variant
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertEvent = db.prepare(`
      INSERT INTO events (title, category, property_name, event_date, spots_remaining)
      VALUES (?, ?, ?, ?, ?)
    `);

    const insertBooking = db.prepare(`
      INSERT INTO bookings (
        reference_code, property_id, room_type_id, full_name, email, phone,
        applicant_role, tour_type, preferred_move_in, notes, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertSubscriber = db.prepare(`
      INSERT OR IGNORE INTO subscribers (email) VALUES (?)
    `);

    const insertedPropertyIds: number[] = [];
    const firstRoomIdByProp: Record<number, number> = {};

    for (const item of REAL_MITE_DIRECTORY) {
      const availableBeds = item.rooms.reduce((sum, r) => sum + r.available_count, 0);
      const totalBeds = availableBeds + 24;
      const startingRent = Math.min(...item.rooms.map((r) => r.monthly_rent_inr));
      const distanceLabel = `${item.distance_km} km from MITE (${item.travel_time})`;

      const res = insertProperty.run(
        item.slug,
        item.name,
        item.category,
        item.city,
        item.neighborhood,
        item.distance_km,
        item.travel_time,
        distanceLabel,
        item.address,
        item.phone,
        item.tagline,
        item.description,
        startingRent,
        totalBeds,
        availableBeds,
        item.accent_theme,
        JSON.stringify(item.amenities),
        JSON.stringify(item.highlights)
      );

      const propId = Number(res.lastInsertRowid);
      insertedPropertyIds.push(propId);

      for (const r of item.rooms) {
        const status = r.available_count === 0 ? 'Waitlist' : r.available_count <= 3 ? 'Filling Fast' : 'Available';
        const roomRes = insertRoomType.run(
          propId,
          r.name,
          r.area_sqft,
          r.monthly_rent_inr,
          r.deposit_inr,
          r.available_count,
          status,
          JSON.stringify(r.features),
          r.floorplan_variant
        );

        if (!firstRoomIdByProp[propId]) {
          firstRoomIdByProp[propId] = Number(roomRes.lastInsertRowid);
        }
      }
    }

    // MITE & Moodbidri Community Events
    insertEvent.run(
      'MITE Freshers Hostel & PG Orientation Walk',
      'Community Dinner',
      "MITE Boy's Hostel & Todaru Corridor",
      'Dec 05, 2026',
      24
    );
    insertEvent.run(
      'Moodbidri Bus Route & Commute Briefing',
      'Career Talk',
      'Shri Brahmi PG (Bus Stand Road)',
      'Dec 09, 2026',
      16
    );
    insertEvent.run(
      '24-Hour MITE Dept Hackathon Study Prep',
      'Hackathon Night',
      'DAYA PG (FOR BOYS) — Todaru',
      'Dec 14, 2026',
      14
    );
    insertEvent.run(
      'Morning Wellness & Campus Cycling Club',
      'Wellness',
      'Shama ladies PG (Rathnakaravarni Nagara)',
      'Dec 18, 2026',
      12
    );

    // Agent-Mediated Starter Bookings (using exact real properties & new workflow statuses)
    const pDaya = insertedPropertyIds[2];
    const pShama = insertedPropertyIds[3];
    const pMasthikatte = insertedPropertyIds[5];
    const pRbLodge = insertedPropertyIds[6];
    const pSamrudhi = insertedPropertyIds[9];

    insertBooking.run(
      'CN-2026-8492',
      pDaya,
      firstRoomIdByProp[pDaya],
      'Karthik Acharya',
      'karthik.acharya@mite.ac.in',
      '9845123456',
      'Student',
      'On-Site',
      '2026-08-01',
      '1st Year CSE at MITE. Needs bike parking and ground floor room.',
      'New Lead',
      '2026-11-26 11:15:00'
    );

    insertBooking.run(
      'CN-2026-3184',
      pShama,
      firstRoomIdByProp[pShama],
      'Sujatha Hegde',
      'sujatha.hegde@gmail.com',
      '9448109876',
      'Guardian',
      'Agent Callback',
      '2026-08-05',
      'Parent looking for safe ladies PG near Ballal Hotel for daughter joining MITE ECE.',
      'Contacted Owner',
      '2026-11-26 14:40:00'
    );

    insertBooking.run(
      'CN-2026-5921',
      pMasthikatte,
      firstRoomIdByProp[pMasthikatte],
      'Rohan Bhandary',
      'rohan.b@mite.ac.in',
      '9900112233',
      'Student',
      'On-Site',
      '2026-07-28',
      'No direct PG phone listed — requesting CampusNest agent walk-through on Masthikatte Rd.',
      'Tour Scheduled',
      '2026-11-25 18:20:00'
    );

    insertBooking.run(
      'CN-2026-9043',
      pRbLodge,
      firstRoomIdByProp[pRbLodge],
      'Nikhil Shetty',
      'nikhil.shetty@mite.ac.in',
      '9123456780',
      'Student',
      'Virtual',
      '2026-07-20',
      'Confirmed solo PG room with R.B Lodge owner via agent negotiation.',
      'Confirmed',
      '2026-11-24 10:05:00'
    );

    insertBooking.run(
      'CN-2026-7712',
      pSamrudhi,
      firstRoomIdByProp[pSamrudhi],
      'Ananya Rao',
      'ananya.rao@mite.ac.in',
      '9741234560',
      'Student',
      'Agent Callback',
      '2026-08-02',
      'Pure veg preference. Requesting agent callback to confirm twin room vacancy.',
      'New Lead',
      '2026-11-27 09:30:00'
    );

    insertSubscriber.run('aditya.kamat@mite.ac.in');

    db.exec('COMMIT;');
  } catch (err) {
    db.exec('ROLLBACK;');
    throw err;
  }
}

// Run immediately if executed directly via CLI
if (process.argv[1] && process.argv[1].endsWith('seed.ts')) {
  seedDatabase();
  console.log('Seed executed cleanly with 11 MITE/Moodbidri properties.');
  process.exit(0);
}
