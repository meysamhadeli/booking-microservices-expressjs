typeorm migration:generate -d ./src/data/dataSource ./src/data/migrations/create-passenger-table
typeorm migration:run -- -d ./src/data/dataSource
