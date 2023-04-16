-- Ajout d'un role pour les nouveaux utilisateur sans roles
ALTER TABLE public.roles
    ADD is_member BOOLEAN DEFAULT true;
INSERT INTO public.roles(name, color, is_administration, is_member) VALUES ('inconnu', 'eeeee4', false, false);

-- Ajout des colonnes pseudo, name et created_at sur les users_infos
ALTER TABLE public.users_informations
    ADD pseudo VARCHAR(50) DEFAULT '';
ALTER TABLE public.users_informations
    ADD name VARCHAR(50) DEFAULT '';
ALTER TABLE public.users_informations
    ADD created_at TIMESTAMP DEFAULT NOW();

-- Ajout de la RLS admin pour la table users_informations
CREATE POLICY "Les administrateurs peuvent voir tous les membres" ON "public"."users_informations"
    AS PERMISSIVE FOR SELECT
    TO authenticated
USING ((is_user_admin((auth.uid())::text) IS TRUE))


-- Ajout de la fonction qui sera appelé par le trigger
CREATE OR REPLACE FUNCTION insert_user_information_on_signon() RETURNS TRIGGER AS $new$
    BEGIN
        INSERT INTO public.users_informations(id_user, name, role) VALUES (NEW.id, NEW.raw_user_meta_data->>'name', 'inconnu');
        RETURN NEW;
    END;
$new$ LANGUAGE plpgsql
    SECURITY DEFINER SET search_path = public, pg_temp;

CREATE TRIGGER insert_user_information_on_signon
AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION insert_user_information_on_signon();

