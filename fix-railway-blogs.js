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

// Let's try a different approach - use the existing project endpoint structure
// to add blog-like data, or create a simpler blog endpoint
async function addBlogViaProjectEndpoint() {
  console.log('🔄 Trying to add blog data via project endpoint...');
  
  const blogAsProject = {
    id: 'blog-1',
    title: 'The Power of Emotional Intelligence in Learning Design',
    description: 'Explore how emotional intelligence principles can transform learning experiences and improve learner engagement.',
    longDescription: 'Emotional intelligence (EI) is a crucial skill that can significantly enhance learning design and delivery. In this comprehensive guide, we explore how understanding and applying EI principles can transform learning experiences.',
    category: 'blog',
    tools: JSON.stringify(['Learning Design', 'Emotional Intelligence']),
    imageUrl: '/uploads/blog-images/emtional .jpg',
    caseStudyUrl: '',
    scormUrl: '',
    demoUrl: '',
    featured: true,
    challenge: '',
    solution: '',
    process: '',
    results: ''
  };
  
  try {
    const response = await makeRequest(`${RAILWAY_URL}/api/add-project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, blogAsProject);
    
    console.log('📝 Project endpoint response:', response.status);
    console.log('📝 Response data:', JSON.stringify(response.data, null, 2));
    return response.status === 200;
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Let's also try to create a simpler blog endpoint
async function createSimpleBlogEndpoint() {
  console.log('🔄 Testing if we can create a simple blog endpoint...');
  
  // Try to add a very simple blog post
  const simpleBlog = {
    id: 'simple-1',
    title: 'Simple Test Blog',
    excerpt: 'Test',
    content: 'Test content',
    category: 'Test',
    imageUrl: '/test.jpg',
    readTime: '1 min',
    published: 1  // Try as integer instead of boolean
  };
  
  try {
    const response = await makeRequest(`${RAILWAY_URL}/api/add-blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, simpleBlog);
    
    console.log('📝 Simple blog response:', response.status);
    console.log('📝 Response data:', JSON.stringify(response.data, null, 2));
    return response.status === 200;
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Check current status
async function checkStatus() {
  console.log('🔍 Checking current Railway status...');
  
  try {
    const projectsResponse = await makeRequest(`${RAILWAY_URL}/api/projects`, { method: 'GET' });
    const blogsResponse = await makeRequest(`${RAILWAY_URL}/api/blog-posts`, { method: 'GET' });
    
    console.log(`📊 Projects: ${projectsResponse.data.length}`);
    console.log(`📊 Blog Posts: ${blogsResponse.data.length}`);
    
    if (projectsResponse.data.length > 0) {
      console.log('📝 Sample project:', projectsResponse.data[0].title);
    }
    
    if (blogsResponse.data.length > 0) {
      console.log('📝 Sample blog:', blogsResponse.data[0].title);
    }
  } catch (error) {
    console.log('❌ Error checking status:', error.message);
  }
}

async function main() {
  console.log('🚀 Attempting to fix Railway blog issues...');
  
  // Check current status
  await checkStatus();
  
  // Try different approaches
  console.log('\n🔄 Trying project endpoint approach...');
  const projectSuccess = await addBlogViaProjectEndpoint();
  
  console.log('\n🔄 Trying simple blog endpoint...');
  const blogSuccess = await createSimpleBlogEndpoint();
  
  // Check final status
  console.log('\n📊 Final Status:');
  await checkStatus();
  
  if (projectSuccess || blogSuccess) {
    console.log('✅ Success! Blog data added to Railway');
  } else {
    console.log('❌ All approaches failed. Need to investigate Railway logs or database schema');
  }
}

main().catch(console.error);
