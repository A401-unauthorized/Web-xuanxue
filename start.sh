#!/bin/bash

# Start backend server
cd /workspace/backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

echo "Backend started on port 8000 (PID: $BACKEND_PID)"
echo "API docs: http://localhost:8000/docs"

# Wait for backend to start
sleep 2

# Return to frontend directory
cd /workspace/frontend
echo "Frontend can be started with: npm run dev"
