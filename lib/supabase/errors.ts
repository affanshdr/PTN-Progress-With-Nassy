export function getErrorMessage(
  error: unknown,
  fallback = "Terjadi kesalahan.",
): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }
  return fallback;
}

export function isMissingSchemaError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const errObj = error as { code?: string; message?: string };
  const code = errObj.code ?? "";
  const msg = (errObj.message ?? "").toLowerCase();

  return (
    code === "PGRST205" ||
    code === "PGRST202" ||
    code === "42P01" ||
    code === "42703" ||
    code === "42883" ||
    msg.includes("could not find the table") ||
    msg.includes("could not find the function") ||
    msg.includes("does not exist")
  );
}
