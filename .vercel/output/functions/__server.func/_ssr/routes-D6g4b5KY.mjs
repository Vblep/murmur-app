import { o as __toESM } from "../_runtime.mjs";
import { n as TOPIC_BY_ID, t as TOPICS } from "./schema-CG-QKQiz.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as MessageCircle, i as Moon } from "../_libs/lucide-react.mjs";
import { c as cn, f as listMurmurs, o as useCompose, r as Route$1, s as Button, u as getMineIds } from "./router-kFhwgF3e.mjs";
import { t as RelativeTime } from "./relative-time-CacNAk_T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D6g4b5KY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MurmurCard({ murmur }) {
	const topic = TOPIC_BY_ID[murmur.topic];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/m/$id",
		params: { id: String(murmur.id) },
		className: "feed-card block rounded-xl bg-card p-5 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)] active:scale-[0.99]",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-serif text-xl leading-snug font-medium tracking-tight text-foreground",
				children: murmur.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: [murmur.excerpt, murmur.truncated ? "…" : ""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-4 text-xs text-faint",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-3.5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: murmur.replyCount
						}),
						murmur.replyCount === 1 ? "reply" : "replies"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums",
					children: [murmur.heardCount, " heard"]
				})]
			})
		]
	});
}
var SORTS = [
	{
		id: "latest",
		label: "Latest"
	},
	{
		id: "unanswered",
		label: "Unanswered"
	},
	{
		id: "heard",
		label: "Most heard"
	}
];
function Home() {
	const { murmurs, stats } = Route$1.useLoaderData();
	const search = Route$1.useSearch();
	const { openCompose } = useCompose();
	const [minePosts, setMinePosts] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!search.mine) {
			setMinePosts(null);
			return;
		}
		const ids = getMineIds();
		let cancelled = false;
		listMurmurs({ data: { ids } }).then((rows) => {
			if (!cancelled) setMinePosts(rows);
		});
		return () => {
			cancelled = true;
		};
	}, [search.mine, murmurs]);
	const feed = search.mine ? minePosts ?? [] : murmurs;
	const loadingMine = Boolean(search.mine && minePosts === null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pt-10 pb-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "murmur-rise",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-widest text-muted uppercase",
						children: "Speak freely. Stay unnamed."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-serif text-4xl leading-tight font-medium tracking-tight sm:text-5xl",
						children: "Leave what you cannot say out loud."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "murmur-rise murmur-rise-1 mt-4 max-w-lg text-base leading-relaxed text-muted",
						children: "An anonymous room for problems and the strangers who answer them. No profiles. No trail. Just the page, and whoever is listening."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "murmur-rise murmur-rise-2 mt-5 text-sm text-faint tabular-nums",
						children: [
							stats.murmurs,
							" ",
							stats.murmurs === 1 ? "murmur" : "murmurs",
							" ·",
							" ",
							stats.replies,
							" ",
							stats.replies === 1 ? "reply" : "replies"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "murmur-rise murmur-rise-3 mt-8 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						active: !search.topic && !search.mine,
						to: "/",
						search: {
							topic: void 0,
							sort: search.sort,
							mine: void 0
						},
						children: "All"
					}),
					TOPICS.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						active: search.topic === topic.id && !search.mine,
						to: "/",
						search: {
							topic: topic.id,
							sort: search.sort,
							mine: void 0
						},
						children: topic.label
					}, topic.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						active: Boolean(search.mine),
						to: "/",
						search: {
							topic: void 0,
							sort: void 0,
							mine: true
						},
						children: "Yours"
					})
				]
			}),
			!search.mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "murmur-rise murmur-rise-4 mt-4 flex flex-wrap gap-1",
				children: SORTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					search: {
						topic: search.topic,
						sort: item.id === "latest" ? void 0 : item.id,
						mine: void 0
					},
					className: cn("inline-flex h-9 items-center rounded-md px-2.5 text-sm transition-colors duration-150", (search.sort ?? "latest") === item.id ? "text-foreground" : "text-faint hover:text-muted"),
					children: item.label
				}, item.id))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6 flex flex-col gap-3",
				children: loadingMine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuietEmpty, {
					title: "Looking for what you left.",
					copy: "Posts from this device stay with the browser, not with an account."
				}) : feed.length === 0 ? search.mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuietEmpty, {
					title: "Nothing from this device yet.",
					copy: "When you leave a murmur here, you can find it again on this browser.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: openCompose,
						className: "mt-2",
						children: "Share one"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuietEmpty, {
					title: "The room is quiet.",
					copy: "Be the first to speak, or switch the filter.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: openCompose,
						className: "mt-2",
						children: "Leave a murmur"
					})
				}) : feed.map((murmur) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MurmurCard, { murmur }, murmur.id))
			})
		]
	});
}
function FilterChip({ active, children, to, search }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		search,
		className: cn("inline-flex h-9 items-center rounded-full px-3 text-sm transition-[background-color,color,box-shadow] duration-150", active ? "bg-primary text-primary-foreground" : "text-muted shadow-[var(--shadow-border)] hover:text-foreground"),
		children
	});
}
function QuietEmpty({ title, copy, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-start rounded-xl bg-card px-5 py-10 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-5 text-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-serif text-2xl tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-sm text-sm leading-relaxed text-muted",
				children: copy
			}),
			action
		]
	});
}
//#endregion
export { Home as component };
