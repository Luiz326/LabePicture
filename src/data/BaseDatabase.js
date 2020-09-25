"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDatabase = void 0;
const knex_1 = __importDefault(require("knex"));
class BaseDatabase {
    getConnection() {
        if (!BaseDatabase.connection) {
            BaseDatabase.connection = knex_1.default({
                client: "mysql",
                connection: {
                    host: process.env.DB_HOST,
                    port: 3306,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE_NAME,
                },
            });
        }
        return BaseDatabase.connection;
    }
    static async destroyConnection() {
        if (BaseDatabase.connection) {
            await BaseDatabase.connection.destroy();
            BaseDatabase.connection = null;
        }
    }
}
exports.BaseDatabase = BaseDatabase;
BaseDatabase.connection = null;
