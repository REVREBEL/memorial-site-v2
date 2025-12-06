# Webflow Cloud Dev Server Setup

## ⚠️ Critical Configuration

For the dev server to work in **Webflow Cloud**, the dev script must include the `--host 0.0.0.0` flag.

### package.json Configuration

```json
{
  "scripts": {
    "dev": "astro dev --host 0.0.0.0"
  }
}
```

## Why This Is Needed

- **Without `--host 0.0.0.0`**: Astro only listens on `localhost` (127.0.0.1), which is only accessible within the container itself
- **With `--host 0.0.0.0`**: Astro listens on all network interfaces, allowing Webflow Cloud's preview system to connect to your dev server

## Webflow Cloud Configuration

The `webflow.json` file tells Webflow Cloud about your project:

```json
{
  "cloud": {
    "framework": "astro",
    "project_id": "b77d1674-85da-4324-8986-3e3bda668c2e"
  }
}
```

When you click "Preview" in Webflow Cloud, it:
1. Runs `npm run dev` (which executes `astro dev --host 0.0.0.0`)
2. Waits for the server to be ready on port 3000
3. Proxies requests from your browser to the dev server

## Port Configuration

The port is set in `astro.config.mjs`:

```javascript
export default defineConfig({
  server: {
    port: 3000,
  },
  // ... other config
});
```

**Do not change this port** unless you also update Webflow Cloud's expected port (if configurable).

## Troubleshooting in Webflow Cloud

### Preview shows blank page or doesn't load

**Possible causes:**
1. Dev script missing `--host 0.0.0.0` flag
2. Server crashed due to type errors
3. Port 3000 is blocked or in use
4. Build/compilation errors

**Solutions:**

1. **Verify the dev script has the host flag:**
   ```bash
   cat package.json | grep '"dev"'
   ```
   Should show: `"dev": "astro dev --host 0.0.0.0"`

2. **Check if server is running:**
   ```bash
   ps aux | grep astro
   ```

3. **Check server logs for errors:**
   Click on the "Logs" tab in Webflow Cloud to see console output

4. **Kill and restart:**
   ```bash
   pkill -9 node
   ```
   Then click "Restart Preview" in Webflow Cloud

5. **Check for type errors:**
   ```bash
   npm run astro check
   ```

### "Cannot GET /" or 404 errors

**Cause:** The route doesn't exist or there's a base path mismatch.

**Solution:**
- Verify `src/pages/index.astro` exists
- Check `astro.config.mjs` for any `base` configuration
- Ensure `baseUrl` constant in `src/lib/base-url.ts` is correct

### Changes not reflecting in preview

**Cause:** Hot Module Replacement (HMR) connection issue or cache.

**Solutions:**
1. Hard refresh in browser (Cmd+Shift+R or Ctrl+Shift+R)
2. Restart the preview in Webflow Cloud
3. Clear browser cache
4. Check if the file you're editing is being watched by Astro

## Complete Setup Checklist

When setting up a new Astro project for Webflow Cloud:

- [x] `package.json` dev script includes `--host 0.0.0.0`
- [x] `webflow.json` has correct framework and project_id
- [x] `astro.config.mjs` configured for Cloudflare Workers
- [x] Port set to 3000 in `astro.config.mjs`
- [x] `src/lib/base-url.ts` properly handles base paths
- [x] All environment variables in `.env` are set
- [x] Database migrations applied (if using D1)
- [x] R2 bucket configured (if using media uploads)

## Key Files for Cloud Configuration

| File | Purpose |
|------|---------|
| `package.json` | Dev script with `--host 0.0.0.0` |
| `webflow.json` | Tells Webflow Cloud about your project |
| `astro.config.mjs` | Server port and Cloudflare adapter config |
| `src/lib/base-url.ts` | Handles base path for routing |
| `wrangler.jsonc` | Cloudflare Workers configuration |

## Emergency Commands

If preview completely breaks:

```bash
# 1. Clean everything
npm run cleanup

# 2. Kill all processes
pkill -9 node

# 3. Reinstall (if needed)
rm -rf node_modules && npm install

# 4. Then restart preview in Webflow Cloud UI
```

## What NOT to Change

❌ Don't remove `--host 0.0.0.0` from dev script  
❌ Don't change port from 3000 without testing  
❌ Don't modify `webflow.json` cloud configuration  
❌ Don't change framework from "astro" in webflow.json  

## Testing Locally vs Cloud

**Local testing** (if you have the codebase locally):
```bash
npm run dev
# Access at http://localhost:3000
```

**Cloud testing** (Webflow Cloud):
- Click "Preview" button
- Webflow handles the URL routing
- You see the preview through Webflow's proxy

---

**Last Fix Applied**: December 2025  
**Issue**: Preview not showing  
**Solution**: Added `--host 0.0.0.0` to dev script in package.json
