import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Footer } from '@/components/ui/footer-section';
import { motion, AnimatePresence } from 'framer-motion';
import { BubbleMenu } from '@/components/ui/BubbleMenu';
// import { DynamicNavigation } from '@/components/lightswind/dynamic-navigation';
import { StitchNavbar } from '@/components/ui/StitchNavbar';
import { BinkooChatbot } from '@/components/BinkooChatbot';
import { openWhatsApp } from '@/utils/whatsapp';
import { StaggeredMenu } from '@/components/ui/StaggeredMenu';

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const location = useLocation();

    const handleWhatsAppClick = (e: React.MouseEvent) => {
      e.preventDefault();
      openWhatsApp();
    };

    const navigationItems = [{
      name: 'Accueil',
      path: '/'
    }, {
      name: 'Services',
      path: '/services'
    }, {
      name: 'IA et Automatisation',
      path: '/services/ia-automatisation'
    }, {
      name: 'Sites et App Web',
      path: '/services/sites-app-web'
    }, {
      name: 'Branding',
      path: '/services/branding'
    }, {
      name: 'Blog',
      path: '/blog'
    }, {
      name: 'Portfolio',
      path: '/realisations'
    }, {
      name: 'A Propos',
      path: '/a-propos'
    }, {
      name: 'Contact',
      path: '/contact'
    }];

    const bubbleMenuItems = [
      {
        label: 'accueil',
        href: '/',
        ariaLabel: 'Accueil',
        rotation: -8,
        hoverStyles: { bgColor: '#FF2B00', textColor: '#ffffff' }
      },
      {
        label: 'services',
        href: '/services',
        ariaLabel: 'Services',
        rotation: 8,
        hoverStyles: { bgColor: '#FF2B00', textColor: '#ffffff' }
      },
      {
        label: 'ia & auto',
        href: '/services/ia-automatisation',
        ariaLabel: 'IA et Automatisation',
        rotation: -4,
        hoverStyles: { bgColor: '#FF2B00', textColor: '#ffffff' }
      },
      {
        label: 'sites & web',
        href: '/services/sites-app-web',
        ariaLabel: 'Sites et App Web',
        rotation: 4,
        hoverStyles: { bgColor: '#FF2B00', textColor: '#ffffff' }
      },
      {
        label: 'branding',
        href: '/services/branding',
        ariaLabel: 'Branding',
        rotation: -4,
        hoverStyles: { bgColor: '#FF2B00', textColor: '#ffffff' }
      },
      {
        label: 'blog',
        href: '/blog',
        ariaLabel: 'Blog',
        rotation: -8,
        hoverStyles: { bgColor: '#FF2B00', textColor: '#ffffff' }
      },
      {
        label: 'portfolio',
        href: '/realisations',
        ariaLabel: 'Portfolio',
        rotation: 8,
        hoverStyles: { bgColor: '#FF2B00', textColor: '#ffffff' }
      },
      {
        label: 'à propos',
        href: '/a-propos',
        ariaLabel: 'À Propos',
        rotation: -8,
        hoverStyles: { bgColor: '#FF2B00', textColor: '#ffffff' }
      },
      {
        label: 'contact',
        href: '/contact',
        ariaLabel: 'Contact',
        rotation: 8,
        hoverStyles: { bgColor: '#FF2B00', textColor: '#ffffff' }
      }
    ];

    const staggeredMenuItems = [
      { label: 'Accueil', ariaLabel: 'Aller à l\'accueil', link: '/' },
      { label: 'Services', ariaLabel: 'Voir nos services', link: '/services' },
      { label: 'IA & Automatisation', ariaLabel: 'Intelligence Artificielle', link: '/services/ia-automatisation', isSubItem: true },
      { label: 'Sites & App Web', ariaLabel: 'Développement Web', link: '/services/sites-app-web', isSubItem: true },
      { label: 'Branding', ariaLabel: 'Identité Visuelle', link: '/services/branding', isSubItem: true },
      { label: 'Portfolio', ariaLabel: 'Nos réalisations', link: '/realisations' },
      { label: 'Blog', ariaLabel: 'Lire notre blog', link: '/blog' },
      { label: 'À Propos', ariaLabel: 'En savoir plus sur nous', link: '/a-propos' },
      { label: 'Contact', ariaLabel: 'Nous contacter', link: '/contact' }
    ];

    const socialItems = [
      { label: 'Facebook', link: 'https://www.facebook.com/share/1JPaSH1STA/?mibextid=wwXIfr' },
      { label: 'Instagram', link: 'https://www.instagram.com/binkoo_digital_lab?igsh=MXcyYjRpbHBrbjh1ag%3D%3D&utm_source=qr' },
      { label: 'LinkedIn', link: 'https://www.linkedin.com/company/binkoo-digital-lab' },
      { label: 'TikTok', link: 'https://www.tiktok.com/@binkoo.digital.lab?_t=ZM-90kNEp9sTGt&_r=1' },
      { label: 'WhatsApp', link: 'https://api.whatsapp.com/send?phone=22644323841' }
    ];

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 5) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
      setIsMenuOpen(false);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname]);

    return <div className="min-h-screen bg-background">
      <div className="lg:hidden">
        <StaggeredMenu
          items={staggeredMenuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          accentColor="#E5002E"
          colors={['#F5F5F5', '#EEEEEE', '#E5002E']}
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      </div>

      {!location.pathname.match(/^\/$/) && (
        <div className="hidden lg:block">
          <StitchNavbar />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="pt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />

      <BinkooChatbot />
    </div>;
  };
export default Layout;