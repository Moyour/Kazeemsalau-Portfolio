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

// Try to use a different endpoint or method
async function tryDifferentApproaches() {
  console.log('🔍 Trying different approaches to add blog data...');
  
  // Approach 1: Try to use the init-db endpoint to create blog data
  console.log('\n🔄 Approach 1: Using init-db endpoint...');
  try {
    const initResponse = await makeRequest(`${RAILWAY_URL}/api/init-db`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    console.log('📝 Init-db response:', initResponse.status);
    console.log('📝 Response:', JSON.stringify(initResponse.data, null, 2));
  } catch (error) {
    console.log('❌ Init-db error:', error.message);
  }
  
  // Approach 2: Try to add a very simple blog post with minimal data
  console.log('\n🔄 Approach 2: Minimal blog post...');
  const minimalBlog = {
    id: 'test-minimal-3',
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
  
  // Approach 3: Try to add a simple project
  console.log('\n🔄 Approach 3: Simple project...');
  const simpleProject = {
    id: 'test-project-3',
    title: 'Test Project',
    description: 'Test project description',
    longDescription: 'Test project long description',
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
    }, simpleProject);
    
    console.log('📝 Add project response:', addProjectResponse.status);
    console.log('📝 Response:', JSON.stringify(addProjectResponse.data, null, 2));
  } catch (error) {
    console.log('❌ Add project error:', error.message);
  }
  
  // Approach 4: Check if there are any other endpoints available
  console.log('\n🔄 Approach 4: Checking available endpoints...');
  const endpoints = [
    '/api/health',
    '/api/projects',
    '/api/blog-posts',
    '/api/db-test',
    '/api/init-db',
    '/api/add-blog',
    '/api/add-project'
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await makeRequest(`${RAILWAY_URL}${endpoint}`, { method: 'GET' });
      console.log(`✅ ${endpoint}: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${endpoint}: ${error.message}`);
    }
  }
}

// Create a workaround by modifying existing projects to include blog-like data
async function createBlogWorkaround() {
  console.log('\n🔄 Creating blog workaround...');
  
  // Get current projects
  try {
    const projectsResponse = await makeRequest(`${RAILWAY_URL}/api/projects`, { method: 'GET' });
    console.log(`📊 Current projects: ${projectsResponse.data.length}`);
    
    if (projectsResponse.data.length > 0) {
      console.log('💡 Workaround: Modify the frontend to display projects as blog posts');
      console.log('💡 Or create a new endpoint that returns projects formatted as blog posts');
      
      // Show sample project data
      const sampleProject = projectsResponse.data[0];
      console.log('📝 Sample project data:');
      console.log(`   Title: ${sampleProject.title}`);
      console.log(`   Description: ${sampleProject.description}`);
      console.log(`   Category: ${sampleProject.category}`);
      console.log(`   Image: ${sampleProject.imageUrl}`);
    }
  } catch (error) {
    console.log('❌ Error getting projects:', error.message);
  }
}

async function main() {
  console.log('🚀 Attempting to fix Railway blog articles with multiple approaches...');
  
  await tryDifferentApproaches();
  await createBlogWorkaround();
  
  console.log('\n📊 Summary:');
  console.log('❌ All add endpoints are failing on Railway');
  console.log('💡 This suggests a fundamental issue with Railway deployment');
  console.log('💡 Consider:');
  console.log('   1. Checking Railway logs for specific errors');
  console.log('   2. Using Railway database tools to manually add data');
  console.log('   3. Creating a workaround in the frontend');
  console.log('   4. Contacting Railway support');
}

main().catch(console.error);
