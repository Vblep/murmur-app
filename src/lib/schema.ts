import { z } from "zod";
import { TOPIC_IDS } from "./topics";

export const topicSchema = z.enum(TOPIC_IDS);

export const sortSchema = z.enum(["latest", "unanswered", "heard"]);
export type FeedSort = z.infer<typeof sortSchema>;

export const composeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "A little more title — at least 3 characters.")
    .max(80, "Keep the title under 80 characters."),
  body: z
    .string()
    .trim()
    .min(24, "Give the room a little more — at least 24 characters.")
    .max(1200, "That's as far as a murmur goes. Keep it under 1,200 characters."),
  topic: topicSchema,
});

export type ComposeInput = z.infer<typeof composeSchema>;

export const replySchema = z.object({
  murmurId: z.number().int().positive(),
  body: z
    .string()
    .trim()
    .min(8, "A little more — at least 8 characters.")
    .max(600, "Keep a reply under 600 characters."),
});

export const listMurmursSchema = z.object({
  topic: topicSchema.optional(),
  sort: sortSchema.optional(),
  ids: z.array(z.number().int().positive()).max(80).optional(),
});

export const murmurIdSchema = z.object({
  id: z.number().int().positive(),
});

export const reactSchema = z.object({
  id: z.number().int().positive(),
  kind: z.enum(["heard", "same", "strength"]),
  on: z.boolean(),
});

export type ReactionKind = z.infer<typeof reactSchema>["kind"];
