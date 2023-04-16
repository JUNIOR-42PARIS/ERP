# ERP Junior 42Paris

## Installation

Il faut avoir `pnpm` d'installer

Pour utiliser et développer:

- `cp ./supabase/config.toml.example ./supabase/config.toml` et éditez le `config.toml`
- `npx supabase start`
- `cp ./frontend/.env.example ./frontend/.env` et éditez le `.env`
- `cd front && pnpm install && pnpm dev`

## Générer une clef Google

[Aller sur le console.cloud.google.com](https://console.cloud.google.com/)

### Créer la page de consentement

Dans le menu:

- API et services
- Ecran de consentement OAuth

Ensuite:

1.  Utiliser le **mode** `interne`
2.  **Nom de l'application**: `ERP Junior42Paris`
3.  **Coordonnées du développeur**: votre E-mail

### Générer une clef d'API

Dans le menu:

- API et services
- Identifiants

Ensuite:

1.  Créer des identifiants
2.  ID client OAuth
3.  **Type d'application**: Application Web
4.  **Nom**: comme vous voulez
5.  **URI de redirection autorisés**: `http://localhost:54321/auth/v1/callback`
