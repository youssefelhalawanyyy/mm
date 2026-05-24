"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertTriangle } from "lucide-react";
import { soundManager } from "@/lib/sounds";

interface MainScreenProps {
  onStart: () => void;
}

export default function MainScreen({ onStart }: MainScreenProps) {
  const [showPopup, setShowPopup] = useState(false);

  const handleTrap = () => {
    soundManager.glitch();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleStart = () => {
    soundManager.beep();
    onStart();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="h-full flex flex-col items-center justify-center px-8 relative"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center"
      >
        <motion.div
          className="flex items-center justify-center gap-2 mb-4 md:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary/50" />
          <span className="font-mono text-[10px] md:text-xs text-primary/40 tracking-[0.25em] uppercase">
            Mission Briefing
          </span>
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary/50" />
        </motion.div>

        <motion.h1
          className="text-[2.75rem] md:text-7xl font-bold mb-3 md:mb-4 tracking-tight gradient-text leading-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Agent LOJI
        </motion.h1>

        <motion.p
          className="font-mono text-base md:text-xl text-foreground/50 max-w-md mx-auto mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Eid briefing beta3ek Gahez
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-2 mt-2 mb-10 md:mb-12 font-mono text-[10px] md:text-xs text-accent/35"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-pulse" />
          <span>SIGNAL LOCKED</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center w-full max-w-sm sm:max-w-none sm:w-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.button
          onClick={handleStart}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl font-mono text-base md:text-lg font-semibold text-white transition-all"
          style={{
            background: "linear-gradient(135deg, #a78bfa, #f472b6)",
            boxShadow: "0 0 20px rgba(167, 139, 250, 0.3)",
          }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(167, 139, 250, 0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          Efta7 El Mission
        </motion.button>

        <motion.button
          onClick={handleTrap}
          className="w-full sm:w-auto px-8 py-3 bg-transparent border border-foreground/10 text-foreground/30 font-mono text-sm rounded-2xl hover:border-accent/30 hover:text-accent/50 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          definitely mesh trap
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 glass-pink rounded-2xl px-5 py-4 max-w-[calc(100%-3rem)] sm:max-w-sm text-center z-40"
          >
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <AlertTriangle className="w-4 h-4 text-accent" />
              <span className="font-mono text-xs md:text-sm text-accent font-bold">
                SUSPICIOUS BEHAVIOR
              </span>
            </div>
            <p className="font-mono text-[10px] md:text-xs text-foreground/40">
              bas tamam kamele ... mesh ha2ool 7aga 😏
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
