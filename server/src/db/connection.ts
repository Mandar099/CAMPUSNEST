import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data directory for SQLite database (use /tmp in Vercel serverless environments)
const isVercel = !!process.env.VERCEL;
const dataDir = isVercel ? '/tmp' : path.resolve(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'campusnest.db');
const bundledDbPath = path.resolve(__dirname, '../../data/campusnest.db');

// If deploying to Vercel serverless, copy pre-seeded database to writable /tmp directory
if (isVercel && fs.existsSync(bundledDbPath) && !fs.existsSync(dbPath)) {
  try {
    fs.copyFileSync(bundledDbPath, dbPath);
  } catch (err) {
    console.warn('[CampusNest Engine] Could not copy pre-seeded database to /tmp, will re-seed:', err);
  }
}

export const db = new DatabaseSync(dbPath);

// Configure SQLite for high performance and integrity
db.exec('PRAGMA foreign_keys = ON;');
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA busy_timeout = 5000;');
db.exec('PRAGMA synchronous = NORMAL;');

export function initDatabase() {
  // Check if existing DB uses legacy prototype schema (without distance_km or New Lead status)
  const tableInfo = db.prepare("PRAGMA table_info('properties')").all() as Array<{ name: string }>;
  if (tableInfo.length > 0) {
    const hasNewCols = tableInfo.some((col) => col.name === 'distance_km') &&
                       tableInfo.some((col) => col.name === 'category') &&
                       tableInfo.some((col) => col.name === 'address');

    const bookingsSqlRow = db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='bookings'").get() as { sql?: string } | undefined;
    const hasAgentStatuses = bookingsSqlRow?.sql?.includes('New Lead') ?? false;

    if (!hasNewCols || !hasAgentStatuses) {
      db.exec('PRAGMA foreign_keys = OFF;');
      db.exec('DROP TABLE IF EXISTS bookings;');
      db.exec('DROP TABLE IF EXISTS room_types;');
      db.exec('DROP TABLE IF EXISTS properties;');
      db.exec('DROP TABLE IF EXISTS events;');
      db.exec('PRAGMA foreign_keys = ON;');
    }
  }

  const schemaPath = path.join(__dirname, 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(schemaSql);
}
