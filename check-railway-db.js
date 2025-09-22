import https from 'https';

const RAILWAY_URL = 'https://kazeemsalau-portfolio-production.up.railway.app';

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

async function checkDatabase() {
  console.log('🔍 Checking Railway database...');
  
  // Test projects endpoint (we know this works)
  try {
    const projectsResponse = await makeRequest(`${RAILWAY_URL}/api/projects`, { method: 'GET' });
    console.log('✅ Projects endpoint:', projectsResponse.data.length, 'projects');
  } catch (error) {
    console.log('❌ Projects endpoint error:', error.message);
  }
  
  // Test blog posts endpoint
  try {
    const blogResponse = await makeRequest(`${RAILWAY_URL}/api/blog-posts`, { method: 'GET' });
    console.log('✅ Blog posts endpoint:', blogResponse.data.length, 'posts');
  } catch (error) {
    console.log('❌ Blog posts endpoint error:', error.message);
  }
  
  // Test adding a simple blog post
  try {
    const addBlogResponse = await makeRequest(`${RAILWAY_URL}/api/add-blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      id: 'test-simple',
      title: 'Simple Test',
      excerpt: 'Test',
      content: 'Test content',
      category: 'Test',
      imageUrl: '/test.jpg',
      readTime: '1 min',
      published: true
    });
    console.log('✅ Add blog response:', addBlogResponse.status, addBlogResponse.data);
  } catch (error) {
    console.log('❌ Add blog error:', error.message);
  }
}

checkDatabase().catch(console.error);
