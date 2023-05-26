drop policy "Chaque intervenant voit ses informations" on "public"."users_informations";

alter table "public"."users_informations" rename column "user" to "id_user";
alter table "public"."users_informations" add column "email" text not null default ''::text;
alter table "public"."users_informations" add column "name" text not null default ''::text;
alter table "public"."users_informations" add column "phone" text not null default ''::text;
alter table "public"."users_informations" alter column "role" drop not null;

create policy "Chaque intervenant voit ses informations"
on "public"."users_informations"
as permissive
for select
to authenticated
using (((id_user)::text = (auth.uid())::text));

CREATE OR REPLACE FUNCTION PUBLIC.IS_USER_ADMIN(USER_ID TEXT)
RETURNS BOOLEAN
LANGUAGE PLPGSQL
SECURITY DEFINER
AS $function$
BEGIN
	RETURN EXISTS(
		SELECT 1
			FROM public.roles
		WHERE
			roles.is_administration IS TRUE
			AND roles.name = (
				SELECT users_informations.role
				FROM
					public.users_informations
				WHERE
					users_informations.id_user::text = $1
				LIMIT 1
			)
	);
END; 
$function$ ;