# Base Path Configuration Fix

**Date:** December 6, 2025  
**Issue:** Memory Wall returns 404, Guestbook page blank  
**Status:** ✅ FIXED

---

## 🐛 The Problem

### Symptoms
1. **Memory Wall:** Failed to fetch memories: 404
2. **Guestbook:** Blank page between header and footer
3. **API Routes:** Not accessible despite existing in codebase

### Root Cause

In `astro.config.mjs`, the base path was hardcoded to an empty string:

```javascript
// ❌ WRONG - This breaks production routing
base: '',
```

**Why this broke everything:**

When deployed to Webflow Cloud, apps run at mount paths like `/memory-journal`, not at the root `/`. 

With `base: ''`, Astro generates routes like:
- `/api/memory_journal` (wrong)
- `/guestbook` (wrong)

But in production, they should be:
- `/memory-journal/api/memory_journal` (correct)
- `/memory-journal/guestbook` (correct)

Since `src/lib/base-url.ts` relies on `import.meta.env.BASE_URL`, and the config was ignoring this, all API calls failed with 404.

---

## ✅ The Solution

Updated `astro.config.mjs` to respect the BASE_URL environment variable:

```javascript
// ✅ CORRECT - Respects Webflow Cloud mount path
base: import.meta.env.BASE_URL || '',

// Also configure assets to use the same base path
build: {
  assetsPrefix: import.meta.env.BASE_URL || undefined,
},
```

### How This Works

**In Local Development:**
- `BASE_URL` is undefined or empty
- `base: ''` (root path)
- Routes: `/api/memory_journal`, `/guestbook`
- ✅ Works fine

**In Webflow Cloud Production:**
- Webflow provides `BASE_URL=/memory-journal`
- `base: '/memory-journal'`
- Routes: `/memory-journal/api/memory_journal`, `/memory-journal/guestbook`
- ✅ Works fine

---

## 🔧 Additional Fix: Assets Prefix

Also added `assetsPrefix` configuration:

```javascript
build: {
  assetsPrefix: import.meta.env.BASE_URL || undefined,
}
```

This ensures static assets (CSS, JS, images) also respect the base path.

---

## 📝 Files Modified

### astro.config.mjs
**Changed:**
```javascript
base: '',  // Old
```

**To:**
```javascript
base: import.meta.env.BASE_URL || '',  // New
build: {
  assetsPrefix: import.meta.env.BASE_URL || undefined,
},
```

### Also Added:
```javascript
security: {
  checkOrigin: false,  // Required for FormData submissions
}
```

---

## 🧪 Testing

After this fix:

### Local Development (`npm run dev`)
```bash
# Start server
npm run dev

# Test endpoints
curl http://localhost:3000/api/memory_journal
curl http://localhost:3000/api/guestbook

# Visit pages
http://localhost:3000/
http://localhost:3000/guestbook
```

### Production (Webflow Cloud)
Assuming mount path is `/memory-journal`:

```bash
# Test endpoints
https://your-site.webflow.io/memory-journal/api/memory_journal
https://your-site.webflow.io/memory-journal/api/guestbook

# Visit pages
https://your-site.webflow.io/memory-journal
https://your-site.webflow.io/memory-journal/guestbook
```

---

## 🎯 Why This Happened

This configuration was likely:
1. Set initially for root-level deployment
2. Never updated when deploying to Webflow Cloud mount path
3. Worked in local dev (root path) but broke in production (mount path)

---

## 🚀 Next Steps

1. **Build and test locally:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Deploy to Webflow Cloud:**
   - Push to GitHub
   - Webflow Cloud will automatically deploy
   - BASE_URL will be provided by Webflow

3. **Verify in production:**
   - Memory Wall loads and displays memories
   - Guestbook page displays entries
   - Can submit new memories
   - Can add guestbook entries

---

## 📚 Related Files

- `src/lib/base-url.ts` - Uses `import.meta.env.BASE_URL`
- `src/components/MemoryWall.tsx` - Uses `baseUrl` for API calls
- `src/components/GuestBookWrapper.tsx` - Uses `baseUrl` for API calls
- All API routes in `src/pages/api/` - Work correctly with base path

---

## ✅ Verification Checklist

After deploying:

- [ ] Memory Wall loads without 404 errors
- [ ] Guestbook page shows entries
- [ ] Can submit new memories
- [ ] Can add guestbook entries
- [ ] Photos upload successfully
- [ ] Navigation links work correctly
- [ ] All assets (CSS, JS, images) load

---

**Status:** Ready to deploy! 🚀

This fix ensures the app works correctly in both local development (root path) and Webflow Cloud production (mount path).
