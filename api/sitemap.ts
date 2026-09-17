export const config = {
  runtime: 'edge',
};

export default async function handler() {
  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/ia-automatisation', priority: '0.8', changefreq: 'weekly' },
    { url: '/services/sites-app-web', priority: '0.8', changefreq: 'weekly' },
    { url: '/services/branding', priority: '0.8', changefreq: 'weekly' },
    { url: '/realisations', priority: '0.8', changefreq: 'weekly' },
    { url: '/realisations/amisi-sarl', priority: '0.7', changefreq: 'monthly' },
    { url: '/realisations/automatisation-blog-seo', priority: '0.7', changefreq: 'monthly' },
    { url: '/a-propos', priority: '0.7', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/contact', priority: '0.8', changefreq: 'weekly' },
    { url: '/politique-confidentialite', priority: '0.5', changefreq: 'monthly' },
  ];

  const localHubCities = ['ouagadougou', 'bobo-dioulasso', 'abidjan', 'bamako', 'dakar', 'lome', 'cotonou'];
  const localHubRoutes = localHubCities.map(city => ({
    url: `/agence-ia-automatisation/${city}`,
    priority: '0.7',
    changefreq: 'weekly'
  }));

  const routes = [...staticRoutes, ...localHubRoutes];
  const currentDate = new Date().toISOString();

  let blogUrls: Array<{ url: string; lastmod: string; priority: string; changefreq: string }> = [];
  try {
    let page = 1;
    let hasMore = true;
    while (hasMore && page <= 5) {
      const res = await fetch(`https://blog.binkoo.digital/wp-json/wp/v2/posts?per_page=100&page=${page}&_fields=slug,modified_gmt,modified`);
      if (!res.ok) {
        hasMore = false;
        break;
      }
      const posts = await res.json();
      if (!Array.isArray(posts) || posts.length === 0) {
        hasMore = false;
      } else {
        posts.forEach((p: any) => {
          let lastmod = currentDate;
          if (p.modified_gmt) {
            lastmod = p.modified_gmt.endsWith('Z') ? p.modified_gmt : `${p.modified_gmt}Z`;
          } else if (p.modified) {
            lastmod = p.modified.endsWith('Z') ? p.modified : `${p.modified}Z`;
          }
          blogUrls.push({
            url: `/blog/${p.slug}`,
            lastmod: lastmod,
            priority: '0.8',
            changefreq: 'weekly'
          });
        });
        if (posts.length < 100) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }
  } catch (e) {
    console.error("Error fetching dynamic sitemap posts:", e);
  }

  const sitemapUrls = [
    ...routes.map(r => `  <url>
    <loc>https://binkoo.digital${r.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`),
    ...blogUrls.map(r => `  <url>
    <loc>https://binkoo.digital${r.url}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`)
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
    }
  });
}
