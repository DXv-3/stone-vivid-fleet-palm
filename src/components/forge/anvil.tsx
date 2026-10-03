import { Check, Copy, Download, Files } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MarkdownView } from "@/components/forge/markdown";
import { verificationState } from "@/lib/forge/parse";
import { downloadText, filenameFromPath, packMarkdown } from "@/lib/forge/vault";
import { cn } from "@/lib/utils";
import { useForge } from "@/store/forge";

export function Anvil() {
  const status = useForge((s) => s.status);
  const error = useForge((s) => s.error);
  const result = useForge((s) => s.result);
  const selectedPath = useForge((s) => s.selectedPath);
  const streaming = useForge((s) => s.streaming);
  const vault = useForge((s) => s.vault);
  const activeRunId = useForge((s) => s.activeRunId);

  const skill = result?.skills.find((s) => s.path === selectedPath) ?? result?.skills[0];
  const verify = result ? verificationState(result) : null;
  const run = vault.find((r) => r.id === activeRunId);

  function copySkill() {
    if (!skill) return;
    void navigator.clipboard.writeText(skill.content);
    toast("Skill copied");
  }

  function downloadSkill() {
    if (!skill) return;
    downloadText(filenameFromPath(skill.path), skill.content);
  }

  function downloadPack() {
    if (!run) return;
    downloadText(`${slugify(run.title)}-pack.md`, packMarkdown(run));
  }

  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-end justify-between gap-3">
        <div>
          <p className="stamp">Anvil</p>
          <h2 className="mt-1 font-display text-2xl tracking-tight">Tempered output</h2>
        </div>
        {skill ? (
          <div className="flex gap-1">
            <Button type="button" variant="ghost" size="icon" onClick={copySkill} aria-label="Copy skill">
              <Copy />
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={downloadSkill} aria-label="Download skill">
              <Download />
            </Button>
            {run && result && result.skills.length > 0 ? (
              <Button type="button" variant="ghost" size="sm" onClick={downloadPack}>
                <Files />
                Pack
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>

      {status === "error" ? (
        <div className="mt-4 shrink-0 rounded-[var(--radius-lg)] border border-danger/40 bg-danger/10 p-4">
          <p className="text-sm font-medium text-danger">Forge fault</p>
          <p className="mt-1 text-sm text-fg/80">{error}</p>
        </div>
      ) : null}

      {!result && status !== "forging" && status !== "error" ? (
        <EmptyAnvil />
      ) : (
        <div className="mt-3 flex min-h-0 flex-1 flex-col gap-3">
          {result && result.fileList.length > 0 ? (
            <div className="shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface">
              <div className="flex items-center justify-between border-b border-border px-3 py-2">
                <p className="stamp">File list</p>
                {verify ? (
                  <span className={cn("stamp", verify.match ? "text-ok" : "text-danger")}>
                    {verify.match ? "Match" : "Drift"}
                  </span>
                ) : null}
              </div>
              <ul>
                {result.fileList.map((file) => {
                  const selected = file.path === (skill?.path ?? selectedPath);
                  const produced = result.skills.some((s) => s.path === file.path);
                  return (
                    <li key={file.path}>
                      <button
                        type="button"
                        onClick={() => useForge.getState().selectPath(file.path)}
                        className={cn(
                          "flex w-full flex-col items-start gap-0.5 px-3 py-2.5 text-left transition-colors duration-150",
                          selected ? "bg-raised" : "hover:bg-raised/50",
                        )}
                      >
                        <span className="font-mono text-[0.75rem] text-primary">{file.path}</span>
                        <span className="text-sm text-muted">
                          {file.purpose}
                          {!produced && status === "done" ? (
                            <span className="ml-2 text-danger">missing</span>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : status === "forging" ? (
            <p className="stamp shimmer shrink-0">Reading the whole thread — not the last message</p>
          ) : null}

          {skill ? (
            <article className="min-h-0 flex-1 overflow-y-auto rounded-[var(--radius-lg)] border border-border bg-surface p-4 sm:p-5">
              <p className="stamp mb-3">{skill.path}</p>
              <MarkdownView source={skill.content} />
            </article>
          ) : status === "forging" ? (
            <pre className="min-h-40 flex-1 overflow-auto whitespace-pre-wrap rounded-[var(--radius-lg)] border border-border bg-surface p-4 font-mono text-[0.75rem] leading-relaxed text-muted">
              {streaming || "Heat rising…"}
            </pre>
          ) : null}

          {result?.verification ? (
            <p className="flex shrink-0 items-start gap-2 rounded-[var(--radius-md)] border border-border bg-bg px-3 py-2.5 text-sm text-muted">
              <Check className="mt-0.5 size-4 shrink-0 text-ok" />
              <span>{result.verification}</span>
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}

function EmptyAnvil() {
  return (
    <div className="mt-4 flex min-h-52 flex-1 flex-col items-start justify-center rounded-[var(--radius-xl)] border border-dashed border-border bg-surface/40 px-6 py-10">
      <AnvilMark />
      <p className="mt-5 font-display text-2xl tracking-tight">The anvil is cold</p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
        Load a sample, paste a conversation, then strike. Or open a tempered demo to inspect a finished skill.md.
      </p>
    </div>
  );
}

function AnvilMark() {
  return (
    <svg viewBox="0 0 72 48" className="h-10 w-16 text-primary" aria-hidden>
      <path
        fill="currentColor"
        d="M6 14h60l-6 8H12L6 14zm10 8h40v6H16v-6zm12 6h16v12h10v4H18v-4h10V28z"
      />
    </svg>
  );
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || "artifact-pack"
  );
}
