import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Shell } from "./shell-CApQZsb8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/doctrine-Dm-9MVHt.js
var import_jsx_runtime = require_jsx_runtime();
function DoctrinePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-2xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "stamp",
				children: "Doctrine"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
				children: "Two altitudes. One operating manual."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-base leading-relaxed text-muted",
				children: "Mass Artifact Forge rereads an entire conversation and packages the highest-leverage reusable capability — not the last request, not a summary. A future agent should be able to run the skill without the thread."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12 space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						n: "01",
						title: "Street-level",
						children: "Capture concrete prompts, templates, examples, decisions, wording, constraints, and artifacts. Preserve reusable gold verbatim. “Similar” is not preservation."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						n: "02",
						title: "High-level",
						children: "Ask what the conversation was really about. The last message is often a costume — a prettier PDF, a tooltip, a “just ship it.” The product is the capability underneath."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						n: "03",
						title: "Selection",
						children: "List obvious and non-obvious candidate skills. Choose the most reusable, highest-leverage one faithful to the full arc. If two strong skills would corrupt each other, ship both or a parent with sub-skills."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						n: "04",
						title: "Implicit taste",
						children: "Watch what they punish: fluff, recency bias, lost templates, unverified output, stubs. Turn those punishments into hard rules inside the skill."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						n: "05",
						title: "Execution contract",
						children: "File list table first (path | purpose). Then every listed skill.md at full production depth — zero stubs. Then one verification line that the files match the list. A weak first pass is not paraphrased. It is deepened."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14 rounded-[var(--radius-xl)] border border-border bg-surface p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "stamp",
					children: "Anti-patterns"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Summarizing the chat and calling it a skill" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Packaging the last request" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Cleaning up the user’s exact prompt" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "One mushy mega-doc covering five jobs" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "TODOs, stubs, “add examples later”" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Skipping verification" })
					]
				})]
			})
		]
	}) });
}
function Block({ n, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "stamp",
			children: n
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-1 font-display text-2xl tracking-tight",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-[0.975rem] leading-relaxed text-muted",
			children
		})
	] });
}
//#endregion
export { DoctrinePage as component };
