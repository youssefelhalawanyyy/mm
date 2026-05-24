"use client";

import { useEffect, useState, useCallback } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useKonamiCode() {
  const [activated, setActivated] = useState(false);
  const [index, setIndex] = useState(0);

  const reset = useCallback(() => setActivated(false), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[index]) {
        const next = index + 1;
        if (next === KONAMI.length) {
          setActivated(true);
          setIndex(0);
        } else {
          setIndex(next);
        }
      } else {
        setIndex(0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index]);

  return { activated, reset };
}
