import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedDatabase } from './db/seed.js';
import { propertiesRouter } from './routes/properties.js';
import { bookingsRouter } from './routes/bookings.js';
import { communityRouter } from './routes/community.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Auto-seed database if empty
try {
  seedDatabase();
  console.log('[CampusNest Engine] SQLite database initialized and ready.');
} catch (err) {
  console.error('[CampusNest Engine] Error initializing database:', err);
}

// Middleware
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173', '*'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key']
}));
app.use(express.json());

// Request logging in development
app.use((req, res, next) => {
  // console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'CampusNest API Engine',
    version: '1.0.0'
  });
});

// Routes
app.use('/api/properties', propertiesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api', communityRouter);

// 404 handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Unhandled Error]:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected server error occurred'
  });
});

// Start listening
const server = app.listen(PORT, () => {
  console.log(`[CampusNest Engine] Server listening on http://localhost:${PORT}`);
  console.log(`[CampusNest Engine] Admin demo key: campus-admin-secret-2026`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n[CampusNest Engine] Gracefully terminating server...');
  server.close(() => {
    process.exit(0);
  });
});
