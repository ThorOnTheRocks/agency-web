/**
 * Generate HTML template for contact form email
 */
export function contactFormTemplate(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): string {
  return `
    <h2>New Message from Portfolio</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Subject:</strong> ${data.subject || 'No Subject'}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message}</p>
  `;
}
