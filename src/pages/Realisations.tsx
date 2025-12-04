import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InteractiveCard from '@/components/ui/InteractiveCard';
import Folder from '@/components/ui/Folder';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedParagraph, AnimatedImage } from '@/components/AnimatedSection';
import SEO from '@/components/SEO';

const Realisations: React.FC = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const whatsappUrl = 'https://api.whatsapp.com/send?phone=22644323841';
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const binkooImages = [
    <img 
      key="binkoo-1" 
      src="https://i.postimg.cc/85dNGbK6/msedge-m-T1m1b-Md-NY.png" 
      alt="BinkoO Store Hero"
      className="rounded-xl w-full h-full object-contain"
    />,
    <img 
      key="binkoo-2" 
      src="https://i.postimg.cc/7Y5PGSfy/msedge-Usw-X8nt-QGv.png" 
      alt="BinkoO Store Produits"
      className="rounded-xl w-full h-full object-contain"
    />,
    <img 
      key="binkoo-3" 
      src="https://i.postimg.cc/WzQBJFHk/msedge-Uw-TP6v-E3Sk.png" 
      alt="BinkoO Store Contact"
      className="rounded-xl w-full h-full object-contain"
    />
  ];

  const lindaImages = [
    <img 
      key="linda-1" 
      src="https://i.postimg.cc/NjpwdM9h/msedge-a-Uw-BZ6u5Oh.png" 
      alt="Linda Maïssar - Mes Livres"
      className="rounded-xl w-full h-full object-contain"
    />,
    <img 
      key="linda-2" 
      src="https://i.postimg.cc/59kk0ChT/msedge-o-Yx9ORu-STc.png" 
      alt="Linda Maïssar - Mes Services"
      className="rounded-xl w-full h-full object-contain"
    />,
    <img 
      key="linda-3" 
      src="https://i.postimg.cc/Qtc4n44W/msedge-v-Vh7V5FME2.png" 
      alt="Linda Maïssar - Accueil"
      className="rounded-xl w-full h-full object-contain"
    />
  ];

  const bonplatImages = [
    <img 
      key="bonplat-1" 
      src="https://i.postimg.cc/T29QLWBz/msedge-f180y-Du80q.png" 
      alt="BONPLAT Pingdwendé - Nos Menus"
      className="rounded-xl w-full h-full object-contain"
    />,
    <img 
      key="bonplat-2" 
      src="https://i.postimg.cc/FFfVTn6k/msedge-Gf5hg-DL269.jpg" 
      alt="BONPLAT Pingdwendé - Accueil"
      className="rounded-xl w-full h-full object-contain"
    />,
    <img 
      key="bonplat-3" 
      src="https://i.postimg.cc/6qmvVwrs/msedge-W99r-Jqy-LXt.png" 
      alt="BONPLAT Pingdwendé - Service Traiteur"
      className="rounded-xl w-full h-full object-contain"
    />
  ];

  const projects = [
    {
      title: 'BONPLAT Pingdwendé',
      category: 'Solution culinaire 2.0',
      description: 'BONPLAT Pingdwendé — La révolution digitale dans l\'art culinaire burkinabè. Un site web minimaliste et ultra-performant couplé à un assistant IA intelligent qui transforme les visiteurs en clients fidèles.',
      detailedText: 'BONPLAT Pingdwendé — La révolution digitale dans l\'art culinaire burkinabè. Un site web minimaliste et ultra-performant couplé à un assistant IA intelligent qui transforme les visiteurs en clients fidèles. L\'innovation : Un Concierge Digital Intelligent. Contrairement aux chatbots basiques qui donnent des réponses génériques, notre assistant IA comprend le contexte de chaque demande. Il répond instantanément aux questions sur les menus, les prix, les horaires de livraison, et guide naturellement vers la commande. Pourquoi cette technologie change tout : Plus de clients perdus — Réponses immédiates 24h/24, même hors horaires d\'ouverture. Conversion boostée — L\'IA identifie les intentions d\'achat et guide vers la commande. Gain de temps radical — Fini les appels répétitifs pour les mêmes questions. Service personnalisé — Chaque interaction est adaptée au contexte du client. Résultat concret : Vos visiteurs deviennent clients en quelques clics, sans friction, sans attente. Une expérience si fluide qu\'ils reviennent naturellement.',
      folderImages: bonplatImages,
      link: 'https://bonplatpingdwende.netlify.app',
    },
    {
      title: 'BinkoO Store',
      category: 'E-commerce Moderne & Automatisé',
      description: 'BinkoO Store — La boutique en ligne qui allie design, rapidité et automatisation. Une plateforme e-commerce fluide et intuitive pensée pour le marché burkinabè, avec un système de commande automatique via WhatsApp.',
      detailedText: 'BinkoO Store est une boutique en ligne nouvelle génération conçue pour offrir une expérience d\'achat rapide, claire et agréable. L\'objectif : permettre aux utilisateurs de commander directement leurs produits via WhatsApp en un clic, sans complications. Le site se distingue par sa vitesse exceptionnelle, son interface minimaliste et un design orienté conversion — chaque section a été pensée pour transformer les visiteurs en acheteurs. Nous avons mis l\'accent sur la fiabilité, la simplicité et la performance mobile, car c\'est là que se trouve la majorité des clients aujourd\'hui. Un projet 100% conçu pour le marché africain moderne.',
      folderImages: binkooImages,
      link: 'https://binkoo.store',
    },
    {
      title: 'Linda Maïssar GUEYE',
      category: 'Portfolio d\'écrivaine professionnelle',
      description: 'Linda Maïssar GUEYE — Un site d\'auteure à l\'image de ses mots. Un portfolio fluide, esthétique et poétique qui met en valeur ses livres et ses services de correction littéraire.',
      detailedText: 'Ce site web a été conçu pour refléter la personnalité élégante et inspirante de Linda Maïssar GUEYE, écrivaine et correctrice basée à Bobo-Dioulasso. Nous avons opté pour une navigation claire, une présentation harmonieuse de ses livres, et une mise en avant de ses services de correction et de relecture académique. L\'expérience utilisateur est fluide, rapide et agréable sur tous les écrans. Chaque page a été pensée pour inciter à la découverte tout en gardant une touche professionnelle et littéraire. Le résultat : un site sobre, captivant et parfaitement aligné avec la vision d\'une écrivaine moderne et connectée.',
      folderImages: lindaImages,
      link: 'https://lindamaissargueye.netlify.app',
    },
  ];


  return (
    <>
      <SEO 
        title="Nos Réalisations - BinkoO Digital Lab"
        description="Découvrez nos projets web : sites e-commerce, portfolios d'auteur, solutions IA. Réalisations concrètes pour le marché burkinabè. Design moderne et performances optimales."
        canonical="https://binkoodigitallab.com/realisations"
        keywords="réalisations BinkoO, portfolio projets, sites web Burkina Faso, projets e-commerce, BinkoO Store, Linda Maïssar, BONPLAT"
      />
      <div className="py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection animation="fade-up">
        <motion.div 
          className="text-center mb-8 md:mb-10 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 md:mb-6">
            Nos Réalisations
          </h1>
          <AnimatedParagraph delay={0.2}>
          <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
            Chaque projet est une preuve de notre engagement à offrir des solutions performantes, esthétiques et adaptées au marché local.
          </p>
          </AnimatedParagraph>
        </motion.div>
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
          {projects.map((project, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 0.15}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <InteractiveCard delay={index * 100}>
                <div className="overflow-visible h-full flex flex-col">
                  {/* Project Folder - Mobile optimized positioning */}
                  <AnimatedImage delay={0.2}>
                  <div className="min-h-[300px] sm:min-h-[340px] md:min-h-[400px] lg:min-h-[440px] flex items-center justify-center overflow-visible pt-10 sm:pt-4">
                    <Folder items={project.folderImages} />
                  </div>
                  </AnimatedImage>

                  {/* Project Content */}
                  <div className="pt-0 px-6 pb-6 md:px-7 md:pb-7 lg:px-8 lg:pb-8 flex-grow flex flex-col">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium mb-4 md:mb-5 w-fit">
                      {project.category}
                    </span>
                    
                    <h3 className="font-bold text-xl md:text-2xl mb-4 md:mb-5">
                      {project.title}
                    </h3>
                    
                    <AnimatedParagraph delay={0.3}>
                    <p className="text-sm md:text-base text-muted-foreground mb-5 md:mb-6 leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    </AnimatedParagraph>

                    {/* Collapsible Detailed Text */}
                    <Collapsible 
                      open={expandedProject === index} 
                      onOpenChange={() => setExpandedProject(expandedProject === index ? null : index)}
                      className="mb-5 md:mb-6"
                    >
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          En savoir plus
                          <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${expandedProject === index ? 'rotate-180' : ''}`} />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-4">
                        <div className="bg-muted/50 rounded-lg p-4 md:p-5">
                          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                            {project.detailedText}
                          </p>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-block w-fit"
                    >
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium whitespace-nowrap">
                        <span>Voir le site</span>
                        <ArrowRight className="h-4 w-4 flex-shrink-0" />
                      </button>
                    </a>
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Call to Action */}
        <AnimatedSection animation="fade-up">
        <motion.div 
          className="mt-16 md:mt-20 text-center bg-gradient-to-br from-surface to-accent p-8 md:p-10 lg:p-12 rounded-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 md:mb-6">
            Et si le prochain projet, c'était le vôtre ?
          </h2>
          <AnimatedParagraph delay={0.2}>
          <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            Vous avez une idée ? Nous avons les outils pour la concrétiser.
          </p>
          </AnimatedParagraph>
          <a
            href="#"
            onClick={handleWhatsAppClick}
          >
            <Button size="lg">
              Démarrer votre Projet
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </motion.div>
        </AnimatedSection>
      </div>
    </div>
    </>
  );
};

export default Realisations;
