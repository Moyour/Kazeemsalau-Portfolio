import { Router } from "express";
import { db } from "./db";
import { Storage, type InsertProject, type Project, type InsertBlogPost, type BlogPost, type InsertTestimonial, type Testimonial, type InsertContact, type ContactSubmission, type InsertResume, type Resume, type InsertUser } from "./storage";
import { randomUUID } from "node:crypto";
import multer from "multer";
import path from "path";
import fs from "fs";
import { authenticateToken, requireAdmin, loginUser, hashPassword, AuthRequest, generateToken, sessionTimeout } from "./auth";
import { setupGoogleAuth, passport, GOOGLE_AUTH_ENABLED } from "./googleAuth";
import { sendContactNotification } from "./emailService";

const storage = new Storage();

const router = Router();

// Health check endpoint for Render
router.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Helper function for admin routes with session timeout
const adminRoute = [authenticateToken, sessionTimeout, requireAdmin];

// Authentication Routes
router.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const result = await loginUser(username, password, storage);
    if (!result) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
      user: {
        id: result.user.id,
        username: result.user.username,
        email: result.user.email,
        role: result.user.role,
      },
      token: result.token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/auth/register", async (req, res) => {
  try {
    const { username, email, password, role = 'user' } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required" });
    }

    // Check if user already exists
    const existingUser = await storage.getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const existingEmail = await storage.getUserByEmail(email);
    if (existingEmail) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password);
    const newUser: InsertUser = {
      username,
      email,
      passwordHash,
      role: role as 'admin' | 'user',
    };

    const user = await storage.createUser(newUser);
    
    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/auth/me", authenticateToken, (req: AuthRequest, res) => {
  res.json({
    user: {
      id: req.user!.id,
      username: req.user!.username,
      role: req.user!.role,
    },
  });
});

// Google OAuth Routes (only if enabled)
if (GOOGLE_AUTH_ENABLED) {
  router.get("/auth/google", passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  router.get("/auth/google/callback", 
    passport.authenticate('google', { failureRedirect: '/login?error=google_auth_failed' }),
    async (req: any, res) => {
      try {
        const user = req.user;
        if (!user) {
          return res.redirect('/login?error=no_user');
        }

        // Generate JWT token
        const token = generateToken(user);
        
        // Redirect to frontend with token
        res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
      } catch (error) {
        console.error('Google OAuth callback error:', error);
        res.redirect('/login?error=server_error');
      }
    }
  );
} else {
  router.get('/auth/google', (_req, res) => res.status(503).json({ error: 'Google OAuth not configured' }));
}

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit for SCORM files
  },
  fileFilter: (req, file, cb) => {
    // Allow common file types for portfolio content
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml',
      'application/zip', 'application/x-zip-compressed', // SCORM files
      'video/mp4', 'video/webm',
      'application/pdf',
      'application/msword', // .doc files
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx files
      'text/plain' // .txt files
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'));
    }
  }
});

// Configure multer specifically for blog images
const blogImageUploadDir = path.join(process.cwd(), "uploads", "blog-images");
if (!fs.existsSync(blogImageUploadDir)) {
  fs.mkdirSync(blogImageUploadDir, { recursive: true });
}

const blogImageUpload = multer({
  dest: blogImageUploadDir,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit for blog images
  },
  fileFilter: (req, file, cb) => {
    // Only allow image files for blog images
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for blog images'));
    }
  }
});

