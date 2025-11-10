import React, { useState, useEffect } from 'react';
import { ArrowRight, Target, Award, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import InteractiveCard from '@/components/ui/InteractiveCard';
import { motion } from 'framer-motion';
import Carousel from '@/components/ui/Carousel';
import { FiTarget, FiShield, FiUsers, FiLock, FiDollarSign } from 'react-icons/fi';
import { Highlighter } from '@/components/ui/highlighter';
import { AnimatedSection, AnimatedParagraph, AnimatedImage } from '@/components/AnimatedSection';

// Declare the custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': any;
    }
  }
}

const About: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const whatsappUrl = 'https://api.whatsapp.com/send?phone=22644323841';
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const testimonials = [
  {
    id: 1,
    name: 'Fatoumata Traoré',
    company: 'Boutique locale',
    role: 'Gérante',
    content: 'Grâce à BinkoO Digital Lab, notre site est enfin professionnel et simple à gérer. Ils ont été disponibles, rapides et très attentifs à nos besoins.',
    rating: 5
  },
  {
    id: 2,
    name: 'Issouf Kaboré',
    company: 'Fast Food',
    role: 'Propriétaire',
    content: 'L\'équipe BinkoO m\'a aidé à automatiser la prise de commande de mon restaurant. Depuis, je gagne un temps fou et mes clients sont mieux servis.',
    rating: 5
  },
  {
    id: 3,
    name: 'Aïcha Sawadogo',
    company: 'Institut de beauté',
    role: 'Fondatrice',
    content: 'J\'ai commandé un logo et des affiches pour ma marque. Franchement, c\'était propre, moderne et livré plus vite que prévu.',
    rating: 5
  },
  {
    id: 4,
    name: 'Moussa Ouédraogo',
    company: 'Indépendant',
    role: 'Entrepreneur',
    content: 'Ce que j\'ai le plus apprécié, c\'est le suivi après la livraison. Ils ne disparaissent pas après le projet, ils restent là pour aider.',
    rating: 5
  }];

  const valuesCarouselItems = [
    {
      id: 1,
      title: '🔹 Efficacité et qualité',
      description: 'Des projets réalisés avec rigueur, livrés à temps, et pensés pour durer.',
      icon: <FiTarget className="carousel-icon" />
    },
    {
      id: 2,
      title: '🔹 Transparence',
      description: 'Une communication claire à chaque étape. Pas de jargon inutile, pas de promesses irréalistes.',
      icon: <FiShield className="carousel-icon" />
    },
    {
      id: 3,
      title: '🔹 Proximité et écoute',
      description: 'Chaque client est unique. Nous prenons le temps de comprendre ses besoins et d\'y répondre de manière personnalisée.',
      icon: <FiUsers className="carousel-icon" />
    },
    {
      id: 4,
      title: '🔹 Sécurité des données',
      description: 'La confidentialité et la fiabilité sont au cœur de toutes nos créations.',
      icon: <FiLock className="carousel-icon" />
    },
    {
      id: 5,
      title: '🔹 Accessibilité',
      description: 'Des services adaptés à tous les budgets, sans jamais sacrifier la qualité.',
      icon: <FiDollarSign className="carousel-icon" />
    }
  ];

  // Load Lottie script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.5/dist/dotlottie-wc.js';
    script.type = 'module';
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
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
            À Propos de Nous
          </h1>
          <AnimatedParagraph delay={0.2}>
          <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            BinkoO Digital Lab est née d'une idée simple : <Highlighter action="underline" color="#FF9800">rendre la technologie utile et accessible</Highlighter> pour les entreprises locales.
          </p>
          </AnimatedParagraph>
        </motion.div>
        </AnimatedSection>

        {/* Main Story with Values Carousel */}
        <AnimatedSection animation="fade-up" delay={0.1}>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <div className="space-y-5 md:space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Notre Histoire</h2>
            <AnimatedParagraph delay={0.2}>
            <div className="space-y-4 md:space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                BinkoO Digital Lab est née d'une idée simple : rendre la <Highlighter action="highlight" color="#E5002E">technologie</Highlighter> utile, accessible et réellement bénéfique pour les <Highlighter action="highlight" color="#F3F4F6">entreprises locales</Highlighter>.
              </p>
              <p>
                Depuis nos débuts, nous aidons les marques, entrepreneurs et organisations à <Highlighter action="highlight" color="#3B82F6">automatiser</Highlighter>, se <Highlighter action="highlight" color="#3B82F6">digitaliser</Highlighter> et se démarquer grâce à des <Highlighter action="underline" color="#FF9800">outils simples mais puissants</Highlighter>.
              </p>
              <p>
                Nous ne faisons pas du digital pour le prestige. Nous créons des solutions concrètes qui font gagner du temps, améliorent la <Highlighter action="highlight" color="#E5002E">productivité</Highlighter> et renforcent l'image de nos clients.
              </p>
              <p>
                Basée au Burkina Faso, notre agence s'impose comme un <Highlighter action="underline" color="#FF9800">partenaire jeune, audacieux et fiable</Highlighter> pour tous ceux qui veulent passer à un autre niveau.
              </p>
              <p>
                Chaque projet est pour nous une collaboration — une aventure humaine où la réussite du client devient la nôtre.
              </p>
              <p>
                Chez BinkoO Digital Lab, nous croyons qu'un bon projet ne se résume pas à un beau design : il doit fonctionner, convertir et <Highlighter action="highlight" color="#E5002E">durer</Highlighter>.
              </p>
              <p>
                C'est pourquoi nous restons toujours <Highlighter action="underline" color="#FF9800">disponibles même après la livraison</Highlighter>, pour accompagner, ajuster et faire évoluer les solutions de nos clients.
              </p>
              <p>
                Notre histoire, c'est celle d'une agence née de la passion et de la volonté d'apporter un vrai changement dans la façon dont les entreprises utilisent la technologie.
              </p>
              <p>
                Aujourd'hui, cette passion continue de grandir avec chaque client qui nous fait confiance.
              </p>
            </div>
            </AnimatedParagraph>
          </div>

          {/* Values Carousel - Replaces the red card */}
          <AnimatedImage delay={0.3}>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Nos Valeurs</h2>
              <div className="flex justify-center" style={{ minHeight: '380px' }}>
                <Carousel
                  items={valuesCarouselItems}
                  baseWidth={400}
                  autoplay={true}
                  autoplayDelay={3000}
                  pauseOnHover={true}
                  loop={true}
                  round={false}
                />
              </div>
            </div>
          </div>
          </AnimatedImage>
        </motion.div>
        </AnimatedSection>

        {/* Lottie Animation */}
        <AnimatedImage delay={0.1}>
        <motion.div
          className="mb-12 md:mb-16 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          <dotlottie-wc 
            src="https://lottie.host/e4190787-d674-4c67-bc19-f959156ebc4a/UkK8s9D9QX.lottie" 
            style={{ width: '300px', height: '300px' }}
            autoplay 
            loop
          />
        </motion.div>
        </AnimatedImage>

        {/* Mission */}
        <AnimatedSection animation="fade-up">
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <InteractiveCard delay={200}>
            <div className="p-8 md:p-10 lg:p-12 text-center bg-gradient-to-br from-surface to-accent">
              <h2 className="text-3xl md:text-4xl font-bold mb-5 md:mb-6">Notre Mission</h2>
              <AnimatedParagraph delay={0.2}>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-4">
                Permettre à chaque entreprise de <Highlighter action="underline" color="#FF9800">tirer pleinement profit du digital</Highlighter> et de l'<Highlighter action="highlight" color="#E5002E">intelligence artificielle</Highlighter>.
              </p>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8 md:mb-10">
                Nous aidons nos clients à <Highlighter action="highlight" color="#3B82F6">automatiser</Highlighter> leurs tâches, à <Highlighter action="underline" color="#FF9800">bâtir une présence en ligne professionnelle</Highlighter> et à renforcer leur <Highlighter action="highlight" color="#F3F4F6">image de marque</Highlighter> — <Highlighter action="underline" color="#FF9800">sans complexité, sans coût exagéré</Highlighter>, et avec des <Highlighter action="highlight" color="#E5002E">résultats visibles</Highlighter>.
              </p>
              </AnimatedParagraph>
            </div>
          </InteractiveCard>
        </motion.div>
        </AnimatedSection>

        {/* Pourquoi Nous Faire Confiance - MOVED BEFORE Testimonials */}
        <AnimatedImage delay={0.1}>
        <motion.div
          className="mb-12 md:mb-16 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          <dotlottie-wc 
            src="https://lottie.host/e1dda74e-af40-4bc3-be8d-9e02b572de79/Opm4VaEjvE.lottie" 
            style={{ width: '280px', height: '280px', maxWidth: '100%' }}
            autoplay 
            loop
          />
        </motion.div>
        </AnimatedImage>

        <AnimatedSection animation="fade-up">
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <InteractiveCard delay={200}>
            <div className="p-8 md:p-10 lg:p-12 text-center bg-gradient-to-br from-surface to-accent">
              <h2 className="text-3xl md:text-4xl font-bold mb-5 md:mb-6">Pourquoi Nous Faire Confiance</h2>
              <AnimatedParagraph delay={0.2}>
              <div className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed space-y-4">
                <p>
                  Nous connaissons les réalités des entreprises d'aujourd'hui : le manque de temps, la recherche de <Highlighter action="highlight" color="#E5002E">fiabilité</Highlighter>, le besoin de résultats concrets.
                </p>
                <p>
                  Notre approche est simple : <Highlighter action="underline" color="#FF9800">écouter, comprendre, exécuter et accompagner</Highlighter>.
                </p>
                <p>
                  Chez BinkoO Digital Lab, la <Highlighter action="highlight" color="#F3F4F6">relation client</Highlighter> est au centre de tout — <Highlighter action="underline" color="#FF9800">approche humaine, directe et durable</Highlighter>.
                </p>
                <p>
                  C'est ce qui fait que nos <Highlighter action="underline" color="#FF9800">clients nous recommandent et grandissent avec nous</Highlighter>.
                </p>
              </div>
              </AnimatedParagraph>
            </div>
          </InteractiveCard>
        </motion.div>
        </AnimatedSection>

        {/* Testimonials - MOVED AFTER Pourquoi Nous Faire Confiance */}
        <AnimatedSection animation="fade-up">
        <div className="mb-16 md:mb-20">
          <motion.div
            className="text-center mb-10 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>

            <h2 className="text-3xl md:text-4xl font-bold mb-5 md:mb-6">
              Témoignages de Nos Clients
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <InteractiveCard delay={0}>
              <div className="p-8 md:p-10 lg:p-12 text-center">
                <div className="mb-5 md:mb-6">
                  {[...Array(5)].map((_, i) =>
                  <span key={i} className="text-xl md:text-2xl text-yellow-400">★</span>
                  )}
                </div>
                
                <blockquote className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-6 md:mb-8 italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div>
                  <p className="text-base md:text-lg font-semibold">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
                    {testimonials[currentTestimonial].role} - {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
            </InteractiveCard>

            {/* Navigation */}
            <div className="flex items-center justify-center mt-6 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 bg-surface hover:bg-accent rounded-full transition-colors">

                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) =>
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-muted'}`
                  } />

                )}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-2 bg-surface hover:bg-accent rounded-full transition-colors">

                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
        </AnimatedSection>

        {/* Notre Engagement */}
        <AnimatedSection animation="fade-up">
        <motion.div
          className="mt-16 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <InteractiveCard delay={200}>
            <div 
              className="p-8 md:p-10 lg:p-12 text-center"
              style={{
                background: 'linear-gradient(225deg, hsla(0, 96%, 56%, 1) 0%, hsla(0, 92%, 20%, 1) 80%)'
              }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-5 md:mb-6 text-white">Notre Engagement</h2>
              <AnimatedParagraph delay={0.2}>
              <div className="text-sm md:text-base lg:text-lg max-w-4xl mx-auto leading-relaxed space-y-4 text-white">
                <p className="text-white">
                  Chez BinkoO Digital Lab, vous n'êtes pas un simple client : vous êtes un partenaire.
                </p>
                <p className="text-white">
                  Notre engagement, c'est de vous accompagner sur la durée, de vous fournir des outils fiables et de toujours garder une touche humaine dans tout ce que nous faisons.
                </p>
                <p className="font-semibold text-white">
                  Votre succès est notre plus belle réussite.
                </p>
              </div>
              </AnimatedParagraph>
            </div>
          </InteractiveCard>
        </motion.div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection animation="fade-up">
        <motion.div
          className="mt-20 md:mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <h2 className="text-3xl md:text-4xl font-bold mb-5 md:mb-6 !whitespace-pre-line">Rejoignez l'Aventure 

          </h2>
          <AnimatedParagraph delay={0.2}>
          <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            Prêt à transformer votre vision en réalité digitale ? 
            Contactez-nous et découvrons ensemble les possibilités infinies.
          </p>
          </AnimatedParagraph>
          <a
            href="#"
            onClick={handleWhatsAppClick}>

            <Button size="lg">
              Commençons à créer ensemble
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </motion.div>
        </AnimatedSection>
      </div>
    </div>);

};

export default About;