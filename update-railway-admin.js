import bcrypt from 'bcryptjs';

// Railway admin password update script
async function updateRailwayAdmin() {
  try {
    const newUsername = 'kazeemsalau';
    const newPassword = '911Porsche@!';
    const newEmail = 'kaspersalau@gmail.com';
    
    console.log('🔄 Updating Railway admin credentials...');
    console.log('📝 Username:', newUsername);
    console.log('🔐 Password:', newPassword);
    console.log('📧 Email:', newEmail);
    
    const passwordHash = await bcrypt.hash(newPassword, 12);
    
    // Make API call to Railway to update admin
    const response = await fetch('https://kazeemsalau-portfolio-production.up.railway.app/api/setup-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: newUsername,
        password: passwordHash,
        email: newEmail
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Railway admin credentials updated successfully!');
      console.log('📊 Response:', result);
    } else {
      console.error('❌ Failed to update Railway admin credentials');
      console.error('Status:', response.status);
      const error = await response.text();
      console.error('Error:', error);
    }
    
  } catch (error) {
    console.error('❌ Error updating Railway admin:', error);
  }
}

updateRailwayAdmin();
