import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Calendar, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import {
    getPostsByTagSlug,
    type BlogPost,
    stripHtmlTags,
    extractText,
    getFeaturedImage
} from "@/services/blogService";

export default function TagPage() {
    const { slug } = useParams();
    const [articles, setArticles] = useState<BlogPost[]>([]);
    const [tagName, setTagName] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        const loadArticles = async () => {
            if (!slug) return;

            try {
                setIsLoading(true);
                setErrorMsg(null);
                const { posts, tagName } = await getPostsByTagSlug(slug);
                setArticles(posts);
                setTagName(tagName);
            } catch (error) {
                console.error(`Erreur lors du chargement des articles pour le tag ${slug}:`, error);
                setErrorMsg("Impossible de charger les articles associés à ce tag.");
            } finally {
                setIsLoading(false);
            }
        };

        loadArticles();
    }, [slug]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <>
            <SEO
                title={`Articles tagués ${tagName ? '#' + tagName : ''}`}
                description={`Découvrez tous nos articles et expertises concernant la thématique ${tagName || slug}.`}
            />
            <div className="pt-24 lg:pt-32 pb-16 min-h-screen bg-background relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="container-fluid relative z-10">
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium mb-4"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour au blog
                        </Link>
                    </motion.div>

                    <AnimatedSection animation="fade-up" className="mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6">
                            Articles tagués <span className="text-primary">{tagName ? `#${tagName}` : ''}</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            Explorez toutes nos publications, analyses et ressources liées à ce sujet spécifique.
                        </p>
                    </AnimatedSection>

                    {isLoading && (
                        <div className="flex justify-center items-center py-20">
                            <div className="text-center">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                                <p className="text-muted-foreground">Recherche des articles en cours...</p>
                            </div>
                        </div>
                    )}

                    {!isLoading && errorMsg && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 text-center text-red-500">
                            <div className="text-4xl mb-4">⚠️</div>
                            <h2 className="text-xl font-bold mb-2">Une erreur est survenue</h2>
                            <p>{errorMsg}</p>
                        </div>
                    )}

                    {!isLoading && !errorMsg && articles.length === 0 && (
                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-8 text-center text-orange-500">
                            <div className="text-4xl mb-4">📭</div>
                            <h2 className="text-xl font-bold mb-2">Aucun article trouvé</h2>
                            <p>Il n'y a actuellement aucun article associé à ce tag.</p>
                        </div>
                    )}

                    {!isLoading && articles.length > 0 && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.map((article, index) => {
                                const articleTitle = stripHtmlTags(extractText(article.title));
                                const articleExcerpt = stripHtmlTags(extractText(article.excerpt));
                                const articleImage = getFeaturedImage(article);

                                return (
                                    <motion.article
                                        key={article.id}
                                        className="group bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        whileHover={{ y: -8 }}
                                    >
                                        <Link to={`/blog/${article.slug}`} className="block h-full flex flex-col">
                                            <div className="relative h-56 overflow-hidden">
                                                <img
                                                    src={articleImage}
                                                    alt={articleTitle}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <span className="text-white font-semibold flex items-center gap-2">
                                                        Lire <ExternalLink className="w-4 h-4" />
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-6 md:p-8 flex-1 flex flex-col">
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(article.date)}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                                    {articleTitle}
                                                </h3>

                                                <p className="text-muted-foreground line-clamp-3 mb-6 bg-transparent flex-1" dangerouslySetInnerHTML={{ __html: articleExcerpt }} />

                                                <div className="mt-auto pt-4 border-t border-border flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                                                    Lire l'article
                                                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
