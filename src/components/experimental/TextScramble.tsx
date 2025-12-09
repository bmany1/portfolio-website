"use client";

import { useEffect, useState, useCallback } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  scrambleOnHover?: boolean;
}

const chars = "!<>-_\\/[]{}=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default function TextScramble({
  text,
  className = "",
  delay = 0,
  duration = 1500,
  scrambleOnHover = false,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    const iterations = 3;
    const length = text.length;
    let frame = 0;
    const totalFrames = length * iterations;

    const interval = setInterval(() => {
      const progress = frame / totalFrames;
      const revealedChars = Math.floor(progress * length);

      let result = "";
      for (let i = 0; i < length; i++) {
        if (i < revealedChars) {
          result += text[i];
        } else if (text[i] === " ") {
          result += " ";
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(result);
      frame++;

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, duration / totalFrames);
  }, [text, duration, isScrambling]);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const timer = setTimeout(scramble, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay, scramble]);

  const handleMouseEnter = () => {
    if (scrambleOnHover && !isScrambling) {
      scramble();
    }
  };

  return (
    <span
      ref={ref}
      className={`font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {displayText}
    </span>
  );
}
