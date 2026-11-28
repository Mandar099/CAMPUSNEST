import { Property, CommunityEvent } from '../types';

// Synchronized static fallback dataset matching GET /api/properties & /api/events
// so serverless deployments (e.g. Vercel without persistent SQLite) always render
// all 11 MITE/Moodbidri properties and 3 room tiers each.
export const FALLBACK_PROPERTIES: Property[] = [
  {
    "id": 1,
    "slug": "mite-boys-hostel",
    "name": "MITE Boy's Hostel",
    "category": "On-Campus Hostel (Boys)",
    "city": "Moodbidri",
    "neighborhood": "Badagumijaru · MITE Campus",
    "distance_km": 0.35,
    "travel_time": "1 min",
    "distance_to_campus": "0.35 km from MITE (1 min)",
    "address": "3X27+RVF, Badagumijaru, Karnataka 574225",
    "phone": "082582 62695",
    "image_url": "/images/mite-boys-hostel.jpg",
    "food_plan": "4-Meal Campus Mess Included",
    "curfew_timing": "9:30 PM Campus Gate",
    "wifi_speed": "100 Mbps Campus Fiber",
    "power_backup": "24/7 Campus DG Backup",
    "tagline": "Inside MITE Academic Grounds — 1 Min Walk to Classrooms",
    "description": "Official on-campus boys residence inside Badagumijaru campus with round-the-clock warden supervision, high-speed campus fiber, and dining hall.",
    "starting_rent_inr": 5600,
    "total_beds": 40,
    "available_beds": 16,
    "accent_theme": "emerald",
    "amenities": [
      "Campus Fiber Wi-Fi",
      "On-Campus Mess",
      "24/7 Security Gate",
      "Generator Backup",
      "Reading Hall"
    ],
    "highlights": [
      "350m walk to MITE main block",
      "Warden-supervised discipline",
      "Zero commute time"
    ],
    "room_types": [
      {
        "id": 3,
        "property_id": 1,
        "name": "Triple Sharing Room",
        "area_sqft": 260,
        "monthly_rent_inr": 5600,
        "deposit_inr": 12000,
        "available_count": 8,
        "status": "Available",
        "features": [
          "3 Study Stations",
          "Individual Lockers",
          "Common Balcony",
          "4-Meal Mess Included"
        ],
        "floorplan_variant": "triple_loft"
      },
      {
        "id": 2,
        "property_id": 1,
        "name": "Twin Sharing Room",
        "area_sqft": 210,
        "monthly_rent_inr": 6800,
        "deposit_inr": 15000,
        "available_count": 6,
        "status": "Available",
        "features": [
          "2 Study Desks & Chairs",
          "Attached Bath",
          "Campus Wi-Fi",
          "4-Meal Mess Included"
        ],
        "floorplan_variant": "twin_pod"
      },
      {
        "id": 1,
        "property_id": 1,
        "name": "Single Study Room",
        "area_sqft": 155,
        "monthly_rent_inr": 8200,
        "deposit_inr": 15000,
        "available_count": 2,
        "status": "Filling Fast",
        "features": [
          "Single Cot & Study Desk",
          "Private Locker",
          "Campus Fiber Wi-Fi",
          "4-Meal Mess Included"
        ],
        "floorplan_variant": "solo_studio"
      }
    ]
  },
  {
    "id": 2,
    "slug": "mite-girls-hostel",
    "name": "MITE Girl's Hostel",
    "category": "On-Campus Hostel (Girls)",
    "city": "Moodbidri",
    "neighborhood": "Badagumijaru · MITE Campus",
    "distance_km": 0.35,
    "travel_time": "2 mins",
    "distance_to_campus": "0.35 km from MITE (2 mins)",
    "address": "3X28+X5F, Badagumijaru, Karnataka 574225",
    "phone": "082582 62695",
    "image_url": "/images/mite-girls-hostel.jpg",
    "food_plan": "4-Meal Campus Mess Included",
    "curfew_timing": "7:30 PM Lady Warden Gate",
    "wifi_speed": "100 Mbps Campus Fiber",
    "power_backup": "24/7 DG & Solar Backup",
    "tagline": "Secure On-Campus Girls Residence with 24/7 Warden & Medical Support",
    "description": "Protected on-campus girls hostel within MITE Badagumijaru premises featuring biometric entry, dedicated lady wardens, study lounges, and full dining facility.",
    "starting_rent_inr": 5800,
    "total_beds": 38,
    "available_beds": 14,
    "accent_theme": "terracotta",
    "amenities": [
      "Biometric Entry",
      "Lady Warden 24/7",
      "Campus Fiber Wi-Fi",
      "Hygienic Mess",
      "Hot Water Solar"
    ],
    "highlights": [
      "2 min walk inside MITE campus",
      "CCTV monitored perimeter",
      "Parent visitor lounge"
    ],
    "room_types": [
      {
        "id": 6,
        "property_id": 2,
        "name": "Triple Sharing Room",
        "area_sqft": 270,
        "monthly_rent_inr": 5800,
        "deposit_inr": 12000,
        "available_count": 7,
        "status": "Available",
        "features": [
          "3 Wardrobes",
          "Study Lamps",
          "High-Speed Wi-Fi",
          "4-Meal Mess Included"
        ],
        "floorplan_variant": "triple_loft"
      },
      {
        "id": 5,
        "property_id": 2,
        "name": "Twin Sharing Room",
        "area_sqft": 215,
        "monthly_rent_inr": 7000,
        "deposit_inr": 15000,
        "available_count": 5,
        "status": "Available",
        "features": [
          "Attached Washroom",
          "Ergonomic Study Tables",
          "24/7 Solar Hot Water",
          "4-Meal Mess Included"
        ],
        "floorplan_variant": "twin_pod"
      },
      {
        "id": 4,
        "property_id": 2,
        "name": "Single En-Suite Room",
        "area_sqft": 160,
        "monthly_rent_inr": 8500,
        "deposit_inr": 16000,
        "available_count": 2,
        "status": "Filling Fast",
        "features": [
          "Private Room",
          "Study Desk & Wardrobe",
          "24/7 Solar Hot Water",
          "4-Meal Mess Included"
        ],
        "floorplan_variant": "solo_studio"
      }
    ]
  },
  {
    "id": 3,
    "slug": "daya-pg-for-boys",
    "name": "DAYA PG (FOR BOYS)",
    "category": "Boys PG",
    "city": "Moodbidri",
    "neighborhood": "Todaru · MITE Highway Corridor",
    "distance_km": 1.4,
    "travel_time": "3 mins",
    "distance_to_campus": "1.4 km from MITE (3 mins)",
    "address": "Todaru, Karnataka 574225",
    "phone": "099013 25685",
    "image_url": "/images/daya-pg-boys.jpg",
    "food_plan": "3-Time Homestyle Meals",
    "curfew_timing": "10:30 PM Flexible",
    "wifi_speed": "150 Mbps Dual Fiber",
    "power_backup": "24/7 Inverter Backup",
    "tagline": "Nearest Off-Campus Boys PG in Todaru — 3 Mins from MITE",
    "description": "Popular off-campus boys PG located in peaceful Todaru just 1.4 km from MITE gates. Combines home-style coastal meals with flexible hostel freedom.",
    "starting_rent_inr": 5200,
    "total_beds": 35,
    "available_beds": 11,
    "accent_theme": "obsidian",
    "amenities": [
      "Homestyle Meals",
      "Two-Wheeler Parking",
      "Wi-Fi Broadband",
      "Power Backup",
      "Laundry Space"
    ],
    "highlights": [
      "Closest private boys PG to MITE (1.4 km)",
      "3 min ride on NH-169",
      "Quiet study atmosphere"
    ],
    "room_types": [
      {
        "id": 9,
        "property_id": 3,
        "name": "Triple Sharing Room",
        "area_sqft": 265,
        "monthly_rent_inr": 5200,
        "deposit_inr": 9000,
        "available_count": 4,
        "status": "Available",
        "features": [
          "3 Single Cots",
          "Shared Balcony",
          "Cupboards",
          "3 Meals Daily"
        ],
        "floorplan_variant": "triple_loft"
      },
      {
        "id": 8,
        "property_id": 3,
        "name": "Twin Sharing Room",
        "area_sqft": 220,
        "monthly_rent_inr": 6200,
        "deposit_inr": 10000,
        "available_count": 5,
        "status": "Available",
        "features": [
          "2 Single Cots",
          "Study Table",
          "Cupboard Storage",
          "3 Meals Daily"
        ],
        "floorplan_variant": "twin_pod"
      },
      {
        "id": 7,
        "property_id": 3,
        "name": "Single Room",
        "area_sqft": 165,
        "monthly_rent_inr": 8200,
        "deposit_inr": 15000,
        "available_count": 2,
        "status": "Filling Fast",
        "features": [
          "Single Bed & Mattress",
          "Private Study Desk",
          "Attached Bathroom",
          "3 Meals Daily"
        ],
        "floorplan_variant": "solo_studio"
      }
    ]
  },
  {
    "id": 4,
    "slug": "shama-ladies-pg",
    "name": "Shama ladies PG",
    "category": "Ladies PG",
    "city": "Moodbidri",
    "neighborhood": "Rathnakaravarni Nagara · Near Ballal Hotel",
    "distance_km": 3.7,
    "travel_time": "8 mins",
    "distance_to_campus": "3.7 km from MITE (8 mins)",
    "address": "Near Ballal Hotel, Rathnakaravarni Nagara, Moodbidri, Karnataka 574227",
    "phone": "094489 09575",
    "image_url": "/images/shama-ladies-pg.jpg",
    "food_plan": "Veg & Non-Veg Home Mess",
    "curfew_timing": "8:30 PM Gated Entry",
    "wifi_speed": "100 Mbps Fiber",
    "power_backup": "24/7 Inverter Backup",
    "tagline": "Trusted Ladies PG in Rathnakaravarni Nagara with Home-Cooked Food",
    "description": "Well-maintained ladies accommodation near Ballal Hotel in central Moodbidri, offering safe gated access, easy bus-route connectivity to MITE, and fresh meals.",
    "starting_rent_inr": 5500,
    "total_beds": 35,
    "available_beds": 11,
    "accent_theme": "terracotta",
    "amenities": [
      "CCTV Security",
      "Home-Cooked Food",
      "Drinking Water RO",
      "Wi-Fi Access",
      "Bus Stop 2 Min"
    ],
    "highlights": [
      "Near Ballal Hotel landmark",
      "Frequent college buses to MITE",
      "Lady caretaker on site"
    ],
    "room_types": [
      {
        "id": 12,
        "property_id": 4,
        "name": "Triple Sharing Room",
        "area_sqft": 260,
        "monthly_rent_inr": 5500,
        "deposit_inr": 8000,
        "available_count": 5,
        "status": "Available",
        "features": [
          "Spacious Ventilation",
          "3 Study Spots",
          "Wi-Fi",
          "Home Food Included"
        ],
        "floorplan_variant": "triple_loft"
      },
      {
        "id": 11,
        "property_id": 4,
        "name": "Twin Sharing Room",
        "area_sqft": 210,
        "monthly_rent_inr": 6500,
        "deposit_inr": 10000,
        "available_count": 4,
        "status": "Available",
        "features": [
          "Attached Bath",
          "Wardrobes",
          "Study Desk",
          "Home Food Included"
        ],
        "floorplan_variant": "twin_pod"
      },
      {
        "id": 10,
        "property_id": 4,
        "name": "Single Room",
        "area_sqft": 160,
        "monthly_rent_inr": 7900,
        "deposit_inr": 12000,
        "available_count": 2,
        "status": "Filling Fast",
        "features": [
          "Single Cot",
          "Study Desk",
          "Wardrobe",
          "Home Food Included"
        ],
        "floorplan_variant": "solo_studio"
      }
    ]
  },
  {
    "id": 5,
    "slug": "new-royal-pg",
    "name": "New royal pg",
    "category": "Boys PG",
    "city": "Moodbidri",
    "neighborhood": "Masthikate Road · Moodbidri",
    "distance_km": 3.9,
    "travel_time": "8 mins",
    "distance_to_campus": "3.9 km from MITE (8 mins)",
    "address": "Masthikate road, Moodbidri, Karnataka 574227",
    "phone": "073381 75375",
    "image_url": "/images/new-royal-pg.jpg",
    "food_plan": "Mess Optional / Room Only",
    "curfew_timing": "11:00 PM Keyless",
    "wifi_speed": "200 Mbps Broadband",
    "power_backup": "24/7 Inverter Backup",
    "tagline": "Modern Boys PG on Masthikate Road with Direct MITE Transit Access",
    "description": "Conveniently situated on Masthikate Road with quick access to gyms, cafes, and MITE college buses. Clean tiled rooms with dedicated high-speed Wi-Fi.",
    "starting_rent_inr": 5000,
    "total_beds": 37,
    "available_beds": 13,
    "accent_theme": "ocean",
    "amenities": [
      "High-Speed Wi-Fi",
      "Bike Parking",
      "Hot Water Geyser",
      "Daily Housekeeping",
      "RO Water"
    ],
    "highlights": [
      "Prime Masthikate Road access",
      "8 mins commute to MITE",
      "Flexible meal plans"
    ],
    "room_types": [
      {
        "id": 15,
        "property_id": 5,
        "name": "Triple Sharing Room",
        "area_sqft": 275,
        "monthly_rent_inr": 5000,
        "deposit_inr": 8000,
        "available_count": 5,
        "status": "Available",
        "features": [
          "3 Beds",
          "Shared Balcony",
          "Hot Water Geyser",
          "Wi-Fi & Cleaning"
        ],
        "floorplan_variant": "triple_loft"
      },
      {
        "id": 14,
        "property_id": 5,
        "name": "Twin Sharing Room",
        "area_sqft": 225,
        "monthly_rent_inr": 6000,
        "deposit_inr": 10000,
        "available_count": 6,
        "status": "Available",
        "features": [
          "Twin Beds",
          "Separate Lockers",
          "Balcony Access",
          "Wi-Fi & Cleaning"
        ],
        "floorplan_variant": "twin_pod"
      },
      {
        "id": 13,
        "property_id": 5,
        "name": "Single Room",
        "area_sqft": 170,
        "monthly_rent_inr": 8500,
        "deposit_inr": 15000,
        "available_count": 2,
        "status": "Filling Fast",
        "features": [
          "Private Room",
          "Study Desk",
          "Attached Bath",
          "Wi-Fi & Cleaning"
        ],
        "floorplan_variant": "solo_studio"
      }
    ]
  },
  {
    "id": 6,
    "slug": "masthikatte-boys-hostel",
    "name": "Masthikatte Boy's Hostel",
    "category": "Boys Hostel",
    "city": "Moodbidri",
    "neighborhood": "Nelligudde Rd · Masthikatte",
    "distance_km": 3.9,
    "travel_time": "8 mins",
    "distance_to_campus": "3.9 km from MITE (8 mins)",
    "address": "3X5R+726, Nelligudde Rd, near Nishmitha Travels Maintenance Unit, Moodbidri, Karnataka 574227",
    "phone": null,
    "image_url": "/images/masthikatte-boys-hostel.jpg",
    "food_plan": "3-Time Coastal Mess",
    "curfew_timing": "10:00 PM Warden Gate",
    "wifi_speed": "100 Mbps Fiber",
    "power_backup": "24/7 Power Backup",
    "tagline": "Verified Agent-Managed Boys Hostel off Nelligudde Road",
    "description": "Quiet residential boys hostel near Nishmitha Travels on Nelligudde Road. Verified directly by CampusNest field agents for clean rooms and reliable student stays.",
    "starting_rent_inr": 4900,
    "total_beds": 36,
    "available_beds": 12,
    "accent_theme": "emerald",
    "amenities": [
      "Agent Verified",
      "Two-Wheeler Parking",
      "Study Tables",
      "Filtered Water",
      "24/7 Electricity"
    ],
    "highlights": [
      "Book & tour exclusively via CampusNest Agent",
      "Quiet off-road lane",
      "8 mins from MITE"
    ],
    "room_types": [
      {
        "id": 18,
        "property_id": 6,
        "name": "Triple Sharing Room",
        "area_sqft": 270,
        "monthly_rent_inr": 4900,
        "deposit_inr": 8000,
        "available_count": 6,
        "status": "Available",
        "features": [
          "3 Cots",
          "Lockers",
          "Ceiling Fans",
          "Wi-Fi Ready"
        ],
        "floorplan_variant": "triple_loft"
      },
      {
        "id": 17,
        "property_id": 6,
        "name": "Twin Sharing Room",
        "area_sqft": 215,
        "monthly_rent_inr": 5800,
        "deposit_inr": 10000,
        "available_count": 4,
        "status": "Available",
        "features": [
          "Twin Beds",
          "Study Table",
          "Attached Washroom",
          "Agent Negotiated Rate"
        ],
        "floorplan_variant": "twin_pod"
      },
      {
        "id": 16,
        "property_id": 6,
        "name": "Single Room",
        "area_sqft": 155,
        "monthly_rent_inr": 7500,
        "deposit_inr": 12000,
        "available_count": 2,
        "status": "Filling Fast",
        "features": [
          "Single Cot",
          "Study Desk",
          "Attached Bath",
          "Agent Verified Rate"
        ],
        "floorplan_variant": "solo_studio"
      }
    ]
  },
  {
    "id": 7,
    "slug": "rb-lodge-and-pg",
    "name": "R.B LODGE AND PG",
    "category": "Lodge & PG",
    "city": "Moodbidri",
    "neighborhood": "Moodbidri Town Center",
    "distance_km": 4.4,
    "travel_time": "10 mins",
    "distance_to_campus": "4.4 km from MITE (10 mins)",
    "address": "3X9V+8C6, Moodbidri, Karnataka 574227",
    "phone": "098805 99424",
    "image_url": "/images/rb-lodge-pg.jpg",
    "food_plan": "Room Only / Tiffin Tie-up",
    "curfew_timing": "24/7 Reception Access",
    "wifi_speed": "150 Mbps Fiber",
    "power_backup": "24/7 Generator Backup",
    "tagline": "Private Room Flexibility & Long-Stay Student PG in Town Center",
    "description": "Ideal for MITE students or visiting parents seeking lodge-grade maintenance with monthly PG affordability right inside Moodbidri town.",
    "starting_rent_inr": 5700,
    "total_beds": 35,
    "available_beds": 11,
    "accent_theme": "obsidian",
    "amenities": [
      "Private Rooms Available",
      "24/7 Reception",
      "Hot Water",
      "Parking Space",
      "Town Connectivity"
    ],
    "highlights": [
      "Great for solo rooms & short-notice stays",
      "10 min drive to MITE",
      "Close to pharmacies & eateries"
    ],
    "room_types": [
      {
        "id": 21,
        "property_id": 7,
        "name": "Triple Sharing Room",
        "area_sqft": 290,
        "monthly_rent_inr": 5700,
        "deposit_inr": 10000,
        "available_count": 4,
        "status": "Available",
        "features": [
          "3 Beds",
          "Attached Bath",
          "Daily Housekeeping",
          "Wi-Fi Included"
        ],
        "floorplan_variant": "triple_loft"
      },
      {
        "id": 20,
        "property_id": 7,
        "name": "Twin Sharing Room",
        "area_sqft": 240,
        "monthly_rent_inr": 6800,
        "deposit_inr": 12000,
        "available_count": 4,
        "status": "Available",
        "features": [
          "2 Beds",
          "Attached Bath",
          "Balcony Option",
          "Wi-Fi Included"
        ],
        "floorplan_variant": "balcony_loft"
      },
      {
        "id": 19,
        "property_id": 7,
        "name": "Single Room",
        "area_sqft": 195,
        "monthly_rent_inr": 9200,
        "deposit_inr": 15000,
        "available_count": 3,
        "status": "Filling Fast",
        "features": [
          "Private Ensuite",
          "Study Table",
          "Daily Room Care",
          "24/7 Reception"
        ],
        "floorplan_variant": "solo_studio"
      }
    ]
  },
  {
    "id": 8,
    "slug": "shalimar-boys-hostel",
    "name": "Shalimar Boys Hostel",
    "category": "Boys Hostel",
    "city": "Moodbidri",
    "neighborhood": "Moodabidri Central",
    "distance_km": 4.5,
    "travel_time": "10 mins",
    "distance_to_campus": "4.5 km from MITE (10 mins)",
    "address": "6, Moodabidri, Moodbidri, Karnataka 574227",
    "phone": "096111 59622",
    "image_url": "/images/shalimar-boys-hostel.jpg",
    "food_plan": "Mess Optional / Nearby Dining",
    "curfew_timing": "10:30 PM Caretaker Gate",
    "wifi_speed": "100 Mbps Broadband",
    "power_backup": "24/7 Inverter Backup",
    "tagline": "Established Moodbidri Boys Hostel with Spacious Rooms",
    "description": "Long-standing student hostel in central Moodbidri known among MITE seniors for spacious corridors, reliable water supply, and easy access to town bus stops.",
    "starting_rent_inr": 4800,
    "total_beds": 35,
    "available_beds": 11,
    "accent_theme": "ocean",
    "amenities": [
      "Senior Student Community",
      "Bike Parking",
      "Broadband Wi-Fi",
      "24/7 Water",
      "Common Study Area"
    ],
    "highlights": [
      "10 mins from MITE via town shuttle",
      "Budget-friendly deposits",
      "Walkable to central market"
    ],
    "room_types": [
      {
        "id": 24,
        "property_id": 8,
        "name": "Triple Sharing Room",
        "area_sqft": 290,
        "monthly_rent_inr": 4800,
        "deposit_inr": 8000,
        "available_count": 4,
        "status": "Available",
        "features": [
          "3 Study Spaces",
          "Wall Storage",
          "Cross-Ventilation",
          "Wi-Fi Access"
        ],
        "floorplan_variant": "triple_loft"
      },
      {
        "id": 23,
        "property_id": 8,
        "name": "Twin Sharing Room",
        "area_sqft": 220,
        "monthly_rent_inr": 5700,
        "deposit_inr": 10000,
        "available_count": 5,
        "status": "Available",
        "features": [
          "2 Cots",
          "Individual Tables",
          "Shared Attached Bath",
          "Wi-Fi Access"
        ],
        "floorplan_variant": "twin_pod"
      },
      {
        "id": 22,
        "property_id": 8,
        "name": "Single Room",
        "area_sqft": 160,
        "monthly_rent_inr": 7400,
        "deposit_inr": 12000,
        "available_count": 2,
        "status": "Filling Fast",
        "features": [
          "Private Room",
          "Study Table",
          "Bike Parking",
          "Wi-Fi Access"
        ],
        "floorplan_variant": "solo_studio"
      }
    ]
  },
  {
    "id": 9,
    "slug": "shri-brahmi-pg",
    "name": "Shri Brahmi PG",
    "category": "PG",
    "city": "Moodbidri",
    "neighborhood": "Prabhu Complex · Behind Bus Stand Road",
    "distance_km": 4.7,
    "travel_time": "11 mins",
    "distance_to_campus": "4.7 km from MITE (11 mins)",
    "address": "2nd floor, Prabhu Complex, behind Bus Stand Road, Moodbidri, Karnataka 574227",
    "phone": "096863 72192",
    "image_url": "/images/shri-brahmi-pg.jpg",
    "food_plan": "Veg Tiffin & Mess Option",
    "curfew_timing": "9:30 PM Complex Gate",
    "wifi_speed": "100 Mbps Fiber",
    "power_backup": "24/7 Inverter Backup",
    "tagline": "Steps from Moodbidri Main Bus Stand — Easy MITE Commute",
    "description": "Located on the 2nd floor of Prabhu Complex right behind Bus Stand Road, giving students immediate access to express buses, stationery stores, and clinics.",
    "starting_rent_inr": 5300,
    "total_beds": 33,
    "available_beds": 9,
    "accent_theme": "terracotta",
    "amenities": [
      "Bus Stand 1 Min Walk",
      "CCTV Corridor",
      "Clean Dining Area",
      "Wi-Fi Broadband",
      "Power Backup"
    ],
    "highlights": [
      "Behind Bus Stand Road",
      "11 mins to MITE campus",
      "Commercial complex security"
    ],
    "room_types": [
      {
        "id": 27,
        "property_id": 9,
        "name": "Triple Sharing Room",
        "area_sqft": 255,
        "monthly_rent_inr": 5300,
        "deposit_inr": 8000,
        "available_count": 4,
        "status": "Available",
        "features": [
          "3 Cots",
          "Lockers",
          "Bright Windows",
          "Wi-Fi Included"
        ],
        "floorplan_variant": "triple_loft"
      },
      {
        "id": 26,
        "property_id": 9,
        "name": "Twin Sharing Room",
        "area_sqft": 200,
        "monthly_rent_inr": 6300,
        "deposit_inr": 10000,
        "available_count": 3,
        "status": "Filling Fast",
        "features": [
          "2 Beds",
          "Study Desk",
          "Attached Washroom",
          "Meals Option Available"
        ],
        "floorplan_variant": "twin_pod"
      },
      {
        "id": 25,
        "property_id": 9,
        "name": "Single Room",
        "area_sqft": 155,
        "monthly_rent_inr": 7800,
        "deposit_inr": 12000,
        "available_count": 2,
        "status": "Filling Fast",
        "features": [
          "Single Cot",
          "Study Desk",
          "CCTV Corridor",
          "Wi-Fi Included"
        ],
        "floorplan_variant": "solo_studio"
      }
    ]
  },
  {
    "id": 10,
    "slug": "samrudhi-ladies-pg-pure-veg",
    "name": "Samrudhi ladies pg (pure veg)",
    "category": "Ladies PG",
    "city": "Moodbidri",
    "neighborhood": "Ponnechari Road · Opp. Nature Ice Cream",
    "distance_km": 5.2,
    "travel_time": "12 mins",
    "distance_to_campus": "5.2 km from MITE (12 mins)",
    "address": "Ponnechari Road, opposite to Nature Ice Cream, Moodbidri, Karnataka 574227",
    "phone": null,
    "image_url": "/images/samrudhi-ladies-pg.jpg",
    "food_plan": "100% Pure Veg Home Kitchen",
    "curfew_timing": "8:00 PM Family Gate",
    "wifi_speed": "100 Mbps Fiber",
    "power_backup": "Solar + Inverter Backup",
    "tagline": "Pure Vegetarian Ladies PG on Ponnechari Road — Agent Verified",
    "description": "Dedicated pure-vegetarian ladies PG opposite Nature Ice Cream on Ponnechari Road. Quiet, clean, and family-run—tours and room holds coordinated through CampusNest Agents.",
    "starting_rent_inr": 5600,
    "total_beds": 33,
    "available_beds": 9,
    "accent_theme": "emerald",
    "amenities": [
      "100% Pure Veg Kitchen",
      "Lady Warden",
      "Safe Residential Street",
      "RO Drinking Water",
      "Wi-Fi"
    ],
    "highlights": [
      "Pure Vegetarian kitchen & utensils",
      "Book tour via CampusNest Agent",
      "Opposite Nature Ice Cream"
    ],
    "room_types": [
      {
        "id": 30,
        "property_id": 10,
        "name": "Triple Sharing Room",
        "area_sqft": 270,
        "monthly_rent_inr": 5600,
        "deposit_inr": 10000,
        "available_count": 4,
        "status": "Available",
        "features": [
          "Pure Veg Home Meals",
          "3 Wardrobes",
          "Solar Hot Water",
          "Agent Verified"
        ],
        "floorplan_variant": "triple_loft"
      },
      {
        "id": 29,
        "property_id": 10,
        "name": "Twin Sharing Room",
        "area_sqft": 215,
        "monthly_rent_inr": 6800,
        "deposit_inr": 12000,
        "available_count": 3,
        "status": "Filling Fast",
        "features": [
          "Pure Veg Home Meals",
          "Attached Bath",
          "Study Desk",
          "Gated Entry"
        ],
        "floorplan_variant": "twin_pod"
      },
      {
        "id": 28,
        "property_id": 10,
        "name": "Single Pure-Veg Room",
        "area_sqft": 165,
        "monthly_rent_inr": 8400,
        "deposit_inr": 14000,
        "available_count": 2,
        "status": "Filling Fast",
        "features": [
          "Pure Veg Home Meals",
          "Private Study Desk",
          "Attached Bath",
          "Gated Entry"
        ],
        "floorplan_variant": "solo_studio"
      }
    ]
  },
  {
    "id": 11,
    "slug": "veena-pg-paying-guest",
    "name": "Veena PG (Paying Guest)",
    "category": "PG",
    "city": "Moodbidri",
    "neighborhood": "Hanumanth Nagar · Range Forest Office Rd",
    "distance_km": 5.3,
    "travel_time": "13 mins",
    "distance_to_campus": "5.3 km from MITE (13 mins)",
    "address": "9-58 B, Range Forest Office Road, Hanumanth Nagar, Veena, Moodbidri, Karnataka 574227",
    "phone": null,
    "image_url": "/images/veena-pg.jpg",
    "food_plan": "Homestyle 3-Time Meals",
    "curfew_timing": "9:00 PM Family Gate",
    "wifi_speed": "100 Mbps Broadband",
    "power_backup": "24/7 Inverter Backup",
    "tagline": "Serene Residential Paying Guest Stay in Hanumanth Nagar",
    "description": "Peaceful family-style PG nestled on Range Forest Office Road in Hanumanth Nagar. Ideal for students preferring quiet neighborhood living, verified and scheduled by CampusNest Agents.",
    "starting_rent_inr": 5000,
    "total_beds": 34,
    "available_beds": 10,
    "accent_theme": "terracotta",
    "amenities": [
      "Quiet Tree-Lined Zone",
      "Homestyle Food",
      "Study-Friendly Environment",
      "Filtered Water",
      "Wi-Fi"
    ],
    "highlights": [
      "Contact & book exclusively via CampusNest Agent",
      "Calm Hanumanth Nagar locality",
      "13 mins to MITE"
    ],
    "room_types": [
      {
        "id": 33,
        "property_id": 11,
        "name": "Triple Sharing Room",
        "area_sqft": 270,
        "monthly_rent_inr": 5000,
        "deposit_inr": 8000,
        "available_count": 4,
        "status": "Available",
        "features": [
          "3 Beds",
          "Cupboards",
          "Ventilated Windows",
          "Home Meals"
        ],
        "floorplan_variant": "triple_loft"
      },
      {
        "id": 32,
        "property_id": 11,
        "name": "Twin Sharing Room",
        "area_sqft": 225,
        "monthly_rent_inr": 5900,
        "deposit_inr": 10000,
        "available_count": 4,
        "status": "Available",
        "features": [
          "Twin Beds",
          "Cupboards",
          "Attached Bath",
          "Home Meals"
        ],
        "floorplan_variant": "twin_pod"
      },
      {
        "id": 31,
        "property_id": 11,
        "name": "Single Study Room",
        "area_sqft": 175,
        "monthly_rent_inr": 7800,
        "deposit_inr": 12000,
        "available_count": 2,
        "status": "Filling Fast",
        "features": [
          "Private Room",
          "Quiet Window",
          "Study Table",
          "Home Meals"
        ],
        "floorplan_variant": "solo_studio"
      }
    ]
  }
];

export const FALLBACK_EVENTS: CommunityEvent[] = [
  {
    "id": 1,
    "title": "MITE Freshers Hostel & PG Orientation Walk",
    "category": "Community Dinner",
    "property_name": "MITE Boy's Hostel & Todaru Corridor",
    "event_date": "Dec 05, 2026",
    "spots_remaining": 24
  },
  {
    "id": 2,
    "title": "Moodbidri Bus Route & Commute Briefing",
    "category": "Career Talk",
    "property_name": "Shri Brahmi PG (Bus Stand Road)",
    "event_date": "Dec 09, 2026",
    "spots_remaining": 16
  },
  {
    "id": 3,
    "title": "24-Hour MITE Dept Hackathon Study Prep",
    "category": "Hackathon Night",
    "property_name": "DAYA PG (FOR BOYS) — Todaru",
    "event_date": "Dec 14, 2026",
    "spots_remaining": 14
  },
  {
    "id": 4,
    "title": "Morning Wellness & Campus Cycling Club",
    "category": "Wellness",
    "property_name": "Shama ladies PG (Rathnakaravarni Nagara)",
    "event_date": "Dec 18, 2026",
    "spots_remaining": 12
  }
];
