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
    content: '# The Power of Emotional Intelligence in Learning Design\n\nEmotional intelligence (EI) is a crucial skill that can significantly enhance learning design and delivery. In this comprehensive guide, we explore how understanding and applying EI principles can transform learning experiences.\n\n## What is Emotional Intelligence?\n\nEmotional intelligence refers to the ability to recognize, understand, and manage our own emotions while also being able to recognize, understand, and influence the emotions of others.\n\n## Key Components of EI in Learning\n\n1. **Self-Awareness**: Understanding your own emotional responses\n2. **Self-Regulation**: Managing your emotions effectively\n3. **Motivation**: Using emotions to drive learning\n4. **Empathy**: Understanding learner emotions\n5. **Social Skills**: Building positive learning relationships\n\n## Practical Applications\n\n### Creating Emotionally Safe Learning Environments\n\n- Foster psychological safety\n- Encourage open communication\n- Validate learner experiences\n- Provide constructive feedback\n\n### Designing for Emotional Engagement\n\n- Use storytelling techniques\n- Incorporate real-world scenarios\n- Create meaningful learning experiences\n- Build in reflection opportunities\n\n## Conclusion\n\nIntegrating emotional intelligence into learning design creates more effective, engaging, and meaningful learning experiences that resonate with learners on a deeper level.',
    category: 'Learning Design',
    imageUrl: '/uploads/blog-images/emtional .jpg',
    readTime: '8 min read',
    published: true
  },
  {
    id: '2',
    title: 'The Fixer: A Case Study in Problem-Based Learning',
    excerpt: 'A deep dive into how problem-based learning can be implemented effectively in corporate training environments.',
    content: '# The Fixer: A Case Study in Problem-Based Learning\n\nThis case study explores the implementation of problem-based learning (PBL) in a corporate training environment, focusing on the development of critical thinking and problem-solving skills.\n\n## The Challenge\n\nOur organization needed to train employees on complex technical troubleshooting without relying on traditional lecture-based methods.\n\n## The Solution: Problem-Based Learning\n\nWe designed a comprehensive PBL program that:\n\n- Presents real-world technical problems\n- Encourages collaborative problem-solving\n- Develops critical thinking skills\n- Promotes knowledge retention\n\n## Results\n\n- 85% improvement in problem-solving skills\n- 92% learner satisfaction rate\n- 40% reduction in support tickets\n- 78% increase in knowledge retention\n\n## Conclusion\n\nProblem-based learning can be highly effective in corporate training when properly designed, implemented, and supported.',
    category: 'Case Study',
    imageUrl: '/uploads/blog-images/fixer.jpg',
    readTime: '6 min read',
    published: true
  },
  {
    id: '3',
    title: 'Business Writing Excellence: A Comprehensive Guide',
    excerpt: 'Master the art of professional business writing with practical tips, templates, and real-world examples.',
    content: '# Business Writing Excellence: A Comprehensive Guide\n\nEffective business writing is a critical skill that can enhance your professional communication and career success. This comprehensive guide provides practical strategies for improving your business writing skills.\n\n## The Fundamentals of Business Writing\n\n### Clarity and Conciseness\n\n- Use simple, direct language\n- Avoid jargon and unnecessary complexity\n- Get to the point quickly\n- Use active voice when possible\n\n### Professional Tone\n\n- Maintain a respectful, professional tone\n- Be confident but not arrogant\n- Show empathy and understanding\n- Use appropriate formality levels\n\n## Common Business Writing Types\n\n### Emails\n\n- Clear subject lines\n- Proper greeting and closing\n- Concise, focused content\n- Professional formatting\n\n### Reports\n\n- Executive summary\n- Clear structure and headings\n- Supporting data and evidence\n- Actionable recommendations\n\n## Conclusion\n\nMastering business writing takes practice and dedication, but the investment pays off in improved communication, professional credibility, and career advancement.',
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
      console.log(`❌ Failed: ${blogPost.title} - ${response.status}`);
      console.log(`❌ Error: ${JSON.stringify(response.data, null, 2)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error: ${blogPost.title} - ${error.message}`);
    return false;
  }
}

async function checkCurrentStatus() {
  console.log('🔍 Checking current Railway status...');
  
  try {
    const projectsResponse = await makeRequest(`${RAILWAY_URL}/api/projects`, { method: 'GET' });
    const blogsResponse = await makeRequest(`${RAILWAY_URL}/api/blog-posts`, { method: 'GET' });
    
    console.log(`📊 Projects: ${projectsResponse.data.length}`);
    console.log(`📊 Blog Posts: ${blogsResponse.data.length}`);
    
    if (projectsResponse.data.length > 0) {
      console.log(`📝 Sample project: ${projectsResponse.data[0].title}`);
      console.log(`🖼️ Project image: ${projectsResponse.data[0].imageUrl}`);
    }
    
    return { projects: projectsResponse.data.length, blogs: blogsResponse.data.length };
  } catch (error) {
    console.log('❌ Error checking status:', error.message);
    return { projects: 0, blogs: 0 };
  }
}

async function main() {
  console.log('🚀 Fixing Railway content issues...');
  
  // Check current status
  const status = await checkCurrentStatus();
  
  // Try to add blog posts
  if (status.blogs === 0) {
    console.log('\n🔄 Adding blog posts...');
    let successCount = 0;
    
    for (const blogPost of blogPosts) {
      const success = await addBlogPost(blogPost);
      if (success) {
        successCount++;
      }
      
      // Add delay between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log(`\n📊 Blog Results: ${successCount}/${blogPosts.length} blog posts added`);
  } else {
    console.log('✅ Blog posts already exist');
  }
  
  // Check final status
  console.log('\n📊 Final Status:');
  await checkCurrentStatus();
  
  console.log('\n💡 Note: Project images may not display if the image files are not uploaded to Railway');
  console.log('💡 The image URLs are correct, but the actual image files need to be on Railway\'s server');
}

main().catch(console.error);
