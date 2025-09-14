import nodemailer from 'nodemailer';
import { ContactSubmission } from './storage';

// Email configuration
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
};

// Create transporter
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Skip email sending if SMTP is not configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('[Email] SMTP not configured, skipping email send');
      console.log('[Email] Would send to:', options.to);
      console.log('[Email] Subject:', options.subject);
      return true; // Return true to not break the flow
    }

    const info = await transporter.sendMail({
      from: `"LearnFlow Contact" <${EMAIL_CONFIG.auth.user}>`,
      ...options,
    });

    console.log('[Email] Message sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send email:', error);
    return false;
  }
}

export function generateContactEmailHTML(contact: ContactSubmission): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #667eea; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🎉 New Contact Form Submission</h2>
          <p>Someone has reached out through your LearnFlow website!</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${contact.firstName} ${contact.lastName}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${contact.email}">${contact.email}</a></div>
          </div>
          ${contact.company ? `
          <div class="field">
            <div class="label">Company:</div>
            <div class="value">${contact.company}</div>
          </div>
          ` : ''}
          ${contact.projectType ? `
          <div class="field">
            <div class="label">Project Type:</div>
            <div class="value">${contact.projectType}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${contact.message.replace(/\n/g, '<br>')}</div>
          </div>
          <div class="field">
            <div class="label">Submitted:</div>
            <div class="value">${new Date(contact.createdAt).toLocaleString()}</div>
          </div>
        </div>
        <div class="footer">
          <p>This message was sent from your LearnFlow contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateContactEmailText(contact: ContactSubmission): string {
  return `
New Contact Form Submission

Name: ${contact.firstName} ${contact.lastName}
Email: ${contact.email}
${contact.company ? `Company: ${contact.company}` : ''}
${contact.projectType ? `Project Type: ${contact.projectType}` : ''}

Message:
${contact.message}

Submitted: ${new Date(contact.createdAt).toLocaleString()}

---
This message was sent from your LearnFlow contact form.
  `;
}

export async function sendContactNotification(contact: ContactSubmission): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || 'moyoursalau@gmail.com';
  
  const emailOptions: EmailOptions = {
    to: adminEmail,
    subject: `New Contact Form Submission from ${contact.firstName} ${contact.lastName}`,
    html: generateContactEmailHTML(contact),
    text: generateContactEmailText(contact),
  };

  return await sendEmail(emailOptions);
}
