// Populate Railway with project data
async function populateRailwayProjects() {
  try {
    console.log('🔄 Populating Railway with project data...');
    
    const projects = [
      {
        id: '1',
        title: 'Emotional Intelligence',
        description: 'A comprehensive eLearning course on emotional intelligence and self-awareness.',
        long_description: 'This project involved creating an interactive learning experience that helps learners understand and develop their emotional intelligence skills through practical exercises and real-world scenarios.',
        category: 'eLearning Development',
        tools: ['Articulate Storyline', 'Adobe Captivate', 'SCORM'],
        image_url: '/uploads/All%20Image%20Upload/emtional%20.jpg',
        case_study_url: '/portfolio/1',
        scorm_url: null,
        demo_url: 'https://demo.example.com',
        featured: 1,
        challenge: 'Creating engaging content that helps learners develop emotional intelligence skills.',
        solution: 'Used interactive scenarios and practical exercises to make learning engaging.',
        process: 'Analysis, Design, Development, Implementation, Evaluation (ADDIE model).',
        results: '95% completion rate and 4.8/5 learner satisfaction score.'
      },
      {
        id: '2',
        title: 'The Fixer',
        description: 'An interactive problem-solving course for technical professionals.',
        long_description: 'This project focused on developing critical thinking and problem-solving skills through hands-on activities and case studies.',
        category: 'eLearning Development',
        tools: ['Vue.js', 'SCORM', 'HTML5'],
        image_url: '/uploads/All%20Image%20Upload/fixer.jpg',
        case_study_url: '/portfolio/2',
        scorm_url: 'https://scorm.example.com',
        demo_url: null,
        featured: 1,
        challenge: 'Making complex problem-solving concepts accessible to all learners.',
        solution: 'Used gamification and interactive elements to enhance engagement.',
        process: 'Rapid prototyping and iterative development approach.',
        results: 'Learners showed 40% improvement in problem-solving skills.'
      },
      {
        id: '3',
        title: 'Business Writing',
        description: 'Professional business writing skills development course.',
        long_description: 'A comprehensive course covering all aspects of professional business communication, from emails to reports.',
        category: 'eLearning Development',
        tools: ['Articulate Rise', 'Adobe Creative Suite', 'SCORM'],
        image_url: '/uploads/All%20Image%20Upload/business%20writing%20.jpg',
        case_study_url: '/portfolio/3',
        scorm_url: null,
        demo_url: 'https://demo.example.com',
        featured: 1,
        challenge: 'Teaching writing skills in an engaging digital format.',
        solution: 'Used multimedia content and interactive writing exercises.',
        process: 'Collaborative design with subject matter experts.',
        results: '90% of learners reported improved writing confidence.'
      }
    ];
    
    for (const project of projects) {
      console.log(`🔄 Adding ${project.title}...`);
      
      const response = await fetch('https://kazeemsalau-portfolio-production.up.railway.app/api/add-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Added ${project.title}:`, result);
      } else {
        console.error(`❌ Failed to add ${project.title}:`, response.status);
        const error = await response.text();
        console.error('Error:', error);
      }
    }
    
    console.log('✅ Railway projects population completed!');
    
  } catch (error) {
    console.error('❌ Error populating Railway projects:', error);
  }
}

populateRailwayProjects();
