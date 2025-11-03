import https from 'https';
import 'dotenv/config';

const railwayUrl = process.env.RAILWAY_URL || 'https://kazeemsalau-portfolio-production.up.railway.app';
const adminUsername = process.env.ADMIN_USERNAME || 'kazeemsalau';
const adminPassword = process.env.ADMIN_PASSWORD || process.env.TEMP_ADMIN_PASSWORD || '';

async function restoreWorkingImages() {
  try {
    if (!adminPassword) {
      console.error('❌ ADMIN_PASSWORD environment variable not set!');
      console.log('Set ADMIN_PASSWORD in .env file or export it before running this script.');
      process.exit(1);
    }
    
    console.log('🔄 Restoring your working PostImages URLs...\n');
    
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
    
    // Step 2: Restore your working PostImages URLs
    const workingImageMappings = {
      'Business Writing ': 'https://i.postimg.cc/v4KcbBK1/business-writing.jpg',
      'Emotional Intellgence': 'https://i.postimg.cc/0zjbTmVR/emtional.jpg',
      'The Fixer': 'https://i.postimg.cc/v16DByR0/fixer.jpg'
    };
    
    console.log('\n2. Restoring working PostImages URLs:');
    Object.entries(workingImageMappings).forEach(([title, url]) => {
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
    
    // Step 4: Update each project with working PostImages URLs
    console.log('\n4. Restoring projects with working images...');
    
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      console.log(`   ${i + 1}. Restoring: "${project.title}"`);
      
      const workingUrl = workingImageMappings[project.title];
      if (workingUrl) {
        console.log(`      Current URL: ${project.imageUrl}`);
        console.log(`      Restoring to: ${workingUrl}`);
        
        try {
          const updateData = {
            imageUrl: workingUrl
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
            console.log(`      ✅ Project restored with working image!`);
          } else {
            console.log(`      ❌ Failed to restore project:`, response);
          }
        } catch (error) {
          console.log(`      ❌ Error restoring project:`, error.message);
        }
      } else {
        console.log(`      ⚠️  No working URL found for this project`);
      }
    }
    
    // Step 5: Verify updates
    console.log('\n5. Verifying image restoration...');
    const updatedProjects = await makeRequest(`${railwayUrl}/api/projects`);
    
    if (Array.isArray(updatedProjects)) {
      console.log(`\n📊 Restored projects:`);
      updatedProjects.forEach((project, index) => {
        console.log(`   ${index + 1}. ${project.title}`);
        console.log(`      Image: ${project.imageUrl}`);
      });
    }
    
    console.log('\n🎉 Images restored with your working PostImages URLs!');
    console.log('🌐 Check your portfolio: https://kazeemsalau-portfolio-production.up.railway.app/portfolio');
    
  } catch (error) {
    console.error('Error restoring working images:', error.message);
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

restoreWorkingImages();
