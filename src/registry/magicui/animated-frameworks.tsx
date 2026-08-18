"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Braces,
  Cloud,
  Code,
  Database,
  GitBranch,
  Globe,
  HardDrive,
  Layers,
  Server,
  Settings,
  ShieldCheck,
} from "lucide-react";

interface AnimatedFrameworksProps {
  cardTitle?: string;
  cardDescription?: string;
  className?: string;
}

const icons = [
  { icon: Braces, name: "Next.js" },
  { icon: Code, name: "React" },
  { icon: Globe, name: "HTML" },
  { icon: GitBranch, name: "GitHub" },
  { icon: Cloud, name: "AWS" },
  { icon: Database, name: "PostgreSQL" },
  { icon: Server, name: "Node.js" },
  { icon: Layers, name: "Docker" },
  { icon: Settings, name: "Kubernetes" },
  { icon: ShieldCheck, name: "Security" },
  { icon: HardDrive, name: "Storage" },
];

const AnimatedFrameworks = ({
  cardTitle = "Universal Compatibility",
  cardDescription = "Works seamlessly with Next.js, React, HTML, Apple, GitHub, OpenAI, and more fits everywhere.",
  className,
}: AnimatedFrameworksProps ) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={cn(
        "relative flex h-full w-full max-w-[540px] scale-[0.9] flex-col items-center justify-center overflow-visible rounded-2xl border border-white/15 bg-white/[0.07] shadow-[0_28px_90px_rgba(0,0,0,0.25)] backdrop-blur",
        className
      )}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-transparent" />

      <div className="relative z-10 p-5 text-center sm:p-6">
        <h3 className="text-xl font-semibold text-white sm:text-2xl">{cardTitle}</h3>
        <p className="mt-2 text-sm text-white/70 sm:text-base">{cardDescription}</p>
      </div>

      <motion.div
        className="relative z-10 mt-5 grid grid-cols-3 gap-3 p-4 sm:gap-4 sm:p-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {icons.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center rounded-lg bg-white/10 p-3 text-white/80 backdrop-blur-sm"
            variants={itemVariants}
            whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <item.icon className="h-5 w-5 text-[#A9C8FF] sm:h-[1.875rem] sm:w-[1.875rem]" />
            <span className="mt-1.5 text-[10px] font-medium text-white/90 sm:text-xs">
              {item.name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative z-10 mt-5 pb-2">
        <Link
          href="/technologies"
          className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[11px] font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-white/25 sm:text-xs"
        >
          Explore all frameworks
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default AnimatedFrameworks;