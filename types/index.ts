export const TRACK_IDS = [
  "ai-ml",
  "web-dev",
  "cloud-engineering",
  "devops",
  "cyber-security",
  "fde",
  "mobile",
  "ai-dev",
] as const;

export type TrackId = (typeof TRACK_IDS)[number];

export interface Track {
  id: TrackId;
  name: string;
  shortName: string;
  emoji: string;
  tagline: string;
  description: string;
  careerPath: string;
  skills: string[];
  project: string;
}

export type QuestionKind = "knowledge" | "preference";

export interface AnswerOption {
  id: string;
  label: string;
  /** Track-interest points awarded when this option is picked. */
  scores?: Partial<Record<TrackId, number>>;
}

export interface Question {
  id: string;
  kind: QuestionKind;
  /** Optional emoji shown beside the category tag. */
  emoji?: string;
  /** Short label such as "Scenario" or "Debugging". */
  category: string;
  prompt: string;
  /** Optional code/log snippet shown under the prompt. */
  snippet?: string;
  options: AnswerOption[];
  /** Knowledge questions: the correct option id. */
  correctOptionId?: string;
  /** Knowledge questions: tracks that gain affinity points (and XP) on a correct answer. */
  tracksOnCorrect?: Partial<Record<TrackId, number>>;
  /** Shown after answering to teach something. */
  explanation: string;
}

/** questionId -> optionId */
export type Answers = Record<string, string>;

export type TrackScores = Record<TrackId, number>;

export interface Recommendation {
  primary: TrackId;
  secondary: TrackId | null;
  scores: TrackScores;
  ranking: TrackId[];
  /** Question ids that pushed the primary track the most. */
  reasons: string[];
}

export interface ScoreResult {
  /** Combined knowledge + interest evidence per track. */
  trackScores: TrackScores;
  /** Interest-only evidence (preference questions); used as a tie-breaker. */
  interestScores: TrackScores;
  xp: number;
  maxXp: number;
  correct: number;
  knowledgeTotal: number;
}

export const CURRENT_STATUSES = [
  "college_student",
  "graduate",
  "working_professional",
  "other",
] as const;
export type CurrentStatus = (typeof CURRENT_STATUSES)[number];

export const CONSULTATION_FORMATS = ["phone_call", "office_visit"] as const;
export type ConsultationFormat = (typeof CONSULTATION_FORMATS)[number];
