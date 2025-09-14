import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Storage } from './storage';

// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5001/api/auth/google/callback';
export const GOOGLE_AUTH_ENABLED = Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET);

// Allowed admin emails - add your Google email here
const ADMIN_EMAILS = [
  'moyoursalau@gmail.com', // Your Google email
  'admin@example.com',     // Add more admin emails as needed
];

export function setupGoogleAuth(storage: Storage) {
  if (!GOOGLE_AUTH_ENABLED) {
    console.warn('[GoogleAuth] GOOGLE_CLIENT_ID/SECRET not set. Skipping Google OAuth setup.');
    return;
  }

  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;
      const name = profile.displayName;
      const googleId = profile.id;

      if (!email) {
        return done(new Error('No email found in Google profile'), undefined);
      }

      // Check if this email is allowed to be an admin
      const isAdmin = ADMIN_EMAILS.includes(email);
      if (!isAdmin) {
        return done(new Error('Unauthorized email'), undefined);
      }

      // Check if user already exists
      let user = await storage.getUserByEmail(email);

      if (user) {
        // Update last login
        await storage.updateUserLastLogin(user.id);
        return done(null, user);
      } else {
        // Create new user
        const newUser = await storage.createUser({
          username: email.split('@')[0], // Use email prefix as username
          email: email,
          passwordHash: '', // No password needed for OAuth users
          role: isAdmin ? 'admin' : 'user',
        });

        return done(null, newUser);
      }
    } catch (error) {
      return done(error, undefined);
    }
  }));

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUserById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
}

export { passport };
