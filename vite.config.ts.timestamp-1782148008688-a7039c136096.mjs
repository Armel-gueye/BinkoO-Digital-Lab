// vite.config.ts
import { defineConfig } from "file:///C:/Users/mrgue/OneDrive/Documents/BDL%20Files/Fichiers%20sites%20web/BinkoO-Digital-Lab/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/mrgue/OneDrive/Documents/BDL%20Files/Fichiers%20sites%20web/BinkoO-Digital-Lab/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import nodemailer from "file:///C:/Users/mrgue/OneDrive/Documents/BDL%20Files/Fichiers%20sites%20web/BinkoO-Digital-Lab/node_modules/nodemailer/lib/nodemailer.js";
import Sitemap from "file:///C:/Users/mrgue/OneDrive/Documents/BDL%20Files/Fichiers%20sites%20web/BinkoO-Digital-Lab/node_modules/vite-plugin-sitemap/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\mrgue\\OneDrive\\Documents\\BDL Files\\Fichiers sites web\\BinkoO-Digital-Lab";
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
      to: "contact@binkoo.digital",
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
var vite_config_default = defineConfig(async () => {
  let blogRoutes = [];
  let tagRoutes = [];
  try {
    const [postsRes, tagsRes] = await Promise.all([
      fetch("https://blog.binkoo.digital/wp-json/wp/v2/posts?per_page=100", {
        headers: { "Accept": "application/json" }
      }),
      fetch("https://blog.binkoo.digital/wp-json/wp/v2/tags?per_page=100", {
        headers: { "Accept": "application/json" }
      })
    ]);
    if (postsRes.ok) {
      const posts = await postsRes.json();
      if (Array.isArray(posts)) {
        blogRoutes = posts.map((post) => `/blog/${post.slug}`);
      }
    }
    if (tagsRes.ok) {
      const tags = await tagsRes.json();
      if (Array.isArray(tags)) {
        tagRoutes = tags.map((tag) => `/blog/tag/${tag.slug}`);
      }
    }
  } catch (error) {
    console.error("Error fetching blog data for sitemap generation:", error);
  }
  const localHubCities = ["ouagadougou", "bobo-dioulasso", "abidjan", "bamako", "dakar", "lome", "cotonou"];
  const localHubRoutes = localHubCities.map((city) => `/agence-ia-automatisation/${city}`);
  return {
    server: {
      host: "::",
      port: 3e3
    },
    plugins: [
      react(),
      contactApiPlugin(),
      Sitemap({
        hostname: "https://binkoo.digital",
        dynamicRoutes: [
          "/services",
          "/a-propos",
          "/services/ia-automatisation",
          "/services/sites-app-web",
          "/services/branding",
          "/realisations",
          "/realisations/amisi-sarl",
          "/realisations/automatisation-blog-seo",
          "/blog",
          "/contact",
          "/politique-confidentialite",
          ...localHubRoutes,
          ...blogRoutes,
          ...tagRoutes
        ],
        generateRobotsTxt: false
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-react": ["react", "react-dom", "react-router-dom"],
            "vendor-ui": [
              "@radix-ui/react-dialog",
              "@radix-ui/react-dropdown-menu",
              "@radix-ui/react-select",
              "@radix-ui/react-tabs",
              "@radix-ui/react-toast"
            ],
            "vendor-animation": ["framer-motion", "gsap"]
          }
        }
      },
      chunkSizeWarningLimit: 1e3,
      minify: "esbuild"
    },
    esbuild: {
      drop: ["console", "debugger"]
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "framer-motion"
      ],
      exclude: []
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtcmd1ZVxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcQkRMIEZpbGVzXFxcXEZpY2hpZXJzIHNpdGVzIHdlYlxcXFxCaW5rb08tRGlnaXRhbC1MYWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1yZ3VlXFxcXE9uZURyaXZlXFxcXERvY3VtZW50c1xcXFxCREwgRmlsZXNcXFxcRmljaGllcnMgc2l0ZXMgd2ViXFxcXEJpbmtvTy1EaWdpdGFsLUxhYlxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbXJndWUvT25lRHJpdmUvRG9jdW1lbnRzL0JETCUyMEZpbGVzL0ZpY2hpZXJzJTIwc2l0ZXMlMjB3ZWIvQmlua29PLURpZ2l0YWwtTGFiL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIjtcclxuaW1wb3J0IFNpdGVtYXAgZnJvbSBcInZpdGUtcGx1Z2luLXNpdGVtYXBcIjtcclxuXHJcbi8vIEluLW1lbW9yeSByYXRlIGxpbWl0ZXJcclxuY29uc3QgcmVxdWVzdHNNYXAgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyW10+KCk7XHJcbmZ1bmN0aW9uIGlzUmF0ZUxpbWl0ZWQoaXA6IHN0cmluZywgbWF4UmVxdWVzdHMgPSA1LCB3aW5kb3dNcyA9IDYwXzAwMCkge1xyXG4gIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgY29uc3QgYXJyID0gcmVxdWVzdHNNYXAuZ2V0KGlwKSB8fCBbXTtcclxuICBjb25zdCByZWNlbnQgPSBhcnIuZmlsdGVyKCh0KSA9PiBub3cgLSB0IDwgd2luZG93TXMpO1xyXG4gIGlmIChyZWNlbnQubGVuZ3RoID49IG1heFJlcXVlc3RzKSByZXR1cm4gdHJ1ZTtcclxuICByZWNlbnQucHVzaChub3cpO1xyXG4gIHJlcXVlc3RzTWFwLnNldChpcCwgcmVjZW50KTtcclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbi8vIFNoYXJlZCBtYWlsIHRyYW5zcG9ydGVyIGZvciBkZXYvcHJldmlld1xyXG5jb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcclxuICBzZXJ2aWNlOiBcImdtYWlsXCIsXHJcbiAgYXV0aDoge1xyXG4gICAgdXNlcjogcHJvY2Vzcy5lbnYuU01UUF9VU0VSIHx8IFwiXCIsXHJcbiAgICBwYXNzOiBwcm9jZXNzLmVudi5TTVRQX1BBU1MgfHwgXCJcIixcclxuICB9LFxyXG59KTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNvbnRhY3RBcGkocmVxOiBhbnksIHJlczogYW55KSB7XHJcbiAgY29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZCB8fCBcIkdFVFwiO1xyXG4gIGlmIChtZXRob2QgIT09IFwiUE9TVFwiKSB7XHJcbiAgICByZXMuc3RhdHVzQ29kZSA9IDQwNTtcclxuICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBcIk1ldGhvZCBub3QgYWxsb3dlZFwiIH0pKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGlwID0gKHJlcS5oZWFkZXJzW1wieC1mb3J3YXJkZWQtZm9yXCJdIGFzIHN0cmluZykgfHwgcmVxLnNvY2tldD8ucmVtb3RlQWRkcmVzcyB8fCBcInVua25vd25cIjtcclxuICBpZiAoaXNSYXRlTGltaXRlZChpcCkpIHtcclxuICAgIHJlcy5zdGF0dXNDb2RlID0gNDI5O1xyXG4gICAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IFwiVG9vIG1hbnkgcmVxdWVzdHMuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuXCIgfSkpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFwcm9jZXNzLmVudi5TTVRQX1VTRVIgfHwgIXByb2Nlc3MuZW52LlNNVFBfUEFTUykge1xyXG4gICAgcmVzLnN0YXR1c0NvZGUgPSA1MDA7XHJcbiAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogXCJFbWFpbCBzZXJ2aWNlIG5vdCBjb25maWd1cmVkLiBNaXNzaW5nIFNNVFBfVVNFUi9TTVRQX1BBU1MuXCIgfSkpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGNodW5rczogQnVmZmVyW10gPSBbXTtcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgcmVxLm9uKFwiZGF0YVwiLCAoYzogQnVmZmVyKSA9PiBjaHVua3MucHVzaChjKSk7XHJcbiAgICAgIHJlcS5vbihcImVuZFwiLCAoKSA9PiByZXNvbHZlKCkpO1xyXG4gICAgICByZXEub24oXCJlcnJvclwiLCAoZXJyOiB1bmtub3duKSA9PiByZWplY3QoZXJyKSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHJhdyA9IEJ1ZmZlci5jb25jYXQoY2h1bmtzKS50b1N0cmluZyhcInV0ZjhcIik7XHJcbiAgICBjb25zdCBib2R5ID0gcmF3ID8gSlNPTi5wYXJzZShyYXcpIDoge307XHJcblxyXG4gICAgY29uc3QgeyBmaXJzdG5hbWUsIGxhc3RuYW1lLCBlbWFpbCwgc3ViamVjdCwgbWVzc2FnZSB9ID0gYm9keSB8fCB7fTtcclxuXHJcbiAgICBpZiAoIWZpcnN0bmFtZSB8fCAhbGFzdG5hbWUgfHwgIWVtYWlsIHx8ICFtZXNzYWdlKSB7XHJcbiAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDAwO1xyXG4gICAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBcIk1pc3NpbmcgcmVxdWlyZWQgZmllbGRzOiBmaXJzdG5hbWUsIGxhc3RuYW1lLCBlbWFpbCwgbWVzc2FnZVwiIH0pKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNhbml0aXplZEZpcnN0bmFtZSA9IFN0cmluZyhmaXJzdG5hbWUpLnNsaWNlKDAsIDEwMCk7XHJcbiAgICBjb25zdCBzYW5pdGl6ZWRMYXN0bmFtZSA9IFN0cmluZyhsYXN0bmFtZSkuc2xpY2UoMCwgMTAwKTtcclxuICAgIGNvbnN0IHNhbml0aXplZEVtYWlsID0gU3RyaW5nKGVtYWlsKS5zbGljZSgwLCAyNTUpO1xyXG4gICAgY29uc3Qgc2FuaXRpemVkTWVzc2FnZSA9IFN0cmluZyhtZXNzYWdlKS5zbGljZSgwLCA1MDAwKTtcclxuICAgIGNvbnN0IHNhbml0aXplZFN1YmplY3QgPSBzdWJqZWN0ID8gU3RyaW5nKHN1YmplY3QpLnNsaWNlKDAsIDIwMCkgOiBcIlwiO1xyXG4gICAgY29uc3QgZnVsbE5hbWUgPSBgJHtzYW5pdGl6ZWRGaXJzdG5hbWV9ICR7c2FuaXRpemVkTGFzdG5hbWV9YDtcclxuXHJcbiAgICBjb25zdCBodG1sQ29udGVudCA9IGBcclxuICAgICAgPGRpdiBzdHlsZT1cImZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjsgbWF4LXdpZHRoOiA2MDBweDsgbWFyZ2luOiAwIGF1dG87IHBhZGRpbmc6IDIwcHg7IGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7IHBhZGRpbmc6IDMwcHg7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSk7XCI+XHJcbiAgICAgICAgICA8aDIgc3R5bGU9XCJjb2xvcjogI0U1MDAyRTsgbWFyZ2luLWJvdHRvbTogMjBweDsgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNFNTAwMkU7IHBhZGRpbmctYm90dG9tOiAxMHB4O1wiPlxyXG4gICAgICAgICAgICBOb3V2ZWxsZSBEZW1hbmRlIGRlIENvbnRhY3RcclxuICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMjBweDtcIj5cclxuICAgICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW46IDEwcHggMDtcIj48c3Ryb25nIHN0eWxlPVwiY29sb3I6ICMzMzM7XCI+Tm9tOjwvc3Ryb25nPiAke2Z1bGxOYW1lfTwvcD5cclxuICAgICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW46IDEwcHggMDtcIj48c3Ryb25nIHN0eWxlPVwiY29sb3I6ICMzMzM7XCI+RW1haWw6PC9zdHJvbmc+IFxyXG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJtYWlsdG86JHtzYW5pdGl6ZWRFbWFpbH1cIiBzdHlsZT1cImNvbG9yOiAjRTUwMDJFOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7XCI+JHtzYW5pdGl6ZWRFbWFpbH08L2E+XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgJHtzYW5pdGl6ZWRTdWJqZWN0ID8gYDxwIHN0eWxlPVwibWFyZ2luOiAxMHB4IDA7XCI+PHN0cm9uZyBzdHlsZT1cImNvbG9yOiAjMzMzO1wiPlN1amV0Ojwvc3Ryb25nPiAke3Nhbml0aXplZFN1YmplY3R9PC9wPmAgOiAnJ31cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbi10b3A6IDIwcHg7XCI+XHJcbiAgICAgICAgICAgIDxwIHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMTBweDtcIj48c3Ryb25nIHN0eWxlPVwiY29sb3I6ICMzMzM7XCI+TWVzc2FnZTo8L3N0cm9uZz48L3A+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1OyBwYWRkaW5nOiAyMHB4OyBib3JkZXItcmFkaXVzOiA1cHg7IGJvcmRlci1sZWZ0OiA0cHggc29saWQgI0U1MDAyRTtcIj5cclxuICAgICAgICAgICAgICA8cCBzdHlsZT1cIndoaXRlLXNwYWNlOiBwcmUtd3JhcDsgbGluZS1oZWlnaHQ6IDEuNjsgY29sb3I6ICM1NTU7IG1hcmdpbjogMDtcIj5cclxuICAgICAgICAgICAgICAgICR7c2FuaXRpemVkTWVzc2FnZX1cclxuICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8aHIgc3R5bGU9XCJib3JkZXI6IG5vbmU7IGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGRkOyBtYXJnaW46IDMwcHggMDtcIiAvPlxyXG4gICAgICAgICAgPHAgc3R5bGU9XCJmb250LXNpemU6IDEycHg7IGNvbG9yOiAjOTk5OyB0ZXh0LWFsaWduOiBjZW50ZXI7IG1hcmdpbjogMDtcIj5cclxuICAgICAgICAgICAgQ2UgbWVzc2FnZSBhIFx1MDBFOXRcdTAwRTkgZW52b3lcdTAwRTkgZGVwdWlzIGxlIGZvcm11bGFpcmUgZGUgY29udGFjdCBkZSBCaW5rb08gRGlnaXRhbCBMYWI8YnIvPlxyXG4gICAgICAgICAgICBEYXRlOiAke25ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoJ2ZyLUZSJyl9XHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgYDtcclxuXHJcbiAgICBjb25zdCBhZG1pbkluZm8gPSBhd2FpdCB0cmFuc3BvcnRlci5zZW5kTWFpbCh7XHJcbiAgICAgIGZyb206IHByb2Nlc3MuZW52LlNNVFBfVVNFUixcclxuICAgICAgdG86IFwiY29udGFjdEBiaW5rb28uZGlnaXRhbFwiLFxyXG4gICAgICBzdWJqZWN0OiBzYW5pdGl6ZWRTdWJqZWN0IHx8IGBOb3V2ZWxsZSBkZW1hbmRlIGRlIGNvbnRhY3Q6ICR7ZnVsbE5hbWV9YCxcclxuICAgICAgaHRtbDogaHRtbENvbnRlbnQsXHJcbiAgICAgIHRleHQ6IGBOb206ICR7ZnVsbE5hbWV9XHJcbkVtYWlsOiAke3Nhbml0aXplZEVtYWlsfVxyXG4ke3Nhbml0aXplZFN1YmplY3QgPyBgU3VqZXQ6ICR7c2FuaXRpemVkU3ViamVjdH1cclxuYCA6ICcnfVxyXG5NZXNzYWdlOlxyXG4ke3Nhbml0aXplZE1lc3NhZ2V9YCxcclxuICAgIH0pO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNvbmZpcm1hdGlvbkh0bWwgPSBgXHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjsgbWF4LXdpZHRoOiA2MDBweDsgbWFyZ2luOiAwIGF1dG87IHBhZGRpbmc6IDIwcHg7IGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XCI+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjsgcGFkZGluZzogMzBweDsgYm9yZGVyLXJhZGl1czogMTBweDsgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKTtcIj5cclxuICAgICAgICAgICAgPGgyIHN0eWxlPVwiY29sb3I6ICNFNTAwMkU7IG1hcmdpbi1ib3R0b206IDIwcHg7XCI+TWVyY2kgZGUgbm91cyBhdm9pciBjb250YWN0XHUwMEU5cyAhPC9oMj5cclxuICAgICAgICAgICAgPHAgc3R5bGU9XCJjb2xvcjogIzMzMzsgbGluZS1oZWlnaHQ6IDEuNjtcIj5Cb25qb3VyICR7c2FuaXRpemVkRmlyc3RuYW1lfSw8L3A+XHJcbiAgICAgICAgICAgIDxwIHN0eWxlPVwiY29sb3I6ICM1NTU7IGxpbmUtaGVpZ2h0OiAxLjY7XCI+XHJcbiAgICAgICAgICAgICAgTm91cyBhdm9ucyBiaWVuIHJlXHUwMEU3dSB2b3RyZSBtZXNzYWdlIGV0IG5vdXMgdm91cyBlbiByZW1lcmNpb25zLiBOb3RyZSBcdTAwRTlxdWlwZSByZXZpZW5kcmEgdmVycyB2b3VzIGRhbnMgbGVzIHBsdXMgYnJlZnMgZFx1MDBFOWxhaXMuXHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPHAgc3R5bGU9XCJjb2xvcjogIzU1NTsgbGluZS1oZWlnaHQ6IDEuNjtcIj5cclxuICAgICAgICAgICAgICBWb3RyZSBkZW1hbmRlIGVzdCBpbXBvcnRhbnRlIHBvdXIgbm91cyBldCBub3VzIG1ldHRvbnMgdG91dCBlbiBcdTAxNTN1dnJlIHBvdXIgdm91cyByXHUwMEU5cG9uZHJlIHJhcGlkZW1lbnQuXHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbi10b3A6IDMwcHg7IHBhZGRpbmctdG9wOiAyMHB4OyBib3JkZXItdG9wOiAxcHggc29saWQgI2RkZDtcIj5cclxuICAgICAgICAgICAgICA8cCBzdHlsZT1cImNvbG9yOiAjOTk5OyBmb250LXNpemU6IDE0cHg7IG1hcmdpbjogNXB4IDA7XCI+XHJcbiAgICAgICAgICAgICAgICA8c3Ryb25nPkJpbmtvTyBEaWdpdGFsIExhYjwvc3Ryb25nPjxici8+XHJcbiAgICAgICAgICAgICAgICBMJ2F1dG9tYXRpc2F0aW9uIGVzdCBub3RyZSBwYXNzaW9uPGJyLz5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJ0ZWw6KzIyNjQ0MzIzODQxXCIgc3R5bGU9XCJjb2xvcjogI0U1MDAyRTsgdGV4dC1kZWNvcmF0aW9uOiBub25lO1wiPisyMjYgNDQgMzIgMzggNDE8L2E+XHJcbiAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PmA7XHJcbiAgICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKHtcclxuICAgICAgICBmcm9tOiBwcm9jZXNzLmVudi5TTVRQX1VTRVIsXHJcbiAgICAgICAgdG86IHNhbml0aXplZEVtYWlsLFxyXG4gICAgICAgIHN1YmplY3Q6IFwiQ29uZmlybWF0aW9uIGRlIHJcdTAwRTljZXB0aW9uIC0gQmlua29PIERpZ2l0YWwgTGFiXCIsXHJcbiAgICAgICAgaHRtbDogY29uZmlybWF0aW9uSHRtbCxcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIHt9XHJcblxyXG4gICAgcmVzLnN0YXR1c0NvZGUgPSAyMDA7XHJcbiAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiBgRW1haWwgc2VudCBzdWNjZXNzZnVsbHkgKElEOiAke2FkbWluSW5mby5tZXNzYWdlSWR9KWAgfSkpO1xyXG4gIH0gY2F0Y2ggKGVycjogYW55KSB7XHJcbiAgICBjb25zdCBtc2cgPSBlcnI/Lm1lc3NhZ2UgfHwgXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIjtcclxuICAgIHJlcy5zdGF0dXNDb2RlID0gNTAwO1xyXG4gICAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IG1zZyB9KSk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBjb250YWN0QXBpUGx1Z2luID0gKCkgPT4gKHtcclxuICBuYW1lOiBcImNvbnRhY3QtYXBpLXBsdWdpblwiLFxyXG4gIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXI6IGFueSkge1xyXG4gICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZShcIi9hcGkvY29udGFjdFwiLCAocmVxOiBhbnksIHJlczogYW55KSA9PiB7XHJcbiAgICAgIGhhbmRsZUNvbnRhY3RBcGkocmVxLCByZXMpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBjb25maWd1cmVQcmV2aWV3U2VydmVyKHNlcnZlcjogYW55KSB7XHJcbiAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKFwiL2FwaS9jb250YWN0XCIsIChyZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcclxuICAgICAgaGFuZGxlQ29udGFjdEFwaShyZXEsIHJlcyk7XHJcbiAgICB9KTtcclxuICB9LFxyXG59KTtcclxuXHJcbmltcG9ydCB0eXBlIHsgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKGFzeW5jICgpOiBQcm9taXNlPFVzZXJDb25maWc+ID0+IHtcclxuICBsZXQgYmxvZ1JvdXRlczogc3RyaW5nW10gPSBbXTtcclxuICBsZXQgdGFnUm91dGVzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBbcG9zdHNSZXMsIHRhZ3NSZXNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICBmZXRjaCgnaHR0cHM6Ly9ibG9nLmJpbmtvby5kaWdpdGFsL3dwLWpzb24vd3AvdjIvcG9zdHM/cGVyX3BhZ2U9MTAwJywge1xyXG4gICAgICAgIGhlYWRlcnM6IHsgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyB9XHJcbiAgICAgIH0pLFxyXG4gICAgICBmZXRjaCgnaHR0cHM6Ly9ibG9nLmJpbmtvby5kaWdpdGFsL3dwLWpzb24vd3AvdjIvdGFncz9wZXJfcGFnZT0xMDAnLCB7XHJcbiAgICAgICAgaGVhZGVyczogeyAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nIH1cclxuICAgICAgfSlcclxuICAgIF0pO1xyXG4gICAgaWYgKHBvc3RzUmVzLm9rKSB7XHJcbiAgICAgIGNvbnN0IHBvc3RzID0gKGF3YWl0IHBvc3RzUmVzLmpzb24oKSkgYXMgYW55W107XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHBvc3RzKSkge1xyXG4gICAgICAgIGJsb2dSb3V0ZXMgPSBwb3N0cy5tYXAoKHBvc3QpID0+IGAvYmxvZy8ke3Bvc3Quc2x1Z31gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRhZ3NSZXMub2spIHtcclxuICAgICAgY29uc3QgdGFncyA9IChhd2FpdCB0YWdzUmVzLmpzb24oKSkgYXMgYW55W107XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRhZ3MpKSB7XHJcbiAgICAgICAgdGFnUm91dGVzID0gdGFncy5tYXAoKHRhZykgPT4gYC9ibG9nL3RhZy8ke3RhZy5zbHVnfWApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBibG9nIGRhdGEgZm9yIHNpdGVtYXAgZ2VuZXJhdGlvbjpcIiwgZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbG9jYWxIdWJDaXRpZXMgPSBbJ291YWdhZG91Z291JywgJ2JvYm8tZGlvdWxhc3NvJywgJ2FiaWRqYW4nLCAnYmFtYWtvJywgJ2Rha2FyJywgJ2xvbWUnLCAnY290b25vdSddO1xyXG4gIGNvbnN0IGxvY2FsSHViUm91dGVzID0gbG9jYWxIdWJDaXRpZXMubWFwKGNpdHkgPT4gYC9hZ2VuY2UtaWEtYXV0b21hdGlzYXRpb24vJHtjaXR5fWApO1xyXG5cclxuICByZXR1cm4ge1xyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogXCI6OlwiLFxyXG4gICAgcG9ydDogMzAwMCxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBjb250YWN0QXBpUGx1Z2luKCksXHJcbiAgICBTaXRlbWFwKHtcclxuICAgICAgaG9zdG5hbWU6ICdodHRwczovL2Jpbmtvby5kaWdpdGFsJyxcclxuICAgICAgZHluYW1pY1JvdXRlczogW1xyXG4gICAgICAgICcvc2VydmljZXMnLFxyXG4gICAgICAgICcvYS1wcm9wb3MnLFxyXG4gICAgICAgICcvc2VydmljZXMvaWEtYXV0b21hdGlzYXRpb24nLFxyXG4gICAgICAgICcvc2VydmljZXMvc2l0ZXMtYXBwLXdlYicsXHJcbiAgICAgICAgJy9zZXJ2aWNlcy9icmFuZGluZycsXHJcbiAgICAgICAgJy9yZWFsaXNhdGlvbnMnLFxyXG4gICAgICAgICcvcmVhbGlzYXRpb25zL2FtaXNpLXNhcmwnLFxyXG4gICAgICAgICcvcmVhbGlzYXRpb25zL2F1dG9tYXRpc2F0aW9uLWJsb2ctc2VvJyxcclxuICAgICAgICAnL2Jsb2cnLFxyXG4gICAgICAgICcvY29udGFjdCcsXHJcbiAgICAgICAgJy9wb2xpdGlxdWUtY29uZmlkZW50aWFsaXRlJyxcclxuICAgICAgICAuLi5sb2NhbEh1YlJvdXRlcyxcclxuICAgICAgICAuLi5ibG9nUm91dGVzLFxyXG4gICAgICAgIC4uLnRhZ1JvdXRlc1xyXG4gICAgICBdLFxyXG4gICAgICBnZW5lcmF0ZVJvYm90c1R4dDogZmFsc2VcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICAndmVuZG9yLXJlYWN0JzogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxyXG4gICAgICAgICAgJ3ZlbmRvci11aSc6IFtcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1kaWFsb2cnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnUnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXNlbGVjdCcsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdGFicycsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdG9hc3QnLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgICd2ZW5kb3ItYW5pbWF0aW9uJzogWydmcmFtZXItbW90aW9uJywgJ2dzYXAnXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcclxuICAgIG1pbmlmeTogJ2VzYnVpbGQnLFxyXG4gIH0sXHJcbiAgZXNidWlsZDoge1xyXG4gICAgZHJvcDogWydjb25zb2xlJywgJ2RlYnVnZ2VyJ10sXHJcbiAgfSxcclxuICBvcHRpbWl6ZURlcHM6IHtcclxuICAgIGluY2x1ZGU6IFtcclxuICAgICAgJ3JlYWN0JyxcclxuICAgICAgJ3JlYWN0LWRvbScsXHJcbiAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcclxuICAgICAgJ2ZyYW1lci1tb3Rpb24nLFxyXG4gICAgXSxcclxuICAgIGV4Y2x1ZGU6IFtdLFxyXG4gIH0sXHJcbiAgfTtcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMmIsU0FBUyxvQkFBb0I7QUFDeGQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGFBQWE7QUFKcEIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTSxjQUFjLG9CQUFJLElBQXNCO0FBQzlDLFNBQVMsY0FBYyxJQUFZLGNBQWMsR0FBRyxXQUFXLEtBQVE7QUFDckUsUUFBTSxNQUFNLEtBQUssSUFBSTtBQUNyQixRQUFNLE1BQU0sWUFBWSxJQUFJLEVBQUUsS0FBSyxDQUFDO0FBQ3BDLFFBQU0sU0FBUyxJQUFJLE9BQU8sQ0FBQyxNQUFNLE1BQU0sSUFBSSxRQUFRO0FBQ25ELE1BQUksT0FBTyxVQUFVLFlBQWEsUUFBTztBQUN6QyxTQUFPLEtBQUssR0FBRztBQUNmLGNBQVksSUFBSSxJQUFJLE1BQU07QUFDMUIsU0FBTztBQUNUO0FBR0EsSUFBTSxjQUFjLFdBQVcsZ0JBQWdCO0FBQUEsRUFDN0MsU0FBUztBQUFBLEVBQ1QsTUFBTTtBQUFBLElBQ0osTUFBTSxRQUFRLElBQUksYUFBYTtBQUFBLElBQy9CLE1BQU0sUUFBUSxJQUFJLGFBQWE7QUFBQSxFQUNqQztBQUNGLENBQUM7QUFFRCxlQUFlLGlCQUFpQixLQUFVLEtBQVU7QUFDbEQsUUFBTSxTQUFTLElBQUksVUFBVTtBQUM3QixNQUFJLFdBQVcsUUFBUTtBQUNyQixRQUFJLGFBQWE7QUFDakIsUUFBSSxVQUFVLGdCQUFnQixrQkFBa0I7QUFDaEQsUUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFLE9BQU8scUJBQXFCLENBQUMsQ0FBQztBQUN2RDtBQUFBLEVBQ0Y7QUFFQSxRQUFNLEtBQU0sSUFBSSxRQUFRLGlCQUFpQixLQUFnQixJQUFJLFFBQVEsaUJBQWlCO0FBQ3RGLE1BQUksY0FBYyxFQUFFLEdBQUc7QUFDckIsUUFBSSxhQUFhO0FBQ2pCLFFBQUksVUFBVSxnQkFBZ0Isa0JBQWtCO0FBQ2hELFFBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxPQUFPLDZDQUE2QyxDQUFDLENBQUM7QUFDL0U7QUFBQSxFQUNGO0FBRUEsTUFBSSxDQUFDLFFBQVEsSUFBSSxhQUFhLENBQUMsUUFBUSxJQUFJLFdBQVc7QUFDcEQsUUFBSSxhQUFhO0FBQ2pCLFFBQUksVUFBVSxnQkFBZ0Isa0JBQWtCO0FBQ2hELFFBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxPQUFPLDZEQUE2RCxDQUFDLENBQUM7QUFDL0Y7QUFBQSxFQUNGO0FBRUEsTUFBSTtBQUNGLFVBQU0sU0FBbUIsQ0FBQztBQUMxQixVQUFNLElBQUksUUFBYyxDQUFDLFNBQVMsV0FBVztBQUMzQyxVQUFJLEdBQUcsUUFBUSxDQUFDLE1BQWMsT0FBTyxLQUFLLENBQUMsQ0FBQztBQUM1QyxVQUFJLEdBQUcsT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUM3QixVQUFJLEdBQUcsU0FBUyxDQUFDLFFBQWlCLE9BQU8sR0FBRyxDQUFDO0FBQUEsSUFDL0MsQ0FBQztBQUNELFVBQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxFQUFFLFNBQVMsTUFBTTtBQUNqRCxVQUFNLE9BQU8sTUFBTSxLQUFLLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFFdEMsVUFBTSxFQUFFLFdBQVcsVUFBVSxPQUFPLFNBQVMsUUFBUSxJQUFJLFFBQVEsQ0FBQztBQUVsRSxRQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUztBQUNqRCxVQUFJLGFBQWE7QUFDakIsVUFBSSxVQUFVLGdCQUFnQixrQkFBa0I7QUFDaEQsVUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFLE9BQU8sK0RBQStELENBQUMsQ0FBQztBQUNqRztBQUFBLElBQ0Y7QUFFQSxVQUFNLHFCQUFxQixPQUFPLFNBQVMsRUFBRSxNQUFNLEdBQUcsR0FBRztBQUN6RCxVQUFNLG9CQUFvQixPQUFPLFFBQVEsRUFBRSxNQUFNLEdBQUcsR0FBRztBQUN2RCxVQUFNLGlCQUFpQixPQUFPLEtBQUssRUFBRSxNQUFNLEdBQUcsR0FBRztBQUNqRCxVQUFNLG1CQUFtQixPQUFPLE9BQU8sRUFBRSxNQUFNLEdBQUcsR0FBSTtBQUN0RCxVQUFNLG1CQUFtQixVQUFVLE9BQU8sT0FBTyxFQUFFLE1BQU0sR0FBRyxHQUFHLElBQUk7QUFDbkUsVUFBTSxXQUFXLEdBQUcsa0JBQWtCLElBQUksaUJBQWlCO0FBRTNELFVBQU0sY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9GQU80RCxRQUFRO0FBQUE7QUFBQSxnQ0FFNUQsY0FBYyxvREFBb0QsY0FBYztBQUFBO0FBQUEsY0FFbEcsbUJBQW1CLDJFQUEyRSxnQkFBZ0IsU0FBUyxFQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQU1ySCxnQkFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFPZCxvQkFBSSxLQUFLLEdBQUUsZUFBZSxPQUFPLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1sRCxVQUFNLFlBQVksTUFBTSxZQUFZLFNBQVM7QUFBQSxNQUMzQyxNQUFNLFFBQVEsSUFBSTtBQUFBLE1BQ2xCLElBQUk7QUFBQSxNQUNKLFNBQVMsb0JBQW9CLGdDQUFnQyxRQUFRO0FBQUEsTUFDckUsTUFBTTtBQUFBLE1BQ04sTUFBTSxRQUFRLFFBQVE7QUFBQSxTQUNuQixjQUFjO0FBQUEsRUFDckIsbUJBQW1CLFVBQVUsZ0JBQWdCO0FBQUEsSUFDM0MsRUFBRTtBQUFBO0FBQUEsRUFFSixnQkFBZ0I7QUFBQSxJQUNkLENBQUM7QUFFRCxRQUFJO0FBQ0YsWUFBTSxtQkFBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxnRUFJaUMsa0JBQWtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZ0I1RSxZQUFNLFlBQVksU0FBUztBQUFBLFFBQ3pCLE1BQU0sUUFBUSxJQUFJO0FBQUEsUUFDbEIsSUFBSTtBQUFBLFFBQ0osU0FBUztBQUFBLFFBQ1QsTUFBTTtBQUFBLE1BQ1IsQ0FBQztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQUM7QUFFVCxRQUFJLGFBQWE7QUFDakIsUUFBSSxVQUFVLGdCQUFnQixrQkFBa0I7QUFDaEQsUUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFLFNBQVMsTUFBTSxTQUFTLGdDQUFnQyxVQUFVLFNBQVMsSUFBSSxDQUFDLENBQUM7QUFBQSxFQUM1RyxTQUFTLEtBQVU7QUFDakIsVUFBTSxNQUFNLEtBQUssV0FBVztBQUM1QixRQUFJLGFBQWE7QUFDakIsUUFBSSxVQUFVLGdCQUFnQixrQkFBa0I7QUFDaEQsUUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUM7QUFBQSxFQUN4QztBQUNGO0FBRUEsSUFBTSxtQkFBbUIsT0FBTztBQUFBLEVBQzlCLE1BQU07QUFBQSxFQUNOLGdCQUFnQixRQUFhO0FBQzNCLFdBQU8sWUFBWSxJQUFJLGdCQUFnQixDQUFDLEtBQVUsUUFBYTtBQUM3RCx1QkFBaUIsS0FBSyxHQUFHO0FBQUEsSUFDM0IsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLHVCQUF1QixRQUFhO0FBQ2xDLFdBQU8sWUFBWSxJQUFJLGdCQUFnQixDQUFDLEtBQVUsUUFBYTtBQUM3RCx1QkFBaUIsS0FBSyxHQUFHO0FBQUEsSUFDM0IsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQUlBLElBQU8sc0JBQVEsYUFBYSxZQUFpQztBQUMzRCxNQUFJLGFBQXVCLENBQUM7QUFDNUIsTUFBSSxZQUFzQixDQUFDO0FBQzNCLE1BQUk7QUFDRixVQUFNLENBQUMsVUFBVSxPQUFPLElBQUksTUFBTSxRQUFRLElBQUk7QUFBQSxNQUM1QyxNQUFNLGdFQUFnRTtBQUFBLFFBQ3BFLFNBQVMsRUFBRSxVQUFVLG1CQUFtQjtBQUFBLE1BQzFDLENBQUM7QUFBQSxNQUNELE1BQU0sK0RBQStEO0FBQUEsUUFDbkUsU0FBUyxFQUFFLFVBQVUsbUJBQW1CO0FBQUEsTUFDMUMsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUNELFFBQUksU0FBUyxJQUFJO0FBQ2YsWUFBTSxRQUFTLE1BQU0sU0FBUyxLQUFLO0FBQ25DLFVBQUksTUFBTSxRQUFRLEtBQUssR0FBRztBQUN4QixxQkFBYSxNQUFNLElBQUksQ0FBQyxTQUFTLFNBQVMsS0FBSyxJQUFJLEVBQUU7QUFBQSxNQUN2RDtBQUFBLElBQ0Y7QUFDQSxRQUFJLFFBQVEsSUFBSTtBQUNkLFlBQU0sT0FBUSxNQUFNLFFBQVEsS0FBSztBQUNqQyxVQUFJLE1BQU0sUUFBUSxJQUFJLEdBQUc7QUFDdkIsb0JBQVksS0FBSyxJQUFJLENBQUMsUUFBUSxhQUFhLElBQUksSUFBSSxFQUFFO0FBQUEsTUFDdkQ7QUFBQSxJQUNGO0FBQUEsRUFDRixTQUFTLE9BQU87QUFDZCxZQUFRLE1BQU0sb0RBQW9ELEtBQUs7QUFBQSxFQUN6RTtBQUVBLFFBQU0saUJBQWlCLENBQUMsZUFBZSxrQkFBa0IsV0FBVyxVQUFVLFNBQVMsUUFBUSxTQUFTO0FBQ3hHLFFBQU0saUJBQWlCLGVBQWUsSUFBSSxVQUFRLDZCQUE2QixJQUFJLEVBQUU7QUFFckYsU0FBTztBQUFBLElBQ1AsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLGlCQUFpQjtBQUFBLE1BQ2pCLFFBQVE7QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLGVBQWU7QUFBQSxVQUNiO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsR0FBRztBQUFBLFVBQ0gsR0FBRztBQUFBLFVBQ0gsR0FBRztBQUFBLFFBQ0w7QUFBQSxRQUNBLG1CQUFtQjtBQUFBLE1BQ3JCLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDdEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixjQUFjO0FBQUEsWUFDWixnQkFBZ0IsQ0FBQyxTQUFTLGFBQWEsa0JBQWtCO0FBQUEsWUFDekQsYUFBYTtBQUFBLGNBQ1g7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFlBQ0Esb0JBQW9CLENBQUMsaUJBQWlCLE1BQU07QUFBQSxVQUM5QztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSx1QkFBdUI7QUFBQSxNQUN2QixRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsTUFBTSxDQUFDLFdBQVcsVUFBVTtBQUFBLElBQzlCO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDWixTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVMsQ0FBQztBQUFBLElBQ1o7QUFBQSxFQUNBO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
