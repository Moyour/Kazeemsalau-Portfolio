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

// External image URLs that should work on Railway
const imageUpdates = [
  {
    title: 'Emotional Intellgence',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=faces'
  },
  {
    title: 'The Fixer',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=faces'
  },
  {
    title: 'Business Writing',
    imageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop&crop=faces'
  }
];

async function updateProjectImage(title, imageUrl) {
  console.log(`🔄 Updating image for: ${title}`);
  
  try {
    const response = await makeRequest(`${RAILWAY_URL}/api/update-project-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      title: title,
      image_url: imageUrl
    });
    
    if (response.status === 200) {
      console.log(`✅ Success: ${title}`);
      return true;
    } else {
      console.log(`❌ Failed: ${title} - ${response.status}`);
      console.log(`❌ Error: ${JSON.stringify(response.data, null, 2)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error: ${title} - ${error.message}`);
    return false;
  }
}

async function checkCurrentProjects() {
  console.log('🔍 Checking current Railway projects...');
  
  try {
    const projectsResponse = await makeRequest(`${RAILWAY_URL}/api/projects`, { method: 'GET' });
    console.log(`📊 Projects: ${projectsResponse.data.length}`);
    
    projectsResponse.data.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
      console.log(`   Image: ${project.imageUrl}`);
    });
    
    return projectsResponse.data;
  } catch (error) {
    console.log('❌ Error checking projects:', error.message);
    return [];
  }
}

async function main() {
  console.log('🚀 Fixing Railway project images...');
  
  // Check current projects
  const projects = await checkCurrentProjects();
  
  if (projects.length === 0) {
    console.log('❌ No projects found on Railway');
    return;
  }
  
  // Update images
  console.log('\n🔄 Updating project images with external URLs...');
  let successCount = 0;
  
  for (const imageUpdate of imageUpdates) {
    const success = await updateProjectImage(imageUpdate.title, imageUpdate.imageUrl);
    if (success) {
      successCount++;
    }
    
    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`\n📊 Results: ${successCount}/${imageUpdates.length} project images updated`);
  
  // Check final status
  console.log('\n📊 Final Status:');
  await checkCurrentProjects();
  
  console.log('\n💡 Project images should now display on Railway using external URLs');
}

main().catch(console.error);
