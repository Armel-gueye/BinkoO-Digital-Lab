import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';
import SEO from '@/components/SEO';
import {
  getPostById,
  type BlogPost,
  stripHtmlTags,
  calculateReadTime,
  extractText,
  getFeaturedImage,
  getMonthFromDate,
  getTags,
  getSEOData
} from '@/services/blogService';
import { getWhatsAppUrl } from '@/utils/whatsapp';

export default function BlogArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setErrorMsg(null);
        const post = await getPostById(Number(id));
        if (!post) {
          setErrorMsg('Cet article est introuvable ou a été retiré.');
        }
        setArticle(post);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'article:', error);
        setErrorMsg('Impossible de charger l\'article. Vérifiez votre connexion.');
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Référence pour le contenu de l'article
  const contentRef = useRef<HTMLDivElement>(null);

  // Appliquer l'alternance de couleurs sur les <strong> après le rendu
  useEffect(() => {
    if (!contentRef.current || !article) return;

    const strongElements = contentRef.current.querySelectorAll('strong');
    strongElements.forEach((el, index) => {
      const htmlEl = el as HTMLElement;
      if (index % 2 === 0) {
        htmlEl.style.backgroundColor = '#E5002E'; // Rouge (odd - index 0, 2, 4...)
      } else {
        htmlEl.style.backgroundColor = '#3B82F6'; // Bleu (even - index 1, 3, 5...)
      }
    });
  }, [article, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-6">{errorMsg?.includes('Impossible') ? '⚠️' : '📝'}</div>
          <h1 className="text-3xl font-bold mb-4">{errorMsg || 'Article non trouvé'}</h1>
          <p className="text-muted-foreground mb-6">
            {errorMsg?.includes('Impossible')
              ? 'Vérifiez votre connexion internet et réessayez.'
              : 'L\'article que vous cherchez n\'existe pas ou a été retiré.'}
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  const articleTitle = stripHtmlTags(extractText(article.title));
  // Sécuriser le contenu contre les failles XSS
  const articleContentRaw = extractText(article.content);
  const articleContent = DOMPurify.sanitize(articleContentRaw, { ADD_ATTR: ['target'] });
  const articleExcerpt = stripHtmlTags(extractText(article.excerpt));
  const articleImage = getFeaturedImage(article);
  const articleMonth = article.month || getMonthFromDate(article.date);
  const articleReadTime = article.readTime || calculateReadTime(articleContent);
  const canonicalUrl = `https://binkoo.digital/blog/${article.slug || id}`;

  // Extraire les tags et données SEO RankMath (via helpers centralisés)
  const tags = getTags(article);
  const seoData = getSEOData(article);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: articleTitle,
      text: articleExcerpt,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast.success('Partagé avec succès !');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Lien copié dans le presse-papiers !');
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return;
      }

      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Lien copié dans le presse-papiers !');
      } catch (clipboardError) {
        toast.error('Impossible de partager l\'article');
      }
    }
  };

  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        canonical={canonicalUrl}
        ogImage={seoData.ogImage}
        robots={seoData.robots}
        ogType="article"
      />
      <div className="min-h-screen bg-background">
        <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
          <img
            src={articleImage}
            alt={articleTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

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

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
            <div className="container-fluid">
              <motion.div
                className="max-w-4xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-white/80 text-sm uppercase tracking-wider mb-4">
                  {articleMonth}
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">
                  {articleTitle}
                </h1>
                <div className="flex items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(article.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{articleReadTime} de lecture</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="py-12 md:py-16 lg:py-20">
          <div className="container-fluid">
            <div className="max-w-3xl mx-auto">
              <motion.div
                ref={contentRef}
                className="blog-prose prose prose-gray max-w-none
              prose-p:text-[15px] prose-p:md:text-[17px]
              prose-headings:font-bold prose-h2:text-xl prose-h2:md:text-2xl prose-h3:text-lg prose-h3:md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                dangerouslySetInnerHTML={{ __html: articleContent }}
                style={{
                  lineHeight: '1.8'
                }}
              />

              {/* Tags Section */}
              {tags.length > 0 && (
                <motion.div
                  className="mt-12 pt-6 border-t border-border/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <Link
                        key={tag.id}
                        to={`/blog/tag/${tag.slug}`}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-medium border border-border/50 hover:bg-secondary transition-colors cursor-pointer"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div
                className="mt-8 pt-8 border-t border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <p className="text-muted-foreground">
                    Cet article vous a été utile ?
                  </p>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                  >
                    <Share2 className="w-4 h-4" />
                    Partager
                  </button>
                </div>
              </motion.div>

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
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-xl"
                >
                  Contactez-nous sur WhatsApp
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </motion.div>

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
    </>
  );
}
