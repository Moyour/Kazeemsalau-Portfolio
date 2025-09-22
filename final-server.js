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

// Ensure admin user exists
ensureAdminExists();

// Ensure sample projects exist
async function ensureSampleProjects() {
  try {
    if (!db) return;
    
    const existingProjects = await db.all(sql`SELECT * FROM projects LIMIT 1`);
    
    if (existingProjects.length === 0) {
      console.log('🔧 No projects found, creating sample projects...');
      
      const sampleProjects = [
        {
          id: crypto.randomUUID(),
          title: "Emotional Intelligence",
          description: "This course focuses on developing emotional intelligence, helping learners understand, manage, and leverage their emotions effectively. It emphasizes the connection between emotional awareness and better decision-making, resilience under pressure, and achieving meaningful success beyond technical skills or knowledge.",
          long_description: "This comprehensive course covers all aspects of emotional intelligence including self-awareness, self-regulation, motivation, empathy, and social skills. Participants will explore real-life scenarios that strengthen their ability to respond thoughtfully and confidently in both personal and professional contexts.",
          category: "corporate",
          tools: JSON.stringify(["Articulate Storyline", "Adobe Creative Suite"]),
          image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
          case_study_url: "",
          scorm_url: "https://codvacreatives.com/demo/ei/story_html5.html",
          demo_url: "",
          featured: 0,
          challenge: "Many individuals struggle to recognize and regulate their emotions, especially in high-pressure situations, which can lead to poor decisions, strained relationships, and missed opportunities.",
          solution: "The course offers practical strategies, tools, and exercises to enhance emotional intelligence through interactive scenarios, reflective exercises, and guided insights.",
          process: "Learners progress through structured modules that combine theory with practical application, including understanding emotions, practicing self-awareness, and engaging in scenario-based exercises.",
          results: "Participants gain heightened emotional awareness, improved decision-making skills, and the ability to manage stress and interpersonal dynamics effectively."
        },
        {
          id: crypto.randomUUID(),
          title: "The Fixer",
          description: "This training is designed as a special assignment where you step into the role of 'The Fixer,' tasked with addressing critical knowledge gaps in agency policy. Through immersive, scenario-based learning, you will sharpen decision-making skills, collaborate with colleagues, and apply policy knowledge to restore service delivery and boost organizational performance.",
          long_description: "An interactive problem-solving course that puts you in the role of the key problem solver, leveraging your insight, professionalism, and decision-making ability to close policy gaps and rebuild confidence in agency operations.",
          category: "elearning",
          tools: JSON.stringify(["Storyline", "Illustration", "Scenario Design"]),
          image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
          case_study_url: "",
          scorm_url: "https://codvacreatives.com/demo/fixer/story_html5.html",
          demo_url: "",
          featured: 0,
          challenge: "Despite strong skills and reputation for excellence, recent downturns in service delivery have revealed significant policy knowledge gaps within the agency.",
          solution: "The program positions you as the key problem solver, leveraging your insight and decision-making ability to close policy gaps through practical tasks and collaboration exercises.",
          process: "Participants are guided through real-world challenges simulating agency operations, with each scenario demanding careful application of policy knowledge and strategic thinking.",
          results: "By completing the assignment, you reinforce your reputation as 'The Fixer' while the agency benefits from improved service delivery and stronger compliance."
        },
        {
          id: crypto.randomUUID(),
          title: "Business Writing",
          description: "Strong business writing is more than putting words on a page — it's about influencing decisions, building credibility, and communicating with clarity. This course is designed to help professionals at all levels master the fundamentals of business writing, from crafting concise emails to developing persuasive reports.",
          long_description: "A comprehensive course covering all aspects of professional business communication, from emails to reports, proposals, and executive summaries. You'll learn techniques for editing and refining your drafts to eliminate errors and enhance professionalism.",
          category: "corporate",
          tools: JSON.stringify(["Articulate Storyline", "Content Design"]),
          image_url: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop",
          case_study_url: "",
          scorm_url: "https://codvacreatives.com/demo/Businesswriting/story_html5.html",
          demo_url: "",
          featured: 1,
          challenge: "In today's fast-paced business environment, unclear or poorly written communication can cause misunderstandings, delays, and even damage professional relationships.",
          solution: "Our Business Writing course equips you with the tools and strategies to overcome these challenges, teaching you how to plan, structure, and refine your writing for maximum impact.",
          process: "This course takes you through a step-by-step journey to transform your writing, beginning with the foundations of effective communication and progressing to persuasive writing strategies.",
          results: "By the end of the course, you'll be able to write with confidence and precision in any business setting, projecting greater professionalism and enhancing your credibility."
        }
      ];
      
      for (const project of sampleProjects) {
        await db.run(sql`
          INSERT INTO projects (
            id, title, description, long_description, category, tools, image_url, 
            case_study_url, scorm_url, demo_url, featured, challenge, solution, 
            process, results, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `, [
          project.id, project.title, project.description, project.long_description,
          project.category, project.tools, project.image_url, project.case_study_url,
          project.scorm_url, project.demo_url, project.featured, project.challenge,
          project.solution, project.process, project.results
        ]);
      }
      
      console.log('✅ Sample projects created successfully!');
    } else {
      console.log('✅ Projects already exist');
    }
  } catch (error) {
    console.error('❌ Error ensuring sample projects:', error);
  }
}

