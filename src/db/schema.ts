import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

export const guestbook = pgTable('guestbook', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  message: text('message'),
  email: text('email').notNull(),
  isApproved: boolean('is_approved').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  doodle: text('doodle'), // Base64 string
  location: text('location'), // JSON string: { city, country, lat, lng }
});
