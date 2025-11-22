// Barrel export for all type definitions
// This allows importing types from a single location: import type { Project, Post } from '@/types'

// Models
export type { Project, ProjectPreview } from './models/project';
export type { Post, PostPreview } from './models/post';
export type {
  GuestbookEntry,
  GuestbookLocation,
  GuestbookFormData,
} from './models/guestbook';

// API Types
export type { ContactFormData, ContactApiResponse } from './api/contact';
export type {
  CreateGuestbookEntryRequest,
  GuestbookApiResponse,
  GetGuestbookEntriesResponse,
} from './api/guestbook';


// Common
export type {
  ApiError,
  ApiResponse,
  PaginationParams,
  PaginatedResult,
} from './common';
