# 🚀 Start Here - Memory Journal App

## Quick Start (First Time)

```bash
# 1. Initialize the database
npm run db:apply:local

# 2. Start development server
npm run dev
```

Then open http://localhost:3000

## The Error You Saw

```
D1_ERROR: no such table: memories: SQLITE_ERROR
```

**This happened because:** The local D1 database wasn't initialized. The first command above fixes this!

## What Was Fixed

### ✅ Database Initialization
- Migrations are now ready to be applied
- Run `npm run db:apply:local` to create all tables

### ✅ API Endpoints Corrected
- Old path: `/api/memories` ❌
- New path: `/api/memory_journal` ✅
- All components now use the correct path

### ✅ File Structure Restored
All necessary files are now in place:
- API routes in `src/pages/api/`
- React components in `src/components/`
- Database schema in `src/db/schema/`

## App Features

### Memory Wall
- Share memories with photos or videos
- Add tags, dates, and locations
- Like memories
- Filter by tags

### Guestbook
- Leave messages for loved ones
- Sign your name
- Browse all entries with pagination

### Media Upload
- Photos automatically compressed
- Stored in Cloudflare R2
- Max 1.5MB for photos, 10MB for videos

## File Structure

```
memory-journal/
├── src/
│   ├── pages/
│   │   ├── index.astro          # Home page with memory wall
│   │   ├── guestbook.astro      # Guestbook page
│   │   └── api/
│   │       ├── memory_journal/  # Memory API ✅
│   │       ├── guestbook/       # Guestbook API
│   │       └── media/           # Media serving
│   ├── components/
│   │   ├── MemoryWall.tsx       # Main memory wall component
│   │   ├── MemoryForm.tsx       # Form to add memories
│   │   ├── StoriesSection.tsx   # Featured stories display
│   │   └── GuestBookWrapper.tsx # Guestbook component
│   └── db/
│       ├── schema/index.ts      # Database schema
│       └── getDb.ts             # Database helper
├── migrations/                  # SQL migration files
└── package.json
```

## Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npm run db:generate      # Generate new migration
npm run db:apply:local   # Apply migrations to local DB

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Utilities
npm run cf-typegen       # Generate Cloudflare types
```

## Environment

The app needs these environment variables (already configured in `.env`):
- `WEBFLOW_API_HOST` - Webflow API endpoint
- `WEBFLOW_SITE_API_TOKEN` - Site API token
- `WEBFLOW_CMS_SITE_API_TOKEN` - CMS API token

For Cloudflare Workers (production), these are configured in `wrangler.toml`:
- `DB` - D1 database binding
- `MEDIA_BUCKET` - R2 storage binding

## Database Schema

### memories
- id, headline, name, email, memory
- memory_date, location, tags[]
- media_key, media_type
- likes, created_at

### guestbook  
- id, name, email, message, created_at

### likes
- id, memory_id, user_id, created_at

## Troubleshooting

### "no such table: memories"
**Fix:** Run `npm run db:apply:local`

### Can't upload images
**Check:**
1. Image size (must be < 1.5MB after compression)
2. File type (JPEG, PNG, GIF, WebP only)
3. Browser console for compression errors

### Memories not showing
**Check:**
1. Database initialized? `npm run db:apply:local`
2. API responding? Visit http://localhost:3000/health-check
3. Browser console for fetch errors

### Local database issues
**Reset:**
```bash
rm -rf .wrangler/state/v3/d1/
npm run db:apply:local
```

## Next Steps

1. ✅ Run `npm run db:apply:local`
2. ✅ Run `npm run dev`
3. 🎉 Visit http://localhost:3000
4. 📝 Add your first memory
5. 👀 See it appear on the wall
6. ❤️ Test the like button
7. 📖 Check the guestbook at /guestbook

## Production Deployment

The app is configured for Webflow Cloud deployment:
1. Build runs automatically in Webflow Cloud
2. Migrations are applied during build
3. App mounts at the path specified in `astro.config.mjs`

No manual deployment steps needed! 🎊

## Need Help?

Check these files for more details:
- `QUICK_FIX.md` - Quick fixes for common issues
- `FIXES_APPLIED.md` - What was fixed in this session
- `DATABASE_SETUP.md` - Database configuration details
- `R2_SETUP_GUIDE.md` - Media storage setup

---

**Made with ❤️ using Webflow Cloud, Astro, and Cloudflare**
