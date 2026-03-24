import React from 'react';
import { ArrowRight, Sparkles, Check, Bot, Zap, TrendingUp, MessageSquare, Mail, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LottiePlayer } from '@/components/ui/LottiePlayer';
import { motion } from 'framer-motion';
import { Highlighter } from '@/components/ui/highlighter';
import { AnimatedSection, AnimatedParagraph, AnimatedImage, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { Contact2 } from '@/components/Contact2';
import { openWhatsApp } from '@/utils/whatsapp';
import SEO from '@/components/SEO';

const IAAutomatisation: React.FC = () => {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsApp();
  };

  const useCases = [
    {
      icon: MessageSquare,
      title: 'Chatbot WhatsApp & Facebook',
      description: 'Répondez à vos clients 24h/24 sur WhatsApp et Facebook Messenger. Votre chatbot qualifie les prospects, répond aux questions fréquentes et prend des commandes automatiquement — même la nuit, même le dimanche.'
    },
    {
      icon: Mail,
      title: 'Automatisation e-mails & relances',
      description: 'Fini les relances manuelles. Vos e-mails de suivi, confirmations de commande et rappels clients s\'envoient tout seuls, au bon moment, à la bonne personne.'
    },
    {
      icon: TrendingUp,
      title: 'Prospection automatisée',
      description: 'Identifiez et contactez vos futurs clients automatiquement. Nos agents IA scannent le marché, collectent les contacts qualifiés et lancent vos campagnes de prospection pendant que vous vous concentrez sur la vente.'
    },
    {
      icon: Zap,
      title: 'Workflows intelligents',
      description: 'Connectez vos outils entre eux : CRM, WhatsApp, e-mail, réseaux sociaux, comptabilité. Chaque action déclenche la suivante automatiquement. Zéro saisie manuelle, zéro oubli.'
    },
    {
      icon: Bot,
      title: 'Agents IA sur mesure',
      description: 'Des mini-systèmes IA conçus spécifiquement pour votre métier : rédaction de contenu automatique, analyse de données clients, gestion de stock intelligente, publication automatique sur vos réseaux sociaux.'
    },
    {
      icon: Users,
      title: 'Gestion de la relation client',
      description: 'Centralisez toutes vos interactions clients dans un seul outil intelligent. Historique des échanges, scoring automatique des prospects, et alertes personnalisées pour ne manquer aucune opportunité.'
    }
  ];

  return (
    <>
      <SEO
        title="IA & Automatisation au Burkina Faso - Chatbot, Agents IA | BinkoO Digital Lab"
        description="Automatisez votre entreprise au Burkina Faso et en Afrique de l'Ouest avec l'IA : chatbots WhatsApp, agents IA, prospection automatisée, workflows intelligents. Solutions adaptées aux PME africaines."
        canonical="https://binkoo.digital/services/ia-automatisation"
        keywords="intelligence artificielle Burkina Faso, chatbot WhatsApp Ouagadougou, automatisation entreprise Afrique, agent IA Bobo-Dioulasso, automatisation PME Afrique de l'Ouest, chatbot Facebook entreprise, prospection automatisée Burkina, CRM intelligent Afrique, transformation digitale Burkina Faso"
      />

      {/* Hero Section */}
      <div className="py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-6">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                IA & Automatisation
              </h1>
            </div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Au Burkina Faso et en Afrique de l'Ouest, les entreprises qui grandissent vite ont un point commun : elles automatisent ce qui peut l'être. Chez BinkoO Digital Lab, nous intégrons des <strong>solutions d'intelligence artificielle</strong> concrètes et accessibles pour les PME, commerçants et entrepreneurs africains. Gagnez du temps, réduisez vos coûts et concentrez-vous sur ce qui compte vraiment : <strong>développer votre activité</strong>.
            </p>
          </div>

            <AnimatedImage delay={0.2}>
              <div className="max-w-3xl mx-auto aspect-[4/3] md:aspect-[21/9] rounded-2xl overflow-hidden bg-white p-4 md:p-6 mb-16 shadow-inner border border-border/50">
                <LottiePlayer src="https://lottie.host/db8c926f-e2c4-4562-baff-ae53e1a28d18/k9k8p2iDmK.lottie" className="w-full h-full" />
              </div>
            </AnimatedImage>

            <div className="max-w-4xl mx-auto flex flex-col gap-8 lg:gap-12">
              {/* Texte descriptif en premier */}
              <div className="bg-muted/50 rounded-lg p-5 md:p-6 lg:p-8">
                <p className="text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed text-muted-foreground">
                  L'<Highlighter action="highlight" color="#E5002E">intelligence artificielle</Highlighter> n'est plus réservée aux multinationales. Au Burkina Faso et dans toute l'Afrique de l'Ouest, elle devient un <Highlighter action="underline" color="#FF9800">levier de croissance accessible</Highlighter> pour chaque entreprise, du commerçant du Grand Marché de Ouagadougou à la start-up tech de Bobo-Dioulasso. Chez BinkoO Digital Lab, nous transformons les <Highlighter action="highlight" color="#F3F4F6">tâches répétitives et chronophages</Highlighter> en processus automatisés, fiables et rapides. <br /><br />Aujourd'hui, vos clients vous contactent sur <Highlighter action="highlight" color="#3B82F6">WhatsApp, Facebook et Instagram</Highlighter> — souvent en dehors des heures de bureau. Un chatbot intelligent, connecté à vos réseaux et à votre site, répond instantanément, qualifie les prospects et peut même prendre des commandes à votre place. Nos <Highlighter action="highlight" color="#E5002E">agents IA sur mesure</Highlighter> automatisent également la prospection B2B, l'envoi d'e-mails, le suivi client, la collecte de données ou la publication de contenu sur vos réseaux sociaux. <br /><br />Chaque solution est conçue pour le <Highlighter action="underline" color="#FF9800">contexte africain</Highlighter> : des outils simples, des tarifs adaptés, une prise en main rapide. Que vous soyez à Ouagadougou, Bobo-Dioulasso, Abidjan, Dakar ou Bamako, nous adaptons nos automatisations à votre réalité terrain. <br /><br /><strong>Résultat : moins de travail manuel, plus de clients, plus de chiffre d'affaires.</strong> L'IA devient votre collaborateur le plus efficace — disponible 24h/24, 7j/7.
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
                      'Chatbots WhatsApp & Facebook pour répondre à vos clients 24h/24',
                      'Automatisation des réponses, relances et suivis clients',
                      'Intégration d\'IA dans vos outils quotidiens (CRM, réseaux sociaux, e-mail)',
                      'Création d\'agents IA et de workflows automatisés sur mesure',
                      'Prospection et génération de leads automatisée',
                      'Publication automatique de contenu sur vos réseaux sociaux'
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
                      Démarrer votre projet d'IA
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
              </div>
            </div>
          </div>

          {/* Use Cases Section */}
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
                  Comment l'IA transforme les entreprises au Burkina Faso
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                  Des solutions concrètes, adaptées au marché ouest-africain, pour automatiser votre croissance et multiplier vos résultats.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {useCases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    className="bg-background rounded-2xl p-6 md:p-8 shadow-lg border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center mb-4">
                      <useCase.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-3">{useCase.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{useCase.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Why IA for Africa Section */}
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
                Pourquoi l'IA est indispensable pour les entreprises africaines
              </h2>
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-white">
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold mb-2">70%</p>
                  <p className="text-sm md:text-base text-white/80">du temps perdu en tâches répétitives peut être automatisé</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold mb-2">24/7</p>
                  <p className="text-sm md:text-base text-white/80">votre chatbot répond à vos clients même quand vous dormez</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold mb-2">×3</p>
                  <p className="text-sm md:text-base text-white/80">multipliez vos leads grâce à la prospection automatisée</p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* FAQ-style section for SEO */}
          <AnimatedSection animation="fade-up">
            <div className="mt-20 md:mt-28 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Questions fréquentes sur l'IA et l'automatisation
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "L'IA est-elle adaptée aux PME au Burkina Faso ?",
                    a: "Absolument. Nos solutions sont spécialement conçues pour le contexte africain : tarifs accessibles, outils simples à prendre en main, et intégration avec les plateformes que vous utilisez déjà (WhatsApp, Facebook, Instagram). Que vous soyez à Ouagadougou, Bobo-Dioulasso ou ailleurs en Afrique de l'Ouest, l'IA est désormais à votre portée."
                  },
                  {
                    q: "Combien coûte un chatbot WhatsApp pour mon entreprise ?",
                    a: "Le coût varie selon vos besoins (nombre de conversations, fonctionnalités, intégrations). Chez BinkoO Digital Lab, nous proposons des formules adaptées au budget des entreprises burkinabè et ouest-africaines. Contactez-nous pour un devis gratuit et personnalisé."
                  },
                  {
                    q: "Est-ce que l'automatisation va remplacer mes employés ?",
                    a: "Non. L'automatisation libère vos équipes des tâches répétitives pour qu'elles se concentrent sur ce qui crée vraiment de la valeur : la relation client, la stratégie, la vente. C'est un outil qui amplifie les performances humaines, pas qui les remplace."
                  },
                  {
                    q: "Quels résultats concrets puis-je attendre ?",
                    a: "Nos clients constatent généralement une réduction de 50 à 70% du temps consacré aux tâches administratives, une augmentation significative du taux de réponse client, et une croissance du nombre de leads qualifiés grâce à la prospection automatisée."
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
          title="Prêt à automatiser votre succès au Burkina Faso ?"
          description="Décrivez-nous votre activité et nous vous montrons comment l'IA peut transformer concrètement vos résultats. Devis gratuit en 24h."
        />
      </div>
    </>
  );
};

export default IAAutomatisation;
