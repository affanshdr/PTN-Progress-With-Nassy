export const SOAL_BUCKET = "SOAL ALTERNATIFA";

export type SnbtSubtestCode = "PK" | "PM" | "PU" | "PPU" | "LBI" | "LBE" | "PBM";
export type OptionLetter = "A" | "B" | "C" | "D" | "E";

export interface Profile {
  id: string;
  name: string;
  email: string;
  class_name: string;
  ptn: string;
  major: string;
  coin_balance?: number;
  liveclass_pass_until?: string | null;
  created_at?: string;
}

export interface ProgressEntry {
  id?: string | number;
  user_id: string;
  date: string;
  subtest: string;
  progress: string;
  target: string;
  duration: number;
  proof?: string | null;
  created_at?: string;
}

export interface StorageEntry {
  id: string | null;
  name: string;
  isFolder: boolean;
  publicUrl?: string;
  updatedAt?: string | null;
  sizeBytes?: number | null;
}

export interface PracticeQuestion {
  id: string;
  subtest: SnbtSubtestCode;
  topic: string;
  difficulty: "Mudah" | "Sedang" | "Sulit";
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  correct_option: OptionLetter;
  explanation: string;
  sort_order: number;
}

export interface PracticeSubmission {
  id: string;
  user_id: string;
  question_id: string;
  selected_option: OptionLetter;
  is_correct: boolean;
  updated_at: string;
}

export interface TryoutCatalogItem {
  id: string;
  slug: string;
  week_number: number;
  title: string;
  description: string;
  coin_cost: number;
  duration_minutes: number;
  starts_at: string;
  ends_at: string;
  question_count: number;
  participant_count: number;
  is_registered: boolean;
  has_attempted: boolean;
  user_score: number | null;
  user_correct_count: number | null;
}

export interface TryoutQuestionClient {
  id: string;
  subtest: SnbtSubtestCode;
  question_order: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
}

export interface TryoutReviewItem extends TryoutQuestionClient {
  correct_option: OptionLetter;
  explanation: string;
  selected_option: OptionLetter | null;
}

export interface SubtestBreakdownItem {
  correct: number;
  total: number;
}

export interface TryoutAttempt {
  id: string;
  tryout_id: string;
  user_id: string;
  answers: Record<string, OptionLetter>;
  correct_count: number;
  total_questions: number;
  score: number;
  subtest_breakdown: Record<string, SubtestBreakdownItem>;
  duration_seconds: number;
  submitted_at: string;
}

export interface TryoutLeaderboardEntry {
  user_id: string;
  name: string;
  ptn: string;
  class_name: string;
  score: number;
  best_score: number;
  correct_count: number;
  total_questions: number;
  duration_seconds: number;
  attempts_count: number;
  submitted_at: string;
}

export interface LiveClassSession {
  id: string;
  slug: string;
  subtest: SnbtSubtestCode | "Umum";
  title: string;
  mentor_name: string;
  description: string;
  scheduled_at: string;
  duration_minutes: number;
  status: "live" | "upcoming" | "recorded";
  meeting_url: string | null;
  recording_url: string | null;
  material_url: string | null;
  has_active_pass: boolean;
}

export type CoinTransactionType =
  | "welcome_bonus"
  | "topup"
  | "tryout_unlock"
  | "liveclass_pass"
  | "study_reward";

export interface CoinTransaction {
  id: string;
  user_id: string;
  amount: number;
  type: CoinTransactionType;
  title: string;
  reference_id: string | null;
  balance_after: number;
  created_at: string;
}

export type PaymentMethodCode =
  | "QRIS"
  | "VA_BCA"
  | "VA_BRI"
  | "EWALLET_GOPAY"
  | "EWALLET_OVO";

export interface CoinTopupOrder {
  id: string;
  order_code: string;
  user_id: string;
  package_id: string;
  package_name: string;
  coins: number;
  price_idr: number;
  payment_method: PaymentMethodCode;
  status: "pending" | "paid" | "cancelled" | "expired";
  snap_token: string;
  paid_at: string | null;
  created_at: string;
}

export interface CoinPackageOption {
  id: "starter" | "pejuang" | "intensif" | "juara";
  name: string;
  coins: number;
  priceIdr: number;
  badge?: string;
  description: string;
}
