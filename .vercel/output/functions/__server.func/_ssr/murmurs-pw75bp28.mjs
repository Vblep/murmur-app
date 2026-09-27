import { a as listMurmursSchema, c as replySchema, i as isTopicId, o as murmurIdSchema, r as composeSchema, s as reactSchema } from "./schema-CG-QKQiz.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/murmurs-pw75bp28.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var _0002_murmurs_default = "create table if not exists murmurs (\n  id serial primary key,\n  title text not null,\n  body text not null,\n  topic text not null,\n  heard_count integer not null default 0,\n  same_count integer not null default 0,\n  strength_count integer not null default 0,\n  reply_count integer not null default 0,\n  is_seed boolean not null default false,\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists murmurs_created_at_idx on murmurs (created_at desc);\ncreate index if not exists murmurs_topic_idx on murmurs (topic);\ncreate index if not exists murmurs_reply_count_idx on murmurs (reply_count);\n\ncreate table if not exists replies (\n  id serial primary key,\n  murmur_id integer not null references murmurs(id) on delete cascade,\n  body text not null,\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists replies_murmur_id_idx on replies (murmur_id);\n\ninsert into murmurs (\n  title, body, topic, heard_count, same_count, strength_count, is_seed, created_at\n)\nselect * from (\n  values\n    (\n      'I still rehearse leaving',\n      $m$We haven't been good for each other in a long time, but the apartment is full of our things. I pack a bag in my head every Sunday and unpack it by Monday. I don't know if I'm afraid of being alone or of admitting I already am.$m$,\n      'heart',\n      18,\n      11,\n      7,\n      true,\n      now() - interval '4 days'\n    ),\n    (\n      'The promotion feels like a costume',\n      $m$They keep saying I earned it. I smile in the meetings. At night I look up the job posting again to confirm I even qualify. I am so tired of waiting to be found out.$m$,\n      'work',\n      22,\n      16,\n      9,\n      true,\n      now() - interval '3 days 6 hours'\n    ),\n    (\n      'Home makes me smaller',\n      $m$Two days in that house and I am fifteen again. I hear myself laughing too loudly at jokes that aren't funny. I want to be the person my friends know, and I cannot find her there.$m$,\n      'family',\n      14,\n      10,\n      8,\n      true,\n      now() - interval '2 days 14 hours'\n    ),\n    (\n      'Doing everything right, still behind',\n      $m$I budget. I skip the small pleasures. I watch friends take trips I helped them plan in group chats. I am not careless. I am just always one unexpected bill away from panic.$m$,\n      'money',\n      31,\n      24,\n      12,\n      true,\n      now() - interval '2 days'\n    ),\n    (\n      'I don''t know who I am when it''s quiet',\n      $m$I can be whoever a room needs. Funny. Steady. Easy. When the door closes I sit on the floor and feel like a blank page. I thought getting older would settle this.$m$,\n      'self',\n      19,\n      13,\n      11,\n      true,\n      now() - interval '28 hours'\n    ),\n    (\n      'The conversation already happened',\n      $m$It's late and I'm rewriting a thing I said three years ago. I keep finding a better sentence. Nobody is asking for it. Sleep would be the kind thing and I cannot do the kind thing.$m$,\n      'night',\n      9,\n      7,\n      4,\n      true,\n      now() - interval '16 hours'\n    ),\n    (\n      'We still share a lease',\n      $m$The relationship ended in March. The lease ends in November. We are polite about the dishwasher and brutal about everything we don't say. I don't know how to ask which one of us is supposed to disappear.$m$,\n      'heart',\n      6,\n      4,\n      3,\n      true,\n      now() - interval '9 hours'\n    ),\n    (\n      'They think I am the calm one',\n      $m$I am the person people come to when something is on fire. I put it out. I make the joke. I go back to my desk and my hands shake under the table. I wish someone would notice without me having to perform the noticing.$m$,\n      'work',\n      11,\n      8,\n      6,\n      true,\n      now() - interval '5 hours'\n    )\n) as v(title, body, topic, heard_count, same_count, strength_count, is_seed, created_at)\nwhere not exists (select 1 from murmurs);\n\ninsert into replies (murmur_id, body, created_at)\nselect m.id, v.body, now() - v.ago\nfrom (\n  values\n    (\n      'I still rehearse leaving',\n      $r$I lived in a version of that Sunday for two years. The leaving didn't make me brave. It just made the truth smaller and easier to hold. You already know.$r$,\n      interval '3 days 4 hours'\n    ),\n    (\n      'I still rehearse leaving',\n      $r$The bag in your head is information. You don't have to act tonight. But stop unpacking it like the wanting is the problem.$r$,\n      interval '2 days 12 hours'\n    ),\n    (\n      'The promotion feels like a costume',\n      $r$Impostor feeling is often just the gap between a new room and an old self-image. You were chosen by people who have seen more of your work than you have.$r$,\n      interval '2 days 20 hours'\n    ),\n    (\n      'The promotion feels like a costume',\n      $r$I still google my own title. It got quieter. Not gone. You can do a job in a costume until the costume fits.$r$,\n      interval '1 day 6 hours'\n    ),\n    (\n      'Home makes me smaller',\n      $r$That house is a time machine, not a verdict. The person your friends know is real. She doesn't have to win every dinner.$r$,\n      interval '2 days 2 hours'\n    ),\n    (\n      'Doing everything right, still behind',\n      $r$This is not a character flaw. It is a math problem most of us were told was a morality play. You are not careless. You are tired.$r$,\n      interval '1 day 18 hours'\n    ),\n    (\n      'Doing everything right, still behind',\n      $r$Same. I started telling one friend the actual numbers instead of the performance of being fine. It didn't fix the rent. It fixed the shame a little.$r$,\n      interval '1 day 2 hours'\n    ),\n    (\n      'I don''t know who I am when it''s quiet',\n      $r$Being adaptable is a skill, not a vacancy. The blank page is allowed. You don't have to fill it before sleep.$r$,\n      interval '20 hours'\n    ),\n    (\n      'The conversation already happened',\n      $r$The rewrite is a way of staying in a room that already closed. You can put the better sentence in a note and leave it there. The night will still end.$r$,\n      interval '10 hours'\n    ),\n    (\n      'They think I am the calm one',\n      $r$The shaking hands are the bill for being useful. You are allowed to be the fire, not only the person who puts it out.$r$,\n      interval '3 hours'\n    )\n) as v(title, body, ago)\njoin murmurs m on m.title = v.title\nwhere not exists (select 1 from replies);\n\nupdate murmurs m\nset reply_count = coalesce((\n  select count(*)::int from replies r where r.murmur_id = m.id\n), 0)\nwhere is_seed = true;\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({ "/migrations/0002_murmurs.sql": _0002_murmurs_default });
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
function asIso(value) {
	if (value instanceof Date) return value.toISOString();
	const parsed = new Date(value);
	return Number.isNaN(parsed.getTime()) ? String(value) : parsed.toISOString();
}
function asTopic(value) {
	return isTopicId(value) ? value : "self";
}
function asBool(value) {
	return Boolean(value);
}
function mapSummary(row) {
	return {
		id: Number(row.id),
		title: row.title,
		excerpt: row.excerpt,
		truncated: asBool(row.truncated),
		topic: asTopic(row.topic),
		heardCount: Number(row.heard_count),
		sameCount: Number(row.same_count),
		strengthCount: Number(row.strength_count),
		replyCount: Number(row.reply_count),
		createdAt: asIso(row.created_at)
	};
}
var LIST_COLUMNS = `
  id,
  title,
  left(body, 240) as excerpt,
  (char_length(body) > 240) as truncated,
  topic,
  heard_count,
  same_count,
  strength_count,
  reply_count,
  created_at
`;
var listMurmurs_createServerFn_handler = createServerRpc({
	id: "02be875028ad5f2fba3bbab7ddb33b9529662445b745a80a4985175f22360e4a",
	name: "listMurmurs",
	filename: "src/lib/murmurs.ts"
}, (opts) => listMurmurs.__executeServer(opts));
var listMurmurs = createServerFn({ method: "GET" }).validator(listMurmursSchema).handler(listMurmurs_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const sort = data.sort ?? "latest";
	const orderSql = sort === "heard" ? "heard_count desc, created_at desc" : sort === "unanswered" ? "created_at desc" : "created_at desc";
	if (data.ids) {
		if (data.ids.length === 0) return [];
		const placeholders = data.ids.map((_, index) => `$${index + 1}`).join(", ");
		return (await sql.query(`select ${LIST_COLUMNS} from murmurs where id in (${placeholders}) order by created_at desc`, data.ids)).map(mapSummary);
	}
	if (sort === "unanswered" && data.topic) return (await sql.query(`select ${LIST_COLUMNS} from murmurs where topic = $1 and reply_count = 0 order by ${orderSql} limit 80`, [data.topic])).map(mapSummary);
	if (sort === "unanswered") return (await sql.query(`select ${LIST_COLUMNS} from murmurs where reply_count = 0 order by ${orderSql} limit 80`)).map(mapSummary);
	if (data.topic) return (await sql.query(`select ${LIST_COLUMNS} from murmurs where topic = $1 order by ${orderSql} limit 80`, [data.topic])).map(mapSummary);
	return (await sql.query(`select ${LIST_COLUMNS} from murmurs order by ${orderSql} limit 80`)).map(mapSummary);
});
var getMurmur_createServerFn_handler = createServerRpc({
	id: "7fe22b209bb8656a63c1fff25bc069f7cdcd8bd9ab0f962fdf4f1e411a96968e",
	name: "getMurmur",
	filename: "src/lib/murmurs.ts"
}, (opts) => getMurmur.__executeServer(opts));
var getMurmur = createServerFn({ method: "GET" }).validator(murmurIdSchema).handler(getMurmur_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const [row] = await sql.query(`select id, title, body, topic, heard_count, same_count, strength_count, reply_count, created_at
       from murmurs where id = $1`, [data.id]);
	if (!row) return null;
	const replies = await sql.query(`select id, body, created_at from replies where murmur_id = $1 order by created_at asc`, [data.id]);
	return {
		id: Number(row.id),
		title: row.title,
		body: row.body,
		topic: asTopic(row.topic),
		heardCount: Number(row.heard_count),
		sameCount: Number(row.same_count),
		strengthCount: Number(row.strength_count),
		replyCount: Number(row.reply_count),
		createdAt: asIso(row.created_at),
		replies: replies.map((reply) => ({
			id: Number(reply.id),
			body: reply.body,
			createdAt: asIso(reply.created_at)
		}))
	};
});
var getRoomStats_createServerFn_handler = createServerRpc({
	id: "9c9c2d04ed7d0765d9641f0ba18e3c1e124262fc3a258c9abd70d7608b1cc936",
	name: "getRoomStats",
	filename: "src/lib/murmurs.ts"
}, (opts) => getRoomStats.__executeServer(opts));
var getRoomStats = createServerFn({ method: "POST" }).handler(getRoomStats_createServerFn_handler, async () => {
	const [row] = await (await getSql()).query(`select
         (select count(*)::int from murmurs) as murmurs,
         (select count(*)::int from replies) as replies`);
	return {
		murmurs: Number(row?.murmurs ?? 0),
		replies: Number(row?.replies ?? 0)
	};
});
var createMurmur_createServerFn_handler = createServerRpc({
	id: "71ecbeafc259a9e7354633fa78b87854d1421ec8ea631a1a9bcf00cec8380465",
	name: "createMurmur",
	filename: "src/lib/murmurs.ts"
}, (opts) => createMurmur.__executeServer(opts));
var createMurmur = createServerFn({ method: "POST" }).validator(composeSchema).handler(createMurmur_createServerFn_handler, async ({ data }) => {
	const [row] = await (await getSql()).query(`insert into murmurs (title, body, topic)
       values ($1, $2, $3)
       returning id`, [
		data.title,
		data.body,
		data.topic
	]);
	if (!row) throw new Error("Could not leave that murmur.");
	return { id: Number(row.id) };
});
var createReply_createServerFn_handler = createServerRpc({
	id: "6106eebb77c809e5fc6fa9f1bf7fd5f37e11189db271eaf4b2dd1fbb907020d4",
	name: "createReply",
	filename: "src/lib/murmurs.ts"
}, (opts) => createReply.__executeServer(opts));
var createReply = createServerFn({ method: "POST" }).validator(replySchema).handler(createReply_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const [exists] = await sql.query(`select id from murmurs where id = $1`, [data.murmurId]);
	if (!exists) throw new Error("That murmur is no longer in the room.");
	const [row] = await sql.query(`insert into replies (murmur_id, body) values ($1, $2) returning id`, [data.murmurId, data.body]);
	await sql.query(`update murmurs set reply_count = reply_count + 1 where id = $1`, [data.murmurId]);
	return { id: Number(row?.id) };
});
var REACTION_COLUMN = {
	heard: "heard_count",
	same: "same_count",
	strength: "strength_count"
};
var toggleReaction_createServerFn_handler = createServerRpc({
	id: "1c64abd9d4585125730d30e7a2c0edba7611499358a1489c7b741f743bd21cd7",
	name: "toggleReaction",
	filename: "src/lib/murmurs.ts"
}, (opts) => toggleReaction.__executeServer(opts));
var toggleReaction = createServerFn({ method: "POST" }).validator(reactSchema).handler(toggleReaction_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const column = REACTION_COLUMN[data.kind];
	const delta = data.on ? 1 : -1;
	const [row] = await sql.query(`update murmurs
       set ${column} = greatest(${column} + $2, 0)
       where id = $1
       returning heard_count, same_count, strength_count`, [data.id, delta]);
	if (!row) throw new Error("That murmur is no longer in the room.");
	return {
		heardCount: Number(row.heard_count),
		sameCount: Number(row.same_count),
		strengthCount: Number(row.strength_count)
	};
});
//#endregion
export { createMurmur_createServerFn_handler, createReply_createServerFn_handler, getMurmur_createServerFn_handler, getRoomStats_createServerFn_handler, listMurmurs_createServerFn_handler, toggleReaction_createServerFn_handler };
