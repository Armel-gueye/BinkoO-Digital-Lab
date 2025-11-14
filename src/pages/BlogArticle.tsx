import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { useEffect } from 'react';

// Mock data pour les articles (même structure que Blog.tsx)
const articles = [
  {
    id: 1,
    title: "Comment l'IA transforme le marketing digital en 2025",
    excerpt: "Découvrez comment l'intelligence artificielle révolutionne les stratégies marketing et booste les conversions des entreprises modernes.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    date: "2025-01-15",
    month: "Janvier 2025",
    readTime: "5 min",
    content: `
      <p>L'intelligence artificielle n'est plus une technologie du futur – elle est au cœur du marketing digital moderne. En 2025, les entreprises qui intègrent l'IA dans leurs stratégies marketing voient leurs conversions augmenter de 40% en moyenne.</p>

      <h2>L'IA au service de la personnalisation</h2>
      <p>La personnalisation à grande échelle est devenue une réalité grâce à l'IA. Les algorithmes d'apprentissage automatique analysent le comportement des utilisateurs en temps réel pour adapter le contenu, les offres et l'expérience utilisateur de manière dynamique.</p>

      <h2>Les chatbots intelligents changent la donne</h2>
      <p>Les chatbots IA ne se contentent plus de répondre à des questions basiques. Ils comprennent le contexte, détectent les intentions d'achat et guident naturellement vers la conversion – 24h/24, 7j/7.</p>

      <h2>Analyse prédictive et ROI</h2>
      <p>L'IA prédit les comportements d'achat, identifie les leads les plus prometteurs et optimise automatiquement les budgets publicitaires. Le résultat ? Un ROI marketing qui double en moyenne.</p>

      <h2>Comment commencer ?</h2>
      <p>Commencez par un audit de vos processus marketing actuels. Identifiez les tâches répétitives qui peuvent être automatisées et les points de friction dans le parcours client. L'intégration de l'IA doit être progressive et stratégique.</p>
    `
  },
  {
    id: 2,
    title: "5 tendances web design à adopter cette année",
    excerpt: "Les tendances qui domineront le design web en 2025 : minimalisme, animations fluides, et expériences immersives.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    date: "2025-01-10",
    month: "Janvier 2025",
    readTime: "4 min",
    content: `
      <p>Le design web évolue constamment, et 2025 apporte son lot d'innovations visuelles et fonctionnelles. Voici les 5 tendances incontournables pour rester à la pointe.</p>

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
    `
  },
  {
    id: 3,
    title: "Automatisation : gagnez 10h par semaine",
    excerpt: "Comment automatiser vos tâches répétitives et libérer du temps pour ce qui compte vraiment dans votre business.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    date: "2025-01-05",
    month: "Janvier 2025",
    readTime: "6 min",
    content: `
      <p>L'automatisation n'est pas une option, c'est une nécessité. Les entrepreneurs qui automatisent leurs processus gagnent en moyenne 10 heures par semaine – du temps précieux pour se concentrer sur la croissance.</p>

      <h2>Identifier les tâches automatisables</h2>
      <p>Commencez par lister toutes vos tâches répétitives : envoi d'emails, mise à jour de bases de données, génération de rapports, publication sur les réseaux sociaux. Ce sont vos candidats prioritaires.</p>

      <h2>Les outils d'automatisation essentiels</h2>
      <p>Zapier, Make, n8n... Les outils no-code permettent de créer des workflows complexes sans écrire une ligne de code. Connectez vos applications et laissez-les travailler pour vous.</p>

      <h2>ROI de l'automatisation</h2>
      <p>10 heures gagnées par semaine = 520 heures par an. À 50€/heure, c'est 26 000€ de valeur créée. Sans compter la réduction d'erreurs et l'amélioration de la productivité.</p>

      <h2>Par où commencer ?</h2>
      <p>Automatisez d'abord votre gestion d'emails et vos réponses clients. Ce sont les gains rapides qui vous motiveront à aller plus loin.</p>
    `
  },
  {
    id: 4,
    title: "Landing page parfaite : le guide complet",
    excerpt: "Les éléments essentiels d'une landing page qui convertit à plus de 15% : structure, copywriting et CTA.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    date: "2024-12-28",
    month: "Décembre 2024",
    readTime: "7 min",
    content: `
      <p>Une landing page efficace peut transformer votre taux de conversion. Voici la formule éprouvée pour créer des pages qui convertissent à plus de 15%.</p>

      <h2>La structure gagnante</h2>
      <p>Hero percutant, problème/solution, preuve sociale, bénéfices concrets, CTA visible et fort. Cette structure a fait ses preuves sur des milliers de pages.</p>

      <h2>Le copywriting qui vend</h2>
      <p>Votre titre doit capter l'attention en 3 secondes. Votre texte doit parler des bénéfices, pas des fonctionnalités. Et votre CTA doit créer l'urgence sans être agressif.</p>

      <h2>Design et ergonomie</h2>
      <p>Un design épuré guide le regard vers l'action principale. Supprimez tout ce qui distrait. Une seule page, un seul objectif, un seul CTA principal.</p>

      <h2>Optimisation continue</h2>
      <p>Testez tout : les titres, les images, les couleurs de CTA, la longueur du texte. L'A/B testing est votre meilleur allié pour doubler vos conversions.</p>
    `
  },
  {
    id: 5,
    title: "Chatbots IA : le nouveau standard du service client",
    excerpt: "Pourquoi intégrer un chatbot intelligent n'est plus une option mais une nécessité pour rester compétitif.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    date: "2024-12-20",
    month: "Décembre 2024",
    readTime: "5 min",
    content: `
      <p>Le service client 24/7 n'est plus un luxe réservé aux grandes entreprises. Les chatbots IA le rendent accessible et abordable pour tous.</p>

      <h2>Au-delà du simple FAQ</h2>
      <p>Les chatbots modernes comprennent le contexte, gèrent plusieurs langues et s'améliorent avec chaque conversation. Ils ne remplacent pas l'humain, ils le libèrent des tâches répétitives.</p>

      <h2>ROI impressionnant</h2>
      <p>87% des clients préfèrent avoir une réponse immédiate par chatbot qu'attendre une réponse humaine. Le taux de satisfaction augmente, les coûts diminuent.</p>

      <h2>Implémentation rapide</h2>
      <p>En quelques heures, votre chatbot peut être opérationnel et gérer les questions les plus fréquentes. L'investissement se rentabilise dès le premier mois.</p>
    `
  },
  {
    id: 6,
    title: "SEO en 2025 : ce qui a vraiment changé",
    excerpt: "Les nouvelles règles du référencement naturel avec l'arrivée de l'IA dans les moteurs de recherche.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=600&fit=crop",
    date: "2024-12-15",
    month: "Décembre 2024",
    readTime: "8 min",
    content: `
      <p>L'intégration de l'IA dans Google Search bouleverse les règles du SEO. Voici ce qui change et comment adapter votre stratégie.</p>

      <h2>L'intention prime sur les mots-clés</h2>
      <p>Google comprend désormais l'intention derrière chaque recherche. Optimisez pour répondre aux questions, pas juste pour placer des mots-clés.</p>

      <h2>Contenu de qualité = ROI long terme</h2>
      <p>Les contenus génériques générés en masse sont détectés et pénalisés. Investissez dans du contenu expert, approfondi et unique.</p>

      <h2>E-E-A-T renforcé</h2>
      <p>Experience, Expertise, Authoritativeness, Trust : ces critères sont plus importants que jamais. Montrez qui vous êtes et pourquoi on peut vous faire confiance.</p>

      <h2>Performance technique cruciale</h2>
      <p>Core Web Vitals, temps de chargement, mobile-first : la technique est la fondation du SEO moderne. Pas de compromis possible.</p>
    `
  },
  {
    id: 7,
    title: "Branding digital : créer une identité mémorable",
    excerpt: "Comment construire une marque forte qui se démarque dans un monde digital saturé d'informations.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
    date: "2024-12-05",
    month: "Décembre 2024",
    readTime: "6 min",
    content: `
      <p>Dans un monde saturé d'informations, seules les marques mémorables survivent. Voici comment créer une identité digitale qui marque les esprits.</p>

      <h2>Cohérence visuelle totale</h2>
      <p>Couleurs, typographie, style visuel : tout doit être cohérent sur tous les canaux. La répétition crée la reconnaissance.</p>

      <h2>Voix de marque unique</h2>
      <p>Comment vous parlez est aussi important que ce que vous dites. Développez un ton authentique et restez-y fidèle.</p>

      <h2>Storytelling puissant</h2>
      <p>Les gens n'achètent pas des produits, ils achètent des histoires. Quelle est la vôtre ? Pourquoi existez-vous ?</p>

      <h2>Expérience mémorable</h2>
      <p>Chaque interaction avec votre marque doit renforcer votre identité. Du site web aux emails, créez une expérience cohérente et distinctive.</p>
    `
  },
  {
    id: 8,
    title: "Performance web : chaque milliseconde compte",
    excerpt: "L'impact de la vitesse de chargement sur vos conversions et comment optimiser votre site pour le speed.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    date: "2024-11-25",
    month: "Novembre 2024",
    readTime: "5 min",
    content: `
      <p>1 seconde de délai = 7% de conversions en moins. La performance web n'est pas un luxe technique, c'est un impératif business.</p>

      <h2>Les chiffres qui parlent</h2>
      <p>53% des utilisateurs abandonnent un site qui met plus de 3 secondes à charger. Chaque milliseconde compte littéralement.</p>

      <h2>Optimisations prioritaires</h2>
      <p>Images compressées, lazy loading, code minifié, CDN : ces optimisations de base peuvent diviser par 2 votre temps de chargement.</p>

      <h2>Mesurer pour améliorer</h2>
      <p>Google PageSpeed Insights, WebPageTest, Lighthouse : utilisez ces outils pour identifier vos points faibles et mesurer vos progrès.</p>

      <h2>ROI immédiat</h2>
      <p>Amazon a calculé que 100ms de latence coûtait 1% de ventes. Pour un site à 100k€/mois, c'est 12k€/an perdus. L'optimisation se paie d'elle-même.</p>
    `
  },
  {
    id: 9,
    title: "L'art du copywriting persuasif",
    excerpt: "Techniques éprouvées pour écrire des textes qui captivent, convainquent et convertissent vos visiteurs.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
    date: "2024-11-18",
    month: "Novembre 2024",
    readTime: "7 min",
    content: `
      <p>Le copywriting est l'art de vendre avec des mots. Maîtrisez ces techniques et transformez vos textes en machines à conversion.</p>

      <h2>La formule AIDA</h2>
      <p>Attention, Intérêt, Désir, Action : cette structure vieille de 100 ans fonctionne toujours. Captez l'attention, créez le désir, poussez à l'action.</p>

      <h2>Bénéfices vs Caractéristiques</h2>
      <p>Ne vendez pas des fonctionnalités, vendez des transformations. Pas "notre logiciel a 50 fonctionnalités", mais "gagnez 10h par semaine".</p>

      <h2>Preuve sociale et urgence</h2>
      <p>"Déjà 10 000 clients satisfaits" + "Offre limitée à 48h" = combinaison puissante pour déclencher l'action immédiate.</p>

      <h2>Simplicité radicale</h2>
      <p>Écrivez comme vous parlez. Phrases courtes. Vocabulaire simple. Si un enfant de 12 ans ne comprend pas, simplifiez encore.</p>
    `
  },
  {
    id: 10,
    title: "Réseaux sociaux : stratégie gagnante 2025",
    excerpt: "Comment créer du contenu engageant et développer une communauté fidèle autour de votre marque.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    date: "2024-11-10",
    month: "Novembre 2024",
    readTime: "6 min",
    content: `
      <p>Les réseaux sociaux ne sont pas des canaux de pub, ce sont des espaces de conversation. Voici comment y briller en 2025.</p>

      <h2>Authenticité avant tout</h2>
      <p>Les contenus trop léchés ne fonctionnent plus. Les gens veulent du vrai, de l'humain, de l'imperfection. Montrez les coulisses.</p>

      <h2>Valeur > Volume</h2>
      <p>Ne postez pas tous les jours si vous n'avez rien à dire. 3 posts excellents par semaine battent 7 posts médiocres.</p>

      <h2>Engagement actif</h2>
      <p>Répondez aux commentaires, posez des questions, créez des sondages. Les algorithmes récompensent l'engagement, pas la promotion.</p>

      <h2>Mesurer ce qui compte</h2>
      <p>Oubliez les vanity metrics. Ce qui compte : engagement rate, reach, conversions. Ajustez votre stratégie en fonction.</p>
    `
  },
  {
    id: 11,
    title: "E-commerce : booster vos ventes en ligne",
    excerpt: "Les stratégies essentielles pour transformer votre boutique en ligne en machine à ventes.",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop",
    date: "2024-11-02",
    month: "Novembre 2024",
    readTime: "8 min",
    content: `
      <p>Votre boutique en ligne a du potentiel, mais les ventes stagnent ? Ces stratégies éprouvées vont débloquer votre croissance.</p>

      <h2>Fiches produits qui vendent</h2>
      <p>Photos professionnelles multiples, descriptions détaillées centrées sur les bénéfices, avis clients visibles. C'est la base.</p>

      <h2>Checkout optimisé</h2>
      <p>Chaque étape supplémentaire = 20% d'abandons en plus. Simplifiez au maximum : guest checkout, peu de champs, paiements variés.</p>

      <h2>Email marketing puissant</h2>
      <p>Paniers abandonnés, recommandations personnalisées, offres exclusives : l'email reste le canal #1 pour les ventes e-commerce.</p>

      <h2>Confiance et réassurance</h2>
      <p>Badges de sécurité, garanties, politique de retour claire, service client visible : éliminez tous les freins à l'achat.</p>
    `
  }
];

