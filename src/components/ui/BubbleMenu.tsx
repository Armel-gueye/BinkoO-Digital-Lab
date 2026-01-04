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

  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
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

  // Animation effect - aligned with reference code
  useEffect(() => {
    const overlay = menuItemsRef.current;
    const backdrop = backdropRef.current;
    const bubbles = pillLinksRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!overlay || !backdrop || !bubbles.length) return;

    if (isOpen) {
      // Show overlay first
      gsap.set(overlay, { display: 'flex' });

      // Kill any existing tweens to prevent conflicts
      gsap.killTweensOf([...bubbles, ...labels, backdrop]);

      // Reset initial state
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      // Animate backdrop
      gsap.to(backdrop, {
        autoAlpha: 1,
        duration: 0.3
      });

      // Animate bubbles with stagger
      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });

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
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out'
            },
            `-=${animationDuration * 0.9}`
          );
        }
      });
    } else if (showOverlay) {
      // Kill any existing tweens
      gsap.killTweensOf([...bubbles, ...labels, backdrop]);

      // Hide backdrop
      gsap.to(backdrop, {
        autoAlpha: 0,
        duration: 0.2
      });

      // Hide labels first
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });

      // Hide bubbles and then hide overlay
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        }
      });
    }
  }, [isOpen, showOverlay, animationDuration, animationEase, staggerDelay]);

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
          zIndex: 40,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100dvh',
          minHeight: '100dvh',
          position: 'fixed',
          overflow: 'hidden'
        }}
        onClick={() => setIsOpen(false)}
      />

      <div className={`bubble-menu ${positionClass}`}>
        <div
          className="bubble logo-bubble !w-auto !h-full"
          style={{ background: menuBg, color: menuContentColor }}>
          <div className="logo-content">{logo}</div>
        </div>

        <div
          className="bubble toggle-bubble"
          style={{ background: menuBg }}>
          <button
            className={`menu-btn ${isOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label={menuAriaLabel}
            aria-pressed={isOpen}
            style={{ background: menuBg }}>
            <span className="menu-line" style={{ background: menuContentColor }}></span>
            <span className="menu-line" style={{ background: menuContentColor }}></span>
          </button>
        </div>
      </div>

      {/* Menu items - only render when showOverlay is true */}
      {showOverlay && (
        <div
          ref={menuItemsRef}
          className={`bubble-menu-items ${positionClass}`}
          style={{ display: 'none', pointerEvents: isOpen ? 'auto' : 'none' }}
          aria-hidden={!isOpen}>
          <ul className="pill-list" role="menu" aria-label="Menu links">
            {items.map((item, index) => {
              const isEven = items.length % 2 === 0;
              const needsSpacer = !isEven && index === Math.floor(items.length / 2);

              return (
                <React.Fragment key={index}>
                  {needsSpacer && <li className="pill-spacer" />}
                  <li className="pill-col" role="none">
                    <a
                      role="menuitem"
                      ref={(el) => { pillLinksRef.current[index] = el; }}
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
                        ref={(el) => { labelRefs.current[index] = el; }}>
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