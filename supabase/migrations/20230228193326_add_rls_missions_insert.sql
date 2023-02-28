create policy "Est-ce que l'utilisateur connecté est administrateur" on "public"."missions" as permissive for
insert to authenticated
with
    check ( 
            ( 
                (is_user_admin( (auth.uid()):: text) IS TRUE)
                AND (created_by = auth.uid())
            )
        );