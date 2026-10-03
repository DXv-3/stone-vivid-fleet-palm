import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as RotateCcw, c as Download, i as Square, l as Copy, o as Hammer, s as Files, t as Upload, u as Check } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as cn, c as packMarkdown, d as verificationState, i as activeStageFromText, l as parseForgeOutput, n as STAGES, o as downloadText, r as Shell, s as filenameFromPath, t as SAMPLES, u as useForge } from "./shell-CApQZsb8.mjs";
import { t as Button } from "./button-CqgD1p1I.mjs";
import { n as nn, r as qt, t as Qt } from "../_libs/react-resizable-panels.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-NX_J6tWG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function inline(text) {
	const parts = [];
	const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
	let last = 0;
	let match;
	let key = 0;
	while (match = re.exec(text)) {
		if (match.index > last) parts.push(text.slice(last, match.index));
		const token = match[0];
		if (token.startsWith("**")) parts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: token.slice(2, -2) }, key++));
		else if (token.startsWith("*")) parts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: token.slice(1, -1) }, key++));
		else if (token.startsWith("`")) parts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
			className: "rounded-[var(--radius-xs)] bg-raised px-1 py-0.5 font-mono text-[0.85em] text-primary",
			children: token.slice(1, -1)
		}, key++));
		else {
			const m = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
			if (m) parts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: m[2],
				className: "underline decoration-border underline-offset-2 hover:text-primary",
				target: "_blank",
				rel: "noreferrer",
				children: m[1]
			}, key++));
		}
		last = match.index + token.length;
	}
	if (last < text.length) parts.push(text.slice(last));
	return parts;
}
function splitFrontmatter(src) {
	if (!src.startsWith("---")) return {
		matter: null,
		body: src
	};
	const end = src.indexOf("\n---", 3);
	if (end < 0) return {
		matter: null,
		body: src
	};
	return {
		matter: src.slice(4, end).trim(),
		body: src.slice(end + 4).replace(/^\s*\n/, "")
	};
}
function MarkdownView({ source, className }) {
	const { matter, body } = splitFrontmatter(source.trim());
	const lines = body.split("\n");
	const blocks = [];
	let i = 0;
	let k = 0;
	while (i < lines.length) {
		const line = lines[i] ?? "";
		if (line.startsWith("```")) {
			const lang = line.slice(3).trim();
			const buf = [];
			i += 1;
			while (i < lines.length && !lines[i]?.startsWith("```")) {
				buf.push(lines[i] ?? "");
				i += 1;
			}
			i += 1;
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg",
				children: [lang ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "stamp border-b border-border px-3 py-2",
					children: lang
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed text-fg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: buf.join("\n") })
				})]
			}, k++));
			continue;
		}
		if (line.trim().startsWith("|") && (lines[i + 1]?.includes("---") ?? false)) {
			const rows = [];
			while (i < lines.length && lines[i]?.trim().startsWith("|")) {
				const cells = (lines[i] ?? "").split("|").slice(1, -1).map((c) => c.trim());
				if (!cells.every((c) => /^:?-+:?$/.test(c))) rows.push(cells);
				i += 1;
			}
			const head = rows[0] ?? [];
			const rest = rows.slice(1);
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-[var(--radius-md)] border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-80 text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-raised text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: head.map((c, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 font-medium",
							children: inline(c)
						}, idx)) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rest.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-t border-border",
						children: row.map((c, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 align-top leading-relaxed",
							children: inline(c)
						}, ci))
					}, ri)) })]
				})
			}, k++));
			continue;
		}
		if (/^[-*_]{3,}$/.test(line.trim())) {
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-border" }, k++));
			i += 1;
			continue;
		}
		if (line.startsWith("# ")) {
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-medium tracking-tight",
				children: inline(line.slice(2))
			}, k++));
			i += 1;
			continue;
		}
		if (line.startsWith("## ")) {
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-medium tracking-tight",
				children: inline(line.slice(3))
			}, k++));
			i += 1;
			continue;
		}
		if (line.startsWith("### ")) {
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-base font-semibold tracking-tight",
				children: inline(line.slice(4))
			}, k++));
			i += 1;
			continue;
		}
		if (line.startsWith("#### ")) {
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "text-sm font-semibold text-primary",
				children: inline(line.slice(5))
			}, k++));
			i += 1;
			continue;
		}
		if (line.startsWith("> ")) {
			const buf = [];
			while (i < lines.length && lines[i]?.startsWith("> ")) {
				buf.push((lines[i] ?? "").replace(/^>\s?/, ""));
				i += 1;
			}
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				className: "border-l-2 border-primary/50 pl-4 text-muted",
				children: inline(buf.join(" "))
			}, k++));
			continue;
		}
		if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
			const ordered = /^\s*\d+\.\s+/.test(line);
			const items = [];
			while (i < lines.length && (ordered ? /^\s*\d+\.\s+/.test(lines[i] ?? "") : /^\s*[-*]\s+/.test(lines[i] ?? ""))) {
				items.push((lines[i] ?? "").replace(/^\s*(?:[-*]|\d+\.)\s+/, ""));
				i += 1;
			}
			const Tag = ordered ? "ol" : "ul";
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				className: cn("space-y-1.5 pl-5 text-sm leading-relaxed text-fg", ordered ? "list-decimal" : "list-disc"),
				children: items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: inline(item) }, idx))
			}, k++));
			continue;
		}
		if (!line.trim()) {
			i += 1;
			continue;
		}
		const buf = [line];
		i += 1;
		while (i < lines.length && lines[i]?.trim() && !/^(#{1,4} |```|\s*[-*]\s+|\s*\d+\.\s+|> |\|)/.test(lines[i] ?? "")) {
			buf.push(lines[i] ?? "");
			i += 1;
		}
		blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-relaxed text-fg/90",
			children: inline(buf.join(" "))
		}, k++));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-4", className),
		children: [matter ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[var(--radius-md)] border border-border bg-raised/60 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "stamp mb-2",
				children: "Frontmatter"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "font-mono text-[0.75rem] leading-relaxed text-muted whitespace-pre-wrap",
				children: matter
			})]
		}) : null, blocks]
	});
}
function Anvil() {
	const status = useForge((s) => s.status);
	const error = useForge((s) => s.error);
	const result = useForge((s) => s.result);
	const selectedPath = useForge((s) => s.selectedPath);
	const streaming = useForge((s) => s.streaming);
	const vault = useForge((s) => s.vault);
	const activeRunId = useForge((s) => s.activeRunId);
	const skill = result?.skills.find((s) => s.path === selectedPath) ?? result?.skills[0];
	const verify = result ? verificationState(result) : null;
	const run = vault.find((r) => r.id === activeRunId);
	function copySkill() {
		if (!skill) return;
		navigator.clipboard.writeText(skill.content);
		toast("Skill copied");
	}
	function downloadSkill() {
		if (!skill) return;
		downloadText(filenameFromPath(skill.path), skill.content);
	}
	function downloadPack() {
		if (!run) return;
		downloadText(`${slugify(run.title)}-pack.md`, packMarkdown(run));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "stamp",
					children: "Anvil"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl tracking-tight",
					children: "Tempered output"
				})] }), skill ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							onClick: copySkill,
							"aria-label": "Copy skill",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							onClick: downloadSkill,
							"aria-label": "Download skill",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {})
						}),
						run && result && result.skills.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							onClick: downloadPack,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Files, {}), "Pack"]
						}) : null
					]
				}) : null]
			}),
			status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 shrink-0 rounded-[var(--radius-lg)] border border-danger/40 bg-danger/10 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-danger",
					children: "Forge fault"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-fg/80",
					children: error
				})]
			}) : null,
			!result && status !== "forging" && status !== "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyAnvil, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex min-h-0 flex-1 flex-col gap-3",
				children: [
					result && result.fileList.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "stamp",
								children: "File list"
							}), verify ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("stamp", verify.match ? "text-ok" : "text-danger"),
								children: verify.match ? "Match" : "Drift"
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: result.fileList.map((file) => {
							const selected = file.path === (skill?.path ?? selectedPath);
							const produced = result.skills.some((s) => s.path === file.path);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => useForge.getState().selectPath(file.path),
								className: cn("flex w-full flex-col items-start gap-0.5 px-3 py-2.5 text-left transition-colors duration-150", selected ? "bg-raised" : "hover:bg-raised/50"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[0.75rem] text-primary",
									children: file.path
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted",
									children: [file.purpose, !produced && status === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-2 text-danger",
										children: "missing"
									}) : null]
								})]
							}) }, file.path);
						}) })]
					}) : status === "forging" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "stamp shimmer shrink-0",
						children: "Reading the whole thread — not the last message"
					}) : null,
					skill ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "min-h-0 flex-1 overflow-y-auto rounded-[var(--radius-lg)] border border-border bg-surface p-4 sm:p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "stamp mb-3",
							children: skill.path
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownView, { source: skill.content })]
					}) : status === "forging" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "min-h-40 flex-1 overflow-auto whitespace-pre-wrap rounded-[var(--radius-lg)] border border-border bg-surface p-4 font-mono text-[0.75rem] leading-relaxed text-muted",
						children: streaming || "Heat rising…"
					}) : null,
					result?.verification ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex shrink-0 items-start gap-2 rounded-[var(--radius-md)] border border-border bg-bg px-3 py-2.5 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-ok" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: result.verification })]
					}) : null
				]
			})
		]
	});
}
function EmptyAnvil() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 flex min-h-52 flex-1 flex-col items-start justify-center rounded-[var(--radius-xl)] border border-dashed border-border bg-surface/40 px-6 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnvilMark, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 font-display text-2xl tracking-tight",
				children: "The anvil is cold"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-sm text-sm leading-relaxed text-muted",
				children: "Load a sample, paste a conversation, then strike. Or open a tempered demo to inspect a finished skill.md."
			})
		]
	});
}
function AnvilMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 72 48",
		className: "h-10 w-16 text-primary",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M6 14h60l-6 8H12L6 14zm10 8h40v6H16v-6zm12 6h16v12h10v4H18v-4h10V28z"
		})
	});
}
function slugify(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "artifact-pack";
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("w-full min-h-44 resize-y rounded-[var(--radius-md)] border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-fg placeholder:text-faint", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50", className),
		...props
	});
}
async function runForge(input) {
	const store = useForge.getState();
	store.startForge();
	let res;
	try {
		res = await fetch("/api/forge", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "text/event-stream"
			},
			body: JSON.stringify({
				transcript: input.transcript,
				hint: input.hint,
				mode: input.mode,
				previous: input.previous
			}),
			signal: input.signal
		});
	} catch (err) {
		if (input.signal.aborted) {
			store.failForge("Halted.");
			throw err;
		}
		store.failForge("Could not reach the forge.");
		throw err;
	}
	if (!res.ok) {
		let message = `Forge failed (${res.status})`;
		try {
			const body = await res.json();
			if (body.error) message = body.error;
		} catch {}
		store.failForge(message);
		throw new Error(message);
	}
	if (!res.body) {
		store.failForge("Empty response from the forge.");
		throw new Error("empty");
	}
	const reader = res.body.getReader();
	const decoder = new TextDecoder();
	let raw = "";
	let buffer = "";
	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			buffer += decoder.decode(value, { stream: true });
			const frames = buffer.split("\n\n");
			buffer = frames.pop() ?? "";
			for (const frame of frames) {
				const line = frame.split("\n").filter((l) => l.startsWith("data:")).map((l) => l.slice(5).trim()).join("");
				if (!line || line === "[DONE]") continue;
				try {
					const payload = JSON.parse(line);
					if (payload.error) {
						store.failForge(payload.error);
						throw new Error(payload.error);
					}
					if (payload.t) {
						raw += payload.t;
						const partial = parseForgeOutput(raw);
						store.pushStream(raw, activeStageFromText(raw, true), partial);
					}
				} catch (err) {
					if (err instanceof SyntaxError) continue;
					throw err;
				}
			}
		}
	} catch (err) {
		if (input.signal.aborted) {
			store.failForge("Halted.");
			throw err;
		}
		throw err;
	}
	if (!raw.trim()) {
		store.failForge("The forge returned nothing. Try a longer transcript.");
		throw new Error("empty");
	}
	store.finishForge(raw);
}
var MIN = 200;
var MAX = 8e4;
function Crucible() {
	const fileRef = (0, import_react.useRef)(null);
	const abortRef = (0, import_react.useRef)(null);
	const transcript = useForge((s) => s.transcript);
	const hint = useForge((s) => s.hint);
	const status = useForge((s) => s.status);
	const aiAvailable = useForge((s) => s.aiAvailable);
	const result = useForge((s) => s.result);
	const forging = status === "forging";
	const count = transcript.trim().length;
	const over = count > MAX;
	const under = count > 0 && count < MIN;
	async function onForge(mode) {
		if (forging) return;
		if (over || count < MIN) {
			toast(count < MIN ? "Need at least 200 characters of conversation." : "Transcript is over the cap.");
			return;
		}
		abortRef.current?.abort();
		const controller = new AbortController();
		abortRef.current = controller;
		try {
			await runForge({
				transcript,
				hint,
				mode,
				previous: mode === "deepen" ? result?.raw || void 0 : void 0,
				signal: controller.signal
			});
		} catch (err) {
			if (err.name === "AbortError") return;
		}
	}
	function onFile(file) {
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			const text = String(reader.result ?? "");
			useForge.getState().setTranscript(text.slice(0, MAX));
		};
		reader.readAsText(file);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex h-full min-h-0 flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "stamp",
					children: "Crucible"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl tracking-tight",
					children: "Paste the whole thread"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("stamp tabular-nums", over && "text-danger", under && "text-danger"),
					children: [
						count.toLocaleString(),
						" / ",
						MAX.toLocaleString()
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 flex-wrap gap-2",
				children: [SAMPLES.map((sample) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => useForge.getState().loadSample(sample.id),
					className: "h-11 rounded-full border border-border bg-surface px-3.5 text-sm text-muted transition-colors duration-150 hover:text-fg",
					children: sample.title
				}, sample.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => useForge.getState().loadDemo(),
					className: "h-11 rounded-full border border-border bg-surface px-3.5 text-sm text-muted transition-colors duration-150 hover:text-fg",
					children: "Load tempered demo"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: transcript,
					onChange: (e) => useForge.getState().setTranscript(e.target.value),
					onKeyDown: (e) => {
						if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
							e.preventDefault();
							onForge("forge");
						}
					},
					placeholder: "USER: …\nASSISTANT: …\n\nDrop the entire conversation. The last message is usually a costume.",
					className: "h-full min-h-44 font-mono text-[0.8125rem] leading-relaxed",
					spellCheck: false
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "stamp",
					children: "Optional signal — what they kept optimizing for"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: hint,
					onChange: (e) => useForge.getState().setHint(e.target.value),
					maxLength: 2e3,
					placeholder: "Reusable depth. Verbatim templates. Not the last ask.",
					className: "mt-2 h-11 w-full rounded-[var(--radius-md)] border border-border bg-bg px-4 text-sm text-fg placeholder:text-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "lg",
						disabled: forging || aiAvailable === false,
						onClick: () => void onForge("forge"),
						className: "min-w-36",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hammer, {}), forging ? "Striking…" : "Forge"]
					}),
					result && !forging ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						disabled: aiAvailable === false,
						onClick: () => void onForge("deepen"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "Deepen"]
					}) : null,
					forging ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						onClick: () => abortRef.current?.abort(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {}), "Halt"]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						onClick: () => fileRef.current?.click(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {}), "Import"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: ".txt,.md,.json",
						className: "hidden",
						onChange: (e) => {
							onFile(e.target.files?.[0]);
							e.target.value = "";
						}
					}),
					aiAvailable === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Live forge is unavailable. Load the tempered demo to see a finished skill."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "⌘/Ctrl + Enter to strike"
					})
				]
			})
		]
	});
}
function StageRail() {
	const active = useForge((s) => s.activeStage);
	const status = useForge((s) => s.status);
	const notes = useForge((s) => s.result?.stageNotes);
	const activeIndex = STAGES.findIndex((s) => s.id === active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
		children: STAGES.map((stage, index) => {
			const done = status === "done" || activeIndex >= 0 && index < activeIndex;
			const current = stage.id === active && status === "forging";
			const note = notes?.[stage.id];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				title: note || stage.full,
				className: cn("flex min-w-[5.5rem] flex-1 items-center gap-2 rounded-[var(--radius-sm)] border px-2.5 py-2", current ? "border-primary/40 bg-raised" : done ? "border-border bg-surface" : "border-border/70 bg-bg"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 shrink-0 rounded-full", current && "bg-primary animate-[maf-heat_1.2s_ease-in-out_infinite]", done && !current && "bg-ok", !done && !current && "bg-faint") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("text-xs font-medium sm:text-sm", current || done ? "text-fg" : "text-muted", current && "shimmer"),
					children: stage.label
				})]
			}, stage.id);
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-[1600px] flex-col px-4 pb-5 pt-5 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 hidden min-h-0 flex-1 lg:flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(qt, {
					orientation: "horizontal",
					className: "h-full w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qt, {
							id: "crucible",
							defaultSize: 44,
							minSize: 30,
							className: "pr-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crucible, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(nn, { className: "mx-1 w-2 rounded-full bg-border hover:bg-primary/50" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qt, {
							id: "anvil",
							defaultSize: 56,
							minSize: 36,
							className: "pl-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anvil, {})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-10 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crucible, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anvil, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageRail, {})
			})
		]
	}) });
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "font-display text-4xl leading-none tracking-[-0.03em] sm:text-5xl",
			children: ["Artifact ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
				className: "italic font-normal text-primary",
				children: "Forge"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-md text-sm leading-relaxed text-muted sm:text-right",
			children: "Reread the whole conversation at two altitudes. Keep the gold verbatim. Ship a skill a future agent can run — not a summary of the last message."
		})]
	});
}
//#endregion
export { Home as component };
