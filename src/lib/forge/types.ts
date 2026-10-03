export const STAGES = [
  { id: "arc", label: "Arc", full: "Reconstruct the conversation arc" },
  { id: "candidates", label: "Candidates", full: "Identify candidate skills" },
  { id: "choose", label: "Choose", full: "Choose the highest-leverage skill" },
  { id: "gold", label: "Gold", full: "Preserve reusable gold exactly" },
  { id: "implicit", label: "Implicit", full: "Extract how they think" },
  { id: "generate", label: "Generate", full: "Write full-depth skill.md files" },
  { id: "verify", label: "Verify", full: "Match file list to output" },
] as const;

export type StageId = (typeof STAGES)[number]["id"];

export type ForgeStatus = "idle" | "forging" | "done" | "error";

export type FileEntry = {
  path: string;
  purpose: string;
};

export type ForgedSkill = {
  path: string;
  content: string;
};

export type ForgeResult = {
  fileList: FileEntry[];
  skills: ForgedSkill[];
  verification: string;
  stageNotes: Partial<Record<StageId, string>>;
  raw: string;
};

export type ForgeRun = {
  id: string;
  createdAt: number;
  title: string;
  sourcePreview: string;
  hint: string;
  result: ForgeResult;
};

export type Sample = {
  id: string;
  title: string;
  blurb: string;
  hint: string;
  transcript: string;
};
