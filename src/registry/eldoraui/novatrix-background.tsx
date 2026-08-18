'use client';

import { motion } from 'framer-motion';

export default function Novatrix({
  color = [1, 1, 1],
  amplitude = 0.12,
  speed = 1,
}: {
  color?: [number, number, number];
  amplitude?: number;
  speed?: number;
}) {
  const [r, g, b] = color;
  const stroke = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, 0.9)`;

  const paths = Array.from({ length: 8 }, (_, index) => {
    const baseY = 18 + index * 11.5;
    const phase = index * 1.6;

    return Array.from({ length: 16 }, (_, pointIndex) => {
      const x = pointIndex * 7;
      const y =
        baseY +
        Math.sin((x / 40) * 2.8 + phase + speed) * 18 * amplitude * (index % 2 === 0 ? 1 : 1.3);

      return `${pointIndex === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(52,125,255,0.12),transparent_30%),radial-gradient(circle_at_80%_35%,rgba(20,99,255,0.15),transparent_28%),linear-gradient(135deg,#071a33_0%,#0b213f_55%,#0d1f3c_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[42px_42px] opacity-60" />
      <div className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-adrig-blue/20 blur-3xl" />
      <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-adrig-blue/10 blur-3xl" />

      <svg
        viewBox="0 0 120 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="novatrix-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="30%" stopColor="rgba(169,200,255,0.9)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
          </linearGradient>
        </defs>

        {paths.map((d, index) => (
          <motion.path
            key={index}
            d={d}
            fill="none"
            stroke="url(#novatrix-line)"
            strokeWidth={0.55}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.25, 0.8, 0.28] }}
            transition={{
              duration: 2.6 + index * 0.25,
              delay: index * 0.18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        <motion.circle
          cx="60"
          cy="50"
          r="5"
          fill={stroke}
          initial={{ opacity: 0.4, scale: 0.8 }}
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.18, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}
