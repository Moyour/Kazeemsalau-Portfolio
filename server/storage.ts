import { db } from "./db";
import { InferSelectModel, InferInsertModel, sql } from "drizzle-orm";
import { randomUUID } from "node:crypto";

// Define types directly based on the table structure used in setup-db.cjs
export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  tools?: string[]; // Stored as JSON string, used as string array
  imageUrl?: string;
  caseStudyUrl?: string;
  scormUrl?: string;
  demoUrl?: string;
  featured: boolean;
  challenge?: string;
  solution?: string;
  process?: string;
  results?: string;
  createdAt: string;
};

export type InsertProject = Omit<Project, "id" | "createdAt">;

// Define a database row type for Project to handle raw data from DB
type ProjectDbRow = Omit<Project, "tools" | "featured"> & {
  tools?: string; // Stored as a JSON string
  featured: 0 | 1; // Stored as integer
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl?: string;
  readTime?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type InsertBlogPost = Omit<BlogPost, "id" | "createdAt" | "updatedAt">;

type BlogPostDbRow = Omit<BlogPost, "published"> & {
  published: 0 | 1;
};

// User types for authentication
export type User = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'user';
  created_at: string;
  last_login_at?: string;
};

export type InsertUser = Omit<User, "id" | "created_at" | "last_login_at">;

type UserDbRow = User;

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string;
  rating?: string;
  featured: boolean;
};

export type InsertTestimonial = Omit<Testimonial, "id">;

type TestimonialDbRow = Omit<Testimonial, "featured"> & {
  featured: 0 | 1;
};

export type ContactSubmission = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
  createdAt: string;
};

export type InsertContact = Omit<ContactSubmission, "id" | "createdAt">;

type ContactSubmissionDbRow = ContactSubmission;

export type Resume = {
  id: string;
  filename: string;
  originalName: string;
  fileUrl: string;
  parsedContent?: string;
  isActive: boolean;
  uploadedAt: string;
};

export type InsertResume = Omit<Resume, "id" | "uploadedAt">;

type ResumeDbRow = Omit<Resume, "isActive"> & {
  is_active: 0 | 1;
};

export interface IStorage {
  createProject(project: InsertProject): Promise<Project>;
  getProjectById(id: string): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  getBlogPostById(id: string): Promise<BlogPost | undefined>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getTestimonialById(id: string): Promise<Testimonial | undefined>;
  getAllTestimonials(): Promise<Testimonial[]>;
  updateTestimonial(
    id: string,
    testimonial: Partial<InsertTestimonial>
  ): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;
  createContactSubmission(
    submission: InsertContact
  ): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmissionById(id: string): Promise<ContactSubmission | undefined>;
  deleteContactSubmission(id: string): Promise<boolean>;
  createResume(resume: InsertResume): Promise<Resume>;
  getResumeById(id: string): Promise<Resume | undefined>;
  getAllResumes(): Promise<Resume[]>;
  updateResume(id: string, resume: Partial<InsertResume>): Promise<Resume | undefined>;
  deleteResume(id: string): Promise<boolean>;
  setActiveResume(id: string): Promise<Resume | undefined>;
  getActiveResume(): Promise<Resume | undefined>;
}

