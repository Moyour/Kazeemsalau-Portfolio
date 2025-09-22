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

// Try to add blog posts using a very simple approach
async function addSimpleBlog(blogData) {
  console.log(`🔄 Adding: ${blogData.title}`);
  
  try {
    const response = await makeRequest(`${RAILWAY_URL}/api/add-blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, blogData);
    
    if (response.status === 200) {
      console.log(`✅ Success: ${blogData.title}`);
      return true;
    } else {
      console.log(`❌ Failed: ${blogData.title} - ${response.status}`);
      console.log(`❌ Error: ${JSON.stringify(response.data, null, 2)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error: ${blogData.title} - ${error.message}`);
    return false;
  }
}

// Very simple blog posts with minimal data
const simpleBlogs = [
  {
    id: '1',
    title: 'The Power of Emotional Intelligence in Learning Design',
    excerpt: 'Explore how emotional intelligence principles can transform learning experiences.',
    content: 'Emotional intelligence (EI) is a crucial skill that can significantly enhance learning design and delivery.',
    category: 'Learning Design',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    readTime: '8 min read',
    published: 1
  },
  {
    id: '2',
    title: 'The Fixer: A Case Study in Problem-Based Learning',
    excerpt: 'A deep dive into how problem-based learning can be implemented effectively.',
    content: 'This case study explores the implementation of problem-based learning (PBL) in a corporate training environment.',
    category: 'Case Study',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    readTime: '6 min read',
    published: 1
  },
  {
    id: '3',
    title: 'Business Writing Excellence: A Comprehensive Guide',
    excerpt: 'Master the art of professional business writing with practical tips.',
    content: 'Effective business writing is a critical skill that can enhance your professional communication.',
    category: 'Professional Development',
    imageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop',
    readTime: '10 min read',
    published: 1
  }
];

async function main() {
  console.log('🚀 Adding simple blog posts to Railway...');
  
  let successCount = 0;
  
  for (const blog of simpleBlogs) {
    const success = await addSimpleBlog(blog);
    if (success) {
      successCount++;
    }
    
    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  console.log(`\n📊 Results: ${successCount}/${simpleBlogs.length} blog posts added`);
  
  // Check final status
  try {
    const blogsResponse = await makeRequest(`${RAILWAY_URL}/api/blog-posts`, { method: 'GET' });
    console.log(`📝 Current blog posts on Railway: ${blogsResponse.data.length}`);
    
    if (blogsResponse.data.length > 0) {
      console.log('✅ Blog posts are now available on Railway!');
      console.log('📝 Sample blog:', blogsResponse.data[0].title);
    } else {
      console.log('❌ Still no blog posts on Railway');
      console.log('💡 The add-blog endpoint is consistently failing - this may require Railway support');
    }
  } catch (error) {
    console.log('❌ Error checking final status:', error.message);
  }
}

main().catch(console.error);
