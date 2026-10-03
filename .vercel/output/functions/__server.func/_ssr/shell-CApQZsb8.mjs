import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { m as useRouterState, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { o as Hammer } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-CApQZsb8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var DEMO_RESULT = {
	fileList: [{
		path: "skills/conversation-skill-forge/SKILL.md",
		purpose: "Two-altitude packaging of a whole conversation into an executable skill.md, not a summary."
	}],
	skills: [{
		path: "skills/conversation-skill-forge/SKILL.md",
		content: `---
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
`.trim()
	}],
	verification: "MATCH: File list has 1 path, 1 skill produced at full depth; selection rule, verbatim-gold law, output contract, and anti-patterns preserved from source.",
	stageNotes: {
		arc: "Started as 'don't let working sessions evaporate'; ended as an output contract. Spine = executable manuals, not recaps.",
		candidates: "Summarizer; prompt librarian; recency-bias auditor; conversation→skill forge (capability).",
		choose: "Forge wins: it is what they rehearsed the whole thread, not the last format tweak.",
		gold: "Two-altitude read, file-list-first contract, verbatim templates, redo = full-depth dump.",
		implicit: "Punishes fluff, recency, lost wording, unverified output, stubs.",
		generate: "One parent skill, complete operating manual.",
		verify: "List and files match."
	},
	raw: ""
};
var STAGES = [
	{
		id: "arc",
		label: "Arc",
		full: "Reconstruct the conversation arc"
	},
	{
		id: "candidates",
		label: "Candidates",
		full: "Identify candidate skills"
	},
	{
		id: "choose",
		label: "Choose",
		full: "Choose the highest-leverage skill"
	},
	{
		id: "gold",
		label: "Gold",
		full: "Preserve reusable gold exactly"
	},
	{
		id: "implicit",
		label: "Implicit",
		full: "Extract how they think"
	},
	{
		id: "generate",
		label: "Generate",
		full: "Write full-depth skill.md files"
	},
	{
		id: "verify",
		label: "Verify",
		full: "Match file list to output"
	}
];
var STAGE_IDS = new Set(STAGES.map((s) => s.id));
function decodePath(raw) {
	return raw.trim().replace(/^["'`]+|["'`]+$/g, "");
}
function parseTable(block) {
	const rows = [];
	for (const line of block.split("\n")) {
		const trimmed = line.trim();
		if (!trimmed.startsWith("|")) continue;
		const cells = trimmed.split("|").slice(1, -1).map((c) => c.trim());
		if (cells.length < 2) continue;
		const [path, purpose] = cells;
		if (!path || /^path$/i.test(path) || /^-+$/.test(path) || /^:?-+:?$/.test(path)) continue;
		rows.push({
			path: decodePath(path),
			purpose: purpose ?? ""
		});
	}
	return rows;
}
function parseFallbackFileList(text) {
	const start = text.search(/\|\s*path\s*\|\s*purpose\s*\|/i);
	if (start < 0) return [];
	const slice = text.slice(start);
	const end = slice.search(/\n\s*\n/);
	return parseTable(end > 0 ? slice.slice(0, end) : slice);
}
function parseFallbackSkills(text) {
	const skills = [];
	const fence = /```(?:markdown|md)?[^\n]*\n([\s\S]*?)```/gi;
	let match;
	let index = 0;
	while (match = fence.exec(text)) {
		const content = match[1]?.trim() ?? "";
		if (content.length < 80) continue;
		const slug = (content.match(/^#\s+(.+)$/m)?.[1]?.trim() || content.match(/^name:\s*(.+)$/m)?.[1]?.trim() || `skill-${index + 1}`).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);
		skills.push({
			path: `skills/${slug || `skill-${index + 1}`}/SKILL.md`,
			content
		});
		index += 1;
	}
	return skills;
}
function extractStageNotes(text) {
	const notes = {};
	const re = /<<STAGE:([a-z-]+)>>\s*([\s\S]*?)(?=<<(?:STAGE:|FILE_LIST|SKILL|VERIFICATION)|$)/gi;
	let match;
	while (match = re.exec(text)) {
		const id = match[1]?.toLowerCase();
		if (!STAGE_IDS.has(id)) continue;
		notes[id] = (match[2] ?? "").trim().split("\n")[0]?.slice(0, 220) ?? "";
	}
	return notes;
}
function extractTaggedSkills(text) {
	const skills = [];
	const closed = /<<SKILL\s+path="([^"]+)">>\s*([\s\S]*?)<<\/SKILL>>/gi;
	let match;
	const seen = /* @__PURE__ */ new Set();
	while (match = closed.exec(text)) {
		const path = decodePath(match[1] ?? "");
		if (!path || seen.has(path)) continue;
		seen.add(path);
		skills.push({
			path,
			content: (match[2] ?? "").trim()
		});
	}
	const dangling = text.match(/<<SKILL\s+path="([^"]+)">>\s*([\s\S]*)$/i);
	if (dangling) {
		const path = decodePath(dangling[1] ?? "");
		if (path && !seen.has(path)) skills.push({
			path,
			content: (dangling[2] ?? "").replace(/<<\/SKILL>>$/i, "").trim()
		});
	}
	return skills;
}
function parseForgeOutput(text) {
	const fileList = parseTable(text.match(/<<FILE_LIST>>([\s\S]*?)(?:<<\/FILE_LIST>>|$)/i)?.[1] ?? "");
	const skills = extractTaggedSkills(text);
	const verification = text.match(/<<VERIFICATION>>([\s\S]*?)(?:<<\/VERIFICATION>>|$)/i)?.[1]?.trim() ?? "";
	const fallbackList = fileList.length ? fileList : parseFallbackFileList(text);
	const fallbackSkills = skills.length ? skills : parseFallbackSkills(text);
	return {
		fileList: fallbackList.length > 0 ? fallbackList : fallbackSkills.map((s) => ({
			path: s.path,
			purpose: s.content.match(/^#\s+(.+)$/m)?.[1]?.trim() || "Forged skill"
		})),
		skills: fallbackSkills,
		verification,
		stageNotes: extractStageNotes(text),
		raw: text
	};
}
function activeStageFromText(text, forging) {
	const last = [...text.matchAll(/<<STAGE:([a-z-]+)>>/gi)].at(-1)?.[1]?.toLowerCase();
	if (last && STAGE_IDS.has(last)) return last;
	if (!forging) return text.includes("<<VERIFICATION>>") ? "verify" : null;
	if (text.includes("<<SKILL")) return "generate";
	if (text.includes("<<FILE_LIST>>")) return "generate";
	return "arc";
}
function skillTitle(skill) {
	const fromHeading = skill.content.match(/^#\s+(.+)$/m)?.[1]?.trim();
	const fromName = skill.content.match(/^name:\s*["']?(.+?)["']?\s*$/m)?.[1]?.trim();
	if (fromHeading) return fromHeading;
	if (fromName) return fromName;
	const parts = skill.path.split("/").filter(Boolean);
	return (parts.at(-2) ?? parts.at(-1) ?? "skill").replace(/-/g, " ");
}
function runTitle(result, fallback = "Untitled forging") {
	const first = result.skills[0];
	if (first) return skillTitle(first);
	if (result.fileList[0]) return result.fileList[0].path;
	return fallback;
}
function verificationState(result) {
	const listed = result.fileList.map((f) => f.path);
	const produced = result.skills.map((s) => s.path);
	const missing = listed.filter((p) => !produced.includes(p));
	const extra = produced.filter((p) => !listed.includes(p));
	return {
		listed,
		produced,
		missing,
		extra,
		stubs: result.skills.filter((s) => s.content.length < 400 || /\bTODO\b|\bstub\b|fill in later/i.test(s.content)),
		match: missing.length === 0 && extra.length === 0 && result.skills.length > 0
	};
}
var SAMPLES = [
	{
		id: "conversation-forge",
		title: "Conversation → skill",
		blurb: "A long chat that kept circling one question: how do you package a whole thread into an operating manual, not a summary.",
		hint: "Reusable depth over recency. Preserve exact wording. Pick the highest-leverage skill, not the last topic.",
		transcript: `USER: I keep having these long working sessions with you and then the value evaporates. Next week I start from zero. I don't want a summary. Summaries are dead on arrival. I want something a future agent can EXECUTE.

ASSISTANT: You want a playbook, not minutes. What would "execute" mean — a checklist, a prompt, a skill file?

USER: A skill.md. Complete. Not a stub. If I handed it to a stranger-agent they could do the job without this chat. And stop optimizing for the last message. The last message is usually a small edit. The conversation is the actual product.

ASSISTANT: Got it. Capture street-level artifacts exactly, then step back and ask what the thread was really about.

USER: Yes. Two levels at once. Street-level: prompts, templates, constraints, examples, decisions — keep the wording. High-level: the pattern underneath. People keep packaging the obvious topic and missing the capability.

ASSISTANT: Example?

USER: Last month we spent four hours designing a hiring scorecard, then I asked you to "make the PDF prettier." If you package "PDF layout" you burned the gold. The gold was the scorecard logic, the disqualify rules, the interview loop. The PDF was a render.

ASSISTANT: So the selection rule is: most reusable, highest leverage, faithful to the full arc — not the last ask.

USER: Exactly. And if there are two strong skills, ship both, or a parent with sub-skills. Don't collapse them into a mushy mega-doc.

ASSISTANT: Process I'm hearing:
1. Reconstruct the arc — start, real problem, pivots, artifacts, what they kept optimizing for.
2. List candidate skills, including non-obvious ones.
3. Choose.
4. Preserve gold exactly.
5. Extract how they think and turn it into hard rules.

USER: That's the process. Make it non-negotiable. Also an execution contract: first a file list table (path | purpose). Then every listed file at full production depth. Zero stubs. Then one verification line that the files match the list. No preamble.

ASSISTANT: Output format?

USER: I need it machine-parseable later, but the human contract is: File List, then complete skill.md files, then verification. If the first pass is weak, a redo is not a paraphrase — it is the unlock. Full-depth dump.

ASSISTANT: What does "how they think" mean in the skill?

USER: Look at what they punish. I punish fluff, recency bias, lost templates, unverified output, and skills that can't be run. Turn those into decision rules. "Do not summarize. Do not pick the last topic. Preserve exact prompts. Verify the file list matches."

ASSISTANT: Any path convention?

USER: skills/<slug>/SKILL.md. Sub-skills nested if needed. YAML frontmatter with name + description. The body is an operating manual: when to use, when not, procedure, decision rules, templates, anti-patterns, verification.

ASSISTANT: Anti-patterns?

USER: Packaging the last request. Summarizing instead of instructing. Dropping the user's exact prompt because you "cleaned it up." Writing a blog post. Leaving TODOs. One vague skill that tries to cover five jobs.

USER: Also: street-level means if we wrote a template in the chat, it goes into the skill verbatim. I don't want a "similar" template. I want THAT template.

ASSISTANT: I'll treat any reusable block as sacred text.

USER: Good. One more: the conversation may look like we were "just building an app" or "just fixing copy." Ignore the costume. Ask what reusable capability was being trained. That's the skill.

ASSISTANT: So the meta-skill is: reread the whole thread at two altitudes, choose the highest-leverage capability, and forge a complete operating manual a future agent can run.

USER: Yes. Call the move Mass Artifact Forge. Locked. Zero deviation.`
	},
	{
		id: "design-critique",
		title: "Design critique loop",
		blurb: "A product designer hammering a UI from generic AI-looking to a real system — tokens, anti-slop, concentric radii.",
		hint: "Systems over one-off styling. Ban the tells of generic AI UI. One accent, real hierarchy, verification by eye.",
		transcript: `USER: The dashboard looks like every AI dashboard. Purple gradient, Inter, rounded-xl cards, emoji headers. I need it to look like a product someone paid for.

ASSISTANT: What would "paid for" mean in your mouth?

USER: Intentional. Calm. Expensive. Near-black field, one restrained accent, not purple. Display + body pairing. Hairline borders. No blob gradients. No emoji as icons.

ASSISTANT: I can restyle the page.

USER: Don't restyle the page. Install a system, then compose. Tokens in CSS first: bg, surface, fg, muted, primary, border, radius scale, motion. If a value isn't a token, it doesn't ship.

ASSISTANT: Palette?

USER: Dark iron #0a0a0b, elevated #121214, bone text #f0efe9, muted #8e8e89, accent cool steel — never gold, never purple. Accent is for primary actions and focus, not every card.

USER: Radius is concentric. Outer = inner + padding. If the button is 8 and the card pads 16, the card is 24. Same radius on parent and child is a fail.

ASSISTANT: Motion?

USER: 150–250ms, opacity + transform, open slower than close. Never transition: all. Respect reduced motion. Don't bounce everything.

USER: Anti-slop checklist is law:
- No gradient-blob heroes
- No emoji in chrome
- No Inter-only hierarchy
- No purple/violet/magenta/gold fills
- No glassmorphism soup
- Every element earns its place

ASSISTANT: How do we know it's done?

USER: Not a 200 OK. Open it. Desktop and mobile. If text is white-on-white, if the tap target is 28px, if the empty state is a blank hole — it's not done. Loading, empty, and error are designed states.

USER: Copy tone: short, plain, verbs. Continue, Forge, Copy, Download. No "✨ magic".

ASSISTANT: Components?

USER: Prefer a real primitive kit for buttons, dialogs, inputs. Don't invent a second visual language. Match tokens. 44px targets on mobile. No horizontal overflow at 390.

USER: We spent an hour arguing about a chart color and then I said "make the tooltip nicer." If you package "tooltip polish" you missed it. The skill is how to run a design system install under anti-slop constraints.

ASSISTANT: So the reusable capability is: define tokens, ban slop tells, compose from the system, verify by eye on real viewports.

USER: Yes. And write the checklist into the skill so a future agent cannot "tastefully" reintroduce purple.`
	},
	{
		id: "hiring-scorecard",
		title: "Hiring scorecard OS",
		blurb: "A founder building a hiring loop, then asking for a prettier PDF. The PDF is a costume. The loop is the product.",
		hint: "Disqualify rules and scorecard logic over document cosmetics. Keep the exact rubric language.",
		transcript: `USER: We're hiring a founding generalist. I need a scorecard. Not vibes. If two of us interview, I want the same spine.

ASSISTANT: What must be true in 90 days for this hire to have been right?

USER: They have shipped something customers touched, unblocked themselves in our messy repo, and I would let them talk to a user without me in the room.

ASSISTANT: Draft scorecard dimensions?

USER: Four only. If we have twelve, we have none.
1. Shipped judgment — did they pick the useful 20%?
2. Agency — did they move without a ticket nanny?
3. Communication density — short, specific, no fog
4. Taste — can they tell when it's still generic

USER: Scoring: 1-4, no 3s as a hiding place. 1 = disqualify signal, 2 = below bar, 3 is banned, 4 = bar, 5 = we'd learn from them. Wait. Use 1, 2, 4, 5. Kill the middle.

ASSISTANT: Disqualifiers?

USER: Hard no, any one is enough:
- Blames "the process" for no artifacts
- Cannot walk a decision they made; only recites a stack
- Contempt for users or for unglamorous work
- Needs a perfect spec to start

USER: Interview loop:
1. Work sample — 90 minutes, a real ugly problem from our backlog, not a leetcode. We pay them.
2. Decision walk — they bring one thing they shipped and we spend 40 minutes on the forks they didn't take.
3. Pair — 45 minutes in our actual repo.
4. Founder close — values and pace, not selling.

USER: Rubric language I want kept exactly:

SHIPPED JUDGMENT
5: Cut scope that would have impressed peers and shipped the customer-visible core.
4: Sequenced work so a user could touch it this week.
2: Polished the wrong surface.
1: Optimized for looking busy.

AGENCY
5: Found the blocked path, named it, moved a different path the same day.
4: Unblocked themselves with a specific ask.
2: Waited.
1: Narrated blockers as identity.

USER: Calibration rule: if the panel's scores disagree by more than one allowed bucket, you don't average. You reopen the evidence. Averaging is how we hire the middle.

ASSISTANT: I can put this in a nice one-pager.

USER: Later. First lock the operating system. The PDF is a render. If we argue about type size before disqualify rules, we are doing fashion.

ASSISTANT: Offer bar?

USER: Offer only if no hard disqualifier AND at least two dimensions at 4+ AND nobody on the panel is privately hoping someone else will veto.

USER: After we locked that, I asked you to "make the PDF prettier." Do not package typography. Package the hiring OS. Future-me will try to skip disqualifiers under time pressure — the skill must forbid that.

ASSISTANT: Verification: a loop is correct if a new interviewer can run it from the doc alone, scores are comparable, and a pretty PDF cannot be produced before the rubric exists.

USER: Yes. Write it so they cannot "just hop on a vibe call."`
	}
];
var KEY = "maf.vault.v1";
var MAX = 40;
function loadVault() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed;
	} catch {
		return [];
	}
}
function saveVault(runs) {
	if (typeof window === "undefined") return;
	localStorage.setItem(KEY, JSON.stringify(runs.slice(0, MAX)));
}
function newId() {
	if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
	return `run-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function downloadText(filename, content) {
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
function filenameFromPath(path) {
	const parts = path.split("/").filter(Boolean);
	if (parts.length >= 2) return `${parts.at(-2)}.md`;
	return parts.at(-1) || "SKILL.md";
}
function packMarkdown(run) {
	return [
		`# Artifact pack — ${run.title}`,
		``,
		run.result.fileList.length ? [
			`| path | purpose |`,
			`|---|---|`,
			...run.result.fileList.map((f) => `| ${f.path} | ${f.purpose} |`),
			``
		].join("\n") : "",
		run.result.verification ? `Verification: ${run.result.verification}\n` : "",
		...run.result.skills.flatMap((s) => [
			`## ${s.path}`,
			``,
			s.content,
			``
		])
	].filter((l) => l !== void 0).join("\n");
}
function persist(vault) {
	saveVault(vault);
}
var useForge = create((set, get) => ({
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
		set({
			vault: loadVault(),
			hydrated: true
		});
	},
	setTranscript: (value) => set({ transcript: value }),
	setHint: (value) => set({ hint: value }),
	loadSample: (id) => {
		const sample = SAMPLES.find((s) => s.id === id);
		if (!sample) return;
		set({
			transcript: sample.transcript,
			hint: sample.hint,
			error: ""
		});
	},
	loadDemo: () => {
		const existing = get().vault.find((r) => r.id === "demo-conversation-forge");
		const run = existing ?? {
			id: "demo-conversation-forge",
			createdAt: Date.now(),
			title: runTitle(DEMO_RESULT, "Conversation → Skill Forge"),
			sourcePreview: SAMPLES[0]?.transcript.slice(0, 280) ?? "",
			hint: SAMPLES[0]?.hint ?? "",
			result: DEMO_RESULT
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
			activeRunId: run.id
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
			activeRunId: run.id
		});
	},
	deleteRun: (id) => {
		const vault = get().vault.filter((r) => r.id !== id);
		persist(vault);
		set({
			vault,
			...get().activeRunId === id ? {
				activeRunId: null,
				result: null,
				selectedPath: null,
				status: "idle",
				activeStage: null
			} : {}
		});
	},
	selectPath: (path) => set({ selectedPath: path }),
	setAiAvailable: (value) => set({ aiAvailable: value }),
	startForge: () => set({
		status: "forging",
		error: "",
		streaming: "",
		result: null,
		selectedPath: null,
		activeStage: "arc"
	}),
	pushStream: (chunk, stage, partial) => set({
		streaming: chunk,
		activeStage: stage,
		result: partial.skills.length || partial.fileList.length ? partial : get().result,
		selectedPath: get().selectedPath ?? partial.skills[0]?.path ?? partial.fileList[0]?.path ?? null
	}),
	finishForge: (raw) => {
		const result = parseForgeOutput(raw);
		const run = {
			id: newId(),
			createdAt: Date.now(),
			title: runTitle(result),
			sourcePreview: get().transcript.slice(0, 2e3),
			hint: get().hint,
			result
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
			activeRunId: run.id
		});
	},
	failForge: (message) => set({
		status: "error",
		error: message,
		activeStage: null
	}),
	resetLive: () => set({
		status: "idle",
		error: "",
		streaming: "",
		result: null,
		selectedPath: null,
		activeStage: null,
		activeRunId: null
	})
}));
var NAV = [
	{
		to: "/",
		label: "Floor"
	},
	{
		to: "/vault",
		label: "Vault"
	},
	{
		to: "/doctrine",
		label: "Doctrine"
	}
];
function SiteHeader() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const status = useForge((s) => s.status);
	const aiAvailable = useForge((s) => s.aiAvailable);
	const heat = status === "forging" ? "Striking" : status === "done" ? "Tempered" : status === "error" ? "Fault" : "Cold";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 border-b border-border/80 bg-bg/85 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-surface",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hammer, {
							className: "size-3.5 text-primary",
							strokeWidth: 1.75
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-[0.95rem] leading-none tracking-tight",
							children: "Mass Artifact Forge"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 hidden stamp sm:block",
							children: "Conversation to skill"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex items-center gap-1",
					children: NAV.map((item) => {
						const active = pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: cn("flex h-11 items-center px-3 text-sm transition-colors duration-150", active ? "text-fg" : "text-muted hover:text-fg"),
							children: item.label
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-3 sm:flex",
					children: [aiAvailable === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "stamp text-danger",
						children: "AI offline"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", status === "forging" && "bg-primary animate-[maf-heat_1.2s_ease-in-out_infinite]", status === "done" && "bg-ok", status === "error" && "bg-danger", status === "idle" && "bg-faint") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "stamp",
							children: heat
						})]
					})]
				})
			]
		})
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getForgeAvailability = createServerFn({ method: "GET" }).handler(createSsrRpc("3540dd61699e69834ac01a1868d2daf3d9cd715cb4d36efe6c6f93e04e23f577"));
function Shell({ children }) {
	const hydrate = useForge((s) => s.hydrate);
	const setAiAvailable = useForge((s) => s.setAiAvailable);
	(0, import_react.useEffect)(() => {
		hydrate();
		getForgeAvailability().then((r) => setAiAvailable(r.available));
	}, [hydrate, setAiAvailable]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grain" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "bottom-right",
				toastOptions: { className: "border-border bg-surface text-fg" }
			})
		]
	});
}
//#endregion
export { cn as a, packMarkdown as c, verificationState as d, activeStageFromText as i, parseForgeOutput as l, STAGES as n, downloadText as o, Shell as r, filenameFromPath as s, SAMPLES as t, useForge as u };
