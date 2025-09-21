import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sql } from 'drizzle-orm';

// This will work for both local and Railway environments
const dbPath = process.env.SQLITE_DATABASE_PATH || './sqlite.db';

async function fixRailwayAdmin() {
  let sqlite;
  try {
    console.log('🔍 Connecting to database:', dbPath);
    sqlite = new Database(dbPath);
    const db = drizzle(sqlite);
    
    // Check current admin users
    const existingAdmin = await db.all(sql`
      SELECT id, username, email, role FROM users WHERE role = 'admin'
    `);
    
    console.log('📊 Current admin users:', existingAdmin);
    
    // Admin credentials
    const newUsername = 'kazeemsalau';
    const newPassword = 'Porsche6704@!';
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
    
    // Verify the admin user was created/updated
    const updatedAdmin = await db.all(sql`
      SELECT id, username, email, role FROM users WHERE role = 'admin'
    `);
    
    console.log('✅ Admin user setup complete!');
    console.log('📝 Username:', newUsername);
    console.log('🔐 Password:', newPassword);
    console.log('📧 Email:', newEmail);
    console.log('🌐 Environment:', process.env.NODE_ENV || 'development');
    console.log('📊 Updated admin:', updatedAdmin);
    
  } catch (error) {
    console.error('❌ Error setting up admin:', error);
  } finally {
    if (sqlite) {
      sqlite.close();
    }
  }
}

fixRailwayAdmin();
