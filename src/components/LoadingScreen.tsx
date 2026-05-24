"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalLine from "./TerminalLine";
import LoadingBar from "./LoadingBar";
import { soundManager } from "@/lib/sounds";

const BOOT_LINES = [
  { text: "Initializing Eid Protocol..." },
  { text: "3amalt scan lel cutest human alive..." },
  { text: "Detecting drama levels... [EXTREME]" },
  { text: "Checking vibes... [immaculate]" },
  { text: "Mission status: 100% 5atar" },
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const [showAccess, setShowAccess] = useState(false);
  const [exiting, setExiting] = useState(false);

  const advanceLine = useCallback(() => {
    setCurrentLine((prev) => {
      const next = prev + 1;
      if (next >= BOOT_LINES.length) {
        setTimeout(() => setShowBar(true), 400);
      }
      return next;
    });
  }, []);

  const onBarComplete = () => {
    soundManager.accessGranted();
    setShowAccess(true);
    setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 800);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-50 bg-gradient-main flex items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="w-full max-w-lg px-8 md:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 font-mono text-[10px] md:text-xs text-primary/40 text-center tracking-[0.2em]"
            >
              EID_PROTOCOL // 2026
            </motion.div>

            <div className="space-y-3 md:space-y-4 mb-10">
              {BOOT_LINES.map((line, i) => (
                <TerminalLine
                  key={i}
                  text={line.text}
                  delay={i === 0 ? 300 : 200}
                  speed={30}
                  enabled={currentLine >= i}
                  onDone={i === currentLine ? advanceLine : undefined}
                  color="text-primary"
                />
              ))}
            </div>

            <AnimatePresence>
              {showBar && !showAccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <LoadingBar
                    duration={2}
                    label="COMPILING MISSION"
                    onComplete={onBarComplete}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showAccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center mt-12"
                >
                  <motion.div
                    className="text-xl md:text-3xl font-bold gradient-text leading-tight"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ACCESS GRANTED YA AGENT ✨
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xs font-mono text-primary/30 mt-3"
                  >
                    entering mission briefing...
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
