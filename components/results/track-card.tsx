import { Button } from "@/components/ui/button";
import { TrackIcon } from "@/components/ui/track-icon";
import type { Track } from "@/types";

interface Props {
  track: Track;
  selected: boolean;
  onChoose: (id: Track["id"]) => void;
  badge?: string;
  featured?: boolean;
  explanation?: string;
}

export function TrackDetails({ track }: { track: Track }) {
  return (
    <div className="mt-4 space-y-4 text-sm">
      <p className="text-[#3e3730]">{track.description}</p>
      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Career path</h3>
        <p className="mt-1">{track.careerPath}</p>
      </div>
      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Skills to explore</h3>
        <ul className="mt-2 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {track.skills.map((s) => (
            <li key={s} className="shrink-0 rounded-full border-2 border-ink bg-white px-3 py-1 text-xs">{s}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border-2 border-dashed border-ink/50 bg-lane-sun p-3">
        <h3 className="font-mono text-xs uppercase tracking-widest text-brand-strong">Beginner project idea</h3>
        <p className="mt-1">{track.project}</p>
      </div>
    </div>
  );
}

function ChooseButton({ track, selected, onChoose, featured }: Pick<Props, "track" | "selected" | "onChoose" | "featured">) {
  return (
    <Button
      onClick={() => onChoose(track.id)}
      variant={selected ? "secondary" : featured ? "primary" : "secondary"}
      aria-pressed={selected}
      className={`mt-5 w-full py-3 text-base ${selected ? "border-brand text-brand-strong" : ""}`}
    >
      {selected ? `✓ Selected: ${track.shortName}` : featured ? "Choose This Track" : `Choose ${track.shortName}`}
    </Button>
  );
}

/** Large card for the primary / secondary recommendation. */
export function FeaturedTrackCard({ track, selected, onChoose, badge, featured, explanation }: Props) {
  return (
    <article className={`animate-rise nb-card overflow-hidden ${selected ? "bg-lane-green!" : ""}`}>
      {/* Explanation banner — sits above everything, full-bleed */}
      {explanation && (
        <div className="border-b-2 border-ink/15 bg-panel-2 px-4 py-3 text-sm leading-relaxed">
          💡 {explanation}
        </div>
      )}

      <div className="p-4 sm:p-5">
        {/* Badge + "your pick" pill */}
        <div className="flex items-center justify-between gap-2">
          {badge && (
            <p className="font-mono text-xs uppercase tracking-widest text-brand-strong">
              {badge}
            </p>
          )}
          {selected && (
            <p className="rounded-full border-2 border-ink bg-brand px-2.5 py-0.5 font-mono text-xs font-bold text-white">
              ✓ Your pick
            </p>
          )}
        </div>

        {/* Track name — no tagline */}
        <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
          <TrackIcon id={track.id} size={28} className="mr-2 inline-block align-middle" />
          {track.name}
        </h2>

        <TrackDetails track={track} />
        <ChooseButton track={track} selected={selected} onChoose={onChoose} featured={featured} />
      </div>
    </article>
  );
}

/** Collapsed card for browsing the other tracks. */
export function CompactTrackCard({ track, selected, onChoose }: Props) {
  return (
    <details className={`group nb-card p-4 ${selected ? "bg-lane-green!" : ""}`}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold marker:hidden">
        <span className="flex items-center gap-2">
          <span aria-hidden className="text-xl">{track.emoji}</span>
          <span>
            {track.name}
            {selected && <span className="ml-2 text-xs text-brand-strong">✓ selected</span>}
          </span>
        </span>
        <span aria-hidden className="shrink-0 text-muted transition group-open:rotate-90">›</span>
      </summary>
      <TrackDetails track={track} />
      <ChooseButton track={track} selected={selected} onChoose={onChoose} />
    </details>
  );
}
