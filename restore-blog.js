import fs from 'fs';

// Read the exported data
const exportData = JSON.parse(fs.readFileSync('database-export.json', 'utf8'));

async function restoreBlog(railwayUrl) {
  try {
    console.log('🚀 Restoring blog to Railway...');
    console.log(`🌐 Railway URL: ${railwayUrl}`);
    console.log(`📝 Blog posts to restore: ${exportData.blog_posts.length}`);
    console.log(`🚀 Projects to restore: ${exportData.projects.length}`);
    
    // Import blog data
    const response = await fetch(`${railwayUrl}/api/import-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exportData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Blog restored successfully!');
      console.log('📊 Imported:', result.imported);
      console.log(`🌐 Your blog is now live at: ${railwayUrl}`);
    } else {
      console.error('❌ Blog restoration failed:', result);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Check if Railway URL is provided
if (process.argv[2]) {
  const railwayUrl = process.argv[2];
  restoreBlog(railwayUrl);
} else {
  console.log('❌ Please provide your Railway URL as an argument:');
  console.log('node restore-blog.js https://your-app.railway.app');
  console.log('\n📋 Steps to get your Railway URL:');
  console.log('1. Go to your Railway dashboard');
  console.log('2. Click on "Settings" tab');
  console.log('3. Look for "Networking" or "Domains" section');
  console.log('4. Click "Generate Domain" to get a public URL');
}
