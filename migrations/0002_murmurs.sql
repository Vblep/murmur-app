create table if not exists murmurs (
  id serial primary key,
  title text not null,
  body text not null,
  topic text not null,
  heard_count integer not null default 0,
  same_count integer not null default 0,
  strength_count integer not null default 0,
  reply_count integer not null default 0,
  is_seed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists murmurs_created_at_idx on murmurs (created_at desc);
create index if not exists murmurs_topic_idx on murmurs (topic);
create index if not exists murmurs_reply_count_idx on murmurs (reply_count);

create table if not exists replies (
  id serial primary key,
  murmur_id integer not null references murmurs(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists replies_murmur_id_idx on replies (murmur_id);

insert into murmurs (
  title, body, topic, heard_count, same_count, strength_count, is_seed, created_at
)
select * from (
  values
    (
      'I still rehearse leaving',
      $m$We haven't been good for each other in a long time, but the apartment is full of our things. I pack a bag in my head every Sunday and unpack it by Monday. I don't know if I'm afraid of being alone or of admitting I already am.$m$,
      'heart',
      18,
      11,
      7,
      true,
      now() - interval '4 days'
    ),
    (
      'The promotion feels like a costume',
      $m$They keep saying I earned it. I smile in the meetings. At night I look up the job posting again to confirm I even qualify. I am so tired of waiting to be found out.$m$,
      'work',
      22,
      16,
      9,
      true,
      now() - interval '3 days 6 hours'
    ),
    (
      'Home makes me smaller',
      $m$Two days in that house and I am fifteen again. I hear myself laughing too loudly at jokes that aren't funny. I want to be the person my friends know, and I cannot find her there.$m$,
      'family',
      14,
      10,
      8,
      true,
      now() - interval '2 days 14 hours'
    ),
    (
      'Doing everything right, still behind',
      $m$I budget. I skip the small pleasures. I watch friends take trips I helped them plan in group chats. I am not careless. I am just always one unexpected bill away from panic.$m$,
      'money',
      31,
      24,
      12,
      true,
      now() - interval '2 days'
    ),
    (
      'I don''t know who I am when it''s quiet',
      $m$I can be whoever a room needs. Funny. Steady. Easy. When the door closes I sit on the floor and feel like a blank page. I thought getting older would settle this.$m$,
      'self',
      19,
      13,
      11,
      true,
      now() - interval '28 hours'
    ),
    (
      'The conversation already happened',
      $m$It's late and I'm rewriting a thing I said three years ago. I keep finding a better sentence. Nobody is asking for it. Sleep would be the kind thing and I cannot do the kind thing.$m$,
      'night',
      9,
      7,
      4,
      true,
      now() - interval '16 hours'
    ),
    (
      'We still share a lease',
      $m$The relationship ended in March. The lease ends in November. We are polite about the dishwasher and brutal about everything we don't say. I don't know how to ask which one of us is supposed to disappear.$m$,
      'heart',
      6,
      4,
      3,
      true,
      now() - interval '9 hours'
    ),
    (
      'They think I am the calm one',
      $m$I am the person people come to when something is on fire. I put it out. I make the joke. I go back to my desk and my hands shake under the table. I wish someone would notice without me having to perform the noticing.$m$,
      'work',
      11,
      8,
      6,
      true,
      now() - interval '5 hours'
    )
) as v(title, body, topic, heard_count, same_count, strength_count, is_seed, created_at)
where not exists (select 1 from murmurs);

insert into replies (murmur_id, body, created_at)
select m.id, v.body, now() - v.ago
from (
  values
    (
      'I still rehearse leaving',
      $r$I lived in a version of that Sunday for two years. The leaving didn't make me brave. It just made the truth smaller and easier to hold. You already know.$r$,
      interval '3 days 4 hours'
    ),
    (
      'I still rehearse leaving',
      $r$The bag in your head is information. You don't have to act tonight. But stop unpacking it like the wanting is the problem.$r$,
      interval '2 days 12 hours'
    ),
    (
      'The promotion feels like a costume',
      $r$Impostor feeling is often just the gap between a new room and an old self-image. You were chosen by people who have seen more of your work than you have.$r$,
      interval '2 days 20 hours'
    ),
    (
      'The promotion feels like a costume',
      $r$I still google my own title. It got quieter. Not gone. You can do a job in a costume until the costume fits.$r$,
      interval '1 day 6 hours'
    ),
    (
      'Home makes me smaller',
      $r$That house is a time machine, not a verdict. The person your friends know is real. She doesn't have to win every dinner.$r$,
      interval '2 days 2 hours'
    ),
    (
      'Doing everything right, still behind',
      $r$This is not a character flaw. It is a math problem most of us were told was a morality play. You are not careless. You are tired.$r$,
      interval '1 day 18 hours'
    ),
    (
      'Doing everything right, still behind',
      $r$Same. I started telling one friend the actual numbers instead of the performance of being fine. It didn't fix the rent. It fixed the shame a little.$r$,
      interval '1 day 2 hours'
    ),
    (
      'I don''t know who I am when it''s quiet',
      $r$Being adaptable is a skill, not a vacancy. The blank page is allowed. You don't have to fill it before sleep.$r$,
      interval '20 hours'
    ),
    (
      'The conversation already happened',
      $r$The rewrite is a way of staying in a room that already closed. You can put the better sentence in a note and leave it there. The night will still end.$r$,
      interval '10 hours'
    ),
    (
      'They think I am the calm one',
      $r$The shaking hands are the bill for being useful. You are allowed to be the fire, not only the person who puts it out.$r$,
      interval '3 hours'
    )
) as v(title, body, ago)
join murmurs m on m.title = v.title
where not exists (select 1 from replies);

update murmurs m
set reply_count = coalesce((
  select count(*)::int from replies r where r.murmur_id = m.id
), 0)
where is_seed = true;
