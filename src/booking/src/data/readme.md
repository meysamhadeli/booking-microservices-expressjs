typeorm migration:generate -d ./src/data/postgresOptions ./src/data/migrations/create-flight-table
typeorm migration:run -- -d ./src/data/postgresOptions
