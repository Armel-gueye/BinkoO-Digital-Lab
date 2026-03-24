import React from 'react';
import { ArrowRight, Globe, Check, Smartphone, Search, ShoppingCart, Gauge, Code2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LottiePlayer } from '@/components/ui/LottiePlayer';
import { motion } from 'framer-motion';
import { Highlighter } from '@/components/ui/highlighter';
import { AnimatedSection, AnimatedParagraph, AnimatedImage, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { Contact2 } from '@/components/Contact2';
import { openWhatsApp } from '@/utils/whatsapp';
import SEO from '@/components/SEO';

const SitesAppWeb: React.FC = () => {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsApp();
  };

  const solutions = [
    {
      icon: Globe,
      title: 'Site vitrine professionnel',
      description: 'Un site moderne et élégant qui reflète la qualité de votre entreprise. Idéal pour les PME, cabinets, restaurants et prestataires de services à Ouagadougou, Bobo-Dioulasso et dans toute l\'Afrique de l\'Ouest.'
    },
    {
      icon: ShoppingCart,
      title: 'Boutique en ligne & e-commerce',
      description: 'Vendez vos produits 24h/24 avec un site e-commerce connecté à WhatsApp, Mobile Money et aux solutions de paiement locales. Vos clients commandent en ligne, vous livrez partout au Burkina Faso.'
    },
    {
      icon: Code2,
      title: 'Application web & SaaS',
      description: 'Des applications web sur mesure pour digitaliser votre métier : gestion de stocks, réservation en ligne, suivi de commandes, tableau de bord client. Des outils performants pensés pour le marché africain.'
    },
    {
      icon: Smartphone,
      title: 'Landing pages qui convertissent',
      description: 'Des pages d\'atterrissage optimisées pour transformer vos visiteurs en clients. Parfaites pour vos campagnes publicitaires Facebook, Instagram et Google au Burkina Faso et en Afrique de l\'Ouest.'
    },
    {
      icon: Search,
      title: 'Référencement SEO local',
      description: 'Apparaissez en premier sur Google quand vos clients recherchent vos services à Ouagadougou, Bobo-Dioulasso ou dans votre ville. Nous optimisons chaque page pour le référencement naturel en Afrique francophone.'
    },
    {
      icon: Gauge,
      title: 'Performance & rapidité',
      description: 'Nos sites sont ultra-rapides, même avec une connexion internet limitée. Optimisés pour les réseaux mobile 3G/4G d\'Afrique de l\'Ouest, ils chargent en moins de 3 secondes pour offrir la meilleure expérience utilisateur.'
    }
  ];

  return (
    <>
      <SEO
        title="Création de Sites Web & Applications au Burkina Faso | BinkoO Digital Lab"
        description="Créez un site web professionnel, une boutique en ligne ou une application web au Burkina Faso. Sites optimisés SEO, rapides et adaptés au marché africain. Devis gratuit."
        canonical="https://binkoo.digital/services/sites-app-web"
        keywords="création site web Burkina Faso, site internet Ouagadougou, développement web Bobo-Dioulasso, boutique en ligne Afrique, application web Burkina, site e-commerce Afrique de l'Ouest, agence web Ouagadougou, landing page Burkina Faso, site vitrine Afrique, développeur web Burkina, SaaS Afrique"
      />

      {/* Hero Section */}
      <div className="py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-6">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Création de Sites Web & Applications
              </h1>
            </div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              En Afrique de l'Ouest, <strong>votre site web est votre commercial le plus puissant</strong>. Il travaille 24h/24, ne prend jamais de congé et touche des clients que vous n'auriez jamais atteints autrement. Chez BinkoO Digital Lab, nous concevons des sites et applications web <strong>modernes, ultra-rapides et optimisés pour le marché africain</strong> — pensés pour convertir vos visiteurs en clients fidèles.
            </p>
          </div>

          <div className="max-w-3xl mx-auto aspect-[4/3] md:aspect-[21/9] rounded-2xl overflow-hidden bg-white p-4 md:p-6 mb-16 shadow-inner border border-border/50">
            <LottiePlayer src="https://lottie.host/4b6b4429-a766-4c55-ae84-4914d41eed3d/YeZXdRzgBB.lottie" className="w-full h-full" />
          </div>

          <div className="max-w-4xl mx-auto flex flex-col gap-8 lg:gap-12">
            {/* Texte descriptif en premier */}
            <div className="bg-muted/50 rounded-lg p-5 md:p-6 lg:p-8">
              <p className="text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed text-muted-foreground">
                Votre <Highlighter action="highlight" color="#E5002E">site web</Highlighter> n'est pas qu'une simple carte de visite numérique. C'est le pilier de votre <Highlighter action="underline" color="#FF9800">stratégie digitale en Afrique de l'Ouest</Highlighter>. Chez BinkoO Digital Lab, chaque site est conçu avec une obsession : la performance. Performance en termes de <Highlighter action="highlight" color="#3B82F6">vitesse de chargement</Highlighter> — essentielle avec les connexions internet africaines. Performance en termes de <Highlighter action="highlight" color="#3B82F6">conversion</Highlighter> — chaque élément est placé stratégiquement pour guider le visiteur vers l'action. Performance en termes de <Highlighter action="highlight" color="#3B82F6">référencement</Highlighter> — pour que vos clients vous trouvent sur Google avant vos concurrents. <br /><br />Que vous soyez un <Highlighter action="underline" color="#FF9800">entrepreneur à Ouagadougou</Highlighter>, un restaurant à Bobo-Dioulasso, un prestataire de services à Abidjan ou une start-up à Dakar, nous créons votre outil digital sur mesure. Nos <Highlighter action="highlight" color="#E5002E">boutiques en ligne</Highlighter> sont connectées à WhatsApp et aux solutions de paiement mobile (Orange Money, Moov Money) pour faciliter l'achat dans le contexte ouest-africain. <br /><br />Chaque site est responsive, sécurisé et livré avec un <Highlighter action="highlight" color="#F3F4F6">nom de domaine professionnel</Highlighter> et un hébergement fiable. Avec BinkoO Digital Lab, votre présence digitale ne dort jamais —  <Highlighter action="underline" color="#FF9800">elle génère des clients, de la crédibilité et de la croissance</Highlighter> jour et nuit.
              </p>
            </div>

            {/* Ce que nous proposons en dessous */}
            <div className="space-y-8">
              <div className="space-y-4 md:space-y-5">
                <h3 className="font-bold text-xl md:text-2xl">
                  Ce que nous proposons :
                </h3>
                <StaggerContainer className="grid sm:grid-cols-2 gap-4 md:gap-5" staggerChildren={0.08}>
                  {[
                    'Sites vitrines professionnels adaptés à votre image de marque',
                    'Boutiques en ligne avec paiement Mobile Money & WhatsApp',
                    'Applications web et SaaS performantes sur mesure',
                    'Landing pages optimisées pour vos campagnes Facebook & Google',
                    'Référencement SEO local pour dominer Google au Burkina Faso',
                    'Sites ultra-rapides, optimisés pour les réseaux 3G/4G africains',
                    'Nom de domaine et hébergement inclus'
                  ].map((item, index) => (
                    <StaggerItem key={index} variant="fade-up">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-muted-foreground">
                          {item}
                        </span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

              <div className="pt-4">
                <a href="#" onClick={handleWhatsAppClick} className="inline-block w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto px-10">
                    Lancer mon projet web
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Solutions Grid */}
          <AnimatedSection animation="fade-up">
            <div className="mt-20 md:mt-28">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Des solutions web adaptées à chaque besoin africain
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                  Du simple site vitrine à l'application SaaS complexe, nous construisons les outils digitaux qui propulsent votre entreprise au Burkina Faso et en Afrique de l'Ouest.
                </p>
              </motion.div>

              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" staggerChildren={0.1}>
                {solutions.map((solution, index) => (
                  <StaggerItem key={index} variant="fade-up">
                    <div className="h-full bg-background rounded-2xl p-6 md:p-8 shadow-lg border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center mb-4">
                        <solution.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-3">{solution.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{solution.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>

          {/* Process Section */}
          <AnimatedSection animation="fade-up">
            <div className="mt-20 md:mt-28 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
                Notre processus : de votre idée à votre site en ligne
              </h2>
              <StaggerContainer className="space-y-8" staggerChildren={0.15}>
                {[
                  { step: '01', title: 'Discussion & diagnostic gratuit', desc: 'On échange sur votre projet, vos objectifs et votre marché cible au Burkina Faso ou en Afrique de l\'Ouest. Nous analysons votre positionnement et définissons la meilleure stratégie digitale.' },
                  { step: '02', title: 'Conception & design sur mesure', desc: 'Nous créons une maquette sur mesure qui reflète votre identité de marque. Design moderne, navigation intuitive, et expérience utilisateur optimale — validée par vous avant le développement.' },
                  { step: '03', title: 'Développement & intégrations', desc: 'Nous développons votre site avec les technologies les plus performantes. Intégration de WhatsApp Business, Mobile Money, formulaires de contact, blog SEO et outils d\'analyse.' },
                  { step: '04', title: 'Mise en ligne & accompagnement', desc: 'Votre site est mis en production avec nom de domaine, hébergement et certificat SSL. Nous assurons la formation, le support technique et l\'accompagnement SEO pour garantir vos résultats.' }
                ].map((item, index) => (
                  <StaggerItem key={index} variant="fade-up">
                    <div className="flex gap-6 items-start">
                      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-t from-primary to-red-400 flex items-center justify-center text-white font-bold text-lg">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>

          {/* Stats Banner */}
          <AnimatedSection animation="fade-up">
            <motion.div
              className="mt-20 md:mt-24 p-8 md:p-10 lg:p-12 rounded-xl"
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
                  <p className="text-4xl md:text-5xl font-bold mb-2">&lt;3s</p>
                  <p className="text-sm md:text-base text-white/80">temps de chargement, même en 3G en Afrique de l'Ouest</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold mb-2">100%</p>
                  <p className="text-sm md:text-base text-white/80">responsive : parfait sur mobile, tablette et ordinateur</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold mb-2">SEO</p>
                  <p className="text-sm md:text-base text-white/80">optimisé pour Google : soyez trouvé par vos clients locaux</p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* FAQ Section */}
          <AnimatedSection animation="fade-up">
            <div className="mt-20 md:mt-28 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Questions fréquentes sur la création de sites web
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Combien coûte un site web professionnel au Burkina Faso ?",
                    a: "Le prix dépend de vos besoins (site vitrine, boutique en ligne, application web). Chez BinkoO Digital Lab, nous proposons des tarifs compétitifs et adaptés au marché burkinabè et ouest-africain. Contactez-nous pour un devis gratuit et détaillé en moins de 24 heures."
                  },
                  {
                    q: "Mon site sera-t-il visible sur Google à Ouagadougou et au Burkina ?",
                    a: "Oui. Chaque site que nous créons est optimisé pour le référencement naturel (SEO) local. Nous ciblons les mots-clés stratégiques de votre secteur au Burkina Faso, en Côte d'Ivoire, au Sénégal et dans toute l'Afrique francophone pour maximiser votre visibilité."
                  },
                  {
                    q: "Peut-on intégrer WhatsApp et le paiement Mobile Money ?",
                    a: "Absolument. Nos sites intègrent WhatsApp Business pour la communication directe et les solutions de paiement mobile (Orange Money, Moov Money) adaptées au marché ouest-africain. Vos clients peuvent commander et payer facilement depuis leur téléphone."
                  },
                  {
                    q: "Proposez-vous la maintenance et les mises à jour ?",
                    a: "Oui. Nous assurons un suivi technique continu, les mises à jour de sécurité, les sauvegardes régulières et l'accompagnement pour faire évoluer votre site avec votre entreprise. Votre tranquillité d'esprit est notre priorité."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-muted/30 rounded-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <h3 className="font-bold text-base md:text-lg mb-2">{faq.q}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        <Contact2
          title="Prêt à lancer votre site web au Burkina Faso ?"
          description="Décrivez votre projet et recevez un devis gratuit en 24h. Sites vitrines, boutiques en ligne, applications web — nous concevons la solution idéale pour votre marché."
        />
      </div>
    </>
  );
};

export default SitesAppWeb;
