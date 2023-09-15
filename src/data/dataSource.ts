import { DataSource } from "typeorm"

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "node_express_template_db",
  logging: true,
  synchronize: false, // Disable automatic table generation
  entities: ['src/**/entities/*.js'],
  migrations: ['src/data/migrations/*.js']
})
