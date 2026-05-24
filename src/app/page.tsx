"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import MainScreen from "@/components/MainScreen";
import QuizSection from "@/components/QuizSection";
import LoveGate from "@/components/LoveGate";
import FinalEnding from "@/components/FinalEnding";
import ParticleField from "@/components/ParticleField";
import MuteButton from "@/components/MuteButton";
import EasterEggs from "@/components/EasterEggs";

type Phase = "loading" | "main" | "quiz" | "love" | "final";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("loading");

  return (
    <div className="h-screen h-dvh relative bg-gradient-main overflow-hidden safe-bottom">
      <ParticleField />

      {phase !== "loading" && (
        <>
          <MuteButton />
          <EasterEggs />
        </>
      )}

      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <LoadingScreen key="loading" onComplete={() => setPhase("main")} />
        )}

        {phase === "main" && (
          <MainScreen key="main" onStart={() => setPhase("quiz")} />
        )}

        {phase === "quiz" && (
          <QuizSection key="quiz" onComplete={() => setPhase("love")} />
        )}

        {phase === "love" && (
          <LoveGate key="love" onComplete={() => setPhase("final")} />
        )}

        {phase === "final" && (
          <FinalEnding key="final" />
        )}
      </AnimatePresence>
    </div>
  );
}
