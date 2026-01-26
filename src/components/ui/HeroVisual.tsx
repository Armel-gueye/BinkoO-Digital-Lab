
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export const HeroVisual = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Mouse interaction for parallax
    const x = useMotionValue(0);
    const yMouse = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseYSpring = useSpring(yMouse, { stiffness: 50, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        x.set(clientX / innerWidth - 0.5);
        yMouse.set(clientY / innerHeight - 0.5);
    };

    // Parallax transforms
    const x1 = useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]);
    const y1 = useTransform(mouseYSpring, [-0.5, 0.5], [-30, 30]);

    const x2 = useTransform(mouseXSpring, [-0.5, 0.5], [50, -50]);
    const y2 = useTransform(mouseYSpring, [-0.5, 0.5], [50, -50]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center pointer-events-none"
            onMouseMove={handleMouseMove}
        >
            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl" />
            </div>

            {/* Animated Floating Orbs */}
            {/* Large Red Orb - Top Right */}
            <motion.div
                className="absolute top-[10%] right-[15%] w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
                style={{ x: x1, y: y1 }}
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary via-red-600 to-red-700 opacity-20 blur-3xl" />
            </motion.div>

            {/* Dark Orb - Bottom Left */}
            <motion.div
                className="absolute bottom-[20%] left-[10%] w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
                style={{ x: x2, y: y2 }}
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <div className="w-full h-full rounded-full bg-black/5 blur-2xl" />
            </motion.div>

            {/* Floating Particles/Shapes */}
            <div className="absolute inset-0 z-10 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-primary/10"
                        style={{
                            width: Math.random() * 20 + 10,
                            height: Math.random() * 20 + 10,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
        </div>
    );
};
