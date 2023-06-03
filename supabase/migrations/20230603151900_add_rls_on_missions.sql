alter table "public"."missions_intervenants" enable row level security;

create policy "Les administrateurs peuvent inserer une phase sur n'importe que"
on "public"."missions_phases"
as permissive
for insert
to authenticated
with check ((is_user_admin((auth.uid())::text) IS TRUE));