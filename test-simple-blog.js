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

async function testSimpleBlog() {
  console.log('🔄 Testing simple blog post...');
  
  const blogData = {
    id: 'test-minimal',
    title: 'Minimal Test',
    excerpt: 'Test excerpt',
    content: 'Test content',
    category: 'Test',
    imageUrl: '/test.jpg',
    readTime: '1 min',
    published: true
  };
  
  try {
    const response = await makeRequest(`${RAILWAY_URL}/api/add-blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, blogData);
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('Error:', error.message);
  }
}

testSimpleBlog().catch(console.error);
