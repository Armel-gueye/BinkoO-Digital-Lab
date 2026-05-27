import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Zap, MapPin, ShieldCheck, ArrowRight, Bot, Code, Palette, Check } from 'lucide-react';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { VelocityScroll } from '@/components/ui/scroll-based-velocity';
import { AnimatedSection, AnimatedParagraph, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import SEO from '@/components/SEO';
import { Contact2 } from '@/components/Contact2';
import { trackDevisClick } from '@/utils/analytics';

export default function LocalHub() {
  const { city } = useParams();
  
  // Format city name nicely (e.g. "abidjan" -> "Abidjan", "bobo-dioulasso" -> "Bobo-Dioulasso")
  const formattedCity = city 
    ? city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-') 
    : "votre ville";

  return (
    <>
      <SEO
        title={`Agence IA & Automatisation à ${formattedCity} | BinkoO Digital Lab`}
        description={`Accélérez la croissance de votre entreprise à ${formattedCity}. BinkoO Digital Lab est votre partenaire d'excellence en intelligence artificielle, automatisation et création web.`}
        canonical={`https://binkoo.digital/agence-ia-automatisation/${city}`}
        keywords={`agence ia ${formattedCity}, agence automatisation ${formattedCity}, agence intelligence artificielle ${formattedCity}, BinkoO`}
        localCity={formattedCity}
      />
      
      <div className="min-h-screen bg-background text-foreground">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] flex flex-col justify-center items-center pt-28 pb-20 text-center">
          <div className="container-fluid relative z-10 mx-auto px-6 flex flex-col items-center max-w-4xl">
            
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-border bg-background shadow-sm mb-10"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold tracking-widest uppercase text-foreground">Partenaire d'Excellence à {formattedCity}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight"
            >
              L'innovation technologique{' '}
              <br className="hidden md:block"/>
              au service de <span className="text-primary">{formattedCity}.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-base md:text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl"
            >
              BinkoO Digital Lab accompagne les leaders économiques de <strong className="text-foreground">{formattedCity}</strong> dans leur transformation. 
              De la création de plateformes web sur-mesure à l'intégration de systèmes automatisés, nous concevons des architectures digitales haute performance.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-5"
            >
              <a 
                href="https://api.whatsapp.com/send?phone=22644323841"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDevisClick('local_hub_hero')} 
                className="inline-block"
              >
                <InteractiveHoverButton text="Nous contacter" />
              </a>
              <Link to="/realisations" className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-2 group">
                Explorer nos réalisations <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* SCROLLING TEXT */}
        <VelocityScroll
          text="Systèmes Autonomes • Création Web • Branding • Design Stratégique • Agents IA sur mesure • "
          default_velocity={1.5}
          className="font-display text-center text-3xl font-bold tracking-[-0.02em] text-foreground/10 md:text-5xl md:leading-[5rem]"
        />

        {/* POURQUOI NOUS CHOISIR */}
        <AnimatedSection animation="fade-up">
          <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
            <div className="container-fluid">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3 md:mb-4">
                  Notre Approche
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">La proximité digitale à {formattedCity}</h2>
                <AnimatedParagraph delay={0.2}>
                  <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
                    Pourquoi faire appel à BinkoO Digital Lab ? Parce que l'innovation digitale ne s'encombre pas de frontières. Notre méthodologie asynchrone redéfinit l'efficacité.
                  </p>
                </AnimatedParagraph>
              </motion.div>

              <div className="space-y-8 md:space-y-10 max-w-4xl mx-auto">
                <AnimatedParagraph delay={0.3}>
                  <div className="flex gap-4 md:gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center">
                        <Zap className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Réactivité Asynchrone</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        Loin des réunions interminables, nous utilisons Slack, Notion et Trello. Vous suivez l'avancée de votre projet en temps réel, avec une réactivité souvent supérieure à celle d'une agence de quartier.
                      </p>
                    </div>
                  </div>
                </AnimatedParagraph>

                <AnimatedParagraph delay={0.4}>
                  <div className="flex gap-4 md:gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Budget 100% Valeur</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        En n'ayant pas de bureaux physiques coûteux à {formattedCity}, vos investissements financent directement notre expertise technologique et la qualité de votre produit final, rien d'autre.
                      </p>
                    </div>
                  </div>
                </AnimatedParagraph>

                <AnimatedParagraph delay={0.5}>
                  <div className="flex gap-4 md:gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center">
                        <Globe className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Vision Panafricaine</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        Notre laboratoire tech concentre le meilleur des standards mondiaux (Systèmes Autonomes, IA générative, React) tout en comprenant parfaitement les réalités économiques de l'Afrique de l'Ouest.
                      </p>
                    </div>
                  </div>
                </AnimatedParagraph>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* SERVICES PHARES */}
        <AnimatedSection animation="fade-up">
          <section className="py-16 md:py-24 lg:py-32">
            <div className="container-fluid">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3 md:mb-4">
                  Nos Expertises
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Expertises d'ingénierie</h2>
                <AnimatedParagraph delay={0.2}>
                  <p className="text-base md:text-lg max-w-3xl mx-auto text-muted-foreground mt-4">
                    Nos solutions phares déployées pour nos partenaires à {formattedCity}.
                  </p>
                </AnimatedParagraph>
              </motion.div>
              
              <div className="space-y-8 md:space-y-10 max-w-5xl mx-auto">
                {/* Service 1 */}
                <AnimatedSection animation="fade-up" delay={0.1}>
                  <Link to="/services/ia-automatisation" className="group block">
                    <div className="bg-background rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-border hover:border-primary/30 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Bot className="w-7 h-7 md:w-8 md:h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl md:text-2xl font-bold mb-3">Systèmes & IA</h3>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            Éliminez les tâches répétitives. Déployez des systèmes autonomes, intégrez des agents IA sur mesure et automatisez l'entièreté de vos processus métier (CRM, facturation, leads).
                          </p>
                        </div>
                        <div className="flex-shrink-0 hidden md:flex">
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>

                {/* Service 2 */}
                <AnimatedSection animation="fade-up" delay={0.2}>
                  <Link to="/services/sites-app-web" className="group block">
                    <div className="bg-background rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-border hover:border-primary/30 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Code className="w-7 h-7 md:w-8 md:h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl md:text-2xl font-bold mb-3">Création Web & App</h3>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            Plates-formes e-commerce, applications SaaS et sites vitrines ultra-rapides. Une architecture technique solide pour dominer votre marché.
                          </p>
                        </div>
                        <div className="flex-shrink-0 hidden md:flex">
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>

                {/* Service 3 */}
                <AnimatedSection animation="fade-up" delay={0.3}>
                  <Link to="/services/branding" className="group block">
                    <div className="bg-background rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-border hover:border-primary/30 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Palette className="w-7 h-7 md:w-8 md:h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl md:text-2xl font-bold mb-3">Branding Stratégique</h3>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            Une identité visuelle saisissante, des logos intemporels et des interfaces (UI/UX) perfectionnées pour maximiser la conversion de vos prospects.
                          </p>
                        </div>
                        <div className="flex-shrink-0 hidden md:flex">
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* CONTACT */}
        <Contact2 />
      </div>
    </>
  );
}
