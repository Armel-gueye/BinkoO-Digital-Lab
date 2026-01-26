import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-up' | 'fade-in' | 'scale-in' | 'fade-left' | 'fade-right';
  duration?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
  duration = 0.6,
}) => {
  const animations = {
    'fade-up': {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
    },
    'fade-in': {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
    },
    'scale-in': {
      initial: { opacity: 0, scale: 0.95 },
      whileInView: { opacity: 1, scale: 1 },
    },
    'fade-left': {
      initial: { opacity: 0, x: -30 },
      whileInView: { opacity: 1, x: 0 },
    },
    'fade-right': {
      initial: { opacity: 0, x: 30 },
      whileInView: { opacity: 1, x: 0 },
    },
  };

  const selectedAnimation = animations[animation];

  return (
    <motion.div
      className={className}
      initial={selectedAnimation.initial}
      whileInView={selectedAnimation.whileInView}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smooth easing
      }}
    >
      {children}
    </motion.div>
  );
};

// Composant pour animer les titres avec délai progressif
export const AnimatedTitle: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration,
        delay: delay + Math.random() * 0.3, // délai aléatoire pour effet naturel
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Composant pour animer les paragraphes avec fade simple
export const AnimatedParagraph: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};

// Composant pour animer les images et cartes avec scale-in
export const AnimatedImage: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Container pour animer une liste d'éléments en cascade (Stagger)
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}> = ({ children, className = '', delayChildren = 0, staggerChildren = 0.1 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Élément enfant d'un StaggerContainer
export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'fade-up' | 'fade-in' | 'scale-in';
}> = ({ children, className = '', variant = 'fade-up' }) => {
  const variants: any = {
    'fade-up': {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } },
    },
    'fade-in': {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.5 } },
    },
    'scale-in': {
      hidden: { opacity: 0, scale: 0.9 },
      show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 60, damping: 15 } },
    },
  };

  return (
    <motion.div className={className} variants={variants[variant]}>
      {children}
    </motion.div>
  );
};
