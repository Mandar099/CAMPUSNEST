import { db, initDatabase } from './connection.js';

export function seedDatabase() {
  initDatabase();

  const countRow = db.prepare('SELECT COUNT(*) as count FROM properties').get() as { count: number | bigint } | undefined;
  const count = Number(countRow?.count ?? 0);
  if (count > 0) {
    // console.log('Database already seeded. Skipping.');
    return;
  }

  // console.log('Seeding CampusNest database with rich student-living data...');

  const insertProperty = db.prepare(`
    INSERT INTO properties (
      slug, name, city, neighborhood, distance_to_campus, tagline, description,
      starting_rent_inr, total_beds, available_beds, accent_theme, amenities_json, highlights_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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

  db.exec('BEGIN TRANSACTION;');

  try {
    // 1. CampusNest Parkside (Moodbidri)
    const p1 = insertProperty.run(
      'campusnest-parkside-moodbidri',
      'CampusNest Parkside',
      'Moodbidri',
      'MITE Campus West Gate',
      '400m from MITE Campus',
      'Acoustic Serenity & Forest Canopy Walk',
      'Nestled right opposite the lush evergreen foothills of Moodbidri, Parkside offers quiet acoustic-treated study suites, an open-air central courtyard, and an ultra-short 4-minute walk to MITE main academic blocks.',
      8500,
      120,
      14,
      'emerald',
      JSON.stringify([
        '1 Gbps Redundant Fiber Wi-Fi',
        'Silent Acoustic Study Pods',
        'Shuttle to Alva’s & Yenepoya',
        'Chef-Crafted 4-Meal Mess',
        'Biometric Turnstiles & 24/7 Guard',
        'Solar Water & 100% DG Backup'
      ]),
      JSON.stringify([
        'Zero-commute stroll to MITE classrooms',
        'Quiet residential tree-lined zone',
        'Ergonomic workstation in every room'
      ])
    );
    const p1Id = Number(p1.lastInsertRowid);

    // 2. CampusNest Harbor View (Mangaluru)
    const p2 = insertProperty.run(
      'campusnest-harbor-view-mangaluru',
      'CampusNest Harbor View',
      'Mangaluru',
      'Surathkal Tech Corridor',
      '850m from NITK Surathkal / Srinivas Univ',
      'Coastal Breeze Meets High-Performance Tech Living',
      'Designed for coastal tech minds. Harbor View pairs refreshing Arabian Sea breezes with heavy-duty power backup, high-bandwidth server racks in our collaborative hacker den, and express access to Surathkal beach.',
      9500,
      150,
      19,
      'ocean',
      JSON.stringify([
        'Multi-ISP Low Latency Internet',
        'Rooftop Ocean-View Sunset Lounge',
        '24/7 Hacker & Hardware Lab',
        'Coastal Nutrition & South Indian Mess',
        'App-Activated Smart Laundry',
        'Surathkal Station Pickup Shuttle'
      ]),
      JSON.stringify([
        '5 min bike ride to NITK East gate',
        'Panoramic coastal terrace',
        'Air-conditioned quiet study library'
      ])
    );
    const p2Id = Number(p2.lastInsertRowid);

    // 3. CampusNest Scholar's Loft (Manipal)
    const p3 = insertProperty.run(
      'campusnest-scholars-loft-manipal',
      "CampusNest Scholar's Loft",
      'Manipal',
      'Eshwar Nagar / MIT Valley Road',
      '600m from MIT & KMC Manipal',
      'The Ultimate Academic Sanctuary in the University Town',
      'Perched in serene Eshwar Nagar, Scholar’s Loft is built for rigorous study and restorative balance. Features sound-dampened private lofts, 24-hour reading rooms, organic coffee bar, and effortless connectivity to Tiger Circle.',
      12000,
      130,
      11,
      'terracotta',
      JSON.stringify([
        'Dedicated 24/7 Reading Library',
        'Barista Coffee & Smoothie Bar',
        'Secure Resident Biometric Access',
        'Doctor-on-Call & Pharmacy Tie-up',
        'Weekly Linen & Room Housekeeping',
        'CrossFit & Yoga Sun Terrace'
      ]),
      JSON.stringify([
        'Walking distance to MIT Academic Block',
        'Vibrant international student cohort',
        'Premium natural teakwood furnishings'
      ])
    );
    const p3Id = Number(p3.lastInsertRowid);

    // 4. CampusNest Innovation Hub (Bengaluru)
    const p4 = insertProperty.run(
      'campusnest-innovation-hub-bengaluru',
      'CampusNest Innovation Hub',
      'Bengaluru',
      'Electronic City Phase 1',
      '500m from PES South Campus / IIIT-B',
      'Where South Bangalore’s Builders & Founders Live',
      'Located in the heart of Electronic City’s collegiate and engineering nexus. Combines minimalist Scandinavian micro-studios with a thriving community of student founders, researchers, and tech interns.',
      14000,
      120,
      14,
      'obsidian',
      JSON.stringify([
        'Gigabit Mesh & Podcast Recording Booth',
        'Co-Working Atrium & Whiteboard Rooms',
        'EV Charging & Bicycle Docking',
        'Fitness Gym & Bouldering Wall',
        'Zero-Carbon Solar Grid',
        'Late-Night Healthy Pantry & Cafeteria'
      ]),
      JSON.stringify([
        'Direct access to Electronic City Tech corridor',
        'Incubator partnership programs',
        'Keyless NFC door smart handles'
      ])
    );
    const p4Id = Number(p4.lastInsertRowid);

    // Room Types for Property 1 (Moodbidri)
    insertRoomType.run(
      p1Id,
      'Solo Studio Suite',
      220,
      14500,
      25000,
      3,
      'Filling Fast',
      JSON.stringify(['Private Ensuite Bath', 'Ergonomic Desk & Chair', 'Large Greenery Window', 'Split AC']),
      'solo_studio'
    );
    insertRoomType.run(
      p1Id,
      'Twin Focus Pod',
      280,
      9500,
      18000,
      7,
      'Available',
      JSON.stringify(['Acoustic Privacy Divider', 'Dual Wardrobes', 'Shared Ensuite Bath', 'Twin High-Speed LAN Ports']),
      'twin_pod'
    );
    insertRoomType.run(
      p1Id,
      'Corner Balcony Loft',
      340,
      16000,
      28000,
      4,
      'Available',
      JSON.stringify(['Private Sunlit Balcony', 'Lounge Seating', 'Mini Fridge & Kettle', 'Premium Mattress']),
      'balcony_loft'
    );

    // Room Types for Property 2 (Mangaluru)
    insertRoomType.run(
      p2Id,
      'Coastal Solo Studio',
      230,
      15500,
      26000,
      4,
      'Available',
      JSON.stringify(['Sea-facing Window', 'Private Ensuite Bath', 'High-Output AC', 'Acoustic Wall Panels']),
      'solo_studio'
    );
    insertRoomType.run(
      p2Id,
      'Twin Tech Double',
      290,
      10500,
      20000,
      9,
      'Available',
      JSON.stringify(['Individual Study Carrels', 'Smart Keyless Access', 'Large Wardrobes', 'Attached Bath']),
      'twin_pod'
    );
    insertRoomType.run(
      p2Id,
      'Terrace Penthouse Quad',
      450,
      9500,
      18000,
      6,
      'Filling Fast',
      JSON.stringify(['Direct Terrace Access', 'Private Study Lounge', 'Dual Luxury Bathrooms', 'Recliner Nook']),
      'quad_suite'
    );

    // Room Types for Property 3 (Manipal)
    insertRoomType.run(
      p3Id,
      "Scholar's Single En-Suite",
      240,
      17500,
      30000,
      2,
      'Filling Fast',
      JSON.stringify(['Extra-Long Study Desk', 'Bookcase & Pinboard', 'Private Bath with Geyser', 'Orthopedic Bed']),
      'solo_studio'
    );
    insertRoomType.run(
      p3Id,
      'Med-Tech Dual Suite',
      310,
      12500,
      22000,
      6,
      'Available',
      JSON.stringify(['Independent Night Shift Lamps', 'Dual En-suite Storage', 'Quiet Air Purifier', 'Full-Length Mirrors']),
      'twin_pod'
    );
    insertRoomType.run(
      p3Id,
      'Studio Mezzanine Loft',
      360,
      19500,
      35000,
      3,
      'Available',
      JSON.stringify(['Split-Level Sleeping Loft', 'Living & Workspace Below', 'Designer Skylight', 'Nespresso Corner']),
      'mezzanine_loft'
    );

    // Room Types for Property 4 (Bengaluru)
    insertRoomType.run(
      p4Id,
      'Developer Studio Pod',
      250,
      19000,
      35000,
      3,
      'Filling Fast',
      JSON.stringify(['Dual Monitor Mounting Arm', 'CAT6 Direct Line', 'Ergonomic Standing Desk', 'Private Ensuite']),
      'solo_studio'
    );
    insertRoomType.run(
      p4Id,
      'Founder Twin Pod',
      320,
      14000,
      25000,
      7,
      'Available',
      JSON.stringify(['Sound-Proof Partitioning', 'Personal Safe Lockers', 'Ultra-Quiet HVAC', 'Magnetic Idea Wall']),
      'twin_pod'
    );
    insertRoomType.run(
      p4Id,
      'Triple Hacker Loft',
      420,
      12000,
      22000,
      4,
      'Available',
      JSON.stringify(['Spacious 3-Desk Pod', 'Lounge Beanbags', 'Attached Double Vanities', 'High Ceiling']),
      'triple_loft'
    );

    // Events
    insertEvent.run('All-Night AI & Web3 Hackathon', 'Hackathon Night', 'CampusNest Innovation Hub (Bengaluru)', 'Dec 05, 2026', 18);
    insertEvent.run('Sunrise Vinyasa & Breathwork Session', 'Wellness', 'CampusNest Harbor View (Mangaluru)', 'Dec 08, 2026', 12);
    insertEvent.run('Coastal Founders & Community Dinner', 'Community Dinner', 'CampusNest Parkside (Moodbidri)', 'Dec 12, 2026', 25);
    insertEvent.run('MAHE to Global Tech: Alumni Career Talk', 'Career Talk', "CampusNest Scholar's Loft (Manipal)", 'Dec 15, 2026', 8);

    // Initial Seed Bookings
    insertBooking.run(
      'CN-2026-8492',
      p1Id,
      1,
      'Ananya Shenoy',
      'ananya.s@mite.edu.in',
      '9845123456',
      'Student',
      'On-Site',
      '2026-07-20',
      'Final year CSE student at MITE. Prefers top floor quiet wing.',
      'Confirmed',
      '2026-11-20 14:32:00'
    );
    insertBooking.run(
      'CN-2026-3184',
      p3Id,
      7,
      'Dr. Ramesh Hegde',
      'ramesh.hegde@kmc.edu',
      '9448109876',
      'Guardian',
      'On-Site',
      '2026-08-01',
      'Booking for daughter studying 1st year MBBS at KMC Manipal.',
      'Confirmed',
      '2026-11-21 09:15:00'
    );
    insertBooking.run(
      'CN-2026-5921',
      p4Id,
      10,
      'Vikramaditya Kulkarni',
      'vikram.k@iiitb.ac.in',
      '9900112233',
      'Student',
      'Virtual',
      '2026-07-25',
      'Master of Technology candidate. Requesting dual monitor arm setup.',
      'Pending',
      '2026-11-23 18:40:00'
    );
    insertBooking.run(
      'CN-2026-9043',
      p2Id,
      4,
      'Pooja Bhat',
      'pooja.bhat@nitk.edu.in',
      '9123456780',
      'Student',
      'On-Site',
      '2026-07-15',
      'NITK Surathkal M.Tech student. Prefers ocean breeze side.',
      'Visited',
      '2026-11-18 11:20:00'
    );

    // Initial subscriber
    insertSubscriber.run('aditya.kamat@gmail.com');

    db.exec('COMMIT;');
  } catch (err) {
    db.exec('ROLLBACK;');
    throw err;
  }
}

// Run immediately if executed directly via CLI
if (process.argv[1] && process.argv[1].endsWith('seed.ts')) {
  seedDatabase();
  console.log('Seed executed cleanly.');
  process.exit(0);
}
