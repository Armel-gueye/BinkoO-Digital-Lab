export const config = {
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
  'archive.org_bot',
];

// Metas statiques pour l'ensemble des pages du site
const STATIC_PAGE_METAS: Record<string, { title: string; description: string; canonical: string }> = {
  '/': {
    title: "BinkoO Digital Lab - Agence Digitale et d'Intelligence Artificielle",
    description:
      "Votre partenaire digital pour l'IA, l'automatisation, le design et le développement web au Burkina Faso. Solutions innovantes et créatives.",
    canonical: 'https://binkoo.digital',
  },
  '/services': {
    title: 'Nos Services - BinkoO Digital Lab',
    description:
      "Découvrez nos services : IA & automatisation, création de sites web, design & branding. BinkoO Digital Lab, l'agence digitale au Burkina Faso.",
    canonical: 'https://binkoo.digital/services',
  },
  '/services/ia-automatisation': {
    title: 'IA & Automatisation des Processus Métier - BinkoO Digital Lab',
    description:
      "Automatisez vos processus d'entreprise avec l'IA et le No-Code au Burkina Faso et en Afrique. Gains de temps et réduction des coûts garantis.",
    canonical: 'https://binkoo.digital/services/ia-automatisation',
  },
  '/services/sites-app-web': {
    title: 'Création de Sites Web & Applications - BinkoO Digital Lab',
    description:
      "Développement de sites vitrines, e-commerce et applications web sur-mesure, performants et optimisés pour le référencement SEO.",
    canonical: 'https://binkoo.digital/services/sites-app-web',
  },
  '/services/branding': {
    title: 'Design & Branding - BinkoO Digital Lab',
    description:
      "Création d'identités visuelles percutantes, chartes graphiques, logos et UI/UX design pour valoriser votre marque.",
    canonical: 'https://binkoo.digital/services/branding',
  },
  '/a-propos': {
    title: 'À Propos - BinkoO Digital Lab',
    description:
      "Qui sommes-nous ? BinkoO Digital Lab, agence digitale spécialisée en IA et automatisation au Burkina Faso. Découvrez notre mission et notre équipe.",
    canonical: 'https://binkoo.digital/a-propos',
  },
  '/blog': {
    title: 'Blog - BinkoO Digital Lab',
    description:
      "Actualités, conseils et ressources sur l'IA, l'automatisation et le digital en Afrique de l'Ouest. Le blog de BinkoO Digital Lab.",
    canonical: 'https://binkoo.digital/blog',
  },
  '/realisations': {
    title: 'Nos Réalisations - BinkoO Digital Lab',
    description:
      'Découvrez nos projets : sites web, applications, automatisations et solutions IA réalisés pour nos clients au Burkina Faso et en Afrique.',
    canonical: 'https://binkoo.digital/realisations',
  },
  '/realisations/amisi-sarl': {
    title: 'Étude de cas : AMISI SARL - BinkoO Digital Lab',
    description:
      "Comment nous avons conçu la plateforme web et l'image de marque d'AMISI SARL, leader des services professionnels.",
    canonical: 'https://binkoo.digital/realisations/amisi-sarl',
  },
  '/realisations/automatisation-blog-seo': {
    title: 'Étude de cas : Automatisation Blog & SEO - BinkoO Digital Lab',
    description:
      "Mise en place d'un pipeline automatisé de production et d'optimisation SEO de contenu avec IA et Make/n8n.",
    canonical: 'https://binkoo.digital/realisations/automatisation-blog-seo',
  },
  '/contact': {
    title: 'Contact - BinkoO Digital Lab',
    description:
      "Contactez BinkoO Digital Lab pour vos projets digitaux au Burkina Faso. IA, automatisation, développement web et design. Réponse rapide garantie.",
    canonical: 'https://binkoo.digital/contact',
  },
  '/politique-confidentialite': {
    title: 'Politique de Confidentialité - BinkoO Digital Lab',
    description:
      "Politique de confidentialité et protection des données personnelles de BinkoO Digital Lab.",
    canonical: 'https://binkoo.digital/politique-confidentialite',
  },
};

const DEFAULT_IMAGE =
  'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/BinkoO-Digital-Lab-PNG-1760749121547.png';

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

/**
 * Construit le bloc de balises méta SEO/OG à injecter dans le <head>
 */
function buildMetaTags(opts: {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type?: string;
}): string {
  const { title, description, canonical, image, type = 'website' } = opts;
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeImage = escapeHtml(image);
  const safeCanonical = escapeHtml(canonical);

  return `
    <!-- Balises injectées par BinkoO Edge pour robots / crawlers SEO -->
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDesc}">
    <link rel="canonical" href="${safeCanonical}">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDesc}">
    <meta property="og:image" content="${safeImage}">
    <meta property="og:url" content="${safeCanonical}">
    <meta property="og:type" content="${type}">
    <meta property="og:site_name" content="BinkoO Digital Lab">
    <meta property="og:locale" content="fr_FR">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${safeTitle}">
    <meta name="twitter:description" content="${safeDesc}">
    <meta name="twitter:image" content="${safeImage}">
`;
}

/**
 * Injecte les metaTags dans le <head> du HTML de base
 */
