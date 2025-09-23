import https from 'https';

const railwayUrl = 'https://kazeemsalau-portfolio-production.up.railway.app';

async function fixImageQualityFinal() {
  try {
    console.log('🖼️ Final solution for perfect image quality...\n');
    
    // Step 1: Login as admin
    console.log('1. Logging in as admin...');
    const loginResponse = await makeRequest(`${railwayUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'kazeemsalau',
        password: '911Porsche@!'
      })
    });
    
    if (!loginResponse.token) {
      console.log('❌ Login failed:', loginResponse);
      return;
    }
    
    console.log('✅ Admin login successful');
    const token = loginResponse.token;
    
    // Step 2: Use Imgur with high quality settings
    // Imgur typically preserves better quality than PostImages
    const imgurMappings = {
      'Business Writing ': 'https://i.imgur.com/v4KcbBK1.jpg',
      'Emotional Intellgence': 'https://i.imgur.com/0zjbTmVR.jpg',
      'The Fixer': 'https://i.imgur.com/v16DByR0.jpg'
    };
    
    // Step 3: Get current projects
    console.log('\n2. Getting current projects...');
    const projects = await makeRequest(`${railwayUrl}/api/projects`);
    
    if (!Array.isArray(projects)) {
      console.log('❌ Failed to get projects:', projects);
      return;
    }
    
    console.log(`Found ${projects.length} projects`);
    
    // Step 4: Update each project with Imgur URLs
    console.log('\n3. Updating projects with Imgur URLs...');
    
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      console.log(`   ${i + 1}. Updating: "${project.title}"`);
      
      const imgurUrl = imgurMappings[project.title];
      if (imgurUrl) {
        console.log(`      Old URL: ${project.imageUrl.substring(0, 50)}...`);
        console.log(`      New URL: ${imgurUrl}`);
        
        try {
          const updateData = {
            imageUrl: imgurUrl
          };
          
          const response = await makeRequest(`${railwayUrl}/api/projects/${project.id}`, {
            method: 'PUT',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
          });
          
          if (response.id) {
            console.log(`      ✅ Project updated with Imgur URL!`);
          } else {
            console.log(`      ❌ Failed to update project:`, response);
          }
        } catch (error) {
          console.log(`      ❌ Error updating project:`, error.message);
        }
      } else {
        console.log(`      ⚠️  No Imgur URL found for this project`);
      }
    }
    
    // Step 5: Verify updates
    console.log('\n4. Verifying image updates...');
    const updatedProjects = await makeRequest(`${railwayUrl}/api/projects`);
    
    if (Array.isArray(updatedProjects)) {
      console.log(`\n📊 Updated projects:`);
      updatedProjects.forEach((project, index) => {
        console.log(`   ${index + 1}. ${project.title}`);
        console.log(`      Image: ${project.imageUrl}`);
      });
    }
    
    console.log('\n🎉 Projects updated with Imgur URLs!');
    console.log('🌐 Check your portfolio: https://kazeemsalau-portfolio-production.up.railway.app/portfolio');
    
    console.log('\n💡 If images are still poor quality, try:');
    console.log('   1. Re-upload to Imgur with "High Quality" option');
    console.log('   2. Use Cloudinary (free account)');
    console.log('   3. Host on your own domain');
    
  } catch (error) {
    console.error('Error fixing image quality:', error.message);
  }
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = https.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

fixImageQualityFinal();
