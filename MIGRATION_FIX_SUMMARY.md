# Database Migration Fix - December 3, 2025

## Issue
The database insertion was failing with "Failed query: insert into 'memories'" error because the initial migration file had incorrect NOT NULL constraints that didn't match the schema.

## Root Cause
**Migration file (0000_initial.sql) had:**
- `email` text NOT NULL ❌
- `tags` text NOT NULL ❌
- `relationship` text NOT NULL (in guestbook) ❌

**Schema file (src/db/schema/index.ts) correctly has:**
- `email` text (nullable) ✅
- `tags` text (nullable with default) ✅
- `relationship` text (nullable) ✅

## Solution
Created two new migration files to fix the database structure:

### Migration 0001: Fix memories table
- Makes `email` nullable
- Makes `tags` nullable with default value '[]'
- Preserves all existing data

### Migration 0002: Fix guestbook table
- Makes `email` nullable
- Makes `relationship` nullable
- Preserves all existing data

## Local Database Status
✅ All migrations applied successfully
✅ Tables now match the schema definition
✅ Ready for memory submissions

## Verified Fields

### memories table:
- id (TEXT, NOT NULL, PRIMARY KEY)
- name (TEXT, NOT NULL)
- email (TEXT, NULLABLE) ✅ Fixed
- headline (TEXT, NOT NULL)
- memory (TEXT, NOT NULL)
- memory_date (TEXT, NULLABLE)
- location (TEXT, NULLABLE)
- tags (TEXT, NULLABLE, DEFAULT '[]') ✅ Fixed
- media_key (TEXT, NULLABLE)
- media_type (TEXT, NULLABLE, DEFAULT 'none')
- created_at (TEXT, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

### guestbook table:
- id (TEXT, NOT NULL, PRIMARY KEY)
- name (TEXT, NOT NULL)
- location (TEXT, NULLABLE)
- relationship (TEXT, NULLABLE) ✅ Fixed
- first_met (TEXT, NULLABLE)
- message (TEXT, NOT NULL)
- email (TEXT, NULLABLE) ✅ Fixed
- created_at (TEXT, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

## Production Deployment
When deploying to production, you'll need to apply these migrations:
```bash
npx wrangler d1 migrations apply DB --remote
```

## Testing
The memory submission form should now work correctly:
- Email field can be left empty ✅
- Tags are optional ✅
- Guestbook entries work with optional fields ✅