// Ensure sample projects exist
ensureSampleProjects();

// Auto-create admin user on startup
async function ensureAdminExists() {
  try {
    if (!db) return;
    
    const existingAdmin = await db.all(sql`SELECT * FROM users WHERE role = 'admin' LIMIT 1`);
    
    if (existingAdmin.length === 0) {
      console.log('🔧 No admin user found, creating default admin...');
      const username = 'kazeemsalau';
      const email = 'kaspersalau@gmail.com';
      const password = '911Porsche@!';
      const passwordHash = await bcrypt.hash(password, 10);
      const userId = crypto.randomUUID();
      
      await db.run(sql`
        INSERT INTO users (id, username, email, password_hash, role, created_at, updated_at)
        VALUES (${userId}, ${username}, ${email}, ${passwordHash}, 'admin', datetime('now'), datetime('now'))
      `);
      
      console.log('✅ Default admin user created successfully!');
    } else {
      console.log('✅ Admin user exists');
    }
  } catch (error) {
    console.error('❌ Error ensuring admin exists:', error);
  }
}

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

// Update admin password endpoint
app.post('/api/update-admin', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Username, password, and email are required' });
    }
    
    const passwordHash = await bcrypt.hash(password, 12);
    
    // Check if admin exists
    const existingAdmin = await db.all(sql`SELECT id FROM users WHERE role = 'admin'`);
    
    if (existingAdmin.length > 0) {
      // Update existing admin
      await db.run(sql`
        UPDATE users 
        SET username = ${username}, 
            email = ${email}, 
            password_hash = ${passwordHash}
        WHERE role = 'admin'
      `);
    } else {
      // Create new admin
      const userId = crypto.randomUUID();
      await db.run(sql`
        INSERT INTO users (id, username, email, password_hash, role, created_at, updated_at)
        VALUES (${userId}, ${username}, ${email}, ${passwordHash}, 'admin', datetime('now'), datetime('now'))
      `);
    }
    
    res.json({
      success: true,
      message: 'Admin credentials updated successfully!',
      username,
      email
    });
    
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({ error: 'Failed to update admin credentials' });
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
    
    // Ensure tools field is always an array and map field names to match schema
    const projectsWithArrayTools = projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      longDescription: project.long_description,
      category: project.category,
      tools: typeof project.tools === 'string' ? JSON.parse(project.tools) : project.tools,
      imageUrl: project.image_url,
      caseStudyUrl: project.case_study_url,
      scormUrl: project.scorm_url,
      demoUrl: project.demo_url,
      featured: Boolean(project.featured),
      challenge: project.challenge,
      solution: project.solution,
      process: project.process,
      results: project.results,
      createdAt: project.created_at
    }));
    
    res.json(projectsWithArrayTools);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Add project endpoint
