dump_data:
	/usr/lib/postgresql/15/bin/pg_dump postgresql://postgres:postgres@localhost:54322/postgres --schema public --inserts --data-only
