import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Zap, Database, Search, Globe, Bot, Bell, Server, Code2, Layers, Cpu, Send, FileText, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedParagraph, AnimatedImage, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { Contact2 } from '@/components/Contact2';
import { openWhatsApp } from '@/utils/whatsapp';
import SEO from '@/components/SEO';

// ============================================================
// 📸 CONFIGURATION DES IMAGES (Collez vos liens entre les guillemets)
// ============================================================
const IMAGES = {
  // 1. IMAGE HERO (Workflow n8n complet)
  hero: 'https://res.cloudinary.com/dchyxe0jj/image/upload/q_auto/f_auto/v1776544184/Capture_d_%C3%A9cran_2026-04-18_200909_fcxipu.png',

  // 2. BASE DE DONNÉES (Capture de votre historique de publication)
  supabase: 'https://res.cloudinary.com/dchyxe0jj/image/upload/q_auto/f_auto/v1776544183/Capture_d_%C3%A9cran_2026-04-18_201411_wxmkuo.png',

  // 3. RÉDACTION (Capture d'un article ouvert dans l'éditeur WordPress)
  articleWP: 'https://res.cloudinary.com/dchyxe0jj/image/upload/q_auto/f_auto/v1776544185/Capture_d_%C3%A9cran_2026-04-18_202515_eyb6be.png',

  // 4. RENDU FINAL (Capture de la page blog.binkoo.digital)
  blogPublished: 'https://res.cloudinary.com/dchyxe0jj/image/upload/q_auto/f_auto/v1776544185/Capture_d_%C3%A9cran_2026-04-18_202604_w5yo4t.png',

  // 5. DIFFUSION (Capture de la notification sur votre téléphone/Telegram)
  telegram: 'https://res.cloudinary.com/dchyxe0jj/image/upload/q_auto/f_auto/v1776544183/Capture_d_%C3%A9cran_2026-04-18_202858_uzgnja.png',
};

const techStack = [
  { name: 'n8n', icon: Zap },
  { name: 'Base de données cloud', icon: Database },
  { name: 'IA Générative', icon: Bot },
  { name: 'IA de Synthèse', icon: Cpu },
  { name: 'Recherche Web IA', icon: Search },
  { name: 'WordPress', icon: Layers },
  { name: 'Google Indexing', icon: Globe },
  { name: 'Unsplash', icon: ImageIcon },
  { name: 'Telegram', icon: Send },
  { name: 'VPS Linux', icon: Server },
];

const pipelineSteps = [
  { icon: Zap, label: 'Planification automatique', color: 'from-yellow-500 to-orange-500' },
  { icon: Database, label: 'Sélection catégorie', color: 'from-red-400 to-red-500' },
  { icon: Bot, label: 'IA Générative', color: 'from-blue-500 to-indigo-500' },
  { icon: Search, label: 'Recherche web intelligente', color: 'from-purple-500 to-violet-500' },
  { icon: Cpu, label: 'Synthèse des sources', color: 'from-pink-500 to-rose-500' },
  { icon: FileText, label: 'Rédaction riche', color: 'from-red-500 to-red-600' },
  { icon: Code2, label: 'Mise en forme HTML', color: 'from-amber-500 to-yellow-600' },
  { icon: ImageIcon, label: 'Images de qualité', color: 'from-teal-500 to-cyan-500' },
  { icon: Globe, label: 'Publication WordPress', color: 'from-blue-600 to-blue-700' },
  { icon: Search, label: 'Indexation Google', color: 'from-sky-500 to-sky-600' },
  { icon: Send, label: 'Notification Telegram', color: 'from-sky-500 to-blue-500' },
];

