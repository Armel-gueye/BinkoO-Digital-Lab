import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';
import SEO from '@/components/SEO';
import {
  getPostBySlug,
  type BlogPost,
  stripHtmlTags,
  calculateReadTime,
  extractText,
  getFeaturedImage,
  getTags,
  getSEOData,
  getMonthFromDate
} from '@/services/blogService';
import { getWhatsAppUrl, openWhatsApp } from '@/utils/whatsapp';
import { trackBlogArticleView, trackSocialClick, trackDevisClick } from '@/utils/analytics';

export default function BlogArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const articleTitle = article ? stripHtmlTags(extractText(article.title)) : '';
  const articleExcerpt = article ? stripHtmlTags(extractText(article.excerpt)) : '';
  const articleContentRaw = article ? extractText(article.content) : '';
  const articleContent = article ? DOMPurify.sanitize(articleContentRaw, { ADD_ATTR: ['target'] }) : '';
  const articleImage = article ? getFeaturedImage(article) : '';
  const articleMonth = article ? (article.month || getMonthFromDate(article.date)) : '';
  const articleReadTime = article ? (article.readTime || calculateReadTime(articleContent)) : '';
  const canonicalUrl = article ? `https://binkoo.digital/blog/${article.slug}` : '';

  // Extraire les tags et données SEO RankMath (via helpers centralisés)
  const tags = article ? getTags(article) : [];
  const seoData = article ? getSEOData(article) : { title: '', description: '', ogImage: '', robots: '' };
  
  // JSON-LD Schema
  const schemaJsonLd = article?.meta?.schema_jsonld;

  // Custom BlogPosting schema to guarantee publication date and author visibility for AEO / Search engines
  const generatedSchema = article ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#blogposting`,
    "isPartOf": {
      "@type": "WebPage",
      "@id": canonicalUrl,
      "url": canonicalUrl,
      "name": seoData.title
    },
    "headline": articleTitle,
    "description": seoData.description,
    "image": seoData.ogImage || articleImage,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Organization",
      "name": "BinkoO Digital Lab",
      "url": "https://binkoo.digital"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BinkoO Digital Lab",
      "logo": {
        "@type": "ImageObject",
        "url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/BinkoO-Digital-Lab-PNG-1760749121547.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  } : null;

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;

      try {
        setIsLoading(true);
        setErrorMsg(null);
        const post = await getPostBySlug(slug);
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
  }, [slug]);

  useEffect(() => {
    if (article && !isLoading) {
      trackBlogArticleView(articleTitle, slug || '');
    }
  }, [article, isLoading, slug, articleTitle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Référence pour le contenu de l'article
  const contentRef = useRef<HTMLDivElement>(null);

  // Appliquer le style AEO sur les "Quick Answers" et l'alternance sur les <strong>
  useEffect(() => {
    if (!contentRef.current || !article) return;

    // 1. Détection et stylisation des "Quick Answer Blocks" pour l'AEO
    // Selon la stratégie AEO : un Quick Answer block est une réponse directe de 40-50 mots située juste après un H2 en question.
    // Nous allons détecter les paragraphes <p> qui suivent immédiatement un <h2> et qui contiennent du gras (<strong>).
    const h2Elements = contentRef.current.querySelectorAll('h2');
    h2Elements.forEach(h2 => {
      const nextSibling = h2.nextElementSibling;
      if (nextSibling && nextSibling.tagName.toLowerCase() === 'p') {
        const p = nextSibling as HTMLElement;
        // Si le texte commence par <strong> ou contient un <strong> (ce qui est la consigne pour les Quick Answers)
        if (p.querySelector('strong') || p.querySelector('b')) {
          p.style.backgroundColor = 'rgba(59, 130, 246, 0.08)'; // Bleu très léger (bg-blue-50/bg-primary/10)
          p.style.borderLeft = '4px solid #3B82F6';
          p.style.padding = '1.25rem 1.5rem';
          p.style.borderRadius = '0 0.5rem 0.5rem 0';
          p.style.marginTop = '1.5rem';
          p.style.marginBottom = '2rem';
          p.style.fontSize = '1.05rem';
          p.style.lineHeight = '1.7';
          // On peut aussi ajouter un pseudo-élément ou un attribut, mais les styles inline suffisent
          p.setAttribute('data-aeo', 'quick-answer');
        }
      }
    });

    // 2. Alternance de couleurs sur les autres <strong> (comme précédemment)
    const strongElements = contentRef.current.querySelectorAll('strong');
    strongElements.forEach((el, index) => {
      const htmlEl = el as HTMLElement;
      // On ne colore pas les <strong> à l'intérieur d'un bloc Quick Answer s'ils sont le bloc lui-même, 
      // ou on peut le garder pour faire ressortir les mots-clés. Gardons-le.
      if (index % 2 === 0) {
        htmlEl.style.backgroundColor = '#E5002E'; // Rouge
        htmlEl.style.color = '#FFFFFF';
        htmlEl.style.padding = '0 0.2rem';
        htmlEl.style.borderRadius = '0.2rem';
      } else {
        htmlEl.style.backgroundColor = '#3B82F6'; // Bleu
        htmlEl.style.color = '#FFFFFF';
        htmlEl.style.padding = '0 0.2rem';
        htmlEl.style.borderRadius = '0.2rem';
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
        trackSocialClick(`Share Native: ${articleTitle}`);
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
        trackSocialClick(`Share Clipboard: ${articleTitle}`);
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
      {generatedSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(generatedSchema)}
          </script>
        </Helmet>
      )}
      {schemaJsonLd && (
        <Helmet>
          <script type="application/ld+json">
            {schemaJsonLd}
          </script>
        </Helmet>
      )}
      <article className="min-h-screen bg-background" itemScope itemType="https://schema.org/BlogPosting">
        <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
          <img
            src={articleImage}
            alt={articleTitle}
            className="w-full h-full object-cover"
            itemProp="image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>


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
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight" itemProp="headline">
                  {articleTitle}
                </h1>
                <div className="flex items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={article.date} itemProp="datePublished" className="text-sm">
                      {formatDate(article.date)}
                    </time>
                    <meta itemProp="dateModified" content={article.date} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{articleReadTime} de lecture</span>
                  </div>
                  <div className="hidden" itemProp="author" itemScope itemType="https://schema.org/Organization">
                    <meta itemProp="name" content="BinkoO Digital Lab" />
                    <meta itemProp="url" content="https://binkoo.digital" />
                  </div>
                  <div className="hidden" itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                    <meta itemProp="name" content="BinkoO Digital Lab" />
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
                itemProp="articleBody"
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
                  href="#"
                  onClick={(e) => { e.preventDefault(); trackDevisClick(`blog_article_footer_${slug}`); openWhatsApp(`blog_article_${slug}`); }}
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
      </article>
    </>
  );
}
