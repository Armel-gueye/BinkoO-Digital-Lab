import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown, ArrowRight, Clock } from 'lucide-react';
import { AnimatedSection, AnimatedParagraph } from '@/components/AnimatedSection';
import { Link } from 'react-router-dom';

// Mock data pour les articles
const articles = [
  {
    id: 1,
    title: "Comment l'IA transforme le marketing digital en 2025",
    excerpt: "Découvrez comment l'intelligence artificielle révolutionne les stratégies marketing et booste les conversions des entreprises modernes.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    date: "2025-01-15",
    month: "Janvier 2025",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "5 tendances web design à adopter cette année",
    excerpt: "Les tendances qui domineront le design web en 2025 : minimalisme, animations fluides, et expériences immersives.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    date: "2025-01-10",
    month: "Janvier 2025",
    readTime: "4 min"
  },
  {
    id: 3,
    title: "Automatisation : gagnez 10h par semaine",
    excerpt: "Comment automatiser vos tâches répétitives et libérer du temps pour ce qui compte vraiment dans votre business.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    date: "2025-01-05",
    month: "Janvier 2025",
    readTime: "6 min"
  },
  {
    id: 4,
    title: "Landing page parfaite : le guide complet",
    excerpt: "Les éléments essentiels d'une landing page qui convertit à plus de 15% : structure, copywriting et CTA.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    date: "2024-12-28",
    month: "Décembre 2024",
    readTime: "7 min"
  },
  {
    id: 5,
    title: "Chatbots IA : le nouveau standard du service client",
    excerpt: "Pourquoi intégrer un chatbot intelligent n'est plus une option mais une nécessité pour rester compétitif.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    date: "2024-12-20",
    month: "Décembre 2024",
    readTime: "5 min"
  },
  {
    id: 6,
    title: "SEO en 2025 : ce qui a vraiment changé",
    excerpt: "Les nouvelles règles du référencement naturel avec l'arrivée de l'IA dans les moteurs de recherche.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=600&fit=crop",
    date: "2024-12-15",
    month: "Décembre 2024",
    readTime: "8 min"
  },
  {
    id: 7,
    title: "Branding digital : créer une identité mémorable",
    excerpt: "Comment construire une marque forte qui se démarque dans un monde digital saturé d'informations.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
    date: "2024-12-05",
    month: "Décembre 2024",
    readTime: "6 min"
  },
  {
    id: 8,
    title: "Performance web : chaque milliseconde compte",
    excerpt: "L'impact de la vitesse de chargement sur vos conversions et comment optimiser votre site pour le speed.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    date: "2024-11-25",
    month: "Novembre 2024",
    readTime: "5 min"
  },
  {
    id: 9,
    title: "L'art du copywriting persuasif",
    excerpt: "Techniques éprouvées pour écrire des textes qui captivent, convainquent et convertissent vos visiteurs.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
    date: "2024-11-18",
    month: "Novembre 2024",
    readTime: "7 min"
  },
  {
    id: 10,
    title: "Réseaux sociaux : stratégie gagnante 2025",
    excerpt: "Comment créer du contenu engageant et développer une communauté fidèle autour de votre marque.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    date: "2024-11-10",
    month: "Novembre 2024",
    readTime: "6 min"
  },
  {
    id: 11,
    title: "E-commerce : booster vos ventes en ligne",
    excerpt: "Les stratégies essentielles pour transformer votre boutique en ligne en machine à ventes.",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop",
    date: "2024-11-02",
    month: "Novembre 2024",
    readTime: "8 min"
  }
];

// Grouper les articles par mois
const articlesByMonth = articles.reduce((acc, article) => {
  if (!acc[article.month]) {
    acc[article.month] = [];
  }
  acc[article.month].push(article);
  return acc;
}, {} as Record<string, typeof articles>);

const months = Object.keys(articlesByMonth);

export default function Blog() {
  const [openMonth, setOpenMonth] = useState<string | null>(months[0]);
  
  // Les 3 derniers articles
  const latestArticles = articles.slice(0, 3);
  
  const toggleMonth = (month: string) => {
    setOpenMonth(openMonth === month ? null : month);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-gray-50 opacity-60"></div>
        
        <div className="container-fluid relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-sm uppercase tracking-widest text-primary font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Notre Blog
            </motion.p>
            
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Insights, Tendances & Innovation
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Découvrez nos articles sur l'IA, le digital et les stratégies qui transforment les entreprises
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Latest Articles Section */}
      <AnimatedSection animation="fade-up">
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container-fluid">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Derniers Articles</h2>
              <p className="text-muted-foreground">Les publications les plus récentes</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  {/* Image */}
                  <Link to={`/blog/${article.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Nouveau
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <Link to={`/blog/${article.id}`}>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                    </Link>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <Link 
                      to={`/blog/${article.id}`}
                      className="inline-flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all"
                    >
                      Lire l'article
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Article History Section */}
      <AnimatedSection animation="fade-up">
        <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
          <div className="container-fluid">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Historique des Articles</h2>
              <p className="text-muted-foreground">Explorez tous nos articles par mois</p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-4">
              {months.map((month, index) => (
                <motion.div
                  key={month}
                  className="bg-white rounded-xl border border-border overflow-hidden shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Month Header */}
                  <button
                    onClick={() => toggleMonth(month)}
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold">{month}</h3>
                        <p className="text-sm text-muted-foreground">
                          {articlesByMonth[month].length} article{articlesByMonth[month].length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: openMonth === month ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-muted-foreground" />
                    </motion.div>
                  </button>

                  {/* Articles List */}
                  <AnimatePresence>
                    {openMonth === month && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border"
                      >
                        <div className="p-6 space-y-4">
                          {articlesByMonth[month].map((article, idx) => (
                            <Link
                              key={article.id}
                              to={`/blog/${article.id}`}
                            >
                              <motion.div
                                className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                              >
                                {/* Thumbnail */}
                                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                  <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                                    <span>{formatDate(article.date)}</span>
                                    <span>•</span>
                                    <span>{article.readTime}</span>
                                  </div>
                                  <h4 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                    {article.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {article.excerpt}
                                  </p>
                                </div>

                                {/* Arrow */}
                                <div className="flex items-center">
                                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animation="fade-up">
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container-fluid">
            <motion.div
              className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 lg:p-16 text-center text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Prêt à transformer votre business ?
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Discutons de votre projet et découvrez comment nous pouvons vous aider à atteindre vos objectifs
              </p>
              <a
                href="https://api.whatsapp.com/send?phone=22644323841"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl hover:scale-105 transform duration-300"
              >
                Contactez-nous sur WhatsApp
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}