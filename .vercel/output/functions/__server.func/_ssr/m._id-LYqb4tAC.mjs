import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/m._id-LYqb4tAC.js
var import_jsx_runtime = require_jsx_runtime();
function MurmurMissing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-16 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted uppercase",
				children: "Gone quiet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-3xl tracking-tight",
				children: "This murmur is not here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-md text-sm leading-relaxed text-muted",
				children: "It may have been a bad link. The rest of the room is still open."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-6 inline-flex h-11 w-fit items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground",
				children: "Back to the room"
			})
		]
	});
}
//#endregion
export { MurmurMissing as notFoundComponent };
