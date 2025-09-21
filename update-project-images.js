import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sql } from 'drizzle-orm';

// Update project images to use local uploads
async function updateProjectImages() {
  let sqlite;
  try {
    const dbPath = process.env.SQLITE_DATABASE_PATH || './sqlite.db';
    console.log('🔍 Connecting to database:', dbPath);
    
    sqlite = new Database(dbPath);
    const db = drizzle(sqlite);
    
    // Get all projects
    const projects = await db.all(sql`SELECT id, title, image_url FROM projects`);
    console.log('📊 Found projects:', projects.length);
    
    // Update project images based on title
    const imageUpdates = [
      {
        title: 'Emotional Intellgence',
        image_url: '/uploads/All%20Image%20Upload/emtional%20.jpg'
      },
      {
        title: 'The Fixer',
        image_url: '/uploads/All%20Image%20Upload/fixer.jpg'
      },
      {
        title: 'Business Writing ',
        image_url: '/uploads/All%20Image%20Upload/business%20writing%20.jpg'
      }
    ];
    
    for (const update of imageUpdates) {
      console.log(`🔄 Updating ${update.title}...`);
      await db.run(sql`
        UPDATE projects 
        SET image_url = ${update.image_url}
        WHERE title = ${update.title}
      `);
      console.log(`✅ Updated ${update.title} with ${update.image_url}`);
    }
    
    console.log('✅ All project images updated successfully!');
    
    // Show updated projects
    const updatedProjects = await db.all(sql`SELECT title, image_url FROM projects`);
    console.log('📊 Updated projects:');
    updatedProjects.forEach(project => {
      console.log(`  - ${project.title}: ${project.image_url}`);
    });
    
  } catch (error) {
    console.error('❌ Error updating project images:', error);
  } finally {
    if (sqlite) {
      sqlite.close();
    }
  }
}

updateProjectImages();
