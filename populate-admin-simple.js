import https from 'https';
import fs from 'fs';

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

async function loadLocalData() {
  console.log('🔍 Loading local data...');
  
  try {
    const projectsData = fs.readFileSync('local-projects.json', 'utf8');
    const blogsData = fs.readFileSync('local-blogs.json', 'utf8');
    
    const projects = JSON.parse(projectsData);
    const blogs = JSON.parse(blogsData);
    
    console.log(`📊 Loaded ${projects.length} projects`);
    console.log(`📊 Loaded ${blogs.length} blog posts`);
    
    return { projects, blogs };
  } catch (error) {
    console.log('❌ Error loading local data:', error.message);
    return { projects: [], blogs: [] };
  }
}

async function addProjectToRailway(project) {
  console.log(`🔄 Adding project: ${project.title}`);
  
  try {
    const response = await makeRequest(`${RAILWAY_URL}/api/add-project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, project);
    
    if (response.status === 200) {
      console.log(`✅ Success: ${project.title}`);
      return true;
    } else {
      console.log(`❌ Failed: ${project.title} - ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error: ${project.title} - ${error.message}`);
    return false;
  }
}

async function addBlogToRailway(blog) {
  console.log(`🔄 Adding blog: ${blog.title}`);
  
  try {
    const response = await makeRequest(`${RAILWAY_URL}/api/add-blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, blog);
    
    if (response.status === 200) {
      console.log(`✅ Success: ${blog.title}`);
      return true;
    } else {
      console.log(`❌ Failed: ${blog.title} - ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error: ${blog.title} - ${error.message}`);
    return false;
  }
}

async function checkRailwayStatus() {
  console.log('🔍 Checking Railway status...');
  
  try {
    const projectsResponse = await makeRequest(`${RAILWAY_URL}/api/projects`, { method: 'GET' });
    const blogsResponse = await makeRequest(`${RAILWAY_URL}/api/blog-posts`, { method: 'GET' });
    const contactsResponse = await makeRequest(`${RAILWAY_URL}/api/contact-submissions`, { method: 'GET' });
    
    console.log(`📊 Railway projects: ${projectsResponse.data.length}`);
    console.log(`📊 Railway blog posts: ${blogsResponse.data.length}`);
    console.log(`📊 Railway contact submissions: ${contactsResponse.data.length}`);
    
    return {
      projects: projectsResponse.data.length,
      blogs: blogsResponse.data.length,
      contacts: contactsResponse.data.length
    };
  } catch (error) {
    console.log('❌ Error checking Railway status:', error.message);
    return { projects: 0, blogs: 0, contacts: 0 };
  }
}

async function main() {
  console.log('🚀 Populating Railway admin panel...');
  
  // Check current Railway status
  const railwayStatus = await checkRailwayStatus();
  
  if (railwayStatus.projects > 0 && railwayStatus.blogs > 0) {
    console.log('✅ Railway already has data!');
    return;
  }
  
  // Load local data
  const localData = await loadLocalData();
  
  if (localData.projects.length === 0 && localData.blogs.length === 0) {
    console.log('❌ No local data found.');
    return;
  }
  
  // Add projects
  if (localData.projects.length > 0) {
    console.log('\n🔄 Adding projects to Railway...');
    let projectSuccess = 0;
    
    for (const project of localData.projects) {
      const success = await addProjectToRailway(project);
      if (success) {
        projectSuccess++;
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log(`📊 Projects added: ${projectSuccess}/${localData.projects.length}`);
  }
  
  // Add blog posts
  if (localData.blogs.length > 0) {
    console.log('\n🔄 Adding blog posts to Railway...');
    let blogSuccess = 0;
    
    for (const blog of localData.blogs) {
      const success = await addBlogToRailway(blog);
      if (success) {
        blogSuccess++;
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log(`📊 Blog posts added: ${blogSuccess}/${localData.blogs.length}`);
  }
  
  // Check final status
  console.log('\n📊 Final Railway status:');
  await checkRailwayStatus();
  
  console.log('\n✅ Admin panel should now have data!');
  console.log('💡 Visit: https://kazeemsalau-portfolio-production.up.railway.app/admin');
}

main().catch(console.error);

