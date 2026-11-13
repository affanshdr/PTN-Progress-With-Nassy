"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CLASS_OPTIONS, COIN_PRICING } from "@/lib/progress-utils";
import { getSupabaseClient } from "@/lib/supabase/client";
import { getErrorMessage } from "@/lib/supabase/errors";
import type { Profile } from "@/lib/supabase/types";
import { useNassy } from "@/components/frontend/NassyProvider";

export function AuthModal() {
  const router = useRouter();
  const {
    authModalMode,
    closeAuthModal,
    toggleAuthModalMode,
    setCurrentUser,
    refreshData,
    showToast,
  } = useNassy();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [className, setClassName] = useState<string>(CLASS_OPTIONS[0]);
  const [ptn, setPtn] = useState("");
  const [major, setMajor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!authModalMode) return null;

  const isRegister = authModalMode === "register";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = getSupabaseClient();
      const normalizedEmail = email.trim().toLowerCase();

      if (isRegister) {
        const cleanName = name.trim() || "Pengguna";
        const cleanPtn = ptn.trim() || "Belum diatur";
        const cleanMajor = major.trim() || "Belum diatur";

        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email: normalizedEmail,
            password,
            options: {
              data: {
                name: cleanName,
                class_name: className,
                ptn: cleanPtn,
                major: cleanMajor,
              },
            },
          },
        );
        if (authError) throw authError;

        if (authData.user && authData.session) {
          const profilePayload = {
            id: authData.user.id,
            name: cleanName,
            email: normalizedEmail,
            class_name: className,
            ptn: cleanPtn,
            major: cleanMajor,
          };

          const { data: insertedProfile, error: profileError } = await supabase
            .from("profiles")
            .upsert([profilePayload], { onConflict: "id" })
            .select("*")
            .single();

          if (profileError) throw profileError;

          setCurrentUser(
            (insertedProfile as Profile | null) ?? {
              ...profilePayload,
              coin_balance: COIN_PRICING.WELCOME_BONUS,
            },
          );
          closeAuthModal();
          await refreshData();
          showToast(
            `Akun berhasil dibuat! Kamu mendapat ${COIN_PRICING.WELCOME_BONUS} Coin awal 🪙`,
          );
          router.push("/dashboard");
        } else if (authData.user) {
          showToast(
            "Akun dibuat! Cek email untuk konfirmasi lalu masuk untuk klaim 100 Coin.",
          );
          toggleAuthModalMode();
        }
      } else {
        const { data: authData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password,
          });
        if (signInError) throw signInError;

        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authData.user.id)
          .maybeSingle();

        let finalProfile = existingProfile as Profile | null;

        if (!finalProfile) {
          const meta = (authData.user.user_metadata ?? {}) as Record<
            string,
            string | undefined
          >;
          const fallbackPayload = {
            id: authData.user.id,
            name: meta.name || "Pengguna",
            email: normalizedEmail,
            class_name: meta.class_name || CLASS_OPTIONS[2],
            ptn: meta.ptn || "Belum diatur",
            major: meta.major || "Belum diatur",
          };
          const { data: createdProfile, error: createError } = await supabase
            .from("profiles")
            .upsert([fallbackPayload], { onConflict: "id" })
            .select("*")
            .single();
          if (createError) throw createError;
          finalProfile = createdProfile as Profile;
        }

        setCurrentUser(finalProfile);
        closeAuthModal();
        await refreshData();
        showToast("Berhasil masuk.");
        router.push("/dashboard");
      }
    } catch (error) {
      showToast(getErrorMessage(error, "Terjadi kesalahan."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 grid place-items-center bg-[rgba(10,20,30,0.5)] p-5"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeAuthModal();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-[500px] overflow-auto rounded-[20px] bg-white p-7 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="auth-modal-title"
              className="m-0 text-2xl font-bold text-[var(--ink)]"
            >
              {isRegister ? "Buat Akun" : "Masuk"}
            </h2>
            <p className="mt-1.5 text-sm text-[var(--muted)]">
              {isRegister
                ? "Mulai belajar 7 subtes, Tryout Mingguan, dan Live Class."
                : "Masuk ke ruang belajar Nassy."}
            </p>
          </div>
          <button
            type="button"
            aria-label="Tutup dialog"
            onClick={closeAuthModal}
            className="cursor-pointer border-0 bg-transparent text-2xl leading-none text-[var(--muted)] hover:text-[var(--ink)]"
          >
            ×
          </button>
        </div>

        {isRegister ? (
          <div className="mt-4 rounded-xl border border-[#cde1ff] bg-[var(--blue-soft)] px-3.5 py-2.5 text-xs font-bold text-[var(--navy)]">
            🪙 Bonus Akun Baru: Otomatis mendapat{" "}
            {COIN_PRICING.WELCOME_BONUS} Coin untuk ikut Tryout & Live Class!
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-5 grid gap-3.5">
          {isRegister ? (
            <div>
              <label
                htmlFor="reg-name"
                className="mb-1.5 block text-[13px] font-bold"
              >
                Nama Lengkap
              </label>
              <input
                id="reg-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Nama kamu"
                className="w-full rounded-[10px] border border-[#dfe4ea] bg-white px-3 py-2.5 outline-none focus:border-[var(--blue)] focus:ring-3 focus:ring-[var(--blue-soft)]"
              />
            </div>
          ) : null}

          <div>
            <label
              htmlFor="auth-email"
              className="mb-1.5 block text-[13px] font-bold"
            >
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nama@email.com"
              className="w-full rounded-[10px] border border-[#dfe4ea] bg-white px-3 py-2.5 outline-none focus:border-[var(--blue)] focus:ring-3 focus:ring-[var(--blue-soft)]"
            />
          </div>

          <div>
            <label
              htmlFor="auth-password"
              className="mb-1.5 block text-[13px] font-bold"
            >
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full rounded-[10px] border border-[#dfe4ea] bg-white px-3 py-2.5 outline-none focus:border-[var(--blue)] focus:ring-3 focus:ring-[var(--blue-soft)]"
            />
          </div>

          {isRegister ? (
            <>
              <div>
                <label
                  htmlFor="reg-class"
                  className="mb-1.5 block text-[13px] font-bold"
                >
                  Kelas
                </label>
                <select
                  id="reg-class"
                  value={className}
                  onChange={(event) => setClassName(event.target.value)}
                  className="w-full rounded-[10px] border border-[#dfe4ea] bg-white px-3 py-2.5 outline-none focus:border-[var(--blue)] focus:ring-3 focus:ring-[var(--blue-soft)]"
                >
                  {CLASS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="reg-ptn"
                  className="mb-1.5 block text-[13px] font-bold"
                >
                  PTN Tujuan
                </label>
                <input
                  id="reg-ptn"
                  value={ptn}
                  onChange={(event) => setPtn(event.target.value)}
                  placeholder="Contoh: Universitas Indonesia"
                  className="w-full rounded-[10px] border border-[#dfe4ea] bg-white px-3 py-2.5 outline-none focus:border-[var(--blue)] focus:ring-3 focus:ring-[var(--blue-soft)]"
                />
              </div>

              <div>
                <label
                  htmlFor="reg-major"
                  className="mb-1.5 block text-[13px] font-bold"
                >
                  Program Studi Tujuan
                </label>
                <input
                  id="reg-major"
                  value={major}
                  onChange={(event) => setMajor(event.target.value)}
                  placeholder="Contoh: Teknik Informatika"
                  className="w-full rounded-[10px] border border-[#dfe4ea] bg-white px-3 py-2.5 outline-none focus:border-[var(--blue)] focus:ring-3 focus:ring-[var(--blue-soft)]"
                />
              </div>
            </>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 cursor-pointer rounded-[10px] bg-[var(--navy)] px-4 py-3 font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Memproses..."
              : isRegister
                ? "Daftar & Klaim 100 Coin"
                : "Masuk"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-[var(--muted)]">
          {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
          <button
            type="button"
            onClick={toggleAuthModalMode}
            className="cursor-pointer border-0 bg-transparent font-bold text-[var(--blue)]"
          >
            {isRegister ? "Masuk" : "Daftar"}
          </button>
        </p>
      </div>
    </div>
  );
}
