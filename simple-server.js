import express from 'express';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// Initialize database
let db;
try {
  // Try different database paths
  const dbPaths = [
    process.env.SQLITE_DATABASE_PATH,
    './sqlite.db',
    '/tmp/sqlite.db',
    ':memory:'
  ];
  
  let sqlite = null;
  let dbPath = null;
  
  for (const path of dbPaths) {
    if (path) {
      try {
        console.log('🔍 Trying database path:', path);
        sqlite = new Database(path);
        dbPath = path;
        break;
      } catch (error) {
        console.log('❌ Failed to create database at:', path, error.message);
      }
    }
  }
  
  if (!sqlite) {
    throw new Error('Could not create database at any path');
  }
  
  console.log('✅ Database created at:', dbPath);
  db = drizzle(sqlite);
  
  // Create tables
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT,
      read_time TEXT,
      published INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      long_description TEXT,
      category TEXT NOT NULL,
      tools TEXT DEFAULT '[]',
      image_url TEXT,
      case_study_url TEXT,
      scorm_url TEXT,
      demo_url TEXT,
      featured INTEGER DEFAULT 0,
      challenge TEXT,
      solution TEXT,
      process TEXT,
      results TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  console.log('✅ Database initialized successfully');
} catch (error) {
  console.error('❌ Database initialization failed:', error);
  db = null;
}

// Routes
app.get('/test', (req, res) => {
  res.json({ message: 'Simple server is working!', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/db-test', (req, res) => {
  if (!db) {
    return res.status(500).json({ error: 'Database not initialized' });
  }
  
  try {
    const result = db.all(sql`SELECT 1 as test`);
    res.json({ success: true, message: 'Database is working!', test: result });
  } catch (error) {
    res.status(500).json({ error: 'Database test failed', details: error.message });
  }
});

app.get('/api/setup-admin', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    const newUsername = 'kazeemsalau';
    const newPassword = 'Porsche6704@!';
    const newEmail = 'kaspersalau@gmail.com';
    
    const passwordHash = await bcrypt.hash(newPassword, 12);
    
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

app.post('/api/import-data', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    const { blog_posts, projects, testimonials } = req.body;
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

// Serve static files
app.use(express.static("client/dist"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Simple server listening on port ${PORT}`);
  console.log(`🌐 Test: http://localhost:${PORT}/test`);
  console.log(`🔍 DB Test: http://localhost:${PORT}/api/db-test`);
});
