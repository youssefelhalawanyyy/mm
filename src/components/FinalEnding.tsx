"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function FinalEnding() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 2500),
      setTimeout(() => setStep(3), 4500),
      setTimeout(() => setStep(4), 6500),
      setTimeout(() => setStep(5), 8500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="h-full flex items-center justify-center px-5 md:px-6 py-8 relative"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              y: [0, -30],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <Heart className="w-2.5 h-2.5 md:w-3 md:h-3 text-accent/25" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-md mx-auto text-center relative z-10 flex flex-col items-center">
        <AnimatePresence>
          {step >= 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4 md:mb-6"
            >
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary/35" />
                <span className="font-mono text-[10px] md:text-xs text-primary/35 tracking-[0.25em] uppercase">
                  Mission Complete
                </span>
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary/35" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="glass rounded-2xl md:rounded-3xl p-5 md:p-8 space-y-4 md:space-y-5 text-left w-full mb-6 md:mb-8">
          <AnimatePresence>
            {step >= 1 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-foreground/40 font-mono text-xs md:text-sm"
              >
                bs bgd...
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-foreground/75 text-base md:text-lg leading-relaxed"
              >
                enty ahsan w ahla haga hasalet fe hayaty. ana bahemed rabeina 24hr eni 3ereftik w bgd enty ghalya awiii. i never wished for better wallah 🤍🤍
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 3 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-foreground/60 text-base md:text-lg leading-relaxed"
              >
                Rabeina yekhaleiky leiya yarab tool el 3omr. w a2dar absetik w akhaleiky mertaha tool el hayat. i promise en da shoghle el gedid eni akhaleiky mabsouta w mertaha tool el hayat 🤍🤍
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 4 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-primary/35 font-mono text-[10px] md:text-xs pt-3 md:pt-4 border-t border-primary/8"
              >
                // Youssef Elhalawany
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-3 md:space-y-4"
            >
              <motion.div
                className="flex items-center justify-center gap-2.5 md:gap-3"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 md:w-5 md:h-5 text-accent" fill="currentColor" />
                <span className="text-xl md:text-3xl font-bold gradient-text">
                  Eid Mubarak ya Habibty 
                </span>
                <Heart className="w-4 h-4 md:w-5 md:h-5 text-accent" fill="currentColor" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-mono text-xs md:text-sm text-foreground/35"
              >
                officially: enty ahsan haga hasalet fe hayaty 🤍
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="font-mono text-[9px] md:text-[10px] text-foreground/12 pt-4 md:pt-6"
              >
                made with Love.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
