# Production Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables
Create a `.env` file in the root directory with the following variables:

```bash
# Database
SQLITE_DATABASE_PATH=./sqlite.db

# JWT Secret (CHANGE THIS IN PRODUCTION!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production-make-it-long-and-random

# Google OAuth (get these from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
GOOGLE_CALLBACK_URL=https://yourdomain.com/api/auth/google/callback

# Email Configuration (for contact form notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=your-admin-email@domain.com

# Node Environment
NODE_ENV=production

# Server Configuration
PORT=5001
HOST=0.0.0.0
```

### 2. Security Checklist
- [ ] Change JWT_SECRET to a long, random string
- [ ] Update Google OAuth callback URL to production domain
- [ ] Use strong email credentials
- [ ] Ensure database file permissions are secure
- [ ] Remove any debug console.log statements

### 3. Build and Start
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### 4. Database Setup
The SQLite database will be created automatically on first run. For production:
- Ensure the database file has proper permissions
- Consider backing up the database regularly
- Monitor database size and performance

### 5. File Uploads
- The `uploads/` directory will be created automatically
- Ensure the server has write permissions to this directory
- Consider implementing file cleanup policies

### 6. Performance Optimization
- Enable gzip compression in your reverse proxy
- Set up CDN for static assets
- Monitor memory usage and database queries
- Implement proper caching headers

### 7. Monitoring
- Set up error logging
- Monitor server performance
- Track user analytics
- Set up health check endpoints

## Deployment Platforms

### Vercel (Recommended for Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Railway
```bash
# Connect your GitHub repo
# Railway will auto-deploy on push
```

### Heroku
```bash
# Install Heroku CLI
# Create Procfile with: web: npm start
# Deploy
git push heroku main
```

### Digital Ocean App Platform
- Connect your GitHub repository
- Set environment variables in the dashboard
- Configure build and start commands

## Post-Deployment
1. Test all functionality
2. Verify email notifications work
3. Check file uploads
4. Test authentication flows
5. Monitor error logs
6. Set up SSL certificates
7. Configure domain DNS

## Troubleshooting
- Check server logs for errors
- Verify environment variables are set
- Ensure database permissions
- Check file upload directory permissions
- Monitor memory usage
