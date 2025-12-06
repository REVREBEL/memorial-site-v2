#!/bin/bash

echo "🔧 Memory Journal - First Time Setup"
echo "===================================="
echo ""
echo "This will initialize your local database..."
echo ""

# Apply database migrations
echo "📦 Step 1: Applying database migrations..."
npm run db:apply:local

if [ $? -eq 0 ]; then
    echo "✅ Database initialized successfully!"
    echo ""
    echo "🚀 Step 2: Starting development server..."
    echo ""
    npm run dev
else
    echo "❌ Failed to initialize database"
    echo "Please check the error above and try again"
    exit 1
fi
