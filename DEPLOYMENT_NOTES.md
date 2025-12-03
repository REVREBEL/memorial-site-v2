# Deployment Notes - Webflow Cloud

**Last Updated:** December 3, 2025

---

## ⚠️ Important: Dev Dependencies

### The Issue
The following packages are **NOT** included in `package.json` because they break Webflow Cloud deployment:
- `better-sqlite3` - Requires native compilation (C++ bindings)
- `drizzle-kit` - Only needed for local schema changes
- `tsx` - Only needed for local TypeScript scripts

These packages work fine locally but cause `npm ci` to fail during deployment.

### For Local Development

When you clone this repo and want to work with the database locally, install these manually:

```bash
npm install --save-dev drizzle-kit tsx better-sqlite3
```

**Do NOT commit these to `package.json`** - they will break deployment.

---

## 📋 Deployment Checklist

### Before Deploying

1. ✅ **Ensure migrations are in `migrations/` directory**
   - Webflow Cloud auto-applies migrations from this folder
   - NOT from `drizzle/` folder

2. ✅ **Database schema changes workflow:**
   ```bash
   # 1. Edit schema locally
   npm install --save-dev drizzle-kit  # If not installed
   npm run db:generate                 # Creates migration in drizzle/
   
   # 2. Move to migrations folder
   mv drizzle/0001_*.sql migrations/
   
   # 3. Test locally
   npm run db:apply:local
   
   # 4. Commit and push (WITHOUT the dev dependencies)
   git add migrations/ src/db/schema/
   git commit -m "feat: Add new database schema"
   git push
   ```

3. ✅ **Check `.env` is NOT committed**
   - Webflow Cloud provides env vars automatically
   - Local `.env` should be in `.gitignore`

4. ✅ **Verify `wrangler.jsonc` bindings:**
   ```jsonc
   {
     "d1_databases": [{
       "binding": "DB",  // Must match locals.runtime.env.DB
       "database_name": "memory-wall-db",
       "database_id": "your-db-id",
       "migrations_dir": "migrations"  // Auto-applies on deploy
     }],
     "r2_buckets": [{
       "binding": "MEDIA_BUCKET",
       "bucket_name": "memory-wall-media"
     }]
   }
   ```

---

## 🚀 Deployment Command

```bash
# From your local machine (not sandbox)
webflow deploy
```

### What Happens During Deployment

1. **npm ci** - Clean install of production dependencies
2. **Migration auto-apply** - Runs all SQL files in `migrations/`
3. **astro build** - Builds the production bundle
4. **Upload to Cloudflare** - Deploys Workers and static assets

---

## 🐛 Common Deployment Errors

### Error: "Missing: @esbuild/... from lock file"

**Cause:** `package-lock.json` doesn't match `package.json`

**Fix:**
```bash
rm package-lock.json
npm install
git add package-lock.json
git commit -m "fix: Regenerate lockfile"
git push
```

### Error: "Command failed: npm ci"

**Cause:** Native dependencies in `package.json` (like `better-sqlite3`)

**Fix:** Remove them from `package.json` and `package-lock.json`:
```bash
npm uninstall better-sqlite3 drizzle-kit tsx
git add package.json package-lock.json
git commit -m "fix: Remove native dependencies"
git push
```

### Error: "Table does not exist"

**Cause:** Migrations weren't applied

**Fix:** 
1. Check migrations are in `migrations/` folder (not `drizzle/`)
2. Check `wrangler.jsonc` has `"migrations_dir": "migrations"`
3. Re-deploy (migrations auto-apply)

---

## 📦 What's Included vs. What's Not

### ✅ Included in Production Build
- All React components (`src/components/`)
- All API routes (`src/pages/api/`)
- Database helper (`src/db/getDb.ts`)
- Schema definitions (`src/db/schema/`)
- DevLink components (`src/site-components/`)
- Production dependencies (Astro, React, Drizzle ORM, etc.)

### ❌ NOT Included (Local Dev Only)
- `better-sqlite3` - Native SQLite bindings
- `drizzle-kit` - Schema migration generator
- `tsx` - TypeScript executor
- `.env` file - Use Webflow Cloud env vars
- `node_modules/` - Installed during build

---

## 🔐 Environment Variables

### Webflow Cloud Auto-Provides
- `DB` - D1 Database binding (from wrangler.jsonc)
- `MEDIA_BUCKET` - R2 Bucket binding (from wrangler.jsonc)

### You Need to Set in Webflow Dashboard
- `WEBFLOW_CMS_SITE_API_TOKEN` - For CMS access (if using CMS)
- Any other custom API keys your app needs

**Important:** Never commit `.env` to git!

---

## 🧪 Testing Before Deployment

### Local Testing with Cloudflare Environment

```bash
# Build and preview with Wrangler
npm run preview

# Access at http://localhost:8788
```

This runs your app in a local Cloudflare Workers environment, simulating production.

### Verify Database Works

1. Check health endpoint:
   ```bash
   curl http://localhost:8788/api/health
   ```

2. Test API routes:
   ```bash
   # List memories
   curl http://localhost:8788/api/memories

   # Create memory
   curl -X POST http://localhost:8788/api/memories \
     -H "Content-Type: application/json" \
     -d '{"headline":"Test","name":"User","email":"test@example.com","memory":"Test memory"}'
   ```

---

## 📝 Post-Deployment Checklist

After successful deployment:

1. ✅ Visit your production URL
2. ✅ Test memory wall - create a memory
3. ✅ Test guestbook - sign the guestbook
4. ✅ Check likes work
5. ✅ Upload an image (tests R2 bucket)
6. ✅ Check DevLink components render correctly

---

## 🆘 Emergency Rollback

If deployment breaks production:

```bash
# In Webflow dashboard
1. Go to your app
2. Click "Deployments"
3. Find previous working version
4. Click "Rollback"
```

---

## 📚 Related Documentation

- `DATABASE_SETUP.md` - Full database documentation
- `CHAT_MEMORY.md` - Session context and implementation details
- `DATABASE_FIX_SUMMARY.md` - What changed and why
- `CLOUDFLARE_CONFIG.md` - Cloudflare-specific configuration

---

## 🎯 Success Metrics

A successful deployment should have:
- ✅ Build completes without errors
- ✅ Migrations applied automatically
- ✅ App accessible at production URL
- ✅ Database operations work (create, read, update, like)
- ✅ File uploads work (R2 bucket)
- ✅ DevLink components render
- ✅ No console errors in browser

---

**Remember:** The sandbox environment has limited disk space and can't compile native dependencies. Always test locally before deploying!
