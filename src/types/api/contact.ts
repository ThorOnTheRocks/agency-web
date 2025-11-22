// Contact form submission
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// API response for contact form
export interface ContactApiResponse {
  message: string;
  error?: string;
}
