import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  const { to, subject, html, text, from = process.env.SMTP_USER } = options;

  if (!to || !subject || !html) {
    return {
      success: false,
      error: 'Missing required fields: to, subject, html',
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    return {
      success: false,
      error: 'Invalid email address',
    };
  }

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text: text || html.replace(/<[^>]*>/g, ''),
      html,
    });

    return {
      success: true,
      message: `Email sent successfully (ID: ${info.messageId})`,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `Failed to send email: ${errorMessage}`,
    };
  }
}
