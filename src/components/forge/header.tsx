import { Link, useRouterState } from "@tanstack/react-router";
import { Hammer } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForge } from "@/store/forge";

const NAV = [
  { to: "/", label: "Floor" },
  { to: "/vault", label: "Vault" },
  { to: "/doctrine", label: "Doctrine" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const status = useForge((s) => s.status);
  const aiAvailable = useForge((s) => s.aiAvailable);

  const heat =
    status === "forging"
      ? "Striking"
      : status === "done"
        ? "Tempered"
        : status === "error"
          ? "Fault"
          : "Cold";

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-surface">
            <Hammer className="size-3.5 text-primary" strokeWidth={1.75} />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-[0.95rem] leading-none tracking-tight">
              Mass Artifact Forge
            </span>
            <span className="mt-0.5 hidden stamp sm:block">Conversation to skill</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-11 items-center px-3 text-sm transition-colors duration-150",
                  active ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          {aiAvailable === false ? (
            <span className="stamp text-danger">AI offline</span>
          ) : null}
          <span className="flex items-center gap-2">
            <span
              className={cn(
                "size-1.5 rounded-full",
                status === "forging" && "bg-primary animate-[maf-heat_1.2s_ease-in-out_infinite]",
                status === "done" && "bg-ok",
                status === "error" && "bg-danger",
                status === "idle" && "bg-faint",
              )}
            />
            <span className="stamp">{heat}</span>
          </span>
        </div>
      </div>
    </header>
  );
}
