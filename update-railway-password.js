import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sql } from 'drizzle-orm';
import crypto from 'crypto';

// This will work for both local and Railway environments
const dbPath = process.env.SQLITE_DATABASE_PATH || './sqlite.db';

async function updateRailwayPassword() {
  let sqlite;
  try {
    console.log('🔍 Connecting to database:', dbPath);
    sqlite = new Database(dbPath);
    const db = drizzle(sqlite);
    
    // First, check if admin user exists
    const existingAdmin = await db.all(sql`
      SELECT id, username, email, role FROM users WHERE role = 'admin'
    `);
    
    console.log('📊 Existing admin users:', existingAdmin);
    
    // CHANGE THESE VALUES TO WHAT YOU WANT
    const newUsername = 'kazeemsalau';
    const newPassword = '911Porsche@!';
    const newEmail = 'kaspersalau@gmail.com';
    
    const passwordHash = await bcrypt.hash(newPassword, 12);
    
    if (existingAdmin.length > 0) {
      // Update existing admin user
      console.log('🔄 Updating existing admin user...');
      await db.run(sql`
        UPDATE users 
        SET username = ${newUsername}, 
            email = ${newEmail}, 
            password_hash = ${passwordHash}
        WHERE role = 'admin'
      `);
    } else {
      // Create new admin user
      console.log('➕ Creating new admin user...');
      const userId = crypto.randomUUID();
      await db.run(sql`
        INSERT INTO users (id, username, email, password_hash, role, created_at, updated_at)
        VALUES (${userId}, ${newUsername}, ${newEmail}, ${passwordHash}, 'admin', datetime('now'), datetime('now'))
      `);
    }
    
    console.log('✅ Admin credentials updated successfully!');
    console.log('📝 Username:', newUsername);
    console.log('🔐 Password:', newPassword);
    console.log('📧 Email:', newEmail);
    console.log('🌐 Environment:', process.env.NODE_ENV || 'development');
    
  } catch (error) {
    console.error('❌ Error updating credentials:', error);
  } finally {
    if (sqlite) {
      sqlite.close();
    }
  }
}

updateRailwayPassword();
