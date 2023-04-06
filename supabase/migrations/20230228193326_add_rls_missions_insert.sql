create policy "Est-ce que l'utilisateur connecté est administrateur" on "public"."missions" as permissive for
insert to authenticated
with
    check ( 
            ( 
                (is_user_admin( (auth.uid()):: text) IS TRUE)
                AND (created_by = auth.uid())
            )
        );

CREATE POLICY "Administrateurs peuvent créer des clients" ON "public"."clients" AS PERMISSIVE FOR
INSERT TO authenticated
WITH
    CHECK (
        IS_USER_ADMIN(auth.uid():: text) IS TRUE
    );

CREATE POLICY "Administrateurs peuvent voir tous les clients" ON "public"."clients" AS PERMISSIVE FOR
SELECT
    TO authenticated USING (
        IS_USER_ADMIN(auth.uid():: text) IS TRUE
    );