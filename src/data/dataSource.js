"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "node_express_template_db",
    logging: true,
    synchronize: false,
    entities: ['src/**/entities/*.js'],
    migrations: ['src/data/migrations/*.js']
});
//# sourceMappingURL=dataSource.js.map