function injectMeta(baseHtml: string, metaTags: string): string {
  let html = baseHtml;
  // Supprimer les balises par défaut
  html = html.replace(/<title>[\s\S]*?<\/title>/i, '');
  html = html.replace(/<meta\s+name="description"[\s\S]*?>/i, '');
  html = html.replace(/<link\s+rel="canonical"[\s\S]*?>/i, '');
  // Injection avant </head>
  if (html.includes('</head>')) {
    html = html.replace('</head>', `${metaTags}\n</head>`);
  } else {
    html = metaTags + html;
  }
  return html;
}

export default async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

  // 1. Détection des robots/crawlers
  const isBot = BOT_USER_AGENTS.some((bot) => userAgent.includes(bot));

  // Récupérer le chemin depuis le paramètre `path` (transmis par vercel.json) ou depuis l'URL
  const rawPath = url.searchParams.get('path') ?? '';
  // rawPath est vide pour la route racine "/"
  const pathname = rawPath === '' ? '/' : rawPath.startsWith('/') ? rawPath : `/${rawPath}`;

  // 2. Si ce n'est pas un bot (accès direct involontaire) — servir index.html
  if (!isBot) {
    try {
      const indexRes = await fetch(new URL('/index.html', url.origin), { redirect: 'follow' });
      return new Response(indexRes.body, {
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8' },
      });
    } catch {
      return new Response('OK', { status: 200 });
    }
  }

  // 3. Charger le index.html de base
  let baseHtml = '';
  try {
    const indexRes = await fetch(new URL('/index.html', url.origin), { redirect: 'follow' });
    if (indexRes.ok) {
      baseHtml = await indexRes.text();
    }
  } catch (e) {
    console.error('Erreur chargement index.html:', e);
  }

  if (!baseHtml) {
    baseHtml = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
  <div id="root"></div>
</body>
</html>`;
  }

  // 4. Cas 1 : Page d'article de blog /blog/[slug]
  const blogMatch = pathname.match(/^\/blog\/([^/?#]+)/);
  if (blogMatch && blogMatch[1] !== 'tag') {
    const slug = blogMatch[1];
    const canonicalUrl = `https://binkoo.digital/blog/${slug}`;

    try {
      const wpRes = await fetch(
        `https://blog.binkoo.digital/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_fields=title,excerpt,featured_media,_embedded&_embed`,
        { headers: { Accept: 'application/json' } }
      );

      if (wpRes.ok) {
        const posts = await wpRes.json();
        if (Array.isArray(posts) && posts.length > 0) {
          const post = posts[0];
          const titleText = cleanText(post?.title?.rendered || '') || 'Article de Blog';
          const descText =
            cleanText(post?.excerpt?.rendered || '') || 'Découvrez cet article sur BinkoO Digital Lab.';
          const media = post?._embedded?.['wp:featuredmedia']?.[0];
          const imageUrl =
            media?.source_url || media?.media_details?.sizes?.large?.source_url || DEFAULT_IMAGE;

          const metaTags = buildMetaTags({
            title: titleText,
            description: descText,
            canonical: canonicalUrl,
            image: imageUrl,
            type: 'article',
          });

          return new Response(injectMeta(baseHtml, metaTags), {
            status: 200,
            headers: {
              'content-type': 'text/html; charset=utf-8',
              'cache-control': 'public, max-age=3600, s-maxage=3600',
            },
          });
        }
      }
    } catch (err) {
      console.error('Erreur WordPress API:', err);
    }

    // Fallback blog : metas génériques blog
    const metaTags = buildMetaTags({
      title: 'Article - BinkoO Digital Lab',
      description: "Découvrez cet article sur BinkoO Digital Lab, l'agence digitale au Burkina Faso.",
      canonical: canonicalUrl,
      image: DEFAULT_IMAGE,
      type: 'article',
    });

    return new Response(injectMeta(baseHtml, metaTags), {
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  }

  // 5. Cas 2 : Hub local /agence-ia-automatisation/:city
  const hubMatch = pathname.match(/^\/agence-ia-automatisation\/([^/?#]+)/);
  if (hubMatch) {
    const rawCity = hubMatch[1];
    const formattedCity = rawCity.charAt(0).toUpperCase() + rawCity.slice(1).replace('-', ' ');
    const canonicalUrl = `https://binkoo.digital/agence-ia-automatisation/${rawCity}`;
    const metaTags = buildMetaTags({
      title: `Agence IA & Automatisation à ${formattedCity} - BinkoO Digital Lab`,
      description: `Découvrez nos solutions d'intelligence artificielle et d'automatisation des processus métier à ${formattedCity}. Accompagnement sur-mesure pour entreprises.`,
      canonical: canonicalUrl,
      image: DEFAULT_IMAGE,
    });

    return new Response(injectMeta(baseHtml, metaTags), {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  }

  // 6. Cas 3 : Page statique connue (/services, /contact, etc.) ou accueil
  // Nettoyer les trailing slashes éventuels pour la correspondance
  const cleanPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const staticMeta = STATIC_PAGE_METAS[cleanPath] || STATIC_PAGE_METAS['/'];
  const metaTags = buildMetaTags({
    title: staticMeta.title,
    description: staticMeta.description,
    canonical: staticMeta.canonical,
    image: DEFAULT_IMAGE,
  });

  return new Response(injectMeta(baseHtml, metaTags), {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
