import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const memories = sqliteTable('memories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  headline: text('headline').notNull(),
  memory: text('memory').notNull(),
  memory_date: text('memory_date'),
  location: text('location'),
  tags: text('tags', { mode: 'json' }).$type<string[]>().default(sql`'[]'`),
  media_key: text('media_key'),
  media_type: text('media_type', { enum: ['photo', 'video', 'none'] }).default('none'),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const likes = sqliteTable('likes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  memory_id: text('memory_id').notNull().references(() => memories.id, { onDelete: 'cascade' }),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const guestbook = sqliteTable('guestbook', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  location: text('location'),
  relationship: text('relationship'),
  first_met: text('first_met'),
  message: text('message').notNull(),
  email: text('email'),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type Memory = typeof memories.$inferSelect;
export type NewMemory = typeof memories.$inferInsert;
export type Like = typeof likes.$inferSelect;
export type NewLike = typeof likes.$inferInsert;
export type GuestbookEntry = typeof guestbook.$inferSelect;
export type NewGuestbookEntry = typeof guestbook.$inferInsert;
