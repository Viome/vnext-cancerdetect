"use client";

import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(
        100,
        Math.max(0, (scrollTop / docHeight) * 100)
      );

      const scale = scrollPercent / 100;
      const baseOpacity = scrollTop > 0 ? 0.01 : 0; // Minimum visible opacity
      const maxOpacity = 1.0; // Maximum opacity
      const opacityProgress = Math.min(1, scrollPercent / 90);
      const calculatedOpacity =
        scrollTop > 0
          ? baseOpacity + (maxOpacity - baseOpacity) * opacityProgress
          : 0;

      setProgress(scale);
      setOpacity(calculatedOpacity);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-1 z-50"
      style={{
        background: "#1f4855",
        opacity: opacity,
        transform: `scale(${progress}, 1)`,
        transformOrigin: "top left",
        transition: "all 0.1s ease-out",
      }}
    />
  );
}
