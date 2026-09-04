"use client";

import { useEffect, useState } from "react";

export default function AnimatedNumber({
  value,
  duration = 1000,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const startValue = count;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for a satisfying slow-down at the end
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);

      setCount(Math.floor(startValue + (value - startValue) * easeOutQuart));

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{count}</span>;
}
