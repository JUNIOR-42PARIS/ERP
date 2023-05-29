alter table "public"."users_informations" add column "pseudo" text;
CREATE UNIQUE INDEX users_informations_pseudo_key ON public.users_informations USING btree (pseudo);
alter table "public"."users_informations" add constraint "users_informations_pseudo_key" UNIQUE using index "users_informations_pseudo_key";