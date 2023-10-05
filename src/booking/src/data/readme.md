**run these commands in root of project**

typeorm migration:generate -d ./src/data/postgresOptions ./src/data/migrations/create-booking-table
typeorm migration:run -- -d ./src/data/postgresOptions
