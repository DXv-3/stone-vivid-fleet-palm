import { useRef } from "react";
import { Hammer, RotateCcw, Square, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { runForge } from "@/lib/forge/client";
import { SAMPLES } from "@/lib/forge/samples";
import { cn } from "@/lib/utils";
import { useForge } from "@/store/forge";

const MIN = 200;
const MAX = 80_000;

export function Crucible() {
  const fileRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const transcript = useForge((s) => s.transcript);
  const hint = useForge((s) => s.hint);
  const status = useForge((s) => s.status);
  const aiAvailable = useForge((s) => s.aiAvailable);
  const result = useForge((s) => s.result);

  const forging = status === "forging";
  const count = transcript.trim().length;
  const over = count > MAX;
  const under = count > 0 && count < MIN;

  async function onForge(mode: "forge" | "deepen") {
    if (forging) return;
    if (over || count < MIN) {
      toast(count < MIN ? "Need at least 200 characters of conversation." : "Transcript is over the cap.");
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      await runForge({
        transcript,
        hint,
        mode,
        previous: mode === "deepen" ? result?.raw || undefined : undefined,
        signal: controller.signal,
      });
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
    }
  }

  function onFile(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      useForge.getState().setTranscript(text.slice(0, MAX));
    };
    reader.readAsText(file);
  }

  return (
    <section className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex shrink-0 items-end justify-between gap-3">
        <div>
          <p className="stamp">Crucible</p>
          <h2 className="mt-1 font-display text-2xl tracking-tight">Paste the whole thread</h2>
        </div>
        <span className={cn("stamp tabular-nums", over && "text-danger", under && "text-danger")}>
          {count.toLocaleString()} / {MAX.toLocaleString()}
        </span>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        {SAMPLES.map((sample) => (
          <button
            key={sample.id}
            type="button"
            onClick={() => useForge.getState().loadSample(sample.id)}
            className="h-11 rounded-full border border-border bg-surface px-3.5 text-sm text-muted transition-colors duration-150 hover:text-fg"
          >
            {sample.title}
          </button>
        ))}
        <button
          type="button"
          onClick={() => useForge.getState().loadDemo()}
          className="h-11 rounded-full border border-border bg-surface px-3.5 text-sm text-muted transition-colors duration-150 hover:text-fg"
        >
          Load tempered demo
        </button>
      </div>

      <div className="min-h-0 flex-1">
        <Textarea
          value={transcript}
          onChange={(e) => useForge.getState().setTranscript(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              void onForge("forge");
            }
          }}
          placeholder={"USER: …\nASSISTANT: …\n\nDrop the entire conversation. The last message is usually a costume."}
          className="h-full min-h-44 font-mono text-[0.8125rem] leading-relaxed"
          spellCheck={false}
        />
      </div>


      <label className="block shrink-0">
        <span className="stamp">Optional signal — what they kept optimizing for</span>
        <input
          value={hint}
          onChange={(e) => useForge.getState().setHint(e.target.value)}
          maxLength={2000}
          placeholder="Reusable depth. Verbatim templates. Not the last ask."
          className="mt-2 h-11 w-full rounded-[var(--radius-md)] border border-border bg-bg px-4 text-sm text-fg placeholder:text-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        />
      </label>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Button
          type="button"
          size="lg"
          disabled={forging || aiAvailable === false}
          onClick={() => void onForge("forge")}
          className="min-w-36"
        >
          <Hammer />
          {forging ? "Striking…" : "Forge"}
        </Button>
        {result && !forging ? (
          <Button
            type="button"
            variant="outline"
            disabled={aiAvailable === false}
            onClick={() => void onForge("deepen")}
          >
            <RotateCcw />
            Deepen
          </Button>
        ) : null}
        {forging ? (
          <Button type="button" variant="ghost" onClick={() => abortRef.current?.abort()}>
            <Square />
            Halt
          </Button>
        ) : null}
        <Button type="button" variant="ghost" onClick={() => fileRef.current?.click()}>
          <Upload />
          Import
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept=".txt,.md,.json"
          className="hidden"
          onChange={(e) => {
            onFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        {aiAvailable === false ? (
          <p className="text-sm text-muted">
            Live forge is unavailable. Load the tempered demo to see a finished skill.
          </p>
        ) : (
          <p className="text-sm text-muted">⌘/Ctrl + Enter to strike</p>
        )}
      </div>
    </section>
  );
}
