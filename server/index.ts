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

// Initialize database directly
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

let db;
let storage;

try {
  const dbPath = process.env.SQLITE_DATABASE_PATH || './sqlite.db';
  console.log('🔍 Connecting to database:', dbPath);
  
  const sqlite = new Database(dbPath);
  db = drizzle(sqlite);
  
  // Initialize storage with direct database connection
  storage = new Storage();
  setupGoogleAuth(storage);
  
  console.log('✅ Database initialized successfully');
} catch (error) {
  console.error('❌ Database initialization failed:', error);
  
  // Create a fallback database connection
  try {
    const dbPath = './sqlite.db';
    const sqlite = new Database(dbPath);
    db = drizzle(sqlite);
    console.log('✅ Fallback database initialized');
  } catch (fallbackError) {
    console.error('❌ Fallback database failed:', fallbackError);
    db = null;
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
    
    // Check if database is properly initialized
    if (!db) {
      return res.status(500).json({ 
        error: 'Database not initialized', 
        details: 'Database connection failed' 
      });
    }
    
    // Check if admin exists
    const existingAdmin = await db.all(sql`
      SELECT id, username, email, role FROM users WHERE role = 'admin'
    `);
    
    if (existingAdmin.length > 0) {
      // Update existing admin
      await db.run(sql`
        UPDATE users 
        SET username = ${newUsername}, 
            email = ${newEmail}, 
            password_hash = ${passwordHash}
        WHERE role = 'admin'
      `);
    } else {
      // Create new admin
      const userId = crypto.randomUUID();
      await db.run(sql`
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

// Data import route for Railway
app.post("/api/import-data", async (req, res) => {
  try {
    const { blog_posts, projects, testimonials } = req.body;
    
    if (!db) {
      return res.status(500).json({ 
        error: 'Database not initialized', 
        details: 'Database connection failed' 
      });
    }
    
    let importedCount = 0;
    
    // Import blog posts
    if (blog_posts && blog_posts.length > 0) {
      for (const post of blog_posts) {
        try {
          await db.run(sql`
            INSERT OR REPLACE INTO blog_posts 
            (id, title, excerpt, content, category, image_url, read_time, published, created_at, updated_at)
            VALUES (${post.id}, ${post.title}, ${post.excerpt}, ${post.content}, ${post.category}, ${post.image_url}, ${post.read_time}, ${post.published}, ${post.created_at}, ${post.updated_at})
          `);
          importedCount++;
        } catch (error) {
          console.error('Error importing blog post:', post.title, error);
        }
      }
    }
    
    // Import projects
    if (projects && projects.length > 0) {
      for (const project of projects) {
        try {
          await db.run(sql`
            INSERT OR REPLACE INTO projects 
            (id, title, description, long_description, category, tools, image_url, case_study_url, scorm_url, demo_url, featured, challenge, solution, process, results, created_at)
            VALUES (${project.id}, ${project.title}, ${project.description}, ${project.long_description}, ${project.category}, ${project.tools}, ${project.image_url}, ${project.case_study_url}, ${project.scorm_url}, ${project.demo_url}, ${project.featured}, ${project.challenge}, ${project.solution}, ${project.process}, ${project.results}, ${project.created_at})
          `);
          importedCount++;
        } catch (error) {
          console.error('Error importing project:', project.title, error);
        }
      }
    }
    
    // Import testimonials
    if (testimonials && testimonials.length > 0) {
      for (const testimonial of testimonials) {
        try {
          await db.run(sql`
            INSERT OR REPLACE INTO testimonials 
            (id, name, role, company, content, avatar_url, rating, featured)
            VALUES (${testimonial.id}, ${testimonial.name}, ${testimonial.role}, ${testimonial.company}, ${testimonial.content}, ${testimonial.avatar_url}, ${testimonial.rating}, ${testimonial.featured})
          `);
          importedCount++;
        } catch (error) {
          console.error('Error importing testimonial:', testimonial.name, error);
        }
      }
    }
    
    res.json({ 
      success: true, 
      message: `Data imported successfully! ${importedCount} records imported.`,
      imported: {
        blog_posts: blog_posts?.length || 0,
        projects: projects?.length || 0,
        testimonials: testimonials?.length || 0
      }
    });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ error: 'Import failed', details: error.message });
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
