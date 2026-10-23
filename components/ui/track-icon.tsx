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
import type { TrackId } from "@/types";

const ICONS: Record<TrackId, React.ElementType> = {
  "ai-ml":             BarChart2,
  "web-dev":           Globe,
  "cloud-engineering": Cloud,
  "devops":            RefreshCw,
  "cyber-security":    ShieldCheck,
  "fde":               Handshake,
  "mobile":            Smartphone,
  "ai-dev":            Bot,
};

export function TrackIcon({ id, size = 24, className = "" }: { id: TrackId; size?: number; className?: string }) {
  const Icon = ICONS[id];
  if (!Icon) return null;
  return <Icon size={size} strokeWidth={2} className={className} aria-hidden />;
}
