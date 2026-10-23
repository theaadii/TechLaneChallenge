import { HowItWorks } from "@/components/landing/how-it-works";
import { LandingTracker } from "@/components/landing/landing-tracker";
import { LaneCard, LaneCardContent } from "@/components/landing/lane-card";
import { PixelDoodle } from "@/components/landing/pixel-doodle";
import { ButtonLink } from "@/components/ui/button";
import { Shell } from "@/components/ui/shell";
import { QUESTIONS_PER_RUN } from "@/lib/question-set";
import { TRACK_LIST } from "@/lib/tracks";

const steps = [
  { n: "1", title: "Play", text: `Answer ${QUESTIONS_PER_RUN} quick questions: scenarios, mini-debugging and what you enjoy building. No experience needed.` },
  { n: "2", title: "Discover", text: `Earn XP, unlock your Tech Explorer badge and see which of ${TRACK_LIST.length} tech lanes fits you.` },
  { n: "3", title: "Choose", text: "Pick the lane you actually want. The suggestion is a guide, you are in control." },
];

const stats = [
  { value: String(QUESTIONS_PER_RUN), label: "Questions" },
  { value: "~3", label: "Minutes" },
  { value: String(TRACK_LIST.length), label: "Tech lanes" },
];

const laneColours = ["bg-lane-blue", "bg-lane-green", "bg-lane-pink", "bg-lane-sand", "bg-lane-lilac", "bg-lane-sun", "bg-lane-blue", "bg-lane-pink", "bg-lane-sun"];
const laneTilt = ["-rotate-1", "rotate-1", "rotate-1", "-rotate-1", "-rotate-1", "rotate-1", "-rotate-1", "rotate-1", "-rotate-1"];

export default function Home() {
  return (
    <Shell>
      <LandingTracker />
      <section className="animate-rise relative pt-6 sm:pt-12">
        <PixelDoodle className="animate-bob pointer-events-none absolute top-1 right-0 w-20 sm:w-32" />
        <p className="pr-24 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted">Find your tech lane</p>
        <h1 className="mt-4 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-8xl">
          YOUR TECH.
          <span className="nb-shadow mt-2 inline-block -rotate-1 rounded-2xl border-2 border-ink bg-brand px-3 pb-1 text-white">
            YOUR PATH.
          </span>
        </h1>
        <p className="mt-6 text-xl font-medium text-[#3e3730]">Take the challenge. Discover your tech lane.</p>


        <dl className="mt-8 grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="nb-card px-2 py-3 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-4xl font-extrabold leading-none">{s.value}</dd>
              <p aria-hidden className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">{s.label}</p>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/challenge" className="text-lg sm:min-w-56">
            Start Challenge →
          </ButtonLink>
          <ButtonLink href="#how" variant="secondary" className="text-lg">
            How it works
          </ButtonLink>
        </div>
      </section>

      <HowItWorks steps={steps} />

      <section aria-labelledby="lanes" className="mt-10">
        <h2 id="lanes" className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-muted">{TRACK_LIST.length} tech lanes to discover</h2>
        <p className="mt-2 text-sm text-muted">
          This challenge doesn&apos;t rank you. It only points you to the domain that fits you best, so you know where to start.
        </p>
        {(() => {
          const cols = 3;
          const remainder = TRACK_LIST.length % cols;
          const fullRows = TRACK_LIST.slice(0, TRACK_LIST.length - (remainder || 0));
          const lastRow = remainder ? TRACK_LIST.slice(-remainder) : [];
          return (
            <>
              <ul className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                {fullRows.map((t, i) => (
                  <LaneCard key={t.id} track={t} tone={laneColours[i % laneColours.length]} tilt={laneTilt[i % laneTilt.length]} />
                ))}
              </ul>
              {lastRow.length > 0 && (
                <ul className="mt-2 flex justify-center gap-2 sm:gap-3">
                  {lastRow.map((t, i) => {
                    const gi = fullRows.length + i;
                    return (
                      <li key={t.id} className={`w-[calc(33.333%-4px)] ${laneTilt[gi % laneTilt.length]}`}>
                        <LaneCardContent track={t} tone={laneColours[gi % laneColours.length]} />
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          );
        })()}
      </section>

      <section className="nb-card mt-12 flex flex-col items-start gap-4 bg-brand p-6 text-white">
        <h2 className="font-display text-3xl font-extrabold leading-tight">Ready to find your lane?</h2>
        <p className="font-medium text-white">About 3 minutes. No login. Your result is yours.</p>
        <ButtonLink href="/challenge" variant="secondary" className="text-lg">
          Start Challenge →
        </ButtonLink>
      </section>
    </Shell>
  );
}
