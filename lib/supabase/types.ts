export const SOAL_BUCKET = "SOAL ALTERNATIFA";

export interface Profile {
  id: string;
  name: string;
  email: string;
  class_name: string;
  ptn: string;
  major: string;
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
