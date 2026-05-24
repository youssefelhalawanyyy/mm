"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { soundManager } from "@/lib/sounds";

export default function MuteButton() {
  const [muted, setMuted] = useState(false);

  const toggle = () => {
    const newState = soundManager.toggleMute();
    setMuted(newState);
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed top-4 right-4 z-50 p-2.5 glass rounded-xl hover:bg-primary/10 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={muted ? "Unmute" : "Mute"}
    >
      {muted ? (
        <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-primary/35" />
      ) : (
        <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-primary/60" />
      )}
    </motion.button>
  );
}
