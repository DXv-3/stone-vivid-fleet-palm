import { STAGES } from "@/lib/forge/types";
import { cn } from "@/lib/utils";
import { useForge } from "@/store/forge";

export function StageRail() {
  const active = useForge((s) => s.activeStage);
  const status = useForge((s) => s.status);
  const notes = useForge((s) => s.result?.stageNotes);
  const activeIndex = STAGES.findIndex((s) => s.id === active);

  return (
    <ol className="flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {STAGES.map((stage, index) => {
        const done = status === "done" || (activeIndex >= 0 && index < activeIndex);
        const current = stage.id === active && status === "forging";
        const note = notes?.[stage.id];
        return (
          <li
            key={stage.id}
            title={note || stage.full}
            className={cn(
              "flex min-w-[5.5rem] flex-1 items-center gap-2 rounded-[var(--radius-sm)] border px-2.5 py-2",
              current
                ? "border-primary/40 bg-raised"
                : done
                  ? "border-border bg-surface"
                  : "border-border/70 bg-bg",
            )}
          >
            <span
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                current && "bg-primary animate-[maf-heat_1.2s_ease-in-out_infinite]",
                done && !current && "bg-ok",
                !done && !current && "bg-faint",
              )}
            />
            <span
              className={cn(
                "text-xs font-medium sm:text-sm",
                current || done ? "text-fg" : "text-muted",
                current && "shimmer",
              )}
            >
              {stage.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
