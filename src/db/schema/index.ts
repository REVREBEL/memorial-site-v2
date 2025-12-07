import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const memories = sqliteTable('memories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email'),
  headline: text('headline').notNull(),
  memory: text('memory').notNull(),
  memory_date: text('memory_date'),
  location: text('location'),
  tags: text('tags'),
  media_key: text('media_key'),
  media_type: text('media_type'),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const guestbook = sqliteTable('guestbook', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email'),
  relationship: text('relationship'),
  first_met: text('first_met'),
  location: text('location'),
  message: text('message').notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const likes = sqliteTable('likes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  memory_id: integer('memory_id').notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
