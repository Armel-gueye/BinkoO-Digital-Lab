/**
 * Service Blog - WordPress Headless API
 * 
 * Ce service centralise la logique de récupération des articles
 * depuis l'API REST WordPress (https://blog.binkoo.digital).
 * 
 * API endpoint : /wp-json/wp/v2/posts?_embed
 */

// ============================================
// CONFIGURATION API WORDPRESS
// ============================================

const WP_API_BASE = 'https://blog.binkoo.digital/wp-json/wp/v2';

// ============================================
// INTERFACES - Structure WordPress API
// ============================================

/**
 * Interface compatible avec la structure WordPress REST API
 * Supporte le format natif WordPress avec _embed
 */
export interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  slug: string;
  author: number;
  featured_media: number;
  month?: string;
  readTime?: string;
  image?: string;
  // Données SEO RankMath (si activé via plugin REST Headless)
  rank_math_title?: string;
  rank_math_description?: string;
  rank_math_og_image?: string;
  rank_math_facebook_title?: string;
  rank_math_facebook_description?: string;
  rank_math_facebook_image?: string;
  rank_math_twitter_title?: string;
  rank_math_twitter_description?: string;
  rank_math_twitter_image?: string;
  rank_math_robots?: string[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      media_details?: {
        sizes?: {
          large?: { source_url: string };
          medium_large?: { source_url: string };
          medium?: { source_url: string };
          full?: { source_url: string };
        };
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
  };
}

// ============================================
// HELPERS - Extraction de données
// ============================================

/**
 * Supprime les balises HTML et décode toutes les entités HTML
 * Utilise le DOMParser du navigateur pour un décodage parfait
 */
export const stripHtmlTags = (html: string): string => {
  if (!html) return '';

  // Utiliser DOMParser pour décoder toutes les entités HTML
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent?.trim() || '';
  } catch {
    // Fallback : nettoyage manuel
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&rsquo;/g, '\u2019')
      .replace(/&lsquo;/g, '\u2018')
      .replace(/&rdquo;/g, '\u201D')
      .replace(/&ldquo;/g, '\u201C')
      .replace(/&hellip;/g, '…')
      .replace(/&#8217;/g, '\u2019')
      .replace(/&#8216;/g, '\u2018')
      .replace(/&#8220;/g, '\u201C')
      .replace(/&#8221;/g, '\u201D')
      .replace(/\[&hellip;\]/g, '…')
      .trim();
  }
};

/**
 * Calcule le temps de lecture depuis le contenu HTML
 * Basé sur 200 mots par minute
 */
export const calculateReadTime = (htmlContent: string): string => {
  const text = stripHtmlTags(htmlContent);
  const words = text.split(/\s+/).filter(w => w.length > 0).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
};

/**
 * Extrait le texte depuis une propriété WordPress (rendered ou string)
 */
export const extractText = (field: { rendered: string } | string | undefined): string => {
  if (!field) return '';
  return typeof field === 'string' ? field : field.rendered;
};

/**
 * Récupère l'image featured depuis WordPress via _embedded
 * Utilise l'image large si disponible, sinon full, sinon fallback
 */
export const getFeaturedImage = (article: BlogPost): string => {
  const media = article._embedded?.['wp:featuredmedia']?.[0];
  if (media) {
    // Priorité : large > medium_large > full > source_url
    const sizes = media.media_details?.sizes;
    return sizes?.large?.source_url
      || sizes?.medium_large?.source_url
      || sizes?.full?.source_url
      || media.source_url;
  }
  return article.image || '/images/fallback-blog.jpg';
};

/**
 * Extrait les tags de l'article depuis _embedded
 */
export const getTags = (article: BlogPost): Array<{ id: number; name: string; slug: string }> => {
  const terms = article._embedded?.['wp:term'] || [];
  // Le premier sous-tableau (index 0) est souvent les catégories, le second (index 1) les tags
  // On filtre par taxonomie pour être sûr
  const tags: any[] = [];
  terms.forEach(termGroup => {
    termGroup.forEach(term => {
      if (term.taxonomy === 'post_tag') {
        tags.push({
          id: term.id,
          name: term.name,
          slug: term.slug
        });
      }
    });
  });
  return tags;
};

/**
 * Extrait les données SEO de l'article, en priorisant RankMath
 */
export const getSEOData = (article: BlogPost) => {
  const title = article.rank_math_title
    ? stripHtmlTags(article.rank_math_title)
    : stripHtmlTags(article.title.rendered);

  const description = article.rank_math_description
    ? stripHtmlTags(article.rank_math_description)
    : stripHtmlTags(article.excerpt.rendered);

  const ogImage = article.rank_math_og_image
    || getFeaturedImage(article);

  return {
    title,
    description,
    ogImage,
    robots: article.rank_math_robots?.join(', ') || 'index, follow'
  };
};

/**
 * Formate le mois depuis une date ISO WordPress
 */
export const getMonthFromDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Extrait le vrai titre si n8n a accidentellement mis le slug dans `title.rendered`.
 * Cherche le premier <h2> ou <h1> dans le contenu si le titre est suspect.
 */
const extractRealTitle = (post: BlogPost): string => {
  const renderedTitle = post.title.rendered;
  // Si le titre correspond au slug ou ressemble à un slug sans espaces
  if (renderedTitle === post.slug || /^[a-z0-9-]+$/.test(renderedTitle)) {
    const match = post.content.rendered.match(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/i);
    if (match && match[1]) {
      return stripHtmlTags(match[1]);
    }
  }
  return renderedTitle;
};

// ============================================
// SERVICE PRINCIPAL - WordPress API
// ============================================

/**
 * Récupère tous les articles publiés depuis WordPress
 * 
 * @param perPage - Nombre d'articles par page (défaut: 100)
 * @returns Promise<BlogPost[]>
 */
export const getPosts = async (perPage: number = 100): Promise<BlogPost[]> => {
  const url = `${WP_API_BASE}/posts?_embed&per_page=${perPage}&orderby=date&order=desc`;

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Erreur API WordPress: ${response.status} ${response.statusText}`);
  }

  const posts: BlogPost[] = await response.json();

  // Enrichir chaque post avec readTime, mois calculés et correction du titre
  return posts.map(post => {
    const realTitle = extractRealTitle(post);
    return {
      ...post,
      title: {
        ...post.title,
        rendered: realTitle
      },
      readTime: calculateReadTime(post.content.rendered),
      month: getMonthFromDate(post.date),
    };
  });
};

/**
 * Récupère un article par son slug depuis WordPress
 * 
 * @param slug - Slug de l'article WordPress
 * @returns Promise<BlogPost | null>
 */
export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const url = `${WP_API_BASE}/posts?slug=${slug}&_embed`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur API WordPress: ${response.status} ${response.statusText}`);
    }

    const posts: BlogPost[] = await response.json();
    
    if (!posts || posts.length === 0) return null;
    
    const post = posts[0];
    const realTitle = extractRealTitle(post);

    return {
      ...post,
      title: {
        ...post.title,
        rendered: realTitle
      },
      readTime: calculateReadTime(post.content.rendered),
      month: getMonthFromDate(post.date),
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'article par slug ${slug}:`, error);
    return null;
  }
};

