"use client";

import { useEffect, useRef, useState } from "react";

interface Step {
  n: string;
  title: string;
  text: string;
}

function AnimatedStep({ s, i, total }: { s: Step; i: number; total: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isLast = i === total - 1;
  // Alternate: odd steps slide from left, even from right
  const fromDir = i % 2 === 0 ? "-translate-x-8" : "translate-x-8";

  return (
    <li
      ref={ref}
      style={{ transitionDelay: `${i * 100}ms` }}
      className={`relative pb-6 pl-16 transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${fromDir} translate-y-2`}
        ${!isLast ? "before:absolute before:left-6 before:top-12 before:bottom-0 before:border-l-2 before:border-dashed before:border-ink/40" : ""}
      `}
    >
      <span
        aria-hidden
        className={`nb-shadow-sm absolute left-0 top-0 grid size-12 place-items-center rounded-full border-2 border-ink bg-brand font-display text-xl font-extrabold text-white transition-transform duration-700 ease-out ${visible ? "scale-100" : "scale-75"}`}
        style={{ transitionDelay: `${i * 100 + 150}ms` }}
      >
        {s.n}
      </span>
      <div className="nb-card p-4">
        <h3 className="font-display text-xl font-extrabold">{s.title}</h3>
        <p className="mt-1 text-sm text-muted">{s.text}</p>
      </div>
    </li>
  );
}

export function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <section aria-labelledby="how-title" id="how" className="mt-16 scroll-mt-6">
      <h2 id="how-title" className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-muted">
        How it works
      </h2>
      <ol className="mt-5">
        {steps.map((s, i) => (
          <AnimatedStep key={s.n} s={s} i={i} total={steps.length} />
        ))}
      </ol>
    </section>
  );
}
