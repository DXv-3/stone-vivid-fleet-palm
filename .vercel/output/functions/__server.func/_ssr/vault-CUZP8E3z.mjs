import { S as useNavigate, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Archive, r as Trash2 } from "../_libs/lucide-react.mjs";
import { r as Shell, u as useForge } from "./shell-CApQZsb8.mjs";
import { t as Button } from "./button-CqgD1p1I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vault-CUZP8E3z.js
var import_jsx_runtime = require_jsx_runtime();
function VaultPage() {
	const vault = useForge((s) => s.vault);
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "stamp",
				children: "Vault"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
				children: "Tempered skills"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-lg text-sm leading-relaxed text-muted",
				children: "Forgings stay on this device. Open one to return it to the anvil."
			}),
			vault.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 rounded-[var(--radius-xl)] border border-dashed border-border px-6 py-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, {
						className: "mx-auto size-8 text-muted",
						strokeWidth: 1.5
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-xl",
						children: "Empty vault"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Strike a conversation on the floor, or load the tempered demo."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6",
						onClick: () => {
							useForge.getState().loadDemo();
							navigate({ to: "/" });
						},
						children: "Load demo"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-10 space-y-3",
				children: vault.map((run) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4 sm:p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "min-w-0 text-left",
							onClick: () => {
								useForge.getState().loadRun(run.id);
								navigate({ to: "/" });
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl tracking-tight",
									children: run.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 stamp",
									children: [
										new Date(run.createdAt).toLocaleString(),
										" · ",
										run.result.skills.length,
										" file",
										run.result.skills.length === 1 ? "" : "s"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 line-clamp-2 text-sm text-muted",
									children: run.sourcePreview
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": "Delete forging",
							onClick: () => useForge.getState().deleteRun(run.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
						})]
					})
				}, run.id))
			})
		]
	}) });
}
//#endregion
export { VaultPage as component };
