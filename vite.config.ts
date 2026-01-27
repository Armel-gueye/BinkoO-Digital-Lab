import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import nodemailer from "nodemailer";

// In-memory rate limiter
const requestsMap = new Map<string, number[]>();
function isRateLimited(ip: string, maxRequests = 5, windowMs = 60_000) {
  const now = Date.now();
  const arr = requestsMap.get(ip) || [];
  const recent = arr.filter((t) => now - t < windowMs);
  if (recent.length >= maxRequests) return true;
  recent.push(now);
  requestsMap.set(ip, recent);
  return false;
}

// Shared mail transporter for dev/preview
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

async function handleContactApi(req: any, res: any) {
  const method = req.method || "GET";
  if (method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const ip = (req.headers["x-forwarded-for"] as string) || req.socket?.remoteAddress || "unknown";
  if (isRateLimited(ip)) {
    res.statusCode = 429;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Too many requests. Please try again later." }));
    return;
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Email service not configured. Missing SMTP_USER/SMTP_PASS." }));
    return;
  }

  try {
    const chunks: Buffer[] = [];
    await new Promise<void>((resolve, reject) => {
      req.on("data", (c: Buffer) => chunks.push(c));
      req.on("end", () => resolve());
      req.on("error", (err: unknown) => reject(err));
    });
    const raw = Buffer.concat(chunks).toString("utf8");
    const body = raw ? JSON.parse(raw) : {};

    const { firstname, lastname, email, subject, message } = body || {};

    if (!firstname || !lastname || !email || !message) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Missing required fields: firstname, lastname, email, message" }));
      return;
    }

    const sanitizedFirstname = String(firstname).slice(0, 100);
    const sanitizedLastname = String(lastname).slice(0, 100);
    const sanitizedEmail = String(email).slice(0, 255);
    const sanitizedMessage = String(message).slice(0, 5000);
    const sanitizedSubject = subject ? String(subject).slice(0, 200) : "";
    const fullName = `${sanitizedFirstname} ${sanitizedLastname}`;

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

    const adminInfo = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "contact@binkoo.digital",
      subject: sanitizedSubject || `Nouvelle demande de contact: ${fullName}`,
      html: htmlContent,
      text: `Nom: ${fullName}
Email: ${sanitizedEmail}
${sanitizedSubject ? `Sujet: ${sanitizedSubject}
` : ''}
Message:
${sanitizedMessage}`,
    });

    try {
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
        </div>`;
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: sanitizedEmail,
        subject: "Confirmation de réception - BinkoO Digital Lab",
        html: confirmationHtml,
      });
    } catch {}

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: true, message: `Email sent successfully (ID: ${adminInfo.messageId})` }));
  } catch (err: any) {
    const msg = err?.message || "Internal server error";
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: msg }));
  }
}

const contactApiPlugin = () => ({
  name: "contact-api-plugin",
  configureServer(server: any) {
    server.middlewares.use("/api/contact", (req: any, res: any) => {
      handleContactApi(req, res);
    });
  },
  configurePreviewServer(server: any) {
    server.middlewares.use("/api/contact", (req: any, res: any) => {
      handleContactApi(req, res);
    });
  },
});

export default defineConfig({
  server: {
    host: "::",
    port: 3000,
  },
  plugins: [
    react(),
    contactApiPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
          ],
          'vendor-animation': ['framer-motion', 'gsap'],
          'vendor-spline': ['@splinetool/react-spline', '@splinetool/runtime'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
    ],
    exclude: [
      '@splinetool/react-spline',
      '@splinetool/runtime',
    ],
  },
});
