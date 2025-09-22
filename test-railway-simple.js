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

async function testRailwayEndpoints() {
  console.log('🔍 Testing Railway endpoints...');
  
  // Test 1: Health check
  try {
    const healthResponse = await makeRequest(`${RAILWAY_URL}/api/health`, { method: 'GET' });
    console.log('✅ Health:', healthResponse.data.status);
  } catch (error) {
    console.log('❌ Health error:', error.message);
  }
  
  // Test 2: Projects
  try {
    const projectsResponse = await makeRequest(`${RAILWAY_URL}/api/projects`, { method: 'GET' });
    console.log('✅ Projects:', projectsResponse.data.length, 'items');
    if (projectsResponse.data.length > 0) {
      console.log('   Sample:', projectsResponse.data[0].title);
    }
  } catch (error) {
    console.log('❌ Projects error:', error.message);
  }
  
  // Test 3: Blog posts
  try {
    const blogsResponse = await makeRequest(`${RAILWAY_URL}/api/blog-posts`, { method: 'GET' });
    console.log('✅ Blog posts:', blogsResponse.data.length, 'items');
    if (blogsResponse.data.length > 0) {
      console.log('   Sample:', blogsResponse.data[0].title);
    }
  } catch (error) {
    console.log('❌ Blog posts error:', error.message);
  }
  
  // Test 4: Try to add a very simple blog post with minimal data
  console.log('\n🔄 Testing add-blog with minimal data...');
  const minimalBlog = {
    id: 'test-minimal-2',
    title: 'Test Blog',
    excerpt: 'Test',
    content: 'Test content',
    category: 'Test',
    imageUrl: '/test.jpg',
    readTime: '1 min',
    published: 1
  };
  
  try {
    const addResponse = await makeRequest(`${RAILWAY_URL}/api/add-blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, minimalBlog);
    
    console.log('📝 Add blog response:', addResponse.status);
    console.log('📝 Response:', JSON.stringify(addResponse.data, null, 2));
  } catch (error) {
    console.log('❌ Add blog error:', error.message);
  }
  
  // Test 5: Check if the blog was added
  try {
    const blogsResponse2 = await makeRequest(`${RAILWAY_URL}/api/blog-posts`, { method: 'GET' });
    console.log('📝 Blog posts after add attempt:', blogsResponse2.data.length, 'items');
  } catch (error) {
    console.log('❌ Blog posts check error:', error.message);
  }
}

testRailwayEndpoints().catch(console.error);
