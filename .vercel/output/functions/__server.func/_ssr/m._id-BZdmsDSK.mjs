import { o as __toESM } from "../_runtime.mjs";
import { c as replySchema, n as TOPIC_BY_ID } from "./schema-CG-QKQiz.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as ArrowLeft, o as HandHeart, r as Repeat2, s as Ear } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Label, c as cn, d as getReactionState, i as Textarea, l as createReply, m as toggleReaction, n as Route, p as setReactionState, s as Button } from "./router-kFhwgF3e.mjs";
import { t as RelativeTime } from "./relative-time-CacNAk_T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/m._id-BZdmsDSK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REACTIONS = [
	{
		kind: "heard",
		label: "Heard",
		Icon: Ear
	},
	{
		kind: "same",
		label: "Same",
		Icon: Repeat2
	},
	{
		kind: "strength",
		label: "Strength",
		Icon: HandHeart
	}
];
function ReactionBar({ murmurId, heardCount, sameCount, strengthCount }) {
	const [counts, setCounts] = (0, import_react.useState)({
		heard: heardCount,
		same: sameCount,
		strength: strengthCount
	});
	const [active, setActive] = (0, import_react.useState)(() => getReactionState(murmurId));
	const [pending, setPending] = (0, import_react.useState)(null);
	async function onToggle(kind) {
		if (pending) return;
		const nextOn = !active[kind];
		setPending(kind);
		setActive((current) => ({
			...current,
			[kind]: nextOn
		}));
		setCounts((current) => ({
			...current,
			[kind]: Math.max(0, current[kind] + (nextOn ? 1 : -1))
		}));
		setReactionState(murmurId, kind, nextOn);
		try {
			const result = await toggleReaction({ data: {
				id: murmurId,
				kind,
				on: nextOn
			} });
			setCounts({
				heard: result.heardCount,
				same: result.sameCount,
				strength: result.strengthCount
			});
		} catch {
			setActive((current) => ({
				...current,
				[kind]: !nextOn
			}));
			setCounts((current) => ({
				...current,
				[kind]: Math.max(0, current[kind] + (nextOn ? -1 : 1))
			}));
			setReactionState(murmurId, kind, !nextOn);
		} finally {
			setPending(null);
		}
	}
	const valueFor = (kind) => counts[kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: REACTIONS.map(({ kind, label, Icon }) => {
			const on = active[kind];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onToggle(kind),
				disabled: pending === kind,
				"aria-pressed": on,
				className: cn("inline-flex h-11 items-center gap-2 rounded-full px-3.5 text-sm transition-[background-color,color,box-shadow] duration-150", on ? "bg-primary text-primary-foreground" : "text-muted shadow-[var(--shadow-border)] hover:text-foreground"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
					label,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-xs opacity-80",
						children: valueFor(kind)
					})
				]
			}, kind);
		})
	});
}
function MurmurPage() {
	const murmur = Route.useLoaderData();
	const topic = TOPIC_BY_ID[murmur.topic];
	const router = useRouter();
	const [body, setBody] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	async function onSubmit(event) {
		event.preventDefault();
		const parsed = replySchema.safeParse({
			murmurId: murmur.id,
			body
		});
		if (!parsed.success) {
			setError(parsed.error.issues[0]?.message ?? "Check what you wrote.");
			return;
		}
		setPending(true);
		setError(null);
		try {
			await createReply({ data: parsed.data });
			setBody("");
			toast("Left without a name.");
			await router.invalidate();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not leave that reply.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-2xl flex-1 px-4 pt-8 pb-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex h-11 items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "The room"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "murmur-rise mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tracking-wide uppercase",
								children: topic.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelativeTime, { date: murmur.createdAt })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-serif text-3xl leading-tight font-medium tracking-tight sm:text-4xl",
						children: murmur.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 whitespace-pre-wrap text-base leading-relaxed text-foreground/90",
						children: murmur.body
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "murmur-rise murmur-rise-2 mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactionBar, {
					murmurId: murmur.id,
					heardCount: murmur.heardCount,
					sameCount: murmur.sameCount,
					strengthCount: murmur.strengthCount
				}, murmur.id)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "murmur-rise murmur-rise-3 mt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl tracking-tight",
						children: murmur.replies.length === 0 ? "No replies yet" : murmur.replies.length === 1 ? "1 reply" : `${murmur.replies.length} replies`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Answer as a stranger. Be specific, and be kind."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "mt-5 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "reply-body",
								className: "sr-only",
								children: "Your reply"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "reply-body",
								value: body,
								onChange: (event) => setBody(event.target.value),
								maxLength: 600,
								placeholder: "Write back without introducing yourself.",
								className: "min-h-28"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs tabular-nums text-faint",
									children: [body.trim().length, "/600"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: pending,
									size: "sm",
									children: pending ? "Sending…" : "Reply anonymously"
								})]
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-danger",
								role: "alert",
								children: error
							}) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 flex flex-col gap-3",
				children: murmur.replies.map((reply) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl bg-card px-5 py-5 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs tracking-wide text-faint uppercase",
						children: [
							"Someone in the room ·",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelativeTime, { date: reply.createdAt })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90",
						children: reply.body
					})]
				}, reply.id))
			})
		]
	});
}
//#endregion
export { MurmurPage as component };
