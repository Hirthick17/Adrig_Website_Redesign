'use client';

import { cn } from '@/lib/utils';
import { motion, type Variants } from 'framer-motion';
import React, { type ElementType } from 'react';

export type PresetType = 'blur' | 'fade-in-blur' | 'scale' | 'fade' | 'slide';
export type PerType = 'word' | 'char' | 'line';

export type TextEffectProps = {
  children: string;
  per?: PerType;
  as?: keyof React.JSX.IntrinsicElements;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  preset?: PresetType;
  delay?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  segmentWrapperClassName?: string;
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  exit: { opacity: 0 },
};

const presetVariants: Record<
  PresetType,
  { container?: Variants; item: Variants }
> = {
  blur: {
    item: {
      hidden: { opacity: 0, filter: 'blur(12px)' },
      visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.4 } },
      exit: { opacity: 0, filter: 'blur(12px)', transition: { duration: 0.3 } },
    },
  },
  'fade-in-blur': {
    item: {
      hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] } },
      exit: { opacity: 0, y: 20, filter: 'blur(10px)' },
    },
  },
  scale: {
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: {
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.3 } },
      exit: { opacity: 0 },
    },
  },
  slide: {
    item: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      exit: { opacity: 0, y: 40 },
    },
  },
};

const splitText = (text: string, per: PerType) => {
  if (per === 'line') return text.split('\n');
  if (per === 'word') return text.split(/(\s+)/);
  return text.split('');
};

export function TextEffect({
  children,
  per = 'word',
  as = 'p',
  variants,
  className,
  preset = 'fade',
  delay = 0,
  trigger = true,
  onAnimationComplete,
  segmentWrapperClassName,
}: TextEffectProps) {
  const segments = splitText(children, per);
  const MotionTag = ((as && (motion as any)[as]) || motion.p) as React.ComponentType<any>;

  const activePreset = presetVariants[preset] || presetVariants.fade;



  const containerVariants: Variants = {
    hidden: variants?.container?.hidden || defaultContainerVariants.hidden,
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: per === 'char' ? 0.02 : 0.07,
      },
    },
    exit: variants?.container?.exit || defaultContainerVariants.exit,
  };

  const itemVariants: Variants = variants?.item || activePreset.item;

  return (
    <MotionTag
      initial="hidden"
      animate={trigger ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={cn('inline-block whitespace-pre-wrap', className)}
      onAnimationComplete={onAnimationComplete}
    >
      {segments.map((segment, index) => {
        const isSpace = /^\s+$/.test(segment);
        if (isSpace) {
          return <span key={index}>{segment}</span>;
        }

        return (
          <span
            key={index}
            className={cn('inline-block overflow-hidden pb-3 -mb-3', segmentWrapperClassName)}
          >
            <motion.span
              variants={itemVariants}
              className="inline-block"
            >
              {segment}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}

export default TextEffect;
