import type { GuestbookFormData, GuestbookEntry } from '../models/guestbook';

// API request type for creating guestbook entry
export interface CreateGuestbookEntryRequest extends GuestbookFormData {}

// API response for guestbook operations
export interface GuestbookApiResponse {
  message: string;
  entry?: GuestbookEntry;
  error?: string;
}

// API response for fetching entries
export interface GetGuestbookEntriesResponse {
  entries: GuestbookEntry[];
  total: number;
}
