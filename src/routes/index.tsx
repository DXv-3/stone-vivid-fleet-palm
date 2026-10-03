import { createFileRoute } from "@tanstack/react-router";
import { Group, Panel, Separator } from "react-resizable-panels";
import { Anvil } from "@/components/forge/anvil";
import { Crucible } from "@/components/forge/crucible";
import { Shell } from "@/components/forge/shell";
import { StageRail } from "@/components/forge/stage-rail";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <Shell>
      <main className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-[1600px] flex-col px-4 pb-5 pt-5 sm:px-6">
        <Hero />
        <div className="mt-5 hidden min-h-0 flex-1 lg:flex">
          <Group orientation="horizontal" className="h-full w-full">
            <Panel id="crucible" defaultSize={44} minSize={30} className="pr-3">
              <Crucible />
            </Panel>
            <Separator className="mx-1 w-2 rounded-full bg-border hover:bg-primary/50" />
            <Panel id="anvil" defaultSize={56} minSize={36} className="pl-3">
              <Anvil />
            </Panel>
          </Group>
        </div>
        <div className="mt-6 flex flex-col gap-10 lg:hidden">
          <Crucible />
          <Anvil />
        </div>
        <div className="mt-5 shrink-0">
          <StageRail />
        </div>
      </main>
    </Shell>
  );
}

function Hero() {
  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
      <h1 className="font-display text-4xl leading-none tracking-[-0.03em] sm:text-5xl">
        Artifact <em className="italic font-normal text-primary">Forge</em>
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted sm:text-right">
        Reread the whole conversation at two altitudes. Keep the gold verbatim.
        Ship a skill a future agent can run — not a summary of the last message.
      </p>
    </header>
  );
}
