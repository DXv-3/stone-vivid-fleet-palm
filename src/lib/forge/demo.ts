import type { ForgeResult } from "./types";

const SKILL = `---
name: conversation-skill-forge
description: >
  Turn an entire conversation into the highest-leverage skill.md a future
  agent can execute. Use when a thread produced reusable judgment, templates,
  or a workflow that must not evaporate into a summary. Triggers on
  "make this a skill", "package this chat", "don't summarize", "operating
  manual", "Mass Artifact Forge".
---

# Conversation → Skill Forge

Package the **whole conversation** into one or more complete \`skill.md\` files a stranger-agent can run without the thread. Summaries are a failure mode. Recency bias is a failure mode. Cleaning up the user's wording is a failure mode.

## When to use

- A working session produced prompts, templates, decision rules, or a process worth repeating.
- The user is iterating, pivoting, and correcting — the corrections are the spec.
- They ask for a skill, playbook, OS, or "something executable," or they clearly hate restating themselves.

## When not to use

- The thread is a one-shot factual Q&A with no reusable procedure.
- They asked for a recap, email, or changelog **and nothing in the arc implies a capability**.
- You would only be restating a skill that already exists, unchanged.

If the last message is "make it prettier / shorter / a PDF," do **not** package the last message. Look at what the pretty thing was rendering.

## Non-negotiable selection rule

Pick the skill that is **most reusable, highest leverage, and faithful to the full arc** — not the obvious topic, not the latest ask.

Costume vs product:

| Last ask (costume) | What the thread trained (product) |
|---|---|
| Prettier PDF | Hiring scorecard OS, disqualify rules, interview loop |
| Tooltip polish | Design-system install under anti-slop constraints |
| "Write the skill.md" | Two-altitude packaging of conversations into executable manuals |

## Procedure

Do this silently before writing. Do not skip.

### 1. Reconstruct the arc (street + altitude)

Answer, from the **first message**, not the last:

- Where did they start?
- What problem were they actually trying to solve?
- What pivots happened?
- What artifacts were produced (prompts, tables, rubrics, bans, contracts)?
- What did they keep optimizing for? (This is the spine.)

Read the thread twice: once for facts, once for motive.

### 2. List candidate skills

Write obvious **and** non-obvious candidates. Include:

- The literal topic
- The meta-workflow they were rehearsing
- Any "how they think" operating system (verification, taste, leverage)

### 3. Choose

Keep one parent skill, or a parent plus sub-skills if two capabilities would corrupt each other in one file.

Do **not** mash five jobs into one mushy mega-doc.

### 4. Preserve the gold (verbatim)

If it appeared in the chat and is reusable, it goes into the skill **exactly**:

- Prompts
- Templates
- Rubric language
- Checklists
- Output contracts
- Path conventions
- Banned items

"Similar" is not preservation. Paraphrase is theft.

### 5. Extract the implicit

Watch what they punish. Turn punishments into hard rules.

Common punishments in high-signal threads (use when evidenced, do not invent):

- Fluff / preamble
- Recency bias
- Lost templates
- Unverified output
- Stubs, TODOs, "fill in later"
- Packaging the costume

### 6. Write the skill as an operating manual

Required sections (adapt labels, do not skip the jobs):

1. When to use / when not
2. Procedure a stranger can follow
3. Decision rules (hard, not vibes)
4. Templates / prompts (verbatim gold)
5. Anti-patterns
6. Verification that the work actually landed

YAML frontmatter: \`name\`, \`description\` (what it does + trigger words).

Path: \`skills/<kebab-slug>/SKILL.md\`. Nested sub-skills if needed.

### 7. Verify

- Every path in the file list has a produced file.
- Every produced file is listed.
- No file is a stub (no TODO, real procedure, templates intact).
- Gold wording still matches the source.

## Output contract

Emit in this order, nothing else:

1. **File list table** — columns \`path | purpose\`, exhaustive.
2. **Every listed skill.md** — full production depth. Zero stubs.
3. **One verification line** — list matches output, depth complete, gold preserved.

If a first pass is weak, a redo is not a paraphrase. It is the unlock. Produce the full-depth dump.

Machine-parseable tags when a harness needs them:

\`\`\`
<<FILE_LIST>>
| path | purpose |
|---|---|
| skills/<slug>/SKILL.md | <one line> |
<</FILE_LIST>>

<<SKILL path="skills/<slug>/SKILL.md">>
<raw markdown>
<</SKILL>>

<<VERIFICATION>>
MATCH: ...
<</VERIFICATION>>
\`\`\`

## Anti-patterns (instant fail)

- Summarizing the conversation and calling it a skill
- Packaging the last request
- Rewriting the user's template into "cleaner" prose
- Blog-post tone ("In this guide we will explore…")
- One vague skill covering five jobs
- TODOs, stubs, "add examples later"
- Skipping verification
- Assuming the obvious topic is the best skill

## Quality bar

A stranger-agent, with only the skill.md, can perform the capability. If they would need the original chat, the skill is incomplete — deepen it.

## Verification (for the forger)

- [ ] Arc reconstructed from message one
- [ ] Candidates included a non-obvious option
- [ ] Chosen skill is the capability, not the costume
- [ ] Verbatim gold present
- [ ] Implicit taste turned into rules
- [ ] File list matches produced files
- [ ] Each file is executable depth
`;

export const DEMO_RESULT: ForgeResult = {
  fileList: [
    {
      path: "skills/conversation-skill-forge/SKILL.md",
      purpose:
        "Two-altitude packaging of a whole conversation into an executable skill.md, not a summary.",
    },
  ],
  skills: [
    {
      path: "skills/conversation-skill-forge/SKILL.md",
      content: SKILL.trim(),
    },
  ],
  verification:
    "MATCH: File list has 1 path, 1 skill produced at full depth; selection rule, verbatim-gold law, output contract, and anti-patterns preserved from source.",
  stageNotes: {
    arc: "Started as 'don't let working sessions evaporate'; ended as an output contract. Spine = executable manuals, not recaps.",
    candidates: "Summarizer; prompt librarian; recency-bias auditor; conversation→skill forge (capability).",
    choose: "Forge wins: it is what they rehearsed the whole thread, not the last format tweak.",
    gold: "Two-altitude read, file-list-first contract, verbatim templates, redo = full-depth dump.",
    implicit: "Punishes fluff, recency, lost wording, unverified output, stubs.",
    generate: "One parent skill, complete operating manual.",
    verify: "List and files match.",
  },
  raw: "",
};
