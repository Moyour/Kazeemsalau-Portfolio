const Database = require("better-sqlite3");
const { drizzle } = require("drizzle-orm/better-sqlite3");
const { sql } = require("drizzle-orm");
// Removed: const { projects, blogPosts, testimonials, contactSubmissions, resumes } = require("./drizzle.schema.js");
const fs = require("fs");

const dbPath = process.env.SQLITE_DATABASE_PATH || "./sqlite.db";

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

const sqlite = new Database(dbPath);
const db = drizzle(sqlite);

async function setupDb() {
  console.log("Setting up test database...");

  // Create projects table
  await db.run(sql`
    CREATE TABLE projects (
      id TEXT PRIMARY KEY DEFAULT (uuid()),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      long_description TEXT,
      category TEXT NOT NULL,
      tools TEXT DEFAULT ('[]'),
      image_url TEXT,
      case_study_url TEXT,
      scorm_url TEXT,
      demo_url TEXT,
      featured INTEGER DEFAULT 0,
      challenge TEXT,
      solution TEXT,
      process TEXT,
      results TEXT,
      created_at TEXT DEFAULT (CURRENT_TIMESTAMP)
    );
  `);

  // Create blogPosts table
  await db.run(sql`
    CREATE TABLE blog_posts (
      id TEXT PRIMARY KEY DEFAULT (uuid()),
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT,
      read_time TEXT,
      published INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
      updated_at TEXT DEFAULT (CURRENT_TIMESTAMP)
    );
  `);

  // Create testimonials table
  await db.run(sql`
    CREATE TABLE testimonials (
      id TEXT PRIMARY KEY DEFAULT (uuid()),
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      company TEXT NOT NULL,
      content TEXT NOT NULL,
      avatar_url TEXT,
      rating TEXT DEFAULT ('5'),
      featured INTEGER DEFAULT 0
    );
  `);

  // Create contactSubmissions table
  await db.run(sql`
    CREATE TABLE contact_submissions (
      id TEXT PRIMARY KEY DEFAULT (uuid()),
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      project_type TEXT,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT (CURRENT_TIMESTAMP)
    );
  `);

  // Create resumes table
  await db.run(sql`
    CREATE TABLE resumes (
      id TEXT PRIMARY KEY DEFAULT (uuid()),
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      file_url TEXT NOT NULL,
      parsed_content TEXT,
      is_active INTEGER DEFAULT 0,
      uploaded_at TEXT DEFAULT (CURRENT_TIMESTAMP)
    );
  `);

  // Create users table for authentication
  await db.run(sql`
    CREATE TABLE users (
      id TEXT PRIMARY KEY DEFAULT (uuid()),
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT ('user') CHECK (role IN ('admin', 'user')),
      created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
      last_login_at TEXT
    );
  `);

  console.log("Test database setup complete.");
}

setupDb().catch(console.error);
