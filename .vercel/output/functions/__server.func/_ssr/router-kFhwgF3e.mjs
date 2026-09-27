import { o as __toESM } from "../_runtime.mjs";
import { a as number, c as union, i as literal, o as object, s as string } from "../_libs/zod.mjs";
import { a as listMurmursSchema, c as replySchema, i as isTopicId, o as murmurIdSchema, r as composeSchema, s as reactSchema, t as TOPICS } from "./schema-CG-QKQiz.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createFileRoute, b as useRouter, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, q as notFound, v as createRootRoute, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, l as Slot, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/murmurs-DB6gPnRI.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-[var(--shadow-border)] hover:bg-primary/90",
			outline: "bg-transparent text-foreground shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] hover:bg-card",
			ghost: "bg-transparent text-muted hover:bg-card hover:text-foreground",
			silent: "bg-transparent text-muted hover:text-foreground"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-sm",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var MINE_KEY = "murmur:mine";
var REACTED_KEY = "murmur:reacted";
function readJson(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const raw = window.localStorage.getItem(key);
		if (!raw) return fallback;
		return JSON.parse(raw);
	} catch {
		return fallback;
	}
}
function writeJson(key, value) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(key, JSON.stringify(value));
}
function getMineIds() {
	return readJson(MINE_KEY, []).filter((id) => Number.isInteger(id) && id > 0);
}
function addMineId(id) {
	writeJson(MINE_KEY, Array.from(/* @__PURE__ */ new Set([id, ...getMineIds()])).slice(0, 80));
}
function getReactionState(id) {
	const entry = readJson(REACTED_KEY, {})[String(id)] ?? {};
	return {
		heard: Boolean(entry.heard),
		same: Boolean(entry.same),
		strength: Boolean(entry.strength)
	};
}
function setReactionState(id, kind, on) {
	const map = readJson(REACTED_KEY, {});
	const key = String(id);
	map[key] = {
		...map[key] ?? {},
		[kind]: on
	};
	writeJson(REACTED_KEY, map);
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
var listMurmurs = createServerFn({ method: "GET" }).validator(listMurmursSchema).handler(createSsrRpc("02be875028ad5f2fba3bbab7ddb33b9529662445b745a80a4985175f22360e4a"));
var getMurmur = createServerFn({ method: "GET" }).validator(murmurIdSchema).handler(createSsrRpc("7fe22b209bb8656a63c1fff25bc069f7cdcd8bd9ab0f962fdf4f1e411a96968e"));
var getRoomStats = createServerFn({ method: "POST" }).handler(createSsrRpc("9c9c2d04ed7d0765d9641f0ba18e3c1e124262fc3a258c9abd70d7608b1cc936"));
var createMurmur = createServerFn({ method: "POST" }).validator(composeSchema).handler(createSsrRpc("71ecbeafc259a9e7354633fa78b87854d1421ec8ea631a1a9bcf00cec8380465"));
var createReply = createServerFn({ method: "POST" }).validator(replySchema).handler(createSsrRpc("6106eebb77c809e5fc6fa9f1bf7fd5f37e11189db271eaf4b2dd1fbb907020d4"));
var toggleReaction = createServerFn({ method: "POST" }).validator(reactSchema).handler(createSsrRpc("1c64abd9d4585125730d30e7a2c0edba7611499358a1489c7b741f743bd21cd7"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-kFhwgF3e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6 text-center text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-8",
					strokeWidth: 1.75
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-2xl font-medium tracking-tight",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm leading-relaxed break-words text-muted",
				children: errorMessage(error)
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
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
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
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
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
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
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
var ComposeContext = (0, import_react.createContext)(null);
function ComposeProvider({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const openCompose = (0, import_react.useCallback)(() => setOpen(true), []);
	const value = (0, import_react.useMemo)(() => ({
		open,
		setOpen,
		openCompose
	}), [open, openCompose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComposeContext.Provider, {
		value,
		children
	});
}
function useCompose() {
	const ctx = (0, import_react.useContext)(ComposeContext);
	if (!ctx) throw new Error("useCompose must be used within ComposeProvider");
	return ctx;
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-background/80 data-[state=open]:animate-none", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-card p-5 shadow-[var(--shadow-border)] outline-none sm:p-6 max-md:top-0 max-md:left-0 max-md:h-[100dvh] max-md:w-full max-md:max-w-none max-md:translate-x-0 max-md:translate-y-0 max-md:rounded-none max-md:p-5", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-4 right-4 rounded-md p-2 text-muted transition-colors duration-150 hover:bg-card-2 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 pr-8", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-serif text-2xl leading-snug font-medium tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm leading-relaxed text-muted", className),
		...props
	});
}
function Input({ className, type = "text", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md bg-card-2 px-3 text-base text-foreground shadow-[var(--shadow-border)] transition-[box-shadow,background-color] duration-150 placeholder:text-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 md:text-sm", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-sm font-medium text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-36 w-full resize-y rounded-lg bg-card-2 px-3 py-3 text-base leading-relaxed text-foreground shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 placeholder:text-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 md:text-sm", className),
		...props
	});
}
function ComposeDialog() {
	const { open, setOpen } = useCompose();
	const router = useRouter();
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [topic, setTopic] = (0, import_react.useState)("heart");
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	function reset() {
		setTitle("");
		setBody("");
		setTopic("heart");
		setError(null);
	}
	async function onSubmit(event) {
		event.preventDefault();
		const parsed = composeSchema.safeParse({
			title,
			body,
			topic
		});
		if (!parsed.success) {
			setError(parsed.error.issues[0]?.message ?? "Check what you wrote.");
			return;
		}
		setPending(true);
		setError(null);
		try {
			const created = await createMurmur({ data: parsed.data });
			addMineId(created.id);
			reset();
			setOpen(false);
			toast("It's in the room.");
			await router.invalidate();
			await router.navigate({
				to: "/m/$id",
				params: { id: String(created.id) }
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not leave that murmur.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			setOpen(next);
			if (!next) setError(null);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"aria-describedby": "compose-copy",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Leave a murmur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
				id: "compose-copy",
				children: "No name is attached. Skip details that could identify you or anyone else."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "flex flex-col gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "text-sm font-medium",
								children: "Topic"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: TOPICS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setTopic(item.id),
									className: cn("h-9 rounded-full px-3 text-sm transition-[background-color,color,box-shadow] duration-150", topic === item.id ? "bg-primary text-primary-foreground" : "text-muted shadow-[var(--shadow-border)] hover:text-foreground"),
									children: item.label
								}, item.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-faint",
								children: TOPICS.find((item) => item.id === topic)?.hint
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "murmur-title",
								children: "Quiet title"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "murmur-title",
								value: title,
								onChange: (event) => setTitle(event.target.value),
								maxLength: 80,
								placeholder: "What is this, in a few words?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-right text-xs tabular-nums text-faint",
								children: [title.trim().length, "/80"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "murmur-body",
								children: "The thing itself"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "murmur-body",
								value: body,
								onChange: (event) => setBody(event.target.value),
								maxLength: 1200,
								placeholder: "Write as if the room is dark and kind."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-right text-xs tabular-nums text-faint",
								children: [body.trim().length, "/1,200"]
							})
						]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						role: "alert",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => setOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: pending,
							children: pending ? "Leaving…" : "Leave it here"
						})]
					})
				]
			})]
		})
	});
}
function SiteHeader() {
	const { openCompose } = useCompose();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-2xl items-center justify-between px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "font-serif text-xl tracking-tight italic text-foreground",
				children: "Murmur"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: openCompose,
				className: "px-4",
				children: "Share"
			})]
		})
	});
}
function SiteFooter() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mx-auto mt-auto w-full max-w-2xl px-4 py-10 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 border-t border-border pt-6 text-sm text-faint",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Murmur is not a crisis service. If you are in immediate danger, contact local emergency services." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-x-4 gap-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen(true),
					className: "text-muted transition-colors duration-150 hover:text-foreground",
					children: "How this room works"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "No accounts. Nothing here is tied to a name." })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "How this room works" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "A few quiet rules so the space stays worth being in." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-3 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No names, no profiles, no followers." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Anyone can read. Anyone can reply. Replies are unnamed too." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Leave out emails, addresses, workplaces, and anything that could identify you or someone else." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Be the kind of stranger you would want to meet at two in the morning." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Murmur is a listening room, not medical, legal, or emergency help." })
				]
			})] })
		})]
	});
}
var styles_default = "/assets/styles-mVlaaexr.css";
var APP_NAME = "Murmur";
var Route$2 = createRootRoute({
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
				content: "An anonymous room for the things you cannot say out loud. Leave a problem. Leave a reply. No names."
			},
			{
				name: "theme-color",
				content: "#0b0c0e"
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
				href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap"
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
	component: RootDocument,
	notFoundComponent: RootNotFound
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposeProvider, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-dvh flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComposeDialog, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "bottom-center",
					toastOptions: { style: {
						background: "var(--color-card)",
						color: "var(--color-foreground)",
						border: "1px solid var(--color-border)"
					} }
				})
			] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function RootNotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-16 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted uppercase",
				children: "Quiet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-3xl tracking-tight",
				children: "That page is not in the room."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-md text-sm leading-relaxed text-muted",
				children: "It may have been a mistyped link. The feed is still here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				className: "mt-6 inline-flex h-11 w-fit items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground",
				children: "Back to Murmur"
			})
		]
	});
}
var $$splitComponentImporter$1 = () => import("./routes-D6g4b5KY.mjs");
var Route$1 = createFileRoute("/")({
	validateSearch: (search) => {
		return {
			topic: typeof search.topic === "string" && isTopicId(search.topic) ? search.topic : void 0,
			sort: search.sort === "unanswered" || search.sort === "heard" || search.sort === "latest" ? search.sort : void 0,
			mine: search.mine === true || search.mine === "true" || search.mine === "1" ? true : void 0
		};
	},
	loaderDeps: ({ search }) => ({
		topic: search.topic,
		sort: search.sort
	}),
	loader: async ({ deps }) => {
		const [murmurs, stats] = await Promise.all([listMurmurs({ data: {
			topic: deps.topic,
			sort: deps.sort
		} }), getRoomStats()]);
		return {
			murmurs,
			stats
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./m._id-BZdmsDSK.mjs");
var $$splitNotFoundComponentImporter = () => import("./m._id-LYqb4tAC.mjs");
var Route = createFileRoute("/m/$id")({
	loader: async ({ params }) => {
		const id = Number(params.id);
		if (!Number.isInteger(id) || id <= 0) throw notFound();
		const murmur = await getMurmur({ data: { id } });
		if (!murmur) throw notFound();
		return murmur;
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$1.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	MIdRoute: Route.update({
		id: "/m/$id",
		path: "/m/$id",
		getParentRoute: () => Route$2
	})
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { Label as a, cn as c, getReactionState as d, listMurmurs as f, Textarea as i, createReply as l, toggleReaction as m, Route as n, useCompose as o, setReactionState as p, Route$1 as r, Button as s, router_exports as t, getMineIds as u };
