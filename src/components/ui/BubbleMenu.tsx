import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './BubbleMenu.css';

interface BubbleMenuItem {
  label: string;
  href: string;
  ariaLabel: string;
  rotation: number;
  hoverStyles: {
    bgColor: string;
    textColor: string;
  };
}

interface BubbleMenuProps {
  logo: React.ReactNode;
  items: BubbleMenuItem[];
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
}

export const BubbleMenu: React.FC<BubbleMenuProps> = ({
  logo,
  items,
  menuAriaLabel = 'Toggle navigation',
  menuBg = '#ffffff',
  menuContentColor = '#111111',
  useFixedPosition = false,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const location = useLocation();

  const menuItemsRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const pillLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animationRef = useRef<gsap.core.Timeline[]>([]);

  // Clear all GSAP inline styles
  const clearAllStyles = useCallback(() => {
    const bubbles = pillLinksRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    const backdrop = backdropRef.current;
    const overlay = menuItemsRef.current;

    // Clear GSAP inline styles on menu items
    if (bubbles.length) {
      gsap.set(bubbles, { clearProps: 'all' });
    }
    if (labels.length) {
      gsap.set(labels, { clearProps: 'all' });
    }
    // Reset backdrop to hidden state (don't clearProps, just set hidden)
    if (backdrop) {
      gsap.set(backdrop, { opacity: 0, visibility: 'hidden' });
    }
    // Hide overlay
    if (overlay) {
      gsap.set(overlay, { display: 'none', visibility: 'hidden' });
    }
  }, []);

  // Cleanup function for animations
  const killAllAnimations = useCallback(() => {
    animationRef.current.forEach(tl => tl.kill());
    animationRef.current = [];

    const bubbles = pillLinksRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    const backdrop = backdropRef.current;

    if (bubbles.length) gsap.killTweensOf(bubbles);
    if (labels.length) gsap.killTweensOf(labels);
    if (backdrop) gsap.killTweensOf(backdrop);
  }, []);

  // Close menu and reset on route change
  useEffect(() => {
    // Close menu immediately on navigation
    setIsOpen(false);

    // Kill animations and clear styles
    killAllAnimations();
    clearAllStyles();

    // Reset overlay state
    setShowOverlay(false);

    // Reset refs
    pillLinksRef.current = [];
    labelRefs.current = [];
  }, [location.pathname, killAllAnimations, clearAllStyles]);

  // Reset refs when items change
  useEffect(() => {
    pillLinksRef.current = [];
    labelRefs.current = [];
  }, [items]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  // Animation effect
  useEffect(() => {
    const overlay = menuItemsRef.current;
    const backdrop = backdropRef.current;
    const bubbles = pillLinksRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!overlay || !backdrop) return;

    if (isOpen && showOverlay) {
      // Kill any existing animations first
      killAllAnimations();

      // Ensure we have elements to animate
      if (!bubbles.length) return;

      // Show overlay container
      gsap.set(overlay, { display: 'flex', visibility: 'visible' });

      // Reset initial state for all elements
      gsap.set(bubbles, { scale: 0, opacity: 1, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, opacity: 0 });

      // Animate backdrop
      gsap.to(backdrop, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.3
      });

      // Animate bubbles with stagger
      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay;
        const tl = gsap.timeline({ delay });
        animationRef.current.push(tl);

        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase
        });

        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              opacity: 1,
              duration: animationDuration,
              ease: 'power3.out'
            },
            `-=${animationDuration * 0.9}`
          );
        }
      });
    } else if (!isOpen && showOverlay) {
      // Closing animation
      killAllAnimations();

      // Hide backdrop
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          gsap.set(backdrop, { visibility: 'hidden' });
        }
      });

      // Hide labels first
      if (labels.length) {
        gsap.to(labels, {
          y: 24,
          opacity: 0,
          duration: 0.15,
          ease: 'power3.in'
        });
      }

      // Hide bubbles then overlay, then clear all styles
      if (bubbles.length) {
        gsap.to(bubbles, {
          scale: 0,
          duration: 0.15,
          ease: 'power3.in',
          onComplete: () => {
            gsap.set(overlay, { display: 'none', visibility: 'hidden' });
            // Clear all GSAP inline styles after animation completes
            clearAllStyles();
            setShowOverlay(false);
          }
        });
      } else {
        gsap.set(overlay, { display: 'none', visibility: 'hidden' });
        clearAllStyles();
        setShowOverlay(false);
      }
    }

    // Cleanup on unmount
    return () => {
      killAllAnimations();
      clearAllStyles();
    };
  }, [isOpen, showOverlay, animationDuration, animationEase, staggerDelay, killAllAnimations, clearAllStyles]);

  // Handle resize for rotation on desktop
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        const bubbles = pillLinksRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;

        bubbles.forEach((bubble, i) => {
          const item = items[i];
          if (bubble && item) {
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, items]);

  const toggleMenu = () => {
    const nextState = !isOpen;
    if (nextState) {
      // Reset refs before opening
      pillLinksRef.current = [];
      labelRefs.current = [];
      setShowOverlay(true);
    }
    setIsOpen(nextState);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const positionClass = useFixedPosition ? 'fixed' : 'absolute';

  return (
    <>
      {/* Backdrop overlay */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-slate-50/80 backdrop-blur-sm"
        style={{
          opacity: 0,
          visibility: 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none',
          zIndex: 40
        }}
        onClick={() => setIsOpen(false)}
      />

      <nav className={`bubble-menu ${positionClass}`} aria-label="Main navigation">
        <div
          className="bubble logo-bubble"
          style={{ background: menuBg, color: menuContentColor }}>
          <span className="logo-content">{logo}</span>
        </div>

        <button
          type="button"
          className={`bubble toggle-bubble menu-btn ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={menuAriaLabel}
          aria-pressed={isOpen}
          style={{ background: menuBg }}>
          <span className="menu-line" style={{ background: menuContentColor }}></span>
          <span className="menu-line short" style={{ background: menuContentColor }}></span>
        </button>
      </nav>

      {/* Menu items - only in DOM when showOverlay is true */}
      {showOverlay && (
        <div
          ref={menuItemsRef}
          className={`bubble-menu-items ${positionClass}`}
          style={{ display: 'none', visibility: 'hidden', pointerEvents: isOpen ? 'auto' : 'none' }}
          aria-hidden={!isOpen}>
          <ul className="pill-list" role="menu" aria-label="Menu links">
            {items.map((item, index) => {
              const isEven = items.length % 2 === 0;
              const needsSpacer = !isEven && index === Math.floor(items.length / 2);

              return (
                <React.Fragment key={`${item.label}-${index}`}>
                  {needsSpacer && <li className="pill-spacer" role="none" />}
                  <li className="pill-col" role="none">
                    <a
                      role="menuitem"
                      ref={(el) => {
                        if (el) pillLinksRef.current[index] = el;
                      }}
                      href={item.href}
                      className="pill-link"
                      aria-label={item.ariaLabel}
                      style={
                        {
                          '--item-rot': `${item.rotation}deg`,
                          '--pill-bg': menuBg,
                          '--pill-color': menuContentColor,
                          '--hover-bg': item.hoverStyles.bgColor,
                          '--hover-color': item.hoverStyles.textColor
                        } as React.CSSProperties
                      }
                      onClick={handleLinkClick}>
                      <span
                        className="pill-label"
                        ref={(el) => {
                          if (el) labelRefs.current[index] = el;
                        }}>
                        {item.label}
                      </span>
                    </a>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default BubbleMenu;