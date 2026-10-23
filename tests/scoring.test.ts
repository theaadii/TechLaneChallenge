import { describe, expect, it } from "vitest";
import { QUESTIONS as BANK } from "@/lib/questions";
import { QUESTIONS_PER_RUN } from "@/lib/question-set";
import { CLOSE_MARGIN, maxXp, rankTracks, recommend, scoreAnswer, scoreAnswers, XP_CORRECT, XP_PREFERENCE } from "@/lib/scoring";
import { TRACK_IDS, type Answers, type TrackId } from "@/types";

/** The original ten-question run: these tests exercise scoring maths on a fixed set. */
const QUESTIONS = BANK.filter((x) => /^q([1-9]|10)-/.test(x.id));

const q = (id: string) => QUESTIONS.find((x) => x.id === id)!;

/** Correct answer for every knowledge question, then the given option for preferences. */
function answersFor(pickPreference: (qid: string) => string, knowledge: "correct" | "wrong" = "correct"): Answers {
  const a: Answers = {};
  for (const question of QUESTIONS) {
    if (question.kind === "knowledge") {
      a[question.id] =
        knowledge === "correct" ? question.correctOptionId! : question.options.find((o) => o.id !== question.correctOptionId)!.id;
    } else a[question.id] = pickPreference(question.id);
  }
  return a;
}

/** The preference option that gives `track` the most points in this question. */
function prefOptionFor(track: TrackId) {
  return (qid: string) => {
    const opts = q(qid).options;
    return opts.reduce((best, o) => ((o.scores?.[track] ?? 0) > (best.scores?.[track] ?? 0) ? o : best)).id;
  };
}

describe("question bank integrity", () => {
  it("has a bank larger than one run, with unique ids", () => {
    expect(QUESTIONS.length).toBe(10);
    expect(BANK.length).toBeGreaterThan(QUESTIONS_PER_RUN);
    expect(new Set(BANK.map((x) => x.id)).size).toBe(BANK.length);
  });
  it("defines a scoring mapping for every question", () => {
    for (const question of BANK) {
      expect(new Set(question.options.map((o) => o.id)).size).toBe(question.options.length);
      if (question.kind === "knowledge") {
        expect(question.options.some((o) => o.id === question.correctOptionId)).toBe(true);
        expect(Object.keys(question.tracksOnCorrect ?? {}).length).toBeGreaterThan(0);
      } else {
        expect(question.options.every((o) => Object.keys(o.scores ?? {}).length > 0)).toBe(true);
      }
    }
  });
  it("only references valid track ids", () => {
    for (const question of BANK) {
      const refs = [question.tracksOnCorrect, ...question.options.map((o) => o.scores)];
      for (const r of refs) for (const k of Object.keys(r ?? {})) expect(TRACK_IDS).toContain(k);
    }
  });
});

describe("correct-answer scoring (knowledge)", () => {
  it("awards XP and track points only for the correct option", () => {
    const churn = q("q2-churn");
    const right = scoreAnswer(churn, "a");
    expect(right.xp).toBe(XP_CORRECT);
    expect(right.points["ai-ml"]).toBe(3);
    const wrong = scoreAnswer(churn, "b");
    expect(wrong.xp).toBe(0);
    expect(wrong.points["ai-ml"]).toBe(0);
  });
  it("ignores unknown options", () => {
    expect(scoreAnswer(q("q2-churn"), "zzz").xp).toBe(0);
  });
});

describe("interest-based scoring (preference)", () => {
  it("awards participation XP and the mapped track points", () => {
    const r = scoreAnswer(q("q1-build"), "d");
    expect(r.xp).toBe(XP_PREFERENCE);
    expect(r.points.mobile).toBe(3);
    expect(r.interest.mobile).toBe(3);
  });
});

describe("scoreAnswers safety", () => {
  it("cannot double count: same input always gives the same score", () => {
    const a = answersFor(prefOptionFor("ai-dev"));
    expect(scoreAnswers(a, QUESTIONS)).toEqual(scoreAnswers({ ...a }, QUESTIONS));
  });
  it("ignores unknown question ids", () => {
    const a = answersFor(prefOptionFor("ai-dev"));
    expect(scoreAnswers({ ...a, "fake-question": "a" }, QUESTIONS).xp).toBe(scoreAnswers(a, QUESTIONS).xp);
  });
  it("max XP is reached by answering everything correctly", () => {
    expect(scoreAnswers(answersFor(prefOptionFor("ai-ml")), QUESTIONS).xp).toBe(maxXp(QUESTIONS));
  });
});

describe("recommendation for each of the six tracks", () => {
  for (const track of TRACK_IDS) {
    it(`recommends ${track} for answers favouring it`, () => {
      const rec = recommend(answersFor(prefOptionFor(track)), QUESTIONS);
      expect(rec.primary).toBe(track);
      expect(rec.reasons.length).toBeGreaterThan(0);
    });
    it(`recommends ${track} even when every knowledge answer is wrong`, () => {
      expect(recommend(answersFor(prefOptionFor(track), "wrong"), QUESTIONS).primary).toBe(track);
    });
  }
});

describe("ties and close results", () => {
  it("breaks exact ties deterministically by interest then catalogue order", () => {
    const base = { trackScores: Object.fromEntries(TRACK_IDS.map((t) => [t, 5])) as Record<TrackId, number> };
    const interest = Object.fromEntries(TRACK_IDS.map((t) => [t, 0])) as Record<TrackId, number>;
    expect(rankTracks({ ...base, interestScores: interest })[0]).toBe(TRACK_IDS[0]);
    expect(rankTracks({ ...base, interestScores: { ...interest, mobile: 2 } })[0]).toBe("mobile");
  });
  it("offers a secondary track when scores are within the margin", () => {
    // Mostly mobile preferences, but knowledge answers lean AI/ML: a close race.
    const a = answersFor(prefOptionFor("mobile"));
    const rec = recommend(a, QUESTIONS);
    const gap = rec.scores[rec.ranking[0]] - rec.scores[rec.ranking[1]];
    expect(rec.secondary === null).toBe(gap > CLOSE_MARGIN || rec.scores[rec.ranking[1]] === 0);
  });
  it("shows a secondary track for a constructed close result", () => {
    // AI/ML: q1 a (3) + q4 b (3) = 6. FDE: q9 c (3) + q10 c (3) = 6. A dead heat.
    const a = { ...answersFor(() => "a", "wrong"), "q1-build": "a", "q4-process": "b", "q9-satisfying": "c", "q10-style": "c" };
    const rec = recommend(a, QUESTIONS);
    expect(rec.scores["ai-ml"]).toBe(rec.scores.fde);
    expect(rec.primary).toBe("ai-ml"); // tie broken by catalogue order
    expect(rec.secondary).toBe("fde");
  });
  it("gives no secondary when the leader is far ahead", () => {
    const rec = recommend(answersFor(prefOptionFor("web-dev")), QUESTIONS);
    expect(rec.secondary === null || rec.scores[rec.secondary] >= rec.scores[rec.primary] - CLOSE_MARGIN).toBe(true);
  });
});

describe("manual selection overrides recommendation", () => {
  it("does not change the computed recommendation when another track is chosen", () => {
    const a = answersFor(prefOptionFor("ai-dev"));
    const rec = recommend(a, QUESTIONS);
    const chosen: TrackId = "mobile";
    expect(rec.primary).toBe("agentic-ai");
    // Selected track is independent state; the lead stores both.
    expect(chosen).not.toBe(rec.primary);
    expect(recommend(a, QUESTIONS).primary).toBe(rec.primary);
  });
});