// Project Routes (Protected - Admin only)
router.post("/projects", ...adminRoute, async (req, res) => {
  try {
    const newProject: InsertProject = req.body;
    const createdProject = await storage.createProject(newProject);
    res.status(201).json(createdProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

router.get("/projects", async (req, res) => {
  try {
    const { category, featured } = req.query;
    let projects = await storage.getAllProjects();
    
    // Filter by category
    if (category && typeof category === 'string') {
      projects = projects.filter(project => 
        project.category?.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by featured status
    if (featured !== undefined) {
      const isFeatured = featured === 'true';
      projects = projects.filter(project => project.featured === isFeatured);
    }
    
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

router.get("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await storage.getProjectById(id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

router.put("/projects/:id", ...adminRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProjectData: Partial<InsertProject> = req.body;
    const updatedProject = await storage.updateProject(id, updatedProjectData);
    if (updatedProject) {
      res.json(updatedProject);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

router.delete("/projects/:id", ...adminRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await storage.deleteProject(id);
    if (deleted) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// Blog Post Routes (Protected - Admin only)
router.post("/blog-posts", ...adminRoute, async (req, res) => {
  try {
    const newBlogPost: InsertBlogPost = req.body;
    const createdBlogPost = await storage.createBlogPost(newBlogPost);
    res.status(201).json(createdBlogPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Failed to create blog post" });
  }
});

router.get("/blog-posts", async (req, res) => {
  try {
    const { search, category } = req.query;
    let blogPosts = await storage.getAllBlogPosts();
    
    // Filter by search term
    if (search && typeof search === 'string') {
      const searchTerm = search.toLowerCase();
      blogPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.excerpt?.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by category
    if (category && typeof category === 'string') {
      blogPosts = blogPosts.filter(post => 
        post.category?.toLowerCase() === category.toLowerCase()
      );
    }
    
    res.json(blogPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

router.get("/blog-posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await storage.getBlogPostById(id);
    if (blogPost) {
      // Debug: Blog post data logged (remove in production)
      res.json(blogPost);
    } else {
      res.status(404).json({ error: "Blog post not found" });
    }
  } catch (error) {
    console.error("Error fetching blog post by ID:", error);
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

// RSS Feed for Blog Posts
router.get("/rss.xml", async (req, res) => {
  try {
    const blogPosts = await storage.getAllBlogPosts();
    const publishedPosts = blogPosts.filter(post => post.published);
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kazeem Salau - eLearning Blog</title>
    <description>Professional insights on eLearning development, corporate training, and educational technology</description>
    <link>https://kazeemsalau.com</link>
    <atom:link href="https://kazeemsalau.com/api/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-gb</language>
    <managingEditor>moyoursalau@gmail.com (Kazeem Salau)</managingEditor>
    <webMaster>moyoursalau@gmail.com (Kazeem Salau)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>LearnFlow RSS Generator</generator>
    
    ${publishedPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || post.content.substring(0, 200) + '...'}]]></description>
      <link>https://kazeemsalau.com/blog/${post.id}</link>
      <guid isPermaLink="true">https://kazeemsalau.com/blog/${post.id}</guid>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <category><![CDATA[${post.category || 'eLearning'}]]></category>
    </item>`).join('')}
  </channel>
</rss>`;

    res.set('Content-Type', 'application/rss+xml');
    res.send(rssXml);
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    res.status(500).json({ error: "Failed to generate RSS feed" });
  }
});

// Sitemap Generator
router.get("/sitemap.xml", async (req, res) => {
  try {
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kazeemsalau.com</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://kazeemsalau.com/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://kazeemsalau.com/portfolio</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://kazeemsalau.com/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://kazeemsalau.com/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(sitemapXml);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).json({ error: "Failed to generate sitemap" });
  }
});

router.put("/blog-posts/:id", ...adminRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlogPostData: Partial<InsertBlogPost> = req.body;
    const updatedBlogPost = await storage.updateBlogPost(id, updatedBlogPostData);
    if (updatedBlogPost) {
      res.json(updatedBlogPost);
    } else {
      res.status(404).json({ error: "Blog post not found" });
    }
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Failed to update blog post" });
  }
});

router.delete("/blog-posts/:id", ...adminRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await storage.deleteBlogPost(id);
    if (deleted) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ error: "Blog post not found" });
    }
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Failed to delete blog post" });
  }
});

// Testimonial Routes (Protected - Admin only)
router.post("/testimonials", ...adminRoute, async (req, res) => {
  try {
    const newTestimonial: InsertTestimonial = req.body;
    const createdTestimonial = await storage.createTestimonial(newTestimonial);
    res.status(201).json(createdTestimonial);
  } catch (error) {
    console.error("Error creating testimonial:", error);
    res.status(500).json({ error: "Failed to create testimonial" });
  }
});

router.get("/testimonials", async (req, res) => {
  try {
    const testimonials = await storage.getAllTestimonials();
    res.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

router.get("/testimonials/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await storage.getTestimonialById(id);
    if (testimonial) {
      res.json(testimonial);
    } else {
      res.status(404).json({ error: "Testimonial not found" });
    }
  } catch (error) {
    console.error("Error fetching testimonial by ID:", error);
    res.status(500).json({ error: "Failed to fetch testimonial" });
  }
});

router.put("/testimonials/:id", ...adminRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTestimonialData: Partial<InsertTestimonial> = req.body;
    const updatedTestimonial = await storage.updateTestimonial(id, updatedTestimonialData);
    if (updatedTestimonial) {
      res.json(updatedTestimonial);
    } else {
      res.status(404).json({ error: "Testimonial not found" });
    }
  } catch (error) {
    console.error("Error updating testimonial:", error);
    res.status(500).json({ error: "Failed to update testimonial" });
  }
});

router.delete("/testimonials/:id", ...adminRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await storage.deleteTestimonial(id);
    if (deleted) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ error: "Testimonial not found" });
    }
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
});

// Contact Submission Routes
router.post("/contact-submissions", async (req, res) => {
  try {
    const newSubmission: InsertContact = req.body;
    const createdSubmission = await storage.createContactSubmission(newSubmission);
    
    // Send email notification (non-blocking)
    sendContactNotification(createdSubmission).catch(error => {
      console.error("Failed to send contact notification email:", error);
    });
    
    res.status(201).json(createdSubmission);
  } catch (error) {
    console.error("Error creating contact submission:", error);
    res.status(500).json({ error: "Failed to create contact submission" });
  }
});

router.get("/contact-submissions", ...adminRoute, async (req, res) => {
  try {
    const submissions = await storage.getAllContactSubmissions();
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    res.status(500).json({ error: "Failed to fetch contact submissions" });
  }
});

router.get("/contact-submissions/:id", ...adminRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await storage.getContactSubmissionById(id);
    if (submission) {
      res.json(submission);
    } else {
      res.status(404).json({ error: "Contact submission not found" });
    }
  } catch (error) {
    console.error("Error fetching contact submission by ID:", error);
    res.status(500).json({ error: "Failed to fetch contact submission" });
  }
});

router.delete("/contact-submissions/:id", ...adminRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await storage.deleteContactSubmission(id);
    if (deleted) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ error: "Contact submission not found" });
    }
  } catch (error) {
    console.error("Error deleting contact submission:", error);
    res.status(500).json({ error: "Failed to delete contact submission" });
  }
});

