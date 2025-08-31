import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes (will be created later)
// import authRoutes from './routes/auth';
// import listingRoutes from './routes/listings';
// import requestRoutes from './routes/requests';
// import userRoutes from './routes/users';

// Import middleware (will be created later)
// import { authenticateToken } from './middlewares/auth';
// import { errorHandler } from './middlewares/errorHandler';

// Import config (will be created later)
// import './config/passport';

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL?.split(',') || []
    : ['http://localhost:3000', 'http://localhost:19006'], // React Native Metro bundler
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session configuration for Passport.js
app.use(session({
  secret: process.env.SESSION_SECRET || 'unicycle-session-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Unicycle API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API routes prefix
const API_PREFIX = '/api/v1';

// Routes (uncomment when routes are created)
// app.use(`${API_PREFIX}/auth`, authRoutes);
// app.use(`${API_PREFIX}/listings`, listingRoutes);
// app.use(`${API_PREFIX}/requests`, requestRoutes);
// app.use(`${API_PREFIX}/users`, userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Unicycle API - Thapar University Student Marketplace',
    version: '1.0.0',
    documentation: `${req.protocol}://${req.get('host')}/api/docs`,
    healthCheck: `${req.protocol}://${req.get('host')}/health`,
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested route ${req.originalUrl} does not exist`,
    availableRoutes: [
      'GET /',
      'GET /health',
      `GET ${API_PREFIX}/auth`,
      `GET ${API_PREFIX}/listings`,
      `GET ${API_PREFIX}/requests`,
      `GET ${API_PREFIX}/users`,
    ],
  });
});

// Global error handler (will be replaced with custom middleware later)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err);
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong!' 
      : err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

export default app;