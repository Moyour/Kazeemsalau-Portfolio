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

// Blog posts data
const blogPosts = [
  {
    id: '1',
    title: 'The Power of Emotional Intelligence in Learning Design',
    excerpt: 'Explore how emotional intelligence principles can transform learning experiences and improve learner engagement.',
    content: '# The Power of Emotional Intelligence in Learning Design\n\nEmotional intelligence (EI) is a crucial skill that can significantly enhance learning design and delivery. In this comprehensive guide, we explore how understanding and applying EI principles can transform learning experiences.\n\n## What is Emotional Intelligence?\n\nEmotional intelligence refers to the ability to recognize, understand, and manage our own emotions while also being able to recognize, understand, and influence the emotions of others.\n\n## Key Components of EI in Learning\n\n1. **Self-Awareness**: Understanding your own emotional responses\n2. **Self-Regulation**: Managing your emotions effectively\n3. **Motivation**: Using emotions to drive learning\n4. **Empathy**: Understanding learner emotions\n5. **Social Skills**: Building positive learning relationships\n\n## Practical Applications\n\n### Creating Emotionally Safe Learning Environments\n\n- Foster psychological safety\n- Encourage open communication\n- Validate learner experiences\n- Provide constructive feedback\n\n### Designing for Emotional Engagement\n\n- Use storytelling techniques\n- Incorporate real-world scenarios\n- Create meaningful learning experiences\n- Build in reflection opportunities\n\n## Conclusion\n\nIntegrating emotional intelligence into learning design creates more effective, engaging, and meaningful learning experiences that resonate with learners on a deeper level.',
    category: 'Learning Design',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    readTime: '8 min read',
    published: true
  },
  {
    id: '2',
    title: 'The Fixer: A Case Study in Problem-Based Learning',
    excerpt: 'A deep dive into how problem-based learning can be implemented effectively in corporate training environments.',
    content: '# The Fixer: A Case Study in Problem-Based Learning\n\nThis case study explores the implementation of problem-based learning (PBL) in a corporate training environment, focusing on the development of critical thinking and problem-solving skills.\n\n## The Challenge\n\nOur organization needed to train employees on complex technical troubleshooting without relying on traditional lecture-based methods.\n\n## The Solution: Problem-Based Learning\n\nWe designed a comprehensive PBL program that:\n\n- Presents real-world technical problems\n- Encourages collaborative problem-solving\n- Develops critical thinking skills\n- Promotes knowledge retention\n\n## Results\n\n- 85% improvement in problem-solving skills\n- 92% learner satisfaction rate\n- 40% reduction in support tickets\n- 78% increase in knowledge retention\n\n## Conclusion\n\nProblem-based learning can be highly effective in corporate training when properly designed, implemented, and supported.',
    category: 'Case Study',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    readTime: '6 min read',
    published: true
  },
  {
    id: '3',
    title: 'Business Writing Excellence: A Comprehensive Guide',
    excerpt: 'Master the art of professional business writing with practical tips, templates, and real-world examples.',
    content: '# Business Writing Excellence: A Comprehensive Guide\n\nEffective business writing is a critical skill that can enhance your professional communication and career success. This comprehensive guide provides practical strategies for improving your business writing skills.\n\n## The Fundamentals of Business Writing\n\n### Clarity and Conciseness\n\n- Use simple, direct language\n- Avoid jargon and unnecessary complexity\n- Get to the point quickly\n- Use active voice when possible\n\n### Professional Tone\n\n- Maintain a respectful, professional tone\n- Be confident but not arrogant\n- Show empathy and understanding\n- Use appropriate formality levels\n\n## Common Business Writing Types\n\n### Emails\n\n- Clear subject lines\n- Proper greeting and closing\n- Concise, focused content\n- Professional formatting\n\n### Reports\n\n- Executive summary\n- Clear structure and headings\n- Supporting data and evidence\n- Actionable recommendations\n\n## Conclusion\n\nMastering business writing takes practice and dedication, but the investment pays off in improved communication, professional credibility, and career advancement.',
    category: 'Professional Development',
    imageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop',
    readTime: '10 min read',
    published: true
  }
];

// Try to add blog post using a different approach
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

// Try to add blog post using project endpoint as workaround
async function addBlogAsProject(blogPost) {
  console.log(`🔄 Adding as project: ${blogPost.title}`);
  
  const projectData = {
    id: `blog-${blogPost.id}`,
    title: blogPost.title,
    description: blogPost.excerpt,
    longDescription: blogPost.content,
    category: 'blog',
    tools: JSON.stringify([blogPost.category, blogPost.readTime]),
    imageUrl: blogPost.imageUrl,
    caseStudyUrl: '',
    scormUrl: '',
    demoUrl: '',
    featured: true,
    challenge: 'Creating engaging content',
    solution: 'Apply best practices',
    process: 'Research, write, edit, publish',
    results: 'Engaged readers'
  };
  
  try {
    const response = await makeRequest(`${RAILWAY_URL}/api/add-project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, projectData);
    
    if (response.status === 200) {
      console.log(`✅ Success as project: ${blogPost.title}`);
      return true;
    } else {
      console.log(`❌ Failed as project: ${blogPost.title} - ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error as project: ${blogPost.title} - ${error.message}`);
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
    
    // Check for blog projects
    const blogProjects = projectsResponse.data.filter(p => p.category === 'blog');
    console.log(`📊 Blog Projects: ${blogProjects.length}`);
    
    return { projects: projectsResponse.data.length, blogs: blogsResponse.data.length, blogProjects: blogProjects.length };
  } catch (error) {
    console.log('❌ Error checking status:', error.message);
    return { projects: 0, blogs: 0, blogProjects: 0 };
  }
}

async function main() {
  console.log('🚀 Fixing Railway blog articles...');
  
  // Check current status
  const status = await checkCurrentStatus();
  
  if (status.blogs > 0) {
    console.log('✅ Blog posts already exist on Railway');
    return;
  }
  
  // Try to add blog posts directly
  console.log('\n🔄 Attempting to add blog posts directly...');
  let directSuccess = 0;
  
  for (const blogPost of blogPosts) {
    const success = await addBlogPost(blogPost);
    if (success) {
      directSuccess++;
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  if (directSuccess > 0) {
    console.log(`✅ Added ${directSuccess} blog posts directly`);
    return;
  }
  
  // If direct approach fails, try adding as projects
  console.log('\n🔄 Direct approach failed, trying blog posts as projects...');
  let projectSuccess = 0;
  
  for (const blogPost of blogPosts) {
    const success = await addBlogAsProject(blogPost);
    if (success) {
      projectSuccess++;
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`\n📊 Results:`);
  console.log(`📝 Direct blog posts: ${directSuccess}/${blogPosts.length}`);
  console.log(`📝 Blog as projects: ${projectSuccess}/${blogPosts.length}`);
  
  // Check final status
  console.log('\n📊 Final Status:');
  await checkCurrentStatus();
  
  if (directSuccess > 0) {
    console.log('✅ Blog articles are now displaying on Railway!');
  } else if (projectSuccess > 0) {
    console.log('✅ Blog articles added as projects - frontend can be modified to display them as blogs');
  } else {
    console.log('❌ Unable to add blog articles - Railway add endpoints are not working');
    console.log('💡 Consider using Railway database tools or support to manually add blog data');
  }
}

main().catch(console.error);
