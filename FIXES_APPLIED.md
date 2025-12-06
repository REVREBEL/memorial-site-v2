# Fixes Applied - December 6, 2025

## Issues Fixed

### 1. Database Error: "no such table: memories"
**Problem:** The local D1 database wasn't initialized, causing the error when trying to fetch or insert memories.

**Solution:** 
- Created `QUICK_FIX.md` with clear instructions to run `npm run db:apply:local`
- This applies all migration files to create the necessary tables

### 2. Wrong API Endpoint Path
**Problem:** Components were calling `/api/memories` but the actual endpoint is `/api/memory_journal`

**Fixed Files:**
- `src/components/MemoryWall.tsx` - Updated all fetch calls to use `/api/memory_journal`
- `src/components/StoriesSection.tsx` - Updated fetch call to use `/api/memory_journal`
- Deleted `src/pages/api/memories/` directory to avoid confusion

**Correct API Paths:**
- `GET /api/memory_journal` - List all memories
- `POST /api/memory_journal` - Create new memory
- `POST /api/memory_journal/[memoryId]/like` - Like a memory

### 3. Restored Missing Files
**Problem:** The `src/pages` directory and other critical files were missing

**Solution:**
- Copied all files from `lost+found/2449/` to `src/`
- Restored complete directory structure including:
  - `src/pages/` - All Astro pages and API routes
  - `src/components/` - All React components
  - `src/db/` - Database schema and helpers
  - `src/lib/` - Utility functions
  - `src/layouts/` - Page layouts
  - Other supporting files

## File Structure Now

```
src/
├── pages/
│   ├── index.astro
│   ├── guestbook.astro
│   ├── health-check.astro
│   └── api/
│       ├── memory_journal/
│       │   ├── index.ts (GET list, POST create)
│       │   └── [memoryId]/like.ts
│       ├── guestbook/index.ts
│       ├── media/[...key].ts
│       ├── upload.ts
│       └── health.ts
├── components/
│   ├── MemoryWall.tsx ✅ Fixed
│   ├── StoriesSection.tsx ✅ Fixed
│   ├── MemoryForm.tsx
│   ├── GuestBookWrapper.tsx
│   └── ui/ (shadcn components)
├── db/
│   ├── schema/index.ts
│   └── getDb.ts
└── lib/
    └── base-url.ts
```

## How to Use

1. **First Time Setup:**
   ```bash
   npm run db:apply:local
   npm run dev
   ```

2. **Normal Development:**
   ```bash
   npm run dev
   ```

3. **Deploy to Production:**
   ```bash
   npm run build
   # Then deploy through Webflow Cloud
   ```

## Database Migrations

All migrations are in the `migrations/` folder and will be automatically applied:

1. `0000_initial.sql` - Creates memories, guestbook, likes tables
2. `0001_fix_nullable_fields.sql` - Makes email and tags nullable in memories
3. `0002_fix_guestbook_fields.sql` - Makes fields nullable in guestbook
4. `0003_recreate_likes_table.sql` - Recreates likes table with proper structure

## Notes

- **Local Development:** Uses `.wrangler/state/v3/d1/` for local D1 database
- **Production:** Uses actual Cloudflare D1 database
- **Media Storage:** Uses Cloudflare R2 bucket for photos/videos
- **Image Compression:** Automatic compression in browser before upload

## Testing Checklist

- [ ] Run migrations: `npm run db:apply:local`
- [ ] Start dev server: `npm run dev`
- [ ] Visit http://localhost:3000
- [ ] Click "Add Your Memory"
- [ ] Fill out the form and submit
- [ ] Verify memory appears on the wall
- [ ] Test clicking on a memory card to see details
- [ ] Test liking a memory
- [ ] Check guestbook page at http://localhost:3000/guestbook
