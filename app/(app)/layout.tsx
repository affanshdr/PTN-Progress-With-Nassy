import type { ReactNode } from "react";
import { AppShell } from "@/components/frontend/AppShell";

export default function AppWorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
