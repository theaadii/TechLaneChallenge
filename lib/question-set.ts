import { QUESTIONS } from "@/lib/questions";
import { TRACK_IDS, type AnswerOption, type Answers, type Question, type TrackId } from "@/types";

/** Questions each student answers per run, drawn from the larger bank. */
export const QUESTIONS_PER_RUN = 15;
/** How many of those are "what excites you" preference questions; the rest are knowledge questions. */
export const PREFERENCE_PER_RUN = 6;
/** Options shown on each preference question (the bank has one per track, so some tracks sit out each time). */
export const PREFERENCE_OPTIONS = 4;

/** Deterministic PRNG so one seed always yields the same questions and option order. */
function createRng(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: readonly T[], rng: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** The track a knowledge question mainly tests (highest points; ties go to catalogue order). */
export function primaryTrack(question: Question): TrackId | null {
  let best: TrackId | null = null;
  let bestPts = 0;
  for (const id of TRACK_IDS) {
    const pts = question.tracksOnCorrect?.[id] ?? 0;
    if (pts > bestPts) {
      best = id;
      bestPts = pts;
    }
  }
  return best;
}

/** The track an option mainly points to (highest points; ties go to catalogue order). */
export function optionTrack(option: AnswerOption): TrackId | null {
  let best: TrackId | null = null;
  let bestPts = 0;
  for (const id of TRACK_IDS) {
    const pts = option.scores?.[id] ?? 0;
    if (pts > bestPts) {
      best = id;
      bestPts = pts;
    }
  }
  return best;
}

/**
 * Pick a balanced random run from the bank: PREFERENCE_PER_RUN preference
 * questions plus knowledge questions spread across the tracks (one per track
 * before any track gets a second), a preference question first as a warm-up,
 * and answer options shuffled. Pure: the same seed always gives the same run.
 */
export function selectQuestions(
  seed: string,
  bank: Question[] = QUESTIONS,
  count: number = QUESTIONS_PER_RUN,
): Question[] {
  const rng = createRng(seed);
  const preference = shuffle(bank.filter((q) => q.kind === "preference"), rng);
  const knowledge = bank.filter((q) => q.kind === "knowledge");

  const prefCount = Math.min(PREFERENCE_PER_RUN, preference.length, count);
  const knowledgeCount = Math.min(count - prefCount, knowledge.length);

  const buckets = new Map<TrackId | null, Question[]>();
  for (const q of shuffle(knowledge, rng)) {
    const key = primaryTrack(q);
    buckets.set(key, [...(buckets.get(key) ?? []), q]);
  }
  const picked: Question[] = [];
  const order = shuffle([...buckets.keys()], rng);
  while (picked.length < knowledgeCount) {
    for (const key of order) {
      const next = buckets.get(key)?.shift();
      if (next && picked.length < knowledgeCount) picked.push(next);
    }
  }

  const [warmUp, ...restPref] = preference.slice(0, prefCount);
  const rest = shuffle([...restPref, ...picked], rng);
  const ordered = [...(warmUp ? [warmUp] : []), ...rest];

  // Each preference question hides the options of a few tracks. Hidden tracks come from
  // successive shuffles of the track list, so over 4 questions no track is hidden more than
  // twice and every track stays reachable through at least two preference questions.
  let hidden: TrackId[] = [];
  const nextHidden = (n: number): TrackId[] => {
    while (hidden.length < n) hidden = [...hidden, ...shuffle([...TRACK_IDS], rng)];
    const out = hidden.slice(0, n);
    hidden = hidden.slice(n);
    return out;
  };

  return ordered.map((q) => {
    let options = q.options;
    if (q.kind === "preference" && options.length > PREFERENCE_OPTIONS) {
      const gone = nextHidden(options.length - PREFERENCE_OPTIONS);
      const kept = options.filter((o) => {
        const t = optionTrack(o);
        return !t || !gone.includes(t);
      });
      if (kept.length >= 2) options = kept;
    }
    return { ...q, options: shuffle(options, rng) };
  });
}

/** The questions a set of answers refers to (server side: the client only ever answers its own run). */
export function questionsForAnswers(answers: Answers, bank: Question[] = QUESTIONS): Question[] {
  return bank.filter((q) => answers[q.id] !== undefined);
}

export function newSeed(): string {
  const bytes = new Uint32Array(2);
  if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(bytes);
  else bytes.forEach((_, i) => (bytes[i] = Math.floor(Math.random() * 2 ** 32)));
  return Array.from(bytes, (n) => n.toString(36)).join("");
}
