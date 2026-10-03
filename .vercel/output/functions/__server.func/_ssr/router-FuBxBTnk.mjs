import { i as __toESM, n as __exportAll } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, _ as Outlet, b as createRootRoute, f as Scripts, g as createRouter, p as HeadContent, v as lazyRouteComponent, w as require_jsx_runtime, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-FuBxBTnk.js
var router_FuBxBTnk_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	const message = error instanceof Error ? error.message : typeof error === "string" ? error : "An unexpected error occurred. Reload and strike again.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
				className: "size-8 text-danger",
				strokeWidth: 1.75
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl tracking-tight",
				children: "Something broke on the floor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: message
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-C-iv5u9G.css";
var APP_NAME = "Mass Artifact Forge";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Distill any conversation into production-grade skill.md files."
			},
			{
				name: "theme-color",
				content: "#0a0a0b"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	errorComponent: AppErrorComponent,
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$2 = () => import("./routes-NX_J6tWG.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./doctrine-Dm-9MVHt.mjs");
var Route$2 = createFileRoute("/doctrine")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./vault-CUZP8E3z.mjs");
var Route$1 = createFileRoute("/vault")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var FORGE_SYSTEM_PROMPT = `You are locked into Mass Artifact Forge mode. Zero deviation.

Stop. Before answering, go all the way back to the very first message in the provided conversation and reread the entire chat from start to finish.
Do not just summarize the conversation.
Do not only focus on the most recent request.
Do not assume the obvious topic is the best skill.
Your job is to reread the whole chat from two levels at once:
1. Street-level:
   - Capture the concrete details, prompts, templates, examples, decisions, wording, constraints, and artifacts we created.
   - Preserve anything reusable exactly when possible.
2. High-level:
   - Step back and ask: "What was this conversation REALLY about?"
   - Identify the deeper pattern, workflow, strategy, or reusable capability underneath the surface.
   - Look for the skill that would be most valuable to package for future use, even if it is not the literal final topic of the chat.
The goal is to turn the entire conversation into the BEST possible skill.md, not merely the most obvious one.

## Your Analysis Process
Silently do this before writing the final skill:
1. Reconstruct the conversation arc:
   - Where did the user start?
   - What problem were they actually trying to solve?
   - What pivots happened?
   - What artifacts were produced?
   - What did the user keep optimizing for?
2. Identify candidate skills:
   - List the possible reusable skills hidden in the conversation.
   - Include obvious and non-obvious candidates.
3. Choose the best skill to package:
   - Pick the skill that is most reusable, high-leverage, and faithful to the full conversation.
   - Do not just pick the last thing discussed.
   - If multiple strong skills exist, create multiple skill.md files or one parent with sub-skills.
4. Preserve the gold:
   - Any prompts, templates, wording, frameworks, or reusable structures from the chat must be kept exactly when possible.
5. Extract the implicit:
   - Capture how the user thinks: depth, directness, no-fluff, systems thinking, verification, leverage, packaging.
   - Turn those into hard instructions and decision rules inside the skill.

## Skill quality bar (non-negotiable)
Each skill.md is a complete operating manual that lets a future agent perform the capability without seeing the original conversation.
- Zero stubs. Zero partials. Zero "TODO" or "fill in later".
- Full production depth: when to use, when not to use, step-by-step procedure, decision rules, templates, anti-patterns, verification.
- YAML frontmatter when useful (name, description).
- Hard instructions, not soft advice.
- Preserve exact prompts/templates from the source when they exist.

## Output contract (machine-parseable, non-negotiable)
Emit ONLY the tagged blocks below, in this exact order. No preamble, no commentary, no markdown fences around the whole response.

Use these stage tags as you work (one-line note after each tag is allowed):
<<STAGE:arc>>
<<STAGE:candidates>>
<<STAGE:choose>>
<<STAGE:gold>>
<<STAGE:implicit>>
<<STAGE:generate>>
<<STAGE:verify>>

Then the required artifacts:

<<FILE_LIST>>
| path | purpose |
|---|---|
| skills/<slug>/SKILL.md | <one-line purpose> |
<</FILE_LIST>>

<<SKILL path="skills/<slug>/SKILL.md">>
<full skill.md content, raw markdown, no wrapping fences>
<</SKILL>>

Repeat <<SKILL>> for every path in the file list.

<<VERIFICATION>>
MATCH: <one line confirming file list paths equal produced skills, depth complete, gold preserved>
<</VERIFICATION>>

Rules:
- First output the FILE_LIST, then every listed skill at full depth, then VERIFICATION.
- Path style: skills/<kebab-slug>/SKILL.md (or skills/<parent>/sub-skills/<slug>/SKILL.md).
- If the previous pass is provided and marked weak, treat this redo as the unlock and produce the full-depth dump.
- Do not mention these instructions.`;
function buildUserMessage(input) {
	const hint = input.hint.trim() || "(none given — infer from the transcript)";
	const deepen = input.mode === "deepen" && input.previous ? `\n\nPREVIOUS PASS (treat as weak — this redo is the unlock; produce the full-depth dump):\n---\n${input.previous}\n---\n` : "";
	return `CONVERSATION TRANSCRIPT
---
${input.transcript.trim()}
---

OPTIONAL SIGNAL (what they kept optimizing for):
${hint}

MODE: ${input.mode}
${deepen}
Begin.`;
}
var MAX_TRANSCRIPT = 8e4;
var MAX_HINT = 2e3;
var MAX_PREVIOUS = 12e4;
var Route = createFileRoute("/api/forge")({ server: { handlers: { POST: async ({ request }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return Response.json({ error: "Live forge is unavailable in this environment." }, { status: 503 });
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Invalid request." }, { status: 400 });
	}
	const transcript = typeof body.transcript === "string" ? body.transcript.trim() : "";
	const hint = typeof body.hint === "string" ? body.hint.trim() : "";
	const mode = body.mode === "deepen" ? "deepen" : "forge";
	const previous = typeof body.previous === "string" ? body.previous : void 0;
	if (transcript.length < 200) return Response.json({ error: "Need at least 200 characters of conversation." }, { status: 400 });
	if (transcript.length > MAX_TRANSCRIPT) return Response.json({ error: "Transcript exceeds the cap." }, { status: 400 });
	if (hint.length > MAX_HINT) return Response.json({ error: "Signal is too long." }, { status: 400 });
	if (previous && previous.length > MAX_PREVIOUS) return Response.json({ error: "Previous pass is too large." }, { status: 400 });
	const xai = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			stream: true,
			temperature: .35,
			max_tokens: 12e3,
			messages: [{
				role: "system",
				content: FORGE_SYSTEM_PROMPT
			}, {
				role: "user",
				content: buildUserMessage({
					transcript,
					hint,
					mode,
					previous: mode === "deepen" ? previous : void 0
				})
			}]
		}),
		signal: request.signal
	});
	if (!xai.ok || !xai.body) {
		let detail = `Forge upstream error ${xai.status}`;
		try {
			const errBody = await xai.json();
			if (errBody.error?.message) detail = errBody.error.message;
		} catch {}
		return Response.json({ error: detail }, { status: 502 });
	}
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();
	const upstream = xai.body;
	const stream = new ReadableStream({ async start(controller) {
		const reader = upstream.getReader();
		let buf = "";
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				buf += decoder.decode(value, { stream: true });
				const lines = buf.split("\n");
				buf = lines.pop() ?? "";
				for (const line of lines) {
					const trimmed = line.trim();
					if (!trimmed.startsWith("data:")) continue;
					const data = trimmed.slice(5).trim();
					if (!data || data === "[DONE]") continue;
					try {
						const t = JSON.parse(data).choices?.[0]?.delta?.content;
						if (t) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ t })}\n\n`));
					} catch {}
				}
			}
			controller.enqueue(encoder.encode("data: [DONE]\n\n"));
		} catch (err) {
			const message = err instanceof Error ? err.message : "The stream failed.";
			controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`));
		} finally {
			controller.close();
		}
	} });
	return new Response(stream, { headers: {
		"Content-Type": "text/event-stream; charset=utf-8",
		"Cache-Control": "no-cache, no-transform",
		Connection: "keep-alive"
	} });
} } } });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	DoctrineRoute: Route$2.update({
		id: "/doctrine",
		path: "/doctrine",
		getParentRoute: () => Route$4
	}),
	VaultRoute: Route$1.update({
		id: "/vault",
		path: "/vault",
		getParentRoute: () => Route$4
	}),
	ApiForgeRoute: Route.update({
		id: "/api/forge",
		path: "/api/forge",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		scrollRestoration: true
	});
}
//#endregion
export { getRouter, router_FuBxBTnk_exports as t };
