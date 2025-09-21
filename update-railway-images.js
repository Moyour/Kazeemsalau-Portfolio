// Update Railway project images via API
async function updateRailwayImages() {
  try {
    console.log('🔄 Updating Railway project images...');
    
    const imageUpdates = [
      {
        title: 'Emotional Intellgence',
        image_url: '/uploads/All%20Image%20Upload/emtional%20.jpg'
      },
      {
        title: 'The Fixer',
        image_url: '/uploads/All%20Image%20Upload/fixer.jpg'
      },
      {
        title: 'Business Writing ',
        image_url: '/uploads/All%20Image%20Upload/business%20writing%20.jpg'
      }
    ];
    
    for (const update of imageUpdates) {
      console.log(`🔄 Updating ${update.title}...`);
      
      const response = await fetch('https://kazeemsalau-portfolio-production.up.railway.app/api/update-project-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: update.title,
          image_url: update.image_url
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Updated ${update.title}:`, result);
      } else {
        console.error(`❌ Failed to update ${update.title}:`, response.status);
        const error = await response.text();
        console.error('Error:', error);
      }
    }
    
    console.log('✅ Railway project images update completed!');
    
  } catch (error) {
    console.error('❌ Error updating Railway images:', error);
  }
}

updateRailwayImages();
