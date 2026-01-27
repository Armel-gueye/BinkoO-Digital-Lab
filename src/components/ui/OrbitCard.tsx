import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OrbitCardProps {
  children: React.ReactNode;
  className?: string;
}

const OrbitCard: React.FC<OrbitCardProps> = ({ 
  children, 
  className
}) => {
  return (
    <div className={cn("relative rounded-2xl", className)}>
      <div className="absolute inset-0 z-0 flex items-center justify-center rounded-2xl bg-background">
        <motion.div 
          className="absolute h-full w-full rounded-2xl bg-transparent"
          style={{
            boxShadow: '0 0 30px 10px rgba(239, 68, 68, 0.5)'
          }}
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 30px 10px rgba(239, 68, 68, 0.5)',
              '0 0 40px 20px rgba(239, 68, 68, 0.3)',
              '0 0 30px 10px rgba(239, 68, 68, 0.5)'
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      <div className="relative z-10 rounded-2xl bg-background">
        {children}
      </div>
    </div>
  );
};

export default OrbitCard;