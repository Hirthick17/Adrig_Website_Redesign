'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export type LogoItem = {
  label: string;
  icon: string;
  animationDelay?: number;
  animationDuration?: number;
  row: number;
};

const LOGO_ICONS: Record<string, { label: string; glyph: string; color: string }> = {
  discord: { label: 'Discord', glyph: 'D', color: '#5865F2' },
  twitter: { label: 'Twitter', glyph: 'X', color: '#1DA1F2' },
  gitHub: { label: 'GitHub', glyph: 'G', color: '#111827' },
  react: { label: 'React', glyph: 'R', color: '#61DAFB' },
  ts: { label: 'TypeScript', glyph: 'TS', color: '#3178C6' },
  tailwind: { label: 'Tailwind', glyph: 'T', color: '#06B6D4' },
  radix: { label: 'Radix', glyph: 'R', color: '#8B5CF6' },
  googleDrive: { label: 'Google Drive', glyph: 'G', color: '#34A853' },
  notion: { label: 'Notion', glyph: 'N', color: '#191919' },
  whatsapp: { label: 'WhatsApp', glyph: 'W', color: '#25D366' },
  messenger: { label: 'Messenger', glyph: 'M', color: '#0084FF' },
  openai: { label: 'OpenAI', glyph: 'O', color: '#111827' },
  zapier: { label: 'Zapier', glyph: 'Z', color: '#FF4F00' },
  v0: { label: 'v0', glyph: 'V', color: '#7C3AED' },
  paypal: { label: 'PayPal', glyph: 'P', color: '#00457C' },
  applePay: { label: 'Apple Pay', glyph: 'A', color: '#111827' },
};

export function LogoTimeline({
  items,
  title = 'Built with the best tools',
  height = 'h-[420px]',
  iconSize = 18,
  showRowSeparator = true,
}: {
  items: LogoItem[];
  title?: string;
  height?: string;
  iconSize?: number;
  showRowSeparator?: boolean;
}) {
  const rows = Array.from(new Set(items.map((item) => item.row))).sort((a, b) => a - b);

  return (
    <div className="relative w-full overflow-hidden rounded-4xl border border-[#D9E2EE] bg-[#F5F8FF] p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1463FF]">Build</p>
          <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em] text-[#071A33] sm:text-3xl">
            {title}
          </h3>
        </div>
      </div>

      <div className={['relative overflow-hidden', height].join(' ')}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,99,255,0.08),transparent_60%)]" />

        {rows.map((row) => {
          const rowItems = items.filter((item) => item.row === row);
          const rowDuration = Math.max(...rowItems.map((item) => item.animationDuration ?? 50));

          return (
            <div key={row} className="relative mb-3 last:mb-0">
              {showRowSeparator && <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#D9E2EE]" />}

              <div className="relative flex h-14 items-center overflow-hidden">
                <motion.div
                  className="flex min-w-max items-center gap-4"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{
                    duration: rowDuration / 12,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {[...rowItems, ...rowItems].map((item, index) => {
                    const config = LOGO_ICONS[item.icon] ?? {
                      label: item.label,
                      glyph: item.label.slice(0, 2).toUpperCase(),
                      color: '#1463FF',
                    };

                    return (
                      <div
                        key={`${row}-${item.label}-${index}`}
                        className="flex w-45 items-center justify-center gap-3 rounded-full border border-[#D9E2EE] bg-white/70 px-4 py-2.5 shadow-[0_8px_22px_rgba(7,26,51,0.04)] backdrop-blur-sm"
                      >
                        <div
                          className="flex items-center justify-center rounded-full text-white"
                          style={{
                            width: iconSize + 14,
                            height: iconSize + 14,
                            fontSize: Math.max(10, iconSize * 0.7),
                            background: config.color,
                            boxShadow: `0 8px 18px ${config.color}33`,
                          }}
                        >
                          {config.glyph}
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1B293D]">
                          {config.label}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
