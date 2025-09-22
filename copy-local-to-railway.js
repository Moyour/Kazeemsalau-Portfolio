import https from 'https';
import Database from 'better-sqlite3';

const RAILWAY_URL = 'https://kazeemsalau-portfolio-production.up.railway.app';
const LOCAL_DB_PATH = './sqlite.db';

// Function to make HTTPS requests
function makeRequest(url, options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Get data from local database
function getLocalData() {
  try {
    const db = new Database(LOCAL_DB_PATH);
    
    // Get blog posts
    const blogPosts = db.prepare('SELECT * FROM blog_posts').all();
    console.log(`📚 Found ${blogPosts.length} blog posts in local database`);
    
    // Get projects
    const projects = db.prepare('SELECT * FROM projects').all();
    console.log(`📁 Found ${projects.length} projects in local database`);
    
    db.close();
    
    return { blogPosts, projects };
  } catch (error) {
    console.log('❌ Error reading local database:', error.message);
    return { blogPosts: [], projects: [] };
  }
}

// Try to add blog post using a very simple approach
async function addSimpleBlog(blogPost) {
  console.log(`🔄 Adding: ${blogPost.title}`);
  
  // Try with minimal required fields only
  const minimalBlog = {
    id: blogPost.id,
    title: blogPost.title,
    excerpt: blogPost.excerpt || 'No excerpt',
    content: blogPost.content || 'No content',
    category: blogPost.category || 'General',
    imageUrl: blogPost.image_url || '/default.jpg',
    readTime: blogPost.read_time || '5 min read',
    published: blogPost.published || 1
  };
  
  try {
    const response = await makeRequest(`${RAILWAY_URL}/api/add-blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, minimalBlog);
    
    if (response.status === 200) {
      console.log(`✅ Success: ${blogPost.title}`);
      return true;
    } else {
      console.log(`❌ Failed: ${blogPost.title} - ${response.status}`);
      console.log(`❌ Error: ${JSON.stringify(response.data, null, 2)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error: ${blogPost.title} - ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Copying local data to Railway...');
  
  // Get local data
  const { blogPosts, projects } = getLocalData();
  
  if (blogPosts.length === 0) {
    console.log('❌ No blog posts found in local database');
    return;
  }
  
  console.log(`\n🔄 Attempting to add ${blogPosts.length} blog posts to Railway...`);
  
  let successCount = 0;
  
  for (const blogPost of blogPosts) {
    const success = await addSimpleBlog(blogPost);
    if (success) {
      successCount++;
    }
    
    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`\n📊 Results: ${successCount}/${blogPosts.length} blog posts added successfully`);
  
  // Check final status
  try {
    const blogsResponse = await makeRequest(`${RAILWAY_URL}/api/blog-posts`, { method: 'GET' });
    console.log(`📝 Current blog posts on Railway: ${blogsResponse.data.length}`);
    
    if (blogsResponse.data.length > 0) {
      console.log('✅ Blog posts are now available on Railway!');
    } else {
      console.log('❌ Still no blog posts on Railway');
    }
  } catch (error) {
    console.log('❌ Error checking final status:', error.message);
  }
}

main().catch(console.error);
