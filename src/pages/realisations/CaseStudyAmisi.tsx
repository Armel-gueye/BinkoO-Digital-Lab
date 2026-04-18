import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Globe, Shield, Gauge, Code2, Search, Users, Smartphone, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedParagraph, AnimatedImage, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { Contact2 } from '@/components/Contact2';
import { openWhatsApp } from '@/utils/whatsapp';
import SEO from '@/components/SEO';

// ============================================================
// IMAGES DU PROJET — Remplacez les URLs ci-dessous par vos liens
// ============================================================
const IMAGES = {
  // Image principale (Hero) - idéalement un screenshot plein écran du site
  hero: 'https://res.cloudinary.com/dchyxe0jj/image/upload/q_auto/f_auto/v1776527104/Capture_d_%C3%A9cran_2026-04-18_154056_tg8hwf.webp',
  // Capture de la section immobilière / catalogue de biens
  immobilier: 'https://res.cloudinary.com/dpvgwvnk8/image/upload/v1775864911/bw4xjajo8zgzjjok1f47_vgksyg.webp',
  // Capture du blog ou d'une autre section du site
  blog: 'https://res.cloudinary.com/dpvgwvnk8/image/upload/v1775864912/gviku4fku6t2hrm9rjov_rwol81.webp',
  // IMAGE 4 — Ajoutez une capture du back-office WordPress (optionnel)
  backoffice: '',
  // IMAGE 5 — Ajoutez une capture mobile du site (optionnel)
  mobile: '',
};

const techStack = [
  { name: 'React', icon: Code2, description: 'Front-end ultra-rapide et réactif' },
  { name: 'WordPress', icon: Layers, description: 'Back-office CMS robuste et familier' },
  { name: 'Cloudinary', icon: Globe, description: 'Optimisation et diffusion des médias' },
  { name: 'Rank Math', icon: Search, description: 'SEO technique avancé' },
  { name: 'Schema.org', icon: Code2, description: 'Données structurées pour Google' },
  { name: 'Tailwind CSS', icon: Smartphone, description: 'Design responsive mobile-first' },
];