const CaseStudyBlogAutomation: React.FC = () => {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsApp();
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Pipeline de Publication Autonome : Automatisation du Contenu SEO avec n8n et l'IA",
    "description": "Comment BinkoO Digital Lab a construit un système qui crée, publie et indexe des articles de blog optimisés SEO — 3 fois par semaine, sans intervention humaine.",
    "image": IMAGES.hero,
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
        "url": "https://binkoo.digital/logo.png"
      }
    },
    "datePublished": "2024-04-18T08:00:00+00:00",
    "dateModified": "2024-04-18T08:00:00+00:00"
  };

  return (
    <>
      <SEO
        title="Automatisation de Contenu SEO avec n8n et IA au Burkina Faso — Pipeline de Publication Autonome | BinkoO Digital Lab"
        description="Découvrez comment BinkoO Digital Lab a conçu un pipeline de publication autonome avec n8n, l'intelligence artificielle et WordPress. Automatisation de contenu SEO, architecture multi-agents et indexation Google proactive pour le marché africain."
        canonical="https://binkoo.digital/realisations/automatisation-blog-seo"
        keywords="automatisation contenu SEO Afrique, pipeline publication autonome n8n, automatisation blog WordPress Burkina Faso, workflow n8n IA, génération contenu automatique, agence automatisation Afrique de l'Ouest, SEO automatisé Burkina Faso, publication automatique WordPress, indexation Google API, automatisation marketing digital Afrique, pipeline rédaction article IA, BinkoO Digital Lab automatisation"
        schema={[articleSchema]}
      />

      {/* ==================== HERO SECTION ==================== */}
      <div className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Hero image if available */}
        {IMAGES.hero && (
          <>
            <img
              src={IMAGES.hero}
              alt="Workflow n8n — Pipeline de publication autonome BinkoO Digital Lab"
              className="w-full h-full object-cover absolute inset-0 opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-gray-950/40" />
          </>
        )}

        <div className="relative z-10 flex flex-col justify-end min-h-[60vh] md:min-h-[70vh] px-4 sm:px-6 lg:px-8 pt-20 md:pt-32 pb-12 md:pb-16 lg:pb-20">
          <div className="max-w-7xl mx-auto w-full">
            <Link
              to="/realisations"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux réalisations
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/90 text-white rounded-full text-xs md:text-sm font-semibold mb-6 tracking-wide uppercase">
                Étude de cas — Automatisation IA
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-tight max-w-5xl">
                Pipeline de Publication Autonome : Automatisation du Contenu SEO avec n8n, l'IA et une Architecture Multi-Agents
              </h1>
              <p className="text-lg md:text-xl text-white/75 max-w-3xl leading-relaxed">
                Comment BinkoO Digital Lab a construit un système qui crée, publie et indexe des articles de blog optimisés SEO — 3 fois par semaine, sans intervention humaine.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ==================== TECH STACK BADGES ==================== */}
      <AnimatedSection animation="fade-up">
        <div className="bg-muted/30 border-y border-border py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <tech.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ==================== PIPELINE VISUEL ==================== */}
      <AnimatedSection animation="fade-up">
        <div className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Le circuit de l'information, du déclenchement à la notification</h2>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {pipelineSteps.map((step, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-lg bg-background border border-border shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                      <step.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs md:text-sm font-medium whitespace-nowrap">{step.label}</span>
                  </motion.div>
                  {index < pipelineSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 hidden sm:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ==================== CONTENU PRINCIPAL ==================== */}
      <div className="py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          {/* --- L'Essentiel --- */}
          <AnimatedSection animation="fade-up">
            <section className="mb-16 md:mb-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                L'Essentiel de l'Automatisation
              </h2>
              <div className="space-y-5 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                <p>
                  Ce projet est un <strong>pipeline de publication de contenu entièrement autonome</strong>, conçu et exploité en interne par <Link to="/a-propos" className="text-primary hover:underline">BinkoO Digital Lab</Link>. Il s'exécute <strong>trois fois par semaine</strong> sans intervention humaine, du choix du sujet à la notification Telegram de publication.
                </p>
                <p>
                  Chaque étape est orchestrée par <strong>n8n</strong> (hébergé sur notre propre serveur privé), avec une <strong>architecture multi-agents</strong> où trois modèles d'intelligence artificielle distincts jouent des rôles complémentaires — aucun ne fait le travail d'un autre. Cette approche de <strong>séparation des responsabilités</strong> est au cœur de la fiabilité du système pour le <strong>marché digital africain</strong>.
                </p>
              </div>

              {/* Pipeline résumé en blockquote */}
              <div className="mt-8 bg-gray-950 text-gray-100 rounded-xl p-5 md:p-7 font-mono text-sm md:text-base leading-relaxed border border-gray-800 overflow-x-auto">
                <p className="text-red-400 mb-3">{'// Circuit complet du pipeline'}</p>
                <p className="text-gray-400">Planification automatique</p>
                <p className="text-gray-400">→ Sélection de catégorie intelligente</p>
                <p className="text-gray-400">→ Génération du titre par IA <span className="text-yellow-400">(modèle spécialisé)</span></p>
                <p className="text-gray-400">→ Recherche web temps réel <span className="text-yellow-400">(API dédiée)</span></p>
                <p className="text-gray-400">→ Synthèse des sources <span className="text-yellow-400">(IA de compression)</span></p>
                <p className="text-gray-400">→ Rédaction d'article 2 000 mots <span className="text-yellow-400">(IA rédactrice)</span></p>
                <p className="text-gray-400">→ Mise en forme HTML</p>
                <p className="text-gray-400">→ Image libre de droits</p>
                <p className="text-gray-400">→ Publication WordPress <span className="text-yellow-400">(API REST)</span></p>
                <p className="text-gray-400">→ Indexation Google <span className="text-yellow-400">(Indexing API)</span></p>
                <p className="text-red-400">→ Notification Telegram ✓</p>
              </div>
            </section>
          </AnimatedSection>

          {/* --- IMAGE SECTION 1 --- */}
          {IMAGES.hero && (
            <AnimatedImage delay={0.2}>
              <div className="group mb-16 md:mb-20 rounded-2xl overflow-hidden border border-border shadow-lg">
                <div className="overflow-hidden">
                  <img
                    src={IMAGES.hero}
                    alt="Workflow n8n complet — Pipeline de publication autonome pour contenu SEO au Burkina Faso"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="bg-muted/50 px-5 py-3 text-sm text-muted-foreground border-t border-border/50">
                  <strong>Workflow n8n complet</strong> — Vue d'ensemble du pipeline de publication automatique avec les nœuds d'orchestration, les agents IA et les API de diffusion.
                </div>
              </div>
            </AnimatedImage>
          )}

          {/* --- L'inefficacité de l'ancien modèle --- */}
          <AnimatedSection animation="fade-up">
            <section className="mb-16 md:mb-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                L'Inefficacité de l'Ancien Modèle
              </h2>
              <div className="space-y-5 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                <p>
                  Avant ce pipeline, la production de contenu pour <strong>blog.binkoo.digital</strong> suivait un schéma classique mais coûteux en ressources humaines. Un schéma que connaissent la plupart des <strong>entreprises et agences digitales en Afrique de l'Ouest</strong> qui tentent de maintenir un blog SEO actif.
                </p>
              </div>

              <StaggerContainer className="mt-8 space-y-4" staggerChildren={0.08}>
                {[
                  { title: 'Recherche manuelle des sujets', desc: 'Identifier un sujet pertinent, vérifier qu\'il n\'a pas déjà été traité, évaluer son potentiel SEO — tout cela représentait une charge cognitive non négligeable avant même d\'écrire une ligne.' },
                  { title: 'Rédaction entièrement humaine', desc: 'Pour atteindre 1 400 à 2 000 mots avec une localisation africaine rigoureuse, des heures de travail rédactionnel étaient nécessaires par article.' },
                  { title: 'Processus de publication fragmenté', desc: 'Rédaction dans un éditeur, mise en forme HTML manuelle, recherche et téléchargement d\'image, upload vers WordPress, configuration des métadonnées, soumission à Google Search Console — autant d\'étapes séquentielles toutes dépendantes d\'une action humaine.' },
                  { title: 'Aucune cohérence de fréquence', desc: 'Sans automatisation, la régularité de publication dépendait de la disponibilité de l\'équipe. Le SEO est pénalisé par l\'irrégularité.' },
                  { title: 'Risque de redondance thématique', desc: 'Sans mémoire centralisée des sujets déjà traités par catégorie, les doublons et les angles répétitifs étaient inévitables à terme.' },
                  { title: 'Zéro indexation proactive', desc: 'L\'indexation Google était passive, dépendante du crawl organique — un processus qui peut prendre des jours, voire des semaines.' },
                ].map((item, idx) => (
                  <StaggerItem key={idx} variant="fade-up">
                    <div className="flex items-start gap-4 bg-red-500/5 border border-red-500/10 rounded-xl p-4 md:p-5">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <AnimatedParagraph delay={0.3}>
                <p className="mt-8 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-5">
                  Le résultat : un blog sous-alimenté, une cadence imprévisible, et un potentiel SEO largement inexploité — malgré une expertise réelle sur les sujets traités. C'est un problème que rencontrent la majorité des <strong>entreprises digitales au Burkina Faso et en Afrique subsaharienne</strong>.
                </p>
              </AnimatedParagraph>
            </section>
          </AnimatedSection>

          {/* --- Sous le capot : Architecture --- */}
          <AnimatedSection animation="fade-up">
            <section className="mb-16 md:mb-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Sous le Capot : l'Ingénierie du Workflow
              </h2>
              <p className="text-[15px] md:text-[17px] text-muted-foreground leading-relaxed mb-8">
                Le workflow est structuré en <strong>trois grandes phases</strong> qui se succèdent de manière asynchrone. Chaque phase communique avec la suivante via des données structurées JSON, rendant le pipeline <strong>modulaire et maintenable</strong>.
              </p>

              {/* Architecture diagram */}
              <div className="bg-gray-950 text-gray-100 rounded-xl p-5 md:p-7 font-mono text-sm md:text-base border border-gray-800 mb-10">
                <p className="text-red-400 mb-4">{'// Architecture en 3 phases'}</p>
                <div className="space-y-2">
                  <p><span className="text-yellow-400">[PHASE 1 : DÉCISION]</span>{'     '}<span className="text-gray-300">Que publier ? Pour quelle audience ?</span></p>
                  <p><span className="text-blue-400">[PHASE 2 : PRODUCTION]</span>{'   '}<span className="text-gray-300">Que rechercher ? Que rédiger ?</span></p>
                  <p><span className="text-sky-400">[PHASE 3 : DIFFUSION]</span>{'    '}<span className="text-gray-300">Où publier ? Comment indexer ?</span></p>
                </div>
              </div>

              {/* Phase 1 */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-xl md:text-2xl">Phase 1 — Décision Intelligente du Sujet</h3>
                </div>
                <div className="bg-muted/30 rounded-xl p-6 md:p-8 border border-border/50 space-y-4 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                  <div className="font-mono text-xs md:text-sm bg-gray-950 text-gray-400 rounded-lg px-4 py-2.5 overflow-x-auto">
                    Déclencheur automatique → Configuration → Chargement des catégories → Filtre → Vérification historique (Base de données) → Sélection de la moins utilisée
                  </div>
                  <p>
                    Le workflow démarre automatiquement <strong>trois fois par semaine</strong> (lundi, mercredi, vendredi à 7h00). La première décision qu'il doit prendre est : <em>sur quelle catégorie publier aujourd'hui ?</em>
                  </p>
                  <p>
                    Cette décision n'est pas aléatoire. Le système interroge une <strong>base de données cloud</strong> qui conserve l'historique complet de chaque publication par catégorie, avec horodatage. L'algorithme de sélection accorde une <strong>priorité absolue aux catégories jamais utilisées</strong>, puis classe les autres par date de dernière utilisation (la plus ancienne en premier). Résultat : une rotation équilibrée entre les 6 catégories actives du blog, sans intervention humaine.
                  </p>
                  <p>
                    Les catégories WordPress sont chargées dynamiquement via l'<strong>API REST WordPress</strong>, filtrées automatiquement pour exclure les catégories système et les doublons. La configuration centrale est isolée dans un nœud dédié, ce qui permet de déployer le même workflow sur un autre site WordPress en modifiant un seul paramètre.
                  </p>
                </div>

                {/* IMAGE SUBAPASE / DB */}
                {IMAGES.supabase && (
                  <AnimatedImage delay={0.2}>
                    <div className="group mt-8 rounded-xl overflow-hidden border border-border/50 shadow-md">
                      <div className="overflow-hidden">
                        <img src={IMAGES.supabase} alt="Mémoire éditoriale - Base de données cloud" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="bg-muted/30 px-4 py-2 text-xs text-muted-foreground italic border-t border-border/50">
                        Visualisation de la mémoire éditoriale : le système sait exactement ce qui a été publié et quand.
                      </div>
                    </div>
                  </AnimatedImage>
                )}
              </div>

              {/* Phase 2a */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-xl md:text-2xl">Phase 2a — Génération du Titre et des Mots-clés</h3>
                </div>
                <div className="bg-muted/30 rounded-xl p-6 md:p-8 border border-border/50 space-y-4 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                  <div className="font-mono text-xs md:text-sm bg-gray-950 text-gray-400 rounded-lg px-4 py-2.5 overflow-x-auto">
                    Historique des titres (Base de données) → Agent IA Titre → Analyse JSON → Suggestions Google → Titre final validé
                  </div>
                  <p>
                    Avant de générer un titre, le workflow interroge la base de données pour récupérer les <strong>50 derniers titres publiés</strong> dans la catégorie sélectionnée. Ces titres sont injectés comme liste d'interdictions : l'IA ne peut pas recycler un angle déjà traité. Cela garantit la <strong>fraîcheur éditoriale</strong> sur le long terme.
                  </p>
                  <p>
                    Le modèle d'IA utilisé est spécifiquement sélectionné pour sa rapidité et sa précision. Son rôle est clair : générer un titre accrocheur optimisé SEO avec une <strong>contrainte géographique obligatoire</strong> (référence à l'Afrique de l'Ouest ou au Burkina Faso), et produire un mot-clé graine associé. La sortie est formatée en <strong>JSON structuré</strong>, analysée automatiquement avec gestion des erreurs.
                  </p>
                  <p>
                    En parallèle, les suggestions <strong>Google Autocomplete</strong> sont interrogées pour ce mot-clé, fournissant un cluster de mots-clés longue traîne réels — ce que les utilisateurs cherchent réellement sur le <strong>marché africain</strong>. Le système s'adapte ainsi à la demande réelle.
                  </p>
                </div>
              </div>

              {/* Phase 2b */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-xl md:text-2xl">Phase 2b — Recherche et Synthèse des Sources</h3>
                </div>
                <div className="bg-muted/30 rounded-xl p-6 md:p-8 border border-border/50 space-y-4 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                  <div className="font-mono text-xs md:text-sm bg-gray-950 text-gray-400 rounded-lg px-4 py-2.5 overflow-x-auto">
                    Recherche web avancée (4 sources) → Agent IA Synthétiseur → Nettoyage et vérification des sources
                  </div>
                  <p>
                    La recherche web est confiée à une <strong>API de recherche spécialisée pour l'IA</strong>. Contrairement à une recherche Google classique, cette API retourne non seulement les résultats mais le <strong>contenu brut complet des pages</strong> — idéal pour alimenter un modèle de synthèse avec des données réelles et vérifiées.
                  </p>
                  <p>
                    Ce contenu brut est transmis à l'<strong>Agent Synthétiseur</strong>, une IA spécialement choisie pour sa capacité à <strong>extraire l'essentiel de grandes quantités de texte</strong>. Son rôle : produire un <strong>brief de rédaction structuré</strong> en 5 sections — contexte et enjeux, points clés, exemples concrets, données vérifiées, sources utilisables.
                  </p>
                  <p>
                    Un point critique de notre architecture : l'IA est explicitement <strong>interdite de générer des liens web</strong>. Les URLs citées dans les articles sont extraites directement depuis les résultats de recherche réels, puis nettoyées et vérifiées par un script dédié. Cette <strong>séparation des responsabilités</strong> — l'IA synthétise, le code vérifie — garantit l'intégrité des sources citées dans chaque article.
                  </p>
                </div>
              </div>

              {/* Phase 2c */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-xl md:text-2xl">Phase 2c — Rédaction de l'Article</h3>
                </div>
                <div className="bg-muted/30 rounded-xl p-6 md:p-8 border border-border/50 space-y-4 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                  <div className="font-mono text-xs md:text-sm bg-gray-950 text-gray-400 rounded-lg px-4 py-2.5 overflow-x-auto">
                    Pause de sécurité → Agent IA Rédacteur → Mise en forme finale (Script dédié)
                  </div>
                  <p>
                    La rédaction est confiée à un <strong>modèle d'IA performant spécialement sélectionné pour la génération de textes longs</strong>. Ce modèle reçoit un brief complet contenant : le contexte temporel exact (date du jour), le titre, le mot-clé principal, le cluster SEO, le brief de recherche, les sources validées, et des instructions strictes : <strong>HTML pur, minimum 2 000 mots, localisation Afrique de l'Ouest obligatoire</strong>.
                  </p>
                  <p>
                    L'article produit est du <strong>HTML natif</strong> directement publiable sur WordPress — sans retouche éditoriale. Il intègre du <strong>maillage interne</strong> (liens vers nos pages de services et de contact), du maillage externe avec sources vérifiées, une section <em>Décryptage Stratégique</em> signée BinkoO Digital Lab, et un appel à l'action en fin d'article.
                  </p>
                  <p>
                    Un script de formatage final extrait automatiquement trois éléments : le HTML de l'article, la liste de tags SEO, et la requête de recherche d'image. Il optimise également la structure pour éviter les doublons de titres avec WordPress.
                  </p>
                </div>

                {/* IMAGE ARTICLE WP */}
                {IMAGES.articleWP && (
                  <AnimatedImage delay={0.2}>
                    <div className="group mt-8 rounded-xl overflow-hidden border border-border/50 shadow-md">
                      <div className="overflow-hidden">
                        <img src={IMAGES.articleWP} alt="Article généré dans WordPress" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="bg-muted/30 px-4 py-2 text-xs text-muted-foreground italic border-t border-border/50">
                        Rendu d'un article de 2000 mots généré : structure HTML parfaite et optimisation SEO native.
                      </div>
                    </div>
                  </AnimatedImage>
                )}
              </div>

              {/* Phase 3 */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-xl md:text-2xl">Phase 3 — Diffusion Multi-canal</h3>
                </div>
                <div className="bg-muted/30 rounded-xl p-6 md:p-8 border border-border/50 space-y-4 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                  <div className="font-mono text-xs md:text-sm bg-gray-950 text-gray-400 rounded-lg px-4 py-2.5 overflow-x-auto">
                    Image libre de droits → Upload WordPress → Assemblage du post → Publication → Indexation Google → Notification Telegram
                  </div>
                  <p>
                    Une image de qualité professionnelle est automatiquement sélectionnée en fonction du sujet de l'article, téléchargée puis uploadée directement sur WordPress. Elle est définie comme <strong>image à la une</strong> de l'article — tout cela sans aucune action manuelle.
                  </p>
                  <p>
                    Le système assemble ensuite automatiquement toutes les données : titre, contenu HTML, catégorie WordPress, image, et tags SEO. L'article est publié via l'<strong>API REST WordPress</strong> avec un slug SEO optimisé et pré-calculé.
                  </p>
                  <p>
                    Immédiatement après publication, le workflow soumet l'URL à l'<strong>API Google Indexing</strong> pour une <strong>indexation proactive</strong> — Google est notifié directement, sans attendre son passage naturel. Le sitemap est régénéré. La chaîne se termine par une <strong>notification Telegram</strong> automatique contenant le titre, la catégorie et le lien direct de l'article.
                  </p>
                </div>
              </div>
            </section>
          </AnimatedSection>

          {/* --- IMAGE SECTION 2 --- */}
          {IMAGES.blogPublished && (
            <AnimatedImage delay={0.2}>
              <div className="group mb-16 md:mb-20 rounded-2xl overflow-hidden border border-border shadow-lg">
                <div className="overflow-hidden">
                  <img
                    src={IMAGES.blogPublished}
                    alt="Blog BinkoO Digital Lab — Articles SEO publiés automatiquement par le pipeline d'automatisation"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="bg-muted/50 px-5 py-3 text-sm text-muted-foreground border-t border-border/50">
                  <strong>Blog en production</strong> — Articles publiés, indexés et accessibles sur blog.binkoo.digital grâce au pipeline d'automatisation.
                </div>
              </div>
            </AnimatedImage>
          )}

          {/* --- Valeur Ajoutée --- */}
          <AnimatedSection animation="fade-up">
            <section className="mb-16 md:mb-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                La Valeur Ajoutée Opérationnelle
              </h2>
              <StaggerContainer className="grid md:grid-cols-2 gap-5" staggerChildren={0.08}>
                {[
                  { icon: Zap, title: 'Fonctionnement 24/7 sans supervision', desc: 'Le pipeline s\'exécute en dehors des heures de travail, sans intervention humaine entre le déclenchement et la notification de fin.' },
                  { icon: Database, title: 'Mémoire éditoriale centralisée', desc: 'Une base de données sécurisée conserve l\'historique complet des publications par catégorie. Le risque de redondance thématique est structurellement éliminé.' },
                  { icon: Check, title: 'Intégrité des sources garantie', desc: 'Les URLs citées proviennent directement d\'une recherche web en temps réel (données actualisées), non de la mémoire du modèle d\'IA. Cela garantit la véracité des faits.' },
                  { icon: Code2, title: 'HTML publiable sans retouche', desc: 'L\'article sort du pipeline dans un format directement compatible WordPress, avec balises sémantiques, maillage interne/externe, et métadonnées SEO complètes.' },
                  { icon: Search, title: 'Indexation Google proactive', desc: 'Chaque article est soumis à Google dès sa publication, sans attendre le crawl organique — un avantage décisif pour le référencement au Burkina Faso et en Afrique.' },
                  { icon: Layers, title: 'Architecture découplée et maintenable', desc: 'Chaque nœud a une responsabilité unique. Remplacer un modèle d\'IA, changer d\'API d\'image, ou ajouter un canal de diffusion se fait sans toucher aux autres composants.' },
                ].map((item, idx) => (
                  <StaggerItem key={idx} variant="fade-up">
                    <div className="h-full bg-background rounded-2xl p-6 shadow-lg border border-border hover:border-primary/30 transition-all duration-300">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center mb-4">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-base md:text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          </AnimatedSection>

          {/* --- Bandeau Impact --- */}
          <AnimatedSection animation="fade-up">
            <motion.div
              className="mb-16 md:mb-20 p-8 md:p-10 lg:p-12 rounded-xl"
              style={{
                background: 'linear-gradient(225deg, hsla(0, 96%, 56%, 1) 0%, hsla(0, 92%, 20%, 1) 80%)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-white text-center">
                <div>
                  <p className="text-3xl md:text-4xl font-bold mb-2">3x</p>
                  <p className="text-sm md:text-base text-white/80">publications par semaine, sans intervention humaine</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold mb-2">3 IA</p>
                  <p className="text-sm md:text-base text-white/80">agents spécialisés (Titre, Synthèse, Rédaction)</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold mb-2">2 000+</p>
                  <p className="text-sm md:text-base text-white/80">mots par article, optimisés SEO avec sources vérifiées</p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* --- Perspectives --- */}
          <AnimatedSection animation="fade-up">
            <section className="mb-16 md:mb-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Perspectives et Évolutivité
              </h2>
              <div className="space-y-5 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed mb-8">
                <p>
                  Cette infrastructure est conçue pour absorber une <strong>montée en charge significative</strong> sans refonte architecturale. Chaque composant du pipeline est indépendant et paramétrique, permettant une <strong>évolutivité horizontale</strong> immédiate.
                </p>
              </div>

              <StaggerContainer className="space-y-4" staggerChildren={0.1}>
                {[
                  { title: 'Scaling horizontal immédiat', desc: 'Le système peut être configuré pour publier 7 jours sur 7 sans modification majeure. La logique de sélection s\'adapte automatiquement via l\'historique enregistré.' },
                  { title: 'Multi-sites', desc: 'L\'architecture est paramétrique. Le nœud Config centralise le domaine et les credentials WordPress. Déployer le même pipeline sur un second site client nécessite uniquement la duplication du workflow et la modification de ce nœud.' },
                  { title: 'Extension des canaux de diffusion', desc: 'L\'ajout d\'une publication automatique sur LinkedIn, d\'un envoi newsletter (Mailchimp, Brevo), ou d\'un post sur WhatsApp Business Channel suit la même logique : un nœud supplémentaire en bout de chaîne, sans impact sur le pipeline de production.' },
                  { title: 'Intégration CRM et lead generation', desc: 'Les articles publiés contiennent des CTAs vers binkoo.digital. Un nœud supplémentaire pourrait écouter les soumissions de formulaire et les injecter directement dans un CRM (Notion, Airtable, HubSpot) — fermant la boucle entre contenu SEO et acquisition client.' },
                  { title: 'Adaptation sectorielle', desc: 'Le même pipeline peut être déployé pour n\'importe quelle verticale éditoriale en Afrique de l\'Ouest — e-commerce, immobilier, santé, finance — en adaptant simplement les paramètres de recherche.' },
                ].map((item, idx) => (
                  <StaggerItem key={idx} variant="fade-up">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          </AnimatedSection>

          {/* --- Stack Technologique --- */}
          <AnimatedSection animation="fade-up">
            <section className="mb-16 md:mb-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Stack Technologique Complète
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base border-collapse">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-3 px-4 font-bold">Composant</th>
                      <th className="text-left py-3 px-4 font-bold">Technologie</th>
                      <th className="text-left py-3 px-4 font-bold">Rôle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Orchestration', 'n8n (auto-hébergé)', 'Exécution et coordination du workflow'],
                      ['Hébergement', 'Serveur privé virtuel (VPS Linux)', "Infrastructure d'exécution dédiée"],
                      ['Base de données', 'Base de données cloud (PostgreSQL)', 'Mémoire éditoriale et historique'],
                      ['Recherche web', 'API de recherche spécialisée IA', 'Données sources vérifiées en temps réel'],
                      ['Agent Titre', 'Modèle d\'IA générative', 'Génération titre + mot-clé graine'],
                      ['Agent Synthétiseur', 'Modèle d\'IA de compression', 'Extraction et structuration des sources'],
                      ['Agent Rédacteur', 'Modèle d\'IA rédactrice', 'Rédaction HTML longue (2 000+ mots)'],
                      ['Images', 'Banque d\'images libre de droits', 'Photographies professionnelles'],
                      ['CMS', 'WordPress (API REST)', 'Publication et gestion du contenu'],
                      ['Indexation', 'Google Indexing API', 'Soumission proactive à Google Search'],
                      ['Notifications', 'Telegram Bot API', 'Alertes de publication en temps réel'],
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium text-foreground">{row[0]}</td>
                        <td className="py-3 px-4"><code className="bg-muted px-2 py-0.5 rounded text-sm">{row[1]}</code></td>
                        <td className="py-3 px-4 text-muted-foreground">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </AnimatedSection>

          {/* --- Conclusion --- */}
          <AnimatedSection animation="fade-up">
            <section className="mb-16 md:mb-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Ce Que Ce Projet Dit de Notre Approche
              </h2>
              <div className="space-y-5 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                <p>
                  Ce workflow n'est pas un proof-of-concept. Il est <strong>en production</strong> sur <strong>blog.binkoo.digital</strong> et génère des articles publiés, indexés et accessibles. Chaque composant a été choisi pour sa fiabilité dans un contexte de déploiement réel : <strong>infrastructure maîtrisée</strong>, APIs robustes avec gestion d'erreur, et modèles d'IA sélectionnés pour leur performance et leur accessibilité.
                </p>
                <p>
                  Chez <strong>BinkoO Digital Lab</strong>, nous construisons des systèmes pour des <strong>contextes réels</strong> — connectivité variable, contraintes budgétaires locales, besoins de maintenance autonome. Ce projet en est la démonstration concrète. Il montre ce qui est possible lorsque l'<strong>automatisation intelligente</strong> est mise au service du <strong>référencement naturel en Afrique de l'Ouest</strong>.
                </p>
                <p>
                  Vous avez un processus métier répétitif, une chaîne de production de contenu, un flux de données non automatisé ? <Link to="/services/automatisation-ia" className="text-primary hover:underline font-bold">Découvrez nos solutions d'automatisation IA</Link> ou <strong>discutons de ce que nous pouvons construire ensemble.</strong>
                </p>
              </div>
            </section>
          </AnimatedSection>

          {/* --- IMAGE SECTION 3 (optionnelle) --- */}
          {IMAGES.telegram && (
            <AnimatedImage delay={0.2}>
              <div className="group mb-16 md:mb-20 rounded-2xl overflow-hidden border border-border shadow-lg">
                <div className="overflow-hidden">
                  <img
                    src={IMAGES.telegram}
                    alt="Notification Telegram automatique — Confirmation de publication d'article par le pipeline"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="bg-muted/50 px-5 py-3 text-sm text-muted-foreground border-t border-border/50">
                  <strong>Notification Telegram en temps réel</strong> — Chaque article publié déclenche une alerte avec le titre, la catégorie et le lien direct.
                </div>
              </div>
            </AnimatedImage>
          )}

        </div>

        {/* ==================== CTA FINAL ==================== */}
        <Contact2
          title="Vous avez un processus répétitif à automatiser ?"
          description="Contenu SEO, prospection, scraping, veille — nous concevons des pipelines d'automatisation intelligents pour le marché africain. Discutons de votre prochain workflow."
        />

        {/* Retour aux réalisations */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <Link
            to="/realisations"
            className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Voir toutes nos réalisations
          </Link>
        </div>
      </div>
    </>
  );
};

export default CaseStudyBlogAutomation;
