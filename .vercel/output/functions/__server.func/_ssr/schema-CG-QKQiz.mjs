import { a as number, n as array, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schema-CG-QKQiz.js
var TOPIC_IDS = [
	"heart",
	"work",
	"family",
	"money",
	"self",
	"night"
];
var TOPICS = [
	{
		id: "heart",
		label: "Heart",
		hint: "Love, friendship, the people who linger"
	},
	{
		id: "work",
		label: "Work",
		hint: "Desks, ambition, the mask you wear"
	},
	{
		id: "family",
		label: "Family",
		hint: "Home, blood, the roles you never asked for"
	},
	{
		id: "money",
		label: "Money",
		hint: "Bills, luck, the quiet math of staying afloat"
	},
	{
		id: "self",
		label: "Self",
		hint: "Identity, the person you are when the room is empty"
	},
	{
		id: "night",
		label: "Night",
		hint: "Insomnia, 3am, the conversations that already happened"
	}
];
var TOPIC_BY_ID = Object.fromEntries(TOPICS.map((topic) => [topic.id, topic]));
function isTopicId(value) {
	return TOPIC_IDS.includes(value);
}
var topicSchema = _enum(TOPIC_IDS);
var sortSchema = _enum([
	"latest",
	"unanswered",
	"heard"
]);
var composeSchema = object({
	title: string().trim().min(3, "A little more title — at least 3 characters.").max(80, "Keep the title under 80 characters."),
	body: string().trim().min(24, "Give the room a little more — at least 24 characters.").max(1200, "That's as far as a murmur goes. Keep it under 1,200 characters."),
	topic: topicSchema
});
var replySchema = object({
	murmurId: number().int().positive(),
	body: string().trim().min(8, "A little more — at least 8 characters.").max(600, "Keep a reply under 600 characters.")
});
var listMurmursSchema = object({
	topic: topicSchema.optional(),
	sort: sortSchema.optional(),
	ids: array(number().int().positive()).max(80).optional()
});
var murmurIdSchema = object({ id: number().int().positive() });
var reactSchema = object({
	id: number().int().positive(),
	kind: _enum([
		"heard",
		"same",
		"strength"
	]),
	on: boolean()
});
//#endregion
export { listMurmursSchema as a, replySchema as c, isTopicId as i, TOPIC_BY_ID as n, murmurIdSchema as o, composeSchema as r, reactSchema as s, TOPICS as t };
