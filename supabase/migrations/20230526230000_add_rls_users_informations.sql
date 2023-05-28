drop policy "Chaque intervenant voit ses informations" on "public"."users_informations";

create policy "Les administrateurs peuvent éditer un membre"
on "public"."users_informations"
as permissive
for update
to authenticated
using ((is_user_admin((auth.uid())::text) IS TRUE))
with check ((is_user_admin((auth.uid())::text) IS TRUE));


create policy "Les membres peuvent voir tous les membres"
on "public"."users_informations"
as permissive
for select
to authenticated
using (((role IS NOT NULL) AND is_user_member((auth.uid())::text)));