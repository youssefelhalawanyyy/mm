"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { soundManager } from "@/lib/sounds";

const NO_MESSAGES = [
  "answer undefined... try again 🤨",
  "el system mesh fahem... a3eedy",
  "ERROR 404: valid answer not found",
  "nice try bas la2 mesh option",
  "server rejected your response 💀",
  "ana ha2olha tany...",
  "el button da mesh shaghal apparently",
  "مفيش escape من هنا يا حبي",
];

interface LoveGateProps {
  onComplete: () => void;
}

export default function LoveGate({ onComplete }: LoveGateProps) {
  const [noCount, setNoCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleYes = () => {
    soundManager.success();
    setAccepted(true);
    setTimeout(onComplete, 1500);
  };

  const handleNo = () => {
    soundManager.glitch();
    if (timerRef.current) clearTimeout(timerRef.current);
    const idx = noCount;
    setNoCount((c) => c + 1);
    setErrorMsg(NO_MESSAGES[Math.min(idx, NO_MESSAGES.length - 1)]);
    timerRef.current = setTimeout(() => setErrorMsg(null), 3000);
  };

  const noButtonSize = Math.max(0.4, 1 - noCount * 0.12);
  const yesButtonSize = 1 + noCount * 0.08;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="h-full flex items-center justify-center px-8"
    >
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center w-full max-w-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-5 md:mb-6"
            >
              <Heart className="w-10 h-10 md:w-12 md:h-12 text-accent mx-auto" fill="currentColor" />
            </motion.div>

            <h2 className="text-2xl md:text-4xl font-bold text-foreground/85 mb-2 md:mb-3">
              last question...
            </h2>

            <p className="text-lg md:text-2xl gradient-text font-bold mb-8 md:mb-10">
              do you love me? 🥺
            </p>

            <div className="flex items-center justify-center gap-5 md:gap-6">
              <motion.button
                onClick={handleYes}
                className="px-8 md:px-10 py-3.5 md:py-4 rounded-2xl font-mono text-base md:text-lg font-bold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #f472b6)",
                  boxShadow: "0 0 25px rgba(244, 114, 182, 0.3)",
                  transform: `scale(${yesButtonSize})`,
                }}
                whileHover={{ boxShadow: "0 0 40px rgba(244, 114, 182, 0.5)" }}
                whileTap={{ scale: yesButtonSize * 0.95 }}
              >
                Yes 💕
              </motion.button>

              <motion.button
                onClick={handleNo}
                className="px-5 md:px-6 py-2.5 md:py-3 rounded-2xl font-mono text-xs md:text-sm border border-foreground/12 text-foreground/25 hover:border-foreground/20 transition-all"
                style={{
                  transform: `scale(${noButtonSize})`,
                  opacity: Math.max(0.3, 1 - noCount * 0.1),
                }}
                whileTap={{ scale: noButtonSize * 0.95 }}
              >
                No
              </motion.button>
            </div>

            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  key={noCount}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="mt-6 md:mt-8 glass-pink rounded-2xl p-3.5 md:p-4 max-w-xs mx-auto"
                >
                  <p className="font-mono text-xs md:text-sm text-accent">
                    {errorMsg}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {noCount >= 3 && !errorMsg && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-5 md:mt-6 font-mono text-[10px] md:text-xs text-foreground/18"
              >
                hint: el igaba el wa7eda el shagala hena hya &quot;yes&quot; 😏
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="accepted"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.6, repeat: 2 }}
            >
              <Heart className="w-16 h-16 md:w-20 md:h-20 text-accent mx-auto mb-4" fill="currentColor" />
            </motion.div>
            <p className="text-xl md:text-2xl font-bold gradient-text">
              3arefek ya smart 💕
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
