import type { GuestbookEntry, GuestbookFormData } from '../models/guestbook';
import type { ApiResponse } from '../common';

export type CreateGuestbookEntryRequest = GuestbookFormData & {
  doodle?: string;
  location?: {
    city?: string;
    country?: string;
    lat?: number;
    lng?: number;
  };
};

export type GuestbookApiResponse = ApiResponse<GuestbookEntry>;

export type GetGuestbookEntriesResponse = ApiResponse<GuestbookEntry[]>;
