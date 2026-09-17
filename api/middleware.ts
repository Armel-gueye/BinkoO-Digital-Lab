export const config = {
  matcher: ['/blog/:slug+'],
  runtime: 'edge',
};

const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'sogou',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot',
  'discordbot',
  'applebot',
  'perplexitybot',
  'claudebot',
  'gptbot',
  'rogerbot',
  'embedly',
  'quora',
  'pinterest',
  'ia_archiver',
  'archive.org_bot'
];

/**
 * Nettoie le texte HTML et les entités
 */
function cleanText(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&hellip;/g, '...')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Échappe les caractères spéciaux pour injection dans les attributs HTML
 */
function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

  // 1. Détection des robots/crawlers
  const isBot = BOT_USER_AGENTS.some((bot) => userAgent.includes(bot));

  // Extraction du slug d'article
  let slug = url.searchParams.get('slug');
  if (!slug) {
    const match = url.pathname.match(/^\/blog\/([^/?#]+)/);
    slug = match ? match[1] : null;
  }

  // 4. Si ce n'est pas un bot ou s'il n'y a pas de slug d'article (ex: page d'accueil /blog)
  if (!isBot || !slug) {
    const indexRes = await fetch(new URL('/index.html', url.origin));
    return new Response(indexRes.body, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
    });
  }

  // 2. Traitement pour les bots sur /blog/[slug]
  const canonicalUrl = `https://binkoo.digital/blog/${slug}`;
  let baseHtml = '';

  try {
    const indexRes = await fetch(new URL('/index.html', url.origin));
    if (indexRes.ok) {
      baseHtml = await indexRes.text();
    }
  } catch (e) {
    console.error('Erreur chargement index.html:', e);
  }

  try {
    // Appel WordPress REST API
    const wpRes = await fetch(
      `https://blog.binkoo.digital/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_fields=title,excerpt,featured_media,_embedded&_embed`,
      {
        headers: { Accept: 'application/json' },
      }
    );

    if (!wpRes.ok) {
      // Si WordPress ne répond pas ou erreur HTTP, retour normal à React
      return new Response(baseHtml, {
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8' },
      });
    }

    const posts = await wpRes.json();
    if (!Array.isArray(posts) || posts.length === 0) {
      // Si article non trouvé, retour normal à React
      return new Response(baseHtml, {
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8' },
      });
    }

    const post = posts[0];
    const rawTitle = post?.title?.rendered || '';
    const rawExcerpt = post?.excerpt?.rendered || '';

    // Extraction et nettoyage des métadonnées
    const titleText = cleanText(rawTitle) || 'Article de Blog';
    const descText = cleanText(rawExcerpt) || 'Découvrez cet article sur BinkoO Digital Lab.';

    // Extraction de l'image mise en avant
    const media = post?._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl =
      media?.source_url ||
      media?.media_details?.sizes?.large?.source_url ||
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/BinkoO-Digital-Lab-PNG-1760749121547.png';

    const safeTitle = escapeHtml(titleText);
    const safeDesc = escapeHtml(descText);
    const safeImage = escapeHtml(imageUrl);
    const safeCanonical = escapeHtml(canonicalUrl);

    // Balises SEO & Open Graph pré-générées pour les robots
    const metaTags = `
    <!-- Balises injectées par Vercel Edge Middleware pour bots -->
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDesc}">
    <link rel="canonical" href="${safeCanonical}">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDesc}">
    <meta property="og:image" content="${safeImage}">
    <meta property="og:url" content="${safeCanonical}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="BinkoO Digital Lab">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${safeTitle}">
    <meta name="twitter:description" content="${safeDesc}">
    <meta name="twitter:image" content="${safeImage}">
`;

    let modifiedHtml = baseHtml;

    // Remplacement du <title> et <meta name="description"> par défaut
    modifiedHtml = modifiedHtml.replace(/<title>[\s\S]*?<\/title>/i, '');
    modifiedHtml = modifiedHtml.replace(/<meta\s+name="description"[\s\S]*?>/i, '');

    // Injection avant </head>
    if (modifiedHtml.includes('</head>')) {
      modifiedHtml = modifiedHtml.replace('</head>', `${metaTags}\n</head>`);
    } else {
      modifiedHtml = metaTags + modifiedHtml;
    }

    return new Response(modifiedHtml, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (err) {
    console.error('Erreur Vercel Edge Middleware:', err);
    return new Response(baseHtml, {
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  }
}