const CaseStudyAmisi: React.FC = () => {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsApp();
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Création d'une Plateforme Web Multisectorielle Haute Performance au Burkina Faso",
    "description": "L'Approche Headless CMS pour A.M.I.S.I Sarl — Comment BinkoO Digital Lab a unifié sept pôles d'expertise au sein d'une interface unique, ultra-rapide et optimisée.",
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
    "datePublished": "2024-03-01T08:00:00+00:00",
    "dateModified": "2024-04-18T08:00:00+00:00"
  };

  return (
    <>
      <SEO
        title="Création Site Web Headless CMS au Burkina Faso — Étude de cas A.M.I.S.I Sarl | BinkoO Digital Lab"
        description="Découvrez comment BinkoO Digital Lab a conçu une plateforme web multisectorielle haute performance pour A.M.I.S.I Sarl à Ouagadougou. Architecture Headless CMS, React, WordPress et SEO technique avancé pour le marché africain."
        canonical="https://binkoo.digital/realisations/amisi-sarl"
        keywords="création site web Burkina Faso, architecture headless CMS Afrique, développement web Ouagadougou, site immobilier Burkina Faso, agence digitale Afrique de l'Ouest, plateforme multisectorielle, React WordPress headless, SEO technique Burkina, site web entreprise BTP Ouagadougou, solution digitale sur-mesure Afrique, développeur web Bobo-Dioulasso, site vitrine professionnel Burkina"
        schema={[articleSchema]}
      />

      {/* ==================== HERO SECTION ==================== */}
      <div className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden">
        <img
          src={IMAGES.hero}
          alt="Plateforme web A.M.I.S.I Sarl — Création site internet Headless CMS Burkina Faso"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        <div className="relative z-10 flex flex-col justify-end min-h-[60vh] md:min-h-[70vh] px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20">
          <div className="max-w-7xl mx-auto w-full">
            <Link
              to="/realisations"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux réalisations
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/90 text-white rounded-full text-xs md:text-sm font-semibold mb-5 tracking-wide uppercase">
                Étude de cas — Site Web Headless
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-tight max-w-4xl">
                Création d'une Plateforme Web Multisectorielle Haute Performance au Burkina Faso
              </h1>
              <p className="text-lg md:text-xl text-white/85 max-w-3xl leading-relaxed">
                L'Approche Headless CMS pour A.M.I.S.I Sarl — Comment BinkoO Digital Lab a unifié sept pôles d'expertise au sein d'une interface unique, ultra-rapide et optimisée pour le marché ouest-africain.
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
                  transition={{ delay: 0.3 + index * 0.08 }}
                >
                  <tech.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ==================== CONTENU PRINCIPAL ==================== */}
      <div className="py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          {/* --- L'Essentiel du Projet --- */}
          <AnimatedSection animation="fade-up">
            <section className="mb-16 md:mb-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                L'Essentiel du Projet
              </h2>
              <div className="space-y-5 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                <p>
                  Pour accompagner la croissance d'<strong>A.M.I.S.I Sarl</strong>, un acteur économique majeur basé à <strong>Ouagadougou au Burkina Faso</strong>, BinkoO Digital Lab a conçu et développé une <strong>plateforme digitale sur-mesure de nouvelle génération</strong>. La vision ? Unifier sept pôles d'expertise distincts — de la <strong>promotion immobilière</strong> au <strong>génie civil (BTP)</strong>, en passant par l'<strong>import-export</strong>, le <strong>forage hydraulique</strong>, le <strong>commerce général</strong> et l'<strong>alimentation fine</strong> — au sein d'une interface unique, ultra-rapide et sécurisée.
                </p>
                <p>
                  Pour relever ce défi, nous avons opté pour une <strong>architecture Headless CMS</strong> : un front-end moderne et réactif propulsé par <strong>React</strong>, couplé à un back-office <strong>WordPress</strong> robuste pour la gestion des données. L'ensemble est renforcé par <strong>Cloudinary</strong> pour la gestion intelligente des médias. Cette <strong>solution digitale au Burkina Faso</strong> redéfinit les standards de l'expérience utilisateur et de la performance technique en <strong>Afrique de l'Ouest</strong>.
                </p>
                <p>
                  Il est essentiel de souligner que ce projet a été réalisé <strong>entièrement à distance</strong>. A.M.I.S.I Sarl est basée à Ouagadougou, tandis que notre agence opère depuis Bobo-Dioulasso. Cette collaboration fructueuse prouve que la distance géographique n'est jamais un frein lorsque les processus de communication sont rigoureux et la méthodologie de travail est professionnelle. C'est un gage de confiance pour toute entreprise, où qu'elle se trouve en <strong>Afrique ou dans le monde</strong>, qui souhaite collaborer avec BinkoO Digital Lab.
                </p>
              </div>
            </section>
          </AnimatedSection>

          {/* --- Le Défi Stratégique --- */}
          <AnimatedSection animation="fade-up">
            <section className="mb-16 md:mb-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Le Défi Stratégique : Structurer la Complexité
              </h2>
              <div className="space-y-5 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                <p>
                  La <strong>digitalisation des entreprises burkinabè</strong> et ouest-africaines se heurte souvent à un obstacle majeur : le compromis entre la richesse du contenu et la performance technique. A.M.I.S.I Sarl présentait une <strong>complexité structurelle exceptionnelle</strong>. L'entreprise avait besoin d'une vitrine multisectorielle, véritable <Link to="/services/developpement-web" className="text-primary hover:underline">site et application web performants</Link>, capable de présenter des services radicalement différents les uns des autres, tout en intégrant un <strong>catalogue dynamique de biens immobiliers</strong> (parcelles, villas, terrains viabilisés) nécessitant des champs d'informations complexes : superficie, type de documents légaux (PUH, titre foncier), localisation géographique, prix et disponibilité.
                </p>
                <p>
                  Les <strong>solutions web traditionnelles</strong>, dites « monolithiques » (comme un thème WordPress classique), auraient généré un site lourd, lent à charger — particulièrement sur les <strong>réseaux mobiles 3G et 4G</strong> qui dominent le paysage numérique en <strong>Afrique subsaharienne</strong> — et difficile à naviguer pour un visiteur qui cherche une information précise. Un entrepreneur de Ouagadougou qui recherche « <em>parcelles viabilisées Ouagadougou</em> » ou « <em>entreprise BTP fiable Burkina Faso</em> » doit trouver l'information immédiatement.
                </p>
                <p>
                  De plus, le fondateur d'A.M.I.S.I Sarl exigeait une <strong>autonomie totale</strong> pour publier ses offres immobilières quotidiennement, sans avoir à écrire une seule ligne de code et sans dépendre d'un développeur à chaque mise à jour. Chaque publication devait être immédiatement compréhensible par les <strong>moteurs de recherche</strong>, formatée avec les bonnes balises meta et les bonnes données structurées.
                </p>
                <p>
                  Le défi était donc triple :
                </p>
                <ul className="space-y-3 pl-1">
                  {[
                    'Garantir une vitesse d\'affichage fulgurante, même sur les connexions internet les plus limitées du Burkina Faso et d\'Afrique de l\'Ouest.',
                    'Offrir une interface d\'administration simplifiée et familière, permettant au client de gérer son contenu en toute autonomie.',
                    'Assurer une fondation SEO technique irréprochable pour dominer les résultats de recherche locaux et régionaux sur Google.'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </AnimatedSection>

          {/* --- IMAGE SECTION 1 --- */}
          {IMAGES.immobilier && (
            <AnimatedImage delay={0.2}>
              <div className="group mb-16 md:mb-20 rounded-2xl overflow-hidden border border-border shadow-lg">
                <div className="overflow-hidden">
                  <img
                    src={IMAGES.immobilier}
                    alt="Section immobilière du site A.M.I.S.I Sarl — Catalogue de biens immobiliers dynamique à Ouagadougou"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="bg-muted/50 px-5 py-3 text-sm text-muted-foreground border-t border-border/50">
                  <strong>Catalogue immobilier dynamique</strong> — Filtrage par type de bien, localisation et budget. Chaque fiche est optimisée pour le référencement naturel (SEO).
                </div>
              </div>
            </AnimatedImage>
          )}

          {/* --- La Démarche Architecturale --- */}
          <AnimatedSection animation="fade-up">
            <section className="mb-16 md:mb-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                La Démarche Architecturale et Technique
              </h2>
              <div className="space-y-5 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                <p>
                  Chez <strong>BinkoO Digital Lab</strong>, nous croyons que l'<strong>agilité technologique en Afrique subsaharienne</strong> passe par des choix d'architecture audacieux et pérennes. Nous avons donc écarté les thèmes préconçus et les builders visuels (Elementor, Divi) pour bâtir une architecture <strong>« Headless »</strong> — une approche où le front-end (ce que voit le visiteur) et le back-end (l'administration du contenu) sont totalement séparés et communiquent via une <strong>API REST sécurisée</strong>.
                </p>
                <p>
                  Cette séparation est le fondement même de la performance et de la sécurité de la plateforme pour le <strong>marché digital africain</strong>.
                </p>
              </div>

              {/* Sous-sections techniques */}
              <div className="mt-10 space-y-10">
                {/* Sécurité & Vitesse */}
                <div className="bg-muted/30 rounded-xl p-6 md:p-8 border border-border/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-lg md:text-xl">Sécurité et Vitesse de Chargement</h3>
                  </div>
                  <div className="space-y-4 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                    <p>
                      En séparant l'interface visuelle (<strong>React/Vite</strong>) de la base de données (<strong>WordPress</strong>), nous avons éliminé les vulnérabilités classiques liées aux bases de données exposées. Le front-end est un site statique qui ne communique avec le back-office qu'en lecture seule, rendant les attaques par injection SQL ou les tentatives de piratage pratiquement impossibles.
                    </p>
                    <p>
                      Le résultat en termes de performance est spectaculaire : le site se charge <strong>quasi-instantanément</strong>, offrant une fluidité mobile exceptionnelle. C'est un critère absolument indispensable sur le <strong>marché africain</strong> où le smartphone est le premier — et souvent le seul — écran d'accès à l'information. Un site qui met plus de 3 secondes à charger perd la majorité de ses visiteurs. Avec cette architecture, A.M.I.S.I Sarl n'a pas ce problème.
                    </p>
                  </div>
                </div>

                {/* Design Fluide */}
                <div className="bg-muted/30 rounded-xl p-6 md:p-8 border border-border/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-lg md:text-xl">Design Fluide, Adaptatif et Mobile-First</h3>
                  </div>
                  <div className="space-y-4 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                    <p>
                      Grâce à l'utilisation de <strong>Tailwind CSS</strong>, nous avons conçu des composants d'interface (UI) 100% responsives, pensés d'abord pour l'écran mobile puis adaptés aux tablettes et aux ordinateurs de bureau. Cette approche <strong>mobile-first</strong> est essentielle pour toute <strong>entreprise digitale en Afrique de l'Ouest</strong> où plus de 80% du trafic web provient des smartphones.
                    </p>
                    <p>
                      Par exemple, les fiches de biens immobiliers s'adaptent dynamiquement à la longueur des descriptions (certificats de propriété, superficies, documents légaux) sans jamais briser la mise en page. Les images sont optimisées et servies par <strong>Cloudinary</strong> dans le format et la résolution idéale pour chaque appareil, réduisant considérablement le temps de chargement et la consommation de données mobiles des visiteurs.
                    </p>
                  </div>
                </div>

                {/* SEO Technique */}
                <div className="bg-muted/30 rounded-xl p-6 md:p-8 border border-border/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-lg md:text-xl">SEO Technique Avancé : JSON-LD, Canoniques et Indexation</h3>
                  </div>
                  <div className="space-y-4 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                    <p>
                      Le <strong>référencement naturel (SEO)</strong> n'est pas un ajout de dernière minute chez <Link to="/a-propos" className="text-primary hover:underline">BinkoO Digital Lab</Link> : c'est une fondation architecturale. Plutôt que de multiplier inutilement les pages et d'alourdir l'hébergement, nous avons injecté des <strong>Données Structurées (Schema.org)</strong> directement dans le code source, au format <strong>JSON-LD</strong>.
                    </p>
                    <p>
                      Concrètement, cela signifie que les robots de <strong>Google</strong> comprennent instantanément la nature de chaque page : les fiches immobilières sont balisées comme des « <em>RealEstateListing</em> », les services comme des « <em>Service</em> », et l'entreprise elle-même comme une « <em>Organization</em> ». Couplé à une gestion dynamique des <strong>URLs canoniques</strong>, à l'intégration poussée de <strong>Rank Math SEO</strong>, et à une stratégie de <strong>génération automatique des balises Meta</strong> (titre, description, Open Graph pour les réseaux sociaux), le site communique en temps réel avec les moteurs de recherche.
                    </p>
                    <p>
                      L'entreprise gagne ainsi en <strong>visibilité organique</strong> sur des requêtes stratégiques locales comme « <em>parcelles viabilisées Ouagadougou</em> », « <em>entreprise BTP Burkina Faso</em> », « <em>location villa Ouagadougou</em> » ou « <em>société import-export Burkina</em> ».
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedSection>

          {/* --- IMAGE SECTION 2 --- */}
          {IMAGES.blog && (
            <AnimatedImage delay={0.2}>
              <div className="group mb-16 md:mb-20 rounded-2xl overflow-hidden border border-border shadow-lg">
                <div className="overflow-hidden">
                  <img
                    src={IMAGES.blog}
                    alt="Blog et contenu SEO du site A.M.I.S.I Sarl — Stratégie de contenu pour le marché burkinabè"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="bg-muted/50 px-5 py-3 text-sm text-muted-foreground border-t border-border/50">
                  <strong>Section Blog intégrée</strong> — Contenu SEO régulier pour renforcer l'autorité du domaine sur les thématiques BTP, immobilier et forage au Burkina Faso.
                </div>
              </div>
            </AnimatedImage>
          )}

          {/* --- Avantages Clés --- */}
          <AnimatedSection animation="fade-up">
            <section className="mb-16 md:mb-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Les Avantages Clés pour le Client
              </h2>
              <AnimatedParagraph delay={0.1}>
                <p className="text-[15px] md:text-[17px] text-muted-foreground leading-relaxed mb-8">
                  Le déploiement de cette <strong>solution digitale sur-mesure</strong> a transformé la gestion opérationnelle d'A.M.I.S.I Sarl, en leur apportant des bénéfices concrets, durables et mesurables au quotidien.
                </p>
              </AnimatedParagraph>

              <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerChildren={0.1}>
                {[
                  {
                    icon: Users,
                    title: 'Autonomie Totale et Gestion Simplifiée',
                    description: 'Le fondateur utilise un back-office WordPress familier et intuitif, enrichi de champs personnalisés (ACF). Il publie ses biens immobiliers en quelques clics — vente ou location, avec filtrage dynamique par date, localisation et budget — et la plateforme React se met à jour automatiquement, sans aucune intervention technique requise. Une formation personnalisée d\'une heure a rendu le client 100% autonome.'
                  },
                  {
                    icon: Search,
                    title: 'Référencement Naturel (SEO) Natif et Puissant',
                    description: 'L\'architecture technique garantit que chaque service et chaque bien immobilier est formaté exactement comme Google l\'exige. Balises Meta dynamiques, données structurées Schema.org spécifiques à chaque secteur, et intégration poussée de Rank Math : l\'entreprise gagne en visibilité organique sur les requêtes stratégiques locales au Burkina Faso et en Afrique de l\'Ouest.'
                  },
                  {
                    icon: Gauge,
                    title: 'Expérience Utilisateur (UX) Sans Friction',
                    description: 'Fini les textes coupés, les images déformées ou les pages qui mettent une éternité à charger. La navigation est intuitive, les transitions sont douces, et l\'information est toujours lisible et accessible sur n\'importe quel appareil. Cette fluidité renforce la crédibilité et le professionnalisme de l\'entreprise auprès de ses prospects.'
                  },
                  {
                    icon: Globe,
                    title: 'Qualification Continue des Prospects',
                    description: 'L\'intégration d\'un assistant virtuel intelligent (Chatbot IA) formé spécifiquement sur les offres et services de l\'entreprise permet d\'accueillir les visiteurs 24h/24, 7j/7. Il répond aux questions courantes, qualifie les prospects et redirige les contacts sérieux directement vers les équipes commerciales via WhatsApp ou par email.'
                  }
                ].map((advantage, index) => (
                  <StaggerItem key={index} variant="fade-up">
                    <div className="h-full bg-background rounded-2xl p-6 md:p-8 shadow-lg border border-border hover:border-primary/30 transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center mb-5">
                        <advantage.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-3">{advantage.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{advantage.description}</p>
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
                  <p className="text-3xl md:text-4xl font-bold mb-2">7</p>
                  <p className="text-sm md:text-base text-white/80">pôles d'expertise unifiés en une seule plateforme fluide</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold mb-2">100%</p>
                  <p className="text-sm md:text-base text-white/80">autonomie client — zéro dépendance technique au quotidien</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold mb-2">24/7</p>
                  <p className="text-sm md:text-base text-white/80">chatbot IA actif pour qualifier et orienter les prospects</p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* --- Collaboration à distance --- */}
          <AnimatedSection animation="fade-up">
            <section className="mb-16 md:mb-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Une Collaboration Sans Frontières
              </h2>
              <div className="space-y-5 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                <p>
                  L'un des aspects les plus remarquables de ce projet est qu'il a été entièrement réalisé <strong>à distance</strong>. A.M.I.S.I Sarl, basée à <strong>Ouagadougou</strong>, et BinkoO Digital Lab, opérant depuis <strong>Bobo-Dioulasso</strong>, ont collaboré à travers des outils de communication modernes, des réunions vidéo régulières et un processus de validation structuré.
                </p>
                <p>
                  Cette réussite est un message fort pour toutes les entreprises, les institutions et les entrepreneurs en <strong>Afrique de l'Ouest</strong>, en <strong>Afrique centrale</strong> et partout dans le monde qui hésitent encore à confier leur projet digital à une agence qui n'est pas dans leur ville : <strong>la qualité d'une collaboration ne dépend pas de la proximité physique, mais de la rigueur des processus et de l'engagement professionnel</strong>.
                </p>
                <p>
                  Que vous soyez à <strong>Ouagadougou</strong>, à <strong>Abidjan</strong>, à <strong>Dakar</strong>, à <strong>Lomé</strong>, à <strong>Bamako</strong>, à <strong>Cotonou</strong> ou même en <strong>Europe</strong> ou en <strong>Amérique du Nord</strong>, BinkoO Digital Lab est votre partenaire technologique de confiance. Nous avons prouvé, projet après projet, que nous livrons des résultats concrets, à l'heure, et à la hauteur des attentes les plus exigeantes.
                </p>
              </div>
            </section>
          </AnimatedSection>

          {/* --- Conclusion --- */}
          <AnimatedSection animation="fade-up">
            <section className="mb-16 md:mb-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Conclusion et Impact B2B
              </h2>
              <div className="space-y-5 text-[15px] md:text-[17px] text-muted-foreground leading-relaxed">
                <p>
                  Dans un <strong>environnement économique ouest-africain</strong> hautement compétitif, posséder un simple site web ne suffit plus. Il faut une véritable <strong>machine d'acquisition et de réassurance</strong> — un outil digital qui travaille pour vous 24 heures sur 24, qui attire les bons prospects, qui les rassure, et qui les convertit en clients.
                </p>
                <p>
                  Avec cette plateforme Headless, <strong>A.M.I.S.I Sarl</strong> ne se contente pas de digitaliser ses services : l'entreprise s'impose comme un <strong>partenaire d'affaires moderne, structuré et digne de confiance</strong> auprès des investisseurs, des institutions, des particuliers et de tous les acteurs du marché immobilier et du BTP au <strong>Burkina Faso</strong>.
                </p>
                <p>
                  Ce projet illustre parfaitement l'engagement de <strong>BinkoO Digital Lab</strong> : rendre les <strong>technologies mondiales les plus pointues</strong> accessibles et rentables pour les <strong>entreprises africaines</strong>. Nous ne construisons pas des sites web — nous construisons des outils de croissance robustes, évolutifs et optimisés qui reflètent l'envergure de votre entreprise tout en offrant une gestion quotidienne déconcertante de facilité.
                </p>
              </div>
            </section>
          </AnimatedSection>

          {/* --- IMAGE SECTION 3 (optionnelle) --- */}
          {IMAGES.backoffice && (
            <AnimatedImage delay={0.2}>
              <div className="group mb-16 md:mb-20 rounded-2xl overflow-hidden border border-border shadow-lg">
                <div className="overflow-hidden">
                  <img
                    src={IMAGES.backoffice}
                    alt="Back-office WordPress personnalisé pour A.M.I.S.I Sarl — Gestion immobilière intuitive"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="bg-muted/50 px-5 py-3 text-sm text-muted-foreground border-t border-border/50">
                  <strong>Back-office WordPress personnalisé</strong> — Interface d'administration intuitive avec champs ACF pour la gestion des biens immobiliers.
                </div>
              </div>
            </AnimatedImage>
          )}

        </div>

        {/* ==================== CTA FINAL ==================== */}
        <Contact2
          title="Vous cherchez un partenaire technologique pour votre transformation digitale ?"
          description="Que vous soyez au Burkina Faso, en Côte d'Ivoire, au Sénégal ou ailleurs en Afrique, discutons de votre projet. Plateforme web, application ou automatisation — nous concevons la solution qui fait la différence."
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

export default CaseStudyAmisi;
