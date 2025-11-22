import { db } from './client';
import { guestbook } from './schema';
import { desc, eq } from 'drizzle-orm';
import type { GuestbookEntry } from '../../types';

/**
 * Get recent guestbook entries (approved only)
 * @param limit - Maximum number of entries to return
 */
export async function getGuestbookEntries(limit: number = 20): Promise<GuestbookEntry[]> {
  return await db
    .select()
    .from(guestbook)
    .where(eq(guestbook.isApproved, true))
    .orderBy(desc(guestbook.createdAt))
    .limit(limit);
}

/**
 * Get all guestbook entries (including unapproved)
 * @param limit - Maximum number of entries to return
 */
export async function getAllGuestbookEntries(limit: number = 20): Promise<GuestbookEntry[]> {
  return await db
    .select()
    .from(guestbook)
    .orderBy(desc(guestbook.createdAt))
    .limit(limit);
}

/**
 * Insert a new guestbook entry
 */
export async function insertGuestbookEntry(data: {
  name: string;
  email: string;
  message?: string | null;
  doodle?: string | null;
  location?: string | null;
}) {
  return await db.insert(guestbook).values(data);
}
