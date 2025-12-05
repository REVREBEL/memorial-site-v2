-- Recreate likes table with proper foreign key constraints
-- This fixes the issue where the likes table was lost during the memories table migration

-- Drop the likes table if it exists (may have broken foreign keys)
DROP TABLE IF EXISTS `likes`;

-- Recreate the likes table with proper schema
CREATE TABLE `likes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`memory_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`memory_id`) REFERENCES `memories`(`id`) ON UPDATE no action ON DELETE cascade
);

-- Recreate the index for performance
CREATE INDEX `idx_likes_memory_id` ON `likes`(`memory_id`);
