-- Fix nullable fields in memories table
-- Make email and tags nullable to match schema

-- SQLite doesn't support ALTER COLUMN directly, so we need to:
-- 1. Create a new table with correct schema
-- 2. Copy data
-- 3. Drop old table
-- 4. Rename new table

-- Create new table with correct schema
CREATE TABLE `memories_new` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`headline` text NOT NULL,
	`memory` text NOT NULL,
	`memory_date` text,
	`location` text,
	`tags` text DEFAULT '[]',
	`media_key` text,
	`media_type` text DEFAULT 'none',
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Copy existing data
INSERT INTO `memories_new` 
SELECT id, name, email, headline, memory, memory_date, location, tags, media_key, media_type, created_at 
FROM `memories`;

-- Drop old table
DROP TABLE `memories`;

-- Rename new table
ALTER TABLE `memories_new` RENAME TO `memories`;

-- Recreate index
CREATE INDEX `idx_memories_created_at` ON `memories`(`created_at` DESC);
