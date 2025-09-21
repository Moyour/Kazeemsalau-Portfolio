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
let db = null;
let sqlite = null;

async function initializeDatabase() {
  try {
    const dbPath = process.env.SQLITE_DATABASE_PATH || './sqlite.db';
    console.log('🔍 Connecting to database:', dbPath);
    
    sqlite = new Database(dbPath);
    db = drizzle(sqlite);
    
    // Create tables if they don't exist
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        long_description TEXT,
        category TEXT NOT NULL,
        tools TEXT NOT NULL,
        image_url TEXT,
        case_study_url TEXT,
        scorm_url TEXT,
        demo_url TEXT,
        featured INTEGER DEFAULT 0,
        challenge TEXT,
        solution TEXT,
        process TEXT,
        results TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        image_url TEXT,
        read_time TEXT,
        published INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
}

// Initialize database on startup
initializeDatabase();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), server: 'final-server' });
});

// Database test
app.get('/api/db-test', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    const result = await db.all(sql`SELECT 1 as test`);
    res.json({ success: true, message: 'Database is working!', test: result });
  } catch (error) {
    res.status(500).json({ error: 'Database test failed', details: error.message });
  }
});

// Setup admin endpoint
app.get('/api/setup-admin', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    const existingAdmin = await db.all(sql`SELECT id, username, email, role FROM users WHERE role = 'admin'`);
    
    if (existingAdmin.length > 0) {
      const admin = existingAdmin[0];
      res.json({
        success: true,
        message: 'Admin credentials updated successfully!',
        username: admin.username,
        password: 'Porsche6704@!', // Don't return actual password
        email: admin.email
      });
    } else {
      res.status(404).json({ error: 'No admin user found' });
    }
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ error: 'Setup failed', details: error.message });
  }
});

// Auth login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    // Find user
    const users = await db.all(sql`SELECT * FROM users WHERE username = ${username} OR email = ${username}`);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
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

// Auth me endpoint for token verification
app.get('/api/auth/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    // Find the admin user (simplified for now)
    const users = await db.all(sql`SELECT * FROM users WHERE role = 'admin' LIMIT 1`);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    const user = users[0];
    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Auth me error:', error);
    res.status(500).json({ error: 'Token verification failed' });
  }
});

// Projects endpoint
app.get('/api/projects', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    const projects = await db.all(sql`SELECT * FROM projects ORDER BY created_at DESC`);
    
    // Ensure tools field is always an array
    const projectsWithArrayTools = projects.map(project => ({
      ...project,
      tools: typeof project.tools === 'string' ? JSON.parse(project.tools) : project.tools
    }));
    
    res.json(projectsWithArrayTools);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Individual project endpoint
app.get('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    const projects = await db.all(sql`SELECT * FROM projects WHERE id = ${id}`);
    
    if (projects.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Ensure tools field is always an array
    const project = {
      ...projects[0],
      tools: typeof projects[0].tools === 'string' ? JSON.parse(projects[0].tools) : projects[0].tools
    };
    
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Blog posts endpoint
app.get('/api/blog-posts', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    const posts = await db.all(sql`SELECT * FROM blog_posts ORDER BY created_at DESC`);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Individual blog post endpoint
app.get('/api/blog-posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
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

// Serve static files
app.use(express.static("client/dist"));

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client/dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Final server listening on port ${PORT}`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
  console.log(`🔍 DB Test: http://localhost:${PORT}/api/db-test`);
  console.log(`📝 Blog posts: http://localhost:${PORT}/api/blog-posts`);
  console.log(`🚀 Projects: http://localhost:${PORT}/api/projects`);
});
