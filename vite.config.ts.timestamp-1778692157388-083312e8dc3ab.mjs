// vite.config.ts
import { defineConfig } from "file:///C:/Users/mrgue/OneDrive/Documents/GitHub/BDL%20website/BinkoO-Digital-Lab/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/mrgue/OneDrive/Documents/GitHub/BDL%20website/BinkoO-Digital-Lab/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import nodemailer from "file:///C:/Users/mrgue/OneDrive/Documents/GitHub/BDL%20website/BinkoO-Digital-Lab/node_modules/nodemailer/lib/nodemailer.js";
import Sitemap from "file:///C:/Users/mrgue/OneDrive/Documents/GitHub/BDL%20website/BinkoO-Digital-Lab/node_modules/vite-plugin-sitemap/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\mrgue\\OneDrive\\Documents\\GitHub\\BDL website\\BinkoO-Digital-Lab";
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
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtcmd1ZVxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXEJETCB3ZWJzaXRlXFxcXEJpbmtvTy1EaWdpdGFsLUxhYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbXJndWVcXFxcT25lRHJpdmVcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxCREwgd2Vic2l0ZVxcXFxCaW5rb08tRGlnaXRhbC1MYWJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL21yZ3VlL09uZURyaXZlL0RvY3VtZW50cy9HaXRIdWIvQkRMJTIwd2Vic2l0ZS9CaW5rb08tRGlnaXRhbC1MYWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgbm9kZW1haWxlciBmcm9tIFwibm9kZW1haWxlclwiO1xyXG5pbXBvcnQgU2l0ZW1hcCBmcm9tIFwidml0ZS1wbHVnaW4tc2l0ZW1hcFwiO1xyXG5cclxuLy8gSW4tbWVtb3J5IHJhdGUgbGltaXRlclxyXG5jb25zdCByZXF1ZXN0c01hcCA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXJbXT4oKTtcclxuZnVuY3Rpb24gaXNSYXRlTGltaXRlZChpcDogc3RyaW5nLCBtYXhSZXF1ZXN0cyA9IDUsIHdpbmRvd01zID0gNjBfMDAwKSB7XHJcbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcclxuICBjb25zdCBhcnIgPSByZXF1ZXN0c01hcC5nZXQoaXApIHx8IFtdO1xyXG4gIGNvbnN0IHJlY2VudCA9IGFyci5maWx0ZXIoKHQpID0+IG5vdyAtIHQgPCB3aW5kb3dNcyk7XHJcbiAgaWYgKHJlY2VudC5sZW5ndGggPj0gbWF4UmVxdWVzdHMpIHJldHVybiB0cnVlO1xyXG4gIHJlY2VudC5wdXNoKG5vdyk7XHJcbiAgcmVxdWVzdHNNYXAuc2V0KGlwLCByZWNlbnQpO1xyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuLy8gU2hhcmVkIG1haWwgdHJhbnNwb3J0ZXIgZm9yIGRldi9wcmV2aWV3XHJcbmNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gIHNlcnZpY2U6IFwiZ21haWxcIixcclxuICBhdXRoOiB7XHJcbiAgICB1c2VyOiBwcm9jZXNzLmVudi5TTVRQX1VTRVIgfHwgXCJcIixcclxuICAgIHBhc3M6IHByb2Nlc3MuZW52LlNNVFBfUEFTUyB8fCBcIlwiLFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ29udGFjdEFwaShyZXE6IGFueSwgcmVzOiBhbnkpIHtcclxuICBjb25zdCBtZXRob2QgPSByZXEubWV0aG9kIHx8IFwiR0VUXCI7XHJcbiAgaWYgKG1ldGhvZCAhPT0gXCJQT1NUXCIpIHtcclxuICAgIHJlcy5zdGF0dXNDb2RlID0gNDA1O1xyXG4gICAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IFwiTWV0aG9kIG5vdCBhbGxvd2VkXCIgfSkpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaXAgPSAocmVxLmhlYWRlcnNbXCJ4LWZvcndhcmRlZC1mb3JcIl0gYXMgc3RyaW5nKSB8fCByZXEuc29ja2V0Py5yZW1vdGVBZGRyZXNzIHx8IFwidW5rbm93blwiO1xyXG4gIGlmIChpc1JhdGVMaW1pdGVkKGlwKSkge1xyXG4gICAgcmVzLnN0YXR1c0NvZGUgPSA0Mjk7XHJcbiAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogXCJUb28gbWFueSByZXF1ZXN0cy4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci5cIiB9KSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBpZiAoIXByb2Nlc3MuZW52LlNNVFBfVVNFUiB8fCAhcHJvY2Vzcy5lbnYuU01UUF9QQVNTKSB7XHJcbiAgICByZXMuc3RhdHVzQ29kZSA9IDUwMDtcclxuICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBcIkVtYWlsIHNlcnZpY2Ugbm90IGNvbmZpZ3VyZWQuIE1pc3NpbmcgU01UUF9VU0VSL1NNVFBfUEFTUy5cIiB9KSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgY2h1bmtzOiBCdWZmZXJbXSA9IFtdO1xyXG4gICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICByZXEub24oXCJkYXRhXCIsIChjOiBCdWZmZXIpID0+IGNodW5rcy5wdXNoKGMpKTtcclxuICAgICAgcmVxLm9uKFwiZW5kXCIsICgpID0+IHJlc29sdmUoKSk7XHJcbiAgICAgIHJlcS5vbihcImVycm9yXCIsIChlcnI6IHVua25vd24pID0+IHJlamVjdChlcnIpKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgcmF3ID0gQnVmZmVyLmNvbmNhdChjaHVua3MpLnRvU3RyaW5nKFwidXRmOFwiKTtcclxuICAgIGNvbnN0IGJvZHkgPSByYXcgPyBKU09OLnBhcnNlKHJhdykgOiB7fTtcclxuXHJcbiAgICBjb25zdCB7IGZpcnN0bmFtZSwgbGFzdG5hbWUsIGVtYWlsLCBzdWJqZWN0LCBtZXNzYWdlIH0gPSBib2R5IHx8IHt9O1xyXG5cclxuICAgIGlmICghZmlyc3RuYW1lIHx8ICFsYXN0bmFtZSB8fCAhZW1haWwgfHwgIW1lc3NhZ2UpIHtcclxuICAgICAgcmVzLnN0YXR1c0NvZGUgPSA0MDA7XHJcbiAgICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IFwiTWlzc2luZyByZXF1aXJlZCBmaWVsZHM6IGZpcnN0bmFtZSwgbGFzdG5hbWUsIGVtYWlsLCBtZXNzYWdlXCIgfSkpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2FuaXRpemVkRmlyc3RuYW1lID0gU3RyaW5nKGZpcnN0bmFtZSkuc2xpY2UoMCwgMTAwKTtcclxuICAgIGNvbnN0IHNhbml0aXplZExhc3RuYW1lID0gU3RyaW5nKGxhc3RuYW1lKS5zbGljZSgwLCAxMDApO1xyXG4gICAgY29uc3Qgc2FuaXRpemVkRW1haWwgPSBTdHJpbmcoZW1haWwpLnNsaWNlKDAsIDI1NSk7XHJcbiAgICBjb25zdCBzYW5pdGl6ZWRNZXNzYWdlID0gU3RyaW5nKG1lc3NhZ2UpLnNsaWNlKDAsIDUwMDApO1xyXG4gICAgY29uc3Qgc2FuaXRpemVkU3ViamVjdCA9IHN1YmplY3QgPyBTdHJpbmcoc3ViamVjdCkuc2xpY2UoMCwgMjAwKSA6IFwiXCI7XHJcbiAgICBjb25zdCBmdWxsTmFtZSA9IGAke3Nhbml0aXplZEZpcnN0bmFtZX0gJHtzYW5pdGl6ZWRMYXN0bmFtZX1gO1xyXG5cclxuICAgIGNvbnN0IGh0bWxDb250ZW50ID0gYFxyXG4gICAgICA8ZGl2IHN0eWxlPVwiZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmOyBtYXgtd2lkdGg6IDYwMHB4OyBtYXJnaW46IDAgYXV0bzsgcGFkZGluZzogMjBweDsgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTtcIj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjsgcGFkZGluZzogMzBweDsgYm9yZGVyLXJhZGl1czogMTBweDsgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKTtcIj5cclxuICAgICAgICAgIDxoMiBzdHlsZT1cImNvbG9yOiAjRTUwMDJFOyBtYXJnaW4tYm90dG9tOiAyMHB4OyBib3JkZXItYm90dG9tOiAycHggc29saWQgI0U1MDAyRTsgcGFkZGluZy1ib3R0b206IDEwcHg7XCI+XHJcbiAgICAgICAgICAgIE5vdXZlbGxlIERlbWFuZGUgZGUgQ29udGFjdFxyXG4gICAgICAgICAgPC9oMj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAyMHB4O1wiPlxyXG4gICAgICAgICAgICA8cCBzdHlsZT1cIm1hcmdpbjogMTBweCAwO1wiPjxzdHJvbmcgc3R5bGU9XCJjb2xvcjogIzMzMztcIj5Ob206PC9zdHJvbmc+ICR7ZnVsbE5hbWV9PC9wPlxyXG4gICAgICAgICAgICA8cCBzdHlsZT1cIm1hcmdpbjogMTBweCAwO1wiPjxzdHJvbmcgc3R5bGU9XCJjb2xvcjogIzMzMztcIj5FbWFpbDo8L3N0cm9uZz4gXHJcbiAgICAgICAgICAgICAgPGEgaHJlZj1cIm1haWx0bzoke3Nhbml0aXplZEVtYWlsfVwiIHN0eWxlPVwiY29sb3I6ICNFNTAwMkU7IHRleHQtZGVjb3JhdGlvbjogbm9uZTtcIj4ke3Nhbml0aXplZEVtYWlsfTwvYT5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAke3Nhbml0aXplZFN1YmplY3QgPyBgPHAgc3R5bGU9XCJtYXJnaW46IDEwcHggMDtcIj48c3Ryb25nIHN0eWxlPVwiY29sb3I6ICMzMzM7XCI+U3VqZXQ6PC9zdHJvbmc+ICR7c2FuaXRpemVkU3ViamVjdH08L3A+YCA6ICcnfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLXRvcDogMjBweDtcIj5cclxuICAgICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAxMHB4O1wiPjxzdHJvbmcgc3R5bGU9XCJjb2xvcjogIzMzMztcIj5NZXNzYWdlOjwvc3Ryb25nPjwvcD5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7IHBhZGRpbmc6IDIwcHg7IGJvcmRlci1yYWRpdXM6IDVweDsgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjRTUwMDJFO1wiPlxyXG4gICAgICAgICAgICAgIDxwIHN0eWxlPVwid2hpdGUtc3BhY2U6IHByZS13cmFwOyBsaW5lLWhlaWdodDogMS42OyBjb2xvcjogIzU1NTsgbWFyZ2luOiAwO1wiPlxyXG4gICAgICAgICAgICAgICAgJHtzYW5pdGl6ZWRNZXNzYWdlfVxyXG4gICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxociBzdHlsZT1cImJvcmRlcjogbm9uZTsgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7IG1hcmdpbjogMzBweCAwO1wiIC8+XHJcbiAgICAgICAgICA8cCBzdHlsZT1cImZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICM5OTk7IHRleHQtYWxpZ246IGNlbnRlcjsgbWFyZ2luOiAwO1wiPlxyXG4gICAgICAgICAgICBDZSBtZXNzYWdlIGEgXHUwMEU5dFx1MDBFOSBlbnZveVx1MDBFOSBkZXB1aXMgbGUgZm9ybXVsYWlyZSBkZSBjb250YWN0IGRlIEJpbmtvTyBEaWdpdGFsIExhYjxici8+XHJcbiAgICAgICAgICAgIERhdGU6ICR7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygnZnItRlInKX1cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgO1xyXG5cclxuICAgIGNvbnN0IGFkbWluSW5mbyA9IGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKHtcclxuICAgICAgZnJvbTogcHJvY2Vzcy5lbnYuU01UUF9VU0VSLFxyXG4gICAgICB0bzogXCJjb250YWN0QGJpbmtvby5kaWdpdGFsXCIsXHJcbiAgICAgIHN1YmplY3Q6IHNhbml0aXplZFN1YmplY3QgfHwgYE5vdXZlbGxlIGRlbWFuZGUgZGUgY29udGFjdDogJHtmdWxsTmFtZX1gLFxyXG4gICAgICBodG1sOiBodG1sQ29udGVudCxcclxuICAgICAgdGV4dDogYE5vbTogJHtmdWxsTmFtZX1cclxuRW1haWw6ICR7c2FuaXRpemVkRW1haWx9XHJcbiR7c2FuaXRpemVkU3ViamVjdCA/IGBTdWpldDogJHtzYW5pdGl6ZWRTdWJqZWN0fVxyXG5gIDogJyd9XHJcbk1lc3NhZ2U6XHJcbiR7c2FuaXRpemVkTWVzc2FnZX1gLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY29uZmlybWF0aW9uSHRtbCA9IGBcclxuICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmOyBtYXgtd2lkdGg6IDYwMHB4OyBtYXJnaW46IDAgYXV0bzsgcGFkZGluZzogMjBweDsgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTtcIj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmOyBwYWRkaW5nOiAzMHB4OyBib3JkZXItcmFkaXVzOiAxMHB4OyBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpO1wiPlxyXG4gICAgICAgICAgICA8aDIgc3R5bGU9XCJjb2xvcjogI0U1MDAyRTsgbWFyZ2luLWJvdHRvbTogMjBweDtcIj5NZXJjaSBkZSBub3VzIGF2b2lyIGNvbnRhY3RcdTAwRTlzICE8L2gyPlxyXG4gICAgICAgICAgICA8cCBzdHlsZT1cImNvbG9yOiAjMzMzOyBsaW5lLWhlaWdodDogMS42O1wiPkJvbmpvdXIgJHtzYW5pdGl6ZWRGaXJzdG5hbWV9LDwvcD5cclxuICAgICAgICAgICAgPHAgc3R5bGU9XCJjb2xvcjogIzU1NTsgbGluZS1oZWlnaHQ6IDEuNjtcIj5cclxuICAgICAgICAgICAgICBOb3VzIGF2b25zIGJpZW4gcmVcdTAwRTd1IHZvdHJlIG1lc3NhZ2UgZXQgbm91cyB2b3VzIGVuIHJlbWVyY2lvbnMuIE5vdHJlIFx1MDBFOXF1aXBlIHJldmllbmRyYSB2ZXJzIHZvdXMgZGFucyBsZXMgcGx1cyBicmVmcyBkXHUwMEU5bGFpcy5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8cCBzdHlsZT1cImNvbG9yOiAjNTU1OyBsaW5lLWhlaWdodDogMS42O1wiPlxyXG4gICAgICAgICAgICAgIFZvdHJlIGRlbWFuZGUgZXN0IGltcG9ydGFudGUgcG91ciBub3VzIGV0IG5vdXMgbWV0dG9ucyB0b3V0IGVuIFx1MDE1M3V2cmUgcG91ciB2b3VzIHJcdTAwRTlwb25kcmUgcmFwaWRlbWVudC5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLXRvcDogMzBweDsgcGFkZGluZy10b3A6IDIwcHg7IGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGRkO1wiPlxyXG4gICAgICAgICAgICAgIDxwIHN0eWxlPVwiY29sb3I6ICM5OTk7IGZvbnQtc2l6ZTogMTRweDsgbWFyZ2luOiA1cHggMDtcIj5cclxuICAgICAgICAgICAgICAgIDxzdHJvbmc+Qmlua29PIERpZ2l0YWwgTGFiPC9zdHJvbmc+PGJyLz5cclxuICAgICAgICAgICAgICAgIEwnYXV0b21hdGlzYXRpb24gZXN0IG5vdHJlIHBhc3Npb248YnIvPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cInRlbDorMjI2NDQzMjM4NDFcIiBzdHlsZT1cImNvbG9yOiAjRTUwMDJFOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7XCI+KzIyNiA0NCAzMiAzOCA0MTwvYT5cclxuICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YDtcclxuICAgICAgYXdhaXQgdHJhbnNwb3J0ZXIuc2VuZE1haWwoe1xyXG4gICAgICAgIGZyb206IHByb2Nlc3MuZW52LlNNVFBfVVNFUixcclxuICAgICAgICB0bzogc2FuaXRpemVkRW1haWwsXHJcbiAgICAgICAgc3ViamVjdDogXCJDb25maXJtYXRpb24gZGUgclx1MDBFOWNlcHRpb24gLSBCaW5rb08gRGlnaXRhbCBMYWJcIixcclxuICAgICAgICBodG1sOiBjb25maXJtYXRpb25IdG1sLFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2gge31cclxuXHJcbiAgICByZXMuc3RhdHVzQ29kZSA9IDIwMDtcclxuICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IGBFbWFpbCBzZW50IHN1Y2Nlc3NmdWxseSAoSUQ6ICR7YWRtaW5JbmZvLm1lc3NhZ2VJZH0pYCB9KSk7XHJcbiAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcclxuICAgIGNvbnN0IG1zZyA9IGVycj8ubWVzc2FnZSB8fCBcIkludGVybmFsIHNlcnZlciBlcnJvclwiO1xyXG4gICAgcmVzLnN0YXR1c0NvZGUgPSA1MDA7XHJcbiAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogbXNnIH0pKTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGNvbnRhY3RBcGlQbHVnaW4gPSAoKSA9PiAoe1xyXG4gIG5hbWU6IFwiY29udGFjdC1hcGktcGx1Z2luXCIsXHJcbiAgY29uZmlndXJlU2VydmVyKHNlcnZlcjogYW55KSB7XHJcbiAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKFwiL2FwaS9jb250YWN0XCIsIChyZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcclxuICAgICAgaGFuZGxlQ29udGFjdEFwaShyZXEsIHJlcyk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGNvbmZpZ3VyZVByZXZpZXdTZXJ2ZXIoc2VydmVyOiBhbnkpIHtcclxuICAgIHNlcnZlci5taWRkbGV3YXJlcy51c2UoXCIvYXBpL2NvbnRhY3RcIiwgKHJlcTogYW55LCByZXM6IGFueSkgPT4ge1xyXG4gICAgICBoYW5kbGVDb250YWN0QXBpKHJlcSwgcmVzKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoYXN5bmMgKCk6IFByb21pc2U8VXNlckNvbmZpZz4gPT4ge1xyXG4gIGxldCBibG9nUm91dGVzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIGxldCB0YWdSb3V0ZXM6IHN0cmluZ1tdID0gW107XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IFtwb3N0c1JlcywgdGFnc1Jlc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgIGZldGNoKCdodHRwczovL2Jsb2cuYmlua29vLmRpZ2l0YWwvd3AtanNvbi93cC92Mi9wb3N0cz9wZXJfcGFnZT0xMDAnLCB7XHJcbiAgICAgICAgaGVhZGVyczogeyAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nIH1cclxuICAgICAgfSksXHJcbiAgICAgIGZldGNoKCdodHRwczovL2Jsb2cuYmlua29vLmRpZ2l0YWwvd3AtanNvbi93cC92Mi90YWdzP3Blcl9wYWdlPTEwMCcsIHtcclxuICAgICAgICBoZWFkZXJzOiB7ICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicgfVxyXG4gICAgICB9KVxyXG4gICAgXSk7XHJcbiAgICBpZiAocG9zdHNSZXMub2spIHtcclxuICAgICAgY29uc3QgcG9zdHMgPSAoYXdhaXQgcG9zdHNSZXMuanNvbigpKSBhcyBhbnlbXTtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocG9zdHMpKSB7XHJcbiAgICAgICAgYmxvZ1JvdXRlcyA9IHBvc3RzLm1hcCgocG9zdCkgPT4gYC9ibG9nLyR7cG9zdC5zbHVnfWApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFnc1Jlcy5vaykge1xyXG4gICAgICBjb25zdCB0YWdzID0gKGF3YWl0IHRhZ3NSZXMuanNvbigpKSBhcyBhbnlbXTtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFncykpIHtcclxuICAgICAgICB0YWdSb3V0ZXMgPSB0YWdzLm1hcCgodGFnKSA9PiBgL2Jsb2cvdGFnLyR7dGFnLnNsdWd9YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGJsb2cgZGF0YSBmb3Igc2l0ZW1hcCBnZW5lcmF0aW9uOlwiLCBlcnJvcik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogXCI6OlwiLFxyXG4gICAgcG9ydDogMzAwMCxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBjb250YWN0QXBpUGx1Z2luKCksXHJcbiAgICBTaXRlbWFwKHtcclxuICAgICAgaG9zdG5hbWU6ICdodHRwczovL2Jpbmtvby5kaWdpdGFsJyxcclxuICAgICAgZHluYW1pY1JvdXRlczogW1xyXG4gICAgICAgICcvc2VydmljZXMnLFxyXG4gICAgICAgICcvYS1wcm9wb3MnLFxyXG4gICAgICAgICcvc2VydmljZXMvaWEtYXV0b21hdGlzYXRpb24nLFxyXG4gICAgICAgICcvc2VydmljZXMvc2l0ZXMtYXBwLXdlYicsXHJcbiAgICAgICAgJy9zZXJ2aWNlcy9icmFuZGluZycsXHJcbiAgICAgICAgJy9yZWFsaXNhdGlvbnMnLFxyXG4gICAgICAgICcvcmVhbGlzYXRpb25zL2FtaXNpLXNhcmwnLFxyXG4gICAgICAgICcvcmVhbGlzYXRpb25zL2F1dG9tYXRpc2F0aW9uLWJsb2ctc2VvJyxcclxuICAgICAgICAnL2Jsb2cnLFxyXG4gICAgICAgICcvY29udGFjdCcsXHJcbiAgICAgICAgJy9wb2xpdGlxdWUtY29uZmlkZW50aWFsaXRlJyxcclxuICAgICAgICAuLi5ibG9nUm91dGVzLFxyXG4gICAgICAgIC4uLnRhZ1JvdXRlc1xyXG4gICAgICBdLFxyXG4gICAgICBnZW5lcmF0ZVJvYm90c1R4dDogZmFsc2VcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICAndmVuZG9yLXJlYWN0JzogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxyXG4gICAgICAgICAgJ3ZlbmRvci11aSc6IFtcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1kaWFsb2cnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnUnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXNlbGVjdCcsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdGFicycsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdG9hc3QnLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgICd2ZW5kb3ItYW5pbWF0aW9uJzogWydmcmFtZXItbW90aW9uJywgJ2dzYXAnXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcclxuICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxyXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbXHJcbiAgICAgICdyZWFjdCcsXHJcbiAgICAgICdyZWFjdC1kb20nLFxyXG4gICAgICAncmVhY3Qtcm91dGVyLWRvbScsXHJcbiAgICAgICdmcmFtZXItbW90aW9uJyxcclxuICAgIF0sXHJcbiAgICBleGNsdWRlOiBbXSxcclxuICB9LFxyXG4gIH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlaLFNBQVMsb0JBQW9CO0FBQ3RiLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxhQUFhO0FBSnBCLElBQU0sbUNBQW1DO0FBT3pDLElBQU0sY0FBYyxvQkFBSSxJQUFzQjtBQUM5QyxTQUFTLGNBQWMsSUFBWSxjQUFjLEdBQUcsV0FBVyxLQUFRO0FBQ3JFLFFBQU0sTUFBTSxLQUFLLElBQUk7QUFDckIsUUFBTSxNQUFNLFlBQVksSUFBSSxFQUFFLEtBQUssQ0FBQztBQUNwQyxRQUFNLFNBQVMsSUFBSSxPQUFPLENBQUMsTUFBTSxNQUFNLElBQUksUUFBUTtBQUNuRCxNQUFJLE9BQU8sVUFBVSxZQUFhLFFBQU87QUFDekMsU0FBTyxLQUFLLEdBQUc7QUFDZixjQUFZLElBQUksSUFBSSxNQUFNO0FBQzFCLFNBQU87QUFDVDtBQUdBLElBQU0sY0FBYyxXQUFXLGdCQUFnQjtBQUFBLEVBQzdDLFNBQVM7QUFBQSxFQUNULE1BQU07QUFBQSxJQUNKLE1BQU0sUUFBUSxJQUFJLGFB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
