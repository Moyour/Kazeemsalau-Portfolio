import 'dotenv/config';
import express from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { router } from "./routes"; // Import the new router
import { setupGoogleAuth, passport } from "./googleAuth";
import { Storage } from "./storage";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.json()); // Enable JSON body parsing

// Session configuration for Passport
app.use(session({
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year - effectively no timeout
  }
}));

// Initialize Google Auth
const storage = new Storage();
setupGoogleAuth(storage);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from uploads directory
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", (req, res, next) => {
  // Add CORS headers for file access
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  next();
}, express.static(uploadDir));

// Mount the API routes
app.use("/api", router);

// Catch-all for client-side routing
app.use(express.static("client/dist"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "client", "dist", "index.html"));
});

let currentPort = 5001; // Start trying from 5001

export function startServer(): Promise<Server> {
  return new Promise((resolve, reject) => {
    const tryListen = (port: number) => {
      const httpServer = createServer(app);
      httpServer.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        resolve(httpServer);
      });

      httpServer.on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
          console.warn(`Port ${port} is already in use. Trying next port...`);
          tryListen(port + 1); // Try the next port
        } else {
          reject(err); // Reject with other errors
        }
      });
    };

    tryListen(currentPort);
  });
}

// Start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export { app };
