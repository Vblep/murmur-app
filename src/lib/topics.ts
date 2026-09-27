export const TOPIC_IDS = [
  "heart",
  "work",
  "family",
  "money",
  "self",
  "night",
] as const;

export type TopicId = (typeof TOPIC_IDS)[number];

export const TOPICS: {
  id: TopicId;
  label: string;
  hint: string;
}[] = [
  {
    id: "heart",
    label: "Heart",
    hint: "Love, friendship, the people who linger",
  },
  {
    id: "work",
    label: "Work",
    hint: "Desks, ambition, the mask you wear",
  },
  {
    id: "family",
    label: "Family",
    hint: "Home, blood, the roles you never asked for",
  },
  {
    id: "money",
    label: "Money",
    hint: "Bills, luck, the quiet math of staying afloat",
  },
  {
    id: "self",
    label: "Self",
    hint: "Identity, the person you are when the room is empty",
  },
  {
    id: "night",
    label: "Night",
    hint: "Insomnia, 3am, the conversations that already happened",
  },
];

export const TOPIC_BY_ID: Record<TopicId, (typeof TOPICS)[number]> =
  Object.fromEntries(TOPICS.map((topic) => [topic.id, topic])) as Record<
    TopicId,
    (typeof TOPICS)[number]
  >;

export function isTopicId(value: string): value is TopicId {
  return (TOPIC_IDS as readonly string[]).includes(value);
}
