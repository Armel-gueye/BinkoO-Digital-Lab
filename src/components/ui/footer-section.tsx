'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Facebook, Instagram, Linkedin, MessageSquare, LucideIcon } from 'lucide-react';
import { openWhatsApp } from '@/utils/whatsapp';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string; }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Navigation',
    links: [
      { title: 'Accueil', href: '/' },
      { title: 'Services', href: '/services' },
      { title: 'Blog', href: '/blog' },
      { title: 'Portfolio', href: '/realisations' },
      { title: 'A Propos', href: '/a-propos' },
      { title: 'Contact', href: '/contact' }]

  },
  {
    label: 'Services',
    links: [
      { title: 'Intelligence Artificielle', href: '/services' },
      { title: "Branding", href: '/services' },
      { title: "Création de sites Web", href: '/services' }]

  },
  {
    label: 'Réseaux Sociaux',
    links: [
      { title: 'LinkedIn', href: 'https://www.linkedin.com/in/binkoo-digital-lab-5a012b385?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', icon: Linkedin },
      { title: 'Instagram', href: 'https://www.instagram.com/binkoo_digital_lab?igsh=MXcyYjRpbHBrbjh1ag%3D%3D&utm_source=qr', icon: Instagram },
      { title: 'Facebook', href: 'https://www.facebook.com/share/1JPaSH1STA/?mibextid=wwXIfr', icon: Facebook },
      { title: 'TikTok', href: 'https://www.tiktok.com/@binkoo.digital.lab?_t=ZM-90kNEp9sTGt&_r=1', icon: TikTokIcon }]

  },
  {
    label: 'Contact',
    links: [
      { title: 'WhatsApp', href: 'whatsapp' },
      { title: '+226 44 32 38 41', href: 'tel:+22644323841' },
      { title: 'binkoodigitallab@gmail.com', href: 'mailto:binkoodigitallab@gmail.com' }]

  }];


export function Footer() {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsApp();
  };

  return (
    <footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="w-full space-y-12">
        <AnimatedContainer className="text-center space-y-4">
          <h3 className="font-bold text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            BinkoO Digital Lab
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Votre partenaire digital pour l'intelligence artificielle, le design créatif et le développement web innovant.
          </p>
        </AnimatedContainer>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerLinks.map((section, index) =>
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div>
                <h3 className="text-lg font-semibold mb-4">{section.label}</h3>
                <ul className="text-muted-foreground space-y-3 text-base">
                  {section.links.map((link) =>
                    <li key={link.title}>
                      <a
                        href={link.href === 'whatsapp' ? '#' : link.href}
                        onClick={link.href === 'whatsapp' ? handleWhatsAppClick : undefined}
                        className="hover:text-foreground inline-flex items-center gap-2 transition-all duration-300 break-all">

                        {link.icon && <link.icon className="size-4" />}
                        {link.title}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </AnimatedContainer>
          )}
        </div>

        <div className="border-t border-border/50 pt-8">
          <AnimatedContainer delay={0.5}>
            <p className="text-muted-foreground text-center text-sm">
              © 2026 BinkoO Digital Lab. Tous droits réservés.
            </p>
          </AnimatedContainer>
        </div>
      </div>
    </footer>);

};

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={`relative ${className || ''}`}>

      {children}
    </motion.div>);

};