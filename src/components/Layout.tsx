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

    // Configuration pour BubbleMenu
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

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Cache le menu dès qu'on scroll (après seulement 5px)
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
      {/* BubbleMenu for Tablet and Mobile only */}
      <div className="lg:hidden">
        <BubbleMenu
          logo={<span style={{ fontWeight: 700, fontSize: '0.75rem', whiteSpace: 'nowrap' }}>BinkoO Digital Lab</span>}
          items={bubbleMenuItems}
          menuAriaLabel="Toggle navigation"
          menuBg="#ffffff"
          menuContentColor="#111111"
          useFixedPosition={true}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
      </div>

      {/* Desktop Navigation with StitchNavbar */}
      {!location.pathname.match(/^\/$/) && (
        <div className="hidden lg:block">
          <StitchNavbar />
        </div>
      )}

      {/* Main Content with Page Transition */}
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

      {/* Footer */}
      <Footer />

      {/* Chatbot - appears on all pages */}
      <BinkooChatbot />
    </div>;
  };
export default Layout;