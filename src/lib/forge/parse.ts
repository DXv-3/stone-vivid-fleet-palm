import { STAGES, type FileEntry, type ForgedSkill, type ForgeResult, type StageId } from "./types";

const STAGE_IDS = new Set(STAGES.map((s) => s.id));

function decodePath(raw: string) {
  return raw.trim().replace(/^["'`]+|["'`]+$/g, "");
}

function parseTable(block: string): FileEntry[] {
  const rows: FileEntry[] = [];
  for (const line of block.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|")) continue;
    const cells = trimmed
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.length < 2) continue;
    const [path, purpose] = cells;
    if (!path || /^path$/i.test(path) || /^-+$/.test(path) || /^:?-+:?$/.test(path)) continue;
    rows.push({ path: decodePath(path), purpose: purpose ?? "" });
  }
  return rows;
}

function parseFallbackFileList(text: string): FileEntry[] {
  const start = text.search(/\|\s*path\s*\|\s*purpose\s*\|/i);
  if (start < 0) return [];
  const slice = text.slice(start);
  const end = slice.search(/\n\s*\n/);
  return parseTable(end > 0 ? slice.slice(0, end) : slice);
}

function parseFallbackSkills(text: string): ForgedSkill[] {
  const skills: ForgedSkill[] = [];
  const fence =
    /```(?:markdown|md)?[^\n]*\n([\s\S]*?)```/gi;
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = fence.exec(text))) {
    const content = match[1]?.trim() ?? "";
    if (content.length < 80) continue;
    const name =
      content.match(/^#\s+(.+)$/m)?.[1]?.trim() ||
      content.match(/^name:\s*(.+)$/m)?.[1]?.trim() ||
      `skill-${index + 1}`;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48);
    skills.push({
      path: `skills/${slug || `skill-${index + 1}`}/SKILL.md`,
      content,
    });
    index += 1;
  }
  return skills;
}

function extractStageNotes(text: string): Partial<Record<StageId, string>> {
  const notes: Partial<Record<StageId, string>> = {};
  const re = /<<STAGE:([a-z-]+)>>\s*([\s\S]*?)(?=<<(?:STAGE:|FILE_LIST|SKILL|VERIFICATION)|$)/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    const id = match[1]?.toLowerCase() as StageId;
    if (!STAGE_IDS.has(id)) continue;
    const note = (match[2] ?? "").trim().split("\n")[0]?.slice(0, 220) ?? "";
    notes[id] = note;
  }
  return notes;
}

function extractTaggedSkills(text: string): ForgedSkill[] {
  const skills: ForgedSkill[] = [];
  const closed =
    /<<SKILL\s+path="([^"]+)">>\s*([\s\S]*?)<<\/SKILL>>/gi;
  let match: RegExpExecArray | null;
  const seen = new Set<string>();
  while ((match = closed.exec(text))) {
    const path = decodePath(match[1] ?? "");
    if (!path || seen.has(path)) continue;
    seen.add(path);
    skills.push({ path, content: (match[2] ?? "").trim() });
  }
  const dangling = text.match(/<<SKILL\s+path="([^"]+)">>\s*([\s\S]*)$/i);
  if (dangling) {
    const path = decodePath(dangling[1] ?? "");
    if (path && !seen.has(path)) {
      skills.push({ path, content: (dangling[2] ?? "").replace(/<<\/SKILL>>$/i, "").trim() });
    }
  }
  return skills;
}

export function parseForgeOutput(text: string): ForgeResult {
  const fileListBlock = text.match(/<<FILE_LIST>>([\s\S]*?)(?:<<\/FILE_LIST>>|$)/i)?.[1] ?? "";
  const fileList = parseTable(fileListBlock);
  const skills = extractTaggedSkills(text);
  const verification =
    text.match(/<<VERIFICATION>>([\s\S]*?)(?:<<\/VERIFICATION>>|$)/i)?.[1]?.trim() ?? "";

  const fallbackList = fileList.length ? fileList : parseFallbackFileList(text);
  const fallbackSkills = skills.length ? skills : parseFallbackSkills(text);

  const mergedList =
    fallbackList.length > 0
      ? fallbackList
      : fallbackSkills.map((s) => ({
          path: s.path,
          purpose: s.content.match(/^#\s+(.+)$/m)?.[1]?.trim() || "Forged skill",
        }));

  return {
    fileList: mergedList,
    skills: fallbackSkills,
    verification,
    stageNotes: extractStageNotes(text),
    raw: text,
  };
}

export function activeStageFromText(text: string, forging: boolean): StageId | null {
  const matches = [...text.matchAll(/<<STAGE:([a-z-]+)>>/gi)];
  const last = matches.at(-1)?.[1]?.toLowerCase() as StageId | undefined;
  if (last && STAGE_IDS.has(last)) return last;
  if (!forging) return text.includes("<<VERIFICATION>>") ? "verify" : null;
  if (text.includes("<<SKILL")) return "generate";
  if (text.includes("<<FILE_LIST>>")) return "generate";
  return "arc";
}

export function skillTitle(skill: ForgedSkill) {
  const fromHeading = skill.content.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const fromName = skill.content.match(/^name:\s*["']?(.+?)["']?\s*$/m)?.[1]?.trim();
  if (fromHeading) return fromHeading;
  if (fromName) return fromName;
  const parts = skill.path.split("/").filter(Boolean);
  const slug = parts.at(-2) ?? parts.at(-1) ?? "skill";
  return slug.replace(/-/g, " ");
}

export function runTitle(result: ForgeResult, fallback = "Untitled forging") {
  const first = result.skills[0];
  if (first) return skillTitle(first);
  if (result.fileList[0]) return result.fileList[0].path;
  return fallback;
}

export function verificationState(result: ForgeResult) {
  const listed = result.fileList.map((f) => f.path);
  const produced = result.skills.map((s) => s.path);
  const missing = listed.filter((p) => !produced.includes(p));
  const extra = produced.filter((p) => !listed.includes(p));
  const stubs = result.skills.filter(
    (s) => s.content.length < 400 || /\bTODO\b|\bstub\b|fill in later/i.test(s.content),
  );
  const match = missing.length === 0 && extra.length === 0 && result.skills.length > 0;
  return { listed, produced, missing, extra, stubs, match };
}
