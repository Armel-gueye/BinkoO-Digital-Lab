// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import nodemailer from "file:///home/project/node_modules/nodemailer/lib/nodemailer.js";
var __vite_injected_original_dirname = "/home/project";
var logErrorsPlugin = () => ({
  name: "log-errors-plugin",
  transformIndexHtml() {
    return {
      tags: [
        {
          tag: "script",
          injectTo: "head",
          children: `(() => {
            try {
              const logOverlay = () => {
                const el = document.querySelector('vite-error-overlay');
                if (!el) return;
                const root = (el.shadowRoot || el);
                let text = '';
                try { text = root.textContent || ''; } catch (_) {}
                if (text && text.trim()) {
                  const msg = text.trim();
                  console.error('[Vite Overlay]', msg);
                  try {
                    if (window.parent && window.parent !== window) {
                      window.parent.postMessage({
                        type: 'ERROR_CAPTURED',
                        error: {
                          message: msg,
                          stack: undefined,
                          filename: undefined,
                          lineno: undefined,
                          colno: undefined,
                          source: 'vite.overlay',
                        },
                        timestamp: Date.now(),
                      }, '*');
                    }
                  } catch (_) {}
                }
              };

              const obs = new MutationObserver(() => logOverlay());
              obs.observe(document.documentElement, { childList: true, subtree: true });

              window.addEventListener('DOMContentLoaded', logOverlay);
              logOverlay();
            } catch (e) {
              console.warn('[Vite Overlay logger failed]', e);
            }
          })();`
        }
      ]
    };
  }
});
var requestsMap = /* @__PURE__ */ new Map();
function isRateLimited(ip, maxRequests = 5, windowMs = 6e4) {
  const now = Date.now();
  const arr = requestsMap.get(ip) || [];
  const recent = arr.filter((t) => now - t < windowMs);
  if (recent.length >= maxRequests) return true;
  recent.push(now);
  requestsMap.set(ip, recent);
  return false;
}
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || ""
  }
});
async function handleContactApi(req, res) {
  const method = req.method || "GET";
  if (method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }
  const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";
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
    const chunks = [];
    await new Promise((resolve, reject) => {
      req.on("data", (c) => chunks.push(c));
      req.on("end", () => resolve());
      req.on("error", (err) => reject(err));
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
    const sanitizedMessage = String(message).slice(0, 5e3);
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
            ${sanitizedSubject ? `<p style="margin: 10px 0;"><strong style="color: #333;">Sujet:</strong> ${sanitizedSubject}</p>` : ""}
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
            Ce message a \xE9t\xE9 envoy\xE9 depuis le formulaire de contact de BinkoO Digital Lab<br/>
            Date: ${(/* @__PURE__ */ new Date()).toLocaleString("fr-FR")}
          </p>
        </div>
      </div>
    `;
    const adminInfo = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "Binkoodigitallab@gmail.com",
      subject: sanitizedSubject || `Nouvelle demande de contact: ${fullName}`,
      html: htmlContent,
      text: `Nom: ${fullName}
Email: ${sanitizedEmail}
${sanitizedSubject ? `Sujet: ${sanitizedSubject}
` : ""}
Message:
${sanitizedMessage}`
    });
    try {
      const confirmationHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #E5002E; margin-bottom: 20px;">Merci de nous avoir contact\xE9s !</h2>
            <p style="color: #333; line-height: 1.6;">Bonjour ${sanitizedFirstname},</p>
            <p style="color: #555; line-height: 1.6;">
              Nous avons bien re\xE7u votre message et nous vous en remercions. Notre \xE9quipe reviendra vers vous dans les plus brefs d\xE9lais.
            </p>
            <p style="color: #555; line-height: 1.6;">
              Votre demande est importante pour nous et nous mettons tout en \u0153uvre pour vous r\xE9pondre rapidement.
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
        subject: "Confirmation de r\xE9ception - BinkoO Digital Lab",
        html: confirmationHtml
      });
    } catch {
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: true, message: `Email sent successfully (ID: ${adminInfo.messageId})` }));
  } catch (err) {
    const msg = err?.message || "Internal server error";
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: msg }));
  }
}
var contactApiPlugin = () => ({
  name: "contact-api-plugin",
  configureServer(server) {
    server.middlewares.use("/api/contact", (req, res) => {
      handleContactApi(req, res);
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use("/api/contact", (req, res) => {
      handleContactApi(req, res);
    });
  }
});
var vite_config_default = defineConfig({
  server: {
    host: "::",
    port: 3e3
  },
  plugins: [
    react(),
    logErrorsPlugin(),
    contactApiPlugin()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgbm9kZW1haWxlciBmcm9tIFwibm9kZW1haWxlclwiO1xuXG4vLyBNaW5pbWFsIHBsdWdpbiB0byBsb2cgYnVpbGQtdGltZSBhbmQgZGV2LXRpbWUgZXJyb3JzIHRvIGNvbnNvbGVcbmNvbnN0IGxvZ0Vycm9yc1BsdWdpbiA9ICgpID0+ICh7XG4gIG5hbWU6IFwibG9nLWVycm9ycy1wbHVnaW5cIixcbiAgdHJhbnNmb3JtSW5kZXhIdG1sKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0YWdzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0YWc6IFwic2NyaXB0XCIsXG4gICAgICAgICAgaW5qZWN0VG86IFwiaGVhZFwiLFxuICAgICAgICAgIGNoaWxkcmVuOiBgKCgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IGxvZ092ZXJsYXkgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd2aXRlLWVycm9yLW92ZXJsYXknKTtcbiAgICAgICAgICAgICAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgICAgICAgICAgICAgY29uc3Qgcm9vdCA9IChlbC5zaGFkb3dSb290IHx8IGVsKTtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dCA9ICcnO1xuICAgICAgICAgICAgICAgIHRyeSB7IHRleHQgPSByb290LnRleHRDb250ZW50IHx8ICcnOyB9IGNhdGNoIChfKSB7fVxuICAgICAgICAgICAgICAgIGlmICh0ZXh0ICYmIHRleHQudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBtc2cgPSB0ZXh0LnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tWaXRlIE92ZXJsYXldJywgbXNnKTtcbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cucGFyZW50ICYmIHdpbmRvdy5wYXJlbnQgIT09IHdpbmRvdykge1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0VSUk9SX0NBUFRVUkVEJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1zZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2s6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZW5vOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG5vOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogJ3ZpdGUub3ZlcmxheScsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICAgIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIGNvbnN0IG9icyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IGxvZ092ZXJsYXkoKSk7XG4gICAgICAgICAgICAgIG9icy5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG5cbiAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBsb2dPdmVybGF5KTtcbiAgICAgICAgICAgICAgbG9nT3ZlcmxheSgpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1tWaXRlIE92ZXJsYXkgbG9nZ2VyIGZhaWxlZF0nLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSgpO2BcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH0sXG59KTtcblxuLy8gSW4tbWVtb3J5IHJhdGUgbGltaXRlclxuY29uc3QgcmVxdWVzdHNNYXAgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyW10+KCk7XG5mdW5jdGlvbiBpc1JhdGVMaW1pdGVkKGlwOiBzdHJpbmcsIG1heFJlcXVlc3RzID0gNSwgd2luZG93TXMgPSA2MF8wMDApIHtcbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgY29uc3QgYXJyID0gcmVxdWVzdHNNYXAuZ2V0KGlwKSB8fCBbXTtcbiAgY29uc3QgcmVjZW50ID0gYXJyLmZpbHRlcigodCkgPT4gbm93IC0gdCA8IHdpbmRvd01zKTtcbiAgaWYgKHJlY2VudC5sZW5ndGggPj0gbWF4UmVxdWVzdHMpIHJldHVybiB0cnVlO1xuICByZWNlbnQucHVzaChub3cpO1xuICByZXF1ZXN0c01hcC5zZXQoaXAsIHJlY2VudCk7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gU2hhcmVkIG1haWwgdHJhbnNwb3J0ZXIgZm9yIGRldi9wcmV2aWV3XG5jb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgc2VydmljZTogXCJnbWFpbFwiLFxuICBhdXRoOiB7XG4gICAgdXNlcjogcHJvY2Vzcy5lbnYuU01UUF9VU0VSIHx8IFwiXCIsXG4gICAgcGFzczogcHJvY2Vzcy5lbnYuU01UUF9QQVNTIHx8IFwiXCIsXG4gIH0sXG59KTtcblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ29udGFjdEFwaShyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgY29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZCB8fCBcIkdFVFwiO1xuICBpZiAobWV0aG9kICE9PSBcIlBPU1RcIikge1xuICAgIHJlcy5zdGF0dXNDb2RlID0gNDA1O1xuICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogXCJNZXRob2Qgbm90IGFsbG93ZWRcIiB9KSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaXAgPSAocmVxLmhlYWRlcnNbXCJ4LWZvcndhcmRlZC1mb3JcIl0gYXMgc3RyaW5nKSB8fCByZXEuc29ja2V0Py5yZW1vdGVBZGRyZXNzIHx8IFwidW5rbm93blwiO1xuICBpZiAoaXNSYXRlTGltaXRlZChpcCkpIHtcbiAgICByZXMuc3RhdHVzQ29kZSA9IDQyOTtcbiAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IFwiVG9vIG1hbnkgcmVxdWVzdHMuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuXCIgfSkpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghcHJvY2Vzcy5lbnYuU01UUF9VU0VSIHx8ICFwcm9jZXNzLmVudi5TTVRQX1BBU1MpIHtcbiAgICByZXMuc3RhdHVzQ29kZSA9IDUwMDtcbiAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IFwiRW1haWwgc2VydmljZSBub3QgY29uZmlndXJlZC4gTWlzc2luZyBTTVRQX1VTRVIvU01UUF9QQVNTLlwiIH0pKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cnkge1xuICAgIC8vIFJlYWQgSlNPTiBib2R5XG4gICAgY29uc3QgY2h1bmtzOiBCdWZmZXJbXSA9IFtdO1xuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlcS5vbihcImRhdGFcIiwgKGM6IEJ1ZmZlcikgPT4gY2h1bmtzLnB1c2goYykpO1xuICAgICAgcmVxLm9uKFwiZW5kXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICByZXEub24oXCJlcnJvclwiLCAoZXJyOiB1bmtub3duKSA9PiByZWplY3QoZXJyKSk7XG4gICAgfSk7XG4gICAgY29uc3QgcmF3ID0gQnVmZmVyLmNvbmNhdChjaHVua3MpLnRvU3RyaW5nKFwidXRmOFwiKTtcbiAgICBjb25zdCBib2R5ID0gcmF3ID8gSlNPTi5wYXJzZShyYXcpIDoge307XG5cbiAgICBjb25zdCB7IGZpcnN0bmFtZSwgbGFzdG5hbWUsIGVtYWlsLCBzdWJqZWN0LCBtZXNzYWdlIH0gPSBib2R5IHx8IHt9O1xuXG4gICAgaWYgKCFmaXJzdG5hbWUgfHwgIWxhc3RuYW1lIHx8ICFlbWFpbCB8fCAhbWVzc2FnZSkge1xuICAgICAgcmVzLnN0YXR1c0NvZGUgPSA0MDA7XG4gICAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogXCJNaXNzaW5nIHJlcXVpcmVkIGZpZWxkczogZmlyc3RuYW1lLCBsYXN0bmFtZSwgZW1haWwsIG1lc3NhZ2VcIiB9KSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2FuaXRpemVkRmlyc3RuYW1lID0gU3RyaW5nKGZpcnN0bmFtZSkuc2xpY2UoMCwgMTAwKTtcbiAgICBjb25zdCBzYW5pdGl6ZWRMYXN0bmFtZSA9IFN0cmluZyhsYXN0bmFtZSkuc2xpY2UoMCwgMTAwKTtcbiAgICBjb25zdCBzYW5pdGl6ZWRFbWFpbCA9IFN0cmluZyhlbWFpbCkuc2xpY2UoMCwgMjU1KTtcbiAgICBjb25zdCBzYW5pdGl6ZWRNZXNzYWdlID0gU3RyaW5nKG1lc3NhZ2UpLnNsaWNlKDAsIDUwMDApO1xuICAgIGNvbnN0IHNhbml0aXplZFN1YmplY3QgPSBzdWJqZWN0ID8gU3RyaW5nKHN1YmplY3QpLnNsaWNlKDAsIDIwMCkgOiBcIlwiO1xuICAgIGNvbnN0IGZ1bGxOYW1lID0gYCR7c2FuaXRpemVkRmlyc3RuYW1lfSAke3Nhbml0aXplZExhc3RuYW1lfWA7XG5cbiAgICBjb25zdCBodG1sQ29udGVudCA9IGBcbiAgICAgIDxkaXYgc3R5bGU9XCJmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7IG1heC13aWR0aDogNjAwcHg7IG1hcmdpbjogMCBhdXRvOyBwYWRkaW5nOiAyMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1wiPlxuICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjsgcGFkZGluZzogMzBweDsgYm9yZGVyLXJhZGl1czogMTBweDsgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKTtcIj5cbiAgICAgICAgICA8aDIgc3R5bGU9XCJjb2xvcjogI0U1MDAyRTsgbWFyZ2luLWJvdHRvbTogMjBweDsgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNFNTAwMkU7IHBhZGRpbmctYm90dG9tOiAxMHB4O1wiPlxuICAgICAgICAgICAgTm91dmVsbGUgRGVtYW5kZSBkZSBDb250YWN0XG4gICAgICAgICAgPC9oMj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMjBweDtcIj5cbiAgICAgICAgICAgIDxwIHN0eWxlPVwibWFyZ2luOiAxMHB4IDA7XCI+PHN0cm9uZyBzdHlsZT1cImNvbG9yOiAjMzMzO1wiPk5vbTo8L3N0cm9uZz4gJHtmdWxsTmFtZX08L3A+XG4gICAgICAgICAgICA8cCBzdHlsZT1cIm1hcmdpbjogMTBweCAwO1wiPjxzdHJvbmcgc3R5bGU9XCJjb2xvcjogIzMzMztcIj5FbWFpbDo8L3N0cm9uZz4gXG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJtYWlsdG86JHtzYW5pdGl6ZWRFbWFpbH1cIiBzdHlsZT1cImNvbG9yOiAjRTUwMDJFOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7XCI+JHtzYW5pdGl6ZWRFbWFpbH08L2E+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAke3Nhbml0aXplZFN1YmplY3QgPyBgPHAgc3R5bGU9XCJtYXJnaW46IDEwcHggMDtcIj48c3Ryb25nIHN0eWxlPVwiY29sb3I6ICMzMzM7XCI+U3VqZXQ6PC9zdHJvbmc+ICR7c2FuaXRpemVkU3ViamVjdH08L3A+YCA6ICcnfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tdG9wOiAyMHB4O1wiPlxuICAgICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAxMHB4O1wiPjxzdHJvbmcgc3R5bGU9XCJjb2xvcjogIzMzMztcIj5NZXNzYWdlOjwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1OyBwYWRkaW5nOiAyMHB4OyBib3JkZXItcmFkaXVzOiA1cHg7IGJvcmRlci1sZWZ0OiA0cHggc29saWQgI0U1MDAyRTtcIj5cbiAgICAgICAgICAgICAgPHAgc3R5bGU9XCJ3aGl0ZS1zcGFjZTogcHJlLXdyYXA7IGxpbmUtaGVpZ2h0OiAxLjY7IGNvbG9yOiAjNTU1OyBtYXJnaW46IDA7XCI+XG4gICAgICAgICAgICAgICAgJHtzYW5pdGl6ZWRNZXNzYWdlfVxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8aHIgc3R5bGU9XCJib3JkZXI6IG5vbmU7IGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGRkOyBtYXJnaW46IDMwcHggMDtcIiAvPlxuICAgICAgICAgIDxwIHN0eWxlPVwiZm9udC1zaXplOiAxMnB4OyBjb2xvcjogIzk5OTsgdGV4dC1hbGlnbjogY2VudGVyOyBtYXJnaW46IDA7XCI+XG4gICAgICAgICAgICBDZSBtZXNzYWdlIGEgXHUwMEU5dFx1MDBFOSBlbnZveVx1MDBFOSBkZXB1aXMgbGUgZm9ybXVsYWlyZSBkZSBjb250YWN0IGRlIEJpbmtvTyBEaWdpdGFsIExhYjxici8+XG4gICAgICAgICAgICBEYXRlOiAke25ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoJ2ZyLUZSJyl9XG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICAvLyBTZW5kIHRvIHNpdGUgb3duZXJcbiAgICBjb25zdCBhZG1pbkluZm8gPSBhd2FpdCB0cmFuc3BvcnRlci5zZW5kTWFpbCh7XG4gICAgICBmcm9tOiBwcm9jZXNzLmVudi5TTVRQX1VTRVIsXG4gICAgICB0bzogXCJCaW5rb29kaWdpdGFsbGFiQGdtYWlsLmNvbVwiLFxuICAgICAgc3ViamVjdDogc2FuaXRpemVkU3ViamVjdCB8fCBgTm91dmVsbGUgZGVtYW5kZSBkZSBjb250YWN0OiAke2Z1bGxOYW1lfWAsXG4gICAgICBodG1sOiBodG1sQ29udGVudCxcbiAgICAgIHRleHQ6IGBOb206ICR7ZnVsbE5hbWV9XFxuRW1haWw6ICR7c2FuaXRpemVkRW1haWx9XFxuJHtzYW5pdGl6ZWRTdWJqZWN0ID8gYFN1amV0OiAke3Nhbml0aXplZFN1YmplY3R9XFxuYCA6ICcnfVxcbk1lc3NhZ2U6XFxuJHtzYW5pdGl6ZWRNZXNzYWdlfWAsXG4gICAgfSk7XG5cbiAgICAvLyBTZW5kIGNvbmZpcm1hdGlvbiB0byB1c2VyIChpZ25vcmUgZmFpbHVyZSBzaWxlbnRseSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29uZmlybWF0aW9uSHRtbCA9IGBcbiAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjsgbWF4LXdpZHRoOiA2MDBweDsgbWFyZ2luOiAwIGF1dG87IHBhZGRpbmc6IDIwcHg7IGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XCI+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7IHBhZGRpbmc6IDMwcHg7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSk7XCI+XG4gICAgICAgICAgICA8aDIgc3R5bGU9XCJjb2xvcjogI0U1MDAyRTsgbWFyZ2luLWJvdHRvbTogMjBweDtcIj5NZXJjaSBkZSBub3VzIGF2b2lyIGNvbnRhY3RcdTAwRTlzICE8L2gyPlxuICAgICAgICAgICAgPHAgc3R5bGU9XCJjb2xvcjogIzMzMzsgbGluZS1oZWlnaHQ6IDEuNjtcIj5Cb25qb3VyICR7c2FuaXRpemVkRmlyc3RuYW1lfSw8L3A+XG4gICAgICAgICAgICA8cCBzdHlsZT1cImNvbG9yOiAjNTU1OyBsaW5lLWhlaWdodDogMS42O1wiPlxuICAgICAgICAgICAgICBOb3VzIGF2b25zIGJpZW4gcmVcdTAwRTd1IHZvdHJlIG1lc3NhZ2UgZXQgbm91cyB2b3VzIGVuIHJlbWVyY2lvbnMuIE5vdHJlIFx1MDBFOXF1aXBlIHJldmllbmRyYSB2ZXJzIHZvdXMgZGFucyBsZXMgcGx1cyBicmVmcyBkXHUwMEU5bGFpcy5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxwIHN0eWxlPVwiY29sb3I6ICM1NTU7IGxpbmUtaGVpZ2h0OiAxLjY7XCI+XG4gICAgICAgICAgICAgIFZvdHJlIGRlbWFuZGUgZXN0IGltcG9ydGFudGUgcG91ciBub3VzIGV0IG5vdXMgbWV0dG9ucyB0b3V0IGVuIFx1MDE1M3V2cmUgcG91ciB2b3VzIHJcdTAwRTlwb25kcmUgcmFwaWRlbWVudC5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tdG9wOiAzMHB4OyBwYWRkaW5nLXRvcDogMjBweDsgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XCI+XG4gICAgICAgICAgICAgIDxwIHN0eWxlPVwiY29sb3I6ICM5OTk7IGZvbnQtc2l6ZTogMTRweDsgbWFyZ2luOiA1cHggMDtcIj5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPkJpbmtvTyBEaWdpdGFsIExhYjwvc3Ryb25nPjxici8+XG4gICAgICAgICAgICAgICAgTCdhdXRvbWF0aXNhdGlvbiBlc3Qgbm90cmUgcGFzc2lvbjxici8+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cInRlbDorMjI2NDQzMjM4NDFcIiBzdHlsZT1cImNvbG9yOiAjRTUwMDJFOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7XCI+KzIyNiA0NCAzMiAzOCA0MTwvYT5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmA7XG4gICAgICBhd2FpdCB0cmFuc3BvcnRlci5zZW5kTWFpbCh7XG4gICAgICAgIGZyb206IHByb2Nlc3MuZW52LlNNVFBfVVNFUixcbiAgICAgICAgdG86IHNhbml0aXplZEVtYWlsLFxuICAgICAgICBzdWJqZWN0OiBcIkNvbmZpcm1hdGlvbiBkZSByXHUwMEU5Y2VwdGlvbiAtIEJpbmtvTyBEaWdpdGFsIExhYlwiLFxuICAgICAgICBodG1sOiBjb25maXJtYXRpb25IdG1sLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCB7fVxuXG4gICAgcmVzLnN0YXR1c0NvZGUgPSAyMDA7XG4gICAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IGBFbWFpbCBzZW50IHN1Y2Nlc3NmdWxseSAoSUQ6ICR7YWRtaW5JbmZvLm1lc3NhZ2VJZH0pYCB9KSk7XG4gIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgY29uc3QgbXNnID0gZXJyPy5tZXNzYWdlIHx8IFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCI7XG4gICAgcmVzLnN0YXR1c0NvZGUgPSA1MDA7XG4gICAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBtc2cgfSkpO1xuICB9XG59XG5cbmNvbnN0IGNvbnRhY3RBcGlQbHVnaW4gPSAoKSA9PiAoe1xuICBuYW1lOiBcImNvbnRhY3QtYXBpLXBsdWdpblwiLFxuICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyOiBhbnkpIHtcbiAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKFwiL2FwaS9jb250YWN0XCIsIChyZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcbiAgICAgIGhhbmRsZUNvbnRhY3RBcGkocmVxLCByZXMpO1xuICAgIH0pO1xuICB9LFxuICBjb25maWd1cmVQcmV2aWV3U2VydmVyKHNlcnZlcjogYW55KSB7XG4gICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZShcIi9hcGkvY29udGFjdFwiLCAocmVxOiBhbnksIHJlczogYW55KSA9PiB7XG4gICAgICBoYW5kbGVDb250YWN0QXBpKHJlcSwgcmVzKTtcbiAgICB9KTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogMzAwMCxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgbG9nRXJyb3JzUGx1Z2luKCksXG4gICAgY29udGFjdEFwaVBsdWdpbigpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KTtcbi8vIE9yY2hpZHMgcmVzdGFydDogMTc2MjY0MDQ2MzIxNiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGdCQUFnQjtBQUh2QixJQUFNLG1DQUFtQztBQU16QyxJQUFNLGtCQUFrQixPQUFPO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBQ04scUJBQXFCO0FBQ25CLFdBQU87QUFBQSxNQUNMLE1BQU07QUFBQSxRQUNKO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxVQUFVO0FBQUEsVUFDVixVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBdUNaO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFHQSxJQUFNLGNBQWMsb0JBQUksSUFBc0I7QUFDOUMsU0FBUyxjQUFjLElBQVksY0FBYyxHQUFHLFdBQVcsS0FBUTtBQUNyRSxRQUFNLE1BQU0sS0FBSyxJQUFJO0FBQ3JCLFFBQU0sTUFBTSxZQUFZLElBQUksRUFBRSxLQUFLLENBQUM7QUFDcEMsUUFBTSxTQUFTLElBQUksT0FBTyxDQUFDLE1BQU0sTUFBTSxJQUFJLFFBQVE7QUFD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
