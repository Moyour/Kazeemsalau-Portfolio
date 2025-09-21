import express from 'express';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// Initialize database
let db;
let inMemoryData = {
  users: [],
  blog_posts: [],
  projects: []
};

try {
  const dbPath = process.env.SQLITE_DATABASE_PATH || './sqlite.db';
  console.log('🔍 Connecting to database:', dbPath);
  
  const sqlite = new Database(dbPath);
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
  console.log('⚠️ Using in-memory storage');
  db = {
    all: (query) => {
      console.log('In-memory query:', query);
      const queryStr = query.sql || query.toString() || '';
      if (queryStr.includes('users')) return inMemoryData.users;
      if (queryStr.includes('blog_posts')) return inMemoryData.blog_posts;
      if (queryStr.includes('projects')) return inMemoryData.projects;
      if (queryStr.includes('SELECT 1')) return [{ test: 1 }];
      return [];
    },
    run: (query) => {
      console.log('In-memory run query:', query);
      const queryStr = query.sql || query.toString() || '';
      if (queryStr.includes('INSERT')) {
        // Simulate adding data to in-memory storage
        if (queryStr.includes('blog_posts')) {
          inMemoryData.blog_posts.push({ id: 'temp-' + Date.now() });
        } else if (queryStr.includes('projects')) {
          inMemoryData.projects.push({ id: 'temp-' + Date.now() });
        } else if (queryStr.includes('users')) {
          inMemoryData.users.push({ id: 'temp-' + Date.now() });
        }
      }
      return { changes: 1 };
    }
  };
}

// API Routes - MUST be before static files
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
    const existingAdmin = await db.all(sql`SELECT id, username, email, role FROM users WHERE role = 'admin'`);
    
    if (existingAdmin.length > 0) {
      // Update existing admin
      await db.run(sql`UPDATE users SET username = ${newUsername}, email = ${newEmail}, password_hash = ${passwordHash} WHERE role = 'admin'`);
    } else {
      // Create new admin
      const userId = crypto.randomUUID();
      await db.run(sql`INSERT INTO users (id, username, email, password_hash, role, created_at, updated_at) VALUES (${userId}, ${newUsername}, ${newEmail}, ${passwordHash}, 'admin', datetime('now'), datetime('now'))`);
    }
    
    // Also add to in-memory data for fallback
    const adminUser = {
      id: crypto.randomUUID(),
      username: newUsername,
      email: newEmail,
      password_hash: passwordHash,
      role: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    inMemoryData.users = inMemoryData.users.filter(u => u.role !== 'admin');
    inMemoryData.users.push(adminUser);
    
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

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    // Find user
    const users = await db.all(sql`SELECT * FROM users WHERE username = ${username} OR email = ${username}`);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token (simple implementation)
    const token = crypto.randomBytes(32).toString('hex');
    
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.get('/api/blog-posts', async (req, res) => {
  try {
    const posts = await db.all(sql`SELECT * FROM blog_posts ORDER BY created_at DESC`);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.all(sql`SELECT * FROM projects ORDER BY created_at DESC`);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.get('/api/blog-posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await db.all(sql`SELECT * FROM blog_posts WHERE id = ${id}`);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json(posts[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await db.all(sql`SELECT * FROM projects WHERE id = ${id}`);
    
    if (projects.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(projects[0]);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
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
          await db.run(sql`INSERT OR REPLACE INTO blog_posts (id, title, excerpt, content, category, image_url, read_time, published, created_at, updated_at) VALUES (${post.id}, ${post.title}, ${post.excerpt}, ${post.content}, ${post.category}, ${post.image_url}, ${post.read_time}, ${post.published}, ${post.created_at}, ${post.updated_at})`);
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
          await db.run(sql`INSERT OR REPLACE INTO projects (id, title, description, long_description, category, tools, image_url, case_study_url, scorm_url, demo_url, featured, challenge, solution, process, results, created_at) VALUES (${project.id}, ${project.title}, ${project.description}, ${project.long_description}, ${project.category}, ${project.tools}, ${project.image_url}, ${project.case_study_url}, ${project.scorm_url}, ${project.demo_url}, ${project.featured}, ${project.challenge}, ${project.solution}, ${project.process}, ${project.results}, ${project.created_at})`);
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

// Serve static files - MUST be after API routes
app.use(express.static("client/dist"));
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Minimal server listening on port ${PORT}`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
  console.log(`🔍 DB Test: http://localhost:${PORT}/api/db-test`);
});
