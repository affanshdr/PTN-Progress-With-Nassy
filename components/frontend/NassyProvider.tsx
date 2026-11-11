"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  getSupabaseClient,
  isSupabaseBrowserConfigured,
} from "@/lib/supabase/client";
import type { Profile, ProgressEntry } from "@/lib/supabase/types";
import { AuthModal } from "@/components/frontend/AuthModal";
import { ProgressModal } from "@/components/frontend/ProgressModal";
import { getTodayIsoDate } from "@/lib/progress-utils";

export type AuthModalMode = "login" | "register" | null;

interface NassyContextValue {
  currentUser: Profile | null;
  allUsers: Profile[];
  allProgress: ProgressEntry[];
  isInitializing: boolean;
  isLoadingData: boolean;
  authModalMode: AuthModalMode;
  isProgressModalOpen: boolean;
  setCurrentUser: (user: Profile | null) => void;
  openAuthModal: (mode?: Exclude<AuthModalMode, null>) => void;
  closeAuthModal: () => void;
  toggleAuthModalMode: () => void;
  openProgressModal: () => void;
  closeProgressModal: () => void;
  refreshData: () => Promise<void>;
  logout: () => Promise<void>;
  showToast: (message: string) => void;
}

const NassyContext = createContext<NassyContextValue | null>(null);

export function useNassy(): NassyContextValue {
  const ctx = useContext(NassyContext);
  if (!ctx) {
    throw new Error("useNassy harus digunakan di dalam NassyProvider.");
  }
  return ctx;
}

export function NassyProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [allUsers, setAllUsers] = useState<Profile[]>([]);
  const [allProgress, setAllProgress] = useState<ProgressEntry[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>(null);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [progressInitialDate, setProgressInitialDate] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  }, []);

  const refreshData = useCallback(async () => {
    if (!isSupabaseBrowserConfigured()) return;
    setIsLoadingData(true);
    try {
      const supabase = getSupabaseClient();
      const [{ data: users }, { data: progress }] = await Promise.all([
        supabase.from("profiles").select("*"),
        supabase
          .from("progress")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      setAllUsers((users as Profile[]) ?? []);
      setAllProgress((progress as ProgressEntry[]) ?? []);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  const fetchCurrentUserProfile = useCallback(async (userId: string) => {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    setCurrentUser((data as Profile | null) ?? null);
    return (data as Profile | null) ?? null;
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapSession() {
      if (!isSupabaseBrowserConfigured()) {
        if (isMounted) setIsInitializing(false);
        return;
      }

      try {
        const supabase = getSupabaseClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!isMounted) return;

        if (session?.user) {
          await fetchCurrentUserProfile(session.user.id);
          await refreshData();
        }
      } catch {
        // Ignore transient session bootstrap failures and allow user to retry login.
      } finally {
        if (isMounted) setIsInitializing(false);
      }
    }

    void bootstrapSession();

    return () => {
      isMounted = false;
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, [fetchCurrentUserProfile, refreshData]);

  const openAuthModal = useCallback(
    (mode: Exclude<AuthModalMode, null> = "login") => {
      setAuthModalMode(mode);
    },
    [],
  );

  const closeAuthModal = useCallback(() => {
    setAuthModalMode(null);
  }, []);

  const toggleAuthModalMode = useCallback(() => {
    setAuthModalMode((prev) => (prev === "login" ? "register" : "login"));
  }, []);

  const openProgressModal = useCallback(() => {
    setProgressInitialDate(getTodayIsoDate());
    setIsProgressModalOpen(true);
  }, []);

  const closeProgressModal = useCallback(() => {
    setIsProgressModalOpen(false);
  }, []);

  const logout = useCallback(async () => {
    if (isSupabaseBrowserConfigured()) {
      const supabase = getSupabaseClient();
      await supabase.auth.signOut();
    }
    setCurrentUser(null);
    setAllUsers([]);
    setAllProgress([]);
    router.push("/");
  }, [router]);

  return (
    <NassyContext.Provider
      value={{
        currentUser,
        allUsers,
        allProgress,
        isInitializing,
        isLoadingData,
        authModalMode,
        isProgressModalOpen,
        setCurrentUser,
        openAuthModal,
        closeAuthModal,
        toggleAuthModalMode,
        openProgressModal,
        closeProgressModal,
        refreshData,
        logout,
        showToast,
      }}
    >
      {children}
      {authModalMode ? <AuthModal /> : null}
      {isProgressModalOpen ? (
        <ProgressModal initialDate={progressInitialDate} />
      ) : null}

      {toastMessage ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 bottom-5 z-50 rounded-[10px] bg-[var(--navy)] px-4 py-3 text-sm font-medium text-white shadow-[0_12px_35px_rgba(20,35,55,0.18)]"
        >
          {toastMessage}
        </div>
      ) : null}
    </NassyContext.Provider>
  );
}
