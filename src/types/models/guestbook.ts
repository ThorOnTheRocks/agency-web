export interface GuestbookLocation {
  city?: string;
  country?: string;
  lat?: number;
  lng?: number;
}

export interface GuestbookEntry {
  id: number;
  name: string;
  email: string;
  message?: string | null;
  doodle?: string | null;
  location?: string | null; // Stored as JSON string in DB
  isApproved: boolean | null;
  createdAt: Date | null;
}

export interface GuestbookFormData {
  name: string;
  email: string;
  message: string;
}
