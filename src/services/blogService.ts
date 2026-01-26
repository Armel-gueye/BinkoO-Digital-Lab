/**
 * Service Blog - Préparé pour WordPress API
 * 
 * Ce service centralise la logique de récupération des articles.
 * Il utilise actuellement des mock data, mais est structuré pour
 * une connexion future à l'API WordPress REST.
 * 
 * API WordPress endpoint attendu : /wp-json/wp/v2/posts?_embed
 */

// ============================================
// INTERFACES - Structure WordPress API
// ============================================

/**
 * Interface compatible avec la structure WordPress REST API
 * Supporte à la fois les données WordPress natives et nos données locales
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
  month: string;
  readTime?: string;
  image: string;
  slug?: string;
  author?: number;
  featured_media?: number;
  _embedded?: {
    'wp:featuredmedia'?: [{ source_url: string }];
  };
}

// ============================================
// HELPERS - Extraction de données
// ============================================

/**
 * Extrait le texte brut depuis HTML WordPress
 */
export const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
};

/**
 * Calcule le temps de lecture depuis le contenu HTML
 * Basé sur 200 mots par minute
 */
export const calculateReadTime = (htmlContent: string): string => {
  const text = stripHtmlTags(htmlContent);
  const words = text.split(/\s+/).filter(w => w.length > 0).length;
  const minutes = Math.ceil(words / 200);
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
 * Récupère l'image featured depuis WordPress ou utilise fallback
 */
export const getFeaturedImage = (article: BlogPost): string => {
  return article._embedded?.['wp:featuredmedia']?.[0]?.source_url
    || article.image
    || '/images/fallback.jpg';
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

// ============================================
// MOCK DATA - Compatible WordPress
// ============================================

/**
 * Données mock pour le développement
 * Structure identique à celle retournée par WordPress REST API
 * 
 * TODO: Remplacer par des appels API réels quand WordPress sera configuré
 */
const mockArticles: BlogPost[] = [
  {
    id: 1,
    title: { rendered: "Comment l'IA transforme le marketing digital en 2026" },
    excerpt: { rendered: "Découvrez comment l'intelligence artificielle révolutionne les stratégies marketing et booste les conversions des entreprises modernes." },
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    date: "2026-01-15",
    month: "Janvier 2026",
    readTime: "5 min",
    slug: "ia-marketing-digital-2026",
    author: 1,
    featured_media: 0,
    content: {
      rendered: `
      <p>L'intelligence artificielle n'est plus une technologie du futur – elle est au cœur du marketing digital moderne. En 2026, les entreprises qui intègrent l'IA dans leurs stratégies marketing voient leurs conversions augmenter de 40% en moyenne.</p>

      <h2>L'IA au service de la personnalisation</h2>
      <p>La personnalisation à grande échelle est devenue une réalité grâce à l'IA. Les algorithmes d'apprentissage automatique analysent le comportement des utilisateurs en temps réel pour adapter le contenu, les offres et l'expérience utilisateur de manière dynamique.</p>

      <h2>Les chatbots intelligents changent la donne</h2>
      <p>Les chatbots IA ne se contentent plus de répondre à des questions basiques. Ils comprennent le contexte, détectent les intentions d'achat et guident naturellement vers la conversion – 24h/24, 7j/7.</p>

      <h2>Analyse prédictive et ROI</h2>
      <p>L'IA prédit les comportements d'achat, identifie les leads les plus prometteurs et optimise automatiquement les budgets publicitaires. Le résultat ? Un ROI marketing qui double en moyenne.</p>

      <h2>Comment commencer ?</h2>
      <p>Commencez par un audit de vos processus marketing actuels. Identifiez les tâches répétitives qui peuvent être automatisées et les points de friction dans le parcours client. L'intégration de l'IA doit être progressive et stratégique.</p>
    ` }
  },
  {
    id: 2,
    title: { rendered: "5 tendances web design à adopter cette année" },
    excerpt: { rendered: "Les tendances qui domineront le design web en 2026 : minimalisme, animations fluides, et expériences immersives." },
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    date: "2026-01-10",
    month: "Janvier 2026",
    readTime: "4 min",
    slug: "tendances-design-web-2026",
    author: 1,
    featured_media: 0,
    content: {
      rendered: `
      <p>Le design web évolue constamment, et 2026 apporte son lot d'innovations visuelles et fonctionnelles. Voici les 5 tendances incontournables pour rester à la pointe.</p>

      <h2>1. Minimalisme maximal</h2>
      <p>Le "less is more" atteint son apogée. Des espaces blancs généreux, une typographie forte et des éléments visuels épurés créent des interfaces élégantes et performantes.</p>

      <h2>2. Animations micro-interactions</h2>
      <p>Les animations subtiles au scroll et au hover rendent l'expérience utilisateur plus fluide et engageante. Chaque interaction devient une micro-célébration.</p>

      <h2>3. Dark mode par défaut</h2>
      <p>Le mode sombre n'est plus une option mais un standard. Il réduit la fatigue oculaire et offre une esthétique moderne très appréciée.</p>

      <h2>4. Typographie expressive</h2>
      <p>Les polices de caractères deviennent des éléments de design à part entière. Des typographies audacieuses créent une identité visuelle forte.</p>

      <h2>5. Performance avant tout</h2>
      <p>Un design magnifique mais lent est un design inutile. L'optimisation des performances est désormais intégrée dès la phase de conception.</p>
    ` }
  },
  {
    id: 3,
    title: { rendered: "Automatisation : gagnez 10h par semaine" },
    excerpt: { rendered: "Comment automatiser vos tâches répétitives et libérer du temps pour ce qui compte vraiment dans votre business." },
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    date: "2026-01-05",
    month: "Janvier 2026",
    readTime: "6 min",
    content: {
      rendered: `<p>L'automatisation n'est pas une option, c'est une nécessité. Les entrepreneurs qui automatisent leurs processus gagnent en moyenne 10 heures par semaine – du temps précieux pour se concentrer sur la croissance.</p>

      <h2>Identifier les tâches automatisables</h2>
      <p>Commencez par lister toutes vos tâches répétitives : envoi d'emails, mise à jour de bases de données, génération de rapports, publication sur les réseaux sociaux. Ce sont vos candidats prioritaires.</p>

      <h2>Les outils d'automatisation essentiels</h2>
      <p>Zapier, Make, n8n... Les outils no-code permettent de créer des workflows complexes sans écrire une ligne de code. Connectez vos applications et laissez-les travailler pour vous.</p>

      <h2>ROI de l'automatisation</h2>
      <p>10 heures gagnées par semaine = 520 heures par an. À 50€/heure, c'est 26 000€ de valeur créée. Sans compter la réduction d'erreurs et l'amélioration de la productivité.</p>

      <h2>Par où commencer ?</h2>
      <p>Automatisez d'abord votre gestion d'emails et vos réponses clients. Ce sont les gains rapides qui vous motiveront à aller plus loin.</p>` }
  },
  {
    id: 4,
    title: { rendered: "Landing page parfaite : le guide complet" },
    excerpt: { rendered: "Les éléments essentiels d'une landing page qui convertit à plus de 15% : structure, copywriting et CTA." },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    date: "2024-12-28",
    month: "Décembre 2024",
    readTime: "7 min",
    content: {
      rendered: `<p>Une landing page efficace peut transformer votre taux de conversion. Voici la formule éprouvée pour créer des pages qui convertissent à plus de 15%.</p>

      <h2>La structure gagnante</h2>
      <p>Hero percutant, problème/solution, preuve sociale, bénéfices concrets, CTA visible et fort. Cette structure a fait ses preuves sur des milliers de pages.</p>

      <h2>Le copywriting qui vend</h2>
      <p>Votre titre doit capter l'attention en 3 secondes. Votre texte doit parler des bénéfices, pas des fonctionnalités. Et votre CTA doit créer l'urgence sans être agressif.</p>

      <h2>Design et ergonomie</h2>
      <p>Un design épuré guide le regard vers l'action principale. Supprimez tout ce qui distrait. Une seule page, un seul objectif, un seul CTA principal.</p>

      <h2>Optimisation continue</h2>
      <p>Testez tout : les titres, les images, les couleurs de CTA, la longueur du texte. L'A/B testing est votre meilleur allié pour doubler vos conversions.</p>` }
  },
  {
    id: 5,
    title: { rendered: "Chatbots IA : le nouveau standard du service client" },
    excerpt: { rendered: "Pourquoi intégrer un chatbot intelligent n'est plus une option mais une nécessité pour rester compétitif." },
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    date: "2024-12-20",
    month: "Décembre 2024",
    readTime: "5 min",
    content: {
      rendered: `<p>Le service client 24/7 n'est plus un luxe réservé aux grandes entreprises. Les chatbots IA le rendent accessible et abordable pour tous.</p>

      <h2>Au-delà du simple FAQ</h2>
      <p>Les chatbots modernes comprennent le contexte, gèrent plusieurs langues et s'améliorent avec chaque conversation. Ils ne remplacent pas l'humain, ils le libèrent des tâches répétitives.</p>

      <h2>ROI impressionnant</h2>
      <p>87% des clients préfèrent avoir une réponse immédiate par chatbot qu'attendre une réponse humaine. Le taux de satisfaction augmente, les coûts diminuent.</p>

      <h2>Implémentation rapide</h2>
      <p>En quelques heures, votre chatbot peut être opérationnel et gérer les questions les plus fréquentes. L'investissement se rentabilise dès le premier mois.</p>` }
  },
  {
    id: 6,
    title: { rendered: "SEO en 2026 : ce qui a vraiment changé" },
    excerpt: { rendered: "Les nouvelles règles du référencement naturel avec l'arrivée de l'IA dans les moteurs de recherche." },
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=600&fit=crop",
    date: "2024-12-15",
    month: "Décembre 2024",
    readTime: "8 min",
    content: {
      rendered: `<p>L'intégration de l'IA dans Google Search bouleverse les règles du SEO. Voici ce qui change et comment adapter votre stratégie.</p>

      <h2>L'intention prime sur les mots-clés</h2>
      <p>Google comprend désormais l'intention derrière chaque recherche. Optimisez pour répondre aux questions, pas juste pour placer des mots-clés.</p>

      <h2>Contenu de qualité = ROI long terme</h2>
      <p>Les contenus génériques générés en masse sont détectés et pénalisés. Investissez dans du contenu expert, approfondi et unique.</p>

      <h2>E-E-A-T renforcé</h2>
      <p>Experience, Expertise, Authoritativeness, Trust : ces critères sont plus importants que jamais. Montrez qui vous êtes et pourquoi on peut vous faire confiance.</p>

      <h2>Performance technique cruciale</h2>
      <p>Core Web Vitals, temps de chargement, mobile-first : la technique est la fondation du SEO moderne. Pas de compromis possible.</p>` }
  },
  {
    id: 7,
    title: { rendered: "Branding digital : créer une identité mémorable" },
    excerpt: { rendered: "Comment construire une marque forte qui se démarque dans un monde digital saturé d'informations." },
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
    date: "2024-12-05",
    month: "Décembre 2024",
    readTime: "6 min",
    content: {
      rendered: `<p>Dans un monde saturé d'informations, seules les marques mémorables survivent. Voici comment créer une identité digitale qui marque les esprits.</p>

      <h2>Cohérence visuelle totale</h2>
      <p>Couleurs, typographie, style visuel : tout doit être cohérent sur tous les canaux. La répétition crée la reconnaissance.</p>

      <h2>Voix de marque unique</h2>
      <p>Comment vous parlez est aussi important que ce que vous dites. Développez un ton authentique et restez-y fidèle.</p>

      <h2>Storytelling puissant</h2>
      <p>Les gens n'achètent pas des produits, ils achètent des histoires. Quelle est la vôtre ? Pourquoi existez-vous ?</p>

      <h2>Expérience mémorable</h2>
      <p>Chaque interaction avec votre marque doit renforcer votre identité. Du site web aux emails, créez une expérience cohérente et distinctive.</p>` }
  },
  {
    id: 8,
    title: { rendered: "Performance web : chaque milliseconde compte" },
    excerpt: { rendered: "L'impact de la vitesse de chargement sur vos conversions et comment optimiser votre site pour le speed." },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    date: "2024-11-25",
    month: "Novembre 2024",
    readTime: "5 min",
    content: {
      rendered: `<p>1 seconde de délai = 7% de conversions en moins. La performance web n'est pas un luxe technique, c'est un impératif business.</p>

      <h2>Les chiffres qui parlent</h2>
      <p>53% des utilisateurs abandonnent un site qui met plus de 3 secondes à charger. Chaque milliseconde compte littéralement.</p>

      <h2>Optimisations prioritaires</h2>
      <p>Images compressées, lazy loading, code minifié, CDN : ces optimisations de base peuvent diviser par 2 votre temps de chargement.</p>

      <h2>Mesurer pour améliorer</h2>
      <p>Google PageSpeed Insights, WebPageTest, Lighthouse : utilisez ces outils pour identifier vos points faibles et mesurer vos progrès.</p>

      <h2>ROI immédiat</h2>
      <p>Amazon a calculé que 100ms de latence coûtait 1% de ventes. Pour un site à 100k€/mois, c'est 12k€/an perdus. L'optimisation se paie d'elle-même.</p>` }
  },
  {
    id: 9,
    title: { rendered: "L'art du copywriting persuasif" },
    excerpt: { rendered: "Techniques éprouvées pour écrire des textes qui captivent, convainquent et convertissent vos visiteurs." },
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
    date: "2024-11-18",
    month: "Novembre 2024",
    readTime: "7 min",
    content: {
      rendered: `<p>Le copywriting est l'art de vendre avec des mots. Maîtrisez ces techniques et transformez vos textes en machines à conversion.</p>

      <h2>La formule AIDA</h2>
      <p>Attention, Intérêt, Désir, Action : cette structure vieille de 100 ans fonctionne toujours. Captez l'attention, créez le désir, poussez à l'action.</p>

      <h2>Bénéfices vs Caractéristiques</h2>
      <p>Ne vendez pas des fonctionnalités, vendez des transformations. Pas "notre logiciel a 50 fonctionnalités", mais "gagnez 10h par semaine".</p>

      <h2>Preuve sociale et urgence</h2>
      <p>"Déjà 10 000 clients satisfaits" + "Offre limitée à 48h" = combinaison puissante pour déclencher l'action immédiate.</p>

      <h2>Simplicité radicale</h2>
      <p>Écrivez comme vous parlez. Phrases courtes. Vocabulaire simple. Si un enfant de 12 ans ne comprend pas, simplifiez encore.</p>` }
  },
  {
    id: 10,
    title: { rendered: "Réseaux sociaux : stratégie gagnante 2026" },
    excerpt: { rendered: "Comment créer du contenu engageant et développer une communauté fidèle autour de votre marque." },
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    date: "2026-01-02",
    month: "Janvier 2026",
    readTime: "6 min",
    slug: "strategie-reseaux-sociaux-2026",
    author: 1,
    featured_media: 0,
    content: {
      rendered: `<p>Les réseaux sociaux ne sont pas des canaux de pub, ce sont des espaces de conversation. Voici comment y briller en 2026.</p>

      <h2>Authenticité avant tout</h2>
      <p>Les contenus trop léchés ne fonctionnent plus. Les gens veulent du vrai, de l'humain, de l'imperfection. Montrez les coulisses.</p>

      <h2>Valeur > Volume</h2>
      <p>Ne postez pas tous les jours si vous n'avez rien à dire. 3 posts excellents par semaine battent 7 posts médiocres.</p>

      <h2>Engagement actif</h2>
      <p>Répondez aux commentaires, posez des questions, créez des sondages. Les algorithmes récompensent l'engagement, pas la promotion.</p>

      <h2>Mesurer ce qui compte</h2>
      <p>Oubliez les vanity metrics. Ce qui compte : engagement rate, reach, conversions. Ajustez votre stratégie en fonction.</p>` }
  },
  {
    id: 11,
    title: { rendered: "E-commerce : booster vos ventes en ligne" },
    excerpt: { rendered: "Les stratégies essentielles pour transformer votre boutique en ligne en machine à ventes." },
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop",
    date: "2024-11-02",
    month: "Novembre 2024",
    readTime: "8 min",
    content: {
      rendered: `<p>Votre boutique en ligne a du potentiel, mais les ventes stagnent ? Ces stratégies éprouvées vont débloquer votre croissance.</p>

      <h2>Fiches produits qui vendent</h2>
      <p>Photos professionnelles multiples, descriptions détaillées centrées sur les bénéfices, avis clients visibles. C'est la base.</p>

      <h2>Checkout optimisé</h2>
      <p>Chaque étape supplémentaire = 20% d'abandons en plus. Simplifiez au maximum : guest checkout, peu de champs, paiements variés.</p>

      <h2>Email marketing puissant</h2>
      <p>Paniers abandonnés, recommandations personnalisées, offres exclusives : l'email reste le canal #1 pour les ventes e-commerce.</p>

      <h2>Confiance et réassurance</h2>
      <p>Badges de sécurité, garanties, politique de retour claire, service client visible : éliminez tous les freins à l'achat.</p>` }
  }
];

// ============================================
// SERVICE PRINCIPAL
// ============================================

/**
 * Configuration de l'API WordPress (pour future connexion)
 */
const WORDPRESS_API_CONFIG = {
  baseUrl: import.meta.env.VITE_WORDPRESS_URL || 'https://votre-site-wordpress.com',
  endpoint: '/wp-json/wp/v2/posts',
  params: '_embed', // Inclut les featured media
};

/**
 * Récupère tous les articles
 * 
 * @returns Promise<BlogPost[]>
 * 
 * TODO: Implémenter l'appel API WordPress
 * const response = await fetch(`${WORDPRESS_API_CONFIG.baseUrl}${WORDPRESS_API_CONFIG.endpoint}?${WORDPRESS_API_CONFIG.params}`);
 * const data = await response.json();
 * return data as BlogPost[];
 */
export const getPosts = async (): Promise<BlogPost[]> => {
  // Simulation d'un délai réseau pour le réalisme
  await new Promise(resolve => setTimeout(resolve, 300));

  return mockArticles;
};

/**
 * Récupère un article par son ID
 * 
 * @param id - ID de l'article
 * @returns Promise<BlogPost | null>
 * 
 * TODO: Implémenter l'appel API WordPress
 * const response = await fetch(`${WORDPRESS_API_CONFIG.baseUrl}${WORDPRESS_API_CONFIG.endpoint}/${id}?${WORDPRESS_API_CONFIG.params}`);
 * const data = await response.json();
 * return data as BlogPost;
 */
export const getPostById = async (id: number): Promise<BlogPost | null> => {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 200));

  return mockArticles.find(article => article.id === id) || null;
};

/**
 * Récupère les derniers articles
 * 
 * @param limit - Nombre d'articles à récupérer (défaut: 3)
 * @returns Promise<BlogPost[]>
 */
export const getLatestPosts = async (limit: number = 3): Promise<BlogPost[]> => {
  const posts = await getPosts();
  return posts.slice(0, limit);
};

/**
 * Groupe les articles par mois
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