app.post('/api/add-project', async (req, res) => {
  try {
    const project = req.body;
    
    if (!project.title || !project.description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    // Ensure tools is a string for database storage
    const toolsString = typeof project.tools === 'string' ? project.tools : JSON.stringify(project.tools);
    
    await db.run(sql`
      INSERT OR REPLACE INTO projects (
        id, title, description, long_description, category, tools, 
        image_url, case_study_url, scorm_url, demo_url, featured,
        challenge, solution, process, results, created_at
      ) VALUES (
        ${project.id}, ${project.title}, ${project.description}, ${project.long_description},
        ${project.category}, ${toolsString}, ${project.image_url}, ${project.case_study_url},
        ${project.scorm_url}, ${project.demo_url}, ${project.featured}, ${project.challenge},
        ${project.solution}, ${project.process}, ${project.results}, datetime('now')
      )
    `);
    
    res.json({
      success: true,
      message: 'Project added successfully!',
      project: {
        id: project.id,
        title: project.title,
        image_url: project.image_url
      }
    });
    
  } catch (error) {
    console.error('Add project error:', error);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

// Update project image endpoint
app.post('/api/update-project-image', async (req, res) => {
  try {
    const { title, image_url } = req.body;
    
    if (!title || !image_url) {
      return res.status(400).json({ error: 'Title and image_url are required' });
    }
    
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    await db.run(sql`
      UPDATE projects 
      SET image_url = ${image_url}
      WHERE title = ${title}
    `);
    
    res.json({
      success: true,
      message: 'Project image updated successfully!',
      title,
      image_url
    });
    
  } catch (error) {
    console.error('Update project image error:', error);
    res.status(500).json({ error: 'Failed to update project image' });
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
    
    // Ensure tools field is always an array and map field names to match schema
    const project = {
      id: projects[0].id,
      title: projects[0].title,
      description: projects[0].description,
      longDescription: projects[0].long_description,
      category: projects[0].category,
      tools: typeof projects[0].tools === 'string' ? JSON.parse(projects[0].tools) : projects[0].tools,
      imageUrl: projects[0].image_url,
      caseStudyUrl: projects[0].case_study_url,
      scormUrl: projects[0].scorm_url,
      demoUrl: projects[0].demo_url,
      featured: Boolean(projects[0].featured),
      challenge: projects[0].challenge,
      solution: projects[0].solution,
      process: projects[0].process,
      results: projects[0].results,
      createdAt: projects[0].created_at
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
    
    const { published } = req.query;
    let query = sql`SELECT * FROM blog_posts`;
    
    if (published === 'true') {
      query = sql`SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC`;
    } else {
      query = sql`SELECT * FROM blog_posts ORDER BY created_at DESC`;
    }
    
    const blogPosts = await db.all(query);
    
    // Map field names to match schema
    const blogPostsWithCorrectFields = blogPosts.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      imageUrl: post.image_url,
      readTime: post.read_time,
      published: Boolean(post.published),
      createdAt: post.created_at,
      updatedAt: post.updated_at
    }));
    
    res.json(blogPostsWithCorrectFields);
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
    
    const posts = await db.all(sql`SELECT * FROM blog_posts WHERE id = ?`, [id]);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    // Map field names to match schema
    const blogPost = {
      id: posts[0].id,
      title: posts[0].title,
      excerpt: posts[0].excerpt,
      content: posts[0].content,
      category: posts[0].category,
      imageUrl: posts[0].image_url,
      readTime: posts[0].read_time,
      published: Boolean(posts[0].published),
      createdAt: posts[0].created_at,
      updatedAt: posts[0].updated_at
    };
    
    res.json(blogPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// Database initialization endpoint
app.post('/api/init-db', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    // Create blog_posts table if it doesn't exist
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        category TEXT,
        image_url TEXT,
        read_time TEXT,
        published INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create contact_submissions table if it doesn't exist
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        project_type TEXT,
        message TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Blog posts table created/verified');
    console.log('✅ Contact submissions table created/verified');
    
    res.json({ 
      success: true, 
      message: 'Database initialized successfully!',
      tables: ['projects', 'blog_posts', 'contact_submissions']
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ error: 'Failed to initialize database' });
  }
});

// Add blog post endpoint
app.post('/api/add-blog', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    const { id, title, excerpt, content, category, imageUrl, readTime, published } = req.body;
    
    await db.run(sql`
      INSERT OR REPLACE INTO blog_posts (
        id, title, excerpt, content, category, image_url, read_time, published, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `, [
      id, title, excerpt, content, category, imageUrl, readTime, published ? 1 : 0
    ]);
    
    res.json({ 
      success: true, 
      message: 'Blog post added successfully!',
      blogPost: { id, title, image_url: imageUrl }
    });
  } catch (error) {
    console.error('Error adding blog post:', error);
    res.status(500).json({ error: 'Failed to add blog post' });
  }
});

// Workaround endpoint: Get blog posts from projects (for Railway)
app.get('/api/blog-posts-workaround', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    // Get projects that could be displayed as blog posts
    const projects = await db.all(sql`SELECT * FROM projects ORDER BY created_at DESC`);
    
    // Convert projects to blog post format
    const blogPosts = projects.map(project => ({
      id: project.id,
      title: project.title,
      excerpt: project.description,
      content: project.long_description || project.description,
      category: project.category,
      imageUrl: project.image_url,
      readTime: '5 min read', // Default read time
      published: true,
      createdAt: project.created_at,
      updatedAt: project.created_at
    }));
    
    res.json(blogPosts);
  } catch (error) {
    console.error('Error fetching blog posts workaround:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Contact submission endpoint
app.post('/api/contact-submissions', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    const { firstName, lastName, email, projectType, message } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Insert contact submission
    const submissionId = crypto.randomUUID();
    await db.run(sql`
      INSERT INTO contact_submissions (
        id, first_name, last_name, email, project_type, message, created_at
      ) VALUES (${submissionId}, ${firstName}, ${lastName}, ${email}, ${projectType || 'Other'}, ${message}, datetime('now'))
    `);
    
    res.json({ 
      success: true, 
      message: 'Contact submission received successfully!' 
    });
  } catch (error) {
    console.error('Error creating contact submission:', error);
    res.status(500).json({ error: 'Failed to create contact submission' });
  }
});

// Get contact submissions endpoint (for admin)
app.get('/api/contact-submissions', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    const submissions = await db.all(sql`SELECT * FROM contact_submissions ORDER BY created_at DESC`);
    
    // Map field names to match schema
    const submissionsWithCorrectFields = submissions.map(submission => ({
      id: submission.id,
      firstName: submission.first_name,
      lastName: submission.last_name,
      email: submission.email,
      projectType: submission.project_type,
      message: submission.message,
      createdAt: submission.created_at
    }));
    
    res.json(submissionsWithCorrectFields);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

// Force create sample projects endpoint
app.post('/api/create-sample-projects', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }
    
    // Clear existing projects first
    await db.run(sql`DELETE FROM projects`);
    
    const sampleProjects = [
      {
        id: crypto.randomUUID(),
        title: "Emotional Intelligence",
        description: "This course focuses on developing emotional intelligence, helping learners understand, manage, and leverage their emotions effectively. It emphasizes the connection between emotional awareness and better decision-making, resilience under pressure, and achieving meaningful success beyond technical skills or knowledge.",
        long_description: "This comprehensive course covers all aspects of emotional intelligence including self-awareness, self-regulation, motivation, empathy, and social skills. Participants will explore real-life scenarios that strengthen their ability to respond thoughtfully and confidently in both personal and professional contexts.",
        category: "corporate",
        tools: JSON.stringify(["Articulate Storyline", "Adobe Creative Suite"]),
        image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
        case_study_url: "",
        scorm_url: "https://codvacreatives.com/demo/ei/story_html5.html",
        demo_url: "",
        featured: 0,
        challenge: "Many individuals struggle to recognize and regulate their emotions, especially in high-pressure situations, which can lead to poor decisions, strained relationships, and missed opportunities.",
        solution: "The course offers practical strategies, tools, and exercises to enhance emotional intelligence through interactive scenarios, reflective exercises, and guided insights.",
        process: "Learners progress through structured modules that combine theory with practical application, including understanding emotions, practicing self-awareness, and engaging in scenario-based exercises.",
        results: "Participants gain heightened emotional awareness, improved decision-making skills, and the ability to manage stress and interpersonal dynamics effectively."
      },
      {
        id: crypto.randomUUID(),
        title: "The Fixer",
        description: "This training is designed as a special assignment where you step into the role of 'The Fixer,' tasked with addressing critical knowledge gaps in agency policy. Through immersive, scenario-based learning, you will sharpen decision-making skills, collaborate with colleagues, and apply policy knowledge to restore service delivery and boost organizational performance.",
        long_description: "An interactive problem-solving course that puts you in the role of the key problem solver, leveraging your insight, professionalism, and decision-making ability to close policy gaps and rebuild confidence in agency operations.",
        category: "elearning",
        tools: JSON.stringify(["Storyline", "Illustration", "Scenario Design"]),
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        case_study_url: "",
        scorm_url: "https://codvacreatives.com/demo/fixer/story_html5.html",
        demo_url: "",
        featured: 0,
        challenge: "Despite strong skills and reputation for excellence, recent downturns in service delivery have revealed significant policy knowledge gaps within the agency.",
        solution: "The program positions you as the key problem solver, leveraging your insight and decision-making ability to close policy gaps through practical tasks and collaboration exercises.",
        process: "Participants are guided through real-world challenges simulating agency operations, with each scenario demanding careful application of policy knowledge and strategic thinking.",
        results: "By completing the assignment, you reinforce your reputation as 'The Fixer' while the agency benefits from improved service delivery and stronger compliance."
      },
      {
        id: crypto.randomUUID(),
        title: "Business Writing",
        description: "Strong business writing is more than putting words on a page — it's about influencing decisions, building credibility, and communicating with clarity. This course is designed to help professionals at all levels master the fundamentals of business writing, from crafting concise emails to developing persuasive reports.",
        long_description: "A comprehensive course covering all aspects of professional business communication, from emails to reports, proposals, and executive summaries. You'll learn techniques for editing and refining your drafts to eliminate errors and enhance professionalism.",
        category: "corporate",
        tools: JSON.stringify(["Articulate Storyline", "Content Design"]),
        image_url: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop",
        case_study_url: "",
        scorm_url: "https://codvacreatives.com/demo/Businesswriting/story_html5.html",
        demo_url: "",
        featured: 1,
        challenge: "In today's fast-paced business environment, unclear or poorly written communication can cause misunderstandings, delays, and even damage professional relationships.",
        solution: "Our Business Writing course equips you with the tools and strategies to overcome these challenges, teaching you how to plan, structure, and refine your writing for maximum impact.",
        process: "This course takes you through a step-by-step journey to transform your writing, beginning with the foundations of effective communication and progressing to persuasive writing strategies.",
        results: "By the end of the course, you'll be able to write with confidence and precision in any business setting, projecting greater professionalism and enhancing your credibility."
      }
    ];
    
    for (const project of sampleProjects) {
      await db.run(sql`
        INSERT INTO projects (
          id, title, description, long_description, category, tools, image_url, 
          case_study_url, scorm_url, demo_url, featured, challenge, solution, 
          process, results, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `, [
        project.id, project.title, project.description, project.long_description,
        project.category, project.tools, project.image_url, project.case_study_url,
        project.scorm_url, project.demo_url, project.featured, project.challenge,
        project.solution, project.process, project.results
      ]);
    }
    
    res.json({ 
      success: true, 
      message: 'Sample projects created successfully!',
      count: sampleProjects.length
    });
  } catch (error) {
    console.error('Error creating sample projects:', error);
    res.status(500).json({ error: 'Failed to create sample projects' });
  }
});

// Serve uploads folder for images (specific route before catch-all)
app.use('/uploads', express.static('uploads'));

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
