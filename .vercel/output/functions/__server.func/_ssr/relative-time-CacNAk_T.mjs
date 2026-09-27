import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/relative-time-CacNAk_T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RelativeTime({ date, className }) {
	const parsed = new Date(date);
	const valid = !Number.isNaN(parsed.getTime());
	const iso = valid ? parsed.toISOString() : date;
	const [label, setLabel] = (0, import_react.useState)(() => valid ? formatDistanceToNow(parsed, { addSuffix: true }) : date);
	(0, import_react.useEffect)(() => {
		const next = new Date(date);
		if (Number.isNaN(next.getTime())) {
			setLabel(date);
			return;
		}
		setLabel(formatDistanceToNow(next, { addSuffix: true }));
	}, [date]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
		className,
		dateTime: iso,
		children: label
	});
}
//#endregion
export { RelativeTime as t };
