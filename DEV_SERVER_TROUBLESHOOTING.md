# Dev Server Troubleshooting Guide

## Quick Reference

### Important Port Information
⚠️ **The dev server runs on PORT 3000, NOT 4321!**

The astro.config.mjs is configured with:
```javascript
server: {
  port: 3000,
}
```

## Common Issues & Solutions

### Issue 1: "Dev server isn't showing preview"

**Cause**: The dev server isn't running or you're checking the wrong port.

**Solution**:
1. Make sure you're accessing `http://localhost:3000` (not 4321)
2. Check if the dev server is running:
   ```bash
   ps aux | grep -E "astro|node" | grep -v grep
   ```
3. If not running, start it:
   ```bash
   npm run dev
   ```

### Issue 2: "EADDRINUSE: address already in use :::3000"

**Cause**: Another process is using port 3000.

**Solution**:
The `predev` script should handle this automatically, but if it doesn't:
```bash
# Kill the process on port 3000
npx kill-port 3000

# Or manually find and kill it
lsof -ti:3000 | xargs kill -9

# Then restart
npm run dev
```

### Issue 3: "No space left on device"

**Cause**: The sandbox has run out of disk space (usually from caches, temp files, lost+found).

**Solution**:
```bash
npm run cleanup
```

This clears:
- Temporary files (/tmp/*, /var/tmp/*)
- npm cache (/root/.npm)
- Local cache files (/root/.cache, /root/.local)
- lost+found folder contents
- dist build folder

**Check space after cleanup**:
```bash
df -h / | tail -1
```

### Issue 4: Type errors preventing server start

**Cause**: TypeScript compilation errors.

**Solution**:
```bash
npm run astro check
```

Fix any reported errors, then restart the dev server.

### Issue 5: Module not found errors

**Cause**: Dependencies not installed or corrupted node_modules.

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Manual Port Check Commands

```bash
# Check what's running on port 3000
lsof -i :3000

# Check all node processes
ps aux | grep node

# Check Astro processes specifically
ps aux | grep astro

# Kill all node processes (nuclear option)
pkill -9 node
```

## Startup Checklist

Before reporting "dev server not working":

1. ✅ Check you're using the correct URL: `http://localhost:3000`
2. ✅ Verify dev server is running: `ps aux | grep astro`
3. ✅ Check for port conflicts: `lsof -i :3000`
4. ✅ Verify disk space: `df -h /`
5. ✅ Check for type errors: `npm run astro check`

## Package.json Scripts Reference

```json
{
  "predev": "npx kill-port 3000 || true",  // Runs automatically before dev
  "dev": "astro dev",                       // Starts dev server on port 3000
  "build": "astro build",                   // Production build
  "preview": "astro build && wrangler dev", // Build and preview with Wrangler
  "cleanup": "rm -rf /tmp/* /var/tmp/* /root/.npm /root/.cache /root/.local /app/lost+found/* /app/dist 2>/dev/null || true && echo 'Cleanup complete!' && df -h / | tail -1"
}
```

## Expected Dev Server Output

When running `npm run dev`, you should see:

```
> astro@0.0.1 predev
> npx kill-port 3000 || true

> astro@0.0.1 dev
> astro dev

🚀  astro  v5.13.5 started in XXXms

  ┃ Local    http://localhost:3000/
  ┃ Network  use --host to expose

watching for file changes...
```

## Environment Variables

Make sure your `.env` file has:
- `WEBFLOW_CMS_SITE_API_TOKEN` (if using CMS)
- `WEBFLOW_API_HOST` (optional, for testing)
- R2 credentials (if using media uploads)
- D1 database bindings (configured in wrangler.jsonc)

## Emergency Reset

If nothing works:

```bash
# 1. Clean everything
npm run cleanup

# 2. Kill all processes
pkill -9 node

# 3. Remove node_modules
rm -rf node_modules package-lock.json

# 4. Reinstall
npm install

# 5. Start fresh
npm run dev
```

## Notes for Future Reference

- **Always check port 3000 first** - it's configured in astro.config.mjs
- The `predev` script automatically tries to free port 3000
- If space issues occur frequently, run `npm run cleanup` regularly
- The sandbox has a 3.9GB disk limit - monitor with `df -h /`
- Large culprits: node_modules (1.4GB), lost+found (can grow to 600MB+), npm cache (~1GB)

## Quick Fixes Summary

| Problem | Command |
|---------|---------|
| Wrong port | Use `localhost:3000` not 4321 |
| Port in use | `npx kill-port 3000` |
| Out of space | `npm run cleanup` |
| Can't start | `pkill -9 node && npm run dev` |
| Module errors | `rm -rf node_modules && npm install` |

---

**Last Updated**: December 2025  
**Astro Version**: 5.13.5  
**Node Version**: Check with `node -v`
