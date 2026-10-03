import type { ForgeRun } from "./types";

const KEY = "maf.vault.v1";
const MAX = 40;

export function loadVault(): ForgeRun[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ForgeRun[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveVault(runs: ForgeRun[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(runs.slice(0, MAX)));
}

export function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `run-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function filenameFromPath(path: string) {
  const parts = path.split("/").filter(Boolean);
  if (parts.length >= 2) return `${parts.at(-2)}.md`;
  return parts.at(-1) || "SKILL.md";
}

export function packMarkdown(run: ForgeRun) {
  const lines = [
    `# Artifact pack — ${run.title}`,
    ``,
    run.result.fileList.length
      ? [
          `| path | purpose |`,
          `|---|---|`,
          ...run.result.fileList.map((f) => `| ${f.path} | ${f.purpose} |`),
          ``,
        ].join("\n")
      : "",
    run.result.verification ? `Verification: ${run.result.verification}\n` : "",
    ...run.result.skills.flatMap((s) => [`## ${s.path}`, ``, s.content, ``]),
  ];
  return lines.filter((l) => l !== undefined).join("\n");
}
