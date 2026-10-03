import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Archive, Trash2 } from "lucide-react";
import { Shell } from "@/components/forge/shell";
import { Button } from "@/components/ui/button";
import { useForge } from "@/store/forge";

export const Route = createFileRoute("/vault")({ component: VaultPage });

function VaultPage() {
  const vault = useForge((s) => s.vault);
  const navigate = useNavigate();

  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="stamp">Vault</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Tempered skills</h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
          Forgings stay on this device. Open one to return it to the anvil.
        </p>

        {vault.length === 0 ? (
          <div className="mt-12 rounded-[var(--radius-xl)] border border-dashed border-border px-6 py-16 text-center">
            <Archive className="mx-auto size-8 text-muted" strokeWidth={1.5} />
            <p className="mt-4 font-display text-xl">Empty vault</p>
            <p className="mt-2 text-sm text-muted">
              Strike a conversation on the floor, or load the tempered demo.
            </p>
            <Button
              className="mt-6"
              onClick={() => {
                useForge.getState().loadDemo();
                void navigate({ to: "/" });
              }}
            >
              Load demo
            </Button>
          </div>
        ) : (
          <ul className="mt-10 space-y-3">
            {vault.map((run) => (
              <li
                key={run.id}
                className="rounded-[var(--radius-lg)] border border-border bg-surface p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <button
                    type="button"
                    className="min-w-0 text-left"
                    onClick={() => {
                      useForge.getState().loadRun(run.id);
                      void navigate({ to: "/" });
                    }}
                  >
                    <p className="font-display text-xl tracking-tight">{run.title}</p>
                    <p className="mt-1 stamp">
                      {new Date(run.createdAt).toLocaleString()} · {run.result.skills.length} file
                      {run.result.skills.length === 1 ? "" : "s"}
                    </p>
                    <p className="mt-3 line-clamp-2 text-sm text-muted">{run.sourcePreview}</p>
                  </button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Delete forging"
                    onClick={() => useForge.getState().deleteRun(run.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </Shell>
  );
}
