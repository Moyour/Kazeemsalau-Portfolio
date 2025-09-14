import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { Storage, User } from './storage';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = '365d'; // 1 year - effectively no timeout

export interface AuthRequest extends Request {
  user?: User;
}

// Hash password utility
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Verify password utility
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate JWT token
export function generateToken(user: User): string {
  return jwt.sign(
    { 
      userId: user.id, 
      username: user.username, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Authentication middleware
export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }

  // Add user info to request
  req.user = {
    id: decoded.userId,
    username: decoded.username,
    role: decoded.role,
  } as User;

  next();
}

// Admin role middleware
export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// Session timeout middleware - tracks user activity
export function sessionTimeout(req: AuthRequest, res: Response, next: NextFunction) {
  // Session timeout disabled - sessions will not expire
  next();
}

// Login function
export async function loginUser(username: string, password: string, storage: Storage): Promise<{ user: User; token: string } | null> {
  const user = await storage.getUserByUsername(username);
  if (!user) {
    return null;
  }

  const isValidPassword = await verifyPassword(password, user.password_hash);
  if (!isValidPassword) {
    return null;
  }

  // Update last login
  await storage.updateUserLastLogin(user.id);

  const token = generateToken(user);
  return { user, token };
}
