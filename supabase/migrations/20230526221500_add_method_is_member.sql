set check_function_bodies = off;

CREATE OR REPLACE FUNCTION PUBLIC.IS_USER_MEMBER(USER_ID TEXT)
RETURNS BOOLEAN
LANGUAGE PLPGSQL
SECURITY DEFINER
AS $function$
BEGIN
	RETURN EXISTS(
		SELECT 1
			FROM public.users_informations
		WHERE
      users_informations.id_user::text = $1
      AND users_informations.role IS NOT NULL
	);
END; 
$function$ ;