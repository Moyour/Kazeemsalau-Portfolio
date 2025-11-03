import https from 'https';
import 'dotenv/config';

const railwayUrl = process.env.RAILWAY_URL || 'https://kazeemsalau-portfolio-production.up.railway.app';
const adminUsername = process.env.ADMIN_USERNAME || 'kazeemsalau';
const adminPassword = process.env.ADMIN_PASSWORD || process.env.TEMP_ADMIN_PASSWORD || '';

async function useExactUrls() {
  try {
    if (!adminPassword) {
      console.error('❌ ADMIN_PASSWORD environment variable not set!');
      console.log('Set ADMIN_PASSWORD in .env file or export it before running this script.');
      process.exit(1);
    }
    
    console.log('🖼️ Using your exact PostImages URLs...\n');
    
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
    
    // Step 2: Use your exact PostImages URLs
    const exactImageMappings = {
      'Business Writing ': 'https://i.postimg.cc/v4KcbBK1/business-writing.jpg',
      'Emotional Intellgence': 'https://i.postimg.cc/0zjbTmVR/emtional.jpg',
      'The Fixer': 'https://i.postimg.cc/v16DByR0/fixer.jpg'
    };
    
    console.log('\n2. Using your exact PostImages URLs:');
    Object.entries(exactImageMappings).forEach(([title, url]) => {
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
    
    // Step 4: Update each project with exact URLs
    console.log('\n4. Updating projects with exact URLs...');
    
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      console.log(`   ${i + 1}. Updating: "${project.title}"`);
      
      const exactUrl = exactImageMappings[project.title];
      if (exactUrl) {
        console.log(`      Current URL: ${project.imageUrl}`);
        console.log(`      New URL: ${exactUrl}`);
        
        try {
          const updateData = {
            imageUrl: exactUrl
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
            console.log(`      ✅ Project updated with exact URL!`);
          } else {
            console.log(`      ❌ Failed to update project:`, response);
          }
        } catch (error) {
          console.log(`      ❌ Error updating project:`, error.message);
        }
      } else {
        console.log(`      ⚠️  No exact URL found for this project`);
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
    
    console.log('\n🎉 Projects updated with your exact PostImages URLs!');
    console.log('🌐 Check your portfolio: https://kazeemsalau-portfolio-production.up.railway.app/portfolio');
    
  } catch (error) {
    console.error('Error using exact URLs:', error.message);
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

useExactUrls();
