dump_data:
	/usr/lib/postgresql/15/bin/pg_dump postgresql://postgres:postgres@localhost:54322/postgres --schema public --inserts --data-only

install:
	pnpm install
	pnpm --dir frontend/ install

start:	install
	npx supabase start
	pnpm --dir frontend/ dev

lint:	install
	pnpm --dir frontend/ lint:fix
