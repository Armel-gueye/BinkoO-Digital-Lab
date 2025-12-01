import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationItem {
  name: string;
  path: string;
}

interface DynamicNavigationProps {
  items: NavigationItem[];
  logo?: React.ReactNode;
  className?: string;
}

export const DynamicNavigation: React.FC<DynamicNavigationProps> = ({
  items,
  logo,
  className = ''
}) => {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className={`relative ${className}`}>
      <div className="flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        {logo && (
          <Link to="/" className="relative z-10">
            {logo}
          </Link>
        )}

        {/* Navigation Items */}
        <div className="flex items-center gap-1 relative">
          {items.map((item, index) => {
            const isActive = location.pathname === item.path;
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 text-sm font-medium transition-colors"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background hover effect */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      layoutId="hover-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Active indicator (only when not hovering) */}
                <AnimatePresence>
                  {isActive && !isAnyHovered && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Text - White when hovered or active */}
                <span
                  className={`relative z-10 uppercase tracking-wide transition-colors duration-200 ${
                    (isHovered || (isActive && !isAnyHovered))
                      ? 'text-primary-foreground'
                      : 'text-foreground'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};