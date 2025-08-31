import app from './app';
import dotenv from 'dotenv';
import { Server } from 'http';

// Load environment variables
dotenv.config();

// Import database connection (will be created later)
// import { connectToDatabase } from './config/database';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Variable to store server instance
let serverInstance: Server | null = null;

// Graceful shutdown function
const gracefulShutdown = (signal: string) => {
  console.log(`\n📡 Received ${signal}. Starting graceful shutdown...`);
  
  if (serverInstance) {
    serverInstance.close(() => {
      console.log('🔌 HTTP server closed.');
      
      // Close database connections here
      // await prisma.$disconnect();
      
      console.log('🗄️  Database connections closed.');
      console.log('✅ Graceful shutdown completed.');
      process.exit(0);
    });

    // Force close server after 30 seconds
    setTimeout(() => {
      console.log('⚠️  Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 30000);
  } else {
    console.log('No server instance to close.');
    process.exit(0);
  }
};

// Start server function
const startServer = async (): Promise<Server> => {
  try {
    // Initialize database connection (uncomment when database config is ready)
    // console.log('🗄️  Connecting to database...');
    // await connectToDatabase();
    // console.log('✅ Database connected successfully');

    // Start HTTP server
    const server = app.listen(PORT, () => {
      console.log('🚀 Unicycle API Server Started');
      console.log(`📍 Environment: ${NODE_ENV}`);
      console.log(`🌐 Server running on port: ${PORT}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`📚 API base URL: http://localhost:${PORT}/api/v1`);
      console.log('━'.repeat(50));
    });

    // Configure server timeouts
    server.timeout = 30000; // 30 seconds
    server.keepAliveTimeout = 65000; // 65 seconds
    server.headersTimeout = 66000; // 66 seconds

    // Assign to global variable for graceful shutdown
    serverInstance = server;

    return server;

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
  
  // In production, you might want to restart the process
  if (NODE_ENV === 'production') {
    console.log('💥 Shutting down due to unhandled promise rejection');
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('🚨 Uncaught Exception:', error);
  
  // Log the error and exit
  console.log('💥 Shutting down due to uncaught exception');
  process.exit(1);
});

// Handle process termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start the server
startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

// Export for testing purposes (optional)
export { serverInstance };