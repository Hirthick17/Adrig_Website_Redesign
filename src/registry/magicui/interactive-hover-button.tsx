'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface InteractiveHoverButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, variant = 'primary', className = '', ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all overflow-hidden ${
        variant === 'primary'
          ? 'bg-adrig-navy text-white px-6 py-2.5 hover:bg-adrig-blue'
          : 'border border-adrig-hairline bg-white text-adrig-ink px-6 py-2.5 hover:border-adrig-navy'
      } ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
});

InteractiveHoverButton.displayName = 'InteractiveHoverButton';
