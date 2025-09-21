import Database from 'better-sqlite3';
import fs from 'fs';

const dbPath = process.env.SQLITE_DATABASE_PATH || './sqlite.db';
const sqlite = new Database(dbPath);

try {
  // Export all blog posts
  const posts = sqlite.prepare(`
    SELECT id, title, excerpt, content, category, image_url, read_time, published, created_at, updated_at 
    FROM blog_posts 
    ORDER BY created_at DESC
  `).all();
  
  // Export all projects
  const projects = sqlite.prepare(`
    SELECT id, title, description, long_description, category, tools, image_url, case_study_url, scorm_url, demo_url, featured, challenge, solution, process, results, created_at 
    FROM projects 
    ORDER BY created_at DESC
  `).all();
  
  // Export all testimonials
  const testimonials = sqlite.prepare(`
    SELECT id, name, role, company, content, avatar_url, rating, featured 
    FROM testimonials 
    ORDER BY id DESC
  `).all();
  
  const exportData = {
    blog_posts: posts,
    projects: projects,
    testimonials: testimonials,
    export_date: new Date().toISOString()
  };
  
  fs.writeFileSync('database-export.json', JSON.stringify(exportData, null, 2));
  
  console.log('✅ Database exported successfully!');
  console.log(`📝 Blog posts: ${posts.length}`);
  console.log(`🚀 Projects: ${projects.length}`);
  console.log(`💬 Testimonials: ${testimonials.length}`);
  console.log('📁 Saved to: database-export.json');
  
} catch (error) {
  console.error('❌ Export error:', error);
} finally {
  sqlite.close();
}
