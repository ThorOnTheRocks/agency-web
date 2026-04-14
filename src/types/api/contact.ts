export interface ContactFormData {
  name: string;
  email: string;
  companyOrTeam: string;
  projectType: string;
  projectStage: string;
  budgetRange: string;
  timeline: string;
  websiteOrProductUrl?: string;
  message: string;
}
export interface ContactApiResponse {
  message: string;
  error?: string;
}
