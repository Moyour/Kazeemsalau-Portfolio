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

async function debugBlogEndpoint() {
  console.log('🔍 Debugging Railway blog endpoint...');
  
  // Test 1: Check if blog-posts endpoint works
  try {
    const getResponse = await makeRequest(`${RAILWAY_URL}/api/blog-posts`, { method: 'GET' });
    console.log('✅ GET /api/blog-posts:', getResponse.status, getResponse.data.length, 'posts');
  } catch (error) {
    console.log('❌ GET /api/blog-posts error:', error.message);
  }
  
  // Test 2: Try adding a minimal blog post
  const minimalBlog = {
    id: 'debug-1',
    title: 'Debug Test',
    excerpt: 'Test',
    content: 'Test content',
    category: 'Test',
    imageUrl: '/test.jpg',
    readTime: '1 min',
    published: true
  };
  
  try {
    const addResponse = await makeRequest(`${RAILWAY_URL}/api/add-blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, minimalBlog);
    
    console.log('📝 POST /api/add-blog response:', addResponse.status);
    console.log('📝 Response data:', JSON.stringify(addResponse.data, null, 2));
  } catch (error) {
    console.log('❌ POST /api/add-blog error:', error.message);
  }
  
  // Test 3: Check projects endpoint for comparison
  try {
    const projectsResponse = await makeRequest(`${RAILWAY_URL}/api/projects`, { method: 'GET' });
    console.log('✅ GET /api/projects:', projectsResponse.status, projectsResponse.data.length, 'projects');
  } catch (error) {
    console.log('❌ GET /api/projects error:', error.message);
  }
  
  // Test 4: Try adding a project for comparison
  const testProject = {
    id: 'debug-project',
    title: 'Debug Project',
    description: 'Test project',
    longDescription: 'Test project description',
    category: 'test',
    tools: JSON.stringify(['test']),
    imageUrl: '/test.jpg',
    caseStudyUrl: '',
    scormUrl: '',
    demoUrl: '',
    featured: false,
    challenge: '',
    solution: '',
    process: '',
    results: ''
  };
  
  try {
    const addProjectResponse = await makeRequest(`${RAILWAY_URL}/api/add-project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, testProject);
    
    console.log('📝 POST /api/add-project response:', addProjectResponse.status);
    console.log('📝 Response data:', JSON.stringify(addProjectResponse.data, null, 2));
  } catch (error) {
    console.log('❌ POST /api/add-project error:', error.message);
  }
}

debugBlogEndpoint().catch(console.error);
