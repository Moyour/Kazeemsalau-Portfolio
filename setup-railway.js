import fs from 'fs';

// Read the exported data
const exportData = JSON.parse(fs.readFileSync('database-export.json', 'utf8'));

async function setupRailway(railwayUrl) {
  try {
    console.log('🚀 Setting up Railway deployment...');
    console.log(`🌐 Railway URL: ${railwayUrl}`);
    
    // Step 1: Set up admin account
    console.log('\n1️⃣ Setting up admin account...');
    const adminResponse = await fetch(`${railwayUrl}/api/setup-admin`);
    const adminResult = await adminResponse.json();
    
    if (adminResponse.ok) {
      console.log('✅ Admin account set up successfully!');
      console.log('📝 Username:', adminResult.username);
      console.log('🔐 Password:', adminResult.password);
      console.log('📧 Email:', adminResult.email);
    } else {
      console.error('❌ Admin setup failed:', adminResult);
      return;
    }
    
    // Step 2: Import blog data
    console.log('\n2️⃣ Importing blog data...');
    const importResponse = await fetch(`${railwayUrl}/api/import-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exportData)
    });
    
    const importResult = await importResponse.json();
    
    if (importResponse.ok) {
      console.log('✅ Data imported successfully!');
      console.log('📊 Imported:', importResult.imported);
    } else {
      console.error('❌ Data import failed:', importResult);
    }
    
    console.log('\n🎉 Railway setup complete!');
    console.log(`🌐 Your app is ready at: ${railwayUrl}`);
    console.log('🔑 Login with: kazeemsalau / Porsche6704@!');
    
  } catch (error) {
    console.error('❌ Setup error:', error);
  }
}

// Check if Railway URL is provided
if (process.argv[2]) {
  const railwayUrl = process.argv[2];
  setupRailway(railwayUrl);
} else {
  console.log('❌ Please provide your Railway URL as an argument:');
  console.log('node setup-railway.js https://your-app.railway.app');
  console.log('\n📋 Steps to get your Railway URL:');
  console.log('1. Go to your Railway dashboard');
  console.log('2. Click on "Settings" tab');
  console.log('3. Look for "Networking" or "Domains" section');
  console.log('4. Click "Generate Domain" to get a public URL');
}
