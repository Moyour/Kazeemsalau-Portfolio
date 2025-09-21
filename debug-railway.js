import fs from 'fs';

async function debugRailway(railwayUrl) {
  try {
    console.log('🔍 Debugging Railway deployment...');
    console.log(`🌐 Railway URL: ${railwayUrl}`);
    
    // Check health
    console.log('\n1️⃣ Checking health...');
    try {
      const healthResponse = await fetch(`${railwayUrl}/api/health`);
      const healthResult = await healthResponse.json();
      console.log('✅ Health check:', healthResult);
    } catch (error) {
      console.error('❌ Health check failed:', error.message);
    }
    
    // Check admin setup
    console.log('\n2️⃣ Setting up admin...');
    try {
      const adminResponse = await fetch(`${railwayUrl}/api/setup-admin`);
      const adminResult = await adminResponse.json();
      console.log('✅ Admin setup:', adminResult);
    } catch (error) {
      console.error('❌ Admin setup failed:', error.message);
    }
    
    // Check blog posts
    console.log('\n3️⃣ Checking blog posts...');
    try {
      const blogResponse = await fetch(`${railwayUrl}/api/blog`);
      const blogResult = await blogResponse.json();
      console.log('📝 Blog posts found:', blogResult.length || 0);
      if (blogResult.length > 0) {
        console.log('📋 First few posts:', blogResult.slice(0, 3).map(p => p.title));
      }
    } catch (error) {
      console.error('❌ Blog check failed:', error.message);
    }
    
    // Import data
    console.log('\n4️⃣ Importing data...');
    try {
      const exportData = JSON.parse(fs.readFileSync('database-export.json', 'utf8'));
      const importResponse = await fetch(`${railwayUrl}/api/import-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exportData)
      });
      
      const importResult = await importResponse.json();
      console.log('✅ Data import:', importResult);
    } catch (error) {
      console.error('❌ Data import failed:', error.message);
    }
    
    // Final check
    console.log('\n5️⃣ Final blog check...');
    try {
      const finalBlogResponse = await fetch(`${railwayUrl}/api/blog`);
      const finalBlogResult = await finalBlogResponse.json();
      console.log('📝 Final blog posts:', finalBlogResult.length || 0);
    } catch (error) {
      console.error('❌ Final blog check failed:', error.message);
    }
    
    console.log('\n🎉 Debug complete!');
    console.log(`🌐 Your app: ${railwayUrl}`);
    console.log('🔑 Try logging in with: kazeemsalau / Porsche6704@!');
    
  } catch (error) {
    console.error('❌ Debug error:', error);
  }
}

// Check if Railway URL is provided
if (process.argv[2]) {
  const railwayUrl = process.argv[2];
  debugRailway(railwayUrl);
} else {
  console.log('❌ Please provide your Railway URL as an argument:');
  console.log('node debug-railway.js https://your-app.railway.app');
}
