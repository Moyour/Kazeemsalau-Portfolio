import 'dotenv/config';
import express from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { router } from "./routes"; // Import the new router
import { setupGoogleAuth, passport } from "./googleAuth";
import { Storage } from "./storage";
import { sql } from "drizzle-orm";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.json()); // Enable JSON body parsing

// Session configuration for Passport
app.use(session({
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year - effectively no timeout
  }
}));

// Initialize Google Auth
let storage;
try {
  storage = new Storage();
  setupGoogleAuth(storage);
  console.log('✅ Database initialized successfully');
} catch (error) {
  console.error('❌ Database initialization failed:', error);
  // Try to initialize storage again with error handling
  try {
    storage = new Storage();
    console.log('✅ Database re-initialized successfully');
  } catch (retryError) {
    console.error('❌ Database re-initialization failed:', retryError);
    // Create a mock storage for testing
    storage = {
      db: {
        all: () => [],
        run: () => {},
        prepare: () => ({ all: () => [], run: () => {} })
      }
    };
  }
}

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from uploads directory
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", (req, res, next) => {
  // Add CORS headers for file access
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  next();
}, express.static(uploadDir));

// Basic health check before mounting API routes
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Simple test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!", timestamp: new Date().toISOString() });
});

// Temporary admin setup route
app.get("/api/setup-admin", async (req, res) => {
  try {
    const bcrypt = await import('bcryptjs');
    const crypto = await import('crypto');
    
    const newUsername = 'kazeemsalau';
    const newPassword = 'Porsche6704@!';
    const newEmail = 'kaspersalau@gmail.com';
    
    const passwordHash = await bcrypt.hash(newPassword, 12);
    
    // Check if storage is properly initialized
    if (!storage || !storage.db) {
      return res.status(500).json({ 
        error: 'Database not initialized', 
        details: 'Storage is not properly set up' 
      });
    }
    
    // Check if admin exists
    const existingAdmin = await storage.db.all(sql`
      SELECT id, username, email, role FROM users WHERE role = 'admin'
    `);
    
    if (existingAdmin.length > 0) {
      // Update existing admin
      await storage.db.run(sql`
        UPDATE users 
        SET username = ${newUsername}, 
            email = ${newEmail}, 
            password_hash = ${passwordHash}
        WHERE role = 'admin'
      `);
    } else {
      // Create new admin
      const userId = crypto.randomUUID();
      await storage.db.run(sql`
        INSERT INTO users (id, username, email, password_hash, role, created_at, updated_at)
        VALUES (${userId}, ${newUsername}, ${newEmail}, ${passwordHash}, 'admin', datetime('now'), datetime('now'))
      `);
    }
    
    res.json({ 
      success: true, 
      message: 'Admin credentials updated successfully!',
      username: newUsername,
      password: newPassword,
      email: newEmail
    });
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ error: 'Setup failed', details: error.message });
  }
});

// Mount the API routes
app.use("/api", router);

// Catch-all for client-side routing
app.use(express.static("client/dist"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 5001;

export function startServer(): Promise<Server> {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting server...');
    console.log(`📡 Port: ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    
    const httpServer = createServer(app);
    httpServer.listen(PORT, () => {
      console.log(`✅ Server listening on port ${PORT}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
      resolve(httpServer);
    });

    httpServer.on("error", (err: any) => {
      console.error(`❌ Server error: ${err.message}`);
      reject(err);
    });
  });
}

// Start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export { app };