export class Storage implements IStorage {
  async createProject(project: InsertProject): Promise<Project> {
    const newProject: Project = {
      id: randomUUID(),
      ...project,
      tools: project.tools || [],
      createdAt: new Date().toISOString(),
      featured: project.featured === true,
    };
    await db.run(sql`
      INSERT INTO projects (id, title, description, long_description, category, tools, image_url, case_study_url, scorm_url, demo_url, featured, challenge, solution, process, results, created_at)
      VALUES (
        ${newProject.id},
        ${newProject.title},
        ${newProject.description},
        ${newProject.longDescription === undefined ? null : newProject.longDescription},
        ${newProject.category},
        ${JSON.stringify(newProject.tools)},
        ${newProject.imageUrl === undefined ? null : newProject.imageUrl},
        ${newProject.caseStudyUrl === undefined ? null : newProject.caseStudyUrl},
        ${newProject.scormUrl === undefined ? null : newProject.scormUrl},
        ${newProject.demoUrl === undefined ? null : newProject.demoUrl},
        ${newProject.featured ? 1 : 0},
        ${newProject.challenge === undefined ? null : newProject.challenge},
        ${newProject.solution === undefined ? null : newProject.solution},
        ${newProject.process === undefined ? null : newProject.process},
        ${newProject.results === undefined ? null : newProject.results},
        ${newProject.createdAt}
      );
    `);
    return newProject;
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    const [row] = (await db.all(sql`SELECT * FROM projects WHERE id = ${id};`)) as any[];
    if (!row) return undefined;
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      longDescription: row.long_description,
      category: row.category,
      tools: row.tools ? JSON.parse(row.tools) : [],
      imageUrl: row.image_url,
      caseStudyUrl: row.case_study_url,
      scormUrl: row.scorm_url,
      demoUrl: row.demo_url,
      featured: row.featured === 1 ? true : false,
      challenge: row.challenge,
      solution: row.solution,
      process: row.process,
      results: row.results,
      createdAt: row.created_at,
    };
  }

  async getAllProjects(): Promise<Project[]> {
    const rows = (await db.all(sql`SELECT * FROM projects ORDER BY created_at DESC;`)) as any[];
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      longDescription: row.long_description,
      category: row.category,
      tools: row.tools ? JSON.parse(row.tools) : [],
      imageUrl: row.image_url,
      caseStudyUrl: row.case_study_url,
      scormUrl: row.scorm_url,
      demoUrl: row.demo_url,
      featured: row.featured === 1 ? true : false,
      challenge: row.challenge,
      solution: row.solution,
      process: row.process,
      results: row.results,
      createdAt: row.created_at,
    }));
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = await this.getProjectById(id);
    if (!existingProject) return undefined;

    const updatedProject: Project = {
      ...existingProject,
      ...project,
      tools: project.tools || existingProject.tools || [],
      featured: project.featured === undefined ? existingProject.featured : project.featured,
    };

    await db.run(sql`
      UPDATE projects
      SET
        title = ${updatedProject.title},
        description = ${updatedProject.description},
        long_description = ${updatedProject.longDescription === undefined ? null : updatedProject.longDescription},
        category = ${updatedProject.category},
        tools = ${JSON.stringify(updatedProject.tools)},
        image_url = ${updatedProject.imageUrl === undefined ? null : updatedProject.imageUrl},
        case_study_url = ${updatedProject.caseStudyUrl === undefined ? null : updatedProject.caseStudyUrl},
        scorm_url = ${updatedProject.scormUrl === undefined ? null : updatedProject.scormUrl},
        demo_url = ${updatedProject.demoUrl === undefined ? null : updatedProject.demoUrl},
        featured = ${updatedProject.featured ? 1 : 0},
        challenge = ${updatedProject.challenge === undefined ? null : updatedProject.challenge},
        solution = ${updatedProject.solution === undefined ? null : updatedProject.solution},
        process = ${updatedProject.process === undefined ? null : updatedProject.process},
        results = ${updatedProject.results === undefined ? null : updatedProject.results}
      WHERE id = ${id};
    `);
    return this.getProjectById(id);
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.run(sql`DELETE FROM projects WHERE id = ${id};`);
    return result.rowsAffected > 0;
  }

  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    const newBlogPost: BlogPost = {
      id: randomUUID(),
      ...blogPost,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: blogPost.published === true,
    };
    await db.run(sql`
      INSERT INTO blog_posts (id, title, excerpt, content, category, image_url, read_time, published, created_at, updated_at)
      VALUES (
        ${newBlogPost.id},
        ${newBlogPost.title},
        ${newBlogPost.excerpt},
        ${newBlogPost.content},
        ${newBlogPost.category},
        ${newBlogPost.imageUrl === undefined ? null : newBlogPost.imageUrl},
        ${newBlogPost.readTime === undefined ? null : newBlogPost.readTime},
        ${newBlogPost.published ? 1 : 0},
        ${newBlogPost.createdAt},
        ${newBlogPost.updatedAt}
      );
    `);
    return newBlogPost;
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    const [row] = (await db.all(sql`SELECT * FROM blog_posts WHERE id = ${id};`)) as any[];
    if (!row) return undefined;
    return {
      id: row.id,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      category: row.category,
      imageUrl: row.image_url,
      readTime: row.read_time,
      published: row.published === 1 ? true : false,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    const rows = (await db.all(sql`SELECT * FROM blog_posts ORDER BY created_at DESC;`)) as any[];
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      category: row.category,
      imageUrl: row.image_url,
      readTime: row.read_time,
      published: row.published === 1 ? true : false,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  async updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existingBlogPost = await this.getBlogPostById(id);
    if (!existingBlogPost) return undefined;

    const updatedBlogPost: BlogPost = {
      ...existingBlogPost,
      ...blogPost,
      updatedAt: new Date().toISOString(),
      published: blogPost.published === undefined ? existingBlogPost.published : blogPost.published,
    };

    await db.run(sql`
      UPDATE blog_posts
      SET
        title = ${updatedBlogPost.title},
        excerpt = ${updatedBlogPost.excerpt},
        content = ${updatedBlogPost.content},
        category = ${updatedBlogPost.category},
        image_url = ${updatedBlogPost.imageUrl === undefined ? null : updatedBlogPost.imageUrl},
        read_time = ${updatedBlogPost.readTime === undefined ? null : updatedBlogPost.readTime},
        published = ${updatedBlogPost.published ? 1 : 0},
        updated_at = ${updatedBlogPost.updatedAt}
      WHERE id = ${id};
    `);
    return this.getBlogPostById(id);
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.run(sql`DELETE FROM blog_posts WHERE id = ${id};`);
    return result.rowsAffected > 0;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const newTestimonial: Testimonial = {
      id: randomUUID(),
      ...testimonial,
      featured: testimonial.featured === true,
    };
    await db.run(sql`
      INSERT INTO testimonials (id, name, role, company, content, avatar_url, rating, featured)
      VALUES (
        ${newTestimonial.id},
        ${newTestimonial.name},
        ${newTestimonial.role},
        ${newTestimonial.company},
        ${newTestimonial.content},
        ${newTestimonial.avatarUrl === undefined ? null : newTestimonial.avatarUrl},
        ${newTestimonial.rating === undefined ? null : newTestimonial.rating},
        ${newTestimonial.featured ? 1 : 0}
      );
    `);
    return newTestimonial;
  }

  async getTestimonialById(id: string): Promise<Testimonial | undefined> {
    const [row] = (await db.all(sql`SELECT * FROM testimonials WHERE id = ${id};`)) as TestimonialDbRow[];
    if (!row) return undefined;
    return {
      ...row,
      featured: row.featured === 1 ? true : false,
    };
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    const rows = (await db.all(sql`SELECT * FROM testimonials ORDER BY id DESC;`)) as TestimonialDbRow[];
    return rows.map((row) => ({
      ...row,
      featured: row.featured === 1 ? true : false,
    }));
  }

  async updateTestimonial(
    id: string,
    testimonial: Partial<InsertTestimonial>
  ): Promise<Testimonial | undefined> {
    const existingTestimonial = await this.getTestimonialById(id);
    if (!existingTestimonial) return undefined;

    const updatedTestimonial: Testimonial = {
      ...existingTestimonial,
      ...testimonial,
      featured: testimonial.featured === undefined ? existingTestimonial.featured : testimonial.featured,
    };

    await db.run(sql`
      UPDATE testimonials
      SET
        name = ${updatedTestimonial.name},
        role = ${updatedTestimonial.role},
        company = ${updatedTestimonial.company},
        content = ${updatedTestimonial.content},
        avatar_url = ${updatedTestimonial.avatarUrl === undefined ? null : updatedTestimonial.avatarUrl},
        rating = ${updatedTestimonial.rating === undefined ? null : updatedTestimonial.rating},
        featured = ${updatedTestimonial.featured ? 1 : 0}
      WHERE id = ${id};
    `);
    return this.getTestimonialById(id);
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const result = await db.run(sql`DELETE FROM testimonials WHERE id = ${id};`);
    return result.rowsAffected > 0;
  }

  async createContactSubmission(
    submission: InsertContact
  ): Promise<ContactSubmission> {
    const newSubmission: ContactSubmission = {
      id: randomUUID(),
      ...submission,
      createdAt: new Date().toISOString(),
    };
    await db.run(sql`
      INSERT INTO contact_submissions (id, first_name, last_name, email, company, project_type, message, created_at)
      VALUES (
        ${newSubmission.id},
        ${newSubmission.firstName},
        ${newSubmission.lastName},
        ${newSubmission.email},
        ${newSubmission.company === undefined ? null : newSubmission.company},
        ${newSubmission.projectType === undefined ? null : newSubmission.projectType},
        ${newSubmission.message},
        ${newSubmission.createdAt}
      );
    `);
    return newSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    const rows = (await db.all(sql`SELECT * FROM contact_submissions ORDER BY created_at DESC;`)) as ContactSubmissionDbRow[];
    return rows;
  }

  async getContactSubmissionById(id: string): Promise<ContactSubmission | undefined> {
    const [row] = (await db.all(sql`SELECT * FROM contact_submissions WHERE id = ${id};`)) as ContactSubmissionDbRow[];
    if (!row) return undefined;
    return row;
  }

  async deleteContactSubmission(id: string): Promise<boolean> {
    const result = await db.run(sql`DELETE FROM contact_submissions WHERE id = ${id};`);
    return result.rowsAffected > 0;
  }

  async createResume(resume: InsertResume): Promise<Resume> {
    const newResume: Resume = {
      id: randomUUID(),
      ...resume,
      uploadedAt: new Date().toISOString(),
      isActive: resume.isActive === true,
    };
    await db.run(sql`
      INSERT INTO resumes (id, filename, original_name, file_url, parsed_content, is_active, uploaded_at)
      VALUES (
        ${newResume.id},
        ${newResume.filename},
        ${newResume.originalName},
        ${newResume.fileUrl},
        ${newResume.parsedContent === undefined ? null : newResume.parsedContent},
        ${newResume.isActive ? 1 : 0},
        ${newResume.uploadedAt}
      );
    `);
    return newResume;
  }

  async getResumeById(id: string): Promise<Resume | undefined> {
    const [row] = (await db.all(sql`SELECT * FROM resumes WHERE id = ${id};`)) as ResumeDbRow[];
    if (!row) return undefined;
    return {
      ...row,
      isActive: row.is_active === 1 ? true : false,
    };
  }

  async getAllResumes(): Promise<Resume[]> {
    const rows = (await db.all(sql`SELECT * FROM resumes ORDER BY uploaded_at DESC;`)) as ResumeDbRow[];
    return rows.map((row) => ({
      ...row,
      isActive: row.is_active === 1 ? true : false,
    }));
  }

  async updateResume(id: string, resume: Partial<InsertResume>): Promise<Resume | undefined> {
    const existingResume = await this.getResumeById(id);
    if (!existingResume) return undefined;

    const updatedResume: Resume = {
      ...existingResume,
      ...resume,
      isActive: resume.isActive === undefined ? existingResume.isActive : resume.isActive,
    };

    await db.run(sql`
      UPDATE resumes
      SET
        filename = ${updatedResume.filename},
          original_name = ${updatedResume.originalName},
          file_url = ${updatedResume.fileUrl},
          parsed_content = ${updatedResume.parsedContent === undefined ? null : updatedResume.parsedContent},
          is_active = ${updatedResume.isActive ? 1 : 0}
      WHERE id = ${id};
    `);
    return this.getResumeById(id);
  }

  async deleteResume(id: string): Promise<boolean> {
    const result = await db.run(sql`DELETE FROM resumes WHERE id = ${id};`);
    return result.rowsAffected > 0;
  }

  async setActiveResume(id: string): Promise<Resume | undefined> {
    // First, deactivate all other resumes
    await db.run(sql`UPDATE resumes SET is_active = 0 WHERE id != ${id};`);

    // Then, set the specified resume as active
    const result = await db.run(sql`UPDATE resumes SET is_active = 1 WHERE id = ${id};`);
    if (result.rowsAffected === 0) return undefined;
    return this.getResumeById(id);
  }

  async getActiveResume(): Promise<Resume | undefined> {
    const [row] = (await db.all(sql`SELECT * FROM resumes WHERE is_active = 1;`)) as ResumeDbRow[];
    if (!row) return undefined;
    return {
      ...row,
      isActive: row.is_active === 1 ? true : false,
    };
  }

  // User management methods
  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      id: randomUUID(),
      ...user,
      createdAt: new Date().toISOString(),
    };
    await db.run(sql`
      INSERT INTO users (id, username, email, password_hash, role, created_at)
      VALUES (
        ${newUser.id},
        ${newUser.username},
        ${newUser.email},
        ${newUser.passwordHash},
        ${newUser.role},
        ${newUser.createdAt}
      );
    `);
    return newUser;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const rows = (await db.all(sql`SELECT * FROM users WHERE username = ${username};`)) as UserDbRow[];
    return rows[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const rows = (await db.all(sql`SELECT * FROM users WHERE email = ${email};`)) as UserDbRow[];
    return rows[0];
  }

  async getUserById(id: string): Promise<User | undefined> {
    const rows = (await db.all(sql`SELECT * FROM users WHERE id = ${id};`)) as UserDbRow[];
    return rows[0];
  }

  async updateUserLastLogin(id: string): Promise<void> {
    await db.run(sql`UPDATE users SET last_login_at = ${new Date().toISOString()} WHERE id = ${id};`);
  }
}