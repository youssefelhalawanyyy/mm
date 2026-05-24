"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { soundManager } from "@/lib/sounds";

const RANDOM_MESSAGES = [
  "mafeesh haga suspicious خالص",
  "mesh mohtaram",
  "too much cuteness detected",
  "sabab: enti... as usual",
  "7aga mesh tabi3ya bgd",
  "WARNING: feelings approaching",
  "404: chill not found",
  "enti 5atar 3la el system",
];

export default function EasterEggs() {
  const { activated: konamiActivated, reset: resetKonami } = useKonamiCode();
  const [randomMsg, setRandomMsg] = useState<string | null>(null);
  const [konamiMsg, setKonamiMsg] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.15) {
        const msg = RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)];
        setRandomMsg(msg);
        soundManager.hoverTick();
        setTimeout(() => setRandomMsg(null), 3000);
      }
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (konamiActivated) {
      soundManager.success();
      setKonamiMsg(true);
      setTimeout(() => {
        setKonamiMsg(false);
        resetKonami();
      }, 5000);
    }
  }, [konamiActivated, resetKonami]);

  return (
    <>
      <AnimatePresence>
        {randomMsg && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-5 right-4 z-50 glass rounded-xl px-3.5 py-2 max-w-[200px] md:max-w-xs"
          >
            <div className="font-mono text-[10px] md:text-xs text-primary/40">
              {randomMsg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {konamiMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none px-6"
          >
            <div className="glass rounded-2xl md:rounded-3xl p-6 md:p-8 text-center max-w-sm">
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">🕹️</div>
              <div className="text-base md:text-lg font-bold gradient-text mb-2">
                KONAMI CODE ACTIVATED
              </div>
              <div className="font-mono text-xs md:text-sm text-foreground/40">
                easter egg found ya legend! el commitment da 5atar ✨
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
