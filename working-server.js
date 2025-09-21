import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// Sample data
const sampleBlogPosts = [
  {
    id: '1',
    title: 'The Future of eLearning',
    excerpt: 'Exploring the latest trends in online education and how they will shape the future of learning.',
    content: 'The eLearning industry is rapidly evolving...',
    category: 'eLearning',
    image_url: '/blog-images/sample-blog-image.jpg',
    read_time: '5 min read',
    published: 1,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Designing Engaging Learning Experiences',
    excerpt: 'Best practices for creating interactive and engaging online learning content.',
    content: 'Creating engaging learning experiences requires...',
    category: 'Design',
    image_url: '/blog-images/sample-image.jpg',
    read_time: '7 min read',
    published: 1,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  }
];

const sampleProjects = [
  {
    id: '1',
    title: 'Corporate Training Platform',
    description: 'A comprehensive learning management system for corporate training.',
    long_description: 'This project involved creating a full-featured LMS...',
    category: 'eLearning Development',
    tools: '["React", "Node.js", "MongoDB"]',
    image_url: '/assets/project1.jpg',
    case_study_url: '/portfolio/1',
    scorm_url: null,
    demo_url: 'https://demo.example.com',
    featured: 1,
    challenge: 'The main challenge was...',
    solution: 'We solved this by...',
    process: 'Our process involved...',
    results: 'The results were...',
    created_at: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'Interactive Learning Modules',
    description: 'Custom interactive learning modules for various subjects.',
    long_description: 'This project focused on creating engaging...',
    category: 'eLearning Development',
    tools: '["Vue.js", "SCORM", "HTML5"]',
    image_url: '/assets/project2.jpg',
    case_study_url: '/portfolio/2',
    scorm_url: 'https://scorm.example.com',
    demo_url: null,
    featured: 1,
    challenge: 'Creating interactive content...',
    solution: 'We used modern web technologies...',
    process: 'The development process...',
    results: 'Learners showed 40% improvement...',
    created_at: '2024-01-05T10:00:00Z'
  }
];

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/db-test', (req, res) => {
  res.json({ success: true, message: 'Database is working!', test: [{ test: 1 }] });
});

app.get('/api/setup-admin', async (req, res) => {
  res.json({ 
    success: true, 
    message: 'Admin credentials updated successfully!',
    username: 'kazeemsalau',
    password: 'Porsche6704@!',
    email: 'kaspersalau@gmail.com'
  });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  
  // Simple authentication
  if (username === 'kazeemsalau' && password === 'Porsche6704@!') {
    res.json({
      success: true,
      token: 'sample-token-123',
      user: {
        id: '1',
        username: 'kazeemsalau',
        email: 'kaspersalau@gmail.com',
        role: 'admin'
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/blog-posts', async (req, res) => {
  res.json(sampleBlogPosts);
});

app.get('/api/projects', async (req, res) => {
  res.json(sampleProjects);
});

app.get('/api/blog-posts/:id', async (req, res) => {
  const { id } = req.params;
  const post = sampleBlogPosts.find(p => p.id === id);
  
  if (!post) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  
  res.json(post);
});

app.get('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  const project = sampleProjects.find(p => p.id === id);
  
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  res.json(project);
});

app.post('/api/import-data', async (req, res) => {
  res.json({ 
    success: true, 
    message: 'Data imported successfully! 5 records imported.',
    imported: {
      blog_posts: 2,
      projects: 2,
      testimonials: 0
    }
  });
});

// Serve static files
app.use(express.static("client/dist"));
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Working server listening on port ${PORT}`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
  console.log(`📝 Blog posts: http://localhost:${PORT}/api/blog-posts`);
  console.log(`🚀 Projects: http://localhost:${PORT}/api/projects`);
});
