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

async function checkRailwayStatus() {
  console.log('🔍 Checking Railway status...');
  
  try {
    // Check health
    const healthResponse = await makeRequest(`${RAILWAY_URL}/api/health`, { method: 'GET' });
    console.log(`📊 Health: ${healthResponse.status}`);
    
    // Check projects
    const projectsResponse = await makeRequest(`${RAILWAY_URL}/api/projects`, { method: 'GET' });
    console.log(`📊 Projects: ${projectsResponse.data.length}`);
    
    // Check blog posts
    const blogsResponse = await makeRequest(`${RAILWAY_URL}/api/blog-posts`, { method: 'GET' });
    console.log(`📊 Blog Posts: ${blogsResponse.data.length}`);
    
    // Check contact submissions
    const contactsResponse = await makeRequest(`${RAILWAY_URL}/api/contact-submissions`, { method: 'GET' });
    console.log(`📊 Contact Submissions: ${contactsResponse.data.length}`);
    
    return {
      health: healthResponse.status,
      projects: projectsResponse.data.length,
      blogs: blogsResponse.data.length,
      contacts: contactsResponse.data.length
    };
  } catch (error) {
    console.log('❌ Error checking Railway status:', error.message);
    return null;
  }
}

async function createProjectWorkaround() {
  console.log('\n💡 Creating project workaround...');
  
  // Since add endpoints aren't working, let's create a workaround
  // by modifying the frontend to handle empty projects gracefully
  
  console.log('🔧 Workaround options:');
  console.log('1. Modify frontend to show a "Coming Soon" message when no projects');
  console.log('2. Create a static projects array in the frontend');
  console.log('3. Use a different data source for projects');
  console.log('4. Contact Railway support about the add endpoints issue');
  
  // Let's try to create a simple project using a different approach
  console.log('\n🔄 Trying alternative approach...');
  
  // Try to use the update-project-image endpoint if it exists
  try {
    const response = await makeRequest(`${RAILWAY_URL}/api/update-project-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      title: 'Test Project',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
    });
    
    console.log(`📝 Update image response: ${response.status}`);
    if (response.status === 200) {
      console.log('✅ Alternative approach worked!');
      return true;
    }
  } catch (error) {
    console.log('❌ Alternative approach failed:', error.message);
  }
  
  return false;
}

async function main() {
  console.log('🚀 Railway Projects Workaround...');
  
  // Check current status
  const status = await checkRailwayStatus();
  
  if (!status) {
    console.log('❌ Unable to connect to Railway');
    return;
  }
  
  console.log('\n📊 Current Railway Status:');
  console.log(`   Health: ${status.health}`);
  console.log(`   Projects: ${status.projects}`);
  console.log(`   Blog Posts: ${status.blogs}`);
  console.log(`   Contact Submissions: ${status.contacts}`);
  
  if (status.projects > 0) {
    console.log('✅ Projects are already displaying on Railway!');
    return;
  }
  
  // Try workaround
  const workaroundSuccess = await createProjectWorkaround();
  
  if (!workaroundSuccess) {
    console.log('\n❌ All approaches failed');
    console.log('💡 Recommendations:');
    console.log('   1. Contact Railway support about add endpoints');
    console.log('   2. Use Railway database tools to manually add data');
    console.log('   3. Modify frontend to handle empty state gracefully');
    console.log('   4. Consider using a different deployment platform');
  }
}

main().catch(console.error);