/**
 * Récupère les articles liés à un slug de tag spécifique
 * 
 * @param slug - Slug du tag
 * @returns Promise<{ posts: BlogPost[], tagName: string }>
 */
export const getPostsByTagSlug = async (slug: string): Promise<{ posts: BlogPost[], tagName: string }> => {
  try {
    // 1. D'abord, on doit récupérer l'ID et le vrai nom du tag correspondant au slug
    const tagUrl = `${WP_API_BASE}/tags?slug=${slug}`;
    const tagResponse = await fetch(tagUrl, {
      headers: { 'Accept': 'application/json' },
    });

    if (!tagResponse.ok) throw new Error("Erreur při récupération du tag");

    const tags = await tagResponse.json();
    if (!tags || tags.length === 0) {
      throw new Error(`Aucun tag trouvé pour le slug: ${slug}`);
    }

    const tagId = tags[0].id;
    const tagName = tags[0].name;

    // 2. Ensuite, on récupère les articles associés à cet ID de tag
    const postsUrl = `${WP_API_BASE}/posts?_embed&tags=${tagId}&orderby=date&order=desc`;
    const postsResponse = await fetch(postsUrl, {
      headers: { 'Accept': 'application/json' },
    });

    if (!postsResponse.ok) throw new Error("Erreur récupération des articles du tag");

    const posts: BlogPost[] = await postsResponse.json();

    return {
      tagName,
      posts: posts.map(post => {
        const realTitle = extractRealTitle(post);
        return {
          ...post,
          title: {
            ...post.title,
            rendered: realTitle
          },
          readTime: calculateReadTime(post.content.rendered),
          month: getMonthFromDate(post.date),
        };
      })
    };
  } catch (error) {
    console.error(`Erreur pour le tag ${slug}:`, error);
    throw error;
  }
};

/**
 * Récupère les derniers articles
 * 
 * @param limit - Nombre d'articles à récupérer (défaut: 3)
 * @returns Promise<BlogPost[]>
 */
export const getLatestPosts = async (limit: number = 3): Promise<BlogPost[]> => {
  const posts = await getPosts(limit);
  return posts.slice(0, limit);
};

/**
 * Groupe les articles par mois pour la section Historique
 * 
 * @param posts - Liste des articles
 * @returns Record<string, BlogPost[]>
 */
export const groupPostsByMonth = (posts: BlogPost[]): Record<string, BlogPost[]> => {
  return posts.reduce((acc, article) => {
    const month = article.month || getMonthFromDate(article.date);
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(article);
    return acc;
  }, {} as Record<string, BlogPost[]>);
};
