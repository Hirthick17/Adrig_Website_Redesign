'use client';

import { motion } from 'framer-motion';
import {
  CloudCog,
  Database,
  FileSearch,
  GitBranch,
  Network,
  ShieldCheck,
} from 'lucide-react';

const nodes = [
  { name: 'Data', x: 18, y: 26, Icon: Database },
  { name: 'Workflows', x: 50, y: 12, Icon: GitBranch },
  { name: 'Signals', x: 82, y: 26, Icon: Network },
  { name: 'Systems', x: 18, y: 75, Icon: CloudCog },
  { name: 'Security', x: 82, y: 75, Icon: ShieldCheck },
  { name: 'Discovery', x: 50, y: 90, Icon: FileSearch },
];

export default function Integrations() {
  return (
    <div className="relative h-[25vh] min-h-[260px] w-full overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_center,_rgba(20,99,255,0.12),_transparent_58%),linear-gradient(145deg,_#f8fbff_0%,_#eef4ff_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,92,238,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,92,238,0.06)_1px,transparent_1px)] opacity-80 [background-size:44px_44px]" />

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-x-0 top-[10%] h-[80%] w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="connect-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#CFE0FF" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#A9C8FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#1463FF" stopOpacity="1" />
          </linearGradient>
        </defs>

        {nodes.map(({ x, y }, index) => {
          const dx = 50 - x;
          const dy = 50 - y;
          const curve = Math.max(12, Math.abs(dx) * 0.4 + Math.abs(dy) * 0.4);
          const startX = x;
          const startY = y;
          const c1x = x + dx * 0.35;
          const c1y = y + Math.min(14, curve) * (dy < 0 ? -1 : 1) * 0.35;
          const c2x = 50 - dx * 0.35;
          const c2y = 50 - Math.min(14, curve) * (dy < 0 ? 1 : -1) * 0.35;
          const endX = 50;
          const endY = 50;

          return (
            <motion.path
              key={index}
              d={`M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`}
              fill="none"
              stroke="url(#connect-gradient)"
              strokeWidth="0.75"
              strokeDasharray="3 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0.35, 0.9, 0.5] }}
              transition={{
                pathLength: { duration: 1.2, delay: index * 0.12, ease: 'easeOut' },
                opacity: { duration: 1.8, delay: index * 0.12, repeat: Infinity, ease: 'easeInOut' },
              }}
            />
          );
        })}
      </svg>

      {nodes.map(({ name, x, y, Icon }, index) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.14 + index * 0.1, ease: 'easeOut' }}
          style={{ left: `${x}%`, top: `${y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-[3.8rem] w-[3.8rem] items-center justify-center rounded-2xl border border-blue-200/80 bg-white/90 shadow-[0_16px_30px_rgba(20,99,255,0.12)] backdrop-blur-sm">
              <Icon className="h-[1.5rem] w-[1.5rem] text-[#0E5CEE]" strokeWidth={1.8} />
            </div>
            <span className="rounded-full border border-slate-200/80 bg-white/75 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-700 shadow-sm">
              {name}
            </span>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: [0.9, 1, 0.95],
          scale: [1, 1.06, 1],
          boxShadow: [
            '0 0 0 rgba(20,99,255,0)',
            '0 0 28px rgba(20,99,255,0.24)',
            '0 0 0 rgba(20,99,255,0)',
          ],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 z-10 flex h-[5.5rem] w-[5.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#A9C8FF] bg-white shadow-[0_16px_40px_rgba(20,99,255,0.2)]"
      >
        <FileSearch className="h-8 w-8 text-[#0E5CEE]" strokeWidth={1.7} />
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.25, 0.8, 0.25], scale: [0.8, 1.05, 0.8] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 h-[7.75rem] w-[7.75rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0E5CEE]/30 bg-[#1463FF]/10"
      />
    </div>
  );
}
