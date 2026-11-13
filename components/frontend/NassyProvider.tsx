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
import { isMissingSchemaError } from "@/lib/supabase/errors";
import type {
  CoinTopupOrder,
  CoinTransaction,
  Profile,
  ProgressEntry,
} from "@/lib/supabase/types";
import { AuthModal } from "@/components/frontend/AuthModal";
import { ProgressModal } from "@/components/frontend/ProgressModal";
import { TopupGatewayModal } from "@/components/frontend/TopupGatewayModal";
import { getTodayIsoDate } from "@/lib/progress-utils";

export type AuthModalMode = "login" | "register" | null;

interface WalletPatch {
  coin_balance?: number;
  liveclass_pass_until?: string | null;
}

interface NassyContextValue {
  currentUser: Profile | null;
  coinBalance: number;
  allUsers: Profile[];
  allProgress: ProgressEntry[];
  coinTransactions: CoinTransaction[];
  topupOrders: CoinTopupOrder[];
  schemaNeedsMigration: boolean;
  isInitializing: boolean;
  isLoadingData: boolean;
  authModalMode: AuthModalMode;
  isProgressModalOpen: boolean;
  isTopupModalOpen: boolean;
  setCurrentUser: (user: Profile | null) => void;
  updateWalletLocally: (patch: WalletPatch) => void;
  markSchemaNeedsMigration: () => void;
  openAuthModal: (mode?: Exclude<AuthModalMode, null>) => void;
  closeAuthModal: () => void;
  toggleAuthModalMode: () => void;
  openProgressModal: () => void;
  closeProgressModal: () => void;
  openTopupModal: () => void;
  closeTopupModal: () => void;
  refreshData: () => Promise<void>;
  refreshWallet: () => Promise<void>;
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
  const [coinTransactions, setCoinTransactions] = useState<CoinTransaction[]>(
    [],
  );
  const [topupOrders, setTopupOrders] = useState<CoinTopupOrder[]>([]);
  const [schemaNeedsMigration, setSchemaNeedsMigration] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>(null);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);
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
    }, 3000);
  }, []);

  const markSchemaNeedsMigration = useCallback(() => {
    setSchemaNeedsMigration(true);
  }, []);

  const updateWalletLocally = useCallback((patch: WalletPatch) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        ...patch,
      };
    });
  }, []);

  const fetchWalletForUser = useCallback(async (userId: string) => {
    if (!isSupabaseBrowserConfigured()) return;
    const supabase = getSupabaseClient();

    const [profileRes, txRes, ordersRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).single(),
      supabase
        .from("coin_transactions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(30),
      supabase
        .from("coin_topup_orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(15),
    ]);

    if (profileRes.data) {
      const profile = profileRes.data as Profile;
      setCurrentUser(profile);
      if (typeof profile.coin_balance !== "number") {
        setSchemaNeedsMigration(true);
      }
    }

    if (txRes.error) {
      if (isMissingSchemaError(txRes.error)) {
        setSchemaNeedsMigration(true);
      }
    } else {
      setCoinTransactions((txRes.data as CoinTransaction[]) ?? []);
    }

    if (ordersRes.error) {
      if (isMissingSchemaError(ordersRes.error)) {
        setSchemaNeedsMigration(true);
      }
    } else {
      setTopupOrders((ordersRes.data as CoinTopupOrder[]) ?? []);
    }
  }, []);

  const refreshWallet = useCallback(async () => {
    if (!isSupabaseBrowserConfigured()) return;
    const supabase = getSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return;
    await fetchWalletForUser(session.user.id);
  }, [fetchWalletForUser]);

  const refreshData = useCallback(async () => {
    if (!isSupabaseBrowserConfigured()) return;
    setIsLoadingData(true);
    try {
      const supabase = getSupabaseClient();
      const [
        { data: users },
        { data: progress },
        {
          data: { session },
        },
      ] = await Promise.all([
        supabase.from("profiles").select("*"),
        supabase
          .from("progress")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase.auth.getSession(),
      ]);

      setAllUsers((users as Profile[]) ?? []);
      setAllProgress((progress as ProgressEntry[]) ?? []);

      if (session?.user) {
        await fetchWalletForUser(session.user.id);
      }
    } finally {
      setIsLoadingData(false);
    }
  }, [fetchWalletForUser]);

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
          await fetchWalletForUser(session.user.id);
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
  }, [fetchWalletForUser, refreshData]);

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

  const openTopupModal = useCallback(() => {
    setIsTopupModalOpen(true);
  }, []);

  const closeTopupModal = useCallback(() => {
    setIsTopupModalOpen(false);
  }, []);

  const logout = useCallback(async () => {
    if (isSupabaseBrowserConfigured()) {
      const supabase = getSupabaseClient();
      await supabase.auth.signOut();
    }
    setCurrentUser(null);
    setAllUsers([]);
    setAllProgress([]);
    setCoinTransactions([]);
    setTopupOrders([]);
    router.push("/");
  }, [router]);

  const coinBalance = currentUser?.coin_balance ?? 0;

  return (
    <NassyContext.Provider
      value={{
        currentUser,
        coinBalance,
        allUsers,
        allProgress,
        coinTransactions,
        topupOrders,
        schemaNeedsMigration,
        isInitializing,
        isLoadingData,
        authModalMode,
        isProgressModalOpen,
        isTopupModalOpen,
        setCurrentUser,
        updateWalletLocally,
        markSchemaNeedsMigration,
        openAuthModal,
        closeAuthModal,
        toggleAuthModalMode,
        openProgressModal,
        closeProgressModal,
        openTopupModal,
        closeTopupModal,
        refreshData,
        refreshWallet,
        logout,
        showToast,
      }}
    >
      {children}
      {authModalMode ? <AuthModal /> : null}
      {isProgressModalOpen ? (
        <ProgressModal initialDate={progressInitialDate} />
      ) : null}
      {isTopupModalOpen ? (
        <TopupGatewayModal
          isOpen={isTopupModalOpen}
          onClose={closeTopupModal}
        />
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
