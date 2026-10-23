import {
  BarChart2,
  Globe,
  Cloud,
  RefreshCw,
  ShieldCheck,
  Handshake,
  Smartphone,
  Bot,
} from "lucide-react";
import type { Track, TrackId } from "@/types";

/** A fake code window per lane: just flavour, so students can picture the kind of work. */
const WINDOW: Record<TrackId, { file: string; code: string }> = {
  "ai-ml": { file: "model.py", code: "fit(data)" },
  "web-dev": { file: "index.tsx", code: "render()" },
  "cloud-engineering": { file: "main.tf", code: "apply()" },
  "devops": { file: "pipeline.yml", code: "deploy()" },
  "cyber-security": { file: "scan.py", code: "scan(target)" },
  fde: { file: "client.ts", code: "solve(it)" },
  mobile: { file: "App.tsx", code: "app.run()" },
  "ai-dev": { file: "agent.py", code: "llm.act()" },
};

const ICON: Record<TrackId, React.ReactNode> = {
  "ai-ml":             <BarChart2   size={28} strokeWidth={2} />,
  "web-dev":           <Globe       size={28} strokeWidth={2} />,
  "cloud-engineering": <Cloud       size={28} strokeWidth={2} />,
  "devops":            <RefreshCw   size={28} strokeWidth={2} />,
  "cyber-security":    <ShieldCheck size={28} strokeWidth={2} />,
  "fde":               <Handshake   size={28} strokeWidth={2} />,
  "mobile":            <Smartphone  size={28} strokeWidth={2} />,
  "ai-dev":            <Bot         size={28} strokeWidth={2} />,
};

function CardInner({ track, tone }: { track: Track; tone: string }) {
  const w = WINDOW[track.id];
  return (
    <>
      <div aria-hidden className="flex items-center gap-1 border-b-2 border-ink bg-ink px-2 py-1.5 sm:gap-1.5 sm:px-3">
        <span className="size-1.5 rounded-full bg-[#ff5f57] sm:size-2" />
        <span className="size-1.5 rounded-full bg-[#febc2e] sm:size-2" />
        <span className="size-1.5 rounded-full bg-[#28c840] sm:size-2" />
        <span className="ml-1 font-mono text-[8px] text-paper/80 sm:text-[10px]">{w.file}</span>
      </div>
      <div className={`${tone} flex flex-1 flex-col p-2 sm:p-3`}>
        <span aria-hidden className="text-ink/80">{ICON[track.id]}</span>
        <p className="mt-1 font-display text-[11px] font-extrabold leading-tight sm:text-base">{track.name}</p>
        <p aria-hidden className="mt-auto truncate rounded-md bg-ink px-1.5 py-1 font-mono text-[8px] text-[#9ee8b0] sm:px-2 sm:py-1.5 sm:text-[10px]">
          <span className="text-paper/60">&gt; </span>
          {w.code}
          <span className="animate-pulse">▍</span>
        </p>
      </div>
    </>
  );
}

/** Used in the main 3-column grid — renders as a <li>. */
export function LaneCard({ track, tone, tilt }: { track: Track; tone: string; tilt: string }) {
  return (
    <li className={`nb-card flex flex-col overflow-hidden ${tilt}`}>
      <CardInner track={track} tone={tone} />
    </li>
  );
}

/** Used in the centred last-row flex list — renders as a <div> so the parent <li> wraps it. */
export function LaneCardContent({ track, tone }: { track: Track; tone: string }) {
  return (
    <div className="nb-card flex h-full flex-col overflow-hidden">
      <CardInner track={track} tone={tone} />
    </div>
  );
}
