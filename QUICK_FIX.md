# Quick Fix Guide - Database Not Found Error

## The Issue
You're seeing this error: `D1_ERROR: no such table: memories: SQLITE_ERROR`

This means the local D1 database hasn't been created yet.

## Solution

Run these commands in order:

```bash
# 1. Apply migrations to your LOCAL database
npm run db:apply:local

# 2. Start the dev server
npm run dev
```

That's it! The database tables will be created and your app should work.

## What This Does

The `db:apply:local` command runs all the migration files in the `migrations/` folder:
- `0000_initial.sql` - Creates the initial tables (memories, guestbook, likes)
- `0001_fix_nullable_fields.sql` - Fixes nullable fields in memories table
- `0002_fix_guestbook_fields.sql` - Fixes nullable fields in guestbook table  
- `0003_recreate_likes_table.sql` - Recreates the likes table with correct structure

## Production Deployment

For production deployment on Cloudflare, the migrations are automatically applied during the build process. You don't need to do anything extra.

## Troubleshooting

If you still see errors after running migrations:

1. **Check if D1 database exists:**
   ```bash
   wrangler d1 list
   ```

2. **Check migration status:**
   ```bash
   wrangler d1 migrations list DB --local
   ```

3. **Reset local database (WARNING: deletes all data):**
   ```bash
   rm -rf .wrangler/state/v3/d1/miniflare-D1DatabaseObject
   npm run db:apply:local
   ```

## API Endpoints

The app uses these API paths:
- `/api/memory_journal` - Main memories endpoint (GET list, POST new)
- `/api/memory_journal/[memoryId]/like` - Like a memory
- `/api/guestbook` - Guestbook entries
- `/api/media/[key]` - Serve media from R2 storage

Make sure you're not using the old `/api/memories` path - it should be `/api/memory_journal`.
