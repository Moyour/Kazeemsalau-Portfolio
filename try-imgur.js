import https from 'https';
import 'dotenv/config';

const railwayUrl = process.env.RAILWAY_URL || 'https://kazeemsalau-portfolio-production.up.railway.app';
const adminUsername = process.env.ADMIN_USERNAME || 'kazeemsalau';
const adminPassword = process.env.ADMIN_PASSWORD || process.env.TEMP_ADMIN_PASSWORD || '';

async function tryImgur() {
  try {
    if (!adminPassword) {
      console.error('❌ ADMIN_PASSWORD environment variable not set!');
      console.log('Set ADMIN_PASSWORD in .env file or export it before running this script.');
      process.exit(1);
    }
    
    console.log('🖼️ Trying Imgur for better image quality...\n');
    
    // Step 1: Login as admin
    console.log('1. Logging in as admin...');
    const loginResponse = await makeRequest(`${railwayUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: adminUsername,
        password: adminPassword
      })
    });
    
    if (!loginResponse.token) {
      console.log('❌ Login failed:', loginResponse);
      return;
    }
    
    console.log('✅ Admin login successful');
    const token = loginResponse.token;
    
    // Step 2: Use Imgur URLs (Imgur typically preserves better quality)
    const imgurMappings = {
      'Business Writing ': 'https://i.imgur.com/v4KcbBK1.jpg',
      'Emotional Intellgence': 'https://i.imgur.com/0zjbTmVR.jpg',
      'The Fixer': 'https://i.imgur.com/v16DByR0.jpg'
    };
    
    console.log('\n2. Trying Imgur URLs:');
    Object.entries(imgurMappings).forEach(([title, url]) => {
      console.log(`   ${title}: ${url}`);
    });
    
    // Step 3: Get current projects
    console.log('\n3. Getting current projects...');
    const projects = await makeRequest(`${railwayUrl}/api/projects`);
    
    if (!Array.isArray(projects)) {
      console.log('❌ Failed to get projects:', projects);
      return;
    }
    
    console.log(`Found ${projects.length} projects`);
    
    // Step 4: Update each project with Imgur URLs
    console.log('\n4. Updating projects with Imgur URLs...');
    
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      console.log(`   ${i + 1}. Updating: "${project.title}"`);
      
      const imgurUrl = imgurMappings[project.title];
      if (imgurUrl) {
        console.log(`      Current URL: ${project.imageUrl}`);
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
    console.log('\n5. Verifying image updates...');
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
    
    console.log('\n💡 If images are still poor quality, the issue might be:');
    console.log('   1. Original images were compressed during upload');
    console.log('   2. Browser is scaling images down');
    console.log('   3. CSS is affecting image display');
    
  } catch (error) {
    console.error('Error trying Imgur:', error.message);
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

tryImgur();
