import fs from 'fs';

// Read the exported data
const exportData = JSON.parse(fs.readFileSync('database-export.json', 'utf8'));

// Replace this with your actual Railway URL
const RAILWAY_URL = 'https://your-railway-url.railway.app';

async function importToRailway() {
  try {
    console.log('🚀 Importing data to Railway...');
    console.log(`📝 Blog posts: ${exportData.blog_posts.length}`);
    console.log(`🚀 Projects: ${exportData.projects.length}`);
    console.log(`💬 Testimonials: ${exportData.testimonials.length}`);
    
    const response = await fetch(`${RAILWAY_URL}/api/import-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exportData)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Import successful!');
      console.log('📊 Result:', result);
    } else {
      const error = await response.text();
      console.error('❌ Import failed:', error);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Check if Railway URL is provided
if (process.argv[2]) {
  const railwayUrl = process.argv[2];
  console.log(`🌐 Using Railway URL: ${railwayUrl}`);
  
  // Update the URL and run import
  const updatedData = JSON.parse(fs.readFileSync('database-export.json', 'utf8'));
  
  fetch(`${railwayUrl}/api/import-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData)
  })
  .then(response => response.json())
  .then(result => {
    console.log('✅ Import successful!');
    console.log('📊 Result:', result);
  })
  .catch(error => {
    console.error('❌ Error:', error);
  });
} else {
  console.log('❌ Please provide your Railway URL as an argument:');
  console.log('node import-to-railway.js https://your-app.railway.app');
}
