"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { soundManager } from "@/lib/sounds";

interface QuizQuestion {
  question: string;
  choices: string[];
  correctIndex: number;
  correctReaction: string;
  wrongReaction: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    question: "Awel mara et2abelna emta?",
    choices: ["May 13, 2026", "May 15, 2026", "May 14, 2026", "May 16, 2025"],
    correctIndex: 2,
    correctReaction: "3arefek ya smart 😏 azka wahda feil donya",
    wrongReaction: "mission failed ya ostaza... el egaba May 14, 2026 ya ostaza el sa3a kanet 3adeit 12",
  },
  {
    question: "My fav color?",
    choices: ["White", "Blue", "Black", "kol el options"],
    correctIndex: 2,
    correctReaction: "AYWA BAA EL EHTEMAM",
    wrongReaction: "la2 ya basha... Keda Az3al :(",
  },
  {
    question: "aktar haga bahebaha feeky?",
    choices: [
      "el dehka",
      "el attitude",
      "how you randomly appear in my brain",
      "kol haga literally",
    ],
    correctIndex: 3,
    correctReaction: "Aheb el Seka 😉 bgd kol haga",
    wrongReaction: "it's kol haga ya basha.",
  },
];

interface QuizSectionProps {
  onComplete: () => void;
}

export default function QuizSection({ onComplete }: QuizSectionProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [failed, setFailed] = useState(false);

  if (currentQ >= QUESTIONS.length) return null;

  const q = QUESTIONS[currentQ];
  const isCorrect = selected === q.correctIndex;

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);

    if (index === q.correctIndex) {
      soundManager.success();
    } else {
      soundManager.glitch();
      setFailed(true);
    }
  };

  const handleNext = () => {
    soundManager.beep();
    if (currentQ + 1 >= QUESTIONS.length) {
      onComplete();
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const handleRetry = () => {
    soundManager.beep();
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setFailed(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="h-full flex items-center justify-center px-5 md:px-6"
    >
      <div className="w-full max-w-lg">
        <motion.div
          className="text-center mb-5 md:mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <span className="font-mono text-[10px] md:text-xs text-primary/35 tracking-[0.2em] uppercase">
            Mission Quiz
          </span>
          <div className="flex items-center justify-center gap-2.5 md:gap-3 mt-2">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i < currentQ
                    ? "bg-primary w-2 md:w-2.5"
                    : i === currentQ
                    ? "bg-accent w-5 md:w-6"
                    : "bg-foreground/10 w-2 md:w-2.5"
                }`}
              />
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl md:rounded-3xl p-5 md:p-8"
          >
            <h3 className="text-lg md:text-2xl font-bold text-foreground/85 mb-6 md:mb-8 text-center leading-snug">
              {q.question}
            </h3>

            <div className="space-y-2.5 md:space-y-3 mb-5 md:mb-6">
              {q.choices.map((choice, i) => {
                let styles = "border-foreground/8 hover:border-primary/25 hover:bg-primary/5";

                if (showResult) {
                  if (i === q.correctIndex) {
                    styles = "border-primary/50 bg-primary/10";
                  } else if (i === selected && !isCorrect) {
                    styles = "border-danger/50 bg-danger/10";
                  } else {
                    styles = "border-foreground/5 opacity-35";
                  }
                }

                return (
                  <motion.button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={showResult}
                    className={`w-full text-left p-3.5 md:p-4 rounded-xl md:rounded-2xl border ${styles} font-mono text-xs md:text-sm transition-all flex items-center gap-3`}
                    whileHover={!showResult ? { x: 4 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                  >
                    <span className="text-primary/30 text-[10px] md:text-xs w-5 shrink-0">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span className="text-foreground/70">{choice}</span>
                    {showResult && i === q.correctIndex && (
                      <CheckCircle className="w-4 h-4 text-primary ml-auto shrink-0" />
                    )}
                    {showResult && i === selected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-danger ml-auto shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 md:space-y-4"
                >
                  <div
                    className={`p-3.5 md:p-4 rounded-xl md:rounded-2xl font-mono text-xs md:text-sm text-center leading-relaxed ${
                      isCorrect
                        ? "bg-primary/8 border border-primary/15 text-primary"
                        : "bg-danger/8 border border-danger/15 text-danger"
                    }`}
                  >
                    {isCorrect ? q.correctReaction : q.wrongReaction}
                  </div>

                  {isCorrect ? (
                    <motion.button
                      onClick={handleNext}
                      className="w-full py-3 md:py-3.5 rounded-xl md:rounded-2xl font-mono text-xs md:text-sm font-semibold text-white transition-all"
                      style={{
                        background: "linear-gradient(135deg, #a78bfa, #f472b6)",
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {currentQ + 1 >= QUESTIONS.length ? "Continue ✨" : "Next Question →"}
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleRetry}
                      className="w-full py-3 md:py-3.5 rounded-xl md:rounded-2xl font-mono text-xs md:text-sm font-semibold border border-danger/25 text-danger hover:bg-danger/8 transition-all flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Start Over ya agent
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {failed && showResult && !isCorrect && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center font-mono text-[10px] md:text-xs text-foreground/20 mt-4"
          >
            lazem tgaweby s7 3shan tekamely el mission 😤
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
