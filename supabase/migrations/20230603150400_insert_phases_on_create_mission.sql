create or replace function public.create_required_phase_on_mission_create()
returns trigger
language plpgsql
as $function$
begin
  insert into public.missions_phases(id_mission, type)
  values (new.id, 'prospection'), (new.id, 'contractuelle'), (new.id, 'cloture');

  return new;
end;
$function$ ;

CREATE TRIGGER create_required_phase_on_mission_create AFTER INSERT ON public.missions FOR EACH ROW EXECUTE FUNCTION create_required_phase_on_mission_create();