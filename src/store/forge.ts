import { create } from "zustand";
import { DEMO_RESULT } from "@/lib/forge/demo";
import { parseForgeOutput, runTitle } from "@/lib/forge/parse";
import { SAMPLES } from "@/lib/forge/samples";
import type { ForgeResult, ForgeRun, ForgeStatus, StageId } from "@/lib/forge/types";
import { loadVault, newId, saveVault } from "@/lib/forge/vault";

type ForgeState = {
  transcript: string;
  hint: string;
  status: ForgeStatus;
  error: string;
  streaming: string;
  activeStage: StageId | null;
  result: ForgeResult | null;
  selectedPath: string | null;
  vault: ForgeRun[];
  activeRunId: string | null;
  hydrated: boolean;
  aiAvailable: boolean | null;
  hydrate: () => void;
  setTranscript: (value: string) => void;
  setHint: (value: string) => void;
  loadSample: (id: string) => void;
  loadDemo: () => void;
  loadRun: (id: string) => void;
  deleteRun: (id: string) => void;
  selectPath: (path: string) => void;
  setAiAvailable: (value: boolean) => void;
  startForge: () => void;
  pushStream: (chunk: string, stage: StageId | null, partial: ForgeResult) => void;
  finishForge: (raw: string) => void;
  failForge: (message: string) => void;
  resetLive: () => void;
};

function persist(vault: ForgeRun[]) {
  saveVault(vault);
}

export const useForge = create<ForgeState>((set, get) => ({
  transcript: "",
  hint: "",
  status: "idle",
  error: "",
  streaming: "",
  activeStage: null,
  result: null,
  selectedPath: null,
  vault: [],
  activeRunId: null,
  hydrated: false,
  aiAvailable: null,

  hydrate: () => {
    if (get().hydrated) return;
    set({ vault: loadVault(), hydrated: true });
  },

  setTranscript: (value) => set({ transcript: value }),
  setHint: (value) => set({ hint: value }),

  loadSample: (id) => {
    const sample = SAMPLES.find((s) => s.id === id);
    if (!sample) return;
    set({
      transcript: sample.transcript,
      hint: sample.hint,
      error: "",
    });
  },

  loadDemo: () => {
    const existing = get().vault.find((r) => r.id === "demo-conversation-forge");
    const run: ForgeRun = existing ?? {
      id: "demo-conversation-forge",
      createdAt: Date.now(),
      title: runTitle(DEMO_RESULT, "Conversation → Skill Forge"),
      sourcePreview: SAMPLES[0]?.transcript.slice(0, 280) ?? "",
      hint: SAMPLES[0]?.hint ?? "",
      result: DEMO_RESULT,
    };
    const vault = existing ? get().vault : [run, ...get().vault];
    persist(vault);
    set({
      transcript: SAMPLES[0]?.transcript ?? "",
      hint: SAMPLES[0]?.hint ?? "",
      result: DEMO_RESULT,
      selectedPath: DEMO_RESULT.skills[0]?.path ?? null,
      status: "done",
      error: "",
      streaming: "",
      activeStage: "verify",
      vault,
      activeRunId: run.id,
    });
  },

  loadRun: (id) => {
    const run = get().vault.find((r) => r.id === id);
    if (!run) return;
    set({
      result: run.result,
      selectedPath: run.result.skills[0]?.path ?? null,
      status: "done",
      error: "",
      streaming: "",
      activeStage: "verify",
      hint: run.hint,
      transcript: run.sourcePreview,
      activeRunId: run.id,
    });
  },

  deleteRun: (id) => {
    const vault = get().vault.filter((r) => r.id !== id);
    persist(vault);
    const clearing = get().activeRunId === id;
    set({
      vault,
      ...(clearing
        ? {
            activeRunId: null,
            result: null,
            selectedPath: null,
            status: "idle" as const,
            activeStage: null,
          }
        : {}),
    });
  },

  selectPath: (path) => set({ selectedPath: path }),
  setAiAvailable: (value) => set({ aiAvailable: value }),

  startForge: () =>
    set({
      status: "forging",
      error: "",
      streaming: "",
      result: null,
      selectedPath: null,
      activeStage: "arc",
    }),

  pushStream: (chunk, stage, partial) =>
    set({
      streaming: chunk,
      activeStage: stage,
      result: partial.skills.length || partial.fileList.length ? partial : get().result,
      selectedPath:
        get().selectedPath ??
        partial.skills[0]?.path ??
        partial.fileList[0]?.path ??
        null,
    }),

  finishForge: (raw) => {
    const result = parseForgeOutput(raw);
    const run: ForgeRun = {
      id: newId(),
      createdAt: Date.now(),
      title: runTitle(result),
      sourcePreview: get().transcript.slice(0, 2000),
      hint: get().hint,
      result,
    };
    const vault = [run, ...get().vault].slice(0, 40);
    persist(vault);
    set({
      status: "done",
      result,
      streaming: raw,
      activeStage: "verify",
      selectedPath: result.skills[0]?.path ?? result.fileList[0]?.path ?? null,
      vault,
      activeRunId: run.id,
    });
  },

  failForge: (message) =>
    set({
      status: "error",
      error: message,
      activeStage: null,
    }),

  resetLive: () =>
    set({
      status: "idle",
      error: "",
      streaming: "",
      result: null,
      selectedPath: null,
      activeStage: null,
      activeRunId: null,
    }),
}));
