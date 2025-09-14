# LearnFlow - Portfolio & Learning Management System

A modern, full-stack portfolio website built with React, Express, and SQLite. Features a blog system, project showcase, contact form, and admin panel for content management.

## 🚀 Features

- **Portfolio Showcase**: Display projects with detailed descriptions, SCORM integration, and case studies
- **Blog System**: Markdown-based blog with image uploads and categorization
- **Contact Form**: Email notifications with form validation
- **Admin Panel**: Secure content management with authentication
- **Responsive Design**: Mobile-first design with smooth animations
- **File Uploads**: Image and document upload functionality
- **Authentication**: JWT-based auth with Google OAuth support

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons

### Backend
- **Express.js** with TypeScript
- **SQLite** with Drizzle ORM
- **JWT** authentication
- **Multer** for file uploads
- **Nodemailer** for email notifications
- **Passport.js** for OAuth

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LearnFlow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking
- `npm test` - Run tests
- `npm run db:push` - Push database schema

### Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── lib/           # Utilities and helpers
├── server/                # Express backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   ├── auth.ts           # Authentication logic
│   └── emailService.ts   # Email functionality
├── shared/               # Shared types and schemas
└── uploads/              # File uploads directory
```

## 🔐 Authentication

The application supports multiple authentication methods:

- **JWT Tokens**: For API authentication
- **Google OAuth**: For social login
- **Session Management**: For admin panel access

### Admin Access
- Default admin credentials are set during database initialization
- Change admin password via the admin panel or database directly
- Admin can manage all content through the admin interface

## 📝 Content Management

### Blog Posts
- Create and edit blog posts with Markdown support
- Upload and manage images
- Categorize posts
- Set read time and publication status

### Projects
- Showcase portfolio projects
- Add SCORM content integration
- Include case studies and demos
- Organize by categories

### Contact Form
- Collect visitor inquiries
- Email notifications to admin
- Form validation and error handling

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy
1. Set up environment variables
2. Build the application: `npm run build`
3. Start the server: `npm start`
4. Configure reverse proxy and SSL

## 🔧 Configuration

### Environment Variables
- `JWT_SECRET`: Secret key for JWT tokens
- `GOOGLE_CLIENT_ID/SECRET`: Google OAuth credentials
- `SMTP_*`: Email configuration
- `SQLITE_DATABASE_PATH`: Database file location

### File Uploads
- Images are stored in `uploads/blog-images/`
- Files are served statically by Express
- Configure file size limits in multer setup

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test -- --coverage
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact: [your-email@domain.com]

---

Built with ❤️ by Kazeem Salau
