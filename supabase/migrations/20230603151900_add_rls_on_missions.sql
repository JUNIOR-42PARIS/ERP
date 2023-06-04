alter table "public"."missions_intervenants" enable row level security;

create policy "Les administrateurs peuvent inserer une phase sur n'importe que"
on "public"."missions_phases"
as permissive
for insert
to authenticated
with check ((is_user_admin((auth.uid())::text) IS TRUE));

create policy "Les administrateurs peuvent * sur les intervenants d'une missio"
on "public"."missions_intervenants"
as permissive
for all
to public
using ((is_user_admin((auth.uid())::text) IS TRUE))
with check ((is_user_admin((auth.uid())::text) IS TRUE));