export default function BlogArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find(a => a.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
          <Link to="/blog" className="text-primary hover:underline">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/blog')}
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white transition-colors shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold text-sm">Retour au blog</span>
        </motion.button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="container-fluid">
            <motion.div
              className="max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-white/80 text-sm uppercase tracking-wider mb-4">
                {article.month}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{formatDate(article.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{article.readTime} de lecture</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-12 md:py-16 lg:py-20">
        <div className="container-fluid">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="prose prose-lg md:prose-xl prose-gray max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                lineHeight: '1.8',
                fontSize: '1.125rem'
              }}
            />

            {/* Share Section */}
            <motion.div
              className="mt-12 pt-8 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-muted-foreground">
                  Cet article vous a été utile ?
                </p>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: article.title,
                        text: article.excerpt,
                        url: window.location.href,
                      });
                    }
                  }}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                >
                  <Share2 className="w-4 h-4" />
                  Partager
                </button>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-center text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Besoin d'aide pour votre projet digital ?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Discutons de vos objectifs et découvrez comment nous pouvons vous aider
              </p>
              <a
                href="https://api.whatsapp.com/send?phone=22644323841"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-xl"
              >
                Contactez-nous sur WhatsApp
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </motion.div>

            {/* Back to Blog Link */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                Voir tous les articles
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}