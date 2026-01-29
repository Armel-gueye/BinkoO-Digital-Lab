import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { ThreeDButton } from '@/components/ui/3d-button';
import InteractiveCard from '@/components/ui/InteractiveCard';
import { ScrollTimeline } from '@/components/lightswind/scroll-timeline';
import OrbitCard from '@/components/ui/OrbitCard';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedParagraph, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { Contact2 } from '@/components/Contact2';
import { openWhatsApp, getWhatsAppUrl } from '@/utils/whatsapp';
import SEO from '@/components/SEO';

const Contact: React.FC = () => {
  const socialMediaMethods = [
    {
      lottieUrl: 'https://lottie.host/embed/c06e2d38-4a5a-478f-872c-90cb11430450/R9kKEFDR84.lottie',
      title: 'LinkedIn',
      description: 'Suivez nos actualités et connectez-vous avec notre réseau professionnel.',
      action: 'Voir le profil',
      link: 'https://www.linkedin.com/in/binkoo-digital-lab-5a012b385?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
    },
    {
      lottieUrl: 'https://lottie.host/embed/322ecd45-4d7d-4e25-991d-67cf9f38b60f/25cKPFiX8N.lottie',
      title: 'Instagram',
      description: 'Découvrez nos créations et coulisses à travers nos stories visuelles.',
      action: 'Suivre sur Instagram',
      link: 'https://www.instagram.com/binkoo_digital_lab?igsh=MXcyYjRpbHBrbjh1ag%3D%3D&utm_source=qr'
    },
    {
      lottieUrl: 'https://lottie.host/embed/d187b148-9be5-4380-bf85-249d500f33f5/9fhw0zZEKs.lottie',
      title: 'Facebook',
      description: 'Rejoignez notre communauté et participez aux discussions.',
      action: 'Visiter la page',
      link: 'https://www.facebook.com/share/1JPaSH1STA/?mibextid=wwXIfr'
    },
    {
      lottieUrl: 'https://lottie.host/embed/c6ea2d9d-e348-4895-b7c8-e709223fdb75/9WUSAWtnJ5.lottie',
      title: 'TikTok',
      description: 'Suivez nos tips tech et découvrez nos projets en format court.',
      action: 'Découvrir TikTok',
      link: 'https://www.tiktok.com/@binkoo.digital.lab?_t=ZM-90kNEp9sTGt&_r=1'
    }];

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsApp();
  };

  const quickActions = [
    {
      title: 'Devis Express',
      description: 'Obtenez une estimation rapide pour votre projet sur WhatsApp',
      cta: 'Demander un devis',
      link: getWhatsAppUrl()
    },
    {
      title: 'Appel Découverte',
      description: "Contactez-nous au +226 44 32 38 41 pour discuter de vos besoins",
      cta: 'Planifier un appel',
      link: 'tel:+22644323841'
    }];

  // Timeline items for social media
  const timelineItems = socialMediaMethods.map((method) => ({
    icon:
      <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto">
        <iframe
          src={method.lottieUrl}
          className="w-full h-full border-0"
              style={{ pointerEvents: 'none' }}
              loading="lazy"
              referrerPolicy="no-referrer"
            />

      </div>,

    title: method.title,
    description: method.description,
    action:
      <a
        href={method.link}
        target={method.link.startsWith('http') ? '_blank' : '_self'}
        rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
        className="inline-block">

        <ThreeDButton className="px-6 py-2.5">
          <span className="flex items-center gap-2 justify-center">
            {method.action}
            <ArrowRight className="h-4 w-4" />
          </span>
        </ThreeDButton>
      </a>

  }));

  return (
    <>
      <SEO
        title="Contactez l'Agence BinkoO - Bobo-Dioulasso"
        description="Contactez BinkoO Digital Lab à Bobo-Dioulasso. Nous sommes disponibles sur WhatsApp, téléphone et réseaux sociaux pour discuter de vos projets digitaux. Devis gratuit."
        canonical="https://binkoo.digital/contact"
        keywords="contact BinkoO, agence digitale Bobo-Dioulasso, devis gratuit, WhatsApp BinkoO, +226 44 32 38 41, Lafiabougou Secteur 20"
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
                Contactez-Nous
              </h1>
              <AnimatedParagraph delay={0.2}>
                <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  Une question ? Un projet en tête ? Plusieurs façons de nous joindre pour
                  commencer cette belle collaboration digitale ensemble.
                </p>
              </AnimatedParagraph>
            </motion.div>
          </AnimatedSection>

          {/* Social Media Timeline */}
          <AnimatedSection animation="fade-up" delay={0.1}>
            <div className="mb-16 md:mb-20">
              <motion.div
                className="text-center mb-10 md:mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}>

                <h2 className="text-3xl md:text-4xl font-bold mb-5 md:mb-6">
                  Nos Canaux de Communication
                </h2>
                <AnimatedParagraph delay={0.2}>
                  <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Choisissez le moyen qui vous convient le mieux pour nous contacter.
                    Notre équipe est présente sur tous ces canaux pour vous accompagner.
                  </p>
                </AnimatedParagraph>
              </motion.div>

              <ScrollTimeline items={timelineItems} className="max-w-5xl mx-auto" />
            </div>
          </AnimatedSection>

          {/* Contact2 - Remplacement de la section WhatsApp */}
          <Contact2
            title="C'est le Moment de Collaborer."
            description="Vous avez une idée claire ? Un problème précis à résoudre ? Envoyez-nous un message direct. Notre équipe est prête à démarrer la discussion."
          />

          {/* Quick Actions - Desktop/Tablet: Regular grid */}
          <StaggerContainer className="hidden md:grid md:grid-cols-2 gap-5 md:gap-6 mb-16 md:mb-20" staggerChildren={0.15}>
            {quickActions.map((action, index) =>
              <StaggerItem key={index} variant="fade-up">
                <InteractiveCard delay={0}>
                  <div className="p-6 md:p-7 lg:p-8 text-center h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                        {action.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground mb-5 md:mb-6 leading-relaxed !w-full !h-[72px]">
                        {action.description}
                      </p>
                    </div>
                    <a
                      href={action.link === 'whatsapp' ? '#' : action.link}
                      onClick={action.link === 'whatsapp' ? handleWhatsAppClick : undefined}
                      target={action.link.startsWith('http') || action.link === 'whatsapp' ? '_blank' : '_self'}
                      rel={action.link.startsWith('http') || action.link === 'whatsapp' ? 'noopener noreferrer' : ''}
                      className="mt-auto inline-block">

                      <ThreeDButton className="w-full">
                        <span className="flex items-center gap-2 justify-center">
                          {action.cta}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </ThreeDButton>
                    </a>
                  </div>
                </InteractiveCard>
              </StaggerItem>
            )}
          </StaggerContainer>

          {/* Quick Actions - Mobile: Bento Grid */}
          <StaggerContainer className="md:hidden grid grid-cols-2 gap-5 mb-16" staggerChildren={0.15}>
            {quickActions.map((action, index) =>
              <StaggerItem key={index} variant="fade-up">
                <InteractiveCard delay={0}>
                  <div className="p-5 text-center h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-semibold mb-2">
                        {action.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                    <a
                      href={action.link === 'whatsapp' ? '#' : action.link}
                      onClick={action.link === 'whatsapp' ? handleWhatsAppClick : undefined}
                      target={action.link.startsWith('http') || action.link === 'whatsapp' ? '_blank' : '_blank'}
                      rel={action.link.startsWith('http') || action.link === 'whatsapp' ? 'noopener noreferrer' : ''}
                      className="mt-auto inline-block">

                      <ThreeDButton className="w-full">
                        <span className="flex items-center gap-1 justify-center text-xs">
                          {action.cta}
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </ThreeDButton>
                    </a>
                  </div>
                </InteractiveCard>
              </StaggerItem>
            )}
          </StaggerContainer>

          {/* Additional Info */}
          <AnimatedSection animation="fade-up">
            <div className="mt-10 md:mt-12 text-center">
              <AnimatedParagraph delay={0.1}>
                <p className="text-sm md:text-base text-muted-foreground mb-2 md:mb-3 !whitespace-pre-line">
                  <strong>Temps de réponse moyen :</strong> 15-30 minutes
                </p>
              </AnimatedParagraph>
              <AnimatedParagraph delay={0.2}>
                <p className="text-sm md:text-base text-muted-foreground">
                  <strong>Disponibilité :</strong> Accessible en permanence pour vous servir, du lundi au dimanche, à tout moment.
                </p>
              </AnimatedParagraph>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );

};

export default Contact;
