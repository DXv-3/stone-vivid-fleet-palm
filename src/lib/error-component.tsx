import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "An unexpected error occurred. Reload and strike again.";

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg">
      <TriangleAlert className="size-8 text-danger" strokeWidth={1.75} />
      <h1 className="font-display text-2xl tracking-tight">Something broke on the floor</h1>
      <p className="max-w-md text-sm break-words text-muted">{message}</p>
    </main>
  );
}
