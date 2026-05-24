"use client";

import { useState, useEffect, useCallback } from "react";
import { soundManager } from "@/lib/sounds";

export function useTypewriter(
  text: string,
  speed = 40,
  startDelay = 0,
  enabled = true
) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    setDisplayed("");
    setDone(false);

    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          soundManager.keyClick();
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay, enabled]);

  const skip = useCallback(() => {
    setDisplayed(text);
    setDone(true);
  }, [text]);

  return { displayed, done, skip };
}
