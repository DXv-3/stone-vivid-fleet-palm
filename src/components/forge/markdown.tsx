import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re =
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*")) {
      parts.push(<em key={key++}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith("`")) {
      parts.push(
        <code
          key={key++}
          className="rounded-[var(--radius-xs)] bg-raised px-1 py-0.5 font-mono text-[0.85em] text-primary"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      const m = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (m) {
        parts.push(
          <a
            key={key++}
            href={m[2]}
            className="underline decoration-border underline-offset-2 hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            {m[1]}
          </a>,
        );
      }
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function splitFrontmatter(src: string) {
  if (!src.startsWith("---")) return { matter: null as string | null, body: src };
  const end = src.indexOf("\n---", 3);
  if (end < 0) return { matter: null, body: src };
  return {
    matter: src.slice(4, end).trim(),
    body: src.slice(end + 4).replace(/^\s*\n/, ""),
  };
}

export function MarkdownView({
  source,
  className,
}: {
  source: string;
  className?: string;
}) {
  const { matter, body } = splitFrontmatter(source.trim());
  const lines = body.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i] ?? "";

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const buf: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i]?.startsWith("```")) {
        buf.push(lines[i] ?? "");
        i += 1;
      }
      i += 1;
      blocks.push(
        <div key={k++} className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg">
          {lang ? (
            <div className="stamp border-b border-border px-3 py-2">{lang}</div>
          ) : null}
          <pre className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed text-fg">
            <code>{buf.join("\n")}</code>
          </pre>
        </div>,
      );
      continue;
    }

    if (line.trim().startsWith("|") && (lines[i + 1]?.includes("---") ?? false)) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i]?.trim().startsWith("|")) {
        const cells = (lines[i] ?? "")
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim());
        if (!cells.every((c) => /^:?-+:?$/.test(c))) rows.push(cells);
        i += 1;
      }
      const head = rows[0] ?? [];
      const rest = rows.slice(1);
      blocks.push(
        <div key={k++} className="overflow-x-auto rounded-[var(--radius-md)] border border-border">
          <table className="w-full min-w-80 text-left text-sm">
            <thead className="bg-raised text-muted">
              <tr>
                {head.map((c, idx) => (
                  <th key={idx} className="px-3 py-2 font-medium">
                    {inline(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rest.map((row, ri) => (
                <tr key={ri} className="border-t border-border">
                  {row.map((c, ci) => (
                    <td key={ci} className="px-3 py-2 align-top leading-relaxed">
                      {inline(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (/^[-*_]{3,}$/.test(line.trim())) {
      blocks.push(<hr key={k++} className="border-border" />);
      i += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push(
        <h1 key={k++} className="font-display text-3xl font-medium tracking-tight">
          {inline(line.slice(2))}
        </h1>,
      );
      i += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={k++} className="font-display text-xl font-medium tracking-tight">
          {inline(line.slice(3))}
        </h2>,
      );
      i += 1;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={k++} className="text-base font-semibold tracking-tight">
          {inline(line.slice(4))}
        </h3>,
      );
      i += 1;
      continue;
    }
    if (line.startsWith("#### ")) {
      blocks.push(
        <h4 key={k++} className="text-sm font-semibold text-primary">
          {inline(line.slice(5))}
        </h4>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i]?.startsWith("> ")) {
        buf.push((lines[i] ?? "").replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push(
        <blockquote
          key={k++}
          className="border-l-2 border-primary/50 pl-4 text-muted"
        >
          {inline(buf.join(" "))}
        </blockquote>,
      );
      continue;
    }

    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line);
      const items: string[] = [];
      while (
        i < lines.length &&
        (ordered ? /^\s*\d+\.\s+/.test(lines[i] ?? "") : /^\s*[-*]\s+/.test(lines[i] ?? ""))
      ) {
        items.push((lines[i] ?? "").replace(/^\s*(?:[-*]|\d+\.)\s+/, ""));
        i += 1;
      }
      const Tag = ordered ? "ol" : "ul";
      blocks.push(
        <Tag
          key={k++}
          className={cn(
            "space-y-1.5 pl-5 text-sm leading-relaxed text-fg",
            ordered ? "list-decimal" : "list-disc",
          )}
        >
          {items.map((item, idx) => (
            <li key={idx}>{inline(item)}</li>
          ))}
        </Tag>,
      );
      continue;
    }

    if (!line.trim()) {
      i += 1;
      continue;
    }

    const buf: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i]?.trim() &&
      !/^(#{1,4} |```|\s*[-*]\s+|\s*\d+\.\s+|> |\|)/.test(lines[i] ?? "")
    ) {
      buf.push(lines[i] ?? "");
      i += 1;
    }
    blocks.push(
      <p key={k++} className="text-sm leading-relaxed text-fg/90">
        {inline(buf.join(" "))}
      </p>,
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {matter ? (
        <div className="rounded-[var(--radius-md)] border border-border bg-raised/60 p-4">
          <p className="stamp mb-2">Frontmatter</p>
          <pre className="font-mono text-[0.75rem] leading-relaxed text-muted whitespace-pre-wrap">
            {matter}
          </pre>
        </div>
      ) : null}
      {blocks}
    </div>
  );
}
