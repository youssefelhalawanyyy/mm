"use client";

import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useRef } from "react";

interface TerminalLineProps {
  text: string;
  delay?: number;
  speed?: number;
  prefix?: string;
  onDone?: () => void;
  enabled?: boolean;
  color?: string;
}

export default function TerminalLine({
  text,
  delay = 0,
  speed = 35,
  prefix = "> ",
  onDone,
  enabled = true,
  color = "text-primary",
}: TerminalLineProps) {
  const { displayed, done } = useTypewriter(text, speed, delay, enabled);
  const calledRef = useRef(false);

  if (done && onDone && !calledRef.current) {
    calledRef.current = true;
    setTimeout(onDone, 100);
  }

  if (!enabled) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`font-mono text-xs md:text-sm ${color} leading-relaxed`}
    >
      <span className="opacity-35">{prefix}</span>
      <span>{displayed}</span>
      {!done && <span className="cursor-blink" />}
    </motion.div>
  );
}
