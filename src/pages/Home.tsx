import { Link } from 'react-router-dom';
import { Sparkles, Palette, Globe, ArrowRight, Check } from 'lucide-react';
import { ParticleButton } from '@/components/ui/particle-button';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { VelocityScroll } from '@/components/ui/scroll-based-velocity';
import Robot from '@/components/ui/Robot';
import TiltedCard from '@/components/ui/TiltedCard';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedParagraph, AnimatedImage } from '@/components/AnimatedSection';
import { Contact2 } from '@/components/Contact2';

export default function Home() {
  const whatsappUrl = 'https://api.whatsapp.com/send?phone=22644323841';

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Robot Model - DO NOT TOUCH POSITIONING */}
        <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-10 lg:inset-auto lg:bottom-0 lg:right-0 lg:w-[45%] lg:right-[10%] lg:h-full lg:opacity-100 lg:items-end lg:justify-end lg:z-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}>
            <Robot />
        </motion.div>

        {/* White overlay for mobile and tablet readability only */}
        <div className="absolute inset-0 bg-white/70 lg:bg-transparent lg:pointer-events-none z-5"></div>

        {/* Vertical Text on the Left */}
        <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}>
          <div className="relative flex items-center gap-2">
            {/* Underline/Vertical line */}
            <div className="w-0.5 h-24 bg-primary/60"></div>
            {/* Vertical Text */}
            <p
            className="text-[10px] md:text-xs font-bold tracking-wider text-foreground"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              Automatisez. Innovez. Accélérez.
            </p>
          </div>
        </motion.div>

        {/* Text content absolutely positioned on the left */}
        <div className="absolute z-10 top-0 left-0 h-full flex items-center pl-16 md:pl-20 lg:pl-32 pt-32 md:pt-40">
          <motion.div
          className="max-w-2xl text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>

            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-6 md:mb-8 leading-tight !whitespace-pre-line">L'IA et le digital ne sont plus une option. Ce sont vos nouveaux leviers de croissance.
            <br className="hidden md:inline lg:hidden" />
          </h1>
            <p className="text-base md:text-lg lg:text-xl text-foreground/90 leading-relaxed mb-6 md:mb-7 max-w-xl font-semibold lg:font-medium">
              Chez BinkoO Digital Lab, nous aidons les entreprises, marques et entrepreneurs à automatiser, vendre et se développer plus vite grâce à des outils simples, intelligents et accessibles.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-foreground/80 leading-relaxed mb-8 md:mb-10 max-w-xl italic font-medium lg:font-normal">
              Le digital n'est pas l'avenir. C'est le présent. Et il commence avec vous.
            </p>
            {/* Mobile CTA (visible only on small screens) */}
            <div className="lg:hidden">
              <a href="#" onClick={handleWhatsAppClick}>
                <ParticleButton className="bg-red-600 text-white hover:bg-red-700">
                  Devis Gratuit
                </ParticleButton>
              </a>
            </div>
            {/* Desktop CTA (visible only on large screens) - Moved here below the text */}
            <div className="hidden lg:block">
              <a href="#" onClick={handleWhatsAppClick}>
                <ParticleButton className="bg-red-600 text-white hover:bg-red-700">
                  Devis Gratuit
                </ParticleButton>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Social Icons - Top Right */}
        <motion.div
        className="absolute right-4 md:right-6 lg:right-4 top-24 md:top-32 z-20 flex flex-col gap-3 md:gap-5"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}>

          {/* WhatsApp */}
          <a
          href="https://api.whatsapp.com/send?phone=22644323841"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
          aria-label="WhatsApp">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>

          {/* LinkedIn - Properly sized and aligned */}
          <a
          href="https://www.linkedin.com/in/binkoo-digital-lab-5a012b385?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
          aria-label="LinkedIn">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 19h3v-9h-3v9zm1.5-10.3c1 0 1.8-.8 1.8-1.8s-.8-1.9-1.8-1.9-1.8.8-1.8 1.8.8 1.9 1.8 1.9zM13 19h3v-4.7c0-2.8 3.5-3 3.5 0v4.7h3v-6c0-4.8-5.4-4.6-6.5-2.3v-1.7h-3v10z" className="!w-full !h-[27px]" />
            </svg>
          </a>

          {/* Facebook */}
          <a
          href="https://www.facebook.com/share/1JPaSH1STA/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
          aria-label="Facebook">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>

          {/* TikTok */}
          <a
          href="https://www.tiktok.com/@binkoo.digital.lab?_t=ZM-90kNEp9sTGt&_r=1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
          aria-label="TikTok">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
          href="https://www.instagram.com/binkoo_digital_lab?igsh=MXcyYjRpbHBrbjh1ag%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
          aria-label="Instagram">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </motion.div>
      </section>


      {/* Services Section */}
      <AnimatedSection animation="fade-up">
      <section className="py-16 md:py-20 lg:py-28">
        <div className="container-fluid">
          <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Ce Que Nous Faisons de Mieux
            </h2>
            <AnimatedParagraph delay={0.2}>
            <div className="text-base md:text-lg max-w-3xl mx-auto text-muted-foreground mt-4 md:mt-5 space-y-3">
              <p>Des solutions digitales sur mesure pour propulser votre entreprise vers le succès.</p>
              <p>Nous concevons des outils simples, modernes et puissants pour accompagner votre croissance : automatisation, IA, design, et création web.</p>
              <p>Chaque projet est pensé pour vous faire gagner du temps, booster vos ventes et renforcer votre image professionnelle.</p>
            </div>
            </AnimatedParagraph>
          </motion.div>

          <div className="space-y-16 md:space-y-20 lg:space-y-24">
            {/* Service 1 - IA & Automatisation */}
            <AnimatedSection animation="fade-up" delay={0.1}>
            <motion.div
            className="bg-background rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>

              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                {/* Lottie à gauche sur desktop */}
                <AnimatedImage delay={0.2}>
                <div className="order-1">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden max-w-sm md:max-w-md lg:max-w-full mx-auto">
                    <iframe
                    src="https://lottie.host/embed/578e0983-2659-40c2-88cf-989315c689b0/KFhpEbNLZ1.lottie"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="Animation IA & Automatisation">
                  </iframe>
                  </div>
                </div>
                </AnimatedImage>
                {/* Texte à droite sur desktop */}
                <div className="order-2 space-y-5 md:space-y-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">IA & Automatisation</h3>
                  </div>
                  <AnimatedParagraph delay={0.3}>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Intégrez l'intelligence artificielle dans vos processus métier. De l'automatisation des workflows à l'implémentation de systèmes IA personnalisés, nous vous aidons à gagner en efficacité.
                  </p>
                  </AnimatedParagraph>
                  <ul className="space-y-3 md:space-y-4">
                    {['Chatbots et assistants virtuels intelligents', 'Automatisation de processus et workflows', 'Solutions IA sur mesure pour votre métier'].map((item, idx) => (
                      <AnimatedParagraph key={idx} delay={0.4 + idx * 0.1}>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                      </AnimatedParagraph>
                    ))}
                  </ul>
                  <div className="flex justify-end pt-4 md:pt-5">
                    <Link to="/services">
                      <GetStartedButton />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
            </AnimatedSection>

            {/* Service 2 - Création de Sites Web & Applications */}
            <AnimatedSection animation="fade-up" delay={0.2}>
            <div className="bg-background rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-border">
              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                {/* Texte à gauche sur desktop */}
                <div className="order-2 lg:order-1 space-y-5 md:space-y-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">Création de Sites Web & Web App</h3>
                  </div>
                  <AnimatedParagraph delay={0.3}>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Nous créons des sites web modernes, des landing pages optimisées et des applications web performantes qui captivent vos utilisateurs et génèrent des résultats concrets.
                  </p>
                  </AnimatedParagraph>
                  <ul className="space-y-3 md:space-y-4">
                    {['Landing pages et portfolios professionnels', 'Sites web haute conversion', 'Applications web et SAAS'].map((item, idx) => (
                      <AnimatedParagraph key={idx} delay={0.4 + idx * 0.1}>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                      </AnimatedParagraph>
                    ))}
                  </ul>
                  <div className="flex justify-end pt-4 md:pt-5">
                    <Link to="/services">
                      <GetStartedButton />
                    </Link>
                </div>
              </div>
                {/* Lottie à droite sur desktop */}
                <AnimatedImage delay={0.2}>
                <div className="order-1 lg:order-2">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden max-w-sm md:max-w-md lg:max-w-full mx-auto">
                    <iframe
                    src="https://lottie.host/embed/5094abd8-d328-41f0-82f9-89d30acf9f95/D5m04v3FBU.lottie"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="Animation Création de Sites Web">
                  </iframe>
                  </div>
                </div>
                </AnimatedImage>
              </div>
            </div>
            </AnimatedSection>

            {/* Service 3 - Création de Visuels */}
            <AnimatedSection animation="fade-up" delay={0.3}>
            <div className="bg-background rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-border">
              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                {/* Lottie à gauche sur desktop */}
                <AnimatedImage delay={0.2}>
                <div className="order-1">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden max-w-sm md:max-w-md lg:max-w-full mx-auto">
                    <iframe
                    src="https://lottie.host/embed/3d0f14dd-a932-47db-8392-075f75c57f99/c2MitpaHjN.lottie"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="Animation Création de Visuels">
                  </iframe>
                  </div>
                </div>
                </AnimatedImage>
                {/* Texte à droite sur desktop */}
                <div className="order-2 space-y-5 md:space-y-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center flex-shrink-0">
                      <Palette className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">Création de Visuels</h3>
                  </div>
                  <AnimatedParagraph delay={0.3}>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Des designs créatifs et impactants qui donnent vie à votre marque. De l'identité visuelle complète aux assets digitaux, nous créons des visuels qui marquent les esprits.
                  </p>
                  </AnimatedParagraph>
                  <ul className="space-y-3 md:space-y-4">
                    {['Identité visuelle et branding complet', 'Design graphique et illustrations', 'Assets digitaux pour tous supports'].map((item, idx) => (
                      <AnimatedParagraph key={idx} delay={0.4 + idx * 0.1}>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                      </AnimatedParagraph>
                    ))}
                  </ul>
                  <div className="flex justify-end pt-4 md:pt-5">
                    <Link to="/services">
                      <GetStartedButton />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      </AnimatedSection>

      <VelocityScroll text="NOUS SOMMES JEUNES MAIS AUDACIEUX" default_velocity={2} className="text-xl md:text-3xl lg:text-4xl font-bold" />

      {/* About Section - Light gray background for logo visibility */}
      <AnimatedSection animation="fade-up">
      <section className="py-16 md:py-20 lg:py-28 bg-gray-50">
        <div className="container-fluid">
          <motion.div
          className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

            {/* Left: TiltedCard with Logo */}
            <AnimatedImage delay={0.2}>
            <div className="flex items-center justify-center">
              <TiltedCard
              imageSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/BinkoO-Digital-Lab-PNG-1760749121547.png"
              altText="BinkoO Digital Lab Logo"
              captionText="BinkoO Digital Lab"
              containerHeight="400px"
              containerWidth="100%"
              imageHeight="350px"
              imageWidth="350px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={false} />

            </div>
            </AnimatedImage>

            {/* Right: Content */}
            <div className="space-y-5 md:space-y-6">
              <h3 className="text-lg md:text-xl lg:text-2xl uppercase tracking-widest text-primary font-bold">
                Notre Histoire
              </h3>
              <AnimatedParagraph delay={0.3}>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                BinkoO Digital Lab est née d'une passion pour l'innovation digitale. Nous mettons notre expertise au service de votre croissance avec une approche personnalisée et des solutions qui génèrent des résultats concrets.
              </p>
              </AnimatedParagraph>
              <ul className="space-y-3 md:space-y-4">
                {['Une équipe passionnée et réactive à votre écoute', 'Des solutions sur mesure adaptées à votre budget', 'Technologies de pointe et innovation constante'].map((item, idx) => (
                  <AnimatedParagraph key={idx} delay={0.4 + idx * 0.1}>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-sm md:text-base">{item}</span>
                </li>
                  </AnimatedParagraph>
                ))}
              </ul>
              <div className="pt-3 md:pt-4">
                <Link to="/a-propos">
                  <InteractiveHoverButton text="En Savoir Plus" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </AnimatedSection>

      {/* Portfolio Section */}
      <AnimatedSection animation="fade-up">
      <section className="py-16 md:py-20 lg:py-28">
        <div className="container-fluid">
          <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3 md:mb-4">
              Nos Réalisations
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Projets Qui Nous Rendent Fiers</h2>
            <AnimatedParagraph delay={0.2}>
            <p className="text-base md:text-lg max-w-3xl mx-auto text-muted-foreground mt-4 md:mt-5">
              Chaque projet est une nouvelle aventure où design, IA et innovation se rencontrent pour créer des expériences fluides et performantes.
            </p>
            </AnimatedParagraph>
          </motion.div>

          {/* Portfolio Grid - Bento Style */}
          <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-[180px] mb-10 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

            {/* Project 1: Large Card */}
            <AnimatedImage delay={0.1}>
            <div className="relative col-span-full md:col-span-2 lg:col-span-2 row-span-2 rounded-2xl overflow-hidden group border border-border">
              <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/hbAV72vJ1B-1761611985076.jpg?width=8000&height=8000&resize=contain" alt="Project 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-5 right-5">
                <Link to="/realisations" className="bg-white/95 hover:bg-white text-foreground px-4 py-2 rounded-lg flex items-center text-sm font-semibold shadow-lg transition-all hover:scale-105">
                  Voir le projet <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
            </AnimatedImage>

            {/* Project 2: Top Right */}
            <AnimatedImage delay={0.2}>
            <div className="relative col-span-full md:col-span-1 lg:col-span-1 row-span-1 rounded-2xl overflow-hidden group border border-border">
              <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/msedge_mT1m1bMdNY-1760751148595.png"
              alt="Project 2"
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" />

              <div className="absolute bottom-4 right-4">
                <Link to="/realisations" className="bg-white/95 hover:bg-white text-foreground px-3 py-2 rounded-lg flex items-center text-xs font-semibold shadow-lg transition-all hover:scale-105">
                  Voir le projet <ArrowRight className="ml-1 w-3 h-3" />
                </Link>
              </div>
            </div>
            </AnimatedImage>

            {/* Project 3: Bottom Right */}
            <AnimatedImage delay={0.3}>
            <div className="relative col-span-full md:col-span-1 lg:col-span-1 row-span-1 rounded-2xl overflow-hidden group border border-border">
              <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/msedge_oYx9ORuSTc-1760751181832.png"
              alt="Project 3"
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" />

              <div className="absolute bottom-4 right-4">
                <Link to="/realisations" className="bg-white/95 hover:bg-white text-foreground px-3 py-2 rounded-lg flex items-center text-xs font-semibold shadow-lg transition-all hover:scale-105">
                  Voir le projet <ArrowRight className="ml-1 w-3 h-3" />
                </Link>
              </div>
            </div>
            </AnimatedImage>

          </motion.div>

          <div className="text-center">
            <Link to="/realisations" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
              Voir Tous Nos Projets
            </Link>
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection animation="fade-up">
      <section className="py-16 md:py-20 lg:py-28 bg-gray-50">
        <div className="container-fluid">
          <motion.div
          className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

            {/* Left Image */}
            <AnimatedImage delay={0.2}>
            <div className="aspect-[4/3] bg-gray-50 rounded-2xl border border-border shadow-lg overflow-hidden">
              <iframe
                src="https://lottie.host/embed/8afcc5c0-fac9-480b-80af-ab3ec29994a1/PW1G8XwTya.lottie"
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Animation Pourquoi Nous Choisir"
              />
            </div>
            </AnimatedImage>

            {/* Right: Features List */}
            <div className="space-y-8 md:space-y-10">
              <div>
                <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3 md:mb-4">
                  Pourquoi Nous Choisir
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-5">
                  Nous livrons des résultats, pas des promesses.
                </h2>
              </div>

              {/* Feature 1 */}
              <AnimatedParagraph delay={0.3}>
              <div className="flex gap-4 md:gap-5">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center">
                    <Check className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Expertise Technique</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Notre équipe maîtrise les technologies les plus récentes pour vous offrir des solutions performantes et durables.
                  </p>
                </div>
              </div>
              </AnimatedParagraph>

              {/* Feature 2 */}
              <AnimatedParagraph delay={0.4}>
              <div className="flex gap-4 md:gap-5">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center">
                    <Check className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">100% Orienté Action</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Nous croyons en l'action concrète et les résultats mesurables pour garantir votre satisfaction.
                  </p>
                </div>
              </div>
              </AnimatedParagraph>

              {/* Feature 3 */}
              <AnimatedParagraph delay={0.5}>
              <div className="flex gap-4 md:gap-5">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center">
                    <Check className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Support Continu</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Accompagnement personnalisé tout au long de l'année pour optimiser vos solutions digitales.
                  </p>
                </div>
              </div>
              </AnimatedParagraph>
            </div>
          </motion.div>
        </div>
      </section>
      </AnimatedSection>

      {/* Contact2 - Juste au-dessus du Footer */}
      <Contact2 />
    </div>;
}