create table "public"."clients" (
    "nom" character varying not null,
    "adresse" text not null,
    "siret" character varying,
    "numero_tva" character varying,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."clients" enable row level security;

create table "public"."missions" (
    "id" bigint generated by default as identity not null,
    "client" character varying,
    "numero_mission" bigint not null default '1'::bigint,
    "description" text,
    "lien_github" text,
    "lien_drive" text,
    "nom_intermediaire" character varying,
    "email_intermediaire" character varying,
    "telephone_intermediaire" character varying,
    "created_by" uuid not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."missions" enable row level security;

create table "public"."missions_intervenants" (
    "id" bigint generated by default as identity not null,
    "intervenant" uuid not null,
    "mission" bigint,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."missions_intervenants" enable row level security;

create table "public"."roles" (
    "name" character varying not null,
    "color" character varying not null,
    "is_administration" boolean not null default false
);


alter table "public"."roles" enable row level security;

create table "public"."users_informations" (
    "user" uuid not null,
    "role" character varying not null
);


alter table "public"."users_informations" enable row level security;

CREATE UNIQUE INDEX clients_pkey ON public.clients USING btree (nom);
CREATE UNIQUE INDEX missions_intervenants_pkey ON public.missions_intervenants USING btree (id);
CREATE UNIQUE INDEX missions_pkey ON public.missions USING btree (id);
CREATE UNIQUE INDEX roles_pkey ON public.roles USING btree (name);
CREATE UNIQUE INDEX users_informations_pkey ON public.users_informations USING btree ("user");

alter table "public"."clients" add constraint "clients_pkey" PRIMARY KEY using index "clients_pkey";
alter table "public"."missions" add constraint "missions_pkey" PRIMARY KEY using index "missions_pkey";
alter table "public"."missions_intervenants" add constraint "missions_intervenants_pkey" PRIMARY KEY using index "missions_intervenants_pkey";
alter table "public"."roles" add constraint "roles_pkey" PRIMARY KEY using index "roles_pkey";
alter table "public"."users_informations" add constraint "users_informations_pkey" PRIMARY KEY using index "users_informations_pkey";
alter table "public"."missions" add constraint "missions_client_fkey" FOREIGN KEY (client) REFERENCES clients(nom) not valid;
alter table "public"."missions" validate constraint "missions_client_fkey";
alter table "public"."missions" add constraint "missions_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;
alter table "public"."missions" validate constraint "missions_created_by_fkey";
alter table "public"."missions_intervenants" add constraint "missions_intervenants_intervenant_fkey" FOREIGN KEY (intervenant) REFERENCES auth.users(id) not valid;
alter table "public"."missions_intervenants" validate constraint "missions_intervenants_intervenant_fkey";
alter table "public"."missions_intervenants" add constraint "missions_intervenants_mission_fkey" FOREIGN KEY (mission) REFERENCES missions(id) not valid;
alter table "public"."missions_intervenants" validate constraint "missions_intervenants_mission_fkey";
alter table "public"."users_informations" add constraint "users_informations_role_fkey" FOREIGN KEY (role) REFERENCES roles(name) not valid;
alter table "public"."users_informations" validate constraint "users_informations_role_fkey";
alter table "public"."users_informations" add constraint "users_informations_user_fkey" FOREIGN KEY ("user") REFERENCES auth.users(id) not valid;
alter table "public"."users_informations" validate constraint "users_informations_user_fkey";
