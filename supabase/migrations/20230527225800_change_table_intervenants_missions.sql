DROP TABLE public.missions_intervenants;

create type "public"."intervenants_type" as enum (
    'cdp',
    'developpeur'
);

create table missions_intervenants (
  "id_user" uuid references users_informations,
  "id_mission" int8 references missions,
  "type" public.intervenants_type,
  primary key (id_user, id_mission)
);