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

async function createProjects() {
  console.log('🚀 Creating projects for admin panel...');
  
  const projects = [
    {
      title: "Emotional Intelligence",
      image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop"
    },
    {
      title: "The Fixer", 
      image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
    },
    {
      title: "Business Writing",
      image_url: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop"
    }
  ];
  
  let successCount = 0;
  
  for (const project of projects) {
    console.log(`🔄 Creating: ${project.title}`);
    
    try {
      const response = await makeRequest(`${RAILWAY_URL}/api/update-project-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, project);
      
      if (response.status === 200) {
        console.log(`✅ Success: ${project.title}`);
        successCount++;
      } else {
        console.log(`❌ Failed: ${project.title} - ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${project.title} - ${error.message}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`\n📊 Results: ${successCount}/${projects.length} projects created`);
  
  // Check if projects now exist
  try {
    const projectsResponse = await makeRequest(`${RAILWAY_URL}/api/projects`, { method: 'GET' });
    console.log(`📊 Total projects on Railway: ${projectsResponse.data.length}`);
    
    if (projectsResponse.data.length > 0) {
      console.log('✅ SUCCESS! Admin panel should now have projects!');
    } else {
      console.log('❌ Projects still not showing - Railway database issue');
    }
  } catch (error) {
    console.log('❌ Error checking projects:', error.message);
  }
}

createProjects().catch(console.error);

