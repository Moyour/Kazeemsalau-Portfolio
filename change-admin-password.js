import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sql } from 'drizzle-orm';

const dbPath = process.env.SQLITE_DATABASE_PATH || './sqlite.db';
const sqlite = new Database(dbPath);
const db = drizzle(sqlite);

async function changeAdminPassword() {
  try {
    // CHANGE THESE VALUES TO WHAT YOU WANT
    const newUsername = 'kazeemsalau';           // Your new username
    const newPassword = '911Porsche@!';  // Your new password
    const newEmail = 'kaspersalau@gmail.com'; // Your email
    
    const passwordHash = await bcrypt.hash(newPassword, 12);
    
    // Update the admin user
    await db.run(sql`
      UPDATE users 
      SET username = ${newUsername}, 
          email = ${newEmail}, 
          password_hash = ${passwordHash}
      WHERE role = 'admin' OR username = 'admin'
    `);
    
    console.log('✅ Admin credentials updated successfully!');
    console.log('📝 New Username:', newUsername);
    console.log('🔐 New Password:', newPassword);
    console.log('📧 New Email:', newEmail);
    console.log('\n🚀 You can now log in with these new credentials!');
  } catch (error) {
    console.error('❌ Error updating credentials:', error);
  } finally {
    sqlite.close();
  }
}

changeAdminPassword();
