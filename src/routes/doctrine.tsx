import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/forge/shell";

export const Route = createFileRoute("/doctrine")({ component: DoctrinePage });

function DoctrinePage() {
  return (
    <Shell>
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <p className="stamp">Doctrine</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
          Two altitudes. One operating manual.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted">
          Mass Artifact Forge rereads an entire conversation and packages the
          highest-leverage reusable capability — not the last request, not a
          summary. A future agent should be able to run the skill without the thread.
        </p>

        <section className="mt-12 space-y-8">
          <Block n="01" title="Street-level">
            Capture concrete prompts, templates, examples, decisions, wording,
            constraints, and artifacts. Preserve reusable gold verbatim. “Similar”
            is not preservation.
          </Block>
          <Block n="02" title="High-level">
            Ask what the conversation was really about. The last message is often a
            costume — a prettier PDF, a tooltip, a “just ship it.” The product is
            the capability underneath.
          </Block>
          <Block n="03" title="Selection">
            List obvious and non-obvious candidate skills. Choose the most
            reusable, highest-leverage one faithful to the full arc. If two strong
            skills would corrupt each other, ship both or a parent with sub-skills.
          </Block>
          <Block n="04" title="Implicit taste">
            Watch what they punish: fluff, recency bias, lost templates, unverified
            output, stubs. Turn those punishments into hard rules inside the skill.
          </Block>
          <Block n="05" title="Execution contract">
            File list table first (path | purpose). Then every listed skill.md at
            full production depth — zero stubs. Then one verification line that the
            files match the list. A weak first pass is not paraphrased. It is deepened.
          </Block>
        </section>

        <section className="mt-14 rounded-[var(--radius-xl)] border border-border bg-surface p-6">
          <p className="stamp">Anti-patterns</p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
            <li>Summarizing the chat and calling it a skill</li>
            <li>Packaging the last request</li>
            <li>Cleaning up the user’s exact prompt</li>
            <li>One mushy mega-doc covering five jobs</li>
            <li>TODOs, stubs, “add examples later”</li>
            <li>Skipping verification</li>
          </ul>
        </section>
      </main>
    </Shell>
  );
}

function Block({ n, title, children }: { n: string; title: string; children: string }) {
  return (
    <article>
      <p className="stamp">{n}</p>
      <h2 className="mt-1 font-display text-2xl tracking-tight">{title}</h2>
      <p className="mt-2 text-[0.975rem] leading-relaxed text-muted">{children}</p>
    </article>
  );
}
