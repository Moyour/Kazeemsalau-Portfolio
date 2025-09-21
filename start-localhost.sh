#!/bin/bash

# LearnFlow Localhost Startup Script
echo "🚀 Starting LearnFlow Localhost Server..."

# Kill any existing processes on port 5001
echo "🔍 Checking for existing processes on port 5001..."
lsof -ti:5001 | xargs kill -9 2>/dev/null || echo "No existing processes found"

# Wait a moment
sleep 2

# Start the server
echo "🚀 Starting final-server.js..."
node final-server.js

echo "✅ Server started! Visit http://localhost:5001"
