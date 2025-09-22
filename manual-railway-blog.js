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

// Simple blog posts data
const blogPosts = [
  {
    id: '1',
    title: 'The Power of Emotional Intelligence in Learning Design',
    excerpt: 'Explore how emotional intelligence principles can transform learning experiences and improve learner engagement.',
    content: 'Emotional intelligence (EI) is a crucial skill that can significantly enhance learning design and delivery. In this comprehensive guide, we explore how understanding and applying EI principles can transform learning experiences.',
    category: 'Learning Design',
    imageUrl: '/uploads/blog-images/emtional .jpg',
    readTime: '8 min read',
    published: true
  },
  {
    id: '2',
    title: 'The Fixer: A Case Study in Problem-Based Learning',
    excerpt: 'A deep dive into how problem-based learning can be implemented effectively in corporate training environments.',
    content: 'This case study explores the implementation of problem-based learning (PBL) in a corporate training environment, focusing on the development of critical thinking and problem-solving skills.',
    category: 'Case Study',
    imageUrl: '/uploads/blog-images/fixer.jpg',
    readTime: '6 min read',
    published: true
  },
  {
    id: '3',
    title: 'Business Writing Excellence: A Comprehensive Guide',
    excerpt: 'Master the art of professional business writing with practical tips, templates, and real-world examples.',
    content: 'Effective business writing is a critical skill that can enhance your professional communication and career success. This comprehensive guide provides practical strategies for improving your business writing skills.',
    category: 'Professional Development',
    imageUrl: '/uploads/blog-images/business writing .jpg',
    readTime: '10 min read',
    published: true
  }
];

async function addBlogPost(blogPost) {
  console.log(`🔄 Adding: ${blogPost.title}`);
  
  try {
    const response = await makeRequest(`${RAILWAY_URL}/api/add-blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, blogPost);
    
    if (response.status === 200) {
      console.log(`✅ Success: ${blogPost.title}`);
      return true;
    } else {
      console.log(`❌ Failed: ${blogPost.title} - Status: ${response.status}`);
      console.log(`❌ Error: ${JSON.stringify(response.data, null, 2)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error: ${blogPost.title} - ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Manually adding blog posts to Railway...');
  
  let successCount = 0;
  
  for (const blogPost of blogPosts) {
    const success = await addBlogPost(blogPost);
    if (success) {
      successCount++;
    }
    
    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`\n📊 Results: ${successCount}/${blogPosts.length} blog posts added successfully`);
  
  // Check final status
  try {
    const blogsResponse = await makeRequest(`${RAILWAY_URL}/api/blog-posts`, { method: 'GET' });
    console.log(`📝 Current blog posts on Railway: ${blogsResponse.data.length}`);
  } catch (error) {
    console.log('❌ Error checking final status:', error.message);
  }
}

main().catch(console.error);
