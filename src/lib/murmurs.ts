import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import {
  composeSchema,
  listMurmursSchema,
  murmurIdSchema,
  reactSchema,
  replySchema,
  type ReactionKind,
} from "@/lib/schema";
import { isTopicId, type TopicId } from "@/lib/topics";

export type MurmurSummary = {
  id: number;
  title: string;
  excerpt: string;
  truncated: boolean;
  topic: TopicId;
  heardCount: number;
  sameCount: number;
  strengthCount: number;
  replyCount: number;
  createdAt: string;
};

export type Reply = {
  id: number;
  body: string;
  createdAt: string;
};

export type MurmurDetail = Omit<MurmurSummary, "excerpt" | "truncated"> & {
  body: string;
  replies: Reply[];
};

export type RoomStats = {
  murmurs: number;
  replies: number;
};

type MurmurRow = {
  id: number;
  title: string;
  excerpt: string;
  truncated: boolean | number;
  topic: string;
  heard_count: number;
  same_count: number;
  strength_count: number;
  reply_count: number;
  created_at: string | Date;
};

type DetailRow = {
  id: number;
  title: string;
  body: string;
  topic: string;
  heard_count: number;
  same_count: number;
  strength_count: number;
  reply_count: number;
  created_at: string | Date;
};

type ReplyRow = {
  id: number;
  body: string;
  created_at: string | Date;
};

function asIso(value: string | Date): string {
  if (value instanceof Date) return value.toISOString();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? String(value) : parsed.toISOString();
}

function asTopic(value: string): TopicId {
  return isTopicId(value) ? value : "self";
}

function asBool(value: boolean | number): boolean {
  return Boolean(value);
}

function mapSummary(row: MurmurRow): MurmurSummary {
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
    createdAt: asIso(row.created_at),
  };
}

const LIST_COLUMNS = `
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

export const listMurmurs = createServerFn({ method: "GET" })
  .validator(listMurmursSchema)
  .handler(async ({ data }): Promise<MurmurSummary[]> => {
    const sql = await getSql();
    const sort = data.sort ?? "latest";
    const orderSql =
      sort === "heard"
        ? "heard_count desc, created_at desc"
        : sort === "unanswered"
          ? "created_at desc"
          : "created_at desc";

    if (data.ids) {
      if (data.ids.length === 0) return [];
      const placeholders = data.ids.map((_, index) => `$${index + 1}`).join(", ");
      const rows = await sql.query<MurmurRow>(
        `select ${LIST_COLUMNS} from murmurs where id in (${placeholders}) order by created_at desc`,
        data.ids,
      );
      return rows.map(mapSummary);
    }

    if (sort === "unanswered" && data.topic) {
      const rows = await sql.query<MurmurRow>(
        `select ${LIST_COLUMNS} from murmurs where topic = $1 and reply_count = 0 order by ${orderSql} limit 80`,
        [data.topic],
      );
      return rows.map(mapSummary);
    }

    if (sort === "unanswered") {
      const rows = await sql.query<MurmurRow>(
        `select ${LIST_COLUMNS} from murmurs where reply_count = 0 order by ${orderSql} limit 80`,
      );
      return rows.map(mapSummary);
    }

    if (data.topic) {
      const rows = await sql.query<MurmurRow>(
        `select ${LIST_COLUMNS} from murmurs where topic = $1 order by ${orderSql} limit 80`,
        [data.topic],
      );
      return rows.map(mapSummary);
    }

    const rows = await sql.query<MurmurRow>(
      `select ${LIST_COLUMNS} from murmurs order by ${orderSql} limit 80`,
    );
    return rows.map(mapSummary);
  });

export const getMurmur = createServerFn({ method: "GET" })
  .validator(murmurIdSchema)
  .handler(async ({ data }): Promise<MurmurDetail | null> => {
    const sql = await getSql();
    const [row] = await sql.query<DetailRow>(
      `select id, title, body, topic, heard_count, same_count, strength_count, reply_count, created_at
       from murmurs where id = $1`,
      [data.id],
    );
    if (!row) return null;

    const replies = await sql.query<ReplyRow>(
      `select id, body, created_at from replies where murmur_id = $1 order by created_at asc`,
      [data.id],
    );

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
        createdAt: asIso(reply.created_at),
      })),
    };
  });

export const getRoomStats = createServerFn({ method: "POST" }).handler(
  async (): Promise<RoomStats> => {
    const sql = await getSql();
    const [row] = await sql.query<{ murmurs: number; replies: number }>(
      `select
         (select count(*)::int from murmurs) as murmurs,
         (select count(*)::int from replies) as replies`,
    );
    return {
      murmurs: Number(row?.murmurs ?? 0),
      replies: Number(row?.replies ?? 0),
    };
  },
);

export const createMurmur = createServerFn({ method: "POST" })
  .validator(composeSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const [row] = await sql.query<{ id: number }>(
      `insert into murmurs (title, body, topic)
       values ($1, $2, $3)
       returning id`,
      [data.title, data.body, data.topic],
    );
    if (!row) throw new Error("Could not leave that murmur.");
    return { id: Number(row.id) };
  });

export const createReply = createServerFn({ method: "POST" })
  .validator(replySchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const [exists] = await sql.query<{ id: number }>(
      `select id from murmurs where id = $1`,
      [data.murmurId],
    );
    if (!exists) throw new Error("That murmur is no longer in the room.");

    const [row] = await sql.query<{ id: number }>(
      `insert into replies (murmur_id, body) values ($1, $2) returning id`,
      [data.murmurId, data.body],
    );
    await sql.query(
      `update murmurs set reply_count = reply_count + 1 where id = $1`,
      [data.murmurId],
    );
    return { id: Number(row?.id) };
  });

const REACTION_COLUMN: Record<ReactionKind, string> = {
  heard: "heard_count",
  same: "same_count",
  strength: "strength_count",
};

export const toggleReaction = createServerFn({ method: "POST" })
  .validator(reactSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const column = REACTION_COLUMN[data.kind];
    const delta = data.on ? 1 : -1;
    const [row] = await sql.query<{
      heard_count: number;
      same_count: number;
      strength_count: number;
    }>(
      `update murmurs
       set ${column} = greatest(${column} + $2, 0)
       where id = $1
       returning heard_count, same_count, strength_count`,
      [data.id, delta],
    );
    if (!row) throw new Error("That murmur is no longer in the room.");
    return {
      heardCount: Number(row.heard_count),
      sameCount: Number(row.same_count),
      strengthCount: Number(row.strength_count),
    };
  });
