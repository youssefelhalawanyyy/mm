"use client";

import { motion } from "framer-motion";

interface LoadingBarProps {
  duration?: number;
  label?: string;
  onComplete?: () => void;
}

export default function LoadingBar({ duration = 2, label = "LOADING", onComplete }: LoadingBarProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between font-mono text-xs text-primary/40 mb-1">
        <span>{label}</span>
        <span>100%</span>
      </div>
      <div className="h-2 bg-primary/10 rounded-full overflow-hidden border border-primary/20">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #a78bfa, #f472b6, #818cf8)",
            boxShadow: "0 0 10px rgba(167, 139, 250, 0.4)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration, ease: "easeInOut" }}
          onAnimationComplete={onComplete}
        />
      </div>
    </div>
  );
}
