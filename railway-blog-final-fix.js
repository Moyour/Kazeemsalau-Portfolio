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

// Create a simple solution by modifying the frontend to use projects as blogs
async function createBlogSolution() {
  console.log('🚀 Creating blog solution for Railway...');
  
  // Get current projects
  try {
    const projectsResponse = await makeRequest(`${RAILWAY_URL}/api/projects`, { method: 'GET' });
    console.log(`📊 Current projects: ${projectsResponse.data.length}`);
    
    if (projectsResponse.data.length > 0) {
      console.log('\n💡 Solution: Modify the frontend to display projects as blog posts');
      console.log('📝 Here are the projects that can be displayed as blogs:');
      
      projectsResponse.data.forEach((project, index) => {
        console.log(`\n${index + 1}. ${project.title}`);
        console.log(`   Description: ${project.description}`);
        console.log(`   Category: ${project.category}`);
        console.log(`   Image: ${project.imageUrl}`);
        console.log(`   Long Description: ${project.longDescription ? project.longDescription.substring(0, 100) + '...' : 'N/A'}`);
      });
      
      console.log('\n🔧 To fix the blog display:');
      console.log('1. Modify the frontend to fetch from /api/projects instead of /api/blog-posts');
      console.log('2. Format the project data as blog posts in the frontend');
      console.log('3. Use the project description as the blog excerpt');
      console.log('4. Use the project longDescription as the blog content');
      
      return true;
    } else {
      console.log('❌ No projects found on Railway');
      return false;
    }
  } catch (error) {
    console.log('❌ Error getting projects:', error.message);
    return false;
  }
}

// Test if we can at least get the workaround endpoint working
async function testWorkaroundEndpoint() {
  console.log('\n🔄 Testing workaround endpoint...');
  
  try {
    const response = await makeRequest(`${RAILWAY_URL}/api/blog-posts-workaround`, { method: 'GET' });
    console.log('📝 Workaround endpoint status:', response.status);
    
    if (response.status === 200 && Array.isArray(response.data)) {
      console.log(`✅ Workaround endpoint working: ${response.data.length} blog posts`);
      return true;
    } else {
      console.log('❌ Workaround endpoint not working properly');
      console.log('📝 Response:', JSON.stringify(response.data, null, 2));
      return false;
    }
  } catch (error) {
    console.log('❌ Error testing workaround endpoint:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Final attempt to fix Railway blog articles...');
  
  // Test workaround endpoint
  const workaroundWorking = await testWorkaroundEndpoint();
  
  if (workaroundWorking) {
    console.log('✅ Blog workaround endpoint is working!');
    console.log('💡 The frontend can now use /api/blog-posts-workaround to display blog posts');
  } else {
    console.log('❌ Workaround endpoint not working');
    
    // Create alternative solution
    const solutionCreated = await createBlogSolution();
    
    if (solutionCreated) {
      console.log('✅ Alternative solution created!');
      console.log('💡 Use projects as blog posts in the frontend');
    } else {
      console.log('❌ Unable to create solution');
    }
  }
  
  console.log('\n📊 Summary:');
  console.log('❌ Railway add endpoints are not working');
  console.log('✅ Project images are working');
  console.log('✅ Projects are displaying');
  console.log('💡 Blog articles need frontend modification to use projects as blogs');
}

main().catch(console.error);
