import { motion } from 'motion/react';

export default function Logo({ className = "w-10 h-10", animated = false }: { className?: string, animated?: boolean }) {
  const svgContent = (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="50%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <motion.path
        d="M20 50 Q 35 40 45 60 L 65 20 Q 75 40 50 80 Z"
        fill="url(#brandGradient)"
        filter="url(#glow)"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M10 50 Q 30 50 40 30 L 55 60 Q 70 50 90 50"
        stroke="url(#brandGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      />
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        {svgContent}
      </motion.div>
    );
  }

  return svgContent;
}
