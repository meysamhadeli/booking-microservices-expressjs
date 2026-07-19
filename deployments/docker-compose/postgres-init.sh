#!/bin/sh
set -eu

for db in identity flight passenger booking; do
  if ! psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -tAc "SELECT 1 FROM pg_database WHERE datname = '$db'" | grep -q 1; then
    createdb -U "$POSTGRES_USER" "$db"
  fi
done
