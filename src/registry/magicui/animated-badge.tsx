'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedBadgeProps {
  text: string;
  color?: string;
  href?: string;
  className?: string;
}

const AnimatedBadge = ({
  text,
  color = '#0E5CEE', // Default to ADRIG blue
  href,
  className,
}: AnimatedBadgeProps) => {
  const content = (
    <motion.div
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ease-out',
        'bg-white/90 border border-slate-200/80 shadow-md backdrop-blur-sm',
        'hover:border-blue-300/70 hover:shadow-lg hover:scale-[1.02]',
        className
      )}
      style={{ color: color, borderColor: `${color}30` }} // Use color for text and a lighter version for border
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {text}
    </motion.div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

export { AnimatedBadge };
export default AnimatedBadge;
