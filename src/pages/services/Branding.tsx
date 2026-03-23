import React from 'react';
import { ArrowRight, Palette, Check, Brush, Layout, Image, Film, Megaphone, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LottiePlayer } from '@/components/ui/LottiePlayer';
import { motion } from 'framer-motion';
import { Highlighter } from '@/components/ui/highlighter';
import { AnimatedSection, AnimatedParagraph, AnimatedImage, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { Contact2 } from '@/components/Contact2';
import { openWhatsApp } from '@/utils/whatsapp';
import SEO from '@/components/SEO';

const Branding: React.FC = () => {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsApp();
  };

  const services = [
    {
      icon: PenTool,
      title: 'Création de logo professionnel',
      description: 'Un logo unique et mémorable qui incarne l\'essence de votre marque. Conçu pour se démarquer dans le paysage visuel africain — sur vos enseignes, vos cartes de visite, vos réseaux sociaux et vos emballages.'
    },
    {
      icon: Brush,
      title: 'Charte graphique complète',
      description: 'Couleurs, typographies, règles d\'utilisation du logo : nous créons un cahier de normes visuel complet pour garantir la cohérence de votre marque sur tous les supports, du print au digital.'
    },
    {
      icon: Image,
      title: 'Visuels réseaux sociaux',
      description: 'Des posts Instagram, Facebook et TikTok au design soigné et professionnel. Templates personnalisés, carrousels, stories et bannières publicitaires qui captent l\'attention de votre audience africaine.'
    },
    {
      icon: Megaphone,
      title: 'Supports publicitaires',
      description: 'Flyers, affiches, roll-ups, kakémonos, cartes de visite et brochures. Des supports imprimés de qualité professionnelle pour vos événements, salons et campagnes terrain au Burkina Faso et en Afrique de l\'Ouest.'
    },
    {
      icon: Film,
      title: 'Motion design & animations',
      description: 'Vidéos animées courtes et percutantes pour présenter vos services, vos produits ou votre marque. Parfaites pour vos publicités sur les réseaux sociaux et vos présentations commerciales.'
    },
    {
      icon: Layout,
      title: 'Packaging & identité produit',
      description: 'Donnez à vos produits un packaging qui se démarque en rayon. Design d\'étiquettes, d\'emballages et de présentations produit qui attirent l\'œil et inspirent confiance aux consommateurs ouest-africains.'
    }
  ];

  return (
    <>
      <SEO
        title="Branding & Identité Visuelle au Burkina Faso - Logo, Design | BinkoO Digital Lab"
        description="Créez une identité de marque forte au Burkina Faso : logo professionnel, charte graphique, visuels réseaux sociaux et supports publicitaires. Design graphique expert pour entreprises africaines."
        canonical="https://binkoo.digital/services/branding"
        keywords="logo entreprise Burkina Faso, identité visuelle Ouagadougou, design graphique Afrique, charte graphique Bobo-Dioulasso, création logo Afrique de l'Ouest, branding entreprise africaine, visuels réseaux sociaux Burkina, flyer Ouagadougou, design publicitaire Afrique, graphiste Burkina Faso, communication visuelle Afrique de l'Ouest"
      />

      {/* Hero Section */}
      <div className="py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 md:gap-4 mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center flex-shrink-0">
                  <Palette className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  Branding & Identité Visuelle
                </h1>
              </div>

              <AnimatedParagraph delay={0.3}>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Au Burkina Faso et en Afrique de l'Ouest, <strong>la première impression compte plus que tout</strong>. Un logo amateuriste, des visuels incohérents ou une absence d'identité visuelle vous coûtent des clients chaque jour — souvent sans que vous le sachiez. Chez BinkoO Digital Lab, nous créons des <strong>identités de marque professionnelles et mémorables</strong> qui positionnent votre entreprise comme un acteur crédible, fiable et moderne sur le marché africain.
                </p>
              </AnimatedParagraph>
            </div>

            <AnimatedImage delay={0.2}>
              <div className="max-w-3xl mx-auto aspect-[4/3] md:aspect-[21/9] rounded-2xl overflow-hidden bg-white p-4 md:p-6 mb-16 shadow-inner border border-border/50">
                <LottiePlayer src="https://lottie.host/5c93b25d-496c-4111-a52a-0cb75d13725e/dX3ZSTwkOZ.lottie" className="w-full h-full" />
              </div>
            </AnimatedImage>

            <div className="max-w-4xl mx-auto flex flex-col gap-8 lg:gap-12">
              {/* Texte descriptif en premier */}
              <div className="bg-muted/50 rounded-lg p-5 md:p-6 lg:p-8">
                <p className="text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed text-muted-foreground">
                  Dans un marché ouest-africain en pleine explosion digitale, votre <Highlighter action="highlight" color="#E5002E">identité visuelle</Highlighter> est votre arme la plus puissante. C'est elle qui fait qu'un client vous choisit plutôt que votre concurrent. C'est elle qui transforme un passant sur les réseaux sociaux en <Highlighter action="underline" color="#FF9800">client fidèle</Highlighter>. Chez BinkoO Digital Lab, nous ne créons pas juste un logo — nous construisons une <Highlighter action="highlight" color="#3B82F6">signature de marque</Highlighter> complète qui raconte votre histoire et inspire confiance. <br /><br />Notre équipe comprend les codes visuels du <Highlighter action="underline" color="#FF9800">marché africain</Highlighter>. Nous savons quelles couleurs captent l'attention à Ouagadougou, quels styles fonctionnent sur les réseaux sociaux en Afrique francophone, et comment adapter votre image pour qu'elle résonne avec votre public local tout en restant moderne et internationale. <br /><br />De la petite <Highlighter action="underline" color="#FF9800">boutique de Bobo-Dioulasso</Highlighter> à la start-up ambitieuse d'Abidjan, du restaurant de Ouagadougou à l'entreprise de BTP à Bamako — chaque projet est unique. Nous concevons des visuels adaptés à vos <Highlighter action="highlight" color="#3B82F6">réseaux sociaux</Highlighter> (Instagram, Facebook, TikTok), vos <Highlighter action="highlight" color="#3B82F6">supports commerciaux</Highlighter> (flyers, brochures, roll-ups) et votre <Highlighter action="highlight" color="#3B82F6">communication digitale</Highlighter> quotidienne. <br /><br /><strong>Résultat : une marque qui se démarque, qui inspire confiance et qui vend.</strong> Votre identité visuelle devient votre avantage compétitif le plus durable.
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
                      'Création de logo professionnel unique et mémorable',
                      'Charte graphique complète (couleurs, typographies, règles)',
                      'Visuels réseaux sociaux : posts, stories, carrousels, bannières',
                      'Supports imprimés : flyers, affiches, cartes de visite, roll-ups',
                      'Motion design et vidéos animées courtes',
                      'Packaging et design d\'emballages produit',
                      'Templates personnalisés pour votre communication quotidienne'
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
                      Créer mon identité de marque
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Services Grid */}
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
                  Nos services de branding pour les entreprises africaines
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                  Du logo à la charte graphique complète, nous donnons à votre marque l'identité visuelle qu'elle mérite pour conquérir le marché ouest-africain.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    className="bg-background rounded-2xl p-6 md:p-8 shadow-lg border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Why Branding Matters */}
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                Pourquoi investir dans votre image de marque en Afrique
              </h2>
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-white text-center">
                <div>
                  <p className="text-4xl md:text-5xl font-bold mb-2">75%</p>
                  <p className="text-sm md:text-base text-white/80">des consommateurs jugent la crédibilité d'une entreprise par son identité visuelle</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold mb-2">80%</p>
                  <p className="text-sm md:text-base text-white/80">de la mémorisation d'une marque passe par les couleurs et le design</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold mb-2">×2</p>
                  <p className="text-sm md:text-base text-white/80">un branding professionnel double en moyenne la perception de qualité de vos services</p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Testimonial-style section */}
          <AnimatedSection animation="fade-up">
            <div className="mt-20 md:mt-28 max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                L'avantage BinkoO Digital Lab pour votre Branding
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { emoji: '🎯', title: 'Stratégie locale', desc: 'Nous comprenons les codes visuels du marché africain' },
                  { emoji: '⚡', title: 'Livraison rapide', desc: 'Vos visuels en 48-72h, sans compromis sur la qualité' },
                  { emoji: '💰', title: 'Tarifs adaptés', desc: 'Des prix accessibles pour les PME burkinabè et ouest-africaines' },
                  { emoji: '🔄', title: 'Révisions incluses', desc: 'Retouches et ajustements jusqu\'à votre entière satisfaction' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-muted/30 rounded-xl p-5 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <p className="text-3xl mb-3">{item.emoji}</p>
                    <h3 className="font-bold text-sm md:text-base mb-1">{item.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* FAQ Section */}
          <AnimatedSection animation="fade-up">
            <div className="mt-20 md:mt-28 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Questions fréquentes sur le branding et le design graphique
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Combien coûte la création d'un logo au Burkina Faso ?",
                    a: "Le tarif dépend de la complexité du projet (logo seul, logo + charte graphique, identité visuelle complète). Chez BinkoO Digital Lab, nous proposons des formules adaptées au budget des entreprises burkinabè, avec plusieurs options de prix. Contactez-nous pour recevoir un devis gratuit en moins de 24 heures."
                  },
                  {
                    q: "Quelle est la différence entre un logo et une identité visuelle ?",
                    a: "Le logo est le symbole central de votre marque. L'identité visuelle va bien au-delà : elle comprend les couleurs officielles, les typographies, les règles d'utilisation, les modèles pour vos réseaux sociaux et vos supports imprimés. C'est un système complet qui garantit la cohérence de votre communication sur tous les canaux."
                  },
                  {
                    q: "Pouvez-vous créer des visuels pour mes réseaux sociaux ?",
                    a: "Oui, c'est l'un de nos services les plus demandés au Burkina Faso et en Afrique de l'Ouest. Nous créons des templates personnalisés pour Instagram, Facebook, TikTok et LinkedIn : posts, stories, carrousels, bannières publicitaires. Des visuels pro que vous pouvez réutiliser ou que nous alimentons régulièrement pour vous."
                  },
                  {
                    q: "En combien de temps recevrai-je mes créations ?",
                    a: "Un logo seul est livré en 3 à 5 jours ouvrés. Une identité visuelle complète (logo + charte + templates) prend généralement 7 à 10 jours. Les visuels ponctuels (flyers, posts réseaux sociaux) sont livrés en 24 à 48 heures. Chaque livraison inclut des révisions jusqu'à votre entière satisfaction."
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
          title="Prêt à donner une identité forte à votre marque ?"
          description="Décrivez votre projet et recevez un devis gratuit en 24h. Logo, charte graphique, visuels réseaux sociaux — nous construisons l'image de votre succès au Burkina Faso et en Afrique."
        />
      </div>
    </>
  );
};

export default Branding;
