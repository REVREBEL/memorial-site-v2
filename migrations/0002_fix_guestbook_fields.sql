-- Fix nullable fields in guestbook table
-- Make email and relationship nullable to match schema

-- Create new table with correct schema
CREATE TABLE `guestbook_new` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`location` text,
	`relationship` text,
	`first_met` text,
	`message` text NOT NULL,
	`email` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Copy existing data (if any)
INSERT INTO `guestbook_new` 
SELECT id, name, location, relationship, first_met, message, email, created_at 
FROM `guestbook`;

-- Drop old table
DROP TABLE `guestbook`;

-- Rename new table
ALTER TABLE `guestbook_new` RENAME TO `guestbook`;

-- Recreate index
CREATE INDEX `idx_guestbook_created_at` ON `guestbook`(`created_at` DESC);
