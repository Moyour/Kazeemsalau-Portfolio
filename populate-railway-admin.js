import https from 'https';

const RAILWAY_URL = 'https://kazeemsalau-portfolio-production.up.railway.app';
const LOCALHOST_URL = 'http://localhost:5001';

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

// Function to make HTTP requests (for localhost)
function makeHttpRequest(url, options, data = null) {
  return new Promise((resolve, reject) => {
    import('http').then(http => {
      const req = http.request(url, options, (res) => {
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
    }).catch(reject);
  });
}

async function getLocalData() {
  console.log('🔍 Getting data from localhost...');
  
  try {
    // Get projects
    const projectsResponse = await makeHttpRequest(`${LOCALHOST_URL}/api/projects`, { method: 'GET' });
    console.log(`📊 Local projects: ${projectsResponse.data.length}`);
    
    // Get blog posts
    const blogsResponse = await makeHttpRequest(`${LOCALHOST_URL}/api/blog-posts`, { method: 'GET' });
    console.log(`📊 Local blog posts: ${blogsResponse.data.length}`);
    
    return {
      projects: projectsResponse.data,
      blogs: blogsResponse.data
    };
  } catch (error) {
    console.log('❌ Error getting local data:', error.message);
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
      console.log(`❌ Error: ${JSON.stringify(response.data, null, 2)}`);
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
      console.log(`❌ Error: ${JSON.stringify(response.data, null, 2)}`);
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
  
  // Get local data
  const localData = await getLocalData();
  
  if (localData.projects.length === 0 && localData.blogs.length === 0) {
    console.log('❌ No local data found. Make sure localhost server is running.');
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
