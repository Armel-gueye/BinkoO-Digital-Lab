import React, { useState } from 'react';
import { ArrowRight, Sparkles, Palette, Globe, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LottiePlayer } from '@/components/ui/LottiePlayer';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger } from
"@/components/ui/collapsible";
import { motion } from 'framer-motion';
import { Highlighter } from '@/components/ui/highlighter';
import { AnimatedSection, AnimatedParagraph, AnimatedImage } from '@/components/AnimatedSection';
import { Contact2 } from '@/components/Contact2';
import SEO from '@/components/SEO';

const Services: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const whatsappUrl = 'https://api.whatsapp.com/send?phone=22644323841';
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
    prev.includes(index) ?
    prev.filter((i) => i !== index) :
    [...prev, index]
    );
  };

  const services = [
  {
    icon: Sparkles,
    title: 'IA & Automatisation',
    lottieUrl: 'https://lottie.host/db8c926f-e2c4-4562-baff-ae53e1a28d18/k9k8p2iDmK.lottie',
    description: 'Gagnez du temps et concentrez-vous sur ce qui compte vraiment. Nous intégrons des solutions d\'automatisation intelligentes pour simplifier vos tâches quotidiennes, améliorer la réactivité de votre entreprise et rendre vos processus plus efficaces.',
    features: [
    'Chatbots et assistants automatiques',
    'Automatisation de vos messages et réponses clients',
    'Intégration d\'IA dans vos outils quotidiens',
    "Création d'agents IA et de mini-systèmes IA adaptés à votre activité"],

    detailedText: <>L'<Highlighter action="highlight" color="#E5002E">intelligence artificielle</Highlighter> n'est plus un luxe réservé aux grandes entreprises : c'est un levier que toute structure peut désormais exploiter. Chez BinkoO Digital Lab, nous rendons l'IA concrète, simple et rentable pour vous. Notre mission est de transformer les <Highlighter action="underline" color="#FF9800">tâches répétitives</Highlighter>, chronophages ou manuelles en <Highlighter action="highlight" color="#F3F4F6">processus intelligents</Highlighter> qui s'exécutent automatiquement, avec précision et constance. <br/><br/>Nous créons des <Highlighter action="highlight" color="#3B82F6">chatbots</Highlighter> connectés à votre site web et à vos réseaux sociaux (Facebook, Instagram, WhatsApp, etc.) capables de répondre instantanément aux questions de vos clients, de qualifier les prospects et même de vendre à votre place. Nous développons aussi des <Highlighter action="highlight" color="#E5002E">agents IA</Highlighter> sur mesure qui automatisent la prospection, l'envoi d'e-mails, le suivi client, le scraping de données, ou encore la publication de contenu sur vos réseaux sociaux. Chaque automatisation est conçue autour de vos <Highlighter action="underline" color="#FF9800">besoins spécifiques</Highlighter> : que vous soyez une <Highlighter action="underline" color="#FF9800">PME, commerçant local ou start-up ambitieuse</Highlighter>, nous adaptons nos <Highlighter action="underline" color="#FF9800">solutions simples et accessibles</Highlighter> à votre réalité, pour maximiser votre <Highlighter action="highlight" color="#3B82F6">efficacité</Highlighter> sans complexifier vos opérations. <br/><br/>En résumé : moins de travail manuel, plus de performance, plus de ventes. L'IA devient un véritable collaborateur à vos côtés — discret, rapide et infaillible.</>
  },
  {
    icon: Globe,
    title: 'Création de Sites Web & Web Apps',
    lottieUrl: 'https://lottie.host/4b6b4429-a766-4c55-ae84-4914d41eed3d/YeZXdRzgBB.lottie',
    description: 'Votre présence en ligne, c\'est votre première impression. Nous concevons des sites web modernes, rapides et adaptés à vos besoins, qu\'il s\'agisse d\'un simple site vitrine, d\'une landing page ou d\'une application web complète.',
    features: [
    'Sites vitrines et portfolios professionnels',
    'Landing pages qui convertissent',
    'Applications web et SAAS performantes',
    'Boutiques en ligne reliées à WhatsApp',
    'Optimisation pour le référencement (SEO)'],

    detailedText: <>Votre <Highlighter action="highlight" color="#E5002E">site web</Highlighter> est la vitrine de votre activité, mais aussi le cœur de votre <Highlighter action="underline" color="#FF9800">présence digitale</Highlighter>. Chez BinkoO Digital Lab, nous concevons des sites modernes, performants et parfaitement adaptés à votre image. Chaque création est pensée pour être fluide, intuitive et rapide, tout en offrant une <Highlighter action="highlight" color="#3B82F6">expérience utilisateur</Highlighter> agréable sur tous les appareils. <br/><br/>Nos sites ne sont pas de simples pages : ce sont de véritables outils de croissance. Que vous ayez besoin d'une <Highlighter action="underline" color="#FF9800">boutique en ligne</Highlighter>, d'une <Highlighter action="underline" color="#FF9800">application web ou SaaS</Highlighter>, d'un portfolio professionnel, nous vous livrons un produit fonctionnel, cohérent et efficace. Chaque détail compte : la vitesse, le <Highlighter action="highlight" color="#3B82F6">design</Highlighter>, la clarté et la conversion. Nous veillons à ce que vos visiteurs deviennent des clients, naturellement. <br/><br/>Nous intégrons également un nom de domaine et un <Highlighter action="highlight" color="#F3F4F6">référencement intelligent</Highlighter>, qui optimise vos pages pour les moteurs de recherche sans alourdir la structure. Vous obtenez ainsi un <Highlighter action="underline" color="#FF9800">site visible, stable et prêt à évoluer</Highlighter> avec votre entreprise. Avec BinkoO Digital Lab, votre site ne dort jamais : il travaille jour et nuit pour vous, et donne à votre marque l'allure qu'elle mérite.</>
  },
  {
    icon: Palette,
    title: 'Création de Visuels',
    lottieUrl: 'https://lottie.host/5c93b25d-496c-4111-a52a-0cb75d13725e/dX3ZSTwkOZ.lottie',
    description: 'Parce qu\'un bon design parle plus fort que mille mots. Nous créons des visuels qui attirent l\'œil, valorisent votre marque et laissent une impression durable.',
    features: [
    'Identité visuelle et logo de marque',
    'Designs pour réseaux sociaux et publicités',
    'Illustrations, affiches et flyers digitaux',
    'Animation et motion design simples',
    'Contenus visuels pour web et print'],

    detailedText: <>Une image forte vaut mille mots, surtout dans un monde saturé de contenus. Chez BinkoO Digital Lab, nous aidons les marques à se distinguer à travers des <Highlighter action="underline" color="#FF9800">visuels clairs, cohérents et puissants</Highlighter>. Notre approche allie <Highlighter action="highlight" color="#3B82F6">créativité</Highlighter> et stratégie, pour donner à votre entreprise une <Highlighter action="highlight" color="#E5002E">identité visuelle</Highlighter> qui attire l'œil et inspire confiance. <br/><br/>Nous concevons des logos uniques, des affiches et bannières au <Highlighter action="highlight" color="#3B82F6">design</Highlighter> percutant, ainsi que des visuels adaptés à vos <Highlighter action="underline" color="#FF9800">réseaux sociaux et campagnes publicitaires</Highlighter>. Chaque création reflète la personnalité de votre marque et la rend mémorable, quel que soit le support utilisé. <br/><br/>Notre objectif est simple : rendre votre <Highlighter action="underline" color="#FF9800">image professionnelle, reconnaissable et séduisante</Highlighter>. Chaque ligne, chaque couleur et chaque élément graphique est pensé pour renforcer votre crédibilité et marquer durablement vos clients. Avec BinkoO Digital Lab, votre marque devient une <Highlighter action="underline" color="#FF9800">signature visuelle forte et élégante</Highlighter>, impossible à ignorer.</>
  }];


  return (
    <>
      <SEO 
        title="Nos Services : Agents IA, Sites Web SAAS & Branding - BinkoO"
        description="Découvrez nos solutions : Chatbots intelligents, sites e-commerce connectés WhatsApp, applications SAAS et identité visuelle complète. L'IA concrète pour votre croissance."
        canonical="https://binkoodigitallab.com/services"
        keywords="agent IA prospection, scraping données, création application web, logo entreprise, automatisation workflows, site vitrine, SAAS"
      />
      <div className="py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection animation="fade-up">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 md:mb-6">
            Nos Services
          </h1>
          <AnimatedParagraph delay={0.2}>
          <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Chez BinkoO Digital Lab, nous combinons expertise technique et créativité 
            pour transformer vos idées en solutions digitales innovantes. 
            Découvrez nos services sur mesure qui propulsent votre entreprise vers l'avenir.
          </p>
          </AnimatedParagraph>
        </motion.div>
        </AnimatedSection>

        {/* Services - Zigzag Layout */}
        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          {services.map((service, index) =>
          <AnimatedSection key={index} animation="fade-up" delay={index * 0.1}>
          <motion.div
            className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}>

              {/* Image - Lottie always first on mobile/tablet, zigzag on desktop */}
              <AnimatedImage delay={0.2}>
              <div className={
            index % 2 === 1 ?
            'order-1 lg:order-2' :
            'order-1'
            }>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white p-4 md:p-6">
                  <LottiePlayer src={service.lottieUrl} className="w-full h-full" />
                </div>
              </div>
              </AnimatedImage>

              {/* Content - Text always after lottie on mobile/tablet, zigzag on desktop */}
              <div className={`space-y-5 md:space-y-6 ${
            index % 2 === 1 ?
            'order-2 lg:order-1' :
            'order-2'}`
            }>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {service.title}
                  </h2>
                </div>
                
                <AnimatedParagraph delay={0.3}>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                </AnimatedParagraph>

                <div className="space-y-3 md:space-y-4 pt-2">
                  <h3 className="font-semibold text-base md:text-lg">
                    Ce que nous proposons :
                  </h3>
                  <ul className="space-y-2.5 md:space-y-3">
                    {service.features.map((feature, featureIndex) =>
                  <AnimatedParagraph key={featureIndex} delay={0.4 + featureIndex * 0.05}>
                  <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-muted-foreground !whitespace-pre-line">
                          {feature}
                          {featureIndex === service.features.length - 1 && (
                            <Collapsible open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
                              <CollapsibleTrigger asChild>
                                <button className="inline-flex items-center gap-1 ml-2 text-muted-foreground/60 hover:text-muted-foreground/80 transition-colors cursor-pointer">
                                  <span className="text-xs font-normal">{openItems.includes(index) ? 'Lire moins' : 'Lire plus...'}</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openItems.includes(index) ? 'rotate-180' : ''}`} />
                                </button>
                              </CollapsibleTrigger>
                            </Collapsible>
                          )}
                        </span>
                      </li>
                  </AnimatedParagraph>
                  )}
                  </ul>
                </div>

                <Collapsible open={openItems.includes(index)} onOpenChange={() => toggleItem(index)} className="pt-4 md:pt-5">
                  <CollapsibleContent className="mb-4">
                    <div className="bg-muted/50 rounded-lg p-5 md:p-6">
                      <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                        {service.detailedText}
                      </p>
                    </div>
                  </CollapsibleContent>

                  <a
                    href="#"
                    onClick={handleWhatsAppClick}
                    className="inline-block w-full sm:w-auto">
                    <Button size="default" className="w-full sm:w-auto">
                      Demander un devis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </Collapsible>
              </div>
            </motion.div>
          </AnimatedSection>
          )}
        </div>

        {/* Call to Action */}
        <AnimatedSection animation="fade-up">
        <motion.div
          className="mt-20 md:mt-24 text-center p-8 md:p-10 lg:p-12 rounded-xl"
          style={{
            background: 'linear-gradient(225deg, hsla(0, 96%, 56%, 1) 0%, hsla(0, 92%, 20%, 1) 80%)'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <AnimatedParagraph delay={0.2}>
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white max-w-3xl mx-auto leading-relaxed">
            Chaque solution que nous proposons est pensée pour simplifier votre quotidien, accélérer vos résultats et renforcer votre impact digital.
          </p>
          </AnimatedParagraph>
        </motion.div>
        </AnimatedSection>
      </div>
      {/* Contact2 - Juste au-dessus du Footer */}
      <Contact2 
        title="Prêt à Débloquer Votre Potentiel ?"
        description="Chaque service proposé est une étape vers plus d'efficacité. Expliquez-nous où vous voulez exceller, et nous construirons la solution digitale."
      />
    </div>
    </>
  );

};

export default Services;