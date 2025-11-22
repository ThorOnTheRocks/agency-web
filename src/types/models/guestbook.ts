// Guestbook entry type based on database schema
export interface GuestbookEntry {
  id: number;
  name: string;
  message: string | null;
  email: string;
  isApproved: boolean | null;
  createdAt: Date | null;
  doodle: string | null; // Base64 string
  location: string | null; // JSON string: { city, country, lat, lng }
}

// Location data structure
export interface GuestbookLocation {
  city?: string;
  country?: string;
  lat: number;
  lng: number;
}

// Form submission type
export interface GuestbookFormData {
  name: string;
  email: string;
  message?: string;
  doodle?: string;
  location?: GuestbookLocation;
}
