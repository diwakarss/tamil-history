"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

interface UseInViewResult {
  ref: (node: Element | null) => void;
  inView: boolean;
}

export function useInView(options: UseInViewOptions = {}): UseInViewResult {
  const { threshold = 0.2, triggerOnce = true, rootMargin = "0px" } = options;

  const [inView, setInView] = useState(false);
  const elementRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: Element | null) => {
      // Cleanup previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (!node) {
        elementRef.current = null;
        return;
      }

      elementRef.current = node;

      // Check for IntersectionObserver support
      if (typeof IntersectionObserver === "undefined") {
        // Fallback for legacy browsers: show everything
        setInView(true);
        return;
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setInView(true);
              if (triggerOnce && observerRef.current) {
                observerRef.current.disconnect();
              }
            } else if (!triggerOnce) {
              setInView(false);
            }
          });
        },
        { threshold, rootMargin }
      );

      observerRef.current.observe(node);
    },
    [threshold, triggerOnce, rootMargin]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { ref, inView };
}
