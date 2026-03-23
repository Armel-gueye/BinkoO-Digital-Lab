'use client'

import React, { useState, useRef, FC, ReactNode, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Link } from 'react-router-dom'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string }>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" :
      variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" :
      variant === "link" ? "text-primary underline-offset-4 hover:underline" :
      "bg-primary text-primary-foreground hover:bg-primary/90",
      size === "sm" ? "h-9 px-3" : size === "lg" ? "h-11 px-8" : size === "icon" ? "h-10 w-10" : "h-10 px-4 py-2",
      className
    )} {...props} />
  )
);
Button.displayName = "Button";

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) handler()
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, handler])
}

interface DropdownItem {
  name: string
  link: string
}

interface AnimatedDropdownProps {
  items: DropdownItem[]
  text: string
  className?: string
}

const OnClickOutside: FC<{ children: ReactNode; onClickOutside: () => void; classes?: string }> = ({
  children,
  onClickOutside,
  classes
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  useClickOutside(wrapperRef, onClickOutside)
  return (
    <div ref={wrapperRef} className={cn(classes)}>
      {children}
    </div>
  )
}

const MotionLink = motion(Link);

export const AnimatedDropdown: FC<AnimatedDropdownProps> = ({
  items,
  text,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <OnClickOutside onClickOutside={() => setIsOpen(false)}>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className={cn('group relative inline-block', className)}
      >
        <button
          aria-haspopup='listbox'
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="nav-link text-base font-medium text-black dark:text-white hover:text-primary transition-all duration-300 flex items-center gap-1 group bg-transparent border-none p-0 cursor-pointer focus:outline-none"
        >
          <span>{text}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <ChevronDown className='h-4 w-4 transition-transform' />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              role='listbox'
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{
                duration: 0.3,
                ease: [0.23, 1, 0.32, 1], // Custom cubic-bezier for liquid motion
              }}
              className={cn(
                'absolute top-[calc(100%+1rem)] left-0 z-50 w-72',
                'overflow-hidden rounded-2xl',
                'bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl',
                'border border-gray-100 dark:border-gray-800',
                'shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]'
              )}
            >
              <motion.div
                initial='hidden'
                animate='visible'
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.04,
                    },
                  },
                }}
                className="py-2"
              >
                {items.map((item, index) => (
                  <MotionLink
                    key={index}
                    to={item.link}
                    onClick={() => setIsOpen(false)}
                    variants={{
                      hidden: { opacity: 0, x: -16, filter: 'blur(4px)' },
                      visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
                    }}
                    transition={{
                        duration: 0.4,
                        ease: [0.23, 1, 0.32, 1]
                    }}
                    className={cn(
                      'inline-block w-full px-5 py-4 text-sm font-semibold',
                      'hover:bg-gray-50/80 dark:hover:bg-white/5',
                      'transition-all duration-300',
                      'text-gray-900 dark:text-gray-100 no-underline',
                      'hover:text-primary dark:hover:text-primary',
                      'hover:translate-x-1 active:scale-[0.98]'
                    )}
                  >
                    {item.name}
                  </MotionLink>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OnClickOutside>
  )
}

export default AnimatedDropdown;
