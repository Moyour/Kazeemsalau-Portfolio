import https from 'https';
import http from 'http';
import 'dotenv/config';

const railwayUrl = process.env.RAILWAY_URL || 'http://localhost:5001';
const adminUsername = process.env.ADMIN_USERNAME || 'kazeemsalau';
const adminPassword = process.env.ADMIN_PASSWORD || process.env.TEMP_ADMIN_PASSWORD || '';

async function updateGitHubImages() {
  try {
    if (!adminPassword) {
      console.error('❌ ADMIN_PASSWORD environment variable not set!');
      console.log('Set ADMIN_PASSWORD in .env file or export it before running this script.');
      process.exit(1);
    }
    
    console.log('🖼️ Updating localhost with your GitHub high-quality images...\n');
    
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
    
    // Step 2: GitHub raw URLs (no compression)
    const githubImageMappings = {
      'Business Writing ': 'https://raw.githubusercontent.com/Moyour/Kazeemsalau-Portfolio/main/high-quality-images/business-writing-hq.jpg',
      'Emotional Intellgence': 'https://raw.githubusercontent.com/Moyour/Kazeemsalau-Portfolio/main/high-quality-images/emotional-intelligence-hq.jpg',
      'The Fixer': 'https://raw.githubusercontent.com/Moyour/Kazeemsalau-Portfolio/main/high-quality-images/the-fixer-hq.jpg'
    };
    
    console.log('\n2. GitHub high-quality image URLs (NO COMPRESSION):');
    Object.entries(githubImageMappings).forEach(([title, url]) => {
      console.log(`   ${title}: ${url}`);
    });
    
    // Step 3: Test if GitHub images are accessible
    console.log('\n3. Testing GitHub image accessibility...');
    for (const [projectTitle, url] of Object.entries(githubImageMappings)) {
      try {
        const response = await makeRequest(url, { method: 'HEAD' });
        if (response.statusCode === 200) {
          console.log(`   ✅ ${projectTitle}: High-quality image accessible`);
        } else {
          console.log(`   ❌ ${projectTitle}: Image not accessible (${response.statusCode})`);
        }
      } catch (error) {
        console.log(`   ❌ ${projectTitle}: Image not accessible - ${error.message}`);
      }
    }
    
    // Step 4: Get current projects
    console.log('\n4. Getting current projects...');
    const projects = await makeRequest(`${railwayUrl}/api/projects`);
    
    if (!Array.isArray(projects)) {
      console.log('❌ Failed to get projects:', projects);
      return;
    }
    
    console.log(`Found ${projects.length} projects`);
    
    // Step 5: Update each project with GitHub high-quality image URL
    console.log('\n5. Updating projects with GitHub high-quality images...');
    
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      console.log(`   ${i + 1}. Updating: "${project.title}"`);
      
      const githubUrl = githubImageMappings[project.title];
      if (githubUrl) {
        console.log(`      Old URL: ${project.imageUrl.substring(0, 50)}...`);
        console.log(`      New URL: ${githubUrl}`);
        
        try {
          const updateData = {
            imageUrl: githubUrl
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
            console.log(`      ✅ Project updated with GitHub high-quality image!`);
          } else {
            console.log(`      ❌ Failed to update project:`, response);
          }
        } catch (error) {
          console.log(`      ❌ Error updating project:`, error.message);
        }
      } else {
        console.log(`      ⚠️  No GitHub URL found for this project`);
      }
    }
    
    // Step 6: Verify updates
    console.log('\n6. Verifying image updates...');
    const updatedProjects = await makeRequest(`${railwayUrl}/api/projects`);
    
    if (Array.isArray(updatedProjects)) {
      console.log(`\n📊 Updated projects with GitHub high-quality images:`);
      updatedProjects.forEach((project, index) => {
        console.log(`   ${index + 1}. ${project.title}`);
        console.log(`      Image: ${project.imageUrl}`);
      });
    }
    
    console.log('\n🎉 Projects updated with GitHub high-quality images!');
    console.log('🌐 Check your portfolio: http://localhost:5173/portfolio');
    console.log('\n✨ These images have NO compression and perfect quality!');
    
  } catch (error) {
    console.error('Error updating with GitHub images:', error.message);
  }
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = (isHttps ? https : http).request(requestOptions, (res) => {
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

updateGitHubImages();
