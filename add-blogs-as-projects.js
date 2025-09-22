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

// Blog posts data formatted as projects
const blogAsProjects = [
  {
    id: 'blog-1',
    title: 'The Power of Emotional Intelligence in Learning Design',
    description: 'Explore how emotional intelligence principles can transform learning experiences and improve learner engagement.',
    longDescription: 'Emotional intelligence (EI) is a crucial skill that can significantly enhance learning design and delivery. In this comprehensive guide, we explore how understanding and applying EI principles can transform learning experiences.\n\n## What is Emotional Intelligence?\n\nEmotional intelligence refers to the ability to recognize, understand, and manage our own emotions while also being able to recognize, understand, and influence the emotions of others.\n\n## Key Components of EI in Learning\n\n1. **Self-Awareness**: Understanding your own emotional responses\n2. **Self-Regulation**: Managing your emotions effectively\n3. **Motivation**: Using emotions to drive learning\n4. **Empathy**: Understanding learner emotions\n5. **Social Skills**: Building positive learning relationships\n\n## Practical Applications\n\n### Creating Emotionally Safe Learning Environments\n\n- Foster psychological safety\n- Encourage open communication\n- Validate learner experiences\n- Provide constructive feedback\n\n### Designing for Emotional Engagement\n\n- Use storytelling techniques\n- Incorporate real-world scenarios\n- Create meaningful learning experiences\n- Build in reflection opportunities\n\n## Conclusion\n\nIntegrating emotional intelligence into learning design creates more effective, engaging, and meaningful learning experiences that resonate with learners on a deeper level.',
    category: 'blog',
    tools: JSON.stringify(['Learning Design', 'Emotional Intelligence', '8 min read']),
    imageUrl: '/uploads/blog-images/emtional .jpg',
    caseStudyUrl: '',
    scormUrl: '',
    demoUrl: '',
    featured: true,
    challenge: 'How to create emotionally engaging learning experiences',
    solution: 'Apply emotional intelligence principles to learning design',
    process: 'Research, design, implement, evaluate',
    results: 'Improved learner engagement and retention'
  },
  {
    id: 'blog-2',
    title: 'The Fixer: A Case Study in Problem-Based Learning',
    description: 'A deep dive into how problem-based learning can be implemented effectively in corporate training environments.',
    longDescription: 'This case study explores the implementation of problem-based learning (PBL) in a corporate training environment, focusing on the development of critical thinking and problem-solving skills.\n\n## The Challenge\n\nOur organization needed to train employees on complex technical troubleshooting without relying on traditional lecture-based methods.\n\n## The Solution: Problem-Based Learning\n\nWe designed a comprehensive PBL program that:\n\n- Presents real-world technical problems\n- Encourages collaborative problem-solving\n- Develops critical thinking skills\n- Promotes knowledge retention\n\n## Results\n\n- 85% improvement in problem-solving skills\n- 92% learner satisfaction rate\n- 40% reduction in support tickets\n- 78% increase in knowledge retention\n\n## Conclusion\n\nProblem-based learning can be highly effective in corporate training when properly designed, implemented, and supported.',
    category: 'blog',
    tools: JSON.stringify(['Problem-Based Learning', 'Case Study', '6 min read']),
    imageUrl: '/uploads/blog-images/fixer.jpg',
    caseStudyUrl: '',
    scormUrl: '',
    demoUrl: '',
    featured: true,
    challenge: 'Training employees on complex technical troubleshooting',
    solution: 'Implement problem-based learning approach',
    process: 'Design, implement, evaluate, iterate',
    results: '85% improvement in problem-solving skills'
  },
  {
    id: 'blog-3',
    title: 'Business Writing Excellence: A Comprehensive Guide',
    description: 'Master the art of professional business writing with practical tips, templates, and real-world examples.',
    longDescription: 'Effective business writing is a critical skill that can enhance your professional communication and career success. This comprehensive guide provides practical strategies for improving your business writing skills.\n\n## The Fundamentals of Business Writing\n\n### Clarity and Conciseness\n\n- Use simple, direct language\n- Avoid jargon and unnecessary complexity\n- Get to the point quickly\n- Use active voice when possible\n\n### Professional Tone\n\n- Maintain a respectful, professional tone\n- Be confident but not arrogant\n- Show empathy and understanding\n- Use appropriate formality levels\n\n## Common Business Writing Types\n\n### Emails\n\n- Clear subject lines\n- Proper greeting and closing\n- Concise, focused content\n- Professional formatting\n\n### Reports\n\n- Executive summary\n- Clear structure and headings\n- Supporting data and evidence\n- Actionable recommendations\n\n## Conclusion\n\nMastering business writing takes practice and dedication, but the investment pays off in improved communication, professional credibility, and career advancement.',
    category: 'blog',
    tools: JSON.stringify(['Business Writing', 'Professional Development', '10 min read']),
    imageUrl: '/uploads/blog-images/business writing .jpg',
    caseStudyUrl: '',
    scormUrl: '',
    demoUrl: '',
    featured: true,
    challenge: 'Improving professional communication skills',
    solution: 'Master business writing fundamentals',
    process: 'Learn, practice, apply, refine',
    results: 'Enhanced professional credibility'
  }
];

async function addBlogAsProject(blogProject) {
  console.log(`🔄 Adding blog as project: ${blogProject.title}`);
  
  try {
    const response = await makeRequest(`${RAILWAY_URL}/api/add-project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, blogProject);
    
    if (response.status === 200) {
      console.log(`✅ Success: ${blogProject.title}`);
      return true;
    } else {
      console.log(`❌ Failed: ${blogProject.title} - ${response.status}`);
      console.log(`❌ Error: ${JSON.stringify(response.data, null, 2)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error: ${blogProject.title} - ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Adding blog posts as projects to Railway...');
  
  let successCount = 0;
  
  for (const blogProject of blogAsProjects) {
    const success = await addBlogAsProject(blogProject);
    if (success) {
      successCount++;
    }
    
    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`\n📊 Results: ${successCount}/${blogAsProjects.length} blog posts added as projects`);
  
  // Check final status
  try {
    const projectsResponse = await makeRequest(`${RAILWAY_URL}/api/projects`, { method: 'GET' });
    console.log(`📝 Total projects on Railway: ${projectsResponse.data.length}`);
    
    // Filter blog projects
    const blogProjects = projectsResponse.data.filter(p => p.category === 'blog');
    console.log(`📝 Blog projects: ${blogProjects.length}`);
    
    if (blogProjects.length > 0) {
      console.log('✅ Blog posts are now available as projects on Railway!');
      console.log('💡 You can modify the frontend to display projects with category "blog" as blog posts');
    }
  } catch (error) {
    console.log('❌ Error checking final status:', error.message);
  }
}

main().catch(console.error);
