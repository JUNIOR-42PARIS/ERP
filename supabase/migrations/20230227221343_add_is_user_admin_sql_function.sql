set check_function_bodies = off;

CREATE OR REPLACE FUNCTION PUBLIC.IS_USER_ADMIN(USER_ID TEXT)
RETURNS BOOLEAN
LANGUAGE PLPGSQL AS $function$
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
					users_informations.user:: text = $1
				LIMIT 1
			)
	);
END; 
$function$ ;