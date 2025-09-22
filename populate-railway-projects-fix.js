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

// Projects data from localhost
const projects = [
  {
    id: "2f67e896-a6f1-478c-8bd6-81043a7a5596",
    title: "Emotional Intellgence",
    description: "This course focuses on developing emotional intelligence, helping learners understand, manage, and leverage their emotions effectively. It emphasizes the connection between emotional awareness and better decision-making, resilience under pressure, and achieving meaningful success beyond technical skills or knowledge. Participants will explore real-life scenarios that strengthen their ability to respond thoughtfully and confidently in both personal and professional contexts.",
    longDescription: null,
    category: "corporate",
    tools: ["Articulate Storyline"],
    imageUrl: "/uploads/All%20Image%20Upload/emtional%20.jpg",
    caseStudyUrl: "",
    scormUrl: "https://codvacreatives.com/demo/ei/story_html5.html",
    demoUrl: "",
    featured: false,
    challenge: "Many individuals struggle to recognize and regulate their emotions, especially in high-pressure situations, which can lead to poor decisions, strained relationships, and missed opportunities. The challenge lies in bridging the gap between cognitive skills and emotional awareness to foster holistic success.",
    solution: "The course offers practical strategies, tools, and exercises to enhance emotional intelligence. Through interactive scenarios, reflective exercises, and guided insights, learners develop the ability to identify emotional triggers, manage reactions, and respond to challenges with clarity and empathy.",
    process: "Learners progress through structured modules that combine theory with practical application. The process includes understanding the spectrum of human emotions, practicing self-awareness and self-regulation, applying emotional insight to decision-making, and engaging in scenario-based exercises to reinforce learning in real-world contexts.",
    results: "By the end of the course, participants gain heightened emotional awareness, improved decision-making skills, and the ability to manage stress and interpersonal dynamics effectively. This leads to stronger relationships, greater resilience, and a deeper sense of personal and professional fulfillment."
  },
  {
    id: "8c992457-165c-4cbc-8f6b-40f3706a1eea",
    title: "The Fixer",
    description: "This training is designed as a special assignment where you step into the role of \"The Fixer,\" tasked with addressing critical knowledge gaps in agency policy. Through immersive, scenario-based learning, you will sharpen decision-making skills, collaborate with colleagues, and apply policy knowledge to restore service delivery and boost organizational performance.",
    longDescription: null,
    category: "elearning",
    tools: ["Stroyline", "Illustration"],
    imageUrl: "/uploads/All%20Image%20Upload/fixer.jpg",
    caseStudyUrl: null,
    scormUrl: "https://codvacreatives.com/demo/fixer/story_html5.html",
    demoUrl: null,
    featured: false,
    challenge: "Despite strong skills and a reputation for excellence, recent downturns in service delivery have revealed significant policy knowledge gaps within the agency. These gaps not only impact efficiency but also threaten credibility and revenue. Overcoming them requires both personal resilience and collective effort.",
    solution: "The program positions you as the key problem solver—leveraging your insight, professionalism, and decision-making ability to close policy gaps. By engaging in practical tasks, knowledge checks, and collaboration exercises, you gain the tools to rebuild confidence, strengthen performance, and deliver results that matter.",
    process: "Participants are guided through real-world challenges simulating agency operations. Each scenario demands careful application of policy knowledge, teamwork, and strategic thinking. Step by step, learners build expertise, practice resilience, and refine their ability to make sound decisions under pressure.",
    results: "By completing the assignment, you will have reinforced your reputation as \"The Fixer.\" The agency benefits from improved service delivery, stronger compliance with policy, and enhanced revenue stream, while you demonstrate resilience, adaptability, and leadership in action."
  },
  {
    id: "e8f2b407-33f2-49cb-b186-aa97c00cf568",
    title: "Business Writing ",
    description: "Strong business writing is more than putting words on a page — it's about influencing decisions, building credibility, and communicating with clarity. This course is designed to help professionals at all levels master the fundamentals of business writing, from crafting concise emails to developing persuasive reports. You will gain practical techniques to write with confidence, clarity, and impact, ensuring your messages are understood and respected in any workplace.",
    longDescription: null,
    category: "corporate",
    tools: ["Articulate Stroyline"],
    imageUrl: "/uploads/All%20Image%20Upload/business%20writing%20.jpg",
    caseStudyUrl: null,
    scormUrl: "https://codvacreatives.com/demo/Businesswriting/story_html5.html",
    demoUrl: null,
    featured: true,
    challenge: "In today's fast-paced business environment, unclear or poorly written communication can cause misunderstandings, delays, and even damage professional relationships. Many professionals struggle with writing that is either too wordy, too vague, or lacks the polish required in a competitive business world. This often results in lost opportunities and reduced credibility.",
    solution: "Our Business Writing course equips you with the tools and strategies to overcome these challenges. You will learn how to plan, structure, and refine your writing so every message you send is purposeful, professional, and impactful. Through guided lessons and real-world examples, you'll develop a writing style that enhances your reputation and builds stronger connections with colleagues, clients, and stakeholders.",
    process: "This course takes you through a step-by-step journey to transform your writing. We begin with the foundations of effective communication, focusing on clarity, brevity, and the right tone for different business contexts. From there, you'll apply these principles to practical formats such as emails, reports, proposals, and executive summaries. As you progress, you'll learn techniques for editing and refining your drafts to eliminate errors and enhance professionalism. Finally, the course guides you into persuasive writing strategies, helping you craft messages that influence decisions and inspire action. Throughout, real-world examples and hands-on practice ensure that you immediately apply what you learn in meaningful ways.",
    results: "By the end of the course, you will be able to write with confidence and precision in any business setting. Your communication will become clearer, more concise, and more impactful, reducing misunderstandings and increasing efficiency. You'll also project greater professionalism, enhancing your credibility with colleagues, clients, and stakeholders. Most importantly, you will develop the ability to influence through writing, ensuring your messages not only get read but also drive the outcomes you want."
  }
];

async function addProject(project) {
  console.log(`🔄 Adding: ${project.title}`);
  
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

async function checkCurrentProjects() {
  console.log('🔍 Checking current Railway projects...');
  
  try {
    const response = await makeRequest(`${RAILWAY_URL}/api/projects`, { method: 'GET' });
    console.log(`📊 Current projects: ${response.data.length}`);
    return response.data.length;
  } catch (error) {
    console.log('❌ Error checking projects:', error.message);
    return 0;
  }
}

async function main() {
  console.log('🚀 Fixing Railway projects...');
  
  // Check current status
  const currentCount = await checkCurrentProjects();
  
  if (currentCount > 0) {
    console.log('✅ Projects already exist on Railway');
    return;
  }
  
  // Add projects
  console.log('\n🔄 Adding projects to Railway...');
  let successCount = 0;
  
  for (const project of projects) {
    const success = await addProject(project);
    if (success) {
      successCount++;
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`\n📊 Results:`);
  console.log(`📝 Projects added: ${successCount}/${projects.length}`);
  
  // Check final status
  console.log('\n📊 Final Status:');
  await checkCurrentProjects();
  
  if (successCount > 0) {
    console.log('✅ Projects are now displaying on Railway!');
  } else {
    console.log('❌ Unable to add projects - Railway add endpoints are not working');
    console.log('💡 Consider using Railway database tools or support to manually add project data');
  }
}

main().catch(console.error);
