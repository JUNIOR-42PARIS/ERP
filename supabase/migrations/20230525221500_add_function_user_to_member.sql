CREATE OR REPLACE FUNCTION PUBLIC.CREATE_MEMBER_FROM_USER()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.users_informations(id_user, name, email)
  values (NEW.id, NEW.raw_user_meta_data::json->>'name', NEW.email);

  RETURN NEW;
END; 
$function$ ;

CREATE TRIGGER users_to_member_registration AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION create_member_from_user();