// Resume Routes (Protected - Admin only)
router.post("/resumes", ...adminRoute, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { originalname, filename, path: filePath } = req.file;
    const newResume: InsertResume = {
      filename: filename,
      originalName: originalname,
      fileUrl: `/uploads/${filename}`,
      // parsedContent will be handled by a separate service or later process
      isActive: false,
    };
    const createdResume = await storage.createResume(newResume);
    res.status(201).json(createdResume);
  } catch (error) {
    console.error("Error creating resume:", error);
    res.status(500).json({ error: "Failed to create resume" });
  }
});

router.get("/resumes", ...adminRoute, async (req, res) => {
  try {
    const resumes = await storage.getAllResumes();
    res.json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
});

router.get("/resumes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await storage.getResumeById(id);
    if (resume) {
      res.json(resume);
    } else {
      res.status(404).json({ error: "Resume not found" });
    }
  } catch (error) {
    console.error("Error fetching resume by ID:", error);
    res.status(500).json({ error: "Failed to fetch resume" });
  }
});

router.put("/resumes/:id", ...adminRoute, upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;
    let updatedResumeData: Partial<InsertResume> = req.body;

    if (req.file) {
      const { originalname, filename, path: filePath } = req.file;
      updatedResumeData = {
        ...updatedResumeData,
        filename: filename,
        originalName: originalname,
        fileUrl: `/uploads/${filename}`,
      };
    }

    const updatedResume = await storage.updateResume(id, updatedResumeData);
    if (updatedResume) {
      res.json(updatedResume);
    } else {
      res.status(404).json({ error: "Resume not found" });
    }
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ error: "Failed to update resume" });
  }
});

router.delete("/resumes/:id", ...adminRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await storage.deleteResume(id);
    if (deleted) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ error: "Resume not found" });
    }
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ error: "Failed to delete resume" });
  }
});

router.post("/resumes/:id/set-active", ...adminRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const activeResume = await storage.setActiveResume(id);
    if (activeResume) {
      res.json(activeResume);
    } else {
      res.status(404).json({ error: "Resume not found" });
    }
  } catch (error) {
    console.error("Error setting active resume:", error);
    res.status(500).json({ error: "Failed to set active resume" });
  }
});

router.get("/resumes/active", async (req, res) => {
  try {
    const activeResume = await storage.getActiveResume();
    if (activeResume) {
      res.json(activeResume);
    } else {
      res.status(404).json({ error: "Active resume not found" });
    }
  } catch (error) {
    console.error("Error fetching active resume:", error);
    res.status(500).json({ error: "Failed to fetch active resume" });
  }
});

// Blog Image Upload Route (Protected - Admin only)
router.post("/upload/blog-image", ...adminRoute, blogImageUpload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const { originalname, filename, path: filePath, mimetype } = req.file;
    
    // Generate a unique filename to avoid conflicts
    const timestamp = Date.now();
    const extension = path.extname(originalname);
    const uniqueFilename = `blog-${timestamp}-${filename}${extension}`;
    const finalPath = path.join(blogImageUploadDir, uniqueFilename);
    
    // Move the file to the final location with the unique name
    fs.renameSync(filePath, finalPath);
    
    res.json({
      success: true,
      filename: uniqueFilename,
      originalName: originalname,
      url: `/uploads/blog-images/${uniqueFilename}`,
      mimetype
    });
  } catch (error) {
    console.error("Error uploading blog image:", error);
    res.status(500).json({ error: "Failed to upload blog image" });
  }
});

export { router };
