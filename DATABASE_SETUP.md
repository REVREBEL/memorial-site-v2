# Database Setup Guide

This project uses **Cloudflare D1** (SQLite) with **Drizzle ORM** for data persistence, following Webflow Cloud's recommended setup.

## 📁 Project Structure

```
src/
  db/
    schema/
      index.ts          # Database schema definitions
    getDb.ts            # Database connection helper
    index.ts            # Legacy exports (can be removed)
migrations/
  0000_initial.sql      # Initial database schema
drizzle.config.ts       # Drizzle Kit configuration
wrangler.jsonc          # Cloudflare Workers config with D1 binding
```

## 🗄️ Database Schema

### Tables

#### **memories**
Stores user-submitted memories with optional media attachments.

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT (PK) | Unique identifier (e.g., `mem_1234567890_abc123`) |
| `headline` | TEXT (required) | Memory title/headline |
| `name` | TEXT (required) | Author's name |
| `email` | TEXT (required) | Author's email |
| `memory` | TEXT (required) | Full memory text content |
| `memory_date` | TEXT (optional) | When the memory occurred |
| `location` | TEXT (optional) | Where the memory occurred |
| `tags` | TEXT (JSON array) | Categories (e.g., `["Family", "Travel"]`) |
| `media_key` | TEXT (optional) | R2 storage key for media file |
| `media_type` | TEXT | `'photo'`, `'video'`, or `'none'` |
| `created_at` | TEXT | ISO timestamp of creation |

#### **likes**
Tracks likes on memories (many-to-one relationship).

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER (PK, auto-increment) | Unique like ID |
| `memory_id` | TEXT (FK → memories.id) | References the memory |
| `created_at` | TEXT | ISO timestamp |

#### **guestbook**
Stores guestbook entries from visitors.

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT (PK) | Unique identifier (e.g., `gb_1234567890_xyz789`) |
| `name` | TEXT (required) | Visitor's name |
| `email` | TEXT (required) | Visitor's email |
| `location` | TEXT (optional) | Visitor's location |
| `relationship` | TEXT (required) | Relationship to the memorial subject |
| `first_met` | TEXT (optional) | When they first met |
| `message` | TEXT (required) | Guestbook message |
| `created_at` | TEXT | ISO timestamp |

## 🚀 Local Development

### 1. Install Dependencies

```bash
npm install
```

Make sure you have these dev dependencies:
- `drizzle-kit` - For schema migrations
- `tsx` - TypeScript execution
- `better-sqlite3` - Local SQLite support

### 2. Apply Migrations Locally

To create a local SQLite database in `.wrangler/`:

```bash
npm run db:apply:local
```

This runs: `wrangler d1 migrations apply DB --local`

### 3. Start Development Server

```bash
npm run dev
```

The local server will use the SQLite database in `.wrangler/state/v3/d1/`.

### 4. Test API Routes

**Create a memory:**
```bash
curl -X POST http://localhost:4321/api/memories \
  -H "Content-Type: multipart/form-data" \
  -F "headline=My First Memory" \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "memory=This is a wonderful memory..." \
  -F "tags=[\"Family\", \"Travel\"]"
```

**Get all memories:**
```bash
curl http://localhost:4321/api/memories
```

**Add guestbook entry:**
```bash
curl -X POST http://localhost:4321/api/guestbook \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "relationship": "Friend",
    "message": "Such beautiful memories!"
  }'
```

**Get guestbook entries:**
```bash
curl http://localhost:4321/api/guestbook
```

## 📝 Schema Changes

When you modify the schema in `src/db/schema/index.ts`:

### 1. Generate Migration

```bash
npm run db:generate
```

This creates a new migration file in `drizzle/` directory.

### 2. Move Migration to `migrations/`

Drizzle Kit outputs to `drizzle/` but Cloudflare expects migrations in `migrations/`. 

**Move the new SQL file:**
```bash
mv drizzle/0001_*.sql migrations/
```

### 3. Apply Locally

```bash
npm run db:apply:local
```

### 4. Deploy to Production

When you deploy to Webflow Cloud, migrations in `migrations/` are **automatically applied** to your production D1 database.

## 🔧 Database Connection

### Server-Side Only

The database helper `getDb()` **must only be used on the server** (API routes or `.astro` pages).

```typescript
// ✅ Good - API route
import { getDb } from '../../../db/getDb';

export const GET: APIRoute = async ({ locals }) => {
  const db = getDb(locals);
  const memories = await db.select().from(memories);
  return Response.json(memories);
};
```

```typescript
// ❌ Bad - Client component
// Never import getDb in React components (.tsx files with client:only)
```

### Usage Pattern

```typescript
import { getDb } from '../path/to/db/getDb';
import { memories } from '../path/to/db/schema';

// For API routes (dynamic)
export const GET: APIRoute = async ({ locals }) => {
  const db = getDb(locals);
  // ... use db
};

// For static pages (async)
export const POST: APIRoute = async ({ locals }) => {
  const db = await getDbAsync(locals);
  // ... use db
};
```

## 🌐 Production Deployment

### Automatic Migration

When deploying to Webflow Cloud:

1. Your code is built
2. Migrations in `migrations/` are **automatically applied** to D1
3. Your app starts with the updated schema

### Manual Migration (if needed)

If you need to run migrations manually:

```bash
wrangler d1 migrations apply DB --remote
```

### View Data in Webflow Cloud

1. Open your project in Webflow Cloud
2. Go to **Storage** tab
3. Click on **DB** binding
4. Browse tables and data in the UI

## 📚 Additional Resources

- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Webflow Cloud Storage Guide](https://developers.webflow.com/cloud/storage)

## 🔍 Troubleshooting

### "No such table" error

Run migrations locally:
```bash
npm run db:apply:local
```

### Schema mismatch

Regenerate migrations:
```bash
npm run db:generate
mv drizzle/*.sql migrations/
npm run db:apply:local
```

### Type errors with `locals.runtime.env`

Make sure `worker-configuration.d.ts` includes:
```typescript
interface Env {
  DB: D1Database;
  MEDIA_BUCKET: R2Bucket;
}
```

## ✅ Quick Checklist

- [ ] Schema defined in `src/db/schema/index.ts`
- [ ] Drizzle config points to schema
- [ ] Migrations in `migrations/` directory
- [ ] `wrangler.jsonc` has D1 binding named "DB"
- [ ] API routes use `getDb(locals)`
- [ ] Never import database in client components
- [ ] Migrations applied locally before testing
- [ ] Test API routes work locally
- [ ] Ready to deploy!

---

**Note:** The dev dependencies `drizzle-kit`, `tsx`, and `better-sqlite3` are only needed for local development. They're not included in production builds.
