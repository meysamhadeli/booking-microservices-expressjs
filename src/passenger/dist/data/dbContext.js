"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialDbContext = void 0;
const tsyringe_1 = require("tsyringe");
const dbContext_1 = require("building-blocks/typeorm/db-context");
const repositoryExtensions_1 = require("../extensions/repositoryExtensions");
const initialDbContext = async (options) => {
    tsyringe_1.container.register('IDbContext', dbContext_1.DbContext);
    const dbContext = tsyringe_1.container.resolve(dbContext_1.DbContext);
    const connection = await dbContext.initialize(options);
    await (0, repositoryExtensions_1.registerRepositories)();
    return connection;
};
exports.initialDbContext = initialDbContext;
//# sourceMappingURL=dbContext.js.map
