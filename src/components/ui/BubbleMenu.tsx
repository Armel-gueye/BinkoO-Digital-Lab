import React, { useState, useEffect, useRef } from 'react';
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

  const menuItemsRef = useRef<HTMLDivElement>(null);
  const pillLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

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

    if (!overlay) return;

    if (isOpen && showOverlay) {
      const bubbles = pillLinksRef.current.filter(Boolean);
      const labels = labelRefs.current.filter(Boolean);

      if (!bubbles.length) return;

      // Show overlay container
      gsap.set(overlay, { display: 'flex', visibility: 'visible' });

      // Reset initial state
      gsap.set(bubbles, { scale: 0, opacity: 1, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, opacity: 0 });

      // Animate bubbles with stagger
      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay;
        gsap.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
          delay
        });

        if (labels[i]) {
          gsap.to(labels[i], {
            y: 0,
            opacity: 1,
            duration: animationDuration,
            ease: 'power3.out',
            delay: delay + animationDuration * 0.1
          });
        }
      });
    } else if (!isOpen && showOverlay) {
      const bubbles = pillLinksRef.current.filter(Boolean);
      const labels = labelRefs.current.filter(Boolean);

      // Hide labels
      if (labels.length) {
        gsap.to(labels, {
          y: 24,
          opacity: 0,
          duration: 0.15,
          ease: 'power3.in'
        });
      }

      // Hide bubbles then overlay
      if (bubbles.length) {
        gsap.to(bubbles, {
          scale: 0,
          duration: 0.15,
          ease: 'power3.in',
          onComplete: () => {
            gsap.set(overlay, { display: 'none', visibility: 'hidden' });
            // Clear inline styles
            bubbles.forEach(b => { if (b) gsap.set(b, { clearProps: 'all' }); });
            labels.forEach(l => { if (l) gsap.set(l, { clearProps: 'all' }); });
            setShowOverlay(false);
          }
        });
      } else {
        gsap.set(overlay, { display: 'none', visibility: 'hidden' });
        setShowOverlay(false);
      }
    }
  }, [isOpen, showOverlay, animationDuration, animationEase, staggerDelay]);

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
      <nav className={`bubble-menu ${positionClass}`} aria-label="Main navigation">
        <div
          className="bubble logo-bubble"
          style={{ background: menuBg, color: menuContentColor }}>
          <span className="logo-content">{logo}</span>
        </div>

        <div
          className="bubble toggle-bubble"
          style={{ background: menuBg }}>
          <button
            type="button"
            className={`menu-btn ${isOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label={menuAriaLabel}
            aria-pressed={isOpen}
            style={{ background: menuBg }}>
            <span className="menu-line" style={{ background: menuContentColor }}></span>
            <span className="menu-line" style={{ background: menuContentColor }}></span>
          </button>
        </div>
      </nav>

      {/* Menu items */}
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