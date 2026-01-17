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
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const pillLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

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

  useEffect(() => {
    if (!menuItemsRef.current || !backdropRef.current) return;

    if (isOpen) {
      // Show backdrop
      gsap.to(backdropRef.current, {
        autoAlpha: 1,
        duration: 0.3
      });

      // Show menu items
      gsap.to(menuItemsRef.current, {
        autoAlpha: 1,
        duration: 0.1
      });

      // Animate pills
      gsap.fromTo(
        pillLinksRef.current,
        {
          autoAlpha: 0,
          y: 60
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: animationDuration,
          ease: animationEase,
          stagger: staggerDelay
        }
      );
    } else {
      // Hide backdrop
      gsap.to(backdropRef.current, {
        autoAlpha: 0,
        duration: 0.2
      });

      // Hide pills
      gsap.to(pillLinksRef.current, {
        autoAlpha: 0,
        y: 60,
        duration: animationDuration * 0.6,
        ease: 'power2.in',
        stagger: staggerDelay * 0.5,
        onComplete: () => {
          gsap.set(menuItemsRef.current, { autoAlpha: 0 });
        }
      });
    }
  }, [isOpen, animationDuration, animationEase, staggerDelay]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const positionClass = useFixedPosition ? 'fixed' : 'absolute';

  return (
    <>
      {/* Backdrop overlay - Full screen on mobile/tablet with dvh support */}
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
            style={{ background: menuBg }}>

            <span className="menu-line" style={{ background: menuContentColor }}></span>
            <span className="menu-line" style={{ background: menuContentColor }}></span>
          </button>
        </div>
      </div>

      <div
        ref={menuItemsRef}
        className={`bubble-menu-items ${positionClass}`}
        style={{ opacity: 0, visibility: 'hidden', pointerEvents: isOpen ? 'auto' : 'none' }}>

        <ul className="pill-list">
          {items.map((item, index) => {
            // Calculate column position
            const isEven = items.length % 2 === 0;
            const needsSpacer = !isEven && index === Math.floor(items.length / 2);

            return (
              <React.Fragment key={index}>
                {needsSpacer && <li className="pill-spacer" />}
                <li className="pill-col">
                  <a
                    ref={(el) => pillLinksRef.current[index] = el}
                    href={item.href}
                    className="pill-link"
                    aria-label={item.ariaLabel}
                    style={
                      {
                        '--item-rot': `${item.rotation}deg`,
                        '--hover-bg': item.hoverStyles.bgColor,
                        '--hover-color': item.hoverStyles.textColor
                      } as React.CSSProperties
                    }
                    onClick={() => setIsOpen(false)}>

                    <span className="pill-label">{item.label}</span>
                  </a>
                </li>
              </React.Fragment>);

          })}
        </ul>
      </div>
    </>
  );
};

export default BubbleMenu;