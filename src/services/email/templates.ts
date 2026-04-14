export function contactFormTemplate(data: {
  name: string;
  email: string;
  companyOrTeam: string;
  projectType: string;
  projectStage: string;
  budgetRange: string;
  timeline: string;
  websiteOrProductUrl?: string;
  message: string;
}): string {
  return `
    <h2>New Premium Project Inquiry</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Company or Team:</strong> ${data.companyOrTeam}</p>
    <p><strong>Project Type:</strong> ${data.projectType}</p>
    <p><strong>Project Stage:</strong> ${data.projectStage}</p>
    <p><strong>Budget Range:</strong> ${data.budgetRange}</p>
    <p><strong>Timeline:</strong> ${data.timeline}</p>
    <p><strong>Website or Product URL:</strong> ${data.websiteOrProductUrl || 'Not provided'}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message}</p>
  `;
}
