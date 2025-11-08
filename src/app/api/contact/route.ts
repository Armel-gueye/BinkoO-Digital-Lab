import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/nodemailer';

// Rate limiting
const requestsMap = new Map<string, number[]>();

function isRateLimited(ip: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const requests = requestsMap.get(ip) || [];
  const recentRequests = requests.filter((time) => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    return true;
  }

  recentRequests.push(now);
  requestsMap.set(ip, recentRequests);
  return false;
}

interface ContactFormBody {
  firstname?: string;
  lastname?: string;
  email?: string;
  message?: string;
  subject?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body: ContactFormBody = await request.json();
    const { firstname, lastname, email, message, subject } = body;

    // Validate input
    if (!firstname || !lastname || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: firstname, lastname, email, message' },
        { status: 400 }
      );
    }

    // Sanitize input to prevent injection
    const sanitizedFirstname = String(firstname).slice(0, 100);
    const sanitizedLastname = String(lastname).slice(0, 100);
    const sanitizedEmail = String(email).slice(0, 255);
    const sanitizedMessage = String(message).slice(0, 5000);
    const sanitizedSubject = subject ? String(subject).slice(0, 200) : '';

    const fullName = `${sanitizedFirstname} ${sanitizedLastname}`;

    // Create HTML email template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #E5002E; margin-bottom: 20px; border-bottom: 2px solid #E5002E; padding-bottom: 10px;">
            Nouvelle Demande de Contact
          </h2>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong style="color: #333;">Nom:</strong> ${fullName}</p>
            <p style="margin: 10px 0;"><strong style="color: #333;">Email:</strong> 
              <a href="mailto:${sanitizedEmail}" style="color: #E5002E; text-decoration: none;">${sanitizedEmail}</a>
            </p>
            ${sanitizedSubject ? `<p style="margin: 10px 0;"><strong style="color: #333;">Sujet:</strong> ${sanitizedSubject}</p>` : ''}
          </div>
          
          <div style="margin-top: 20px;">
            <p style="margin-bottom: 10px;"><strong style="color: #333;">Message:</strong></p>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; border-left: 4px solid #E5002E;">
              <p style="white-space: pre-wrap; line-height: 1.6; color: #555; margin: 0;">
                ${sanitizedMessage}
              </p>
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
          
          <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
            Ce message a été envoyé depuis le formulaire de contact de BinkoO Digital Lab<br/>
            Date: ${new Date().toLocaleString('fr-FR')}
          </p>
        </div>
      </div>
    `;

    // Send email to site owner
    const result = await sendEmail({
      to: 'Binkoodigitallab@gmail.com',
      subject: sanitizedSubject || `Nouvelle demande de contact: ${fullName}`,
      html: htmlContent,
      text: `Nom: ${fullName}\nEmail: ${sanitizedEmail}\n${sanitizedSubject ? `Sujet: ${sanitizedSubject}\n` : ''}\nMessage:\n${sanitizedMessage}`,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #E5002E; margin-bottom: 20px;">Merci de nous avoir contactés !</h2>
          
          <p style="color: #333; line-height: 1.6;">Bonjour ${sanitizedFirstname},</p>
          
          <p style="color: #555; line-height: 1.6;">
            Nous avons bien reçu votre message et nous vous en remercions. Notre équipe reviendra vers vous dans les plus brefs délais.
          </p>
          
          <p style="color: #555; line-height: 1.6;">
            Votre demande est importante pour nous et nous mettons tout en œuvre pour vous répondre rapidement.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 14px; margin: 5px 0;">
              <strong>BinkoO Digital Lab</strong><br/>
              L'automatisation est notre passion<br/>
              <a href="tel:+22644323841" style="color: #E5002E; text-decoration: none;">+226 44 32 38 41</a>
            </p>
          </div>
        </div>
      </div>
    `;

    await sendEmail({
      to: sanitizedEmail,
      subject: 'Confirmation de réception - BinkoO Digital Lab',
      html: confirmationHtml,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully' 
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('API error:', errorMessage);

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
