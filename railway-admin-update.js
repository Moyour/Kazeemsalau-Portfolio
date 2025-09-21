import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sql } from 'drizzle-orm';
import crypto from 'crypto';

// Railway admin password update script
async function updateRailwayAdmin() {
  let sqlite;
  try {
    // Use Railway's database path
    const dbPath = process.env.SQLITE_DATABASE_PATH || './sqlite.db';
    console.log('🔍 Connecting to Railway database:', dbPath);
    
    sqlite = new Database(dbPath);
    const db = drizzle(sqlite);
    
    // Check existing admin
    const existingAdmin = await db.all(sql`
      SELECT id, username, email, role FROM users WHERE role = 'admin'
    `);
    
    console.log('📊 Existing admin users:', existingAdmin);
    
    // New credentials
    const newUsername = 'kazeemsalau';
    const newPassword = '911Porsche@!';
    const newEmail = 'kaspersalau@gmail.com';
    
    const passwordHash = await bcrypt.hash(newPassword, 12);
    
    if (existingAdmin.length > 0) {
      // Update existing admin
      console.log('🔄 Updating existing admin user...');
      await db.run(sql`
        UPDATE users 
        SET username = ${newUsername}, 
            email = ${newEmail}, 
            password_hash = ${passwordHash}
        WHERE role = 'admin'
      `);
    } else {
      // Create new admin
      console.log('➕ Creating new admin user...');
      const userId = crypto.randomUUID();
      await db.run(sql`
        INSERT INTO users (id, username, email, password_hash, role, created_at, updated_at)
        VALUES (${userId}, ${newUsername}, ${newEmail}, ${passwordHash}, 'admin', datetime('now'), datetime('now'))
      `);
    }
    
    console.log('✅ Railway admin credentials updated successfully!');
    console.log('📝 Username:', newUsername);
    console.log('🔐 Password:', newPassword);
    console.log('📧 Email:', newEmail);
    
  } catch (error) {
    console.error('❌ Error updating Railway admin:', error);
  } finally {
    if (sqlite) {
      sqlite.close();
    }
  }
}

updateRailwayAdmin();
