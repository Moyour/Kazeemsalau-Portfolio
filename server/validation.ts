import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Validation schemas
export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().min(1, 'Description is required').max(2000, 'Description too long'),
  longDescription: z.string().max(5000, 'Long description too long').optional(),
  category: z.string().min(1, 'Category is required'),
  tools: z.array(z.string()).optional(),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  caseStudyUrl: z.string().url('Invalid case study URL').optional().or(z.literal('')),
  scormUrl: z.string().url('Invalid SCORM URL').optional().or(z.literal('')),
  demoUrl: z.string().url('Invalid demo URL').optional().or(z.literal('')),
  featured: z.boolean().optional(),
  challenge: z.string().max(1000, 'Challenge description too long').optional(),
  solution: z.string().max(1000, 'Solution description too long').optional(),
  process: z.string().max(1000, 'Process description too long').optional(),
  results: z.string().max(1000, 'Results description too long').optional(),
});

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt too long'),
  content: z.string().min(1, 'Content is required').max(50000, 'Content too long'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  readTime: z.string().max(50, 'Read time too long').optional(),
  published: z.boolean().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  role: z.string().min(1, 'Role is required').max(100, 'Role too long'),
  company: z.string().min(1, 'Company is required').max(100, 'Company too long'),
  content: z.string().min(1, 'Content is required').max(1000, 'Content too long'),
  avatarUrl: z.string().url('Invalid avatar URL').optional().or(z.literal('')),
  rating: z.string().regex(/^[1-5]$/, 'Rating must be between 1 and 5'),
  featured: z.boolean().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100, 'Company name too long').optional(),
  projectType: z.string().max(100, 'Project type too long').optional(),
  message: z.string().min(1, 'Message is required').max(2000, 'Message too long'),
});

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required').max(100, 'Username too long').optional(),
  email: z.string().email('Invalid email address').optional(),
  password: z.string().min(1, 'Password is required'),
}).refine(data => data.username || data.email, {
  message: "Either username or email is required",
});

export const magicLinkSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Validation middleware factory
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        
        return res.status(400).json({
          error: 'Validation failed',
          details: errorMessages,
        });
      }
      
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  };
};

// Query parameter validation
export const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.query);
      req.query = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        
        return res.status(400).json({
          error: 'Query validation failed',
          details: errorMessages,
        });
      }
      
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  };
};

// Sanitize input middleware
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  const sanitizeString = (str: string): string => {
    return str
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, ''); // Remove event handlers
  };

  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    }
    
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    }
    
    if (obj && typeof obj === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = sanitizeObject(value);
      }
      return sanitized;
    }
    
    return obj;
  };

  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  
  next();
};
